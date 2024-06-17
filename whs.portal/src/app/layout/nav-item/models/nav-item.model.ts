export interface IModelNavItem {
    id: number;
    description: string;
    iconName?: string;
    children?: IModelNavItem[];
}