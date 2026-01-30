import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//context imports
import { AuthContext } from "@/contexts/AuthContextProvider";
//react imports
import { useContext } from "react";
//lucid icons imports
import { Heart, ShoppingBag, Plus, Minus } from "lucide-react";
//react router imports
import { useNavigate } from "react-router";
import api from "../utilityComponents/authorizationTokenHandler";
export default function ProductCard({ product }) {
  const { API_BASE_URL, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToCartClick = async (id) => {
    if (!user) {
      navigate("/register");
      return;
    }

    try {
      if (loading) return;
      const response = await api.post(`${API_BASE_URL}/api/products/add/cart`, {
        prod_id: id,
        quantity: 1,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Card className="bg-card h-[350px] shadow-lg cursor-pointer">
        <CardContent className="group flex flex-col items-center justify-center h-full relative">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center w-[300px] h-[200px] self-center">
              <img
                className="object-contain max-h-[200px] w-full drop-shadow-xl "
                src={`${API_BASE_URL}${product.prod_img}`}
                alt={product.name}
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
          <div className="self-end pr-5">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <ShoppingBag
                    size={30}
                    className="hover:text-background hover:bg-accent absolute  bottom-0 translate-y-4 opacity-0 transition-all duration-300 ease-out 
                  group-hover:translate-y-0 group-hover:opacity-100 bg-primary text-background p-2 rounded-full cursor-pointer shadow-lg"
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>{product.description}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="flex self-center justify-self-center items-center justify-center w-70 h-70">
                      <img
                        className="object-contain h-full w-full drop-shadow-2xl"
                        src={`${API_BASE_URL}${product.prod_img}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                      {/* Header for Details */}
                      <div className="flex items-center justify-between border-b border-secondary/20 pb-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                          Product Details
                        </h3>
                        {/* Stock Badge */}
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="flex items-center gap-4">
                        {/* Price Block */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            Price
                          </span>
                          <p className="text-sm text-accent font-bold tracking-tight">
                            {"$ " + product.price + ".00"}{" "}
                            <span className="text-[9px] text-muted-foreground">
                              USD
                            </span>
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] h-6 bg-secondary/30 rounded-full" />

                        {/* Category part */}
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            category
                          </span>
                          <p className="text-sm text-foreground font-semibold capitalize">
                            {product.category || "Premium Audio"}
                          </p>
                        </div>
                        <div className="w-[1px] h-6 bg-secondary/30 rounded-full" />
                        <div className="ml-auto flex flex-col items-end">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            Rating
                          </span>
                          <div className="flex text-amber-500 text-[10px]">
                            ★★★★★
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        className="capitalize px-6 text-md rounded-md cursor-pointer"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleAddToCartClick(product.id);
                        }}
                        className="capitalize text-background dark:bg-accent px-6 rounded-md cursor-pointer"
                        type="submit"
                      >
                        Add to cart
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>

            <Heart
              size={30}
              className="hover:text-background hover:bg-accent absolute top-0 opacity-0 transition-all duration-300 ease-out 
                group-hover:opacity-100 bg-primary text-background p-2 rounded-full cursor-pointer shadow-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
