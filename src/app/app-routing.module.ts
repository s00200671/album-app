import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';

const routes: Routes = [
  // {path: "", component: HomeComponent},
  {path: "albums", component: AlbumListComponent}
  // {path:"register", component: RegisterFormComponent},
  // {path:"login", component: LoginFormComponent},
  // {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  // {path:"favourites", component: FavouritesListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
