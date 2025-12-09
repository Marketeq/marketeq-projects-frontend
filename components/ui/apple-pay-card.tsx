
import React from "react"
import RmDialog from "./rm-dialog"
import { IconButton } from "./icon-button"
import { Trash03 } from "@blend-metrics/icons"


const ApplePay1 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={33}
    height={15}
    viewBox="0 0 33 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.73 3.185c.604.052 1.209-.311 1.586-.772.372-.473.617-1.108.554-1.757-.535.026-1.196.363-1.573.837-.347.408-.643 1.07-.567 1.692m7.19 8.35V1.429h3.682c1.901 0 3.23 1.348 3.23 3.32 0 1.97-1.354 3.332-3.28 3.332h-2.11v3.456zM6.863 3.309c-.532-.031-1.018.165-1.41.324-.253.102-.467.188-.63.188-.182 0-.405-.09-.655-.193-.327-.134-.702-.287-1.095-.28-.9.013-1.737.538-2.197 1.374-.944 1.673-.245 4.15.668 5.512.447.674.982 1.413 1.687 1.387.31-.012.533-.11.764-.21.266-.117.542-.237.973-.237.416 0 .68.117.934.23.241.107.473.21.816.204.73-.013 1.19-.674 1.637-1.349a6 6 0 0 0 .726-1.537l.004-.012-.015-.01c-.161-.076-1.394-.657-1.405-2.215-.012-1.308.977-1.97 1.133-2.075l.019-.013c-.63-.96-1.612-1.063-1.952-1.089m14.75 8.306c.957 0 1.844-.5 2.247-1.29h.032v1.212h1.41V6.504c0-1.458-1.133-2.398-2.877-2.398-1.618 0-2.814.953-2.858 2.262h1.372c.114-.622.674-1.03 1.442-1.03.932 0 1.454.447 1.454 1.27v.558l-1.901.116c-1.769.11-2.726.856-2.726 2.153 0 1.31.989 2.178 2.405 2.178m.409-1.2c-.812 0-1.328-.402-1.328-1.018 0-.635.497-1.005 1.447-1.063l1.694-.11v.57c0 .947-.78 1.621-1.813 1.621m7.957 1.517c-.61 1.77-1.31 2.354-2.795 2.354-.113 0-.49-.013-.579-.04v-1.212c.095.013.327.026.447.026.674 0 1.051-.291 1.284-1.05l.139-.447-2.581-7.36h1.592l1.795 5.972h.031l1.794-5.971h1.549zM13.443 2.75H15.2c1.322 0 2.077.726 2.077 2.003s-.755 2.01-2.084 2.01h-1.75z"
      fill="#000"
    />
  </svg>
)

export default function ApplePayCard({
  onRemove,
  amountToBePaid,
}: {
  onRemove?: () => void
  amountToBePaid: string
}) {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className="rounded-lg flex-auto bg-white border border-gray-200 p-[15px] flex items-center justify-between shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
        <div className="flex items-center gap-x-3">
          <div className="h-[30px] w-[45px] border border-black rounded-md inline-flex justify-center items-center">
            <ApplePay1 />
          </div>

          <div className="inline-flex flex-col gap-y-1">
            <div className="inline-flex items-center gap-x-2">
              <span className="inline-block text-sm text-dark-blue-400">
                Apple Pay
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <RmDialog
            onRemove={onRemove}
            title="Remove Payment Method?"
            description="Are you sure you want to remove American Express Credit ****1234 from your payment methods?"
            trigger={({ isOpen, setIsOpen }) => (
              <IconButton
                className="rounded-full opacity-50 hover:opacity-100 hover:bg-error-100 hover:text-error-500"
                variant="ghost"
                visual="gray"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Trash03 className="size-[18px]" />
              </IconButton>
            )}
          />
        </div>
      </div>

      <div className="bg-white border flex flex-col justify-center h-[67.5px] border-gray-200 rounded-lg py-3 px-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,.05)]">
        <span className="text-xs block font-light leading-none text-gray-400">
          Amount
        </span>
        <h3 className="text-base font-medium text-dark-blue-400">
          {amountToBePaid}
        </h3>
      </div>
    </div>
  )
}


const GooglePayCard = ({
  onRemove,
  amountToBePaid,
}: {
  onRemove?: () => void
  amountToBePaid: string
}) => {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className="rounded-lg flex-auto bg-white border border-gray-200 p-[15px] flex items-center justify-between shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
        <div className="flex items-center gap-x-3">
          <div className="h-[30px] w-[45px] border border-black rounded-md inline-flex justify-center items-center">
            <GPay1 />
          </div>

          <div className="inline-flex flex-col gap-y-1">
            <div className="inline-flex items-center gap-x-2">
              <span className="inline-block text-sm text-dark-blue-400">
                Google Pay
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <RmDialog
            onRemove={onRemove}
            title="Remove Payment Method?"
            description="Are you sure you want to remove American Express Credit ****1234 from your payment methods?"
            trigger={({ isOpen, setIsOpen }) => (
              <IconButton
                className="rounded-full opacity-50 hover:opacity-100 hover:bg-error-100 hover:text-error-500"
                variant="ghost"
                visual="gray"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Trash03 className="size-[18px]" />
              </IconButton>
            )}
          />
        </div>
      </div>

      <div className="bg-white border flex flex-col justify-center h-[67.5px] border-gray-200 rounded-lg py-3 px-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,.05)]">
        <span className="text-xs block font-light leading-none text-gray-400">
          Amount
        </span>
        <h3 className="text-base font-medium text-dark-blue-400">
          {amountToBePaid}
        </h3>
      </div>
    </div>
  )
}

export { GooglePayCard }
