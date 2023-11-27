class SafariPokemonNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, {
            image: image,
            requirement: requirement,
            afterOpenFunction: (modal) => $(modal).find('[data-toggle="tooltip"]').tooltip(),
        });
    }

    get dialogHTML(): string {
        if (!SafariPokemonList.list[this.region]) {
            return 'Huh!? This is a restricted area, kid. You can\'t be here!';
        }

        let pokemonHTML = SafariPokemonList.list[this.region]().map((p) => {
            const isAvailable = p.isAvailable();
            if (!isAvailable && !p.showUncaught) {
                // Don't show uncaught pokemon
                return '';
            }
            let html = `<img width="72" class="d-block ${!isAvailable ? 'dungeon-pokemon-locked' : ''}" src="assets/images/pokemon/${PokemonHelper.getPokemonByName(p.name).id}.png" />`;
            if (this.region === GameConstants.Region.kalos) {
                const partyPokemon = App.game.party.getPokemonByName(p.name);
                if (partyPokemon?.pokerus) {
                    html += `<img class="d-block mx-auto" data-toggle="tooltip" title="EVs: ${partyPokemon.evs()}" src="assets/images/breeding/pokerus/${GameConstants.Pokerus[partyPokemon.pokerus]}.png" />`;
                }
                return `<div class="mb-1">${html}</div>`;
            }
            return html;
        });

        if (this.region === GameConstants.Region.kalos) {
            pokemonHTML = pokemonHTML.slice(0, GameConstants.FRIEND_SAFARI_POKEMON); // display just the daily pokemon for friend safari
        }

        return `${super.dialogHTML}<div class="d-flex flex-wrap justify-content-around">${pokemonHTML.join('')}</div>`;
    }
}
