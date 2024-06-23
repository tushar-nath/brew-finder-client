// api.ts
export interface Product {
  name: string;
  price: number;
  category: string;
  _id: string;
}

export interface CoffeeShop {
  _id: string;
  name: string;
  rating: number;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  products: Product[];
}

export async function fetchCoffeeShops(): Promise<CoffeeShop[]> {
  const response = await fetch("http://localhost:8000/api/coffee-shops");
  if (!response.ok) {
    throw new Error("Failed to fetch coffee shops");
  }
  return response.json();
}

export async function fetchCoffeeShop(shopId: string): Promise<CoffeeShop> {
  const response = await fetch(
    `http://localhost:8000/api/coffee-shops/${shopId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coffee shop");
  }
  return response.json();
}
