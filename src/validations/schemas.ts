import {z} from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const VariantSchema = z.object({
  name: z.string().min(1,"Option can't be empty"),
  values: z.array(z.string()).min(1,"Values can't be empty")
});

export const CombinationSchema = z.object({
  name: z.string(),
  sku: z.string().trim().min(1,"Empty SKU"),
  quantity: z.number().nullable(),
  inStock: z.boolean()
});

export const DiscountSchema = z.object({
  method: z.enum(['pct', 'flat']),
  value: z.number()
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  image: z.string(),
  variants: z.array(VariantSchema).min(1, "Atleast 1 variant is required"),
  combinations: z.record(z.string(), CombinationSchema).refine(
    (combinations) => Object.keys(combinations).length > 0,
    {
      message: "At least one combination is required",
      path: ["combinations"]
    }
  ),
  priceInr: z.number(),
  discount: DiscountSchema
}).refine(
  (data) => {
    const skus = new Set();
    for (const combination of Object.values(data.combinations)) {
      const empty:Boolean = combination.sku.trim() === "";
      if(empty){
        return true;
      }
      if (skus.has(combination.sku)) {
        return false;
      }
      skus.add(combination.sku);
    }
    return true;
  },
  {
    message: "All SKUs must be unique",
    path: ["combinations"]
  }
);

export const CategoryStoreSchema = z.object({
  categories: z.array(categorySchema),
  addCategory: z.function()
    .args(z.string())
    .returns(z.void()),
  removeCategory: z.function()
    .args(z.string())
    .returns(z.void()),
});

export const ProductStoreSchema = z.object({
  products: z.array(ProductSchema),
  addProduct: z.function()
    .args(ProductSchema)
    .returns(z.void()),
  removeProduct: z.function()
    .args(z.string())
    .returns(z.void()),
});