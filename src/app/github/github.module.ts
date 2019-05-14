import { RepositoryListComponent } from './repository/repository-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RepositoryListComponent
  ],
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    AppRoutingModule,
    BrowserModule
  ],
  exports: [
    RepositoryListComponent
  ],
})
export class GithubModule { }
