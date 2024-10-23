import React, {  useEffect } from 'react';
import { Controller,  useFormContext, useWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';



interface VariantField {
  name: string;
  values: string[];
}

interface CombinationField {
  name: string;
  sku: string;
  quantity: number | null;
  inStock: boolean;
}

interface FormValues {
  variants: VariantField[];
  combinations: Record<string, CombinationField>;
}

interface CombinationsProps {
  variants: VariantField[];
}

const Combinations: React.FC<CombinationsProps> = () => {
  const { control, setValue, getValues, formState: { errors }, trigger } = useFormContext<FormValues>();
  const watchedVariants = useWatch({ control, name: 'variants' });
  const watchedCombinations = useWatch({ control, name: 'combinations' });



  const generateCombinations = (variants: Array<{ name: string; values: string[] }>) => {
    const combinations: string[][] = [[]];
    for (const variant of variants) {
      const newCombinations: string[][] = [];
      for (const value of variant.values) {
        for (const combination of combinations) {
          newCombinations.push([...combination, value]);
        }
      }
      combinations.splice(0, combinations.length, ...newCombinations);
    }
    return combinations;
  };
  useEffect(() => {
    const combinations = generateCombinations(watchedVariants);
    const currentCombinations = getValues('combinations') || {};

    combinations.forEach((combination) => {
      const name = combination.join(' / ');
      const key = `combination_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      if (!Object.values(currentCombinations).some((comb) => comb.name === name)) {
        setValue(`combinations.${key}`, {
          name,
          sku: '',
          quantity: 0,
          inStock: false
        });
      }
    });


    const updatedCombinations = { ...currentCombinations };
    Object.entries(currentCombinations).forEach(([key, value]) => {
      if (!combinations.some(c => c.join(' / ') === value.name)) {
        delete updatedCombinations[key];
      }
    });
    setValue('combinations', updatedCombinations);

  }, [watchedVariants, setValue, getValues, trigger]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 font-normal ">
        <div></div>
        <div className='relative'>SKU *
        {errors.combinations?.message && (
        <p className="text-red-500 text-sm absolute -mt-1">{errors.combinations?.message as String}</p>
      )}
        </div>

        <div className='flex justify-center'>In stock</div>
        <div>Quantity</div>
      </div>
      {Object.entries(watchedCombinations).map(([key, combination]) => {
    
        return (
          <div key={key} className="grid grid-cols-4 my-4 gap-2 justify-center items-center">
            <div className='flex justify-center text-sm'>{combination.name}</div>
            <Controller
              name={`combinations.${key}.sku`}
              defaultValue=""
              render={({ field }) => (
                <div className='relative'>
                  <Input {...field} placeholder="SKU"  onChange={(e) => {
                    field.onChange(e);
                    trigger(['combinations']);
                  }} />
                  {errors.combinations?.[key]?.sku && (
                    <p className="text-red-500 text-sm absolute left-2 top-8">{errors.combinations[key].sku.message}</p>
                  )}
                </div>
              )}
            />
            <div className='flex justify-center'>
            <Controller
              name={`combinations.${key}.inStock`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            </div>
            <Controller
              name={`combinations.${key}.quantity`}
              control={control}
              defaultValue={0}

              render={({ field }) => (
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  placeholder="Quantity"
                  value={field.value ?? ''}
                  disabled={!combination.inStock}
                />
              )}
            />
          </div>
        );
      })}

    </div>
  );
};

export default Combinations;
