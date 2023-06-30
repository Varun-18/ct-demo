import { useState } from "react";

const useAccordian = () => {
  const [shippingReturnsOpen, setShippingReturnsOpen] = useState(false);

  const [productDetailsOpen, setProductDetailsOpen] = useState(false);

  const toggleShippingReturns = () => {
    setShippingReturnsOpen(!shippingReturnsOpen);
  };

  const toggleProductDetails = () => {
    setProductDetailsOpen(!productDetailsOpen);
  };

  return {
    shippingReturnsOpen,

    toggleProductDetails,

    toggleShippingReturns,

    productDetailsOpen,
  };
};

export default useAccordian;
