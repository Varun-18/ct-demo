import { size } from "lodash";
import React from "react";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import useListing from "../talons/useListing";

export const PLP = () => {
  const { loading, products, page, fetchMore, setPage, getProducts } =
    useListing();

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <button onClick={() => getProducts()}> fetch prodcuts</button>
        {size(products) > 0 ? (
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="flex flex-wrap -m-4">
                {products.products.map((item) => {
                  return <ProductCard item={item} id={item.id} />;
                })}
              </div>
            </div>
            <Pagination active={page} setActive={setPage} />
          </section>
        ) : null}
        {/* <button onClick={() => fetchMore()}>load more</button> */}
      </div>
    );
  }
};
