import {  Trash2, X } from 'lucide-react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


interface VariantField {
  name: string;
  values: string[];
}

interface FormValues {
  variants: VariantField[];
}

const Variants = () => {
  const { control, formState: { errors } } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  return (
    <div className="space-y-4">
      
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className='w-1/3 relative'>
            <Controller
              name={`variants.${index}.name`}
              control={control}
              rules={{ required: "Option can't be empty" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Input 
                    {...field} 
                    placeholder="Option" 
                    className={errors.variants?.[index]?.name ? "border-red-500" : ""}
                  />
                  {errors.variants?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1 absolute left-2 top-8">{errors.variants[index].name.message}</p>
                  )}
                </div>
              )}
            />
            </div>
            
            <div className='flex-1 relative'>
            <Controller
              name={`variants.${index}.values`}
              control={control}
              rules={{ required: "Values can't be empty" }}
              render={({ field }) => (
                <div className="flex-1">
                  <div className="flex items-center border rounded-md">
                    {field.value.map((value, valueIndex) => (
                      <div key={valueIndex} className="flex items-center bg-gray-100 rounded px-2 py-1 ml-1">
                        <span>{value}</span>
                        <X
                          className="ml-1 h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newValues = [...field.value];
                            newValues.splice(valueIndex, 1);
                            field.onChange(newValues);
                          }}
                        />
                      </div>
                    ))}
                    <Input
                      className="border-none focus:ring-0"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const newValue = e.currentTarget.value.trim();
                          if (newValue && !field.value.includes(newValue)) {
                            field.onChange([...field.value, newValue]);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                  {errors.variants?.[index]?.values && (
                    <p className="text-red-500 text-sm mt-1 absolute left-2 top-8">{errors.variants[index].values.message}</p>
                  )}
                </div>
              )}
            />
            </div>

            <div>
            <Trash2
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => remove(index)}
            />
            </div>
            </div>
        </div>
      ))}
      <div className='flex items-center justify-between'>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ name: '', values: [] })}
        className="mt-2 border-none text-[#1F8CD0] shadow-none font-bold hover:bg-transparent hover:text-[#1F8CD0]"
      >
        + Add Option
      </Button>
      <div>
        {errors.variants?.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.variants.message}
          </p>
        )}
        </div>
        </div>
    </div>
  );
};

export default Variants