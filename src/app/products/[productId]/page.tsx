"use client";

import { useData, ProductType } from "@/app/hooks/useData";
import { useEffect, useState } from "react";
import useProductStore, { numFor } from "@/stores/useProductStore";
import Link from "next/link";
import { Check, Minus, Package, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";

const EachProduct = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { data, isLoading, isError, error } = useData();
  const { allProducts, setAllProducts } = useProductStore();
  const [productId, setProductId] = useState<string>("");
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const { addToCart, items, getTotalItems } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (data?.products) {
      setAllProducts(data);
    }
  }, [data, setAllProducts]);

  // Find product from available data
  useEffect(() => {
    if (productId) {
      const availableProducts = data?.products || allProducts?.products || [];
      const foundProduct = availableProducts.find(
        (each: ProductType) => each.id === productId
      );
      setProduct(foundProduct);
    }
  }, [productId, data?.products, allProducts?.products]);

  if (!productId || (isLoading && !allProducts)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-200">Loading...</div>
      </div>
    );
  }

  if (isError && !allProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          Error: {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-200">The product could not be found.</p>
        </div>
      </div>
    );
  }

  const cartItem = items.find((item) => item.product.id === productId);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Products
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart (<span className="font-bold">{getTotalItems()}</span>)
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Package className="h-12 w-12 mb-2" />
                  <span className="text-sm">No Image</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mt-2">
                  {product.name}
                </h1>
              </div>

              {product.price && (
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    &#8358;{numFor.format(product.price)}
                  </p>
                </div>
              )}

              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer justify-center gap-2 font-semibold"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                {cartQuantity > 0 && (
                  <div className="text-center text-sm text-green-600 flex gap-2 items-center justify-center">
                    <Check className="w-4" />
                    <span>{cartQuantity} item(s) in cart</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProduct;
