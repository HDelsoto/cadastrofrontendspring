import { UpdateComponent } from './components/usuario/update/update.component';
import { CreateComponent } from './components/usuario/create/create.component';
import { DeleteComponent } from './components/usuario/delete/delete.component';
import { UsuarioCrudComponent } from './views/usuario-crud/usuario-crud.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
   path:"",
   component: HomeComponent
  },{
   path:"usuarios",
   component: UsuarioCrudComponent
  },
  {
   path:"usuarios/create",
   component: CreateComponent
  },
  {
    path:"usuarios/update/:id",
    component: UpdateComponent
   },
   {
    path:"usuarios/delete/:id",
    component: DeleteComponent
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
