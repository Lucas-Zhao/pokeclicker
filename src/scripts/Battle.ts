///<reference path="pokemons/PokemonFactory.ts"/>
/// <reference path="../declarations/GameHelper.d.ts" />

/**
 * Handles all logic related to battling
 */
class Battle {
    static enemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);

    static leftEnemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    static rightEnemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    static doubleBattle = false;

    static counter = 0;
    static catching: KnockoutObservable<boolean> = ko.observable(false);
    static catchRateActual: KnockoutObservable<number> = ko.observable(null);
    static pokeball: KnockoutObservable<GameConstants.Pokeball> = ko.observable(GameConstants.Pokeball.Pokeball);

    static catchingLeft: KnockoutObservable<boolean> = ko.observable(false);
    static catchingRight: KnockoutObservable<boolean> = ko.observable(false);
    static catchRateActualLeft: KnockoutObservable<number> = ko.observable(null);
    static catchRateActualRight: KnockoutObservable<number> = ko.observable(null);
    static pokeballLeft: KnockoutObservable<GameConstants.Pokeball> = ko.observable(GameConstants.Pokeball.Pokeball);
    static pokeballRight: KnockoutObservable<GameConstants.Pokeball> = ko.observable(GameConstants.Pokeball.Pokeball);
    static lastPokemonAttack = Date.now();
    static lastClickAttack = Date.now();
    static route;


    /**
     * Probably not needed right now, but might be if we add more logic to a gameTick.
     */
    public static tick() {
        this.counter = 0;
        this.pokemonAttack();
    }

    /**
     * Attacks with Pokémon and checks if the enemy is defeated.
     */
    public static pokemonAttack() {
        // TODO: figure out a better way of handling this
        // Limit pokemon attack speed, Only allow 1 attack per 900ms
        const now = Date.now();
        if (this.lastPokemonAttack > now - 900) {
            return;
        }
        this.lastPokemonAttack = now;
        if (this.leftEnemyPokemon()?.isAlive()) {
            this.leftEnemyPokemon().damage(App.game.party.calculatePokemonAttack(this.leftEnemyPokemon().type1, this.leftEnemyPokemon().type2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.doubleBattle && this.rightEnemyPokemon().isAlive()));
            if (!this.leftEnemyPokemon().isAlive()) {
                this.defeatPokemon(true);
            }
        }
        if (this.rightEnemyPokemon()?.isAlive()) {
            if (this.doubleBattle) {
                this.rightEnemyPokemon().damage(App.game.party.calculatePokemonAttack(this.rightEnemyPokemon().type1, this.rightEnemyPokemon().type2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.doubleBattle && this.rightEnemyPokemon().isAlive()));
                if (!this.rightEnemyPokemon().isAlive()) {
                    this.defeatPokemon(false);
                }
            }
        }
    }

    /**
     * Attacks with clicks and checks if the enemy is defeated.
     */
    public static clickAttack(left = true) {
        
        // click attacks disabled and we already beat the starter
        if (App.game.challenges.list.disableClickAttack.active() && player.regionStarters[GameConstants.Region.kanto]() != GameConstants.Starter.None) {
            return;
        }
        // TODO: figure out a better way of handling this
        // Limit click attack speed, Only allow 1 attack per 50ms (20 per second)
        const now = Date.now();
        if (this.lastClickAttack > now - 50) {
            return;
        }

        if (!this.leftEnemyPokemon()?.isAlive() && !this.rightEnemyPokemon()?.isAlive()) {
            return;
        }

        const attackedPokemon = left ? this.leftEnemyPokemon() : this.rightEnemyPokemon();

        if (!attackedPokemon?.isAlive()) {
            this.clickAttack(!left);
            return;
        }

        attackedPokemon.damage(App.game.party.calculateClickAttack(true));        

        this.lastClickAttack = now;


        if (!attackedPokemon.isAlive()) {
            this.defeatPokemon(left);
        }

        GameHelper.incrementObservable(App.game.statistics.clickAttacks);
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon(left = true) {
        const enemyPokemon = this.enemyPokemon();
        Battle.route = player.route();
        const region = player.region;
        const catchRoute = player.route(); // Has to be set, the Battle.route is "zeroed" on region change
        enemyPokemon.defeat();

        GameHelper.incrementObservable(App.game.statistics.routeKills[player.region][Battle.route]);

        App.game.breeding.progressEggsBattle(Battle.route, player.region);
        const isShiny: boolean = enemyPokemon.shiny;
        const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);

        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon, catchRoute, region);
                    if (Battle.route != 0) {
                        this.generateNewEnemy();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            )
                ;

        } else {
            this.generateNewEnemy();
        }
        this.gainItem();
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region, player.subregionObject()));
        this.leftEnemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region, player.subregionObject()));
        const enemyPokemon = this.enemyPokemon();
        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: Routes.getRoute(player.region, player.route()).routeName,
                        pokemon: enemyPokemon.name,
                    })
                    : createLogContent.encounterShiny({
                        location: Routes.getRoute(player.region, player.route()).routeName,
                        pokemon: enemyPokemon.name,
                    })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id) && enemyPokemon.health()) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: Routes.getRoute(player.region, player.route()).routeName,
                    pokemon: enemyPokemon.name,
                })
            );
        }
    }

    protected static calculateActualCatchRate(enemyPokemon: BattlePokemon, pokeBall: GameConstants.Pokeball) {
        const pokeballBonus = App.game.pokeballs.getCatchBonus(pokeBall);
        const oakBonus = App.game.oakItems.calculateBonus(OakItemType.Magic_Ball);
        const totalChance = GameConstants.clipNumber(enemyPokemon.catchRate + pokeballBonus + oakBonus, 0, 100);
        return totalChance;
    }

    protected static prepareCatch(enemyPokemon: BattlePokemon, pokeBall: GameConstants.Pokeball, left = true) {
        let sidePokeball = left ? this.pokeballLeft : this.pokeballRight;
        let sideCatching = left ? this.catchingLeft : this.catchingRight;
        let sideCatchRate = left ? this.catchRateActualLeft : this.catchRateActualRight;

        sidePokeball(pokeBall);
        sideCatching(true);
        sideCatchRate(this.calculateActualCatchRate(enemyPokemon, pokeBall));
        App.game.pokeballs.usePokeball(pokeBall);
    }

    protected static attemptCatch(enemyPokemon: BattlePokemon, route: number, region: GameConstants.Region, left = true) {
        let sideCatching = left ? this.catchingLeft : this.catchingRight;
        let sideCatchRate = left ? this.catchRateActualLeft : this.catchRateActualRight;

        if (enemyPokemon == null) {
            sideCatching(false);
            return;
        }
        if (Rand.chance(sideCatchRate() / 100)) { // Caught
            this.catchPokemon(enemyPokemon, route, region, left);
        } else if (enemyPokemon.shiny) { // Failed to catch, Shiny
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.escapedShinyDupe({ pokemon: enemyPokemon.name })
                    : createLogContent.escapedShiny({ pokemon: enemyPokemon.name })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) { // Failed to catch, Uncaught
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                createLogContent.escapedWild({ pokemon: enemyPokemon.name })
            );
        }
        sideCatching(false);
        sideCatchRate(null);
    }

    public static catchPokemon(enemyPokemon: BattlePokemon, route: number, region: GameConstants.Region, left = true) {
        let sidePokeball = left ? this.pokeballLeft : this.pokeballRight;

        this.gainTokens(route, region, left);
        App.game.oakItems.use(OakItemType.Magic_Ball);
        App.game.party.gainPokemonById(enemyPokemon.id, enemyPokemon.shiny, undefined, enemyPokemon.gender, enemyPokemon.shadow);
        const partyPokemon = App.game.party.getPokemon(enemyPokemon.id);
        const epBonus = App.game.pokeballs.getEPBonus(sidePokeball());
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, enemyPokemon.shiny, enemyPokemon.shadow, enemyPokemon.ep * epBonus);
    }

    protected static gainTokens(route: number, region: GameConstants.Region, left = true) {
        let sidePokeball = left ? this.pokeballLeft : this.pokeballRight;

        let currencyKinds = [GameConstants.Currency.dungeonToken];
        if (sidePokeball() === GameConstants.Pokeball.Luxuryball) {
            //currencyKinds = [
            //  GameConstants.Currency.dungeonToken,
            //  GameConstants.Currency.money,
            //  GameConstants.Currency.questPoint,
            //  GameConstants.Currency.diamond,
            //  GameConstants.Currency.farmPoint,
            //  GameConstants.Currency.battlePoint,
            //  GameConstants.Currency.contestToken,
            //];
            currencyKinds = [
                GameConstants.Currency.dungeonToken,
                GameConstants.Currency.money,
                GameConstants.Currency.questPoint,
                GameConstants.Currency.diamond,
                GameConstants.Currency.farmPoint,
                GameConstants.Currency.battlePoint,
            ];
        }
        const currencyUnits = PokemonFactory.routeDungeonTokens(route, region)
            / GameConstants.LuxuryBallCurrencyRate[GameConstants.Currency.dungeonToken];
        const chosenCurrency = currencyKinds[Math.floor(Math.random() * currencyKinds.length)];
        App.game.wallet.addAmount(new Amount(Math.ceil(currencyUnits * GameConstants.LuxuryBallCurrencyRate[chosenCurrency]), chosenCurrency), false);
    }

    static gainItem() {
        const p = MapHelper.normalizeRoute(Battle.route, player.region) / 1600 + 0.009375;

        if (Rand.chance(p)) {
            App.game.farming.gainRandomBerry();
        }
    }

    public static pokemonAttackTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        var toolTip = '';
        if (Battle.leftEnemyPokemon() && Battle.leftEnemyPokemon().health() > 0) {
            const leftPokemonAttack = App.game.party.calculatePokemonAttack(Battle.leftEnemyPokemon().type1, Battle.leftEnemyPokemon().type2);
            toolTip = `${leftPokemonAttack.toLocaleString('en-US')} against ${Battle.leftEnemyPokemon().displayName}`;
            if (Battle.rightEnemyPokemon() && Battle.rightEnemyPokemon().health() > 0) {
                const rightPokemonAttack = App.game.party.calculatePokemonAttack(Battle.rightEnemyPokemon().type1, Battle.rightEnemyPokemon().type2);
                toolTip += `\n${rightPokemonAttack.toLocaleString('en-US')} against ${Battle.rightEnemyPokemon().displayName}`;
            }
        }
        return toolTip;
    }).extend({ rateLimit: 1000 });

}
