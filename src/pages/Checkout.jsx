import React from "react";
import { CheckoutForm } from "../components/CheckoutForm";

export const Checkout = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <CheckoutForm />
        </div>
        <div className="flex-1">second part of order details</div>
      </div>
    </div>
  );
};
