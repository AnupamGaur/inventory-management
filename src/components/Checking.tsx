import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PriceInfoProps {}

const PriceInfo: React.FC<PriceInfoProps> = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Price Info</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="price">Price *</Label>
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
                placeholder="₹ 0"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          {errors.priceInr && (
            <p className="text-red-500 text-sm mt-1">{errors.priceInr.message as string}</p>
          )}
        </div>

        <div>
          <Label>Discount</Label>
          <div className="flex space-x-2">
            <Controller
              name="discount.value"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="0"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="flex-grow"
                />
              )}
            />
            <Controller
              name="discount.method"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pct" id="pct" />
                    <Label htmlFor="pct">%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flat" id="flat" />
                    <Label htmlFor="flat">$</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;