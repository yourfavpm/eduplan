'use client'

import { usePathname } from 'next/navigation'
import { UtilityBar } from './UtilityBar'
import { Navbar } from './Navbar'

export function MarketingHeader() {
    const pathname = usePathname()
    if (pathname.startsWith('/portal')) return null

    return (
        <header className="sticky top-0 z-50">
            <UtilityBar />
            <Navbar />
        </header>
    )
}
