import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flame } from "lucide-react";
import prod1_img from "../../assets/images/hyperx_headphones.png";
import prod2_img from "../../assets/images/genesis_mouse.png";
import prod3_img from "../../assets/images/gruby_orange_headphones.png";
import { useOutletContext } from "react-router";
//Utility comps imports
import RefHeaderStop from "@/components/utilityComponents/RefHeaderStop";

export default function Trending() {
  const stopPointRef = useOutletContext();
  const heroProducts = [
    {
      id: 1,
      name: "Aetheric Sentinel Headphones",
      description: "Immersive Sound, Ethereal Design.",
      price: "$299",
      image: prod1_img,
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: 2,
      name: "Nebula Smart Watch",
      description: "Track your journey through the stars.",
      price: "$199",
      image: prod2_img,
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      id: 3,
      name: "Obsidian Mechanical Keyboard",
      description: "Precision tactile response.",
      price: "$150",
      image: prod3_img,
      color: "from-gray-700/20 to-black/20",
    },
  ];

  return (
    <>
      <section id="hero-page" className="">
        <div className="container lg:w-260 mx-auto  flex items-center py-4">
          <div className="">
            <div className="flex flex-col gap-2 my-10">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent fill-current" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  Our <span className="text-foreground">Curated Drops</span>
                </span>
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-foreground ">
                Best Seller Products
              </h1>
            </div>
            <Carousel className="">
              <CarouselContent className="">
                {heroProducts.map((product) => (
                  <CarouselItem key={product.id} className="">
                    <div className="">
                      <Card className="bg-card  border-none shadow-lg overflow-hidden px-1">
                        <CardContent className="grid grid-cols-2 gap-2 h-110 items-center">
                          {/* Text Section */}
                          <div className="flex flex-col justify-center">
                            <span className="text-sm font-bold tracking-widest uppercase text-accent pl-1">
                              New Arrival
                            </span>
                            <h2 className="text-6xl font-bold text-foreground leading-19 ">
                              {product.name}
                            </h2>
                            <div className="flex  flex-col gap-4 items-start mt-2 pl-1">
                              <p className="text-sm text-muted-foreground font-medium">
                                {product.description}
                              </p>
                              <p className="text-xl font-bold">
                                {product.price}
                              </p>
                              <Button className="text-base text-card capitalize px-8 py-5">
                                buy now
                              </Button>
                            </div>
                          </div>
                          <div className="flex-1 flex items-center justify-end self-end justify-self-end ">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-[400px] w-full object-contain drop-shadow-2xl "
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="" />
              <CarouselNext className="" />
            </Carousel>
            <RefHeaderStop ref={stopPointRef} />
            {/* <div className="h-100"></div> */}
          </div>
        </div>
      </section>
    </>
  );
}
