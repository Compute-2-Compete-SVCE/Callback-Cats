import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { PreparationSteps } from '../shared/preparation-steps.model'; 
import  { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipies : Recipe[]=[
    new Recipe('Pizza','Spicy along with Extra Cheese','https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg','Supper','Intermediate ',[new Ingredient('Bread',3),new Ingredient('Butter',50),new Ingredient('Onion',2)],[new PreparationSteps('Step 1'),new PreparationSteps('Step 2')]),
    new Recipe('Biriyani','Special Hydrabad Biriyani', 'https://www.bakespace.com/images/large/f468b5f5247496b4f854e203bd46a7cd.jpeg','Lunch' ,'Advanced',[new Ingredient('Meat',3),new Ingredient('Rice',50),new Ingredient('Onion',2)],[new PreparationSteps('Step 1'),new PreparationSteps('Step 2')]) 
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
  setRecipes(recipe : Recipe[]){
    this.recipies=recipe;
    this.recipeChanged.next(this.recipies.slice());
}
}

