"use client"

import React, {
  Context,
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { UserAPI } from "@/service/http/user"
import Cookies from "js-cookie"
import { User } from "@/types/user"

interface AuthContext {
  isLoading: boolean
  user: User | null
  setUser: Dispatch<React.SetStateAction<User | null>>
  logoutHandler: () => void
}

const AuthContext: Context<AuthContext> = createContext<AuthContext>({
  isLoading: true,
  user: null,
  setUser: () => {},
  logoutHandler: () => {},
})

function useProvideAuth() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getUser = () => {
    setIsLoading(true)
    UserAPI.me()
      .then((response) => {
        if (response?.status === 200 && response?.data?.user) {
          setUser(response?.data?.user)
        }
      })
      .catch((error) => {
        // logoutHandler()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const logoutHandler = () => {
    Cookies.remove("accessToken")
    setUser(null)
    router.push(`/sign-in`)
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    isLoading,
    user,
    setUser,
    logoutHandler,
  }
}

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
