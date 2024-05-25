import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/Api/apiSlice";
import { ROUTES } from "../../utils/router";
import Product from "./Product";
import Products from "./Products";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

const SingleProducts: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const { list, related } = useAppSelector(({ products }) => products);
  console.log(related)
  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  useEffect(() => {
    if(!data || !list.length) return
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, dispatch, list.length]);
  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products"></Products>
    </>
  );
};

export default SingleProducts;
