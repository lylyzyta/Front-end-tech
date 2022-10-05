import React from "react";
import { useEffect, useState } from "react";
import getProducts from "../helpers/api";
import styles from "./ProductList.module.css";
import Popup from "./Popup";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts("http://localhost:5000/api/products").then((json) =>
      setProducts(json)
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [uniqueProduct, setUniqueProduct] = useState([]);
  const togglePopup = (productID) => {
    setIsOpen(!isOpen);
    fetch(`http://localhost:5000/api/products/${productID}`)
      .then((response) => response.json())
      .then((data) => setUniqueProduct(data.description));
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.titleContainer}>
        <h2> Product Catalogue </h2>
      </div>
      <section>
        <div className={styles.cardContainer}>
          {products.map((product) => (
            <section className={styles.cardStyle} key={product._id}>
              <>
                <img
                  className={styles.productsImg}
                  src={`http://localhost:5000/${product.image}`}
                  alt="logo-icon"
                />
                <p className={styles.productsName}>{product.name}</p>
                <p className={styles.productsInfo}> Brand: {product.brand}</p>

                <p className={styles.productsInfo}>Price: ${product.price}</p>

                <p className={styles.productsInfo}>
                  Stock: {product.countInStock}
                </p>
                <button
                  className={styles.productAdd}
                  onClick={() => togglePopup(product._id)}
                >
                  {" "}
                  Description{" "}
                </button>

                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b className={styles.productDetail}>{uniqueProduct}</b>
                        <br></br>
                        <br></br>
                        <br></br>

                        <button
                          className={styles.productClose}
                          onClick={togglePopup}
                        >
                          Close
                        </button>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
                <button className={styles.productAdd}>Agregar a carrito</button>
              </>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export { ProductList };
