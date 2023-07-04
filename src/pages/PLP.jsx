import { size } from "lodash";
import React, { useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import useListing from "../talons/useListing";

export const PLP = () => {
  const {
    loading,
    products,

    fetchNext,
    fetchPrev,
    getProducts,
    searchParams,
  } = useListing();

  const searched = searchParams.get("search");

  useEffect(() => {
    console.log(searched, "*** from useEffect *** of PLP");
    if (searched === null) {
      getProducts();
    } else {
      getProducts(searched);
    }
  }, [searched]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="p-2">
        <div className="text-[#FF6666]">{/* <Link to={"/"}>Home</Link> */}</div>

        {size(products?.products) > 0 ? (
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-12 mx-auto">
              <div class="flex flex-wrap -m-4">
                {products.products.map((item) => {
                  return <ProductCard item={item} id={item.id} />;
                })}
              </div>
            </div>
            <div className="w-fit mx-auto pb-10">
              <Pagination next={fetchNext} prev={fetchPrev} />
            </div>
          </section>
        ) : null}
      </div>
    );
  }
};
