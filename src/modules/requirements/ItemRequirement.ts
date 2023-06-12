import { AchievementOption } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import Requirement from './Requirement';

export default class ItemRequirement extends Requirement {
    constructor(amount: number, public itemName: string, option = AchievementOption.more) {
        super(amount, option);
    }

    public getProgress() {
        return Math.min(player.itemList[this.itemName](), this.requiredValue);
    }

    public hint(): string {
        return `Your amount of ${ItemList[this.itemName].displayName} must be ${this.requiredValue}${this.option == AchievementOption.equal ? '' : ` or ${AchievementOption[this.option]}`}.`;
    }
}
