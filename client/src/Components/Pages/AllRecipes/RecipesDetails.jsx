import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactionButton from '../ReactionButton/ReactionButton';

const RecipesDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://recipe-server-psi.vercel.app/allRecipe/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const recipeData = await response.json();
        setRecipe(recipeData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  useEffect(() => {
    const fetchSuggestedRecipes = async () => {
      try {
        if (!recipe) return;

        const response = await fetch(`https://recipe-server-psi.vercel.app/allRecipe?suggestedCategory=${recipe.category}&suggestedCountry=${recipe.country}`);
        if (!response.ok) {
          throw new Error('Failed to fetch suggested recipes');
        }
        const suggestedRecipeData = await response.json();
        setSuggestedRecipes(suggestedRecipeData);
      } catch (error) {
        console.error('Error fetching suggested recipes:', error);
      }
    };

    fetchSuggestedRecipes();
  }, [recipe]);

  if (error) {
    return <p>Error fetching recipe details: {error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : 'Invalid YouTube URL';
  };

  return (
    <div className="recipe-details max-w-7xl mx-auto p-4 mb-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3">
          <img src={recipe.image} alt={recipe.name} className="rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-2/3 md:ml-8">
          <h2 className="text-4xl font-bold mb-6">{recipe.name}</h2>

          <ReactionButton />
          <p className="text-lg"><strong>Creator Email:</strong> {recipe.category}</p>
          <p className="text-lg"><strong>Creator Email:</strong> {recipe.creatorEmail}</p>
          <p className="text-lg"><strong>Country:</strong> {recipe.country}</p>
          <p className="text-lg"><strong>Purchased By:</strong> {recipe.purchased_by.join(', ')}</p>
        </div>
      </div>
      <div className='grid '>
        <div className="youtube-video my-8">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(recipe.youtubeVideoCode)}`}
            title="YouTube video player"
            className="rounded-lg shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Recipe Instructions</h3>
          <p className="whitespace-pre-wrap text-lg">{recipe.recipe}</p>
        </div>
      </div>
      {suggestedRecipes.length > 0 && (
        <div className="suggested-recipes mt-8">
          <h3 className="text-2xl font-semibold mb-4">Suggested Recipes</h3>
          <ul className="list-none grid grid-cols-4">
            {suggestedRecipes.map((suggestedRecipe) => (
              <li key={suggestedRecipe._id} className="mb-4 flex justify-center">
                <Link to={`/allRecipes/${suggestedRecipe._id}`} className="   text-blue-500 hover:underline text-center">
                  <img className='w-24 h-24' src={suggestedRecipe.image} alt="" />
                  <button className='font-black mt-4'>{suggestedRecipe.name}</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipesDetails;
