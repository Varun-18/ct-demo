import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { GET_ORDERS, priceCalculator } from "../constants";
import { Loader } from "./Loader";

export const MyOrders = () => {
  const [fetchOrders, { data, loading }] = useLazyQuery(GET_ORDERS, {fetchPolicy:"no-cache"});
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className="max-w-[1400px] mx-auto p-5 ">
          <p className="text-xl font-semibold mb-1">My Orders</p>
          <ul className="flex flex-wrap gap-3">
            {data?.myOrders?.map((item) => {
              return (
                <li className="p-5 rounded shadow-lg bg-white border flex flex-col max-w-[32%] text-[#333]">
                  <span className="font-bold mb-2">Order ID : {item.id}</span>
                  <ul>
                    {item.lineItems.map((lineItem) => {
                      return (
                        <li className="flex  sm:flex-row flex-col items-center gap-2 p-3 border-b-2 last-of-type:border-b-0">
                          <img
                            src={lineItem.variant.images[0].url}
                            alt="prod-img"
                            className="max-h-[100px] w-auto"
                          />
                          <div className="flex flex-col gap-3">
                            <span>{lineItem.name.en}</span>
                            <span>QTY : {lineItem.quantity}</span>
                          </div>
                          <div className="flex-1 text-right font-semibold">
                            <span>
                              {priceCalculator(
                                lineItem.variant.prices[0].value.centAmount,
                                lineItem.variant.prices[0].value.fractionDigits
                              )}{" "}
                              &#8364;
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex sm:flex-row flex-col gap-4 p-4">
                    <div className="flex-1">
                      <p className="font-semibold">Shipping Address</p>
                      <ul>
                        <li>First Name : {item.shippingAddress.firstName}</li>
                        <li>Last Name : {item.shippingAddress.lastName}</li>
                        <li>
                          Address : {item.shippingAddress.additionalStreetInfo}
                        </li>
                        <li>City : {item.shippingAddress.city}</li>
                        <li>Phone : {item.shippingAddress.phone}</li>
                        <li>Postal-Code : {item.shippingAddress.postalCode}</li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Billing Address</p>
                      <ul>
                        <li>First Name : {item.billingAddress.firstName}</li>
                        <li>Last Name : {item.billingAddress.lastName}</li>
                        <li>
                          Address : {item.billingAddress.additionalStreetInfo}
                        </li>
                        <li>City : {item.billingAddress.city}</li>
                        <li>Phone : {item.billingAddress.phone}</li>
                        <li>Postal-Code : {item.billingAddress.postalCode}</li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
};
