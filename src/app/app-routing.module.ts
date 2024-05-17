import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { HomeComponent } from "./home/home.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserDetailsComponent } from "./user-details/user-details.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/admin-login', pathMatch: 'full' },
    { path: 'admin-login', component: AdminLoginComponent },
    {
        path: '', component: HomeComponent, children: [
          { path: 'admin-dashboard', redirectTo: 'admin-dashboard/1', pathMatch: 'full' }, // Redirect to admin-dashboard/1 by default
          { path: 'admin-dashboard/:page', component: UserDetailsComponent },
          { path: 'user-registration', component: UserRegistrationComponent },
          { path: 'user-login', component: UserLoginComponent }
        ]
      }      
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
