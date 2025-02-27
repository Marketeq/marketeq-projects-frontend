import { useDeferredValue, useState } from "react"
import { ChevronDown, SearchMd } from "@blend-metrics/icons"
import { Usflag } from "@blend-metrics/icons/flags"
import { Meta } from "@storybook/react"
import axios from "axios"
import { useAsync } from "react-use"
import {
  Input,
  InputGroup,
  InputRightElement,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ScrollBar,
} from "@/components/ui"

const meta: Meta = {
  title: "Countires Popover",
}

export default meta

const instance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
})

const getCountries = async <TData,>(url: string) => {
  const { data } = await instance.get<TData>(url)

  return data
}

export interface Country {
  flags: Flags
  name: Name
}

export interface Flags {
  png: string
  svg: string
  alt: string
}

export interface Name {
  common: string
  official: string
  nativeName: { [key: string]: NativeName }
}

export interface NativeName {
  official: string
  common: string
}

export const Default = () => {
  const [inputValue, setInputValue] = useState("")
  const deferredValue = useDeferredValue(inputValue)

  const state = useAsync(async () => {
    let results: Country[]
    if (deferredValue) {
      results = await getCountries<Country[]>(
        `/name/${deferredValue}?fields=name,flags`
      )
    } else {
      results = await getCountries<Country[]>("/all?fields=name,flags")
    }
    return results
  }, [deferredValue])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-gray-100 focus-visible:outline-none pr-2 p-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
          <span className="inline-flex items-center justify-center size-[18px] shrink-0 rounded-full overflow-hidden">
            <Usflag className="size-[18px]" />
          </span>
          <span className="text-xs leading-[18px] font-medium text-gray-700">
            USA
          </span>
          <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="border w-[165px] rounded-[4px] bg-white border-gray-200 shadow-[0px_12px_16px_-4px_rgba(16,24,40,.08)]">
        <Label>
          <InputGroup>
            <Input
              className="border-x-0 shadow-none border-t-0 border-b pl-3 text-sm focus:border-gray-200 placeholder:text-gray-500 h-9 border-gray-200 rounded-b-none rounded-t-[4px] focus:ring-0"
              placeholder="Search"
              aria-label="Search"
              onChange={onChange}
            />
            <InputRightElement>
              <SearchMd className="size-4 text-gray-400" />
            </InputRightElement>
          </InputGroup>
        </Label>

        <ScrollArea
          viewportClassName="max-h-[214px]"
          scrollBar={<ScrollBar className="w-4 p-1" />}
        >
          <div className="pt-1 w-[165px]">
            <div className="space-y-1">
              {state.value?.map(({ flags, name }, index) => (
                <button
                  className="focus-visible:outline-none hover:bg-gray-50 w-full px-3 py-2.5 flex items-center gap-x-2 text-[13px] leading-[13.3px] text-gray-400 hover:text-gray-900 font-medium"
                  key={index}
                >
                  <img
                    alt={name.common}
                    src={flags.png}
                    className="size-[18px] shrink-0 object-contain"
                  />
                  <span className="block truncate">{name.common}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
