import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { CheckoutDetails } from "../components/CheckoutDetails";
import { CheckoutForm } from "../components/CheckoutForm";
import useCheckout from "../talons/useCheckout";

export const Checkout = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex">
        <div className="flex-1 max-w-[50%]">
          <CheckoutForm fn={setShow} />
        </div>
        <div className="flex-1 max-w-[50%]">
          <CheckoutDetails show={show } />
        </div>
      </div>
    </div>
  );
};
