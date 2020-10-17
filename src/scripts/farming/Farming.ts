class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: Berry[] = [];
    mutations: Mutation[] = [];

    counter = 0;

    readonly AMOUNT_OF_PLOTS = 25;

    defaults = {
        berryList: Array<number>(GameConstants.AMOUNT_OF_BERRY_TYPES).fill(0),
        unlockedBerries: Array<boolean>(GameConstants.AMOUNT_OF_BERRY_TYPES).fill(false),
        mulchList: Array<number>(GameConstants.AMOUNT_OF_MULCHES).fill(0),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new Plot(index === 0, BerryType.None, 0, MulchType.None, 0);
        }),
    };

    berryList: KnockoutObservable<number>[];
    unlockedBerries: KnockoutObservable<boolean>[];
    mulchList: KnockoutObservable<number>[];
    plotList: Array<Plot>;

    constructor() {
        this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        this.plotList = this.defaults.plotList;
    }

    initialize(): void {

        //#region Berry Data

        //#region First Generation
        this.berryData[BerryType.Cheri]     = new Berry(BerryType.Cheri,    [2,4,6,8,16], //[5,10,20,30,60] TODO: Change back after testing
            2, .5, 6,
            [10, 0, 0, 0, 0], BerryColor.Red);
        this.berryData[BerryType.Chesto]    = new Berry(BerryType.Chesto,   [5,15,25,40,80],
            3, .5, 8,
            [0, 10, 0, 0, 0], BerryColor.Purple);
        this.berryData[BerryType.Pecha]     = new Berry(BerryType.Pecha,    [10,35,50,60,120],
            3, .4, 10,
            [0, 0, 10, 0, 0], BerryColor.Pink);
        this.berryData[BerryType.Rawst]     = new Berry(BerryType.Rawst,    [15,30,45,80,160],
            4, .4, 14,
            [0, 0, 0, 10, 0], BerryColor.Green);
        this.berryData[BerryType.Aspear]    = new Berry(BerryType.Aspear,   [10,40,50,110,220],
            4, .3, 18,
            [0, 0, 0, 0, 10], BerryColor.Yellow);
        this.berryData[BerryType.Leppa]     = new Berry(BerryType.Leppa,    [100,120,140,240,480],
            5, .3, 30,
            [10, 0, 10, 10, 10], BerryColor.Red);
        this.berryData[BerryType.Oran]      = new Berry(BerryType.Oran,     [120,180,240,300,600],
            6, .2, 35,
            [10, 10, 0, 10, 10], BerryColor.Blue);
        this.berryData[BerryType.Sitrus]    = new Berry(BerryType.Sitrus,   [150,300,450,600,1200],
            8, .2, 60,
            [0, 10, 10, 10, 10], BerryColor.Yellow);
        //#endregion

        //#region Second Generation
        this.berryData[BerryType.Persim]    = new Berry(BerryType.Persim,   [2,4,6,8,16],
            1, .1, 60,
            [10, 10, 10, 0, 10], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Razz]      = new Berry(BerryType.Razz,     [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 0, 0, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Bluk]      = new Berry(BerryType.Bluk,     [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 10, 0, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Nanab]     = new Berry(BerryType.Nanab,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 10, 10, 0], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Wepear]    = new Berry(BerryType.Wepear,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 10, 10], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Pinap]     = new Berry(BerryType.Pinap,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 10], BerryColor.Yellow); // TODO: Set properties

        this.berryData[BerryType.Figy]      = new Berry(BerryType.Figy,     [5,10,15,20,40],
            1, .1, 60,
            [15, 0, 0, 0, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Wiki]      = new Berry(BerryType.Wiki,     [5,10,15,20,40],
            1, .1, 60,
            [0, 15, 0, 0, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Mago]      = new Berry(BerryType.Mago,     [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 15, 0, 0], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Aguav]     = new Berry(BerryType.Aguav,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 15, 0], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Iapapa]    = new Berry(BerryType.Iapapa,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 0, 15], BerryColor.Yellow); // TODO: Set properties

        this.berryData[BerryType.Lum]       = new Berry(BerryType.Lum,      [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 10, 10, 0], BerryColor.Green); // TODO: Set properties
        //#endregion

        //#region Third Generation
        this.berryData[BerryType.Pomeg]     = new Berry(BerryType.Pomeg,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 10, 10, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Kelpsy]    = new Berry(BerryType.Kelpsy,   [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 0, 10, 10], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Qualot]    = new Berry(BerryType.Qualot,   [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 10, 0, 10], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Hondew]    = new Berry(BerryType.Hondew,   [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 0, 10, 0], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Grepa]     = new Berry(BerryType.Grepa,    [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 10, 0, 10], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Tamato]    = new Berry(BerryType.Tamato,   [5,10,15,20,40],
            1, .1, 60,
            [20, 10, 0, 0, 0], BerryColor.Red); // TODO: Set properties

        this.berryData[BerryType.Cornn]     = new Berry(BerryType.Cornn,    [5,10,15,20,40],
            1, .1, 60,
            [0, 20, 10, 0, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Magost]    = new Berry(BerryType.Magost,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 20, 10, 0], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Rabuta]    = new Berry(BerryType.Rabuta,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 20, 10], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Nomel]     = new Berry(BerryType.Nomel,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 20], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Spelon]    = new Berry(BerryType.Spelon,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 0, 0, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Pamtre]    = new Berry(BerryType.Pamtre,   [5,10,15,20,40],
            1, .1, 60,
            [0, 30, 10, 0, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Watmel]    = new Berry(BerryType.Watmel,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 30, 10, 0], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Durin]     = new Berry(BerryType.Durin,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 30, 10], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Belue]     = new Berry(BerryType.Belue,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 30], BerryColor.Purple); // TODO: Set properties
        //#endregion

        //#region Fourth Generation (Typed)
        this.berryData[BerryType.Occa]      = new Berry(BerryType.Occa,     [5,10,15,20,40],
            1, .1, 60,
            [15, 0, 10, 0, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Passho]    = new Berry(BerryType.Passho,   [5,10,15,20,40],
            1, .1, 60,
            [0, 15, 0, 10, 0], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Wacan]     = new Berry(BerryType.Wacan,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 15, 0, 10], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Rindo]     = new Berry(BerryType.Rindo,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 15, 0], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Yache]     = new Berry(BerryType.Yache,    [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 0, 0, 15], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Chople]    = new Berry(BerryType.Chople,   [5,10,15,20,40],
            1, .1, 60,
            [15, 0, 0, 10, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Kebia]     = new Berry(BerryType.Kebia,    [5,10,15,20,40],
            1, .1, 60,
            [0, 15, 0, 0, 10], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Shuca]     = new Berry(BerryType.Shuca,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 15, 0, 0], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Coba]      = new Berry(BerryType.Coba,     [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 0, 15, 0], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Payapa]    = new Berry(BerryType.Payapa,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 10, 0, 15], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Tanga]     = new Berry(BerryType.Tanga,    [5,10,15,20,40],
            1, .1, 60,
            [20, 0, 0, 0, 10], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Charti]    = new Berry(BerryType.Charti,   [5,10,15,20,40],
            1, .1, 60,
            [10, 20, 0, 0, 0], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Kasib]     = new Berry(BerryType.Kasib,    [5,10,15,20,40],
            1, .1, 60,
            [0, 10, 20, 0, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Haban]     = new Berry(BerryType.Haban,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 10, 20, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Colbur]    = new Berry(BerryType.Colbur,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 10, 20], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Babiri]    = new Berry(BerryType.Babiri,   [5,10,15,20,40],
            1, .1, 60,
            [25, 10, 0, 0, 0], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Chilan]    = new Berry(BerryType.Chilan,   [5,10,15,20,40],
            1, .1, 60,
            [0, 25, 10, 0, 0], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Roseli]    = new Berry(BerryType.Roseli,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 25, 10, 0], BerryColor.Pink); // TODO: Set properties
        //#endregion

        //#region Fifth Generation
        this.berryData[BerryType.Liechi]    = new Berry(BerryType.Liechi,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 0, 0], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Ganlon]    = new Berry(BerryType.Ganlon,   [5,10,15,20,40],
            1, .1, 60,
            [0, 30, 10, 30, 0], BerryColor.Purple); // TODO: Set properties
        this.berryData[BerryType.Salac]     = new Berry(BerryType.Salac,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 30, 10, 30], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Petaya]    = new Berry(BerryType.Petaya,   [5,10,15,20,40],
            1, .1, 60,
            [30, 0, 0, 30, 10], BerryColor.Pink); // TODO: Set properties
        this.berryData[BerryType.Apicot]    = new Berry(BerryType.Apicot,   [5,10,15,20,40],
            1, .1, 60,
            [10, 30, 0, 0, 30], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Lansat]    = new Berry(BerryType.Lansat,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Red); // TODO: Set properties
        this.berryData[BerryType.Starf]     = new Berry(BerryType.Starf,    [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Micle]     = new Berry(BerryType.Micle,    [5,10,15,20,40],
            1, .1, 60,
            [0, 40, 10, 0, 0], BerryColor.Green); // TODO: Set properties
        this.berryData[BerryType.Custap]    = new Berry(BerryType.Custap,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 40, 10, 0], BerryColor.Red); // TODO: Set properties

        this.berryData[BerryType.Jaboca]    = new Berry(BerryType.Jaboca,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 40, 10], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Rowap]     = new Berry(BerryType.Rowap,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 40], BerryColor.Blue); // TODO: Set properties
        this.berryData[BerryType.Kee]       = new Berry(BerryType.Kee,      [5,10,15,20,40],
            1, .1, 60,
            [30, 30, 10, 10, 10], BerryColor.Yellow); // TODO: Set properties
        this.berryData[BerryType.Maranga]   = new Berry(BerryType.Maranga,  [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 30, 30, 10], BerryColor.Blue); // TODO: Set properties

        this.berryData[BerryType.Enigma]    = new Berry(BerryType.Enigma,   [5,10,15,20,40],
            1, .1, 60,
            [40, 10, 0, 0, 0], BerryColor.Purple); // TODO: Set properties
        //#endregion

        //#endregion

        //#region Mutations

        // TODO: Setup mutations for every berry
        // TEMPORARY MUTATION FOR TESTING
        //this.mutations.push(new NearBerryMutation(1, BerryType.Cheri, [{berryType: BerryType.Cheri, berryStage: PlotStage.Seed}]));
        /*this.mutations.push(new NearBerryMutation(1, BerryType.Cheri,
            [
                {berryType: BerryType.Cheri, berryStage: PlotStage.Seed},
                {berryType: BerryType.Chesto, berryStage: PlotStage.Seed},
            ]));*/
        //this.mutations.push(new FlavorMutation(1, BerryType.Persim, [15, 0, 0, 0, 0]));

        //#region Second Generation

        // Persim
        this.mutations.push(new NearBerryMutation(.0005, BerryType.Persim,
            [
                {berryType: BerryType.Pecha, berryStage: PlotStage.Berry},
                {berryType: BerryType.Oran, berryStage: PlotStage.Berry},
            ]));
        // Razz
        this.mutations.push(new NearBerryMutation(.00045, BerryType.Razz,
            [
                {berryType: BerryType.Cheri, berryStage: PlotStage.Berry},
                {berryType: BerryType.Leppa, berryStage: PlotStage.Berry},
            ]));
        // Bluk
        this.mutations.push(new NearBerryMutation(.0004, BerryType.Bluk,
            [
                {berryType: BerryType.Chesto, berryStage: PlotStage.Berry},
                {berryType: BerryType.Leppa, berryStage: PlotStage.Berry},
            ]));
        // Nanab
        this.mutations.push(new NearBerryMutation(.0003, BerryType.Nanab,
            [
                {berryType: BerryType.Pecha, berryStage: PlotStage.Berry},
                {berryType: BerryType.Aspear, berryStage: PlotStage.Berry},
            ]));
        // Wepear
        this.mutations.push(new NearBerryMutation(.0002, BerryType.Wepear,
            [
                {berryType: BerryType.Rawst, berryStage: PlotStage.Berry},
                {berryType: BerryType.Oran, berryStage: PlotStage.Berry},
            ]));
        // Pinap
        this.mutations.push(new NearBerryMutation(.0001, BerryType.Pinap,
            [
                {berryType: BerryType.Sitrus, berryStage: PlotStage.Berry},
                {berryType: BerryType.Aspear, berryStage: PlotStage.Berry},
            ]));

        // Figy
        this.mutations.push(new FlavorMutation(.00009, BerryType.Figy,
            [25, 0, 0, 0, 0], undefined,
            'I\'ve heard that a berry will appear if its surroundings get too spicy!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Cheri]();
            }));
        // Wiki
        this.mutations.push(new FlavorMutation(.00008, BerryType.Wiki,
            [0, 25, 0, 0, 0], undefined,
            'I\'ve heard that a berry will appear if its surrounds get too dry!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Chesto]();
            }));
        // Mago
        this.mutations.push(new FlavorMutation(.00007, BerryType.Mago,
            [0, 0, 25, 0, 0], undefined,
            'I\'ve heard that a berry will appear if its surrounds get too sweet!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Pecha]();
            }));
        // Aguav
        this.mutations.push(new FlavorMutation(.00006, BerryType.Aguav,
            [0, 0, 0, 25, 0], undefined,
            'I\'ve heard that a berry will appear if its surrounds get too bitter!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Rawst]();
            }));
        // Iapapa
        this.mutations.push(new FlavorMutation(.00005, BerryType.Iapapa,
            [0, 0, 0, 0, 25], undefined,
            'I\'ve heard that a berry will appear if its surrounds get too sour!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Aspear]();
            }));

        // Lum
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Lum,
            [
                {berryType: BerryType.Cheri, berryStage: PlotStage.Berry},
                {berryType: BerryType.Chesto, berryStage: PlotStage.Berry},
                {berryType: BerryType.Pecha, berryStage: PlotStage.Berry},
                {berryType: BerryType.Rawst, berryStage: PlotStage.Berry},
                {berryType: BerryType.Aspear, berryStage: PlotStage.Berry},
                {berryType: BerryType.Leppa, berryStage: PlotStage.Berry},
                {berryType: BerryType.Oran, berryStage: PlotStage.Berry},
                {berryType: BerryType.Sitrus, berryStage: PlotStage.Berry},
            ],
            'I\'ve heard that there\'s a legendary berry that only appears when fully surrounded by unique ripe berry plants!'));

        //#endregion

        //#region Third Generation

        //#endregion

        //#region Fourth Generation

        //#endregion

        //#region Fifth Generation

        //#endregion

        //#endregion

    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        return multiplier;
    }

    getReplantMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Squirtbottle);
        return multiplier;
    }

    getMutationMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Sprinklotad);
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta;

        const notifications = new Set<FarmNotificationType>();

        this.plotList.forEach(plot => {
            plot.update(timeToReduce);
            if (plot.notifications) {
                plot.notifications.forEach(n => notifications.add(n));
                plot.notifications = [];
            }
        });

        this.counter += GameConstants.TICK_TIME;
        if (this.counter >= GameConstants.MUTATION_TICK) {
            this.mutations.forEach(mutation => {
                if (mutation.mutate()) {
                    notifications.add(FarmNotificationType.Mutated);
                }
            });
            this.counter = 0;
        }

        if (notifications.size) {
            notifications.forEach(function(n) {
                this.handleNotification(n);
            }, this);
        }
    }

    // TODO: HLXII Change details of notifier for different notifications
    handleNotification(type: FarmNotificationType): void {
        switch (type) {
            case FarmNotificationType.Ripe:
                Notifier.notify({
                    message: 'A berry is ready to harvest!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Withered:
                Notifier.notify({
                    message: 'A berry plant has withered!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Mutated:
                Notifier.notify({
                    message: 'A berry plant has mutated!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Replanted:
                Notifier.notify({
                    message: 'A berry has been replanted!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Dropped:
                Notifier.notify({
                    message: 'A berry has been dropped!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.MulchRanOut:
                Notifier.notify({
                    message: 'A plot has run out of mulch!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
        }
    }

    unlockPlot() {
        const index = this.unlockBerryIndex();
        if (this.canBuyPlot()) {
            GameHelper.incrementObservable(this.berryList[index], this.calculatePlotPrice());
            this.plotList[index + 1].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList[this.plotList.length - 1].isUnlocked;
    }

    canBuyPlot() {
        return !this.allPlotsUnlocked() && App.game.farming.berryList[this.unlockBerryIndex()]() > this.calculatePlotPrice();
    }

    calculatePlotPrice(): number {
        if (this.allPlotsUnlocked()) {
            return Infinity;
        }

        // TODO: HLXII Rebalance cost based on berry growth rate
        return 10 * Math.floor(Math.pow(this.unlockedPlotCount(), 2));
    }

    unlockedPlotCount() {
        return App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
    }

    unlockBerryIndex() {
        return this.unlockedPlotCount() - 1;
    }

    highestUnlockedBerry(): number {
        for (let i = GameConstants.AMOUNT_OF_BERRY_TYPES - 1;i >= 0;i--) {
            if (this.unlockedBerries[i]()) {
                return i;
            }
        }
        return 0;
    }

    plant(index: number, berry: BerryType) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry)) {
            return;
        }

        GameHelper.incrementObservable(this.berryList[berry], -1);
        plot.berry = berry;
        plot.age = 0;
        plot.notifications = [];
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry);
        });
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number): void {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.stage() != PlotStage.Berry) {
            return;
        }

        App.game.wallet.gainFarmPoints(this.berryData[plot.berry].farmValue);

        const amount = plot.harvest();

        GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
        GameHelper.incrementObservable(App.game.statistics.berriesHarvested[plot.berry], amount);
        this.gainBerry(plot.berry, amount);

        App.game.oakItems.use(OakItems.OakItem.Sprayduck);

        plot.die(true);
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index);
        });
    }

    /**
     * Adds mulch to a plot
     * @param index The plot index
     * @param mulch The MulchType to be added
     */
    public addMulch(index: number, mulch: MulchType) {
        const plot = this.plotList[index];
        if (!plot.isUnlocked || !this.hasMulch(mulch)) {
            return;
        }

        GameHelper.incrementObservable(this.mulchList[mulch], -1);
        plot.mulch = mulch;
        plot.mulchTimeLeft = GameConstants.MULCH_USE_TIME;
    }

    /**
     * Attempts to add mulch to all plots
     * @param mulch The MulchType to be added
     */
    public mulchAll(mulch: MulchType) {
        this.plotList.forEach((plot, index) => {
            this.addMulch(index, mulch);
        });
    }

    /**
     * Gives the player a random berry from the first 8 types
     * @param amount Amount of berries to give. Defaults to 1.
     * @param disableNotification Set to true to not notify the player. Defaults to false.
     */
    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({
                message: `You got a ${BerryType[berry]} berry!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.route_item_found,
            });
        }
        this.gainBerry(berry, amount);
    }

    gainBerry(berry: BerryType, amount = 1) {
        GameHelper.incrementObservable(this.berryList[berry], Math.floor(amount));

        if (!this.unlockedBerries[berry]()) {
            this.unlockedBerries[berry](true);
            FarmController.resetPages();
        }
    }

    hasBerry(berry: BerryType) {
        return this.berryList[berry]() > 0;
    }

    hasMulch(mulch: MulchType) {
        return this.mulchList[mulch]() > 0;
    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
    }

    toJSON(): Record<string, any> {
        return {
            berryList: this.berryList.map(ko.unwrap),
            unlockedBerries: this.unlockedBerries.map(ko.unwrap),
            mulchList: this.mulchList.map(ko.unwrap),
            plotList: this.plotList.map(plot => plot.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedBerries = json['berryList'];
        if (savedBerries == null) {
            this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        } else {
            (savedBerries as number[]).forEach((value: number, index: number) => {
                this.berryList[index](value);
            });
        }

        const savedUnlockedBerries = json['unlockedBerries'];
        if (savedUnlockedBerries == null) {
            this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        } else {
            (savedUnlockedBerries as boolean[]).forEach((value: boolean, index: number) => {
                this.unlockedBerries[index](value);
            });
        }

        const savedMulches = json['mulchList'];
        if (savedMulches == null) {
            this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        } else {
            (savedMulches as number[]).forEach((value: number, index: number) => {
                this.mulchList[index](value);
            });
        }

        const savedPlots = json['plotList'];
        if (savedPlots == null) {
            this.plotList = this.defaults.plotList;
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: Plot = new Plot(false, BerryType.None, 0, MulchType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
    }

    public static getGeneration(gen: number): BerryType[] {
        const genBounds = [0, 8, 20, 35, 53, Infinity];
        return App.game.farming.berryData.filter(berry => berry.type >= genBounds[gen] && berry.type < genBounds[gen + 1]).map(berry => berry.type);
    }

    public static getColor(color: BerryColor): BerryType[] {
        return App.game.farming.berryData.filter(berry => berry.color === color).map(berry => berry.type);
    }
}
