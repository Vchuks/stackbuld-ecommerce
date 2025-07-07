"use client"

import { useQuery } from '@tanstack/react-query';

export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ApiResponse = {
  products: ProductType[];
};

const fetchProducts = async (): Promise<ApiResponse> => {
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useData = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};