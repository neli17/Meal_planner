/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "../../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const product = {
  name: "Application UI Icon Pack",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$220",
  description:
    "The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.",
  highlights: [
    "200+ SVG icons in 3 unique styles",
    "Compatible with Figma, Sketch, and Adobe XD",
    "Drawn on 24 x 24 pixel grid",
  ],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt:
    "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SingleRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate()
  const [relatedRecipe, setRelatedRecipe] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(`${window.$BackEndURL}/api/recipe/get-recipe/${id}`)
        .then((res) => {
          console.log(res?.data);
          setRecipe(res?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${window.$BackEndURL}/api/recipe/similar/${id}`)
        .then((res) => {
          console.log(res?.data);
          setRelatedRecipe(res?.data?.similarRecipes);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteRecipe = (id) => {
    try {
        axios.delete(`${window.$BackEndURL}/api/recipe/delete/${id}`).then((res) => {
            console.log(res?.data);
            
            navigate("/recipe-collection")

        })
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="bg-white">
      <Header />

      <main className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={recipe?.image}
                alt="Image"
                className="object-cover object-center w-full"
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {recipe?.title}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Recipe information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Created at {""}
                  <time dateTime={product.version.datetime}>
                    {product.version.date}
                  </time>
                </p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{recipe?.shortDescription}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 ">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Price {"$" + recipe?.totalPrice.toFixed()}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 ">
                <Link to={`/edit/${recipe?._id}`}>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#FF6259] px-8 py-3 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Edit 
              </button>
              </Link>
              <button
              onClick={()=> handleDeleteRecipe(recipe?._id)}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Delete
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {recipe?.ingredients.map((highlight) => (
                    <li key={highlight?._id}>{highlight?.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{' '}
                <a href={license.href} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Read full license
                </a>
              </p>
            </div> */}

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on X</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Steps
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Nutrition Calculation
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Tags
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>

                  {recipe?.methodSteps?.map((review, reviewIdx) => (
                    <div className="" key={reviewIdx}>
                      <ul className="list-disc pl-5">
                        <li className="text-base text-gray-600">{review}</li>
                      </ul>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <div>
                    <div className="flex items-center justify-between w-full pr-3 py-3 ">
                      <span className="font-semibold">Calories</span>
                      <span>{recipe?.calories + " cal"}</span>
                    </div>
                    <div className="flex items-center justify-between w-full pr-3 ">
                      <span className="font-semibold">Carbohydrates</span>
                      <span>{recipe?.carbohydrates.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between w-full pr-3">
                      <span className="font-semibold">Proteins</span>
                      <span>{recipe?.proteins.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between w-full pr-3">
                      <span className="font-semibold">Fibers</span>
                      <span>{recipe?.fibers.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between w-full pr-3">
                      <span className="font-semibold">Fats</span>
                      <span>{recipe?.fats.toFixed(2)}</span>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel className="pt-10">
                  <h3 className="sr-only">License</h3>

                  {recipe?.tags?.map((tag, reviewIdx) => (
                    <div className="" key={reviewIdx}>
                      <ul className="list-disc pl-5">
                        <li className="text-base text-gray-600">{tag}</li>
                      </ul>
                    </div>
                  ))}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>

        {/* Related products */}
        <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900">Suggested Recipies</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {relatedRecipe?.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <img src={product.image} alt="recipe" className="object-cover object-center" />
                </div>
                <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product?.title}
                    </a>
                  </h3>
                  <p>{"$"+ product?.totalPrice.toFixed()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
