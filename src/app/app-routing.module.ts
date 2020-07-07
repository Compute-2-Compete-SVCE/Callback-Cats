import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path: '' , redirectTo : '/auth',pathMatch : 'full'},
  {path:'recipes' , component:RecipesComponent , children :[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolver]},
    {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolver]}
  ]},
  {path:'auth',component :AuthComponent},
  {path:'home',component : HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
