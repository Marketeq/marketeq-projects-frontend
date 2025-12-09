"use client"
import { useControllableState, useUncontrolledState  } from '@/utils/hooks'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './dropdown-menu'
import { ChevronDown } from '@blend-metrics/icons'
import { Network } from '../icons/network'
import { Network1 } from '../icons/network-1'
import { Network2 } from '../icons/network-2'
import { Network3 } from '../icons/network-3'
import { Network4 } from '../icons/network-4'

export default function Dropdown ({
  onValueChange,
  value,
  placeholder,
  defaultValue,
}: {
  onValueChange?: (value: string) => void
  value?: string
  placeholder?: string
  defaultValue?: string
})  {
  const [state, setState] = useControllableState({
    onChange: onValueChange,
    value,
    defaultValue,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group bg-white data-[state=open]:bg-gray-100 hover:bg-gray-100 focus-visible:outline-none px-2 py-[5px] border border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed hover:border-gray-300 hover:border-dashed border-solid rounded-[5px] inline-flex items-center gap-x-1.5">
        <span className="text-xs leading-[18px] font-medium text-gray-700">
          {state ? state : placeholder}
        </span>
        <ChevronDown className="group-data-[state=open]:inline-block hidden size-[18px] shrink-0 text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-max">
        <DropdownMenuRadioGroup value={value} onValueChange={setState}>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Student"
          >
            <Network />
            Student (0 - 2 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Junior"
          >
            <Network1 />
            Junior (2 - 3 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Mediator"
          >
            <Network2 />
            Medior (3 - 5 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Senior"
          >
            <Network3 />
            Senior (5 - 10 years)
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Guru"
          >
            <Network4 />
            Guru (10+ years)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}