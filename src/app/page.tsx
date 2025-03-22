import { fetchRecipes } from '@/api/server/recipes';
import FilterButtons from '@/components/FilterButtons';
import RecipesList from '@/components/RecipesList';

const HomePage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined, filterValue?: string, page?: string, per_page?: string } }) => {
  try {
    const filters = [{key: 'ingredient', label: 'Filter by ingredient'}, {key:'country', label: 'Filter by country'}, {key:'category', label: 'Filter by category'}]
    const page = searchParams.page || '1';
    const per_page = searchParams.per_page || '12';
    const searchParamsFilters = filters.map(filter => {
      if(searchParams[filter.key]) {
        return {
          key: filter.key,
          value: searchParams[filter.key] 
        }
      }
    })
  
    const res = await fetchRecipes(searchParamsFilters, page, per_page);
    const recipes = res.data.paginatedMeals;

    return (
      <div>
        <h1 className='my-8 text-3xl text-center'>Recipe List</h1>
        <FilterButtons filters={filters}/>
        <div>
          <RecipesList recipes={recipes} />
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div>
        <h1>Error loading recipes</h1>
      </div>
    );
  }
};

export default HomePage;
