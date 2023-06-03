declare const modalUtils: { observableState: typeof observableState };

class PartyController {

    static getCaughtStatusByName(name: PokemonNameType): CaughtStatus {
        return this.getCaughtStatus(PokemonHelper.getPokemonByName(name).id);
    }

    static getCaughtStatus(id: number): CaughtStatus {
        if (App.game.party.alreadyCaughtPokemon(id, true)) {
            return CaughtStatus.CaughtShiny;
        }

        if (App.game.party.alreadyCaughtPokemon(id, false)) {
            return CaughtStatus.Caught;
        }

        return CaughtStatus.NotCaught;
    }

    static getPokerusStatusByName(name: PokemonNameType): GameConstants.Pokerus {
        return this.getPokerusStatus(PokemonHelper.getPokemonByName(name).id);
    }

    static getPokerusStatus(id: number): GameConstants.Pokerus {
        return App.game.party.getPokemon(id)?.pokerus ?? GameConstants.Pokerus.Uninfected;
    }

    public static getPokemonStoneEvos(partyPokemon: PartyPokemon | undefined, evoType: GameConstants.StoneType): EvoData[] {
        return partyPokemon?.evolutions?.filter(
            (evo) => evo.trigger === EvoTrigger.STONE
                && (evo as StoneEvoData).stone == evoType
                && PokemonHelper.calcNativeRegion(evo.evolvedPokemon) <= player.highestRegion()
                && !evo.restrictions.find(
                    req => (req instanceof InRegionRequirement && !req.isCurrentlyPossible())
                        || (req instanceof MaxRegionRequirement && !req.isCompleted())
                )
        ) ?? [];
    }

