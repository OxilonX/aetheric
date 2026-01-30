//react imports
import { useState, useContext } from "react";
//lucid icons imports
import { Flame } from "lucide-react";
//shadcn comps imports
import CategoriesSlider from "@/components/localComponents/CategoriesSlider";
import ProductGrid from "@/components/localComponents/ProductsGrid";
//local imgs imports cats
import Mouse_img from "@/assets/images/genesis_mouse.png";
import Keyboard_img from "@/assets/images/rgb_keyboard.png";
import earbud_img from "@/assets/images/antryx_blue_headphones.png";
import Smartphone_img from "@/assets/images/iphone_17_pro_phone.png";
//context imports
import { prodsContext } from "@/contexts/ProdsContextProvider";
export default function Products() {
  const { products, setProducts } = useContext(prodsContext);
  const [activeCategorie, setIsActiveCategorie] = useState("All");
  const [prodsLoading, setProdsLoading] = useState(false);

  return (
    <>
      <section id="products-section" className="">
        <div className="container lg:w-260 mx-auto    py-4">
          {/*Products Section Title*/}
          <div className="flex flex-col gap-2 mt-10 mb-4">
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
