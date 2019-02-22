import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private commonService : CommonService) {
  }

  ngOnInit() {
  }

  onTabChange(index : number) {
    this.commonService.setSelectedTab(index);
  }

}
