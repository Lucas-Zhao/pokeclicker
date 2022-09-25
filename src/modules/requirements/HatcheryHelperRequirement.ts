import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class HatcheryHelperRequirement extends AchievementRequirement {
    constructor(helpersUnlocked: number, private bonusRequired: number) {
        super(helpersUnlocked, GameConstants.AchievementOption.more, GameConstants.AchievementType.Hatch);
    }

    public getProgress() {
        return Math.min(App.game.breeding.hatcheryHelpers.available().filter((h) => h.hatchBonus() >= this.bonusRequired).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Hatchery helpers needs atleast ${this.bonusRequired} bonus.`;
    }
}
