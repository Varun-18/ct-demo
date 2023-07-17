import { size } from "lodash";
import React from "react";
import { useEffect } from "react";
import { priceCalculator } from "../constants";
import useCart from "../hooks/useCart";

export const CheckoutDetails = ({ show }) => {
  const { fetchCartItems, cartItems } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, [show]);

  //   console.log(show, "from the checkout details page");
  return (
    <div>
      <div>
        {size(cartItems) > 0 ? (
          <div>
            <div>
              {size(cartItems.lineItems) > 0 ? (
                <div className="p-3 mt-4 mx-2 rounded shadow-lg bg-white">
                  <ul>
                    <p className="text-2xl font-bold p-2">ORDER SUMMARY</p>
                    {cartItems.lineItems.map((item) => {
                      return (
                        <li key={item.id} className="flex items-center gap-4 p-3 border-b-2 last-of-type:border-b-0">
                          <img
                            src={item.variant.images[0].url}
                            alt="prod-img"
                            className="max-h-[100px] w-auto"
                          />
                          <div className="flex flex-col gap-3">
                            <span>{item.name.en}</span>
                            <span>QTY : {item.quantity}</span>
                          </div>
                          <div className="flex-1 text-right font-semibold">
                            <span>
                              {priceCalculator(
                                item.variant.prices[0].value.centAmount,
                                item.variant.prices[0].value.fractionDigits
                              )}{" "}
                              &#8364;
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {show ? (
                    <ul className="p-3 mt-4 text-xl">
                      <li className="flex justify-between py-3 border-b-2 last-of-type:border-b-0">
                        <span className="capitalize">item total</span>
                        <span className="font-semibold">
                          {priceCalculator(
                            cartItems?.taxedPrice?.totalNet?.centAmount,
                            cartItems?.taxedPrice?.totalNet?.fractionDigits
                          )}{" "}
                          &#8364;
                        </span>
                      </li>
                      <li className="flex justify-between py-3 border-b-2 last-of-type:border-b-0">
                        <span className="capitalize">total tax</span>
                        <span className="font-semibold">
                          {priceCalculator(
                            cartItems?.taxedPrice?.totalTax?.centAmount,
                            cartItems?.taxedPrice?.totalTax?.fractionDigits
                          )}{" "}
                          &#8364;
                        </span>
                      </li>
                      <li className="flex justify-between py-3 border-b-2 last-of-type:border-b-0">
                        <span className="capitalize">Gross price</span>
                        <span className="font-semibold">
                          {priceCalculator(
                            cartItems.totalPrice.centAmount,
                            cartItems.totalPrice.fractionDigits
                          )}{" "}
                          &#8364;
                        </span>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
