"use client"

import * as React from "react"
import {
  cn,
  convertToKbOrMb,
  getId,
  isDoc,
  isEmpty,
  isImg,
  isVideo,
  toPercentage,
  verifyFileType,
} from "@/utils/functions"
import { useControllableState, useToggle } from "@/utils/hooks"
import {
  Check,
  File,
  Image,
  Trash2,
  UploadCloud,
  Video,
} from "@blend-metrics/icons"
import { ErrorCode, useDropzone } from "react-dropzone"
import { IconButton } from "../icon-button"
import { CircularProgress, Progress } from "../progress"

export type Category = "doc" | "img" | "video" | "other"

interface Data {
  id: number
  name: string
  category: Category
  size: string
  hasError: boolean
  progress: number
  data: File
}

export type DropzoneState = Data[]

interface DropzoneProps {
  value?: DropzoneState
  onChange?: (value: DropzoneState | undefined) => void
  className?: string
  maxFiles?: number
  onBlur?: () => void
  onTryAgain?: () => void
  icon?: boolean
  accepted?: string[]
}

export const Dropzone = ({
  onChange,
  className,
  onBlur,
  onTryAgain,
  value,
  maxFiles = 0,
  icon = false,
  accepted = [".svg", ".png", ".gif", ".jpg"],
}: DropzoneProps) => {
  const [isDragAccept, { off, on }] = useToggle()
  const [state, setState] = useControllableState<DropzoneState | undefined>({
    value,
    onChange,
  })

  const clear = React.useCallback(() => setState(undefined), [setState])

  const update = React.useCallback(
    (cb: (value: Data) => Data) =>
      setState((prev) => prev?.map((value) => cb(value))),
    [setState]
  )

  const onDropAccepted = React.useCallback(
    (files: File[]) => {
      setState(() =>
        files.map((data) => {
          const { name, size } = data
          const category = isImg(name)
            ? "img"
            : isVideo(name)
              ? "video"
              : isDoc(name)
                ? "doc"
                : "other"

          return {
            category,
            name,
            data,
            hasError: false,
            id: getId(),
            progress: 0,
            size: convertToKbOrMb(size),
          }
        })
      )

      on()
    },
    [on, setState]
  )

  const onDropRejected = React.useCallback(() => {
    off()
    clear()
  }, [off, clear])

  const onDelete = (id: number) => {
    if (!state) return

    const result = state.filter((value) => value.id !== id)
    if (isEmpty(result)) {
      setState(undefined)
      off()
    } else {
      setState(result)
    }
  }

  const onRecover = (id: number) => {
    update((value) => (value.id === id ? { ...value, hasError: false } : value))
    onTryAgain?.()
  }

  const { getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles,
    onDropAccepted,
    onDropRejected,
    multiple: maxFiles > 1,
    validator: (data) => {
      if (!accepted) return null

      const isValid = verifyFileType(data.name, accepted)
      return isValid
        ? null
        : {
            code: ErrorCode.FileInvalidType,
            message: "Its type is invalid",
          }
    },
  })

  return (
    <div
      {...getRootProps({
        onBlur,
      })}
      className={cn("rounded-lg focus-visible:outline-none", className)}
    >
      <input {...getInputProps()} />
      {isDragAccept ? (
        <div className="space-y-3">
          {state?.map(({ hasError, category, name, progress, size, id }) => (
            <React.Fragment key={id}>
              {hasError ? (
                <div className="rounded-lg border border-error-300 bg-error-25 p-2 pb-4 pl-4">
                  <div className="flex">
                    <div className="flex flex-auto gap-x-4 pt-2">
                      <div className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border-[4px] border-error-50 bg-error-100 text-error-500">
                        <UploadCloud className="h-4 w-4" />
                      </div>
                      <div className="flex flex-auto flex-col items-start">
                        <span className="inline-block text-sm font-medium text-error-500">
                          Upload failed, please try again
                        </span>
                        <span className="inline-block text-sm text-error-500">
                          {name}
                        </span>
                        <button
                          className="mt-1 text-sm font-semibold text-error-500 hover:underline focus:outline-none"
                          onClick={() => onRecover(id)}
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                    <IconButton
                      onClick={() => onDelete(id)}
                      variant="ghost"
                      visual="error"
                      type="button"
                    >
                      <Trash2 className="h-5 w-5" />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-2 pb-4 pl-4 hover:border-primary-500 hover:ring-1 hover:ring-primary-500">
                  <div className="flex">
                    <div className="flex flex-auto gap-x-4 pt-2">
                      <div className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border-[4px] border-primary-25 bg-primary-50 text-primary-500">
                        {category === "img" && <Image className="h-4 w-4" />}
                        {category === "video" && <Video className="h-4 w-4" />}
                        {category === "doc" && <File className="h-4 w-4" />}
                        {category === "other" && (
                          <UploadCloud className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex flex-auto flex-col">
                        <span className="inline-block text-sm font-medium text-gray-700">
                          {name}
                        </span>
                        <span className="inline-block text-sm text-gray-500">
                          {size}
                        </span>
                      </div>
                    </div>

                    {progress === 100 ? (
                      <div className="pr-2 pt-2">
                        <span className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-500">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                      </div>
                    ) : (
                      <IconButton
                        onClick={() => onDelete(id)}
                        variant="ghost"
                        visual="error"
                        type="button"
                      >
                        <Trash2 className="h-5 w-5" />
                      </IconButton>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-x-3 pl-12">
                    <div className="flex-auto py-1.5">
                      <Progress value={progress} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {progress}%
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white px-[25px] py-[17px] hover:border-2 hover:border-primary-500 hover:px-6 hover:py-4">
          {icon && (
            <div className="mb-3 flex items-center justify-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-gray-50 bg-gray-100">
                <UploadCloud className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-x-1">
            <button
              className="text-center text-sm font-semibold text-primary-500 hover:underline focus:outline-none"
              onClick={open}
              type="button"
            >
              Click to upload
            </button>
            <span className="text-center text-sm text-gray-600">
              or drag and drop
            </span>
          </div>
          <div className="mt-1 flex justify-center">
            <span className="text-center text-sm leading-[18px] text-gray-600">
              {accepted.join(" ")}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export type CircularProgressDropzoneState = Data[]

interface CircularProgressDropzoneProps {
  value?: CircularProgressDropzoneState
  className?: string
  maxFiles?: number
  onChange?: (value: CircularProgressDropzoneState | undefined) => void
  onBlur?: () => void
  onTryAgain?: () => void
  icon?: boolean
  accepted?: string[]
  multiple?: boolean
}

export const CircularProgressDropzone = ({
  value,
  onChange,
  className,
  onBlur,
  onTryAgain,
  maxFiles = 0,
  icon = false,
  accepted = [".svg", ".png", ".gif", ".jpg"],
}: CircularProgressDropzoneProps) => {
  const [isDragAccept, { off, on }] = useToggle()
  const [state, setState] = useControllableState<DropzoneState | undefined>({
    value,
    onChange,
  })

  const clear = React.useCallback(() => setState(undefined), [setState])

  const update = React.useCallback(
    (cb: (value: Data) => Data) =>
      setState((prev) => prev?.map((value) => cb(value))),
    [setState]
  )

  const onDropAccepted = React.useCallback(
    (files: File[]) => {
      setState(() =>
        files.map((data) => {
          const { name, size } = data
          const category = isImg(name)
            ? "img"
            : isVideo(name)
              ? "video"
              : isDoc(name)
                ? "doc"
                : "other"

          return {
            category,
            name,
            data,
            hasError: false,
            id: getId(),
            progress: 0,
            size: convertToKbOrMb(size),
          }
        })
      )

      on()
    },
    [on, setState]
  )

  const onDropRejected = React.useCallback(() => {
    off()
    clear()
  }, [off, clear])

  const onDelete = (id: number) => {
    if (!state) return

    const result = state.filter((value) => value.id !== id)
    if (isEmpty(result)) {
      setState(undefined)
      off()
    } else {
      setState(result)
    }
  }

  const onRecover = (id: number) => {
    update((value) => (value.id === id ? { ...value, hasError: false } : value))
    onTryAgain?.()
  }

  const { getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles,
    onDropAccepted,
    onDropRejected,
    multiple: maxFiles > 1,
    validator: (data) => {
      if (!accepted) return null

      const isValid = verifyFileType(data.name, accepted)
      return isValid
        ? null
        : {
            code: ErrorCode.FileInvalidType,
            message: "Its type is invalid",
          }
    },
  })

  return (
    <div
      {...getRootProps({
        onBlur,
      })}
      className={cn("rounded-lg focus-visible:outline-none", className)}
    >
      <input {...getInputProps()} />
      {isDragAccept ? (
        <div className="space-y-3">
          {state?.map(({ category, hasError, id, name, progress, size }) => (
            <React.Fragment key={id}>
              {hasError ? (
                <div className="flex gap-x-1 rounded-lg border border-error-300 bg-error-25 pb-4 pl-4 pr-2 pt-2">
                  <div className="flex flex-auto gap-x-4 pt-2">
                    <div className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border-[4px] border-error-50 bg-error-100 text-error-500">
                      <UploadCloud className="h-4 w-4" />
                    </div>
                    <div className="flex-auto">
                      <div className="text-sm font-medium text-error-500">
                        {name}
                      </div>
                      <span className="block text-sm text-error-500">
                        {size} - {progress}% uploaded
                      </span>
                      <button
                        className="ml-1 text-sm font-semibold text-error-500 hover:underline focus-visible:outline-none"
                        onClick={() => onRecover(id)}
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                  <IconButton
                    variant="ghost"
                    visual="error"
                    onClick={() => onDelete(id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </IconButton>
                </div>
              ) : (
                <div className="relative rounded-lg border border-gray-200 bg-white p-4 hover:border-primary-500 hover:ring-1 hover:ring-primary-500">
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div
                      className="h-full w-full translate-x-[--translate-x] bg-gray-50 transition duration-500"
                      style={{
                        ...({
                          "--translate-x": toPercentage(-(100 - progress)),
                        } as Record<string, string>),
                      }}
                    />
                  </div>
                  <div className="relative flex items-start">
                    <div className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border-[4px] border-primary-25 bg-primary-50 text-primary-500">
                      {category === "img" && <Image className="h-4 w-4" />}
                      {category === "doc" && <File className="h-4 w-4" />}
                      {category === "video" && <Video className="h-4 w-4" />}
                      {category === "other" && (
                        <UploadCloud className="h-4 w-4" />
                      )}
                    </div>
                    <div className="ml-4 flex-auto">
                      <div className="text-sm font-medium text-gray-700">
                        {name}
                      </div>
                      <span className="block text-sm text-gray-600">
                        {size} - {progress}% uploaded
                      </span>
                    </div>
                    {progress === 100 ? (
                      <span className="ml-4 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-500">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </span>
                    ) : (
                      <div className="ml-2 flex-none">
                        <CircularProgress
                          show={false}
                          value={progress}
                          size={32}
                          strokeWidth={4}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 hover:border-primary-500 hover:ring-1 hover:ring-primary-500">
          {icon && (
            <div className="mb-3 flex items-center justify-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[6px] border-gray-50 bg-gray-100">
                <UploadCloud className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-x-1">
            <button
              className="text-center text-sm font-semibold text-primary-500 hover:underline focus:outline-none"
              onClick={open}
              type="button"
            >
              Click to upload
            </button>
            <span className="text-center text-sm text-gray-600">
              or drag and drop
            </span>
          </div>
          <div className="mt-1 flex justify-center">
            <span className="text-center text-sm leading-[18px] text-gray-600">
              {accepted.join(" ")}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
