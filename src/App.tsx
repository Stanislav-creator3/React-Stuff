import { FC, useEffect } from "react";
import "./App.css";
import Footer from "./componets/Footer/Footer";
import Header from "./componets/Header/Header";
import AppRoutes from "./componets/Routes/Routes";
import Sidebar from "./componets/Sidebar/Sidebar";
import { useAppDispatch } from "./hooks/redux";
import "./styles/index.scss";
import { getCategories } from "./features/categories/categoriesSlice";
import { getProducts } from "./features/products/productsSlice";
import UserForm from "./componets/User/UserForm";

const App : FC = () => {
  const dispatch = useAppDispatch()
  useEffect(()=> {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  return (
    <div className="app">
      <Header />
      <UserForm/>
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
