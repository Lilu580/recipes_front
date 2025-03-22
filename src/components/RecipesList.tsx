'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecipes } from '@/api/server/recipes'
import router from 'next/router';
import Link from 'next/link';

const RecipesList = ({recipes}: {recipes: any[]}) => {
  const handleRecipeClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };
      
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {recipes?.map((recipe) => (
    <Link
      href={`${recipe.idMeal}`}
      key={recipe.idMeal}
      onClick={() => handleRecipeClick(recipe.idMeal)}
      className="flex justify-center"
    >
      <div
        className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-[250px]"
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center text-gray-800">{recipe.strMeal}</h3>
        </div>
      </div>
    </Link>
  ))}
</div>

  );
};

export default RecipesList;