import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Github, Linkedin } from "lucide-react";
import logo from "/public/aetheric_logo_no_bg.svg";
export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "News"],
    },
    {
      title: "Product",
      links: ["New Arrivals", "Best Sellers", "Sale", "All Products"],
    },
    {
      title: "Support",
      links: ["Help Center", "Shipping", "Returns", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-card mt-20 border-t border-secondary/20 flex items-center justify-center pt-5">
      <div className="container mx-auto flex flex-col  py-12 lg:w-260 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Start your journey for free
            </h1>
            <p className="text-muted-foreground">
              Join us and explore over 2000+ premium products in the market.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-secondary hover:bg-secondary/10 rounded-sm"
            >
              Learn more
            </Button>
            <Button className="bg-accent text-background hover:bg-accent/90 px-8 rounded-sm">
              Sign up
            </Button>
          </div>
        </div>

        <hr className="border-secondary/30 mb-16 mt-2" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-12 w-full mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 dark:brightness-150"
                src={logo}
                alt="Aetheric Logo"
              />
              <span className="text-2xl font-bold tracking-tighter text-accent">
                AETHERIC
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs font-normal leading-relaxed">
              Redefining the modern workspace with high-performance hardware and
              aetheric aesthetics. Built for creators, by creators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li
                      key={link}
                      className="text-sm text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-colors"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-secondary/30 mb-10 mt-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            © 2026 Aethric Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
            <Github className="w-5 h-5 text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-muted dark:hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
