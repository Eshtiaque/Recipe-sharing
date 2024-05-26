import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const AllRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://recipe-server-psi.vercel.app/allRecipe');
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        const recipeData = await response.json();
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = async (recipe) => {
    try {
      if (!user) {
        // Case 1: User Not Logged In
        Swal.fire({
          icon: 'info',
          title: 'Please log in',
          text: 'You need to log in to view the recipe.',
        });
        window.location.href = '/'
        return;
      }

      const userResponse = await fetch(`https://recipe-server-psi.vercel.app/users/${user.email}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      if (userData.email === recipe.creatorEmail) {
        // Case 2: User is the Creator of the Recipe
        window.location.href = `/allRecipes/${recipe._id}`;
        return;
      }

      if (userData.coins < 10) {
        // Case 3: User Doesn't Have Enough Coins
        Swal.fire({
          icon: 'warning',
          title: 'Insufficient Coins',
          text: 'You need at least 10 coins to view this recipe.',

        }).then(() => {
          window.location.href = '/purchase-coins'; // Redirect to purchase coins page
        });
        return;
      }

      if (recipe.purchased_by.includes(userData.email)) {
        // Case 5: User Already Purchased the Recipe
        window.location.href = `/allRecipes/${recipe._id}`;
        return;
      }

      // Case 4: User Logged In and Has Enough Coins
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: 'Confirm Purchase',
        text: 'Do you want to spend 10 coins to view this recipe?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (confirmResult.isConfirmed) {
        const updatedCoins = userData.coins - 10;
        const updatedPurchasedBy = [...recipe.purchased_by, userData.email];
        const updatedWatchCount = recipe.watchCount + 1;

        await Promise.all([
          fetch(`https://recipe-server-psi.vercel.app/users/${userData.email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coins: updatedCoins }),
          }),
          fetch(`https://recipe-server-psi.vercel.app/users/${recipe.creatorEmail}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coins: recipe.creatorCoins + 1 }),
          }),
          fetch(`https://recipe-server-psi.vercel.app/allRecipe/${recipe._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ purchased_by: updatedPurchasedBy, watchCount: updatedWatchCount }),
          }),
        ]);

        // Redirect to recipe detail page after successful purchase
        window.location.href = `/allRecipes/${recipe._id}`;
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };


  const filteredRecipes = recipes.filter((recipe) => {
    const titleMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const countryMatch = countryFilter ? recipe.country.toLowerCase() === countryFilter.toLowerCase() : true;
    return titleMatch && countryMatch;
  });

  return (
    <div className="recipe-list table-container overflow-x-auto max-w-7xl mx-auto">
      <h2 className="text-4xl mt-8  font-serif font-extrabold text-center mb-12 text-orange-600">All Recipes</h2>
      <div className="search-filter flex justify-center">
        <input
          type="text"
          className='bg-slate-200 p-2 rounded-lg gap-4'
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className='px-4 p-2 bg-slate-200 ms-2 rounded-lg' value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
          <option value="">Filter by country...</option>

          {[...new Set(recipes.map((recipe) => recipe.country))].map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select className='px-4 p-2 bg-slate-200 ms-2 rounded-lg' value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Filter by category...</option>
          {[...new Set(recipes.map((recipe) => recipe.category))].map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Recipe Name</th>
            <th>Creator Email</th>
            <th>Country</th>
            <th>Purchased By</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.map((recipe, index) => (
            <tr key={index}>
              <td className="mask mask-squircle w-16 h-16">
                <img src={recipe.image} alt={recipe.name} />
              </td>
              <td>{recipe.name}</td>
              <td>{recipe.creatorEmail}</td>
              <td>{recipe.country}</td>
              <td>Eshtiaque</td>
              <td>
                <Link
                  onClick={() => handleViewRecipe(recipe)}
                  className="btn btn-sm text-white bg-orange-600"
                  to={`/allRecipes/${recipe._id}`}
                >
                  View The Recipe
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRecipes;
