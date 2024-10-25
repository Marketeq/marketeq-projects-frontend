import * as React from "react"
import { SearchMd } from "@blend-metrics/icons"
import { Meta } from "@storybook/react"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxTrigger,
  ScaleOutIn,
  ScrollArea,
} from "@/components/ui"

const meta: Meta = {
  title: "Marketeq-Projects/Combobox",
}

export default meta

export const DefaultSm = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton>
          <SearchMd className="h-4 w-4" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const DefaultSmRightIcon = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          className="pl-3 pr-[34px]"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton align="right">
          <SearchMd className="h-4 w-4" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const DefaultLg = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox className="w-[320px]" value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          size="lg"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton size="lg">
          <SearchMd className="h-5 w-5" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const DefaultLgRightIcon = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox className="w-[320px]" value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          className="pl-3.5 pr-[42px]"
          size="lg"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton size="lg" align="right">
          <SearchMd />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const GraySm = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          visual="gray"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton>
          <SearchMd className="h-4 w-4" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const GraySmRightIcon = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          visual="gray"
          className="pl-3 pr-[34px]"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton align="right">
          <SearchMd className="h-4 w-4" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const GrayLg = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox className="w-[320px]" value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          size="lg"
          visual="gray"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton size="lg">
          <SearchMd className="h-5 w-5" />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

export const GrayLgRightIcon = () => {
  const [users] = React.useState([
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Chris Torres" },
    { id: 8, name: "Max" },
    { id: 9, name: "David" },
    { id: 10, name: "Logan" },
    { id: 11, name: "Andrew" },
  ])
  const [selected, setSelected] = React.useState({})
  const [query, setQuery] = React.useState("")

  const filteredPeople =
    query === ""
      ? users
      : users.filter((user) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox className="w-[320px]" value={selected} onChange={setSelected}>
      <ComboboxTrigger>
        <ComboboxInput
          className="pl-3.5 pr-[42px]"
          size="lg"
          visual="gray"
          displayValue={(user: { id: number; name: string }) => user.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton size="lg" align="right">
          <SearchMd />
        </ComboboxButton>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={() => setQuery("")}>
        <ComboboxOptions>
          <ScrollArea className="h-[304px]">
            {filteredPeople.map((user) => (
              <ComboboxOption key={user.id} value={user}>
                {user.name}
              </ComboboxOption>
            ))}
          </ScrollArea>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}
