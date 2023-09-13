import './style.css'

loadRecipes();

async function loadRecipes(){
  const response = await fetch(`http://localhost:3880/recipe/getallrecipes`);
  const recipes = await response.text();
  let recipesArray:{ id: number; name: string; urlimage: string; duration: string; note: string}[] = JSON.parse(recipes)
  console.log(recipesArray);
}

async function createRecipe(name: string, url: string, duration: string, note: string) {
  const response = await fetch(`http://localhost:3880/recipe/create/${name}/${url}/${duration}/${note}`, {
    method: 'POST'});
  const message = await response.text();
  console.log(message);
}
