import "./App.css";
import { ProductList } from './components/ProductList'
//import { Cart } from './components/Cart'

const App = () => {

  return (
      <div className="App">
      <section>
        <ProductList />
      </section>
   {/*    <section>
        <Cart />
      </section> */}
    </div>
  )
}

export default App
