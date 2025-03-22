import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { fetchRecipeDetails } from '../../services/api';

interface RecipeDetail {
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strIngredients: string[];
}

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const router = useRouter();
  const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       fetchRecipeDetails(id as string)
//         .then((res) => setRecipe(res.data.meals[0]))
//         .catch((err) => console.error(err));
//     }
//   }, [id]);

  const handleCountryClick = (country: string) => {
    router.push(`/?filter=filter.php?a&value=${country}`);
  };

  return (
    <div>
      {recipe ? (
        <div>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h1>{recipe.strMeal}</h1>
          <button onClick={() => handleCountryClick(recipe.strArea)}>{recipe.strArea}</button>
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            {recipe.strIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
