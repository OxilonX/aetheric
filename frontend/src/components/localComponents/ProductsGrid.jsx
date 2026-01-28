//local comps imports
import SkeletonGrid from "@/components/utilityComponents/SkeletonGrid";
import ProductCard from "./ProductCard";
export default function ProductGrid({ products, loading, selectedCat }) {
  if (loading) return <SkeletonGrid />;

  return (
    <div className="grid grid-cols-3  gap-6 py-6">
      {selectedCat === "All"
        ? products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        : products.map((product) => {
            if (product.category === selectedCat)
              return <ProductCard key={product.id} product={product} />;
          })}
    </div>
  );
}
