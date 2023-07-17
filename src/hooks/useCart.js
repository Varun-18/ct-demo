import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_CART, REMOVE_LINE_ITEM } from "../constants";

const useCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const [getCartItems, { data, loading }] = useLazyQuery(GET_CART);
  const [removeLineItem, { data: newData, loading: refetchLineItems }] =
    useMutation(REMOVE_LINE_ITEM);

  const fetchCartItems = async () => {
    try {
      const cartID = localStorage.getItem("cartID");
      console.log(cartID, "from the use cart hook");
      const { data } = await getCartItems({
        variables: {
          cartId: cartID,
        },
        fetchPolicy: "no-cache",
      });
      console.log(data);
      setCartItems(data.getCart);
    } catch (error) {
      console.log(error, "from the usecart custom hook");
    }
  };

  const removeItem = async (id) => {
    try {
      const version = localStorage.getItem("version");
      const cartID = localStorage.getItem("cartID");
      const { data } = await removeLineItem({
        variables: {
          data: {
            cartVersion: version,
            cartID: cartID,
            lineItem: id,
          },
        },
      });
      console.log(data);
      localStorage.setItem("version",data.removeLineItem.version)
      setCartItems(data.removeLineItem);

    } catch (error) {
      console.log(error, "from the remove line item function in hook");
    }
  };

  return {
    cartItems,
    loading,
    fetchCartItems,
    removeItem,
    navigate,
  };
};

export default useCart;
