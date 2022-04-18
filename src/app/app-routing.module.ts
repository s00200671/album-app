import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminauthGuard } from './adminauth.guard';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { FavouritesListComponent } from './components/favourites-list/favourites-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "albums", component: AlbumListComponent},
  {path: "albums/:id", component: AlbumDetailsComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {path:"favourites", component: FavouritesListComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminauthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
