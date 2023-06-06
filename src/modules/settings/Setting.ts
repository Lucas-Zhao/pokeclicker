import BaseSetting from './BaseSetting';

export default class Setting<T> extends BaseSetting<T, T> {
    validValue(value: T): boolean {
        if (this.options.length === 0) {
            return true;
        }
        for (let i = 0; i < this.options.length; i += 1) {
            if (this.options[i].value === value) {
                return this.options[i].isUnlocked();
            }
        }

        return false;
    }
}
