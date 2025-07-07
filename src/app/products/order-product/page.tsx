"use client";

import { useCartStore } from "@/stores/useCartStore";
import { numFor } from "@/stores/useProductStore";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import {  useState } from "react";

const OrderProduct = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [random, setRandom] = useState(0);

  useEffect(() => {
  const a = Math.floor(Math.random() * 20000);
  setRandom(a)
  }, []);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold  mb-4">No Items to Checkout</h1>
          <p className="text-gray-200 mb-8">
            Your cart is empty. Please add some items before proceeding to
            checkout.
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
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-200 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-200 mb-8">
          Thank you for your order. You will receive an email confirmation
          shortly.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="text-left space-y-2">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-bold">{random}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Total:</span>
              <span className="font-bold">
                &#8358;{numFor.format(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            router.push("/");
            setTimeout(() => {
              clearCart();
            }, 500);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderProduct;
