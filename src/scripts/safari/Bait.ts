enum BaitType {
    Bait = 0,
    Razz,
    Nanab
}


class Bait {

    constructor(
        public type: BaitType,
        public name: string,
        public useName: string,
        public image: string,
        public amount: () => string | number,
        public use: (pokemon: SafariPokemon) => void
    ) { }


    get btnName(): string {
        return `${this.name} (${this.amount()})`;
    }

}

const BaitList: { [name: string]: Bait } = {};

BaitList['Bait'] = new Bait(BaitType.Bait, 'Bait', 'some bait', 'assets/images/safari/bait.png',
    () => '∞',
    (pokemon: SafariPokemon) => {
        pokemon.eatingBait = BaitType.Bait;
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 5 + 2));
        pokemon.angry = 0;

    });
BaitList['Razz'] = new Bait(BaitType.Razz, 'Razz Berry', 'a Razz Berry', FarmController.getBerryImage(BerryType.Razz),
    () => App.game.farming.berries[BerryType.Razz].amount(),
    (pokemon: SafariPokemon) => {
        App.game.farming.gainBerry(BerryType.Razz, -1);
        pokemon.eatingBait = BaitType.Razz;
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 6 + 2));
        pokemon.angry = 0;
    });
BaitList['Nanab'] = new Bait(BaitType.Nanab, 'Nanab Berry', 'a Nanab Berry', FarmController.getBerryImage(BerryType.Nanab),
    () => App.game.farming.berries[BerryType.Nanab].amount(),
    (pokemon: SafariPokemon) => {
        App.game.farming.gainBerry(BerryType.Nanab, -1);
        pokemon.eatingBait = BaitType.Nanab;
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 6 + 2));
        pokemon.angry = 0;
    });
