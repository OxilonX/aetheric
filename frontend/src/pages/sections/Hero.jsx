import { Button } from "@/components/ui/button";
import hero_img from "@/assets/images/antryx_blue_headphones.png";

export default function Hero() {
  return (
    <section id="hero-section" className="bg-background">
      <div className="container w-260 mx-auto flex items-center py-6 ">
        <div
          className="grid grid-cols-2 px-8 py-4 items-center w-full
                    bg-gradient-to-br from-[#dcecff] to-[#141f32]
                     dark:from-[#1b263b] dark:to-[#415a77] 
                     rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          {/* Text Content */}
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-6xl font-black tracking-tight text-foreground leading-[1.2]">
              Elevate Your Sonic Realm into the Ethereal
            </h1>
            <p className="text-base text-prinary opacity-50  leading-relaxed max-w-[480px]">
              Experience the Aetheric Blue—where precision engineering meets
              ethereal comfort. Designed for those who demand studio-grade
              clarity and a timeless aesthetic.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="default"
                className="capitalize px-8 py-6 text-md rounded-md"
              >
                shop now
              </Button>
              <Button
                variant="outline"
                className="capitalize px-8 py-6 text-md rounded-md"
              >
                view specs
              </Button>
            </div>
          </div>

          {/* Image Styling */}
          <div className="flex items-center justify-end w-full">
            <img
              className="w-full max-w-[350px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:scale-101"
              src={hero_img}
              alt="Antryx Blue Headphones"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
