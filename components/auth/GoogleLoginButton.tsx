"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth"
import { AuthAPI } from "@/service/http/auth"
import { GoogleDefault } from "@blend-metrics/icons/social"
import { useGoogleLogin } from "@react-oauth/google"
import Cookies from "js-cookie"
import { Button, useToast } from "@/components/ui"
import { Spinner } from "../ui/spinner/spinner"

const GoogleLoginButton = () => {
  const router = useRouter()

  const { setUser } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse?.access_token) {
        setIsLoading(true)

        AuthAPI.LoginWithGoogle({
          accessToken: credentialResponse?.access_token,
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
    },
    onError: () => {},
  })

  return (
    <Button
      className="xs:max-md:text-sm xs:max-md:py-2 xs:max-md:px-[14px] xs:max-md:h-9"
      variant="outlined"
      visual="gray"
      size="lg"
      onClick={() => handleLoginWithGoogle()}
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
          <GoogleDefault className="size-5 md:size-6" /> Sign in with Google
        </>
      )}
    </Button>
  )
}

export default GoogleLoginButton
