///<reference path="../Battle.ts"/>
class TemporaryBattleBattle extends Battle {

    static battle: TemporaryBattle;
    
    static leftIndex: KnockoutObservable<number> = ko.observable(0);
    static rightIndex: KnockoutObservable<number> = ko.observable(0);

    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (TemporaryBattleRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack() {
        if (TemporaryBattleRunner.running()) {
            super.clickAttack();
        }
    }


    public static defeatPokemon(left = true) {
        const enemyPokemon = left ? this.leftEnemyPokemon() : this.rightEnemyPokemon();

        if (!TemporaryBattleBattle.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPokemon, pokeBall, left);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPokemon, 1, player.region, left);
                        this.progressBattle(left);
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                this.progressBattle(left);
            }
        } else {
            this.progressBattle(left);
        }   
        
    }

    public static progressBattle(left = true) {
        const enemyPokemon = left ? this.leftEnemyPokemon() : this.rightEnemyPokemon();
        enemyPokemon.defeat(true);
        if (left) {
            this.leftIndex(this.rightIndex() > this.leftIndex() && this.doubleBattle ? this.rightIndex() + 1 : this.leftIndex() + 1);
        } else {
            this.rightIndex(this.leftIndex() > this.rightIndex() ? this.leftIndex() + 1 : this.rightIndex() + 1);
        }
        console.log("left index", this.leftIndex());
        console.log("right index", this.rightIndex());
        console.log("length", this.battle.getPokemonList().length);
        if (this.leftIndex() >= this.battle.getPokemonList().length && this.rightIndex() >= this.battle.getPokemonList().length) { 
            TemporaryBattleRunner.battleWon(TemporaryBattleBattle.battle);
        } else {
            TemporaryBattleBattle.generateNewEnemy(left);
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy(left = true) {
        
        TemporaryBattleBattle.counter = 0;
        let sideIndex = left ? this.leftIndex() : this.rightIndex();
        let sideNewPokemon = left ? this.leftEnemyPokemon : this.rightEnemyPokemon;
        let sideCatching = left ? this.catchingLeft : this.catchingRight;

        sideCatching(false);
        if (sideIndex  < this.battle.getPokemonList().length) {
            sideNewPokemon(PokemonFactory.generateTemporaryBattlePokemon(TemporaryBattleBattle.battle, sideIndex))
        } 
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return Math.max(
            Math.min(TemporaryBattleBattle.leftIndex(), TemporaryBattleBattle.battle.getPokemonList().length),
            Math.min(this.doubleBattle ? TemporaryBattleBattle.rightIndex() : 0, TemporaryBattleBattle.battle.getPokemonList().length))
            - (this.doubleBattle ? 1 : 0);
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.totalPokemons() - TemporaryBattleBattle.pokemonsDefeatedComputable();
    })
}
