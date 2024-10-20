import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {useCategoryStore, useProductStore } from '@/store/products'
import { Link } from 'react-router-dom'

const Products = () => {
  
  const [open, setOpen] = useState(false);
  const [newCategory,setNewCategory] = useState<string>('');
  const {categories,addCategory} = useCategoryStore()
  const {products} = useProductStore()
  return (
    <>
      <div className="flex-1 p-4">
        {/* topbar */}
        <div className='flex flex-row justify-between'>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <div className="flex gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild >
                <button className="px-6 bg-gray-200 text-[#1F8CD0] rounded font-bold h-10 hover:brightness-95 w-40" type='button'>Add Category</button>
              </DialogTrigger>
              <DialogContent className="w-2/3 ">
                <DialogHeader>
                  <DialogTitle>Add category</DialogTitle>

                </DialogHeader>
                <div className="py-4">

                  <DialogDescription>
                    Category name *
                  </DialogDescription>
                  <Input
                    id="name"
                    placeholder='Add new category'
                    className="col-span-full"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button className='bg-[#E1E7EB] w-28 font-bold text-[#1F8CD0] hover:brightness-95' onClick={() => setOpen(false)}>Cancel</Button>
                  <Button className='bg-[#1F8CD0] w-28 font-bold hover:brightness-95'  onClick={async () => {
                    // adding category here
                    await addCategory(newCategory)
                    setOpen(false)
                  }
                  }>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Link to="/addproduct">
            <Button className="px-6 bg-[#1F8CD0] text-white rounded font-bold h-10 hover:brightness-95 w-40" >Add Product</Button>
            </Link>
          </div>
        </div>
        {/* grid */}

        <div className="grid grid-cols-3 gap-4 mt-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-[#F8F8F8] p-4 rounded h-[500px] overflow-y-auto">
              <h2 className="font-bold mb-2">{category.name}</h2>
               {products.map((product, itemIndex) => (
               category.name === product.category && <div key={itemIndex} className="mb-2">

                  <div className=" bg-white border border-gray-200 rounded-lg shadow">
                    <div className="flex p-2 gap-4">
                      <div>
                        <img className="size-24 rounded " src={product.image} alt="Product's Image" />
                      </div>
                      <div className='flex flex-col '>
                        <h5 className="text-base font-medium text-gray-900 dark:text-white mb-1">{product.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Rs {product.priceInr}</span>
                        <div className='bg-[#ECF7FF] px-3  rounded-md text-[#1F8CD0] font-semibold w-fit'>{product.brand}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products