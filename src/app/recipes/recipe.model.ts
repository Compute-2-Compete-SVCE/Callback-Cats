import { Ingredient } from '../Shared/Ingredient.model';

export class Recipe
{
    public name:string;
    public description:string;
    public imagePath:string;
    public mealType :string;
    public difficultyLevel : string;
    public ingredient : Ingredient[];
    public preparationSteps : string;

    constructor(name:string , desc:string , imagePath:string ,meal : string,difficulty : string ,ingredient : Ingredient[] , preparation : string){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.mealType = meal;
        this.difficultyLevel = difficulty;
        this.ingredient=ingredient;
        this.preparationSteps = preparation;
    }
}