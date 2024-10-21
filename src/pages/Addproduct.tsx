import FormCard from '@/components/FormCard'
import ProgressIndicator from '@/components/ProgressIndicator'
import { useState } from 'react'
import Variants from '@/components/Variants'
import Combinations from '@/components/Combinations'
import Description from '@/components/Description'
import PriceInfo from '@/components/PriceInfo'
import { useForm, FormProvider} from "react-hook-form"
import { Product, useProductStore } from '@/store/products'
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from '@/validations/schemas'
import { Link, useNavigate } from 'react-router-dom'


const Addproduct = () => {
  const navigate = useNavigate()
  const {  addProduct } = useProductStore()
  const [step, setStep] = useState<number>(1)

  const methods = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      image: "",
      variants: [
      ],
      combinations: {
      },
      priceInr: 0,
      discount: {
        method: "flat",
        value: 0
      }
    }
  })

  const onSubmit = (data: Product) => {
    addProduct(data)
    alert(JSON.stringify(data))
    navigate('/products')
  }
  const fieldsToValidate = (currstep: number) => {
    let fieldsToValidate: (keyof Product)[] = [];
    switch (currstep) {
      case 1:
        fieldsToValidate = ['name', 'category', 'brand', 'image'];
        break;
      case 2:
        fieldsToValidate = ['variants'];
        break;
      case 3:
        fieldsToValidate = ['combinations'];
        break;
      case 4:
        fieldsToValidate = ['priceInr', 'discount'];
        break;
    }
    return fieldsToValidate
  }

  const isLastStep = step === 4
  const buttonText = isLastStep ? "Submit" : "Next"

  const handleButtonClick = async () => {
    if (isLastStep) {
      methods.handleSubmit(onSubmit)()
    } else {
      const result = await methods.trigger(fieldsToValidate(step))
      if (result) {
        setStep(prevStep => prevStep + 1)
      }
    }
  }
  const handleStepClick = async (clickedStep: number) => {
    for(let i=1; i<clickedStep; i++) {
      const result = await methods.trigger(fieldsToValidate(i));
      if (!result) {
        return;
      }
    }
    setStep(clickedStep)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='p-4'>
          <div className='flex flex-row justify-between'>
            <h1 className="text-xl mb-4 font-black">Add Product</h1>
            <div>
              <Link to="/products">
                <button className="px-6 bg-gray-200 text-[#1F8CD0] rounded font-bold h-10 hover:brightness-95 mr-4 w-40" type='button'>Cancel</button></Link>
              <button className="px-6 bg-[#1F8CD0] text-white rounded font-bold h-10 hover:brightness-95 w-40" type="button" onClick={handleButtonClick}>{buttonText}</button>
            </div>
          </div>
          <ProgressIndicator step={step} onStepClick={handleStepClick}></ProgressIndicator>
          <div>
            <FormCard>
              {(step == 1) &&
                <div><div className='font-black text-lg mb-5'>
                  Description
                </div>
                  <Description></Description>

                </div>
              }
              {/* Variants Form */}
              {(step == 2) && <div><div className='font-black text-lg mb-5'>
                Variants
              </div>
                <Variants></Variants>

              </div>}
              {(step == 3) && <div>
                <div className='font-black text-lg mb-5'>
                  Combinations
                </div>
                <Combinations variants={methods.watch('variants')} ></Combinations>
              </div>}
              {(step == 4) && <div>
                <div className='font-black text-lg mb-5'>
                  PriceInfo
                </div>
                <PriceInfo></PriceInfo>
              </div>}
              {(step === 5) && <Link to='/products'>click here</Link>}
            </FormCard>
          </div>
        </div>
      </form>
    </FormProvider>

  )
}

export default Addproduct