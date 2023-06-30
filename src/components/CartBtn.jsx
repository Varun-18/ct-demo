import React, { useState } from "react";

export const CartBtn = () => {
  const [cartQty, setCartQty] = useState(0);

  const increment = () => {
    setCartQty(cartQty + 1);
  };

  const decrement = () => {
    setCartQty(cartQty - 1);
  };

  return (
    <div>
      {cartQty > 0 ? (
        <div className="flex items-center justify-between ">
          <button
            onClick={() => decrement()}
            className="bg-[#FF6666] rounded-full h-10 w-10 font-bold text-xl text-white hover:bg-black"
          >
            -
          </button>

          <span className="px-4 font-semibold text-xl text-black">{cartQty}</span>

          <button
            onClick={() => increment()}
            className="bg-[#FF6666] rounded-full h-10 w-10 font-bold text-xl text-white hover:bg-black"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => increment()}
          class="flex ml-auto text-white bg-[#FF6666] border-0 py-2 px-6 focus:outline-none hover:bg-[#000] rounded"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};
