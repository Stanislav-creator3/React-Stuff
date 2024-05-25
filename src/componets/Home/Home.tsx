import { FC, useEffect } from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { filterByPrice } from "../../features/products/productsSlice";

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { products, categories } = useAppSelector((state) => state);

 useEffect(() => {
  if(!products.list.length ) return;

  dispatch(filterByPrice(100))

 }, [dispatch, products.list.length])

  return (
    <>
      <Poster />
      <Products products={products.list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing"/>
      <Banner/>
      <Products products={products.filtered} amount={5} title="Less than 100$" />

    </>
  );
};

export default Home;
