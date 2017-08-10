import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  activePanel: string = 'users';

  constructor() { }

  ngOnInit() {
  }

  switchPanel(panel: string) {
    this.activePanel = panel;
  }

  determineActivePanel(panel: string) {
    if (this.activePanel === panel) {
      return 'active';
    } else {
      return '';
    }
  }
}
