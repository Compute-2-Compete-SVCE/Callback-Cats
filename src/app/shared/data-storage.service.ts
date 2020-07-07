import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService { 
    constructor(private http:HttpClient,private recipeService : RecipeService,private authService : AuthService){}

    storeRecipies(){
        const recipes = this.recipeService.getRecipes();
       return this.http.put('https://recipe-book-335d7.firebaseio.com/recipes.json',recipes).subscribe(response =>{
           console.log(response);
           
       })
    }

    fetchData(){
      return  this.http.get<Recipe[]>('https://recipe-book-335d7.firebaseio.com/recipes.json')
      .pipe
        (
            map(recipe =>{
                return recipe.map(recipes =>{
                    return {...recipes,ingredient :recipes.ingredient ? recipes.ingredient : []}
                })
            }),tap(recipes =>{
                this.recipeService.setRecipes(recipes);
            })
        )
        
        
       
    }
}