import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { configure } from "@testing-library/react";

function ShowProducts({ products }) {
  console.log(products);
  return (
    <div>
      <ul class="decorativo">
        {products.map((elemento) => (
          <div key={elemento.product_id}>
            <h5 class="nombreproducto" >{elemento.name}</h5>
            <img class="productosindivi" src={elemento.photo_link} />
            <div class="precioproducto" >{elemento.price}€</div>
            <button class="botonbuy">Buy</button> 
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShowProducts;
