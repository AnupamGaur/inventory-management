import  { useState } from 'react'
import { Button } from './ui/button'
import {  ImageUp } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from './ui/input'
import { Product, useCategoryStore } from '@/store/products'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent,  DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export const Description = () => {
  const { categories } = useCategoryStore()
  const [open, setOpen] = useState(false);
  const { control, formState: { errors } } = useFormContext<Product>()
  return (
    <>
      <div>


        <label className="block mb-1 text-sm font-[400] text-black ">Product Name *</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) =>
            <>
              <Input id="productName" {...field} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </>
          }
        />
      </div>
      {/* Category Input */}

      <div className="my-4">
        <Label htmlFor="category" className='block mb-1 text-sm font-[400] text-black'>Category *</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) =>
                  <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                )}
                {/* <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                <SelectItem value="Mhenga">Mhenga</SelectItem> */}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <label className="block mb-1 text-sm font-medium text-black">Brand *</label>
      <Controller
        name="brand"
        control={control}
        render={({ field }) =>
          <>
            <Input id="productName" {...field} />
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
          </>}
      />
      {/* Image Upload */}
      <div className='mt-4'>
        {/* <Dialog open={open} onOpenChange={setOpen}> */}
        <Dialog open={open} onOpenChange={setOpen}> 
          <DialogTrigger asChild >
            <button type='button'>
              <div className='flex justify-between items-center rounded-md px-3 py-1 border-2 border-[#1F8CD0]'>

                <ImageUp className='w-4 h-4 text-[#1F8CD0]' />
                <div className='text-[#1F8CD0] text-sm font-black ml-2 '>Upload Image</div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="w-2/3 ">
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>

            </DialogHeader>
            <div className="py-4">
              <Controller
                name="image"
                control={control}
                render={({ field }) =>
                  <>
                    <Input id="productName" {...field} />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                  </>}
              />
            </div>
            <DialogFooter>
              <Button type="button" className='bg-[#1F8CD0] w-28 font-bold hover:brightness-95' onClick={() => {
                setOpen(false) 
              }
              }>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default Description