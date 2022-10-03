import { useEffect, useState } from "react";
import getProducts from "../helpers/api"
import styles from "./ProductList.module.css";
import Popup from "./Popup";

function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      getProducts(
        "http://localhost:5000/api/products"
      ).then((json) => setProducts(json));
    }, []);
  
   
    return (
      <section className={styles.productsContainer}>
        <div className={styles.titleContainer}>
          <h2> ——— Product Catalogue ———— </h2>
         </div>
  
        <section >
          <div className={styles.cardContainer}>
            {products.map((product) => (
               <section  className={styles.cardStyle} key={product.id}>
                   <>
                <img
                  className={styles.productsImg}
                  src={`http://localhost:5000/${product.image}`}
                  alt="logo-icon"
                />
                 <p  className={styles.productsName}>{product.name}</p>
                 <p  className={styles.productsInfo}> Brand: {product.brand}</p>
  
                <p className={styles.productsInfo}>Price: ${product.price}</p>
                
                <p className={styles.productsInfo}>Stock: {product.countInStock}</p> 
              </>
              </section>
            ))}
          </div>
        </section>
      </section>
    );
  }
  
  export { ProductList};
  