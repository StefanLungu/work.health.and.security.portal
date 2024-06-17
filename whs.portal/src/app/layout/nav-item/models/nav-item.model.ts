export interface IModelNavItem {
    id: number;
    description: string;
    iconName?: string;
    routeUrl?: string;
    children?: IModelNavItem[];
}