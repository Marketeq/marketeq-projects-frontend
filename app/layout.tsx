import { Suspense } from "react"
import type { Metadata } from "next"
import { font } from "@/utils/font"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { InviteWindow } from "@/components/invite-window"
import { NProgressBar } from "@/components/n-progress-bar"
import { Toaster } from "@/components/ui"
import "@/styles/globals.css"
import "@/styles/nprogress.css"

export const metadata: Metadata = {
  title: "Marketeq",
  description: "Welcome to Marketeq's marketing website.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`scroll-smooth ${font.variable}`} lang="en">
      <body>
        <div className="min-h-screen flex flex-col">{children}</div>
        <Suspense fallback={null}>
          <NProgressBar />
        </Suspense>

        <Toaster />
        <InviteWindow />
      </body>
      <GoogleAnalytics gaId="G-265438626K" />
      <GoogleTagManager gtmId="GTM-MKB89M5M" />
    </html>
  )
}
