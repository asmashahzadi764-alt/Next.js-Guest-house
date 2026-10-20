'use client'
import { useEffect, useState, FormEvent } from 'react'
type Room = { id: string; name: string; desc: string; priceFrom: number | null; image: string }
type Rev = { rating: number; count: number; mapsUrl: string; items: { author: string; text: string; date: string }[] }
const ph = (u: string) => `url(${u}),linear-gradient(135deg,#2a2a2d,#6b5a2e)`
function useApi<T>(url: string) {
  const [d, setD] = useState<T | null>(null)
  useEffect(() => { fetch(url).then(r => r.json()).then(setD).catch(() => setD(null)) }, [url])
  return d
}
export function Rooms() {
  const r = useApi<Room[]>('/api/rooms')
  if (!r) return <p className="text-center text-gray-500">Loading rooms…</p>
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {r.map(x => (
        <article key={x.id}>
          <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: ph(x.image) }} />
          <h3 className="mt-3 text-lg font-medium">{x.name}</h3>
          <p className="text-sm text-gray-500">{x.desc}</p>
          <div className="mt-3 flex items-center justify-between border-t pt-3">
            <span className="text-gold font-medium">{x.priceFrom ? `From Rs ${x.priceFrom}` : 'Ask for rate'}</span>
            <a href="#contact" className="text-sm underline">Enquire</a>
          </div>
        </article>
      ))}
    </div>
  )
}
export function Reviews() {
  const r = useApi<Rev>('/api/reviews')
  if (!r) return null
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white p-6 shadow md:col-span-1">
        <p className="font-head text-5xl text-gold">{r.rating}</p>
        <p className="text-sm text-gray-500">Google rating · {r.count}+ reviews</p>
        <a href={r.mapsUrl} target="_blank" rel="noopener" className="btn btn-w mt-4 border">Read reviews on Google</a>
      </div>
      <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
        {r.items.length === 0 && <p className="text-gray-500">Guest reviews appear here once added to the data file.</p>}
        {r.items.map((i, k) => (
          <blockquote key={k} className="bg-white p-5 shadow"><p className="text-sm">“{i.text}”</p><footer className="mt-3 text-xs text-gray-500">{i.author} · {i.date}</footer></blockquote>
        ))}
      </div>
    </div>
  )
}
export function Timings() {
  const t = useApi<{ checkIn: string; checkOut: string; reception: string }>('/api/timings')
  if (!t) return null
  return (
    <dl className="grid grid-cols-2 gap-4 text-sm">
      <div><dt className="text-gray-500">Check-in</dt><dd className="text-xl font-head">{t.checkIn}</dd></div>
      <div><dt className="text-gray-500">Check-out</dt><dd className="text-xl font-head">{t.checkOut}</dd></div>
      {t.reception && <div className="col-span-2"><dt className="text-gray-500">Reception</dt><dd>{t.reception}</dd></div>}
    </dl>
  )
}
export function ContactForm() {
  const [s, setS] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [msg, setMsg] = useState('')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setS('sending')
    const form = e.currentTarget
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    const j = await res.json().catch(() => ({}))
    if (res.ok) { setS('ok'); form.reset() } else { setS('err'); setMsg(j.error || 'Something went wrong.') }
  }
  const f = 'w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder-white/60'
  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input name="name" placeholder="Your name" className={f} required />
      <input name="phone" placeholder="Phone / WhatsApp" className={f} required />
      <input name="checkIn" type="date" aria-label="Check-in" className={f} />
      <input name="checkOut" type="date" aria-label="Check-out" className={f} />
      <input name="guests" type="number" min={1} placeholder="Guests" className={f} />
      <textarea name="message" placeholder="Message" rows={3} className={`${f} sm:col-span-2`} />
      <button disabled={s === 'sending'} className="btn btn-w sm:col-span-2">{s === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
      {s === 'ok' && <p className="text-sm text-green-300 sm:col-span-2">Thank you! We will contact you soon.</p>}
      {s === 'err' && <p className="text-sm text-red-300 sm:col-span-2">{msg}</p>}
    </form>
  )
}
