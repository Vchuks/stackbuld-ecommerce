"use client";

import Link from "next/link";
import { useData, ProductType } from "./hooks/useData";
import { useEffect } from "react";
import useProductStore, { numFor } from "@/stores/useProductStore";
import { Package, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";

const Home = () => {
  const { allProducts, setAllProducts } = useProductStore();
  const { data, isLoading, isError, error } = useData();
  const { getTotalItems } = useCartStore();

  // Update store when fresh data arrives
  useEffect(() => {
    if (data?.products) {
      setAllProducts(data);
    }
  }, [data, setAllProducts]);

  // Show loading only if we have no cached data
  if (isLoading && !allProducts) return <div className="text-3xl text-center text-gray-200 pt-4">Loading...</div>;

  // Show error only if we have no cached data to fall back to
  if (isError && !allProducts) {
    return <div className="text-gray-200">Error: {error?.message || "Something went wrong"}</div>;
  }

  // Use fresh data if available, otherwise use cached data
  const displayProducts = data?.products || allProducts?.products || [];

  if (!displayProducts.length) return <div className="text-gray-200">No products found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Products</h1>
        <Link
          href="/cart"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart ({getTotalItems()})
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product: ProductType) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Package className="h-12 w-12 mb-2" />
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {product.price && (
                  <p className="text-lg font-bold text-green-600 mb-2">
                    &#8358;{numFor.format(product.price) || 0}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
