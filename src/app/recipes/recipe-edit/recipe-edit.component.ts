import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm : FormGroup;
  constructor(private route : ActivatedRoute,private recipeService : RecipeService,private router : Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath='';
    let recipeMealType ='';
    let recipeDifficultyLevel = '';
    let recipeDescription= '';
    let recipeIngredients = new FormArray([]);
    let recipePreparationSteps = new FormArray([]);
    if(this.editMode){

      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeMealType = recipe.mealType;
      recipeDifficultyLevel = recipe.difficultyLevel;
      recipeDescription = recipe.description;
  

      if(recipe['ingredient']){
        for(let i of recipe.ingredient){
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(i.name,Validators.required),
            'amount' : new FormControl(i.amount,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
      if(recipe['preparationSteps']){

          for( let s of recipe.preparationSteps){
            recipePreparationSteps.push(new FormGroup({
              'steps' : new FormControl(s.steps , Validators.required),
            }))
          }
        }
      
    }
        
      
    
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'mealType' : new FormControl(recipeMealType ,Validators.required),
      'difficultyLevel' : new FormControl(recipeDifficultyLevel ,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredients,
      'steps' : recipePreparationSteps
    })
  }
  onSubmit(){
    console.log(this.recipeForm);
    
    if(this.editMode){
      this.recipeService.updateRecipe(this.id , this.recipeForm.value);
    }else{
      this.recipeService.addRecipes(this.recipeForm.value);
    }
    this.onCancel();
    
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  get psteps(){
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }
  onAdd(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      
        new FormGroup({
          'name': new FormControl(null,Validators.required),
          'amount' : new FormControl(null,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      
    )
  }
  onAddSteps(){
    (<FormArray>this.recipeForm.get('steps')).push(
      
      new FormGroup({
        'psteps': new FormControl(null,Validators.required),
        
      })
    
  )

  }

  onCancel(){
      this.router.navigate(['../'] , {relativeTo : this.route});
  }
  onDeleteIngrdient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onDeleteSteps(index : number){
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }


}


