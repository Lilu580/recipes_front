import { fetchRecipeDetails } from '@/api/server/recipes';

const RecipeDetailPage = async ({ params }: { params: { id?: string } }) => {
  const id: string = params?.id?.toString() || '';
  const response = await fetchRecipeDetails(id);
  const { meal } = response.data;
  const ingredientsIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  if (!meal) {
    return <p className="text-center text-gray-500">Recipe not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4 text-gray-900">{meal.strMeal}</h1>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        {meal.strArea}
      </button>
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <p className="text-gray-700 leading-relaxed mt-2">{meal.strInstructions}</p>
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        {ingredientsIds.map(el => {
          if(meal[`strIngredient${el}`]) {
            return (
              <li key={el}>
                {meal[`strIngredient${el}`]} - {meal[`strMeasure${el}`]}
              </li>
            )
          }
        })}
      </ul>
    </div>
  );
};

export default RecipeDetailPage;
