import { IAPIModelDepartment } from "@core/apimodels/departments/department.apimodel";

export interface IModelDepartmentTreeNode {
    label: string;
    level: number;
    item: IAPIModelDepartment;
    isSelected: boolean;
    parent?: IModelDepartmentTreeNode;
    expandable: boolean;
    isLoading: boolean;
    children: IModelDepartmentTreeNode[];
}