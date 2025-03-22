import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const fetchRecipes = (filters: ({
    key: string;
    value: string | undefined;
} | undefined)[], page: string, per_page: string) => {
  let url = '/recipes'
  
  if(filters.length || page || per_page) {
    url += '?'
  }

  if(filters.length) {
    filters.forEach(filter => {
        if(filter?.value) {
            url+=`${filter?.key}=${filter?.value}&`
        }
    })
  }

  if(page) {
    url += `page=${page}&`
  }

  if(per_page) {
    url += `per_page=${per_page}`
  }
  console.log(url)

  return api.get(url);
};

interface RecipeDetail {
    meal: {
        strMeal: string;
        strMealThumb: string;
        strArea: string;
        strInstructions: string;
        strIngredients: string[];
      }
}

export const fetchRecipeDetails = (id: string) => {
  return api.get(`/recipes/${id}`);
};