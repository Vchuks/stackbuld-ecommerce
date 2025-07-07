"use client";

import { useCartStore } from "@/stores/useCartStore";
import { numFor } from "@/stores/useProductStore";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-200 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-200 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-lg md:text-3xl font-bold text-gray-200">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.product.id} className="p-6 grid grid-cols-3 md:flex items-center gap-4">
                
                <div className=" bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <Image src={item.product.image} alt="" width={100} height={50}
                  />
                </div>

                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.product.name}
                  </h3>
                
                  
                </div>

                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-12 text-center font-semibold">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                
                <div className="text-right">
                  {item.product.price && (
                    <p className="font-bold text-lg">
                      &#8358;{numFor.format(item.product.price * item.quantity)}
                    </p>
                  )}
                </div>

                
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                Total Items: {getTotalItems()}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                Total: &#8358;{numFor.format(getTotalPrice())}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <Link href="/checkout" className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;