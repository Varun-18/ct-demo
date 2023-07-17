import React from "react";
import { useEffect } from "react";
import useCart from "../hooks/useCart";
import { Loader } from "./Loader";
import { size } from "lodash";
import { priceCalculator } from "../constants";
import { NavLink as Link } from "react-router-dom";

export const Minicart = ({ setOpenMiniCart }) => {
  const { cartItems, loading, fetchCartItems, removeItem, navigate } =
    useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);
  console.log(cartItems);
  return (
    <div
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2
                      class="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                      Shopping
                      cart
                    ></h2>

                    <div class="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => setOpenMiniCart(false)}
                        type="button"
                        class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Close panel</span>

                        <svg
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <Loader />
                  ) : cartItems && size(cartItems.lineItems) > 0 ? (
                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          {cartItems.lineItems.map((item) => (
                            <li class="flex py-6" key={item.id}>
                              {console.log(item)}
                              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.variant.images[0].url}
                                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                  class="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href="#">{item.name.en}</a>
                                    </h3>

                                    <p class="ml-4">
                                      &#8364;{" "}
                                      {priceCalculator(
                                        item?.variant?.prices[0]?.value
                                          ?.centAmount,

                                        item?.variant?.prices[0]?.value
                                          ?.fractionDigits
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <span className="pt-3 text-sm font-bold text-gray-400">
                                    Qty {item.quantity}
                                  </span>
                                </div>

                                <div class="flex flex-1 items-end justify-between text-sm">
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    type="button"
                                    class="font-medium text-green-500 hover:text-green-600"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center flex justify-center flex-col items-center my-10">
                      <svg
                        height="130px"
                        width="130px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="shopping-bag"
                      >
                        <path d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path>
                      </svg>

                      <p className="text-2xl font-bold py-2">
                        Your Bag is Empty
                      </p>

                      <p className="text-base py-2">
                        Looks like you haven’t added any items to the bag yet.
                        Start shopping to fill it in.
                      </p>
                    </div>
                  )}
                </div>

                {cartItems && size(cartItems.lineItems) > 0 ? (
                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>

                      <p>
                        &#8364;{" "}
                        {priceCalculator(
                          cartItems.totalPrice.centAmount,

                          cartItems.totalPrice.fractionDigits
                        )}
                      </p>
                    </div>

                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>

                    <div className="flex justify-between ">
                      <div class="mt-6">
                        <button
                          class="flex items-center justify-center rounded-md  bg-black px-14 py-2 cursor-pointer text-base font-medium text-white shadow-sm hover:bg-white border border-black transition-all duration-300 hover:text-black"
                          onClick={() => (
                            setOpenMiniCart(false), navigate("/checkout")
                          )}
                        >
                          <span className="uppercase">Checkout</span>
                        </button>
                      </div>

                      <div class="mt-6">
                        <button
                          class="flex items-center justify-center rounded-md border border-black transition-all duration-300 bg-black px-14 py-2 text-base font-medium text-white shadow-sm hover:bg-white hover:text-black"
                          to="/cart"
                          onClick={() => (
                            setOpenMiniCart(false), navigate("/cart")
                          )}
                        >
                          <span className="uppercase">Veiw Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
