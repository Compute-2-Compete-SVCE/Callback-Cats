import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
//import { DataStorageService } from '../Shared/data-strorage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn :'root'})
export class RecipeResolver implements Resolve<Recipe[]>{
    constructor(private recipeService : RecipeService){}

    resolve(route : ActivatedRouteSnapshot,state : RouterStateSnapshot){
        const recipe = this.recipeService.getRecipes();

        if(recipe.length === 0){
            return ;
        }
        else{
            return recipe;
        }
        
    }
  

}