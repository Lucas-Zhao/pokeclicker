///<reference path="../Battle.ts"/>
class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);

    static leftIndex: KnockoutObservable<number> = ko.observable(0);
    static rightIndex: KnockoutObservable<number> = ko.observable(0);

    static totalPokemons: KnockoutObservable<number> = ko.observable(0);



    public static pokemonAttack() {
        if (GymRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack(left) {
        if (GymRunner.running()) {
            super.clickAttack(left);
        }
    }
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon(left = true) {
        if (left) {
            this.leftEnemyPokemon().defeat(true);
            this.leftIndex(this.rightIndex() > this.leftIndex() && this.doubleBattle ? this.rightIndex() + 1 : this.leftIndex() + 1);
        } else {
            this.rightEnemyPokemon().defeat(true);
            this.rightIndex(this.leftIndex() > this.rightIndex() ? this.leftIndex() + 1 : this.rightIndex() + 1);
        }

        // Make gym "route" regionless
        App.game.breeding.progressEggsBattle(this.gym.badgeReward * 3 + 1, GameConstants.Region.none);


        if (this.leftIndex() >= this.gym.getPokemonList().length && this.rightIndex() >= this.gym.getPokemonList().length) { 
            GymRunner.gymWon(this.gym);
        } else {
            this.generateNewEnemy(left);
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy(left = true) {
        this.counter = 0;

        let index = left ? this.leftIndex() : this.rightIndex();
        let newPokemon = left ? this.leftEnemyPokemon : this.rightEnemyPokemon;

        if (index < this.gym.getPokemonList().length) {
            newPokemon(PokemonFactory.generateGymPokemon(this.gym, index))
        }       
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        var defeated = Math.max(
            Math.min(GymBattle.leftIndex(), GymBattle.gym.getPokemonList().length),
            Math.min(GymBattle.doubleBattle ? GymBattle.rightIndex() : 0, GymBattle.gym.getPokemonList().length))
            - (GymBattle.doubleBattle ? 1 : 0);
        return defeated >= 0 ? defeated : 0;
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.totalPokemons() - GymBattle.pokemonsDefeatedComputable()
    })
}
