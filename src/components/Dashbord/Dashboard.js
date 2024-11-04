import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { GoSignOut } from "react-icons/go";
import axios from "axios";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((resp) => {
          setCategories(resp.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchRecipe = async () => {
      await axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        )
        .then((resp) => {
          setRecipes(resp.data.meals);
          console.log(resp.data.meals);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCategories();
    fetchRecipe();
  }, [selectedCategory]);

  console.log(categories);
  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-2"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-24">
          <img src={logo} alt="logo" width={"10%"} />
          <div className=" flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto">
            {/* Left links */}
            <ul className="list-style-none flex flex-col ps-0  lg:flex-row">
              <li className="  lg:my-0 px-5">
                <a
                  className="text-black dark:text-white "
                  aria-current="page"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Home
                </a>
              </li>
              <li
                className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2 px-5"
                data-twe-nav-item-ref
              >
                <a
                  className="text-black dark:text-white lg:px-2"
                  aria-current="page"
                  href="#"
                  data-twe-nav-link-ref
                >
                  Favourite
                </a>
              </li>
            </ul>
          </div>
          <div className="text-end mr-4">
            <a href="">
              {" "}
              <GoSignOut size={"2rem"} />
            </a>
          </div>
        </div>
      </nav>

      <div className="flex gap-4 w-[100%] flex-wrap justify-center mt-4 mb-8 ">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category.strCategory
                ? "bg-pink-500 text-white"
                : "border-pink-500 text-pink-500"
            }`}
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
        {recipes.map((recipe, index) => (
          <div className="flex flex-col items-center ">
            <div className="w-48 h-48 bg-gray-200 rounded-2xl mb-4">
              <img
                src={recipe.strMealThumb}
                alt="mealPhoto"
                className="rounded-2xl"
              />
            </div>
            <div className="text-sm text-gray-600" key={index}>
              {recipe.strMeal}
            </div>
            <div className="text-gray-500 ">&#9825;</div>
            <h3 className="mt-2 font-semibold text-gray-800">
              {selectedCategory}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
