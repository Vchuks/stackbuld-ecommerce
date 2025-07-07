"use client";

import { useCartStore } from "@/stores/useCartStore";
import { numFor } from "@/stores/useProductStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems } = useCartStore();

  // Calculate totals
  const subtotal = getTotalPrice();

  const handleOrder = () => {
      router.push("/products/order-product");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 sticky top-8 mt-20 w-4/5 m-auto">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image src={item.product.image} alt="" width={100} height={100}/>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.product.name}</h4>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium">
              ₦{numFor.format(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({getTotalItems()} items)</span>
          <span>₦{numFor.format(subtotal)}</span>
        </div>
        
        
        <div className="border-t pt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{numFor.format(subtotal)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleOrder}
          className="md:w-2/5 py-3 px-3 rounded-xl bg-blue-600 font-bold text-white"
        >
          Place your Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
