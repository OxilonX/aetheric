import { Outlet } from "react-router";
import Navbar from "./components/localComponents/Navbar";
import Footer from "./components/localComponents/Footer";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
