import { Outlet } from "react-router";
import Header from "./components/localComponents/Header";
import Footer from "./components/localComponents/Footer";
import { useRef } from "react";
const Layout = () => {
  const stopPointRef = useRef(null);
  return (
    <>
      <Header stopPointRef={stopPointRef} />
      <main className="">
        <Outlet context={stopPointRef} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
