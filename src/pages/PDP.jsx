import React from "react";
import { Loader } from "../components/Loader";
import { ProductDetail } from "../components/ProductDetail";
import useDetail from "../talons/useDetail";
import { NavLink as Link } from "react-router-dom";

export const PDP = () => {
  const { productDetail, progress } = useDetail();

  if (progress) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className="text-[#FF6666] p-2">
          <Link to={"/"}>Home</Link>
          &nbsp;
          <span> {">"} </span>
          &nbsp;
          <Link to={`/products/${productDetail?.product?.id}`}>
            {productDetail?.product?.name?.en}
          </Link>
        </div>
        <ProductDetail item={productDetail.product} />
      </div>
    )
  }
};
