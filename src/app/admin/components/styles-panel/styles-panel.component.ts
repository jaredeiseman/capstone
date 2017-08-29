import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styles-panel',
  templateUrl: './styles-panel.component.html',
  styleUrls: ['./styles-panel.component.scss']
})
export class StylesPanelComponent implements OnInit {

  activePanel: string = 'global';

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
