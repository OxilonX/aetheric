import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useNavigate } from "react-router";
import logo from "/public/aetheric_logo_no_bg.svg";
export default function Header() {
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
      <header className="container lg:w-260  flex items-center justify-between bg-card py-4 px-6 my-3 mx-auto rounded-md shadow-md">
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
