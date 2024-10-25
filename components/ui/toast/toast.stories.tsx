import { Meta } from "@storybook/react"
import { Button } from "../button"
import { Toaster } from "./toaster"
import { useToast } from "./use-toast"

const meta: Meta = {
  title: "Marketeq-Projects/Toast",
}

export default meta

export const Default = () => {
  const { toast } = useToast()
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "“rightflair2046” has been saved to “Customer Service”",
          })
        }
      >
        Toast
      </Button>
      <Toaster />
    </>
  )
}
