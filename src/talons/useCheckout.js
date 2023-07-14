import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    ADD_BILLING_METHOD,
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_METHOD,
  ADD_USER_EMAIL,
} from "../constants";
import { toastConfig } from "../toast";

const useCheckout = () => {
  const [level, setLevel] = useState(0);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  /********************** GQL MUTAITONS ************************/

  const [addUserEmail] = useMutation(ADD_USER_EMAIL);
  const [addShippingAddress] = useMutation(ADD_SHIPPING_ADDRESS);
  const [addShippingMethod] = useMutation(ADD_SHIPPING_METHOD);
  const [addBillingAddress] = useMutation(ADD_BILLING_METHOD);

  /**
   * Add custom email for the guest checkout process
   * @param {string} email the email of the guest user
   * @returns Adds the email in the cart
   */
  const continueAsGuest = async ({ email }) => {
    const popup = toast.loading("Adding the email..!!");

    try {
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");
      console.log(email);
      const { data } = await addUserEmail({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            email,
          },
        },
      });
      console.log(data);
      localStorage.setItem("cartID", data.addCustomerEmail.id);
      localStorage.setItem("version", data.addCustomerEmail.version);
      setLevel(1);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: `email set to ${data.addCustomerEmail.customerEmail}`,
      });
    } catch (error) {
      toast.update(popup, {
        ...toastConfig,
        type: "error",
        isLoading: false,
        render:
          "Some unexpected error has occured please try again after some time..!!!",
      });
      console.log(error);
    }
  };

  /**
   * This function is used to add the shipping deatils to the cart
   * @param {object} data contains the shipping details of the user
   * @returns updates the shipping address of the cart
   */

  const setShippingAddress = async (data) => {
    const popup = toast.loading("updating the shipping address..!!");

    try {
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");
      console.log(data);
      const result = await addShippingAddress({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            ...data,
          },
        },
      });

      localStorage.setItem("cartID", result.data.addShippingAddress.id);
      localStorage.setItem("version", result.data.addShippingAddress.version);
      console.log(result);
      setLevel(2);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: `Successfully added the address`,
      });
    } catch (error) {
      console.log(error);
      toast.update(popup, {
        ...toastConfig,
        type: "error",
        isLoading: false,
        render:
          "Some unexpected error has occured please try again after some time..!!!",
      });
    }
  };

  /**
   * This function sets the shipping method prefered by the user
   * @param {value} value the type of shipping otped by the user
   * @returns Sets the shpping method prefered by the user
   */

  const setShippingMethod = async (e) => {
    try {
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");
      console.log(e.target.value);
      const { data } = await addShippingMethod({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            id: e.target.value,
          },
        },
      });

      console.log(data);

      localStorage.setItem("cartID", data.addShippingMethod.id);
      localStorage.setItem("version", data.addShippingMethod.version);
      setLevel(3);
    } catch (error) {}
  };

  /**
   * This function is used to add the Billing deatils to the cart
   * @param {object} data contains the Billing details of the user
   * @returns updates the Billing address of the cart
   */

  const setBillingAddress = async (data) => {
    const popup = toast.loading("updating the billing address..!!");

    try {
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");
      console.log(data);
      const result = await addBillingAddress({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            ...data,
          },
        },
      });
      
      console.log(result);
      localStorage.setItem("cartID", result.data.addBillingAddress.id);
      localStorage.setItem("version", result.data.addBillingAddress.version);
      setLevel(4);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: `Successfully added the address`,
      });
    } catch (error) {
      console.log(error);
      toast.update(popup, {
        ...toastConfig,
        type: "error",
        isLoading: false,
        render:
          "Some unexpected error has occured please try again after some time..!!!",
      });
    }
  };

  /**
   * This function sets the Payment method prefered by the user
   * @param {value} value the type of Payment otped by the user
   * @returns Sets the Payment method prefered by the user
   */

  const setPaymentMethod = async (data) => {
    try {
      console.log(data);
      setLevel(5);
    } catch (error) {}
  };

  /**
   * @returns This function is used to convert a cart to an order
   */

  const createOrder = async () => {
    try {
      console.log("clicked");
    } catch (error) {}
  };

  return {
    register,
    handleSubmit,
    navigate,
    continueAsGuest,
    level,
    setShippingAddress,
    setShippingMethod,
    setBillingAddress,
    setPaymentMethod,
    createOrder,
  };
};

export default useCheckout;
