/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events: SpecialEvent[] = [];

    static newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.title == title)) {
            SpecialEvents.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction));
        }
    }

    initialize(): void {
        SpecialEvents.events.forEach(event => event.initialize());
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours?
// Create our events here for now (yearly)

// Lunar New Year
SpecialEvents.newEvent('Lunar New Year', 'Encounter Fancy Pattern Vivillon for a limited time roaming Kalos.',
    // Start
    new Date(new Date().getFullYear(), 0, 24, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Vivillon (Fancy)'));
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kalos, 0, 'Vivillon (Fancy)');
    }
);
// Easter
SpecialEvents.newEvent('Easter', 'Encounter Surprise Togepi for a limited time with a dedicated Quest Line.',
    // Start
    new Date(new Date().getFullYear(), 3, 8, 1), () => {
        const togepiEggHuntQuestLine = App.game.quests.getQuestLine('Togepi Egg Hunt');
        if (togepiEggHuntQuestLine.state() == QuestLineState.inactive) {
            App.game.quests.getQuestLine('Togepi Egg Hunt').beginQuest();
        }
    },
    // End
    new Date(new Date().getFullYear(), 3, 29, 23), () => {
        // do not end questline, so ppl can finish it
    }
);
// First Event
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Flying Pikachu'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Red Spearow'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Flying Pikachu');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Red Spearow');
    }
);
// Pokemon the first movie release date
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Bulbasaur (clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Charmander (clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Squirtle (clone)'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Bulbasaur (clone)');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Charmander (clone)');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Squirtle (clone)');
    }
);
// Pokemon XD release date
SpecialEvents.newEvent('Gale of darkness!', 'Encounter Shadow Lugia for a limited time in Whirl Islands.',
    // Start
    new Date(new Date().getFullYear(), 7, 4, 1), () => {
        dungeonList['Whirl Islands'].bossList.push(new DungeonBossPokemon('Shadow Lugia', 1410000, 100));
    },
    // End
    new Date(new Date().getFullYear(), 7, 12, 23), () => {
        dungeonList['Whirl Islands'].bossList = dungeonList['Whirl Islands'].bossList.filter(boss => boss.name != 'Shadow Lugia');
    }
);
// Pokemon yellow release date
SpecialEvents.newEvent('Pokémon Yellow!', 'Encounter Classic Pikachu for a limited time in Viridian Forest and evolve it into Classic Raichu.',
    // Start
    new Date(new Date().getFullYear(), 8, 4, 1), () => {
        dungeonList['Viridian Forest'].bossList.push(new DungeonBossPokemon('Classic Pikachu', 510, 7));
    },
    // End
    new Date(new Date().getFullYear(), 8, 12, 23), () => {
        dungeonList['Viridian Forest'].bossList = dungeonList['Viridian Forest'].bossList.filter(boss => boss.name != 'Classic Pikachu');
    }
);
// Pokemon mystery dungeon explorers release date
SpecialEvents.newEvent('Explorers of time and darkness!', 'Encounter Primal Dialga for a limited time in Spear Pillar.<br/>Encounter Explorer Piplup roaming in Sinnoh.',
    // Start
    new Date(new Date().getFullYear(), 8, 13, 1), () => {
        dungeonList['Spear Pillar'].bossList.push(new DungeonBossPokemon('Primal Dialga', 11880000, 100));
        RoamingPokemonList.add(GameConstants.Region.sinnoh, 0, new RoamingPokemon('Explorer Piplup'));
    },
    // End
    new Date(new Date().getFullYear(), 8, 20, 23), () => {
        dungeonList['Spear Pillar'].bossList = dungeonList['Spear Pillar'].bossList.filter(boss => boss.name != 'Primal Dialga');
        RoamingPokemonList.remove(GameConstants.Region.sinnoh, 0, 'Explorer Piplup');
    }
);
// Halloween
SpecialEvents.newEvent('Halloween!', 'Encounter Spooky Pokémon for a limited time around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 9, 30, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Bulbasaur') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Gastly') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Togepi') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Misdreavus') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Pikachu (Gengar)') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Shuppet') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Duskull') : null;
        });
    },
    // End
    new Date(new Date().getFullYear(), 10, 5, 23), () => {
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Bulbasaur', 'Gastly'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Togepi', 'Misdreavus'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Pikachu (Gengar)', 'Shuppet', 'Duskull'].includes(p)));
    }
);
// Let's Go P/E release date
SpecialEvents.newEvent('Let\'s GO!', 'Encounter special Eevee and Pikachu roaming in the Kanto region.',
    // Start
    new Date(new Date().getFullYear(), 10, 16, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Let\'s Go Pikachu'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Let\'s Go Eevee'));
    },
    // End
    new Date(new Date().getFullYear(), 10, 23, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Let\'s Go Pikachu');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Let\'s Go Eevee');
    }
);
// Christmas
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Snorlax roaming the regions and discover the Grinch of Ilex Forest.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        // Add to every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.add(region, 0, new RoamingPokemon('Santa Snorlax'));
        });
        dungeonList['Ilex Forest'].bossList.push(new DungeonBossPokemon('Grinch Celebi', 1600000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}));
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        // Remove from every region excluding None
        GameHelper.enumNumbers(GameConstants.Region).filter(i => i != GameConstants.Region.none).forEach(region => {
            RoamingPokemonList.remove(region, 0, 'Santa Snorlax');
        });
        dungeonList['Ilex Forest'].bossList = dungeonList['Ilex Forest'].bossList.filter(boss => boss.name != 'Grinch Celebi');
    }
);
// Golden Week
SpecialEvents.newEvent('Golden Week', 'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
    // Start
    new Date(new Date().getFullYear(), 3, 29, 1), () => {
        dungeonList['Flower Paradise'].bossList.push(new DungeonBossPokemon('Bulbasaur (Rose)', 1600000, 100, {requirement: new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('Flower Paradise'))}));
    },
    // End
    new Date(new Date().getFullYear(), 4, 6, 23), () => {
        dungeonList['Flower Paradise'].bossList = dungeonList['Flower Paradise'].bossList.filter(boss => boss.name != 'Bulbasaur (Rose)');
    }
);
