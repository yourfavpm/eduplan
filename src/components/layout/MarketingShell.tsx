'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'
import { FloatingConsultationButton } from './FloatingConsultationButton'

export function MarketingShell() {
    const pathname = usePathname()
    if (pathname.startsWith('/portal')) return null

    return (
        <>
            <Footer />
            <FloatingConsultationButton />
        </>
    )
}
