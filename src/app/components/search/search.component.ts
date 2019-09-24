import { Component, OnInit } from '@angular/core';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private getUserDataService: GetUserDataService, private router: Router) { }

  ngOnInit() {
  }

  search(username: string) {
    if(username !=="" && username !==undefined) {
    this.getDetails(username);
    this.getRepos(username);
    this.router.navigate(['/result']);

    }
  }

  getDetails(username: string) {
    this.getUserDataService.details(username).subscribe(
      details => {
      this.getUserDataService.getDetails(details);
      },
      err => {
        console.log('ERROR:', err.error.message);
        this.router.navigate(['/**']);
      })
  }
  getRepos(username: string) {
    this.getUserDataService.repositories(username).subscribe(repos => {
      this.getUserDataService.getRepos(repos);
    })
  }
}