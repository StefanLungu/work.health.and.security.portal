import { ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({ providedIn: "root" })
export class SidePanelService {
    public sidePanelInstance?: MatSidenav;
    public sidePanelContent?: ViewContainerRef;

    public async openAsync<TComponent>(content: Type<any>): Promise<TComponent>{
        return new Promise<TComponent>((resolve, reject) => {

            this.toggleDrawer(true);

            setTimeout(() => {

                if (!this.sidePanelContent) {
                    return reject(`Side panel content not initialized. Make sure to add the 'sidePanelContent' to the sidepanel ng-container`);
                }

                this.sidePanelContent.clear();

                const componentReference: ComponentRef<TComponent> = this.sidePanelContent.createComponent(content);

                return resolve(componentReference.instance);
            }, 0);
        });
    }

    private toggleDrawer(expanded: boolean): void {

        if (!this.sidePanelInstance){
            throw new Error(`Side panel instance not initialized. Make sure to add the 'sidePanelInstance' to the component`);
        }

        this.sidePanelInstance.toggle(expanded);
    }

    public close(): void {
        this.sidePanelInstance?.toggle(false);
    }
}