const faStr = 'fa fa-fw fa-';
export class FontAwesome {
    constructor(private iconName: string) {

    }
    get iconClass(): string {
        return faStr + this.iconName;
    }
}
