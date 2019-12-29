class Wallet implements Feature {
    name: string = "Wallet";
    saveKey: string;
    currencies: ArrayOfObservables<number>;

    defaults = {
        currencies: [0, 0, 0, 0, 0]
    };


    constructor() {
        this.currencies = new ArrayOfObservables(this.defaults.currencies);
    }

    public gainMoney(amount: number, origin?: string) {

        // Good
        // let eventBonus = App.game.eventCalendar.getMoneyMultiplier(origin);

        // Good
        // let xMultiplier = App.game.getSomething();
        // let yMultiplier = App.game.getSomethingElse();
        //
        // amount *= eventBonus * xMultiplier * yMultiplier;
        //
        // Statistics.addTotalMoney(origin);
        this.addAmount(new Amount(amount, Currency.money))
    }

    private addAmount(amount: Amount) {
        this.currencies[amount.currency] += amount.amount;
    };

    public hasAmount(amount: Amount) {
        return this.currencies[amount.currency] >= amount.amount;
    };

    public loseAmount(amount: Amount) {
        this.currencies[amount.currency] -= amount.amount;
    };


    initialize(): void {
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
        if (json["currencies"] == null) {
            this.currencies = new ArrayOfObservables(this.defaults.currencies);
        } else {
            let currenciesJson = json["currencies"];
            this.currencies = new ArrayOfObservables([
                currenciesJson[GameConstants.Currency.money],
                currenciesJson[GameConstants.Currency.questPoint],
                currenciesJson[GameConstants.Currency.dungeontoken],
                currenciesJson[GameConstants.Currency.diamond],
                currenciesJson[GameConstants.Currency.farmPoint],
            ]);
        }
    }

    toJSON(): object {
        return {
            "currencies": [
                this.currencies[GameConstants.Currency.money],
                this.currencies[GameConstants.Currency.questPoint],
                this.currencies[GameConstants.Currency.dungeontoken],
                this.currencies[GameConstants.Currency.diamond],
                this.currencies[GameConstants.Currency.farmPoint],
            ],
        }
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
