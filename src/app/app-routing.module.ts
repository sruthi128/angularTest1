import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { ListOrganizationComponent } from './organization/list-organization/list-organization.component';
import { LoginComponent } from './login/login.component';
import { UserAuthGuard } from './login/auth.guard';
import { RepositoryListComponent } from './github/repository/repository-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: WelcomeComponent, canActivate: [UserAuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [UserAuthGuard] },
  { path: 'users/:userId', component: UserInfoComponent, canActivate: [UserAuthGuard]  },
  { path: 'addUser', component: AddUserComponent, canActivate: [UserAuthGuard]  },
  { path: 'addOrg', component: AddOrganizationComponent, canActivate: [UserAuthGuard]  },
  { path: 'listOrg', component: ListOrganizationComponent, canActivate: [UserAuthGuard]  },
  { path: 'login', component: LoginComponent  },
  { path: 'githubList', component: RepositoryListComponent, canActivate: [UserAuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserAuthGuard]
})
export class AppRoutingModule { }
