// Google Analytics
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID!, {
            page_path: url,
        })
    }
}

// Track custom events
export const event = ({ action, category, label, value }: {
    action: string
    category: string
    label: string
    value?: number
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

// PostHog
export const initPostHog = () => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        // PostHog will be initialized in a separate client component
        return true
    }
    return false
}

// Track conversions
export const trackConversion = (conversionType: string, metadata?: Record<string, any>) => {
    // GA4
    event({
        action: 'conversion',
        category: 'engagement',
        label: conversionType,
    })

    // PostHog (will be implemented in client component)
    if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture(conversionType, metadata)
    }
}
