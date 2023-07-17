import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ADD_BILLING_METHOD,
  ADD_PAYMENT_METHOD,
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_METHOD,
  ADD_USER_EMAIL,
  GET_CART,
  PLACE_ORDER,
} from "../constants";
import { toastConfig } from "../toast";

const useCheckout = () => {
  const [level, setLevel] = useState(0);
  const [renderPrice, setRenderPrice] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  /******************* FIELD CHANGE STATES *********************/

  const [email, setEmail] = useState(null);
  const [shippingAddress, setShipAddress] = useState(null);
  const [shippingMethod, setShipMethod] = useState(null);
  const [billingAddress, setBillAddress] = useState(null);

  /********************** GQL  ************************/

  const cartID = localStorage.getItem("cartID");
  const { data: cartData, loading: cartDataLoading } = useQuery(GET_CART, {
    variables: {
      cartId: cartID,
    },
  });
  const [addUserEmail] = useMutation(ADD_USER_EMAIL);
  const [addShippingAddress] = useMutation(ADD_SHIPPING_ADDRESS);
  const [addShippingMethod] = useMutation(ADD_SHIPPING_METHOD);
  const [addBillingAddress] = useMutation(ADD_BILLING_METHOD);
  const [addPaymentMethod] = useMutation(ADD_PAYMENT_METHOD);
  const [convertCartToOrder] = useMutation(PLACE_ORDER);

  useEffect(() => {
    console.log(cartData);
    if (cartData?.getCart?.customerEmail) {
      setEmail(cartData?.getCart?.customerEmail);
      setLevel(1);
    }

    if (cartData?.getCart?.shippingAddress) {
      setShipAddress(
        `${cartData?.getCart?.shippingAddress.firstName} ${cartData?.getCart?.shippingAddress.lastName} , ${cartData?.getCart?.shippingAddress.additionalStreetInfo} , ${cartData?.getCart?.shippingAddress.city} , ${cartData?.getCart?.shippingAddress.postalCode} , ${cartData?.getCart?.shippingAddress.phone}. `
      );
      setLevel(2);
    }

    if (cartData?.getCart?.shippingInfo) {
      setShipMethod(cartData?.getCart?.shippingInfo?.shippingMethodName);
      setLevel(3);
    }

    if (cartData?.getCart?.billingAddress) {
      setBillAddress(
        `${cartData?.getCart?.billingAddress.firstName} ${cartData?.getCart?.billingAddress.lastName} , ${cartData?.getCart?.billingAddress.additionalStreetInfo} , ${cartData?.getCart?.billingAddress.city} , ${cartData?.getCart?.billingAddress.postalCode} , ${cartData?.getCart?.billingAddress.phone}. `
      );
      setLevel(4);
    }
  }, [cartDataLoading]);

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
      if (data.addCustomerEmail.code === 404) {
        toast.update(popup, {
          ...toastConfig,
          type: "error",
          isLoading: false,
          render: data.addCustomerEmail.message,
        });
      } else {
        localStorage.setItem("cartID", data.addCustomerEmail.id);
        localStorage.setItem("version", data.addCustomerEmail.version);
        setLevel(1);
        setEmail(data.addCustomerEmail.customerEmail);
        toast.update(popup, {
          ...toastConfig,
          type: "success",
          isLoading: false,
          render: `email set to ${data.addCustomerEmail.customerEmail}`,
        });
      }
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
      setShipAddress(
        `${result.data.addShippingAddress.shippingAddress.firstName} ${result.data.addShippingAddress.shippingAddress.lastName} , ${result.data.addShippingAddress.shippingAddress.additionalStreetInfo} , ${result.data.addShippingAddress.shippingAddress.city} , ${result.data.addShippingAddress.shippingAddress.postalCode} , ${result.data.addShippingAddress.shippingAddress.phone}. `
      );
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
    const popup = toast.loading("updating the shipping method..!!");
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
      setShipMethod(data.addShippingMethod.shippingMethod);
      setRenderPrice(true);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: `Successfully added the shipping method..!!`,
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
      setBillAddress(
        `${result.data.addBillingAddress.billingAddress.firstName} ${result.data.addBillingAddress.billingAddress.lastName} , ${result.data.addBillingAddress.billingAddress.additionalStreetInfo} , ${result.data.addBillingAddress.billingAddress.city} , ${result.data.addBillingAddress.billingAddress.postalCode} , ${result.data.addBillingAddress.billingAddress.phone}. `
      );
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

  const setPaymentMethod = async (e) => {
    try {
      console.log(e.target.value);

      /*
       *There was an error in creating a payment and then adding it to a cart
       *Maybe we only create payment only at the time when the order is prepaid and is unique form eah customer's payment
       */

      // const version = localStorage.getItem("version");
      // const cartID = localStorage.getItem("cartID");

      // const { data } = await addPaymentMethod({
      //   variables: {
      //     data: {
      //       cartVersion: version,
      //       cartID: cartID,
      //       id: e.target.value,
      //     },
      //   },
      // });

      // console.log(data);
      // localStorage.setItem("cartID", data.addPaymentMethod.id);
      // localStorage.setItem("version", data.addPaymentMethod.version);
      toast.success("Changed the payment method to COD..!!");
      setLevel(5);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function takes the cartid and version from the loacal storage
   * and then converts that into the order
   * and after converting it into the order we need to remove it from the loaclstorage
   * as teh function of that cart is completed
   * @returns This function is used to convert a cart to an order
   */

  const createOrder = async () => {
    const popup = toast.loading(
      "Placing the order do not refresh or return..!!"
    );

    try {
      console.log("clicked");
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");

      const { data } = await convertCartToOrder({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
          },
        },
      });

      localStorage.removeItem("version");
      localStorage.removeItem("cartID");
      console.log(data);
      toast.update(popup, {
        ...toastConfig,
        type: "success",
        isLoading: false,
        render: `Successfully placed the order`,
      });
    } catch (error) {
      toast.update(popup, {
        ...toastConfig,
        type: "error",
        isLoading: false,
        render:
          "Some unexpected error has occured please try again after some time..!!!",
      });
      console.log(error, " from the convertCartToOrder from useCHeckout ");
    }
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
    email,
    setEmail,
    shippingAddress,
    setShipAddress,
    shippingMethod,
    setShipMethod,
    billingAddress,
    setBillAddress,
    renderPrice,
  };
};

export default useCheckout;
