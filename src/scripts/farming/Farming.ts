class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: Berry[] = [];
    mutations: Mutation[] = [];

    externalAuras: KnockoutObservable<number>[];

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

        this.externalAuras = [];
        this.externalAuras[AuraType.Attract] = ko.observable<number>(1);
        this.externalAuras[AuraType.Egg] = ko.observable<number>(1);
    }

    initialize(): void {

        //#region Berry Data

        //#region First Generation
        this.berryData[BerryType.Cheri]     = new Berry(BerryType.Cheri,    [5,10,20,30,60],
            2, 0.5, 5,
            [10, 0, 0, 0, 0], BerryColor.Red,
            ['This bright red Berry is very spicy and has a provocative flavor. It blooms with delicate, pretty flowers.']);
        this.berryData[BerryType.Chesto]    = new Berry(BerryType.Chesto,   [5,15,25,40,80],
            3, 0.5, 6,
            [0, 10, 0, 0, 0], BerryColor.Purple,
            ['This Berry\'s thick skin and fruit are very tough and dry tasting. However, every bit of it can be eaten.']);
        this.berryData[BerryType.Pecha]     = new Berry(BerryType.Pecha,    [10,35,50,60,120],
            3, 0.4, 7,
            [0, 0, 10, 0, 0], BerryColor.Pink,
            ['Because of its hollow inside pocket, there isn\'t a lot to eat. What can be eaten is very sweet and delicious']);
        this.berryData[BerryType.Rawst]     = new Berry(BerryType.Rawst,    [15,30,45,80,160],
            4, 0.4, 8,
            [0, 0, 0, 10, 0], BerryColor.Green,
            ['If the leaves grow longer and curlier than average, this Berry will have a somewhat-bitter taste.']);
        this.berryData[BerryType.Aspear]    = new Berry(BerryType.Aspear,   [10,40,50,110,220],
            4, 0.3, 9,
            [0, 0, 0, 0, 10], BerryColor.Yellow,
            ['This Berry\'s peel is hard, but the flesh inside is very juicy. It is distinguished by its bracing sourness.']);
        this.berryData[BerryType.Leppa]     = new Berry(BerryType.Leppa,    [100,120,140,240,480],
            5, 0.3, 10,
            [10, 0, 10, 10, 10], BerryColor.Red,
            ['It takes longer to grow than Berries such as Cheri. The smaller Berries taste better.']);
        this.berryData[BerryType.Oran]      = new Berry(BerryType.Oran,     [120,180,240,300,600],
            6, 0.2, 20,
            [10, 10, 0, 10, 10], BerryColor.Blue,
            ['Nature\'s gifts came together as one in this Berry. It has a wondrous mix of flavors that spread in the mouth.']);
        this.berryData[BerryType.Sitrus]    = new Berry(BerryType.Sitrus,   [150,300,450,600,1200],
            8, 0.2, 30,
            [0, 10, 10, 10, 10], BerryColor.Yellow,
            ['Sitrus came from the same family as Oran. It is larget and smoother tasting than Oran.']);
        //#endregion

        //#region Second Generation
        this.berryData[BerryType.Persim]    = new Berry(BerryType.Persim,   [20,40,60,90,180],
            5, 0.2, 40,
            [10, 10, 10, 0, 10], BerryColor.Pink,
            ['The more this berry absorbs energy from sunlight, the more vivdly colorful it grows.']);
        this.berryData[BerryType.Razz]      = new Berry(BerryType.Razz,     [100,150,200,250,500],
            15, 0.2, 50,
            [10, 10, 0, 0, 0], BerryColor.Red,
            ['A small hint of spiciness lingers in the red granules surrounding this Berry. Their centers have a dry taste.']);
        this.berryData[BerryType.Bluk]      = new Berry(BerryType.Bluk,     [200,250,300,330,660],
            20, 0.2, 60,
            [0, 10, 10, 0, 0], BerryColor.Purple,
            ['Though this small, delicately skinned Berry is blue in color, it dyes the mouth black when eaten.']);
        this.berryData[BerryType.Nanab]     = new Berry(BerryType.Nanab,    [25,30,35,250,500],
            11, 0.2, 70,
            [0, 0, 10, 10, 0], BerryColor.Pink,
            ['Bitter, but with a trace of sweetness, the Nanab Berry was the seventh to be discovered in the world.']);
        this.berryData[BerryType.Wepear]    = new Berry(BerryType.Wepear,   [150,350,335,400,800],
            18, 0.2, 80,
            [0, 0, 0, 10, 10], BerryColor.Green,
            ['The potent mix of bitter and sour in this Berry seems to promote digestion. The flower is white and beautiful.']);
        this.berryData[BerryType.Pinap]     = new Berry(BerryType.Pinap,    [30,60,180,240,480],
            9, 0.2, 90,
            [10, 0, 0, 0, 10], BerryColor.Yellow,
            ['It is said that when the sour skin is peeled, this spicy Berry can be crushed to make medicine.']);

        this.berryData[BerryType.Figy]      = new Berry(BerryType.Figy,     [40,160,230,350,700],
            16, 0.15, 100,
            [15, 0, 0, 0, 0], BerryColor.Red,
            ['This Berry is oddly shaped, appearing as if someone took a bite out of it. It is packed full of spicy substances.']);
        this.berryData[BerryType.Wiki]      = new Berry(BerryType.Wiki,     [40,190,210,360,720],
            17, 0.15, 110,
            [0, 15, 0, 0, 0], BerryColor.Purple,
            ['It is said that this Berry grew lumps to help Pokémon grip it, allowing propagation farther afield.']);
        this.berryData[BerryType.Mago]      = new Berry(BerryType.Mago,     [40,180,240,370,740],
            18, 0.15, 120,
            [0, 0, 15, 0, 0], BerryColor.Pink,
            ['This Berry progressively curves as it grows. The curvier the Berry, the sweeter and tastier.']);
        this.berryData[BerryType.Aguav]     = new Berry(BerryType.Aguav,    [40,170,220,350,700],
            19, 0.15, 130,
            [0, 0, 0, 15, 0], BerryColor.Green,
            ['This Berry turns bitter toward the stem. The dainty flower it grows from doesn\'t absorb much sunlight.']);
        this.berryData[BerryType.Iapapa]    = new Berry(BerryType.Iapapa,   [40,200,230,380,760],
            20, 0.15, 140,
            [0, 0, 0, 0, 15], BerryColor.Yellow,
            ['This Berry is very big and sour. The juiciness of the pulp accentuates the sourness.']);

        this.berryData[BerryType.Lum]       = new Berry(BerryType.Lum,      [970,980,990,1000,2000],
            2, 0, 750,
            [10, 10, 10, 10, 0], BerryColor.Green,
            [
                'This Berry\'s gradual process of storing nutrients beneficial to Pokémon heath causes it to mature slowly.',
                'This Berry minorly promotes the growth of Berry plants around it.',
            ], new Aura(AuraType.Growth, [1.01, 1.02, 1.03]));
        //#endregion

        //#region Third Generation
        this.berryData[BerryType.Pomeg]     = new Berry(BerryType.Pomeg,    [110, 510, 890, 900, 1800],
            20, 0.1, 200,
            [10, 0, 10, 10, 0], BerryColor.Red,
            ['When this sweetly spicy Berry\'s thick skin is peeled, many pieces of the fruit spill out.']);
        this.berryData[BerryType.Kelpsy]    = new Berry(BerryType.Kelpsy,   [170, 710, 990, 1000, 2000],
            29, 0.1, 250,
            [0, 10, 0, 10, 10], BerryColor.Blue,
            ['This Berry can be eaten as is or boiled to obtain an extract that adds a dash of flavor to food.']);
        this.berryData[BerryType.Qualot]    = new Berry(BerryType.Qualot,   [430, 640, 730, 1200, 2400],
            25, 0.1, 300,
            [10, 0, 10, 0, 10], BerryColor.Yellow,
            ['Even in places of constant rain and high humidity, this Berry\'s plant grows healthy and strong.']);
        this.berryData[BerryType.Hondew]    = new Berry(BerryType.Hondew,   [310, 3630, 4880, 5000, 10000],
            26, 0.1, 2500,
            [10, 10, 0, 10, 0], BerryColor.Green,
            ['This somewhat-rare Berry projects an image of luxury, so it is favored as a gift item.']);
        this.berryData[BerryType.Grepa]     = new Berry(BerryType.Grepa,    [300, 450, 1190, 1300, 2600],
            14, 0.1, 400,
            [0, 10, 10, 0, 10], BerryColor.Yellow,
            ['One bite of this very tender Berry fills the mouth with its sweet and tangy flavor.']);
        this.berryData[BerryType.Tamato]    = new Berry(BerryType.Tamato,   [180, 560, 1060, 1100, 2200],
            15, 0.1, 410,
            [20, 10, 0, 0, 0], BerryColor.Red,
            ['This Berry is large and spicy. When eaten during the cold season, it warms the body from inside.']);

        this.berryData[BerryType.Cornn]     = new Berry(BerryType.Cornn,    [350, 780, 1300, 1800, 3600],
            16, 0.05, 500,
            [0, 20, 10, 0, 0], BerryColor.Purple,
            ['Its dryness is quite strong. As a result, its true deliciousness can\'t be appreciated by just eating one or two.']);
        this.berryData[BerryType.Magost]    = new Berry(BerryType.Magost,   [460, 810, 1370, 2500, 5000],
            17, 0.05, 550,
            [0, 0, 20, 10, 0], BerryColor.Pink,
            ['The grown-up flavor and dreamy sweetness of this Berry make it a favorite of Pokémon everywhere.']);
        this.berryData[BerryType.Rabuta]    = new Berry(BerryType.Rabuta,   [130, 1100, 1990, 2000, 4000],
            18, 0.05, 600,
            [0, 0, 0, 20, 10], BerryColor.Green,
            ['Even though it is bitter, it should be eaten peel and all. The hair on the peel cleans the stomach from the inside.']);
        this.berryData[BerryType.Nomel]     = new Berry(BerryType.Nomel,    [360, 1000, 1620, 2600, 5200],
            19, 0.05, 650,
            [10, 0, 0, 0, 20], BerryColor.Yellow,
            ['This Berry is quite sour overall, with the sourness especially concentrated at the pointed end.']);
        this.berryData[BerryType.Spelon]    = new Berry(BerryType.Spelon,   [360, 980, 1610, 2300, 4600],
            20, 0.05, 700,
            [30, 10, 0, 0, 0], BerryColor.Red,
            ['So spicy is the Spelon Berry that, Fire type or not, Pokémon will try to breathe fire after eating a single one.']);
        this.berryData[BerryType.Pamtre]    = new Berry(BerryType.Pamtre,   [460, 1250, 2680, 3000, 6000],
            21, 0.05, 750,
            [0, 30, 10, 0, 0], BerryColor.Purple,
            ['This Berry drifted from a faraway sea. It is now cultivated in the Sinnoh region.']);
        this.berryData[BerryType.Watmel]    = new Berry(BerryType.Watmel,   [310, 1350, 2340, 2700, 5400],
            22, 0.05, 800,
            [0, 0, 30, 10, 0], BerryColor.Pink,
            ['A bounty of nature that is exceedingly sweet. The Berry is huge, with some discovered that exceed 20 inches.']);
        this.berryData[BerryType.Durin]     = new Berry(BerryType.Durin,    [150, 1130, 2480, 3100, 6200],
            23, 0.05, 850,
            [0, 0, 0, 30, 10], BerryColor.Green,
            ['This Berry is tremendously bitter. Just one bite is enough to instantly stop hiccups.']);
        this.berryData[BerryType.Belue]     = new Berry(BerryType.Belue,    [300, 870, 960, 2200, 4400],
            24, 0.05, 900,
            [10, 0, 0, 0, 30], BerryColor.Purple,
            ['This glossy and colorful Berry has a mouthwateringly delicious appearance. However, it is awfully sour.']);
        //#endregion

        //#region Fourth Generation (Typed)
        this.berryData[BerryType.Occa]      = new Berry(BerryType.Occa,     [220, 1660, 2460, 3600, 7200],
            12, 0.03, 950,
            [15, 0, 10, 0, 0], BerryColor.Red,
            [
                'This Berry is said to have grown plentiful in the tropics of the past. It boasts an intensely hot spiciness.',
                'It has a tendency to overtake nearby plants.',
            ]);
        this.berryData[BerryType.Passho]    = new Berry(BerryType.Passho,   [490, 2460, 4970, 6000, 12000],
            13, 0.03, 1000,
            [0, 15, 0, 10, 0], BerryColor.Blue,
            [
                'This Berry\'s flesh is dotted with countless tiny bubbles of air that keep it afloat in water.',
                'This Berry the promotes the fruiting of nearby Berry plants.',
            ], new Aura(AuraType.Harvest, [1.2, 1.4, 1.6]));
        this.berryData[BerryType.Wacan]     = new Berry(BerryType.Wacan,    [180, 870, 940, 1800, 3600],
            9, 0.03, 1050,
            [0, 0, 15, 0, 10], BerryColor.Yellow,
            [
                'Energy from lightning strikes is drawn into the plant, making the Berries grow big and rich.',
                'The same energy promotes the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [1.2, 1.4, 1.6]));
        this.berryData[BerryType.Rindo]     = new Berry(BerryType.Rindo,    [140, 1160, 2210, 2600, 5200],
            15, 0.03, 1100,
            [10, 0, 0, 15, 0], BerryColor.Green,
            [
                'This Berry has a disagreeable "green" flavor and scent typical of vegetables. It is rich in health-promoting fiber.',
                'It has a tendency to expand into nearby plots.',
            ]);
        this.berryData[BerryType.Yache]     = new Berry(BerryType.Yache,    [680, 2700, 5280, 7000, 14000],
            16, 0.03, 4500,
            [0, 10, 0, 0, 15], BerryColor.Blue,
            [
                'This Berry has a refreshing flavor that strikes a good balance of dryness and sourness. It tastes better chilled.',
                'This Berry slows the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [0.9, 0.8, 0.7]));
        this.berryData[BerryType.Chople]    = new Berry(BerryType.Chople,   [350, 2640, 4130, 4200, 8400],
            17, 0.03, 1200,
            [15, 0, 0, 10, 0], BerryColor.Red,
            [
                'This Berry contains a substance that generates heat. It can even heat up a chilly heart.',
                'Growing these Berries will promote Egg growth.',
            ], new Aura(AuraType.Egg, [1.1, 1.2, 1.3]));
        this.berryData[BerryType.Kebia]     = new Berry(BerryType.Kebia,    [150, 1400, 1600, 2000, 4000],
            11, 0.03, 500,
            [0, 15, 0, 0, 10], BerryColor.Green,
            [
                'This Berry is a brilliant green on the outside. Inside, it is packed with a dry-flavored, black-colored flesh.',
                'It has a tendency to overtake nearby plants.',
                'Due to its poisonous nature, it increases the chances of mutations near it.',
            ], new Aura(AuraType.Mutation, [1.2, 1.4, 1.6]));
        this.berryData[BerryType.Shuca]     = new Berry(BerryType.Shuca,    [320, 3980, 6320, 8000, 16000],
            19, 0.03, 1300,
            [10, 0, 15, 0, 0], BerryColor.Yellow,
            [
                'The sweetness-laden pulp has just the hint of a hard-edged and fragrant bite to it.',
                'Growing these Berries will soften the ground around it, increasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [1.2, 1.4, 1.6]));
        this.berryData[BerryType.Coba]      = new Berry(BerryType.Coba,     [240, 1400, 2310, 3500, 7000],
            20, 0.03, 1350,
            [0, 10, 0, 15, 0], BerryColor.Blue,
            ['This Berry is said to be a new kind that is a cross of two Berries brought together by winds from far away.']);
        this.berryData[BerryType.Payapa]    = new Berry(BerryType.Payapa,   [270, 1630, 3670, 6500, 13000],
            21, 0.03, 1400,
            [0, 0, 10, 0, 15], BerryColor.Purple,
            [
                'This Berry is said to sense human emotions for the way it swells roundly when a person approaches.',
                'The same behavior affects nearby plants, causing additional mutations.',
            ], new Aura(AuraType.Mutation, [1.1, 1.2, 1.3]));
        this.berryData[BerryType.Tanga]     = new Berry(BerryType.Tanga,    [420, 770, 1760, 2300, 4600],
            16, 0.03, 1100,
            [20, 0, 0, 0, 10], BerryColor.Green,
            [
                'The flower grows at the tip of this Berry. It attracts Bug Pokémon by letting its stringy petals stream out.',
                'The attracted Bug Pokémon decreases the amount of harvestable Berries in nearby plants',
            ], new Aura(AuraType.Harvest, [0.9, 0.8, 0.7]));
        this.berryData[BerryType.Charti]    = new Berry(BerryType.Charti,   [490, 3660, 4550, 9000, 18000],
            23, 0.03, 6000,
            [10, 20, 0, 0, 0], BerryColor.Yellow,
            [
                'It is often used for pickles because of its very dry flavor. It can also be eaten raw for its provocative taste.',
                'This Berry plant hardens the surrounding soil, decreasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [0.9, 0.8, 0.7]));
        this.berryData[BerryType.Kasib]     = new Berry(BerryType.Kasib,    [1000, 6370, 8580, 11000, 22000],
            24, 0.03, 1350,
            [0, 10, 20, 0, 0], BerryColor.Purple,
            [
                'Considered to have a special power from the olden days, this Berry is sometimes dried and used as a good-luck charm.',
                'Nearby Pokémon are wary of this Berry plant.',
            ], new Aura(AuraType.Attract, [0.9, 0.8, 0.7]));
        this.berryData[BerryType.Haban]     = new Berry(BerryType.Haban,    [1300, 9870, 10200, 15000, 30000],
            25, 0.03, 15000,
            [0, 0, 10, 20, 0], BerryColor.Red,
            [
                'If a large enough volume of this Berry is boiled down, its bitterness fades away. It makes a good jam.',
                'This Berry requires a lot of energy to grow, stealing away nutrients from nearby plots.',
            ], new Aura(AuraType.Growth, [0.8, 0.6, 0.5]));
        this.berryData[BerryType.Colbur]    = new Berry(BerryType.Colbur,   [380, 3790, 4650, 5500, 11000],
            26, 0.03, 1650,
            [0, 0, 0, 10, 20], BerryColor.Purple,
            [
                'Tiny hooks grow on the surface of this Berry. It latches on to Pokémon so it can be carried to far-off places.',
                'It has a tendency to overtake nearby plants.',
            ]);
        this.berryData[BerryType.Babiri]    = new Berry(BerryType.Babiri,   [1210, 8630, 9410, 10000, 20000],
            27, 0.03, 3200,
            [25, 10, 0, 0, 0], BerryColor.Green,
            [
                'This Berry is very tough with a strong flavor. It was used to make medicine by people in the past.',
                'This Berry plant is very hardy and resistant, causing less mutations around it.',
            ], new Aura(AuraType.Mutation, [0.9, 0.8, 0.7]));
        this.berryData[BerryType.Chilan]    = new Berry(BerryType.Chilan,   [240, 1430, 2970, 3200, 6400],
            17, 0.03, 1320,
            [0, 25, 10, 0, 0], BerryColor.Yellow,
            ['This Berry can be cored out and dried to make a whistle. Blowing through its hole makes an indescribable sound.']);
        this.berryData[BerryType.Roseli]    = new Berry(BerryType.Roseli,   [370, 3520, 4580, 5600, 11200],
            29, 0.03, 1800,
            [0, 0, 25, 10, 0], BerryColor.Pink,
            [
                'This Berry is sweet with a hint of bitterness and has a lingering sweet scent. It is often dried and used to make tea.',
                'The scent of this Berry plant attracts wild Pokémon.',
            ], new Aura(AuraType.Attract, [1.2, 1.4, 1.6]));
        //#endregion

        //#region Fifth Generation
        this.berryData[BerryType.Liechi]    = new Berry(BerryType.Liechi,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 0, 0], BerryColor.Red,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sea.']); // TODO: Set properties
        this.berryData[BerryType.Ganlon]    = new Berry(BerryType.Ganlon,   [5,10,15,20,40],
            1, .1, 60,
            [0, 30, 10, 30, 0], BerryColor.Purple,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the land.']); // TODO: Set properties
        this.berryData[BerryType.Salac]     = new Berry(BerryType.Salac,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 30, 10, 30], BerryColor.Green,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sky.']); // TODO: Set properties
        this.berryData[BerryType.Petaya]    = new Berry(BerryType.Petaya,   [5,10,15,20,40],
            1, .1, 60,
            [30, 0, 0, 30, 10], BerryColor.Pink,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of all living things.']); // TODO: Set properties
        this.berryData[BerryType.Apicot]    = new Berry(BerryType.Apicot,   [5,10,15,20,40],
            1, .1, 60,
            [10, 30, 0, 0, 30], BerryColor.Blue,
            ['This is a very, very mystifying Berry. There is no telling how it can be used, or what may happen if it is used.']); // TODO: Set properties
        this.berryData[BerryType.Lansat]    = new Berry(BerryType.Lansat,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Red,
            ['This is said to be a legendary Berry. Holding it supposedly brings great joy.']); // TODO: Set properties
        this.berryData[BerryType.Starf]     = new Berry(BerryType.Starf,    [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Green,
            ['This Berry is considered a mirage. It was said to be so strong that it had to be abandoned at the world\'s edge.']); // TODO: Set properties
        this.berryData[BerryType.Micle]     = new Berry(BerryType.Micle,    [5,10,15,20,40],
            1, .1, 60,
            [0, 40, 10, 0, 0], BerryColor.Green,
            ['This Berry has a very dry flavor. It has the effect of making other food eaten at the same time taste sweet.']); // TODO: Set properties
        this.berryData[BerryType.Custap]    = new Berry(BerryType.Custap,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 40, 10, 0], BerryColor.Red,
            ['The flesh underneath the Custap Berry\'s tough skin is sweet and creamy soft.']); // TODO: Set properties

        this.berryData[BerryType.Jaboca]    = new Berry(BerryType.Jaboca,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 40, 10], BerryColor.Yellow,
            [
                'The cluster of drupelets that make up this Berry pop rhythmically if the berry is handled roughly.',
                'The sound of these Berries attracts wild Pokémon.',
            ]); // TODO: Set properties
        this.berryData[BerryType.Rowap]     = new Berry(BerryType.Rowap,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 40], BerryColor.Blue,
            ['In days of old, people worked the top-shaped pieces of this Berry free and used them as toys.']); // TODO: Set properties
        this.berryData[BerryType.Kee]       = new Berry(BerryType.Kee,      [5,10,15,20,40],
            1, .1, 60,
            [30, 30, 10, 10, 10], BerryColor.Yellow,
            ['This Berry remains poisonous until fully ripened. Once ripe it has a spicy and sweet complex flavor.']); // TODO: Set properties
        this.berryData[BerryType.Maranga]   = new Berry(BerryType.Maranga,  [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 30, 30, 10], BerryColor.Blue,
            ['This Berry resembles the Durin Berry, however its spikes are less pronounced. It is quite delicious when roasted.']); // TODO: Set properties

        this.berryData[BerryType.Enigma]    = new Berry(BerryType.Enigma,   [5,10,15,20,40],
            1, .1, 60,
            [40, 10, 0, 0, 0], BerryColor.Purple,
            ['A completely enigmatic Berry. It apparently has the power of the stars that fill the night sky.']); // TODO: Set properties
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
        this.mutations.push(new NearBerryMutation(.000015, BerryType.Lum,
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

        // Pomeg
        this.mutations.push(new NearBerryMutation(.00005, BerryType.Pomeg,
            [
                {berryType: BerryType.Iapapa, berryStage: PlotStage.Bloom},
                {berryType: BerryType.Mago, berryStage: PlotStage.Bloom},
            ]));
        // Kelpsy
        this.mutations.push(new NearBerryMutation(.00005, BerryType.Kelpsy,
            [
                {berryType: BerryType.Chesto, berryStage: PlotStage.Bloom},
                {berryType: BerryType.Persim, berryStage: PlotStage.Bloom},
            ]));
        // Qualot
        this.mutations.push(new FlavorMutation(.00005, BerryType.Qualot,
            [10, 0, 10, 0, 10], true,
            'I\'ve heard that a berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy, a little sweet, and a little sour at the same time.',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Cheri]() &&
                App.game.farming.unlockedBerries[BerryType.Pecha]() &&
                App.game.farming.unlockedBerries[BerryType.Aspear]();
            }));
        // Hondew
        this.mutations.push(new FlavorMutation(.00004, BerryType.Hondew,
            [10, 10, 0, 10, 10], true,
            'I\'ve heard that a berry will appear if its surroundings match its flavor profile! If I recall, it tasted like a little bit of everything except sweet.',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Cheri]() &&
                App.game.farming.unlockedBerries[BerryType.Chesto]() &&
                App.game.farming.unlockedBerries[BerryType.Rawst]() &&
                App.game.farming.unlockedBerries[BerryType.Aspear]();
            }));
        // Grepa
        this.mutations.push(new NearBerryMutation(.00005, BerryType.Grepa,
            [
                {berryType: BerryType.Aguav, berryStage: PlotStage.Berry},
                {berryType: BerryType.Figy, berryStage: PlotStage.Berry},
            ]));
        // Tamato
        this.mutations.push(new ParasiteMutation(.00005, BerryType.Tamato,
            BerryType.Lum, BerryType.Sitrus,
            'I\'ve heard that if you grow a Lum Berry plant near a Sitrus one, the Lum has a chance of transforming the Sitrus plant into something new!'));

        // Cornn
        this.mutations.push(new NearBerryMutation(.00003, BerryType.Cornn,
            [
                {berryType: BerryType.Leppa, berryStage: PlotStage.Berry},
                {berryType: BerryType.Bluk, berryStage: PlotStage.Berry},
                {berryType: BerryType.Wiki, berryStage: PlotStage.Berry},
            ]));

        // Magost
        this.mutations.push(new NearBerryMutation(.00003, BerryType.Magost,
            [
                {berryType: BerryType.Pecha, berryStage: PlotStage.Berry},
                {berryType: BerryType.Nanab, berryStage: PlotStage.Berry},
                {berryType: BerryType.Mago, berryStage: PlotStage.Berry},
            ]));
        // Rabuta
        this.mutations.push(new ParasiteMutation(.00003, BerryType.Rabuta,
            BerryType.Aguav, BerryType.Aspear,
            'I\'ve heard that if you grow a Aguav Berry plant near a Aspear one, the Aguav has a chance of transforming the Aspear plant into something new!'));
        // Nomel
        this.mutations.push(new NearBerryMutation(.00003, BerryType.Nomel,
            [{berryType: BerryType.Pinap, berryStage: PlotStage.Berry}]));
        // Spelon
        this.mutations.push(new FlavorMutation(.00002, BerryType.Spelon,
            [130, 0, 0, 0, 0], undefined,
            'I\'ve heard that a Berry will appear if its surroundings get extremely spicy!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Tamato]();
            }));
        // Pamtre
        this.mutations.push(new FlavorMutation(.00002, BerryType.Pamtre,
            [0, 130, 0, 0, 0], undefined,
            'I\'ve heard that a Berry will appear if its surroundings get extremely dry!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Cornn]();
            }));
        // Pamtre Overgrow
        this.mutations.push(new NearBerryMutation(.00004, BerryType.Pamtre,
            [{berryType: BerryType.Pamtre, berryStage: PlotStage.Berry}], undefined, undefined, false));
        // Watmel
        this.mutations.push(new FlavorMutation(.00002, BerryType.Watmel,
            [0, 0, 130, 0, 0], undefined,
            'I\'ve heard that a Berry will appear if its surroundings get extremely sweet!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Magost]();
            }));
        // Durin
        this.mutations.push(new FlavorMutation(.00002, BerryType.Durin,
            [0, 0, 0, 130, 0], undefined,
            'I\'ve heard that a Berry will appear if its surroundings get extremely bitter!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Rabuta]();
            }));
        // Belue
        this.mutations.push(new FlavorMutation(.00002, BerryType.Belue,
            [0, 0, 0, 0, 130], undefined,
            'I\'ve heard that a Berry will appear if its surroundings get extremely sour!',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Nomel]();
            }));

        //#endregion

        //#region Fourth Generation

        // Occa
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Occa,
            [
                {berryType: BerryType.Cheri, berryStage: PlotStage.Berry},
                {berryType: BerryType.Figy, berryStage: PlotStage.Berry},
                {berryType: BerryType.Tamato, berryStage: PlotStage.Berry},
                {berryType: BerryType.Spelon, berryStage: PlotStage.Berry},
            ]));
        // Occa Overgrow
        this.mutations.push(new ParasiteMutation(.00004, BerryType.Occa,
            BerryType.Occa, undefined, undefined, undefined, false));
        // Passho
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Passho,
            [
                {berryType: BerryType.Oran, berryStage: PlotStage.Berry},
                {berryType: BerryType.Chesto, berryStage: PlotStage.Berry},
                {berryType: BerryType.Kelpsy, berryStage: PlotStage.Berry},
                {berryType: BerryType.Coba, berryStage: PlotStage.Berry},
            ]));
        // Wacan
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Wacan,
            [
                {berryType: BerryType.Aspear, berryStage: PlotStage.Berry},
                {berryType: BerryType.Sitrus, berryStage: PlotStage.Berry},
                {berryType: BerryType.Pinap, berryStage: PlotStage.Berry},
                {berryType: BerryType.Nomel, berryStage: PlotStage.Berry},
            ]));
        // Rindo
        this.mutations.push(new FlavorMutation(.00001, BerryType.Rindo,
            [10, 0, 0, 15, 0], true,
            'I\'ve heard that a berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy and fairly bitter at the same time.',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Aguav]() &&
                App.game.farming.unlockedBerries[BerryType.Cheri]();
            }));
        // Rindo Overgrow
        this.mutations.push(new NearBerryMutation(.00004, BerryType.Rindo,
            [{berryType: BerryType.Rindo, berryStage: PlotStage.Berry}], undefined, undefined, false));
        // Yache
        this.mutations.push(new StrictNearMutation(.00001, BerryType.Yache, [{berryType: BerryType.Passho, berryStage: PlotStage.Berry}]));
        // Chople
        this.mutations.push(new EvolutionMutation(.00001, BerryType.Chople, BerryType.Spelon, function() {
            return App.game.oakItems.isActive(OakItems.OakItem.Blaze_Cassette);
        }, 'I\'ve heard that using the Blaze Cassette will cause Spelon Berries to change!', function() {
            return App.game.oakItems.isUnlocked(OakItems.OakItem.Blaze_Cassette) &&
            App.game.farming.unlockedBerries[BerryType.Figy]();
        }));
        // Kebia
        this.mutations.push(new EvolutionMutation(.00001, BerryType.Kebia, BerryType.Pamtre, function() {
            return App.game.oakItems.isActive(OakItems.OakItem.Poison_Barb);
        }, 'I\'ve heard that using the Poison Barb will cause Pamtre Berries to change!', function() {
            return App.game.oakItems.isUnlocked(OakItems.OakItem.Poison_Barb) &&
            App.game.farming.unlockedBerries[BerryType.Pamtre]();
        }));
        // Kebia Overgrow
        this.mutations.push(new ParasiteMutation(.00004, BerryType.Kebia,
            BerryType.Kebia, undefined, undefined, undefined, false));
        // Shuca
        this.mutations.push(new EvolutionMutation(.00001, BerryType.Shuca, BerryType.Watmel, function() {
            return App.game.oakItems.isActive(OakItems.OakItem.Sprinklotad);
        }, 'I\'ve heard that using the Sprinklotad will cause Watmel Berries to change!', function() {
            return App.game.oakItems.isUnlocked(OakItems.OakItem.Sprinklotad) &&
            App.game.farming.unlockedBerries[BerryType.Watmel]();
        }));
        // Coba
        this.mutations.push(new FlavorMutation(.00001, BerryType.Coba,
            [0, 10, 0, 15, 0], true,
            'I\'ve heard that a berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little dry and fairly bitter at the same time.',
            function(): boolean {
                return App.game.farming.unlockedBerries[BerryType.Chesto]() &&
                App.game.farming.unlockedBerries[BerryType.Aguav]();
            }));
        // Payapa
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Payapa,
            [
                {berryType: BerryType.Wiki, berryStage: PlotStage.Berry},
                {berryType: BerryType.Bluk, berryStage: PlotStage.Berry},
                {berryType: BerryType.Cornn, berryStage: PlotStage.Berry},
                {berryType: BerryType.Pamtre, berryStage: PlotStage.Berry},
            ]));
        // Tanga
        this.mutations.push(new StrictNearMutation(.00001, BerryType.Tanga, [{berryType: BerryType.Rindo, berryStage: PlotStage.Berry}]));
        // Charti
        this.mutations.push(new EvolutionMutation(.00001, BerryType.Charti, BerryType.Cornn, function() {
            return App.game.oakItems.isActive(OakItems.OakItem.Cell_Battery);
        }, 'I\'ve heard that using the Cell Battery will cause Cornn Berries to change!', function() {
            return App.game.oakItems.isUnlocked(OakItems.OakItem.Cell_Battery) &&
            App.game.farming.unlockedBerries[BerryType.Cornn]();
        }));
        // Kasib
        // No mutation, will check withers
        // Haban
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Haban,
            [
                {berryType: BerryType.Occa, berryStage: PlotStage.Berry},
                {berryType: BerryType.Rindo, berryStage: PlotStage.Berry},
                {berryType: BerryType.Passho, berryStage: PlotStage.Berry},
                {berryType: BerryType.Wacan, berryStage: PlotStage.Berry},
            ]));
        // Colbur
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Colbur,
            [
                {berryType: BerryType.Rabuta, berryStage: PlotStage.Berry},
                {berryType: BerryType.Kasib, berryStage: PlotStage.Berry},
                {berryType: BerryType.Payapa, berryStage: PlotStage.Berry},
            ]));
        // Colbur Overgrow
        this.mutations.push(new ParasiteMutation(.00001, BerryType.Colbur,
            BerryType.Colbur, undefined, undefined, undefined, false));
        // Babiri
        this.mutations.push(new StrictNearMutation(.00001, BerryType.Babiri,
            [
                {berryType: BerryType.Shuca, berryStage: PlotStage.Berry},
                {berryType: BerryType.Charti, berryStage: PlotStage.Berry},
            ]));
        // Chilan
        this.mutations.push(new EvolutionMutation(.00004, BerryType.Chilan, BerryType.Chople, function() {
            return true;
        }, 'I\'ve heard that Chople Berries randomly turn into a new Berry type!', function() {
            return App.game.farming.unlockedBerries[BerryType.Chople]();
        }));
        // Roseli
        this.mutations.push(new NearBerryMutation(.00001, BerryType.Roseli,
            [
                {berryType: BerryType.Mago, berryStage: PlotStage.Berry},
                {berryType: BerryType.Nanab, berryStage: PlotStage.Berry},
                {berryType: BerryType.Magost, berryStage: PlotStage.Berry},
                {berryType: BerryType.Watmel, berryStage: PlotStage.Berry},
            ]));
        //#endregion

        //#region Fifth Generation

        // Liechi

        // Ganlon

        // Salac

        // Petaya

        // Apicot

        // Lansat

        // Starf

        // Micle

        // Custap

        // Jaboca

        // Rowap

        // Kee

        // Maranga

        //Enigma


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

        let change = false;

        this.plotList.forEach(plot => {
            if (plot.update(timeToReduce)) {
                change = true;
            }
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
                    change = true;
                }
            });
            this.counter = 0;
        }

        if (change) {
            this.resetAuras();
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

    resetAuras() {
        this.externalAuras[AuraType.Attract] = ko.observable<number>(1);
        this.externalAuras[AuraType.Egg] = ko.observable<number>(1);
        this.plotList.forEach(plot => plot.clearAuras());

        this.plotList.forEach((plot, idx) => plot.applyAura(idx));
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

    plant(index: number, berry: BerryType, suppressResetAura = false) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry)) {
            return;
        }

        GameHelper.incrementObservable(this.berryList[berry], -1);
        plot.berry = berry;
        plot.age = 0;
        plot.notifications = [];

        if (!suppressResetAura) {
            this.resetAuras();
        }
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry, true);
        });
        this.resetAuras();
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number, suppressResetAura = false): void {
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

        this.resetAuras();
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index, true);
        });
        this.resetAuras();
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
