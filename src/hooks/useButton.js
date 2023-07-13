import { useMutation } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "../constants";
import { toastConfig } from "../toast";

const useButton = () => {
  const [addToCartMutation, { data, loading: inProgress }] =
    useMutation(ADD_TO_CART);

  const addToCart = async (id) => {
    const popup = toast.loading("Adding item to cart..!!");
    const version = localStorage.getItem("version");
    const cartID = localStorage.getItem("cartID");
    try {
      console.log(version, cartID);
      const { data } = await addToCartMutation({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            lineItem: id,
          },
        },
      });
      localStorage.setItem("cartID", data.addToCart.id);
      localStorage.setItem("version", data.addToCart.version);
      console.log(data);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: "Item added successfully..!!",
      });
    } catch (error) {
      toast.update(popup, {
        ...toastConfig,
        type: "error",
        isLoading: false,
        render:
          "Some unexpected error has occured please try again after some time..!!!",
      });
      console.log(error, "from the useButton custom hook");
    }
  };

  return {
    addToCart,
  };
};

export default useButton;
