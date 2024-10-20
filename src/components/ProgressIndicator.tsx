import React from 'react';

interface ProgressIndicatorprops {
  step: number;
  onStepClick: (step: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorprops> = ({step,onStepClick}) => {
  const steps = [
    { number: 1, label: 'Description'},
    { number: 2, label: 'Variants' },
    { number: 3, label: 'Combinations'},
    { number: 4, label: 'Price info'},
  ];

  return (
    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-[#808080] bg-white  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {steps.map((eachstep, index) => (
        <li key={eachstep.number} className={`flex items-center font-bold `}>
          <div className={`cursor-pointer ${eachstep.number <= step ? 'bg-[#DAEDF9] px-3 rounded-lg py-0.5 text-[#1F8CD0]' : ''}`}
          onClick={() => onStepClick(eachstep.number)}>{eachstep.label}</div>
          {index < steps.length - 1 && (
            <svg className="w-6 h-6 ms-2 sm:ms-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path d="M9.293 6.293L15.586 12l-6.293 6.293 1.414 1.414L18.414 12 10.707 4.293 9.293 6.293z" fill="#808080"></path>
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default ProgressIndicator;