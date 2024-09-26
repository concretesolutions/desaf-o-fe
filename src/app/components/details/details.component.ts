import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Repository } from 'src/app/models/repository.model';
import { User } from 'src/app/models/user.model';
import { GitHubService } from 'src/app/services/git-hub.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private router: Router, private gitHubService: GitHubService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(
      (res: ParamMap) => {
        this.getApiData(res.get('userName') || '')
      },
      err => {
        console.log('Error from Activate Route:' + err)
      }
    )
  }

  userInfo: User;
  repositoriesInfo: Repository[];
  showUser: boolean;
  showRepositores: boolean;
  firstSearch: boolean;
  loading: boolean = false;
  error403: boolean = false;

  resetBooleans() { this.showUser = undefined; this.showRepositores = undefined; this.firstSearch = undefined; this.loading = false; this.error403 = false; }

  getApiData(userName: string) {
    this.resetBooleans()
    if (userName) {
      this.loading = true;
      this.firstSearch = false;
      this.gitHubService.getUser(userName).subscribe(
        resUser => {
          this.userInfo = resUser;
          this.gitHubService.getRepositories(userName).subscribe(
            resRepos => {
              if (resRepos.length) {
                this.repositoriesInfo = resRepos.sort((a, b) => { return b.stargazers_count - a.stargazers_count });
                this.showUser = true;
                this.showRepositores = true;
              }
              else {
                this.showRepositores = false;
                this.showUser = true;
              }
              this.loading = false;
            },
            errRepos => {
              if (errRepos.status === 403) {
                this.error403 = true;
                this.loading = false;
              }
              else {
                this.showRepositores = false
                this.loading = false;
              }
            }
          )
        },
        errUser => {
          if (errUser.status === 403) {
            this.error403 = true;
            this.loading = false;
          }
          else {
            this.showUser = false;
            this.loading = false;
          }
        }
      )
    }
    else {
      this.firstSearch = true;
    }
  }

  search(userName: string) {
    if (userName) {
      this.router.navigate([`user/${userName}`])
    }
  }
  
}
