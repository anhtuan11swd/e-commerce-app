import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<Collection />} path="/collection" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Login />} path="/login" />
        <Route element={<Orders />} path="/orders" />
        <Route element={<PlaceOrder />} path="/place-order" />
        <Route element={<Product />} path="/product/:productId" />
      </Routes>
      <Footer />
      <ToastContainer
        autoClose={500}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        theme="light"
      />
    </div>
  );
}

export default App;
