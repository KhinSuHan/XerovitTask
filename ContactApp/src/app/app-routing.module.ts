import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';


const routes: Routes = [
  {path: '', redirectTo: 'mainPage', pathMatch: 'full'},
  {path: 'mainPage', component: MainPageComponent},
  {path: 'addContact', component: AddContactComponent},
  {path: 'editContact/:id', component: EditContactComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
