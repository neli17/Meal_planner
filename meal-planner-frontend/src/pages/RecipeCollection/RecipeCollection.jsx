import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeCollection = () => {
  const [recipes, setRecipies] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${window.$BackEndURL}/api/recipe/getAll`).then((res) => {
      console.log(res?.data);
      setRecipies(res?.data);
    });
  }, []);

  const handleSingleRecipe = (id) =>{
    navigate(`/single-recipe/${id}`)
  }
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[85rem] pt-10 font-poppin pb-10">
        <h1 className="text-4xl font-poppin pb-6">Recipes</h1>
        <div className="flex items-start flex-wrap gap-x-4 gap-y-10">
          {recipes?.map((recipe) => (
            <div
              key={recipe._id}
              onClick={()=>handleSingleRecipe(recipe._id)}
              className="flex flex-col items-start border border-gray-400  gap-y-3 rounded-md cursor-pointer w-[30%]"
            >
              <img
                alt="image"
                src={
                  recipe.image ||
                  "https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/air_fryer_chicken_wings_39019_16x9.jpg"
                }
                className="w-full h-60 object-cover object-center rounded-md"
              />
              <div className="flex flex-col gap-y-2 w-full px-4 pb-4">
                <p className="text-xl font-normal truncate w-80">
                  {recipe?.title}
                </p>
                <div className="flex gap-x-2 flex-wrap gap-y-2">
                  {recipe?.ingredients?.map((ing) => (
                    <div className="flex" key={ing?._id}>
                      <p className="truncate w-40 bg-orange-100 text-orange-700 px-3 py-0.5 rounded-full">
                        {ing?.name}
                      </p>
                    </div>
                  ))}
                </div>
               
                <div className="flex items-center justify-between w-full pr-3 py-3 border-y">
                  <span className="font-semibold">Calories</span>
                  <span>{recipe.calories + " cal"}</span>
                </div>
                <div className="flex items-center justify-between w-full pr-3 ">
                  <span className="font-semibold">Carbohydrates</span>
                  <span>{recipe.carbohydrates.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between w-full pr-3">
                  <span className="font-semibold">Proteins</span>
                  <span>{recipe.proteins.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between w-full pr-3">
                  <span className="font-semibold">Fibers</span>
                  <span>{recipe.fibers.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between w-full pr-3">
                  <span className="font-semibold">Fats</span>
                  <span>{recipe.fats.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between w-full pr-3 border-t pt-2">
                  <span className="font-semibold">Price</span>
                  <span>{"$" + recipe.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCollection;
