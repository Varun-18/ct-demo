import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../constants";

const useDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productDetail, loading: progress } = useQuery(
    GET_PRODUCT_BY_ID,
    {
      variables: {
        productId: id,
      },
    }
  );
  console.log(productDetail);

  return {
    productDetail,
    progress,
    navigate,
  };
};

export default useDetail;
