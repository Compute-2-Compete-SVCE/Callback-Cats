import { Component, OnInit } from '@angular/core';
import {Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  subscription : Subscription;
  recipies : Recipe[]=[];
  constructor(private recipeService : RecipeService,private router : Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription=this.recipeService.recipeChanged.subscribe(
      (recipe : Recipe[]) =>{
        this.recipies=recipe;
      }
    )
    this.recipies=this.recipeService.getRecipes();
  }

  onNewRecipe(){
    
    
  }
}
