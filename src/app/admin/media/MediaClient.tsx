'use client'

import { useState, useTransition, useRef } from 'react'
import { Upload, Trash2, Copy, Check, Image as ImageIcon, FileText } from 'lucide-react'

type Asset = { id: string; name: string; file_path: string; url: string | null; type: string | null; size: number | null; created_at: string }

export default function MediaClient({ initialAssets }: { initialAssets: Asset[] }) {
  const [assets, setAssets] = useState(initialAssets)
  const [isPending, startTransition] = useTransition()
  const [copied, setCopied] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    startTransition(async () => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.asset) setAssets(prev => [data.asset, ...prev])
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function remove(id: string) {
    if (!confirm('Delete this asset?')) return
    startTransition(async () => {
      await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
      setAssets(prev => prev.filter(a => a.id !== id))
    })
  }

  const filtered = filter === 'all' ? assets : assets.filter(a => a.type?.startsWith(filter))

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-slate-500 text-sm mt-1">{assets.length} assets</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="application">PDFs</option>
          </select>
          <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleUpload} className="hidden" id="media-upload" />
          <label htmlFor="media-upload" className={`inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <Upload className="w-4 h-4" /> {isPending ? 'Uploading…' : 'Upload Asset'}
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-20 text-center">
          <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">No assets yet. Upload an image or PDF.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(asset => {
            const isImage = asset.type?.startsWith('image')
            const displayUrl = asset.url ?? ''
            return (
              <div key={asset.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-sm transition-shadow">
                <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden">
                  {isImage && displayUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={displayUrl} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-8 h-8 text-slate-400" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => copyUrl(displayUrl)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-blue-50 transition-colors">
                      {copied === displayUrl ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => remove(asset.id)} disabled={isPending} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-slate-700 truncate">{asset.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{asset.type?.split('/')[1]?.toUpperCase() ?? '—'}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
