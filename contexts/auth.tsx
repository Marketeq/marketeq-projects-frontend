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
import { AuthAPI } from "@/service/http/auth"
import { UserAPI } from "@/service/http/user"
import { User } from "@/types/user"
import { useToast } from "@/components/ui"

interface AuthContextType {
  isLoading: boolean
  isAuthChecked: boolean
  user: User | null
  setUser: Dispatch<React.SetStateAction<User | null>>
  logoutHandler: () => void
}

const AuthContext: Context<AuthContextType> = createContext<AuthContextType>({
  isLoading: true,
  isAuthChecked: false,
  user: null,
  setUser: () => {},
  logoutHandler: () => {},
})

function useProvideAuth() {
  const router = useRouter()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)

  const getUser = () => {
    setIsLoading(true)

    UserAPI.me()
      .then((response) => {
        if (response?.status === 200 && response?.data?.user) {
          setUser(response.data.user)
        }
      })
      .catch(() => {
        setUser(null)
        setIsAuthChecked(true)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
        setIsAuthChecked(true)
      })
  }

  const logoutHandler = async () => {
    try {
      await AuthAPI.Logout()
    } catch (err: any) {
      toast({
        title:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setUser(null)
      router.push("/sign-in")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    isLoading,
    isAuthChecked,
    user,
    setUser,
    logoutHandler,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
