import React from "react";
import favIcon from "../assets/lineheart.svg";
import favIconFilled from "../assets/redfillheart.svg";

const RecipeCard = ({
  recipe,
  selectedCategory,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 bg-gray-200 rounded-2xl mb-4 overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt="mealPhoto"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-gray-600 flex items-center gap-3">
          {selectedCategory}
          <img
            src={isFavorite ? favIconFilled : favIcon}
            onClick={() => toggleFavorite(recipe.idMeal)}
            className="w-4 cursor-pointer"
            alt="favorite icon"
          />
        </p>
        <h3 className="text-lg font-semibold text-gray-800">
          {recipe.strMeal.length > 25
            ? `${recipe.strMeal.slice(0, 25)}...`
            : recipe.strMeal}
        </h3>
      </div>
    </div>
  );
};

export default RecipeCard;
