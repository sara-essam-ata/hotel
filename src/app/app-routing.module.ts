import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';
import { adminGuard } from './Core/Guards/admin.guard';
import { userGuard } from './Core/Guards/user.guard';
import { NotFoundComponent } from './Shared/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo: 'landingPage', pathMatch:'full'},
  {path: 'landingPage',
  loadChildren: () => import('./Core/Pages/landing-page/landing-page.module').then(m => m.LandingPageModule)},
  {path: 'auth',
  loadChildren: () => import('./Core/auth/auth.module').then(m => m.AuthModule)},
  {path: 'dashboard',canActivate: [authGuard,adminGuard],
  loadChildren: () => import('./Core/Pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
