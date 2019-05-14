import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { PageEvent} from '@angular/material';

@Component({
  selector: 'repository-list-root',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit{
  constructor(
    private http: HttpClient,
  ){
  }
  githubDataList = []; 

displayedColumns: string[] = ['name', 'url', 'repository', 'owner'];
isLoading = false;
total_count = 30; 
pageSize = 5;
pageSizeOptions: number[] = [5, 10, 15];
currentPage = 1;
pageEvent: PageEvent;

ngOnInit() {
   this.isLoading = true;
   this.getRepositoriesList();
  }
onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.getRepositoriesList();
  }

  private getRepositoriesList = () => {
    console.log(this.pageSize+ " " +this.currentPage)
    const queryParams = '&per_page=' +this.pageSize+ '&page=' +this.currentPage;
    this.http.get('https://api.github.com/search/code?q=addClass+user:mozilla'+queryParams)
   .subscribe((httpData: any) => {
   this.isLoading = false;


   this.githubDataList = httpData.items.map((data) => {
    return {
      name: data.name,
      url: data.url,
      repository: data.repository.name,
      ownerName: data.repository.owner.login,
        photo: data.repository.owner.avatar_url
    };
   });

  //  this.githubDataList = [];
  //  for (let data of httpData.items) {
  //     this.githubDataList.push(
  //        {
  //          name: data.name,
  //         url: data.url,
  //         repository: data.repository.name,
  //         ownerName: data.repository.owner.login,
  //           photo: data.repository.owner.avatar_url
  //        }
  //      );
  //    }
  //    console.log(this.githubDataList)
    }
   );
   
  }
}
