import { Flame } from "lucide-react";
export default function Products() {
  return (
    <>
      <section id="products-section" className="">
        <div className="container lg:w-260 mx-auto  flex items-center py-4">
          {/*Products Section Title*/}
          <div className="flex flex-col gap-2 my-10">
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
        </div>
        <div className="">

        </div>
      </section>
    </>
  );
}