    public static getPokemonsWithEvolution(evoType: GameConstants.StoneType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            return PartyController.getPokemonStoneEvos(partyPokemon, evoType).length > 0;
        }).sort((a, b) => a.id - b.id);
    }

    static getStoneEvolutions<T>(id: number, getStatus: (evo: EvoData) => T, evoType?: GameConstants.StoneType): { status: T, locked: boolean, lockHint: string }[] {
        const pokemon = App.game.party.getPokemon(id);
        return PartyController.getPokemonStoneEvos(pokemon, evoType)
            .map((evo) => ({
                status: getStatus(evo),
                locked: !EvolutionHandler.isSatisfied(evo),
                lockHint: evo.restrictions.filter(r => !r.isCompleted()).map(r => r.hint()).join('<br>'),
            }));
    }

    static getStoneEvolutionsCaughtData(id: number, evoType?: GameConstants.StoneType): { status: CaughtStatus, locked: boolean, lockHint: string }[] {
        const getStatus = (evo: EvoData) => this.getCaughtStatusByName(evo.evolvedPokemon);
        return this.getStoneEvolutions(id, getStatus, evoType);
    }

    static getStoneEvolutionsPokerusData(id: number, evoType?: GameConstants.StoneType): { status: GameConstants.Pokerus, locked: boolean, lockHint: string }[] {
        const getStatus = (evo: EvoData) => this.getPokerusStatusByName(evo.evolvedPokemon);
        return this.getStoneEvolutions(id, getStatus, evoType);
    }

    static hasMultipleStoneEvolutionsAvailable(pokemonName: PokemonNameType, evoType: GameConstants.StoneType) {
        const pokemon = App.game.party.getPokemonByName(pokemonName);
        // We only want to check against pokemon that have multiple possible evolutions that can happen now
        return PartyController.getPokemonStoneEvos(pokemon, evoType).length > 1;
    }

    public static async removeVitaminFromParty(vitamin: GameConstants.VitaminType, amount = Infinity, shouldConfirm = true) {
        if (shouldConfirm) {
            if (!await Notifier.confirm({
                title: `Remove All ${GameConstants.VitaminType[vitamin]}?`,
                message: `All ${GameConstants.VitaminType[vitamin]} will be removed from <u>every</u> Pokémon in your party.`,
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'OK',
            })) {
                return;
            }
        }

        App.game.party.caughtPokemon.forEach((p) => {
            if (p.vitaminsUsed[vitamin]() > 0) {
                p.removeVitamin(vitamin, amount);
            }
        });
    }

    public static async removeAllVitaminsFromParty(shouldConfirm = true) {
        if (shouldConfirm) {
            if (!await Notifier.confirm({
                title: 'Remove All Vitamins?',
                message: 'All vitamins will be removed from <u>every</u> Pokémon in your party.',
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'OK',
            })) {
                return;
            }
        }

        const vitamins = GameHelper.enumNumbers(GameConstants.VitaminType);
        App.game.party.caughtPokemon.forEach((p) => {
            vitamins.forEach((v) => {
                if (p.vitaminsUsed[v]() > 0) {
                    p.removeVitamin(v, Infinity);
                }
            });
        });
    }

    public static getMaxLevelPokemonList(): Array<PartyPokemon> {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            return !partyPokemon.breeding && partyPokemon.level >= 100;
        });
    }

    static getSortedList = ko.pureComputed(() => {
        const list = [...App.game.party.caughtPokemon];
        return list.sort(PartyController.compareBy(Settings.getSetting('partySort').observableValue(), Settings.getSetting('partySortDirection').observableValue()));
    }).extend({ rateLimit: 500 });

    private static hatcherySortedList = [];
    static getHatcherySortedList = ko.pureComputed(() => {
        // If the breeding modal is open, we should sort it.
        if (modalUtils.observableState.breedingModal === 'show') {
            // Don't adjust attack based on region if debuff is disabled
            const region = App.game.challenges.list.regionalAttackDebuff.active() ? BreedingController.regionalAttackDebuff() : -1;
            PartyController.hatcherySortedList = [...App.game.party.caughtPokemon];
            return PartyController.hatcherySortedList.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue(), region));
        }
        return PartyController.hatcherySortedList;
    }).extend({ rateLimit: 500 });

    private static vitaminSortedList = [];
    static getvitaminSortedList = ko.pureComputed(() => {
        // If the protein modal is open, we should sort it.
        if (modalUtils.observableState.pokemonVitaminModal === 'show' || modalUtils.observableState.pokemonVitaminExpandedModal === 'show') {
            PartyController.vitaminSortedList = [...App.game.party.caughtPokemon];
            return PartyController.vitaminSortedList.sort(PartyController.compareBy(Settings.getSetting('vitaminSort').observableValue(), Settings.getSetting('vitaminSortDirection').observableValue()));
        }
        return PartyController.vitaminSortedList;
    }).extend({ rateLimit: 500 });

    private static heldItemSortedList = [];
    static getHeldItemSortedList = ko.pureComputed(() => {
        // If the held item modal is open, we should sort it.
        if (modalUtils.observableState.heldItemModal === 'show') {
            PartyController.heldItemSortedList = [...App.game.party.caughtPokemon];
            return PartyController.heldItemSortedList.sort(PartyController.compareBy(Settings.getSetting('heldItemSort').observableValue(), Settings.getSetting('heldItemSortDirection').observableValue()));
        }
        return PartyController.heldItemSortedList;
    }).extend({ rateLimit: 500 });

    private static pokemonsWithHeldItemSortedList = [];
    static getPokemonsWithHeldItemSortedList = ko.pureComputed(() => {
        // If the held item modal is open, we should sort it.
        if (modalUtils.observableState.heldItemModal === 'show') {
            PartyController.pokemonsWithHeldItemSortedList = [...App.game.party.caughtPokemon.filter(p => p.heldItem())];
            return PartyController.pokemonsWithHeldItemSortedList.sort(PartyController.compareBy(Settings.getSetting('heldItemSort').observableValue(), Settings.getSetting('heldItemSortDirection').observableValue()));
        }
        return PartyController.pokemonsWithHeldItemSortedList;
    }).extend({ rateLimit: 500 });


    public static calculateRegionalMultiplier(pokemon: PartyPokemon, region: number): number {
        if (region > -1 && PokemonHelper.calcNativeRegion(pokemon.name) !== region) {
            return App.game.party.getRegionAttackMultiplier();
        }
        return 1.0;
    }

    public static moveCategoryPokemon(fromCategory: number, toCategory: number) {
        // Category should exist, otherwise use the None category
        if (!PokemonCategories.categories().some((c) => c.id === toCategory)) {
            toCategory = 0;
        }

        App.game.party.caughtPokemon.forEach((p) => {
            if (p.category === fromCategory) {
                p.category = toCategory;
            }
        });
    }

    public static compareBy(option: SortOptions, direction: boolean, region = -1): (a: PartyPokemon, b: PartyPokemon) => number {
        return function (a, b) {
            let res, dir = (direction) ? -1 : 1;
            const config = SortOptionConfigs[option];

            let aValue = config.getValue(a);
            let bValue = config.getValue(b);

            // Apply regional debuff if needed
            if (region > -1 && [SortOptions.attack, SortOptions.breedingEfficiency, SortOptions.attackBonus].includes(option)) {
                aValue *= PartyController.calculateRegionalMultiplier(a, region);
                bValue *= PartyController.calculateRegionalMultiplier(b, region);
            }

            if (config.invert) {
                dir *= -1;
            }

            //Compare by provided property
            if (aValue == bValue) {
                //If they are equal according to provided property, sort by id
                return a.id - b.id;
            } else if (aValue < bValue) {
                res = -1;
            } else if (aValue > bValue) {
                res = 1;
            } else {
                res = 0;
            }

            return res * dir;
        };
    }
}
