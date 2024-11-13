import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../RecipeCard.js";
import Navbar from "./../Navbar";

const baseUrl = "http://localhost:8080";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (favorites.length === 0) {
      setRecipes([]); // Clear recipes if no favorites
      return;
    }

    const recipePromises = favorites.map((id) =>
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    );
    const recipeResponses = await Promise.all(recipePromises);

    const flattenedRecipes = recipeResponses
      .map((resp) => resp.data.meals[0])
      .filter(Boolean); // Remove any null/undefined values

    setRecipes(flattenedRecipes);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      try {
        const resp = await axios.get(`${baseUrl}/api/favourite/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(resp.data.data.map((fav) => fav[0].idMeal) || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [favorites]);

  const toggleFavorite = async (recipeId) => {
    const token = localStorage.getItem("token");
    if (favorites.includes(recipeId)) {
      try {
        await axios.post(
          `${baseUrl}/api/favourite/remove`,
          { recipeId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== recipeId)
        );
      } catch (err) {
        console.log("Failed to remove from favorites:", err);
      }
    } else {
      try {
        await axios.post(
          `${baseUrl}/api/favourite/add`,
          { recipeId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites((prevFavorites) => [...prevFavorites, recipeId]);
      } catch (err) {
        console.log("Failed to add to favorites:", err);
      }
    }
  };

  return (
    <>
      <Navbar currentPage={"favourite"} />
      <div className="grid md:grid-cols-4 gap-6 mt-10">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              selectedCategory={recipe.strCategory || ""}
              isFavorite={favorites.includes(recipe.idMeal)}
              toggleFavorite={toggleFavorite}
            />
          ))}
      </div>
    </>
  );
};

export default Favorites;
