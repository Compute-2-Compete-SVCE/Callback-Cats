import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import  { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipies : Recipe[]=[
    new Recipe('Pizza','Spicy along with Extra Cheese','https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg','Supper','Intermediate ',[new Ingredient('Bread',3),new Ingredient('Butter',50),new Ingredient('Onion',2)],'Steps'),
    new Recipe('Biriyani','Special Hydrabad Biriyani', 'https://img.manoramaonline.com/content/dam/mm/en/food/in-season/Ramzan/Images/hyderabadi-dum-biryani.jpg','Lunch' ,'Advanced',[new Ingredient('Meat',3),new Ingredient('Rice',50),new Ingredient('Onion',2)],'Steps') 
];
  constructor() { }

  getRecipes(){
    return this.recipies.slice();
  }
  getRecipeByIndex(index : number){
    return this.recipies[index];
  }
  addRecipes(newRecipe : Recipe){
          this.recipies.push(newRecipe);
          this.recipeChanged.next(this.recipies.slice());
  }
  updateRecipe(index : number , newRecipe : Recipe){
      this.recipies[index] = newRecipe;
      this.recipeChanged.next(this.recipies.slice());
  }
  deleteRecipe(index : number){
      this.recipies.splice(index,1);
      this.recipeChanged.next(this.recipies.slice());
  }
}

