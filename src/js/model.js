import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {}
}

export const loadRecipe = async (id) => {
    try {
        const data = await getJSON(`${API_URL}/${id}`)

        const { recipe } = data.data; // Destucture of data object received back on the recipe key
        
        state.recipe = {              // Creation of new recipe object because the data object returned has a lot of underscores in names and we don't want that in our variable names; Reassigning our recipte variable we created above and using destructured recipe variable to retrieve key/value pairs.
          id: recipe.title,
          publisher: recipe.publisher,
          sourceURL: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }
    } catch (error) {
        console.error(`${error}🔥🔥🔥🔥`);
        throw error;
    }
   
    console.log(state.recipe);
}