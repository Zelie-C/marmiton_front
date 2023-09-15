import './style.css'

const recipesContainer = document.querySelector('.recipes-container') as HTMLDivElement;
const submitBtn = document.querySelector('#submit-btn') as HTMLButtonElement;
const nameInput = document.querySelector('#recipe-name') as HTMLInputElement;
const urlInput = document.querySelector('#recipe-url-image') as HTMLInputElement;
const durationInput = document.querySelector('#recipe-duration') as HTMLInputElement;
const noteInput = document.querySelector('#recipe-note') as HTMLInputElement;
const ids: string[] = [];

loadRecipes();

async function loadRecipes(){
  const response = await fetch(`http://localhost:3880/recipes`);
  const recipes = await response.text();
  let recipesArray:{ id: number; name: string; urlimage: string; duration: string; note: string}[] = JSON.parse(recipes)
  for (const element of recipesArray){
  createRecipe( element.name, element.urlimage, element.duration, element.note, element.id.toString())
  ids.push(element.id.toString())
  }
  console.log(recipesArray);
  console.log(ids);
}

async function writeRecipe(name: string, url: string, duration: string, note: string) {
  const response = await fetch(`http://localhost:3880/recipes`, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    method: 'POST',
    body: JSON.stringify({
      name: name,
      image: url,
      duration: duration,
      note: note
    }),
  });
  const message = await response.json();
  console.log(message); 
} 

submitBtn.addEventListener("click", (e) =>{
  e.preventDefault()
  let nameValue: string = nameInput.value;
  let urlValue: string = urlInput.value;
  let durationValue: string = durationInput.value;
  let noteValue: string = noteInput.value;
  writeRecipe(nameValue, urlValue, durationValue, noteValue)
  let idRecipe: number = ids.length + 1;
  ids.push(idRecipe.toString())
  createRecipe( nameValue, urlValue, durationValue, noteValue, idRecipe.toString())
})

interface IRecette {
  name: string,
  urlimage: string,
  duration: string,
  note: string
}

function createRecipe(nameValue: string, urlValue: string, durationValue: string, noteValue: string, id: string){
  let recipe: IRecette = {
    name: nameValue,
    urlimage: urlValue,
    duration: durationValue,
    note: noteValue
  };
  console.log(recipe);
  let recipeContainer = document.createElement('div');
  recipeContainer.classList.add('recipe-container');
  recipesContainer.appendChild(recipeContainer);
  
  let recipeName = document.createElement('h3');
  recipeName.innerText = recipe.name;
  recipeContainer.appendChild(recipeName);
  
  let recipeUrl = document.createElement('img');
  recipeUrl.setAttribute('src', recipe.urlimage);
  recipeContainer.appendChild(recipeUrl);
  
  let recipeDuration = document.createElement('div');
  recipeDuration.classList.add('time')
  recipeDuration.innerHTML = recipe.duration;
  recipeContainer.appendChild(recipeDuration);

  let recipeNote = document.createElement('div');
  recipeNote.classList.add('time');
  recipeNote.innerText = recipe.note;
  recipeContainer.appendChild(recipeNote);

  let suppRecipe = document.createElement('button');
  suppRecipe.setAttribute('id', id);
  suppRecipe.innerText = 'Supprimer';
  suppRecipe.addEventListener('click', () =>{
  deleteRecipe(id, suppRecipe)
  })
  recipeContainer.appendChild(suppRecipe);
}

async function deleteRecipe(recipeId: string, div: HTMLElement){
  const response = await fetch(`http://localhost:3880/recipes/${recipeId}`, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    method: "DELETE",
    body: JSON.stringify({
      id: recipeId,
    }),
  })
  const message = await response.text();
  div.parentElement?.remove();
  console.log(message);

}