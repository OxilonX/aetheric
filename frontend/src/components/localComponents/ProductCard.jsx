import { Card, CardContent } from "@/components/ui/card";
//lucid icons imports
export default function ProductCard({ product }) {
  return (
    <div>
      <Card className="bg-card h-[350px] shadow-lg cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center h-full relative">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center w-[300px] h-[200px] self-center">
              <img
                className="object-contain max-h-[200px] w-full "
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <p className="font-medium text-xs text-muted-foreground capitalize">
                {product.category}
              </p>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl text-foreground">
                  {product.name}
                </h1>
                <p className="font-bold text-lg text-accent">
                  {"$ " + product.price + ".00 USD"}{" "}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
