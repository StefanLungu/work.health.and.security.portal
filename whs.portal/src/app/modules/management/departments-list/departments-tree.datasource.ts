import { CollectionViewer, DataSource, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { inject } from "@angular/core";
import { IModelPaginatedResult } from "@root/core/apimodels/common/paginated-result.apimodel";
import { IAPIModelFindDepartments } from "@root/core/apimodels/departments/find-departments.apimodel";
import { IModelDepartmentTreeNode } from "@root/core/models/departments/department-tree-node.model";
import { DepartmentsService } from "@root/core/services/departments.service";
import { BehaviorSubject, Observable, Subscription, map, merge } from "rxjs";

export class DepartmentsTreeDataSource implements DataSource<IModelDepartmentTreeNode> {

    // dependencies
    private readonly _departmentsService: DepartmentsService = inject(DepartmentsService);

    private dataChange: BehaviorSubject<IModelDepartmentTreeNode[]> = new BehaviorSubject<IModelDepartmentTreeNode[]>([]);
    private treeControlSubscription: Subscription = new Subscription();

    get data(): IModelDepartmentTreeNode[] {
        return this.dataChange.value;
    }
    set data(value: IModelDepartmentTreeNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private readonly _treeControl: FlatTreeControl<IModelDepartmentTreeNode>) {

    }

    public connect(collectionViewer: CollectionViewer): Observable<readonly IModelDepartmentTreeNode[]> {
        this.treeControlSubscription = this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<IModelDepartmentTreeNode>).added ||
                (change as SelectionChange<IModelDepartmentTreeNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<IModelDepartmentTreeNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.treeControlSubscription.unsubscribe();
    }

    private handleTreeControl(change: SelectionChange<IModelDepartmentTreeNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed
                .slice()
                .reverse()
                .forEach(node => this.toggleNode(node, false));
        }
    }

    private toggleNode(node: IModelDepartmentTreeNode, expand: boolean) {
        const finderModel: IAPIModelFindDepartments = {
            parentId: node.item.uniqueId
        };

        let index = this.data.indexOf(node);
        node.isLoading = true;


        this._departmentsService.findDepartmentTreeNodes(finderModel, node.level + 1).subscribe({
            next: (result: IModelPaginatedResult<IModelDepartmentTreeNode>) => {          

                if (expand) {
                    result.values.forEach(child => {
                        child.parent = node;
                    });
                    this.data.splice(index + 1, 0, ...result.values);
                } else {
                    let count = 0;
                    for (
                        let i = index + 1;
                        i < this.data.length && this.data[i].level > node.level;
                        i++, count++
                    ) {}
                    this.data.splice(index + 1, count);
                }
            },
            complete: () => { this.dataChange.next(this.data); node.isLoading = false; }
        });
    }
}