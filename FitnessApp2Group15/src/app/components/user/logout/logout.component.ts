import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService) { this.apiService.logout(); }

  ngOnInit() {
  }

}
