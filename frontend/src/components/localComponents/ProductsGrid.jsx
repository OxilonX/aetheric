//local comps imports
import SkeletonGrid from "@/components/utilityComponents/SkeletonGrid";
import ProductCard from "./ProductCard";
export default function ProductGrid({ products, loading, selectedCat }) {
  if (loading) return <SkeletonGrid />;

  return (
    <div className="grid grid-cols-3  gap-6">
      {products.map((product) => {
        if (product.category === selectedCat)
          return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
