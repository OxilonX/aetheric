import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router";

import logo from "/public/aetheric_logo_no_bg.svg";
//React imports
import { useEffect, useState, useContext } from "react";
//lucid dreams icons imports
import { ShoppingCart, Heart } from "lucide-react";
import { SunMoon } from "lucide-react";
//context imports
import { AuthContext } from "@/contexts/AuthContextProvider";
//local comps imports
import { ProfileAvatar } from "./ProfileAvatar";
export default function Header({ stopPointRef }) {
  let { user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const node = stopPointRef?.current;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const isPastTrigger = node
        ? currentScrollY > node.offsetTop
        : currentScrollY > 100;

      if (!isPastTrigger) {
        setIsVisible(true);
        setShouldRender(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
          setShouldRender(true);
        } else {
          setIsVisible(false);
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [stopPointRef, location.pathname]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  const handleTabsNavigation = (value) => {
    if (value === "home") navigate("/");
    if (value === "cart") navigate("/cart");
    if (value === "favourite") navigate("/favourite");
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: "16px",
          left: "0",
          right: "0",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-50px)",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          pointerEvents: isVisible ? "auto" : "none",
          display: shouldRender ? "flex" : "none",
        }}
        className={`sticky top-4 z-50 container lg:w-260  flex items-center justify-between 
          bg-card py-4 px-6 my-3 mx-auto rounded-md shadow-md 
         `}
      >
        <div className="flex items-center justify-center w-10 h-10">
          <img
            onClick={() => handleTabsNavigation("home")}
            src={logo}
            className="h-full w-full dark:brightness-150 cursor-pointer "
            alt="Logo"
          />
        </div>
        <nav>
          <Tabs defaultValue="home">
            <TabsList variant="line">
              <TabsTrigger
                className="cursor-pointer"
                onClick={() => scrollToSection("hero-section")}
                value="home"
              >
                home
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                onClick={() => scrollToSection("trending-section")}
                value="Trending"
              >
                trending
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                onClick={() => scrollToSection("products-section")}
                value="products"
              >
                products
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        <div className="flex items-center gap-4">
          <ShoppingCart
            className="cursor-pointer"
            onClick={() => handleTabsNavigation("cart")}
          />
          <Heart
            className="cursor-pointer"
            onClick={() => handleTabsNavigation("favourite")}
          />
          {user ? (
            <ProfileAvatar />
          ) : (
            <Button
              onClick={() => navigate("/register")}
              className="capitalize text-background dark:bg-accent px-4 rounded-md cursor-pointer"
            >
              Sign up
            </Button>
          )}
          <SunMoon
            className="w-6 h-6 cursor-pointer hover:scale-105 hover:rotate-32 duration-300 transition-all"
            onClick={() => {
              toggleTheme();
            }}
          />
        </div>
      </header>
    </>
  );
}
