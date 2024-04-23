/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../Battle.ts" />

class DungeonBattle extends Battle {

    static trainer: KnockoutObservable<DungeonTrainer> = ko.observable(null);
    static trainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);

    static leftTrainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static rightTrainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);

    public static remainingTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }       
        return DungeonBattle.trainer().getTeam().length - DungeonBattle.defeatedTrainerPokemon()

    });

    public static defeatedTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }

        return Math.max(
            Math.min(DungeonBattle.leftTrainerPokemonIndex(), DungeonBattle.trainer().getTeam().length),
            Math.min(DungeonBattle.doubleBattle ? DungeonBattle.rightTrainerPokemonIndex() : 0, DungeonBattle.trainer().getTeam().length))
            -(DungeonBattle.doubleBattle ? 1 : 0)
    });

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon(left = true) {
        const enemyPokemon: BattlePokemon = left ? this.leftEnemyPokemon() : this.rightEnemyPokemon();
        // Handle Trainer Pokemon defeat
        if (this.trainer()) {
            this.defeatTrainerPokemon(left);
            return;
        }

        DungeonRunner.fighting(false);
        if (DungeonRunner.fightingLootEnemy) {
            DungeonRunner.fightingLootEnemy = false;
        } else if (!DungeonRunner.fightingBoss()) {
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
        }

        if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.defeatedBoss(enemyPokemon.name);
        }
        enemyPokemon.defeat();
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        // Clearing Dungeon tile
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        // Attempting to catch Pokemon
        const isShiny: boolean = enemyPokemon.shiny;
        const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
        const route = player.town()?.dungeon?.difficultyRoute || 1;
        const region = player.region;
        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon, route, region);
                    if (DungeonRunner.defeatedBoss()) {
                        DungeonRunner.dungeonWon();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            );
        } else if (DungeonRunner.defeatedBoss()) {
            DungeonRunner.dungeonWon();
        }
    }

    /**
     * Handles defeating a trainer Pokemon
     */
    private static defeatTrainerPokemon(left = true) {
        //const enemyPokemon: BattlePokemon = this.leftEnemyPokemon();
        const enemyPokemon = left ? this.leftEnemyPokemon() : this.rightEnemyPokemon();

        enemyPokemon.defeat(true);
        
        if (left) {
            this.leftTrainerPokemonIndex(this.rightTrainerPokemonIndex() > this.leftTrainerPokemonIndex() && this.doubleBattle ? this.rightTrainerPokemonIndex() + 1 : this.leftTrainerPokemonIndex() + 1);
        } else {
            this.rightTrainerPokemonIndex(this.leftTrainerPokemonIndex() > this.rightTrainerPokemonIndex() ? this.leftTrainerPokemonIndex() + 1 : this.rightTrainerPokemonIndex() + 1);
        }
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        if (this.leftEnemyPokemon().shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            const route = player.town()?.dungeon?.difficultyRoute || 1;
            const region = player.region;
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPokemon, pokeBall, left);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPokemon, route, region, left);
                        DungeonBattle.nextTrainerPokemon(left);
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                DungeonBattle.nextTrainerPokemon(left);
            }
        } else {
            DungeonBattle.nextTrainerPokemon(left);
        }
    }


    private static nextTrainerPokemon(left = true) {
        // No Pokemon left, trainer defeated
        if (this.leftTrainerPokemonIndex() >= this.trainer().getTeam().length && this.rightTrainerPokemonIndex() >= this.trainer().getTeam().length) {
            // rewards for defeating trainer
            if (this.trainer().options.reward) {
                // Custom reward amount on defeat
                App.game.wallet.addAmount(this.trainer().options.reward);
            } else {
                const dungeonCost = DungeonRunner.dungeon.tokenCost;
                // Reward back 50% or 100% (boss) of the total dungeon DT cost as money (excludes achievement multiplier)
                const money = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 1 : 0.5));
                App.game.wallet.gainMoney(money, true);
                // Reward back 4% or 10% (boss) of the total dungeon DT cost (excludes achievement multiplier)
                const tokens = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 0.1 : 0.04));
                App.game.wallet.gainDungeonTokens(tokens, true);
            }

            DungeonRunner.fighting(false);
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.defeatedBoss(DungeonBattle.trainer().name);
            }
            this.trainer(null);
            this.trainerPokemonIndex(0);
            this.leftTrainerPokemonIndex(0)
            this.rightTrainerPokemonIndex(0)
            this.doubleBattle = false;
            // Clearing Dungeon tile
            DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
            DungeonRunner.map.currentTile().calculateCssClass();

            // Update boss
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.fightingBoss(false);
                DungeonRunner.dungeonWon();
            }
        // Generate next trainer Pokemon
        } else {
            this.generateTrainerPokemon(left);
        }
    }

    public static generateNewEnemy() {
        this.catchingLeft(false);
        this.counter = 0;
        this.doubleBattle = false;

        // Finding enemy from enemyList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableMinions(), DungeonRunner.dungeon.weightList);
        // Pokemon
        if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {            
            const pokemon = (typeof enemy === 'string') ? enemy : (<DetailedPokemon>enemy).pokemon;
            const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon, DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeonLevel());
            this.leftEnemyPokemon(enemyPokemon);

            PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
            // Shiny
            if (enemyPokemon.shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town().dungeon.name,
                            pokemon: this.leftEnemyPokemon().name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town().dungeon.name,
                            pokemon: this.leftEnemyPokemon().name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town().dungeon.name,
                        pokemon: this.leftEnemyPokemon().name,
                    })
                );
            }
        // Trainer
        } else {
            const trainer = <DungeonTrainer>enemy;
            this.trainer(trainer);
            this.trainerPokemonIndex(0);
            this.leftTrainerPokemonIndex(0);
            this.rightTrainerPokemonIndex(enemy.options.doubleBattle ? 1 : Number.MAX_SAFE_INTEGER);
            this.doubleBattle = enemy.options.doubleBattle;

            this.generateTrainerPokemon(true);
            this.generateTrainerPokemon(false);
        }

        DungeonRunner.fighting(true);
    }

    public static generateNewLootEnemy(pokemon: PokemonNameType) {
        this.catchingLeft(false);
        this.counter = 0;
        this.doubleBattle = false;

        const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon
            , DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth * 2, DungeonRunner.dungeonLevel(), true);
        this.leftEnemyPokemon(enemyPokemon);
        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: player.town().dungeon.name,
                        pokemon: this.leftEnemyPokemon().name,
                    })
                    : createLogContent.encounterShiny({
                        location: player.town().dungeon.name,
                        pokemon: this.leftEnemyPokemon().name,
                    })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id)) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: player.town().dungeon.name,
                    pokemon: this.leftEnemyPokemon().name,
                })
            );
        }
        DungeonRunner.fighting(true);
    }

    /**
     * Handles generating the enemy Trainer Pokemon
     */
    public static generateTrainerPokemon(left = true) {
        this.counter = 0;
      
        let sideIndex = left ? this.leftTrainerPokemonIndex() : this.rightTrainerPokemonIndex();
        if (sideIndex < this.trainer().getTeam().length) {
            let sideNewPokemon = left ? this.leftEnemyPokemon : this.rightEnemyPokemon;
            const pokemon = this.trainer().getTeam()[sideIndex];
            const baseHealth = DungeonRunner.fightingBoss() ? pokemon.maxHealth : DungeonRunner.dungeon.baseHealth;
            const level = DungeonRunner.fightingBoss() ? pokemon.level : DungeonRunner.dungeonLevel();
            const enemyPokemon = PokemonFactory.generateDungeonTrainerPokemon(pokemon, DungeonRunner.chestsOpened(), baseHealth, level, DungeonRunner.fightingBoss());

            sideNewPokemon(enemyPokemon)
        }
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catchingLeft(false);
        this.counter = 0;
        this.doubleBattle = false;

        // Finding boss from bossList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableBosses(), DungeonRunner.dungeon.bossWeightList);
        // Pokemon
        if (enemy instanceof DungeonBossPokemon) {
            this.leftEnemyPokemon(PokemonFactory.generateDungeonBoss(enemy, DungeonRunner.chestsOpened()));
            PokemonHelper.incrementPokemonStatistics(this.leftEnemyPokemon().id, GameConstants.PokemonStatisticsType.Encountered, this.leftEnemyPokemon().shiny, this.leftEnemyPokemon().gender, this.leftEnemyPokemon().shadow);
            // Shiny
            if (this.leftEnemyPokemon().shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town().dungeon.name,
                            pokemon: this.leftEnemyPokemon().name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town().dungeon.name,
                            pokemon: this.leftEnemyPokemon().name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(this.leftEnemyPokemon().id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town().dungeon.name,
                        pokemon: this.leftEnemyPokemon().name,
                    })
                );
            }
        } else {
            this.trainer(enemy);
            this.trainerPokemonIndex(0);
            this.leftTrainerPokemonIndex(0);
            this.rightTrainerPokemonIndex(enemy.options.doubleBattle ? 1 : Number.MAX_SAFE_INTEGER);
            this.doubleBattle = enemy.options.doubleBattle;
            this.generateTrainerPokemon(true);
            this.generateTrainerPokemon(false);
        }
    }

}
