import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth"
import { Spinner } from "@/components/ui/spinner/spinner"

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const pathname = usePathname()

  const { isLoading, user } = useAuth()

  const [isPageLoading, setIsPageLoading] = useState(true)

  const routeCheck = async () => {
    if (!isLoading && user) {
      if (
        (user?.role && !pathname?.includes("onboarding")) ||
        (!user?.role && pathname?.includes("onboarding"))
      ) {
        setIsPageLoading(false)
      } else if (!user?.role) {
        router.push(`/onboarding`)
      } else {
        router.push(`/`)
      }
    }

    if (!isLoading && !user) {
      router.push(`/sign-in`)
    }
  }

  useEffect(() => {
    routeCheck()
  }, [user, isLoading])

  return (
    <>
      {isPageLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner size={32} strokeWidth={3} />
        </div>
      )}

      {!isPageLoading && user && <>{children}</>}
    </>
  )
}

export default AuthenticatedRoute
