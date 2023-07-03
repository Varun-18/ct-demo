//Third - party dependencies

import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

// GraphlQL queries from the contants.js file

import { GET_SUGGESTIONS } from "../constants";

/**
 * Talon used for the header component
 * @returns The function and the data required by the header component
 */

const useHeader = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetchSuggiestion, { data: suggestions, error }] =
    useLazyQuery(GET_SUGGESTIONS);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setParams(data);
  };

  /**
   * Used for navigation
   * @param {object} param contains an objct of searched keyword
   * @returns it navigates to the PLP page
   */

  const setParams = (param) => {
    navigate(`/products?search=${param.search}&pageNo=0`);
  };

  /**
   * The function that is used to fetch suggestion and is triggred by debounce function
   * @param {string} value fetches the product suggestions as per the searched keyword
   * @returns fetched data from the node BFF layer
   */

  const onChangeFn = (value) => {
    console.log(value, "*** suggestions value ***");
    fetchSuggiestion({
      variables: {
        keyword: value,
      },
    });
  };

  /**
   *  Debounce function used to fetch suggestions from node BFF
   * executes the handleChange function after the given timeout
   */

  const handleChange = debounce((e) => onChangeFn(e.target.value), 500);

  /**
   * Used for navigating the user to the PLP page on the basis of searched keyword
   * after the user has selected na option from the suggestions
   * @param {string} value represents the keyword entered by the user
   */

  const searchedKeyword = (value) => {
    navigate(`/products?search=${value}&pageNo=0`);
    reset();
    fetchSuggiestion({
      variables: {
        keyword: "",
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleChange,
    suggestions,
    searchedKeyword,
  };
};

export default useHeader;
