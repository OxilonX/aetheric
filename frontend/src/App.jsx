import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favourite" element={<Favourite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
