"use client";

import Link from "next/link";
import { useData, ProductType } from "../hooks/useData";
import { useEffect } from "react";
import useProductStore  from "@/stores/useProductStore";

const ProductsPage = () => {
  const { allProducts, setAllProducts } = useProductStore();
  const { data, isLoading, isError, error } = useData();

  // Update store when fresh data arrives
  useEffect(() => {
    if (data?.products) {
      setAllProducts(data);
    }
  }, [data, setAllProducts]);

  // Show loading only if we have no cached data
  if (isLoading && !allProducts) return <div>Loading...</div>;
  
  // Show error only if we have no cached data to fall back to
  if (isError && !allProducts) {
    return <div>Error: {error?.message || "Something went wrong"}</div>;
  }
  
  // Use fresh data if available, otherwise use cached data
  const displayProducts = data?.products || allProducts?.products || [];
  
  if (!displayProducts.length) return <div>No products found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {displayProducts.map((product: ProductType) => (
        <Link 
          href={`/products/${product.id}`} 
          key={product.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <span className="text-blue-600 hover:text-blue-800">
            {product.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ProductsPage;