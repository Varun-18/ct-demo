import { GET_PRODUCTS } from "../constants";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

const useListing = () => {
  const [fetchProducts, { data: products, error, loading }] =
    useLazyQuery(GET_PRODUCTS);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = searchParams.get("pageNo");
  const search = searchParams.get("search");

  const fetchNext = () => {
    console.log(pageNo, "from fetch next");
    if (!search) {
      fetchProducts({
        variables: {
          page: parseInt((parseInt(pageNo) + 1) * 20),
        },
      });
      if (!search) {
        setSearchParams({ pageNo: parseInt(pageNo) + 1 });
      }
    } else {
      fetchProducts({
        variables: {
          searched: search,
          page: parseInt((parseInt(pageNo) + 1) * 20),
        },
      });
      setSearchParams({ search: search, pageNo: parseInt(pageNo) + 1 });
    }
  };

  const fetchPrev = () => {
    console.log(search, "from fetch prev");
    if (!search) {
      if (parseInt(pageNo) !== 0) {
        fetchProducts({
          variables: {
            page: parseInt(parseInt(pageNo) * 20 - 20),
          },
        });
        setSearchParams({ pageNo: parseInt(pageNo) - 1 });
        // setPage(page - 1);
      } else {
        fetchProducts({
          variables: {
            page: 0,
          },
        });
        setSearchParams({ pageNo: 0 });
        // setPage(0);
      }
    } else {
      if (parseInt(pageNo) !== 0) {
        fetchProducts({
          variables: {
            searched: search,
            page: parseInt(parseInt(pageNo) * 20 - 20),
          },
        });
        setSearchParams({ search: search, pageNo: parseInt(pageNo) - 1 });

        // setPage(page - 1);
      } else {
        fetchProducts({
          variables: {
            searched: search,
            page: 0,
          },
        });
        setSearchParams({ search: search, pageNo: 0 });
        // setPage(0);
      }
    }
  };

  const getProducts = (searched) => {
    if (!searched) {
      if (!pageNo) {
        fetchProducts({
          variables: {
            page: 0,
          },
        });
        setSearchParams({ pageNo: 0 });
      } else {
        fetchProducts({
          variables: {
            page: parseInt(pageNo) * 20,
          },
        });
      }
    } else {
      if (parseInt(pageNo) !== 0) {
        fetchProducts({
          variables: {
            searched: searched,
            page: parseInt(pageNo) * 20,
          },
        });
        setSearchParams({ search: searched, pageNo: pageNo });
      } else {
        fetchProducts({
          variables: {
            searched: searched,
            page: 0,
          },
        });
        setSearchParams({ search: searched, pageNo: pageNo });
      }
    }
  };

  return {
    fetchProducts,
    products,
    loading,
    fetchNext,
    fetchPrev,
    getProducts,
    searchParams,
  };
};

export default useListing;
