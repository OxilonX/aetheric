import { Outlet } from "react-router";
import Header from "./components/localComponents/Header";
import Footer from "./components/localComponents/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
