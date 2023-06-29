import { GET_PRODUCTS } from "../constants";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useListing = () => {
  const [fetchProducts, { data: products, error, loading }] =
    useLazyQuery(GET_PRODUCTS);

  const [page, setPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const { pageNo } = searchParams;

  useEffect(() => {
    console.log("useEffect triggred");
    fetchNext();
  }, [pageNo]);

  const fetchMore = () => {
    fetchProducts({
      variables: {
        page: parseInt(page + 20 + 1),
      },
    });
    setSearchParams({ pageNo: page + 1 });
    setPage(page + 1);
  };

  const getProducts = () => {
    fetchProducts({
      variables: {
        page: page,
      },
    });
    setSearchParams({ pageNo: page });
  };

  const fetchNext = () => {
    fetchProducts({
      variables: {
        page: pageNo,
      },
    });
  };

  return {
    page,
    setPage,
    fetchProducts,
    products,
    loading,
    fetchMore,
    getProducts,
  };
};

export default useListing;
