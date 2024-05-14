import React, { useContext, useEffect } from "react";
import "./index.css";
import ShowProducts from "./ShowProducts";
import axios from "axios";
import { AppContext } from "../App";
import { ACTIONS } from "../constants";
// import products from './products.json'

function Products() {
  const { state, fnDispatch } = useContext(AppContext);
  const fnGetProducts = async () => {
    console.log("Entro");
    try {
      const {data} = await axios.get("https://lwlc-proj-2024.onrender.com/products", {
        headers: {
          Authorization: state.token,
          "Content-Type": "appication/json",
        },
      });
      fnDispatch({
        type: ACTIONS.products,
        products: data,
      });
      // Replace 'https://api.example.com/data' with your API endpoint
      // setData(response.data);
    } catch (error) {
      // setError(error);
    }
  };
  useEffect(() => {
    fnGetProducts();
  }, []);

  return (
    <main>
      <div className="container">
        <h2>Categorías</h2>
        <div className="categories">
          <button>Tecnología</button>
          <button>Ropa</button>
          <button>Hogar</button>
          <button>Deportes</button>
        </div>
        <h2>Productos Destacados</h2>
        <div className="featured-product">
          {/* <ShowProducts products={state.products} /> */}
          <ShowProducts products={state.products} />
        </div>
      </div>
    </main>
  );
}

export default Products;
