// Third -party dependencies

import { NavLink as Link } from "react-router-dom";

// Custom made components for cart button

import { CartBtn } from "./CartBtn";

// fucntion from the constants.js that calculates the prices

import { priceCalculator } from "../constants";
import useButton from "../hooks/useButton";

/**
 *
 * @param {object} param0 contains the data for each producst represented in a single page
 * @returns a products card for hte PLP pages
 */

export const ProductCard = ({ item }) => {
  const { addToCart} = useButton()
  const priceObj = item?.masterVariant?.prices[0];
  const price = priceCalculator(
    priceObj?.value?.centAmount,
    priceObj?.value?.fractionDigits
  );

  let name = item?.name?.en;


  return (
    <div className="p-4 md:w-1/3 w-full">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Link to={`/products/${item.id}`}>
          <img
            className="lg:h-auto md:h-auto  max-w-[200px] mx-auto object-cover object-center"
            src={item?.masterVariant?.images[0]?.url}
            alt="product-image"
          />
        </Link>
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <div className="flex  items-center flex-wrap justify-between ">
            {/* <CartBtn id={item.id} /> */}
            <button
                onClick={() => addToCart(item.id)}
                className=" bg-black text-white border-black uppercase  py-1.5 px-4 hover:bg-white hover:text-black transition-all duration-300 border-2 rounded-lg shadow-md"
              >
                Add to cart
              </button>
            <div>
              <span className="text-[#555] mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                {priceObj?.value?.currencyCode}
              </span>
              <span className="text-[#555] inline-flex items-center leading-none text-sm">
                {price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
