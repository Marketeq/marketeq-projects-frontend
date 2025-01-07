import { UploadCloud, X } from "@blend-metrics/icons"
import { Image as ImageIcon } from "@blend-metrics/icons"
import { Meta } from "@storybook/react"
import { Button, CircularProgress, IconButton } from "@/components/ui"

const meta: Meta = {
  title: "File Attachments",
}

export default meta

export const Default = () => {
  return (
    <div className="relative max-w-[467px] shadow-xl p-4 bg-white rounded-xl">
      <h3 className="text-xs text-gray-900 leading-[14.52px] font-semibold">
        Upload Files
      </h3>

      <IconButton
        className="absolute rounded-full top-[3px] right-[3px] text-gray-800/50 hover:text-gray-900"
        visual="gray"
        variant="ghost"
      >
        <X className="size-4" />
      </IconButton>

      <div className="mt-[9px] border border-dashed rounded-lg p-6 border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center justify-center shrink-0 size-10 rounded-full border-[6px] bg-white border-gray-100">
            <UploadCloud className="size-5 text-gray-500" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-x-1 justify-center">
          <span className="text-xs leading-5 text-gray-600">
            Drag and drop or
          </span>
          <button className="text-xs leading-5 hover:underline font-semibold text-primary-500">
            Choose a File
          </button>
        </div>
      </div>

      <div className="mt-[9px] flex items-center justify-between">
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Supported formats: PDF, DOC, JPG, PNG
        </span>
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Maximum file size: 500mb
        </span>
      </div>

      <div className="mt-[120px] grid grid-cols-2 gap-x-3">
        <Button visual="gray" variant="outlined">
          Cancel
        </Button>
        <Button visual="primary" variant="filled">
          Send
        </Button>
      </div>
    </div>
  )
}

export const DefaultProgress = () => {
  return (
    <div className="relative max-w-[467px] shadow-xl p-4 bg-white rounded-xl">
      <h3 className="text-xs text-gray-900 leading-[14.52px] font-semibold">
        Upload Files
      </h3>

      <IconButton
        className="absolute rounded-full top-[3px] right-[3px] text-gray-800/50 hover:text-gray-900"
        visual="gray"
        variant="ghost"
      >
        <X className="size-4" />
      </IconButton>

      <div className="mt-[9px] border border-dashed rounded-lg p-6 border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center justify-center shrink-0 size-10 rounded-full border-[6px] bg-white border-gray-100">
            <UploadCloud className="size-5 text-gray-500" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-x-1 justify-center">
          <span className="text-xs leading-5 text-gray-600">
            Drag and drop or
          </span>
          <button className="text-xs leading-5 hover:underline font-semibold text-primary-500">
            Choose a File
          </button>
        </div>
      </div>

      <div className="mt-[9px] flex items-center justify-between">
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Supported formats: PDF, DOC, JPG, PNG
        </span>
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Maximum file size: 500mb
        </span>
      </div>

      <div className="mt-3">
        <div className="border border-gray-200 bg-white flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-x-2">
            <div className="size-8 rounded-full shrink-0 inline-flex items-center justify-center bg-dark-blue-50/10 bg-primary-25">
              <ImageIcon className="size-4 text-primary-500" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm leading-5 font-medium text-gray-700">
                Tech design requirements.png
              </h1>
              <span className="text-[10px] leading-5 text-gray-600">
                200 KB
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-x-2">
            <CircularProgress
              show={false}
              size={22}
              value={10}
              strokeWidth={3}
            />

            <span className="text-xs leading-[14px] font-medium text-gray-500">
              55%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[52px] grid grid-cols-2 gap-x-3">
        <Button visual="gray" variant="outlined">
          Cancel
        </Button>
        <Button visual="primary" variant="filled">
          Send
        </Button>
      </div>
    </div>
  )
}

export const DefaultFurtherProgress = () => {
  return (
    <div className="relative max-w-[467px] shadow-xl p-4 bg-white rounded-xl">
      <h3 className="text-xs text-gray-900 leading-[14.52px] font-semibold">
        Upload Files
      </h3>

      <IconButton
        className="absolute rounded-full top-[3px] right-[3px] text-gray-800/50 hover:text-gray-800"
        visual="gray"
        variant="ghost"
      >
        <X className="size-4" />
      </IconButton>

      <div className="mt-[9px] border border-dashed rounded-lg p-6 border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center justify-center shrink-0 size-10 rounded-full border-[6px] bg-white border-gray-100">
            <UploadCloud className="size-5 text-gray-500" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-x-1 justify-center">
          <span className="text-xs leading-5 text-gray-600">
            Drag and drop or
          </span>
          <button className="text-xs leading-5 hover:underline font-semibold text-primary-500">
            Choose a File
          </button>
        </div>
      </div>

      <div className="mt-[9px] flex items-center justify-between">
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Supported formats: PDF, DOC, JPG, PNG
        </span>
        <span className="text-[8px] text-gray-500 leading-[9.68px]">
          Maximum file size: 500mb
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-y-3">
        <div className="border border-gray-200 bg-white flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-x-2">
            <div className="size-8 rounded-full shrink-0 inline-flex items-center justify-center bg-dark-blue-50/10 bg-primary-25">
              <ImageIcon className="size-4 text-primary-500" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm leading-5 font-medium text-gray-700">
                Tech design requirements.png
              </h1>
              <span className="text-[10px] leading-5 text-gray-600">
                200 KB
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-x-2">
            <CircularProgress
              show={false}
              size={22}
              value={10}
              strokeWidth={3}
            />

            <span className="text-xs leading-[14px] font-medium text-gray-500">
              55%
            </span>
          </div>
        </div>
        <div className="border border-gray-200 bg-white flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-x-2">
            <div className="size-8 rounded-full shrink-0 inline-flex items-center justify-center bg-dark-blue-50/10 bg-primary-25">
              <ImageIcon className="size-4 text-primary-500" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm leading-5 font-medium text-gray-700">
                Tech design requirements.png
              </h1>
              <span className="text-[10px] leading-5 text-gray-600">
                200 KB
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-x-2">
            <CircularProgress
              show={false}
              size={22}
              value={10}
              strokeWidth={3}
            />

            <span className="text-xs leading-[14px] font-medium text-gray-500">
              55%
            </span>
          </div>
        </div>
        <div className="border border-gray-200 bg-white flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-x-2">
            <div className="size-8 rounded-full shrink-0 inline-flex items-center justify-center bg-dark-blue-50/10 bg-primary-25">
              <ImageIcon className="size-4 text-primary-500" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm leading-5 font-medium text-gray-700">
                Tech design requirements.png
              </h1>
              <span className="text-[10px] leading-5 text-gray-600">
                200 KB
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-x-2">
            <CircularProgress
              show={false}
              size={22}
              value={10}
              strokeWidth={3}
            />

            <span className="text-xs leading-[14px] font-medium text-gray-500">
              55%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[52px] grid grid-cols-2 gap-x-3">
        <Button visual="gray" variant="outlined">
          Cancel
        </Button>
        <Button visual="primary" variant="filled">
          Send
        </Button>
      </div>
    </div>
  )
}
