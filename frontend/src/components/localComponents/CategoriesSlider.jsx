import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
//categories images imports
import Keyboard_img from "../../assets/images/rgb_keyboard.png";
import earbud_img from "../../assets/images/hyperx_headphones.png";
import Smartphone_img from "../../assets/images/iphone_15_pro.png";
import Mouse_img from "../../assets/images/razer_mouse.png";
//Local comps imports
import { CategoryBox } from "./CategoryBox";
export default function CategoriesSlider({ activeCat, setActiveCat }) {
  const categories = [
    { name: "Mouses", image: Mouse_img },
    {
      name: "Keyboards",
      image: Keyboard_img,
    },
    {
      name: "Earbuds",
      image: earbud_img,
    },

    { name: "Smartphones", image: Smartphone_img },
  ];
  return (
    <div>
      <div className="w-full py-6 ">
        <Carousel
          opts={{ align: "start", dragFree: true }}
          className="w-full relative group"
        >
          <div className="flex items-center gap-2 justify-between mb-4">
            <h3 className="text-foreground uppercase text-sm font-bold tracking-widest">
              Shop by Category
            </h3>
            <div className="flex items-center gap-4">
              <CarouselPrevious className="static translate-y-0 cursor-pointer" />
              <CarouselNext className="static translate-y-0 cursor-pointer" />
            </div>
          </div>

          <CarouselContent className="">
            {categories.map((cat) => (
              <CarouselItem key={cat.name} className="basis-auto">
                <CategoryBox
                  category={cat}
                  isActive={activeCat === cat.name}
                  onSelect={setActiveCat}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
