"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth"
import { AuthAPI } from "@/service/http/auth"
import { LinkedInDefault } from "@blend-metrics/icons/social"
import Cookies from "js-cookie"
import { Button, useToast } from "@/components/ui"
import { Spinner } from "../ui/spinner/spinner"

const LinkedInLogin = () => {
  const hasLoggedInRef = useRef(false)

  const router = useRouter()
  const pathName = usePathname()

  const { setUser } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const getCodeFromWindowURL = useCallback((url: string) => {
    const popupWindowURL = new URL(url)
    return popupWindowURL.searchParams.get("code")
  }, [])

  const handleLoginWithLinkedIn = () => {
    if (typeof window !== "undefined") {
      const linkedin =
        "https://www.linkedin.com/oauth/v2/authorization?response_type=code"
      const clientId = process?.env?.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ""
      const scope = "openid%20profile%20email"
      const state = "1234"
      const redirectUrl = `${window?.location?.origin}${pathName}`

      const authUrl = `${linkedin}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`
      const width = 550
      const height = 730
      const left = window.screen.width / 2 - width / 2
      const top = window.screen.height / 2 - height / 2

      window.open(
        authUrl,
        "Linkedin",
        `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
      )
    }
  }

  const handleLoginWithLinkedInApi = (code: string) => {
    if (!hasLoggedInRef.current) {
      hasLoggedInRef.current = true

      const redirectUrl = `${window?.location?.origin}${pathName}`

      setIsLoading(true)

      AuthAPI.LoginWithLinkedIn({
        code,
        redirectUrl,
      })
        .then((response) => {
          if (
            response?.status === 200 &&
            response?.data?.accessToken &&
            response?.data?.user
          ) {
            Cookies.set("accessToken", response?.data?.accessToken)
            setUser(response?.data?.user)

            router.push("/")
          }
        })
        .catch((error) => {
          if (error?.response?.data?.errors?.message) {
            toast({
              title: error?.response?.data?.errors?.message,
              variant: "destructive",
            })
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handlePostMessage = useCallback((event: any) => {
    if (event?.data?.type === "code" && event?.data?.code) {
      const { code } = event.data
      handleLoginWithLinkedInApi(code)
    }
  }, [])

  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const code = getCodeFromWindowURL(window.location.href)
      window.opener.postMessage({ type: "code", code }, "*")
      window.close()
    }

    window.addEventListener("message", handlePostMessage)

    return () => {
      window.removeEventListener("message", handlePostMessage)
    }
  }, [getCodeFromWindowURL, handlePostMessage])

  return (
    <>
      <Button
        className="xs:max-md:text-sm xs:max-md:py-2 xs:max-md:px-[14px] xs:max-md:h-9"
        variant="outlined"
        visual="gray"
        size="lg"
        onClick={() => {
          handleLoginWithLinkedIn()
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner
            size={24}
            trackClassName="stroke-white"
            className=" stroke-gray-300"
            strokeWidth={3}
          />
        ) : (
          <>
            <LinkedInDefault className="size-5 md:size-6" /> Sign in with
            Linkedin
          </>
        )}
      </Button>
    </>
  )
}

export default LinkedInLogin
