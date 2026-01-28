import { Flame } from "lucide-react";
import { useState } from "react";
import CategoriesSlider from "@/components/localComponents/CategoriesSlider";
import ProductGrid from "@/components/localComponents/ProductsGrid";
//local imgs imports cats
import Mouse_img from "@/assets/images/genesis_mouse.png";
import Keyboard_img from "@/assets/images/rgb_keyboard.png";
import earbud_img from "@/assets/images/antryx_blue_headphones.png";
import Smartphone_img from "@/assets/images/iphone_17_pro_phone.png";
export default function Products() {
  const [activeCategorie, setIsActiveCategorie] = useState("");
  // const [products, setProducts] = useState([]);
  const [prodsLoading, setProdsLoading] = useState(false);
  const products = [
    {
      id: 1,
      name: "Antryx Blue Mouse",
      category: "Mouses",
      price: 45.0,
      image: Mouse_img,
      description: "Precision optical sensor with customizable RGB.",
    },
    {
      id: 2,
      name: "Lumina Mechanical",
      category: "Keyboards",
      price: 89.0,
      image: Keyboard_img,
      description: "Tactile brown switches with a sleek aluminum frame.",
    },
    {
      id: 3,
      name: "Aether Buds Pro",
      category: "Earbuds",
      price: 120.0,
      image: earbud_img,
      description: "Active noise cancellation and 24-hour battery life.",
    },
    {
      id: 4,
      name: "Aetheric Smartphone",
      category: "Smartphones",
      price: 899.0,
      image: Smartphone_img,
      description: "OLED display with high-speed 5G connectivity.",
    },
    {
      id: 5,
      name: "Silent Click Mouse",
      category: "Mouses",
      price: 30.0,
      image: Mouse_img,
      description: "Perfect for office environments and late-night gaming.",
    },
    {
      id: 6,
      name: "Compact 60% Keyboard",
      category: "Keyboards",
      price: 75.0,
      image: Keyboard_img,
      description: "Space-saving design without sacrificing performance.",
    },
  ];
  return (
    <>
      <section id="products-section" className="">
        <div className="container lg:w-260 mx-auto    py-4">
          {/*Products Section Title*/}
          <div className="flex flex-col gap-2 mt-10 mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent fill-current" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Our <span className="text-foreground">products</span>
              </span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-foreground ">
              Premium Tech Gear
            </h1>
          </div>
          {/*Products Section Content*/}
          {/*Products Categories Slider*/}
          <CategoriesSlider
            activeCat={activeCategorie}
            setActiveCat={setIsActiveCategorie}
          />
          <div className="">
            <ProductGrid
              selectedCat={activeCategorie}
              products={products}
              loading={prodsLoading}
            />
          </div>
        </div>
      </section>
    </>
  );
}
