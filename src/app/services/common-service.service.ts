import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  private selectedTab : number = 0;

  getSelectedTab() {
    return this.selectedTab;
  }

  setSelectedTab(index : number) {
    this.selectedTab = index;
  }
}
