import {  CategoryStoreSchema,  ProductSchema, ProductStoreSchema, } from '@/validations/schemas';
import { create } from 'zustand'
import {z} from 'zod'

export type Product = z.infer<typeof ProductSchema>;
type CategoryStore = z.infer<typeof CategoryStoreSchema>;
type ProductStore = z.infer<typeof ProductStoreSchema>;



export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [
    { id: 'cat1', name: 'Shoes' },
    { id: 'cat2', name: 'T-shirt' },
    // Add more categories here
  ],
  addCategory: (name: string) => set((state) => ({
    categories: [...state.categories, { id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, name }]
  })),
  removeCategory: (id: string) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id)
  })),
}));

export const useProductStore = create<ProductStore>((set) => ({
  products:[
    {
      name: "Air Force",
      category: "Shoes",
      brand: "Nike",
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2fe4f8a0-a435-4fdf-8b69-d63aa63f1f7b/custom-nike-air-force-1-mid.png",
      variants: [
        {
          name: "Size",
          values: ['M', 'L']
        },
        {
          name: "Color",
          values: ['Black', 'Red']
        }
      ],
      combinations: {
        "a": {
          name: "M/Black",
          sku: "ABC12",
          quantity: 4,
          inStock: false
        },
        "b": {
          name: "L/Red",
          sku: "ABC12",
          quantity: null,
          inStock: true
        },
      },
      priceInr: 500,
      discount: {
        method: "pct",
        value: 12
      }
    }
  ],
  addProduct: (product: Product) => set((state) => ({
    products: [...state.products, product]
  })),
  removeProduct: (id: string) => set((state) => ({
    products: state.products.filter((product) => product.name!== id)
  }))
}))

