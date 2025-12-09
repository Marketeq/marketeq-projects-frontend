import React from 'react';
import { Lock } from "@blend-metrics/icons";
import { Logo3 } from "../icons";
import Step from './step';

export default function Navigation () {
  const steps = 
    [
      {
        label: 'Project Details',
        disabled: false,
      },
      {
        label: 'Payment Details',
        disabled: true,
      },
      {
        label: 'Review & Pay',
        disabled: true,
      },
    ]
  
  return (
    <div className="bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,.1)]">
      <div className="max-w-[1140px] h-[64px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Logo3 className="w-[128px] h-[18.81px] shrink-0" />

          <span className="inline-block h-[18px] w-px shrink-0 bg-gray-200" />

          <div className="inline-flex items-center gap-x-2">
            <Lock className="size-[18px] text-gray-500" />
            <span className="text-base font-semibold leading-none text-gray-500">
              Secure Checkout
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          {
            steps.map((step, index) => (
              <>
                <Step key={index} disabled={step.disabled} label={step.label} index={index}/>
                { index < steps.length - 1 && (
                  <span className="border-2 border-gray-300 border-dashed w-[35px] shrink-0" />
                ) }
              </>
            ))
          }
          {/* <Step label="Project Details"/>
          <span className="border-2 border-gray-300 border-dashed w-[35px] shrink-0" />
          <Step disabled label='Payment Details'/>
          <span className="border-2 border-gray-300 border-dashed w-[35px] shrink-0" />
          <Step disabled label="Review & Pay"/> */}
        </div>
      </div>
    </div>
  )
}