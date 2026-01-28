import { Card, CardContent } from "@/components/ui/card";

export function CategoryBox({ category, onSelect, isActive }) {
  return (
    <Card
      onClick={() => onSelect(category.name)}
      className={`bg-card transition-all duration-300 dark:brightness-110 cursor-pointer
        ${isActive ? "bg-accent/60" : "hover:brightness-85"}`}
    >
      <CardContent className="">
        {/* Background Image */}
        <div className="relative flex items-center justify-center p-4 w-20 h-20">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full  transition-all"
          />
          {/* Overlay Text */}
          <span className="absolute self-end -bottom-2 text-foreground text-xs font-bold uppercase">
            {category.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
