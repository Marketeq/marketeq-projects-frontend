import { Transition } from "framer-motion"

export const DEFAULT_FLAG =
  "http://purecatamphetamine.github.io/country-flag-icons/3x2/AI.svg"

export const COOKIE_NAME = "googtrans"

export const ELEMENT_ID = "google_translate_element"

export const ONE_SECOND = 1000

export const ONE_MB = 1024 * 1024

export const DO_NOT_TRANSLATE = "notranslate"

export const PAGE_BUILDER_SEGMENTS = {
  RICH_TEXT: "richText",
  PODCAST: "podcast",
  FEATURED: "reportField",
  MEASURING: "statistics",
  STRETCHED_BG: "contentSectionWithBg",
  STRETCHED: "contentSection",
  SLIDER: "carousel",
  QUOTE: "quoteSection",
  SECTION_CARD: "sectionCard",
} as const

export const HOT_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
} as const

export const IMAGE_QUALITY = (() => {
  if (process.env.NEXT_PUBLIC_IMAGE_QUALITY !== undefined) {
    const parsed = parseFloat(process.env.NEXT_PUBLIC_IMAGE_QUALITY)
    return Number.isNaN(parsed) ? 75 : parsed
  }

  return 75
})()

export const REVALIDATION_TIME = (() => {
  if (process.env.NEXT_PUBLIC_REVALIDATION_TIME !== undefined) {
    const parsed = parseFloat(process.env.NEXT_PUBLIC_REVALIDATION_TIME)
    return Number.isNaN(parsed) ? 0 : parsed
  }

  return 0
})()

export const SALARY_RANGE_REGEX = /^\$\d{1,}\s*-\s*\$\d{1,}/

export const SEARCH_BAR_ANIMATION_DURATION = 500
export const SEARCH_BAR_EXIT_ANIMATION_DELAY = 300
export const EXTRA_DELAY = 50

export const dashboardSearchBarTransition: Transition = {
  ease: "easeInOut",
  duration: 0.5,
}

export const dashboardSearchBarVariants = {
  enter: { x: ["100%", "0%"] },
  exit: {
    x: "100%",
    transition: {
      ...dashboardSearchBarTransition,
      delay: SEARCH_BAR_EXIT_ANIMATION_DELAY / 1000,
    },
  },
}

export const dashboardHeaderCommonTransition = {
  ease: "linear",
  duration: 0.2,
}

export const dashboardHeaderCommonVariants = {
  enter: {
    opacity: [0, 1],
  },
}

export const CATEGORIES = {
  BLOCKCHAIN: "Blockchain",
  MACHINE_LEARNING: "Machine Learning",
  ARTIFICIAL_INTELLIGENCE: "Artificial Intelligence",
  CLOUD_SECURITY: "Cloud Security",
  BIG_DATA_ANALYTICS: "Big Data Analytics",
  FINTECH: "Fintech",
  USER_EXPERIENCE: "User Experience",
  CLOUD_COMPUTING: "Cloud Computing",
  MOBILE_APPLICATIONS: "Mobile Applications",
} as const

export const INDUSTRIES = {
  BLOCKCHAIN: "Blockchain",
  MACHINE_LEARNING: "Machine Learning",
  ARTIFICIAL_INTELLIGENCE: "Artificial Intelligence",
  CLOUD_SECURITY: "Cloud Security",
  BIG_DATA_ANALYTICS: "Big Data Analytics",
  FINTECH: "Fintech",
  USER_EXPERIENCE: "User Experience",
  CLOUD_COMPUTING: "Cloud Computing",
  MOBILE_APPLICATIONS: "Mobile Applications",
} as const

export const COOKIES_PERMISSION = "cookies-permission"
export const ESSENTIAL_COOKIES_ENABLED = "isEssentialCookiesEnabled"
export const PERFORMANCE_COOKIES_ENABLED = "isPerformanceCookiesEnabled"
export const FUNCTIONALITY_COOKIES_ENABLED = "isFunctionalityCookiesEnabled"
export const ADVERTISING_COOKIES_ENABLED = "isAdvertisingCookiesEnabled"

export type Cookie =
  | typeof COOKIES_PERMISSION
  | typeof ESSENTIAL_COOKIES_ENABLED
  | typeof PERFORMANCE_COOKIES_ENABLED
  | typeof FUNCTIONALITY_COOKIES_ENABLED
  | typeof ADVERTISING_COOKIES_ENABLED

export const stretchAnimationVariants = {
  initial: {
    flexGrow: 0,
  },
  open: {
    flexGrow: 0.3,
  },
  end: {
    flexGrow: 0,
  },
}
