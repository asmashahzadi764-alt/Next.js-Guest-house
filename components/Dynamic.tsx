'use client'
import { useEffect, useState, FormEvent, ReactNode } from 'react'
import { Amp } from './Amp'
type Room = { id: string; name: string; desc: string; priceFrom: number | null; image: string }
type Rev = { rating: number | null; count: number | null; mapsUrl: string; items: { author: string; rating: number; text: string; date: string }[] }
const ph = (u: string) => `url(${u}),linear-gradient(135deg,#24443d,#8a6a3a)`
function useApi<T>(url: string) {
  const [d, setD] = useState<T | null>(null)
  useEffect(() => { fetch(url).then(r => r.json()).then(setD).catch(() => setD(null)) }, [url])
  return d
}
export function Rooms() {
  const r = useApi<Room[]>('/api/rooms')
  if (!r) return <p className="text-center text-gray-500">Loading…</p>
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {r.map(x => (
        <article key={x.id} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
          <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: ph(x.image) }} />
          <div className="p-6">
            <h3 className="text-xl font-semibold"><Amp t={x.name} /></h3>
            <p className="mt-2 text-gray-600">{x.desc}</p>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="font-semibold text-clay">{x.priceFrom ? `From Rs ${x.priceFrom}` : 'Ask for rate'}</span>
              <a href="#contact" className="font-medium text-navy underline underline-offset-4">Enquire</a>
            </div>
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
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Reviews on Google</p>
        {r.rating ? <p className="mt-2 font-head text-6xl text-navy">{r.rating}<span className="text-2xl text-gray-400"> / 5</span></p> : <p className="mt-2 font-head text-3xl text-navy">What our guests say</p>}
        <p className="mt-2 text-sm text-gray-500">{r.count ? `Based on ${r.count} Google reviews` : 'Real reviews from our Google Business Profile.'}</p>
        <a href={r.mapsUrl} target="_blank" rel="noopener" className="btn btn-p mt-6">See More on Google</a>
      </div>
      <div className="lg:col-span-2">
        {r.items.length === 0 ? <div className="flex h-full items-center rounded-xl border border-dashed border-gray-300 p-8 text-gray-500">Guest reviews from our Google Business Profile will appear here.</div> :
          <div className="grid gap-4 sm:grid-cols-2">{r.items.map((i, k) => (
            <blockquote key={k} className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
              <div aria-label={`${i.rating} out of 5 stars`} className="text-clay">{'★'.repeat(i.rating)}{'☆'.repeat(5 - i.rating)}</div>
              <p className="mt-3 flex-1 text-[15px] text-gray-700">“{i.text}”</p>
              <footer className="mt-4 text-xs text-gray-500"><strong className="text-gray-800">{i.author}</strong> · {i.date} · Posted on Google</footer>
            </blockquote>))}</div>}
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
function Field({ label, id, error, wide, children }: { label: string; id: string; error?: string; wide?: boolean; children: ReactNode }) {
  return <div className={wide ? 'sm:col-span-2' : ''}><label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>{children}{error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-red-700">{error}</p>}</div>
}
export function ContactForm() {
  const [s, setS] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState('')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>
    const er: Record<string, string> = {}
    if ((d.name || '').trim().length < 2) er.name = 'Please enter your name.'
    if ((d.phone || '').replace(/\D/g, '').length < 7) er.phone = 'Please enter a valid phone number.'
    if (d.checkIn && d.checkOut && d.checkOut < d.checkIn) er.checkOut = 'Check-out must be after check-in.'
    setErrs(er); if (Object.keys(er).length) return
    setS('sending')
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
    const j = await res.json().catch(() => ({}))
    if (res.ok) { setS('ok'); form.reset() } else { setS('err'); setMsg(j.error || 'Something went wrong. Please try again.') }
  }
  const f = 'mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 outline-none focus:border-clay focus:ring-1 focus:ring-clay'
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field label="Your name" id="name" error={errs.name}><input id="name" name="name" autoComplete="name" className={f} aria-describedby="name-err" /></Field>
      <Field label="Phone / WhatsApp" id="phone" error={errs.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" className={f} aria-describedby="phone-err" /></Field>
      <Field label="Check-in" id="checkIn"><input id="checkIn" name="checkIn" type="date" className={f} /></Field>
      <Field label="Check-out" id="checkOut" error={errs.checkOut}><input id="checkOut" name="checkOut" type="date" className={f} aria-describedby="checkOut-err" /></Field>
      <Field label="Guests" id="guests" wide><input id="guests" name="guests" type="number" min={1} className={f} /></Field>
      <Field label="Message (optional)" id="message" wide><textarea id="message" name="message" rows={3} className={f} /></Field>
      <button disabled={s === 'sending'} className="btn btn-p sm:col-span-2">{s === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
      <div aria-live="polite" className="sm:col-span-2">{s === 'ok' && <p className="text-sm text-green-700">Thank you! We will contact you soon.</p>}{s === 'err' && <p className="text-sm text-red-700">{msg}</p>}</div>
    </form>
  )
}
export function Gallery() {
  const [imgs, setImgs] = useState<string[]>(Array.from({ length: 8 }, (_, k) => `/images/gallery-${k + 1}.jpg`))
  const [o, setO] = useState<number | null>(null)
  useEffect(() => {
    if (o === null) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setO(null)
      if (e.key === 'ArrowRight') setO(x => (x === null ? x : (x + 1) % imgs.length))
      if (e.key === 'ArrowLeft') setO(x => (x === null ? x : (x - 1 + imgs.length) % imgs.length))
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [o, imgs.length])
  return (<>
    <div className="columns-2 gap-3 md:columns-3">
      {imgs.map((u, k) => (
        <button key={u} onClick={() => setO(k)} aria-label={`Open photo ${k + 1}`} className="group mb-3 block w-full overflow-hidden rounded-xl">
          <img src={u} alt={`Sundus Guest House photo ${k + 1}`} loading="lazy" onError={() => setImgs(a => a.filter(i => i !== u))} className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
        </button>
      ))}
    </div>
    {o !== null && imgs[o] && (
      <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setO(null)}>
        <img src={imgs[o]} alt={`Sundus Guest House photo ${o + 1}`} className="max-h-[85vh] max-w-full object-contain" onClick={e => e.stopPropagation()} />
        <button aria-label="Close" className="absolute right-5 top-4 text-4xl text-white" onClick={() => setO(null)}>×</button>
        <button aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-4xl text-white" onClick={e => { e.stopPropagation(); setO((o - 1 + imgs.length) % imgs.length) }}>‹</button>
        <button aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-4xl text-white" onClick={e => { e.stopPropagation(); setO((o + 1) % imgs.length) }}>›</button>
      </div>
    )}
  </>)
}