class SubRegions {
    public static list: Record<GameConstants.Region, SubRegion[]> = {};

    public static addSubRegion(region: GameConstants.Region, subregion: SubRegion): void {
        if (!this.list[region]) {
            this.list[region] = [];
        }
        this.list[region].push(subregion);
        this.list[region].forEach((r, i) => {
            r.id = i;
            return r;
        });
    }

    public static getSubRegions(region: GameConstants.Region): SubRegion[] {
        return this.list[region]?.filter(sr => sr.unlocked());
    }

    public static getSubRegion(region: GameConstants.Region, subregion: string): SubRegion {
        return this.list[region].find(s => s.name == subregion);
    }

    public static getSubRegionById(region: GameConstants.Region, subregionID: number): SubRegion {
        return this.list[region].find(s => s.id == subregionID);
    }

    public static openModal() {
        $('#SubregionModal').modal('show');
    }
}

SubRegions.addSubRegion(GameConstants.Region.kanto, new SubRegion('Kanto'));
SubRegions.addSubRegion(GameConstants.Region.johto, new SubRegion('Johto'));
SubRegions.addSubRegion(GameConstants.Region.hoenn, new SubRegion('Hoenn'));
SubRegions.addSubRegion(GameConstants.Region.sinnoh, new SubRegion('Sinnoh'));
SubRegions.addSubRegion(GameConstants.Region.unova, new SubRegion('Unova'));
SubRegions.addSubRegion(GameConstants.Region.kalos, new SubRegion('Kalos'));
SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Melemele & Akala islands', undefined, 'Hau\'oli City'));
SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Ula\'ula & Poni islands', new GymBadgeRequirement(BadgeEnums.Elite_Nihilego), 'Malie City'));

// SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Melemele island', undefined, 'Hau\'oli City'));
// SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Akala island', new GymBadgeRequirement(BadgeEnums.MelemeleKahuna), 'Heahea City'));
// SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Ula\'ula island', new GymBadgeRequirement(BadgeEnums.Elite_Nihilego), 'Malie City'));
// SubRegions.addSubRegion(GameConstants.Region.alola, new SubRegion('Poni island', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation')), 'Seafolk Village'));
