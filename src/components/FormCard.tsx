
import { ComponentPropsWithRef } from 'react'

const FormCard = (props:ComponentPropsWithRef<'div'>) => {
  const { children } = props;
  return (
    <div className='shadow-md w-3/4 p-4 rounded-md'>
      {children}
    </div>
  )
}

export default FormCard