'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown, Check } from 'lucide-react'

export type Currency = {
  code: string
  name: string
  country: string
  symbol: string
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', country: 'United States', symbol: '$' },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', symbol: '£' },
  { code: 'EUR', name: 'Euro', country: 'European Union', symbol: '€' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', symbol: 'A$' },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', symbol: '₦' },
  { code: 'GHS', name: 'Ghanaian Cedi', country: 'Ghana', symbol: 'GH₵' },
  { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', symbol: 'KSh' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', symbol: 'R' },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', symbol: 'د.إ' },
  { code: 'PLN', name: 'Polish Zloty', country: 'Poland', symbol: 'zł' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', symbol: 'Ft' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', symbol: '₹' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', symbol: '¥' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', symbol: '¥' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', symbol: '₺' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', symbol: 'NZ$' },
]

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function CurrencySelector({ value, onChange, className = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = CURRENCIES.find(c => c.code === value) || CURRENCIES[0]

  const filtered = CURRENCIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white hover:border-blue-400 transition-colors"
      >
        <span className="flex items-center gap-1.5 truncate">
          <span className="font-bold text-blue-600">{selected.code}</span>
          <span className="text-slate-400">({selected.symbol})</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search country or currency..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-blue-50 transition-colors ${value === c.code ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{c.code} - {c.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({c.symbol})</span>
                    </div>
                    <span className="text-[10px] text-slate-500 truncate">{c.country}</span>
                  </div>
                  {value === c.code && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-xs text-slate-400">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
