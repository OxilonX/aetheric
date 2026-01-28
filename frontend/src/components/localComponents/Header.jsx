import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import logo from "/public/aetheric_logo_no_bg.svg";
//React imports
import { useEffect, useState, useRef } from "react";
export default function Header({ stopPointRef }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const timeoutRef = useRef(null);

  const location = useLocation();
  useEffect(() => {
    const resetHeader = () => {
      setIsVisible(true);
      setShouldRender(true);
    };

    resetHeader();

    const node = stopPointRef?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const visible = !entry.isIntersecting;
        setIsVisible(visible);

        if (visible) {
          setShouldRender(true);
        } else {
          timeoutRef.current = setTimeout(() => {
            setShouldRender(false);
          }, 3000);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // 3. Add location.pathname here so the effect restarts on navigation
  }, [stopPointRef, location.pathname]);
  const navigate = useNavigate();
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  const handleTabsNavigation = (value) => {
    if (value === "home") navigate("/");
    if (value === "cart") navigate("/cart");
    if (value === "favourite") navigate("/favourite");
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
            className="h-full w-full dark:brightness-150 "
            alt="Logo"
          />
        </div>
        <nav>
          <Tabs defaultValue="home">
            <TabsList variant="line">
              <TabsTrigger value="home">home</TabsTrigger>
              <TabsTrigger value="Trending">trending</TabsTrigger>
              <TabsTrigger value="products">products</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        <div className="flex items-center gap-4">
          <ShoppingCart onClick={() => handleTabsNavigation("cart")} />
          <Heart onClick={() => handleTabsNavigation("favourite")} />
          <User />
          <Button
            onClick={() => {
              toggleTheme();
            }}
          >
            Theme
          </Button>
        </div>
      </header>
    </>
  );
}
