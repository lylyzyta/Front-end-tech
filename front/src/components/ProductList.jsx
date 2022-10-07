import React from "react";
import { useEffect, useState } from "react";
import getProducts from "../helpers/api";
import styles from "./ProductList.module.css";
import Popup from "./Popup";

function ProductList() {
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
  const [cart, setCart] = useState([]);

  let quantity = 1;

  function addtocart(item) {
    console.log(item);
    let cart2 = [...cart];
    cart2.push({ ...item });
    setCart(cart2);
  }

  function removetocart(item) {
    let cart2 = cart.filter((i) => i._id !== item._id);
    setCart(cart2);
  }

  function increase(item) {
    let x = cart.map((i) => {
      if (item._id === i._id) {
        console.log("hola");
        quantity += 1;
      }
      return i;
    });
    setCart(x);
  }
  function decrease(item) {
    let x = cart.map((i) => {
      if (item._id === i._id && quantity > 1) {
        console.log("hola");
        quantity -= 1;
      }
      return i;
    });
    setCart(x);
  }
  function total() {
    let x = 0;
    // eslint-disable-next-line array-callback-return
    cart.map((i) => {
      x += i.price * quantity;
    });
    return x;
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <h2> Product Catalogue </h2>
      </div>
      <div className={styles.productsContainer}>
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
                          <b className={styles.productDetail}>
                            {uniqueProduct}
                          </b>
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
                  <button
                    className={styles.productAdd}
                    onClick={() => addtocart(product)}
                  >
                    Agregar a carrito
                  </button>
                </>
              </section>
            ))}
          </div>
        </section>
        <div className="row mt-3">
          <table className="table  text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((i, index) => (
                <tr key={i._id}>
                  <th scope="row">{index + 1}</th>
                  <th scope="row">
                    <img
                      src={`http://localhost:5000/${i.image}`}
                      style={{ width: "5rem" }}
                    />
                  </th>
                  <td>{i.name}</td>
                  <td> ${i.price}</td>
                  <td>
                    <button
                      onClick={() => decrease(i)}
                      className={styles.btnIncreaseDecrease}
                    >
                      -
                    </button>
                    {quantity}
                    <button
                      onClick={() => increase(i)}
                      className={styles.btnIncreaseDecrease}
                    >
                      +
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => removetocart(i)}
                      className={styles.productRem}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="row">
            <div class="col text-center">
              <h4>TOTAL: {total()}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ProductList };
