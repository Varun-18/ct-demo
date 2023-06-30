import { GET_PRODUCTS } from "../constants";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useListing = () => {
  const [fetchProducts, { data: products, error, loading }] =
    useLazyQuery(GET_PRODUCTS);

  const [page, setPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = searchParams.get("pageNo");

  useEffect(() => {
    fetchOnRefresh();
  }, []);

  const fetchOnRefresh = () => {
    if (pageNo) {
      fetchProducts({
        variables: {
          page: parseInt(pageNo) * 20,
        },
      });
      setPage(parseInt(pageNo));
    }
  };
  const fetchNext = () => {
    fetchProducts({
      variables: {
        page: parseInt((page + 1) * 20),
      },
    });
    setSearchParams({ pageNo: page + 1 });
    setPage(page + 1);
  };

  const fetchPrev = () => {
    if (page !== 0) {
      fetchProducts({
        variables: {
          page: parseInt(page * 20 - 20),
        },
      });
      setSearchParams({ pageNo: page - 1 });
      setPage(page - 1);
    } else {
      fetchProducts({
        variables: {
          page: 0,
        },
      });
      setSearchParams({ pageNo: 0 });
      setPage(0);
    }
  };

  const getProducts = () => {
    fetchProducts({
      variables: {
        page: page,
      },
    });
    setSearchParams({ pageNo: page });
    // setPage(page)
  };

  return {
    page,
    fetchProducts,
    products,
    loading,
    fetchNext,
    fetchPrev,
    getProducts,
  };
};

export default useListing;
