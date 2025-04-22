import { Eye } from "@blend-metrics/icons"
import { GoogleDefault, LinkedInDefault } from "@blend-metrics/icons/social"
import { Meta } from "@storybook/react"
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  InputGroup,
  InputRightElement,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Textarea,
} from "@/components/ui"

const meta: Meta = {
  title: "Ask Question",
}

export default meta

export const SignUp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[408px]">
        <h1 className="text-lg leading-9 font-semibold text-dark-blue-400">
          Create your free account
        </h1>

        <form>
          <div className="space-y-1.5 mt-5">
            <Label size="sm">Description</Label>
            <Textarea placeholder="Enter a description..." />
          </div>

          <div className="space-y-1.5 mt-5">
            <Label size="sm">Description</Label>
            <Listbox>
              <ListboxButton placeholder="Select question category" />
              <ListboxOptions>
                {[
                  { name: "Wade Cooper" },
                  { name: "Arlene Mccoy" },
                  { name: "Devon Webb" },
                  { name: "Tom Cook" },
                  { name: "Tanya Fox" },
                  { name: "Hellen Schmidt" },
                  { name: "Hellen Walker" },
                  { name: "Hellen Waller" },
                ].map((person) => (
                  <ListboxOption key={person.name} value={person.name}>
                    {person.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-3">
            <Button className="w-full" variant="outlined" visual="gray">
              Cancel
            </Button>
            <Button className="w-full">Create my account</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
