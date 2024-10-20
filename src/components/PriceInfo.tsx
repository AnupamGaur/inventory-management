import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Controller, useFormContext } from 'react-hook-form';


const PriceInfoComponent: React.FC = () => {

  const { control, formState: { errors } } = useFormContext();
  

  return (

          
      <div className="space-y-4">
        <div>
          <Label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 top-[2px] pl-2 flex items-center ">
              ₹
            </span>
            <Controller
            name="priceInr"
            control={control}
            rules={{ required: 'Price is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id="price"
                type="number"
                min="0"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className='pl-6'
              />
            )}
          />
                    {errors.priceInr && (
            <p className="text-red-500 text-sm absolute">{errors.priceInr.message as string}</p>
          )}
          </div>
        </div>

        <div>
          <Label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
            Discount
          </Label>
          <div className="flex items-center space-x-2">
          <Controller
              name="discount.value"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  placeholder="0"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="flex-grow"
                />
              )}
            />
            <Controller
            name='discount.method'
            control={control}
            render={({field}) => (
              <div className='border-[#E6EEF2] border rounded-md '>
              <ToggleGroup type="single" onValueChange={field.onChange} defaultValue={field.value}
              className="flex" >
                <div className="flex items-center">
              <ToggleGroupItem value="pct" aria-label="Toggle percentage" className='rounded-r-none'>
                %
              </ToggleGroupItem>
              <ToggleGroupItem value="flat" aria-label="Toggle fixed amount" className='rounded-l-none'>
                $
              </ToggleGroupItem>
              </div>
            </ToggleGroup>
              </div>
            )}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">{errors.discount.message as string}</p>
            )}
          </div>
        </div>
      </div>

  );
};

export default PriceInfoComponent;

