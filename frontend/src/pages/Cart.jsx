import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { X, ShieldCheck, Plus, Minus, Flame } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";
import api from "@/components/utilityComponents/authorizationTokenHandler";
import axios from "axios";
import { getAccessToken } from "@/contexts/AuthContextProvider";
export default function Cart() {
  const { API_BASE_URL, loading } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);
  const getCartProds = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/api/products/get/cart`);

      if (!response) return console.log("Loading cart products failed.");
      const data = response.data;
      setCartProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    const token = getAccessToken();
    if (!loading && token) getCartProds();
  }, [loading]);

  const [totalPrice, setTotalPrice] = useState(0.0);
  const [tax, setTax] = useState(0.0);
  const handleDeleteCartProd = async (prod_id) => {
    if (loading) return;
    try {
      const response = await api.delete(
        `${API_BASE_URL}/api/products/remove/cart/${prod_id}`,
      );
      if (!response) return;
      getCartProds();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section id="cart-page" className="max-w-260 mx-auto px-6 py-16">
      <div className="flex flex-col gap-2 mt-10 mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-accent fill-current" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
            My <span className="text-foreground">Shopping Cart</span>
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-foreground ">
          Your Gear Awaits
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <Table>
            <TableHeader className="bg-secondary/10">
              <TableRow className="hover:bg-transparent border-b-2">
                <TableHead className="w-[300px] py-4">Product</TableHead>
                <TableHead className="">Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((product, index) => {
                return (
                  <TableRow
                    key={product.cart_item_id || product.product_id || index}
                    className="group border-b  hover:bg-transparent border-secondary/20"
                  >
                    <TableCell className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-secondary/10 rounded-xl overflow-hidden flex items-center justify-center border border-secondary/20">
                          <img
                            src={`${API_BASE_URL}${product.url}`}
                            alt="Product"
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-lg">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md border-secondary/40 hover:bg-secondary/10 active:scale-95 transition-all"
                            onClick={() => {}}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <Input
                            id="qty-input"
                            type="number"
                            defaultValue="1"
                            className="h-8 w-12 rounded-md border-secondary/40 bg-transparent text-center text-xs font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-1 focus-visible:ring-accent"
                          />

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md border-secondary/40 hover:bg-secondary/10 active:scale-95 transition-all"
                            onClick={() => {}}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {"$" + product.price}
                    </TableCell>
                    <TableCell className="text-right hover:bg-transparent">
                      <Button
                        onClick={() => handleDeleteCartProd(product.id)}
                        variant="ghost"
                        size="icon"
                        className="bg-transparent!  text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Right: Summary + Checkout Card */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">$250.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-emerald-500 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold">{tax}</span>
              </div>
              <div className="h-[1px] bg-secondary/20 my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">{totalPrice}</span>
              </div>
            </div>

            <Button
              className=" capitalize text-background dark:bg-accent 
            px-8 py-6 text-md rounded-md w-full h-14  
            bg-foreground hover:bg-accent-foreground text-lg font-bold shadow-lg transition-all cursor-pointer"
            >
              Proceed to Checkout
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure Checkout • Encrypted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
