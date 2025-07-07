import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ApiResponse } from "@/app/hooks/useData";

type ProductStore = {
  allProducts: ApiResponse | null;
  setAllProducts: (products: ApiResponse) => void;
  clearProducts: () => void;
}
export const numFor = Intl.NumberFormat("en-US");

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      allProducts: null,
      setAllProducts: (products) => set({ allProducts: products }),
      clearProducts: () => set({ allProducts: null }),
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore