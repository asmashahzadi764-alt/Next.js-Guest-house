import b from '@/data/business.json'
import { Rooms, Reviews, Timings, ContactForm, VideoGallery, Gallery } from '@/components/Dynamic'
const bg = (u: string, c = 'rgba(10,26,45,.55),rgba(10,26,45,.78)') => ({ backgroundImage: `linear-gradient(${c}),url(${u}),linear-gradient(135deg,#0a1a2d,#16355a)` })
const nav = [['About', '#about'], ['Rooms', '#rooms'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Location', '#location'], ['Contact', '#contact']]
const dir = `https://www.google.com/maps/dir/?api=1&destination=${b.geo.lat},${b.geo.lng}`
const faqs = [['What are check-in and check-out times?', `Check-in is at ${b.checkIn} and check-out is at ${b.checkOut}.`], ['Is parking and WiFi available?', 'Yes, parking, WiFi and a restaurant are listed for the guest house.'], ['How do I book?', 'Send an enquiry below or call us. We confirm availability and rate before you pay.'], ['What is nearby?', b.nearby.map(n => `${n.name} (${n.km} km)`).join(', ') + '.']]
const ld = { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: b.name, address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.city, addressRegion: b.region, addressCountry: b.country }, geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng }, checkinTime: b.checkIn, checkoutTime: b.checkOut, hasMap: b.mapsUrl, telephone: b.phone, openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }, amenityFeature: b.amenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })) }
export default function Home() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <section className="relative min-h-[560px] overflow-hidden text-white md:h-[clamp(580px,38vw,720px)]">
      <div className="hero-clip absolute inset-0 bg-cover bg-center" style={bg('/images/hero.jpg', 'rgba(10,26,45,.55),rgba(10,26,45,.82)')} />
      <header className="absolute inset-x-0 top-0 z-20"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#" className="flex items-center gap-3"><img src="/images/logo.png" width="48" height="48" alt="Sundus Guest House logo" className="h-12 w-12 rounded-full" /><span className="font-head text-xl font-semibold leading-none">SUNDUS<small className="block text-[11px] font-normal tracking-widest text-white/80">GUEST HOUSE</small></span></a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">{nav.map(([n, h]) => <a key={h} href={h} className="underline-offset-8 hover:text-gold hover:underline">{n}</a>)}</nav>
        <a href="#contact" className="btn btn-g">Book Now</a></div></header>
      <div className="relative z-10 px-5 pb-40 pt-40 text-center md:absolute md:inset-x-0 md:top-[27%] md:p-0">
        <p className="text-xs font-semibold uppercase tracking-[.3em] text-gold">Skardu · Gilgit-Baltistan</p>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-semibold leading-[1.2] md:text-5xl">A Peaceful Stay in the Heart of Skardu</h1>
        <p className="mx-auto mt-4 max-w-sm text-white/85">Family-friendly rooms, a restaurant and easy access to Chunda and Soq valleys.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><a href="#contact" className="btn btn-g">Book Your Stay</a><a href={dir} target="_blank" rel="noopener" className="btn btn-o">Get Directions</a></div></div></section>

    <section id="about" className="mx-auto mt-10 grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
      <div className="cut aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: 'url(/images/about.jpg),linear-gradient(135deg,#10263f,#9a6434)' }} />
      <div><h2 className="text-3xl font-medium">We Host Every Guest with Comfort and Care</h2><span className="line" />
        <p className="text-gray-600">Sundus Guest House is a family-friendly stay in Skardu, Gilgit-Baltistan, with parking, WiFi and a restaurant. It is a short drive from Chunda Valley and Soq Valley.</p>
        <ul className="mt-5 flex flex-wrap gap-2">{b.amenities.map(a => <li key={a} className="rounded-full border px-4 py-1 text-sm">{a}</li>)}</ul></div></section>

    <section className="bg-navy py-12 text-white"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 text-center md:grid-cols-4">
      {[['24 hrs', 'Open 24 hours'], [b.checkIn, 'Check-in / out'], ['1.9 km', 'To Chunda Valley'], ['WiFi', 'And parking']].map(([v, l]) => <div key={l} className="first:border-0 md:border-l md:border-white/15"><p className="font-head text-4xl font-semibold text-gold md:text-5xl">{v}</p><p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/70">{l}</p></div>)}</div></section>

    <section className="bg-sand py-24"><div className="mx-auto max-w-6xl px-5"><div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-clay">Why Sundus</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Why Stay With Us</h2></div>
      <div className="grid gap-6 md:grid-cols-3">{[['Family-Friendly', 'A calm, peaceful place for families and groups.'], ['Restaurant & Facilities', 'A restaurant, free WiFi and parking for guests.'], ['Near The Valleys', 'Chunda and Soq valleys are about 1.9 km away.']].map(([t, d], k) => <div key={t} className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"><span className="font-head text-6xl font-semibold text-gold/50">0{k + 1}</span><h3 className="mt-4 text-2xl font-semibold">{t}</h3><p className="mt-3 text-gray-600">{d}</p><span className="absolute inset-x-0 bottom-0 h-1 bg-gold" /></div>)}</div></div></section>

    <section id="rooms" className="mx-auto max-w-6xl px-5 py-20"><div className="mb-10 text-center"><h2 className="text-3xl font-medium">Rooms &amp; Facilities</h2><span className="line mx-auto" /><p className="text-gray-500">Ask us for current rates and availability.</p></div><Rooms /></section>

    <section className="bg-sand py-24"><div className="mx-auto max-w-6xl px-5"><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-clay">Around the Guest House</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Explore Skardu</h2></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{b.explore.map(p => <article key={p.name} className="relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl bg-cover bg-center p-5 text-white" style={bg(p.image, 'rgba(10,26,45,.05),rgba(10,26,45,.85)')}><div><h3 className="text-xl font-semibold leading-tight">{p.name}</h3><p className="mt-1 text-xs text-white/80">{p.note}</p></div></article>)}</div></div></section>

    <section id="video" className="bg-navy py-24 text-white"><div className="mx-auto max-w-6xl px-5"><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">Watch</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Take a Look Inside</h2><p className="mt-4 text-white/75">Short videos of the guest house and its surroundings.</p></div><VideoGallery /></div></section>

    <section className="bg-gold py-16 text-ink"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5"><div><h2 className="max-w-xl text-3xl font-semibold md:text-4xl">Ready for a peaceful stay in Skardu?</h2><p className="mt-2 text-ink/80">Call us or send an enquiry. We confirm availability and rate before you pay.</p></div><div className="flex flex-wrap gap-3"><a href="#contact" className="btn btn-n">Send Enquiry</a><a href={`tel:${b.phone}`} className="btn border border-ink text-ink hover:bg-ink hover:text-white">Call {b.phone}</a></div></div></section>

    <section id="gallery" className="mx-auto max-w-6xl px-5 pb-20"><div className="mb-8 max-w-xl"><h2 className="text-3xl font-medium">Gallery</h2><span className="line" /><p className="text-gray-600">A look at the guest house, its rooms and the surroundings. Tap a photo to enlarge it.</p></div><Gallery /></section>

    <section id="reviews" className="bg-sand py-20"><div className="mx-auto max-w-6xl px-5"><h2 className="text-3xl font-medium">Guest Reviews</h2><span className="line" /><Reviews /></div></section>

    <div className="bg-sand"><section id="location" className="foot-top bg-navy pb-20 pt-24 text-white"><div className="mx-auto max-w-6xl px-5">
      <div className="mb-10 max-w-xl"><h2 className="text-3xl font-medium">Find Us in Skardu</h2><span className="line" /><p className="text-white/75">We are in Sundus (Sondous), Skardu, close to Chunda and Soq valleys.</p></div>
      <div className="relative">
        <iframe title="Sundus Guest House Skardu on Google Maps" className="h-[420px] w-full rounded-2xl border-0 [filter:saturate(.8)_contrast(1.05)] md:ml-auto md:h-[520px] md:w-[76%]" loading="lazy" src={`https://www.google.com/maps?q=Sundus%20Guest%20House%20Skardu&ll=${b.geo.lat},${b.geo.lng}&z=16&output=embed`} />
        <div className="mt-4 rounded-2xl bg-white p-6 text-ink shadow-xl md:absolute md:left-0 md:top-1/2 md:mt-0 md:w-[40%] md:-translate-y-1/2">
          <div className="flex items-center gap-3"><img src="/images/logo.png" width="44" height="44" alt="" className="h-11 w-11 rounded-full" /><div><p className="font-head text-lg leading-tight">Sundus Guest House</p><p className="text-xs text-gray-500">Skardu, Gilgit-Baltistan</p></div></div>
          <p className="mt-4 text-sm text-gray-700">{b.address}</p><p className="text-xs text-gray-500">Plus code {b.plusCode}</p>
          <div className="mt-5"><Timings /></div>
          <ul className="mt-5 flex flex-wrap gap-2">{b.nearby.map(n => <li key={n.name} className="rounded-full bg-sand px-3 py-1 text-xs">{n.name} · {n.km} km</li>)}</ul>
          <div className="mt-6 flex flex-wrap gap-3"><a href={dir} target="_blank" rel="noopener" className="btn btn-p">Get Directions</a>{b.phone && <a href={`tel:${b.phone}`} className="btn border border-navy text-navy hover:bg-navy hover:text-white">Call</a>}</div>
        </div></div></div></section></div>

    <section id="faq" className="bg-white py-24"><div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-5">
      <div className="lg:col-span-2"><p className="text-sm font-semibold uppercase tracking-[.25em] text-clay">FAQ</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Questions? We have answers.</h2><p className="mt-4 text-gray-600">Cannot find what you need? Call us. Our Google listing shows we are open 24 hours.</p><a href={`tel:${b.phone}`} className="btn btn-p mt-6">Call {b.phone}</a></div>
      <div className="space-y-4 lg:col-span-3">{faqs.map(([q, a]) => <details key={q} className="group rounded-xl border border-gray-200 bg-sand p-6 open:border-gold open:bg-white open:shadow-md"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">{q}<span className="text-2xl text-clay transition group-open:rotate-45">+</span></summary><p className="mt-3 text-base text-gray-700">{a}</p></details>)}</div></div></section>

    <section id="contact" className="bg-sand py-20"><div className="mx-auto max-w-6xl px-5">
      <div className="mb-10 text-center"><h2 className="text-3xl font-medium">Plan Your Stay</h2><span className="line mx-auto" /><p className="text-gray-600">Tell us your dates and group size. We reply with availability and rate.</p></div>
      <div className="grid overflow-hidden rounded-xl bg-white shadow-sm lg:grid-cols-2">
        <div className="relative min-h-[380px] bg-cover bg-center text-white" style={bg('/images/contact.jpg', 'rgba(10,26,45,.25),rgba(10,26,45,.88)')}><div className="absolute inset-x-0 bottom-0 p-8">
          <ul className="space-y-3 text-sm"><li><span className="block text-white/60">Address</span>{b.address}</li><li><span className="block text-white/60">Check-in / Check-out</span>{b.checkIn} / {b.checkOut}</li>
            {b.phone && <li><span className="block text-white/60">Phone</span>{b.phone}</li>}{b.email && <li><span className="block text-white/60">Email</span>{b.email}</li>}</ul>
          <div className="mt-6 flex flex-wrap gap-3">{b.phone && <a href={`tel:${b.phone}`} className="btn btn-w">Call Now</a>}<a href={dir} target="_blank" rel="noopener" className={`btn ${b.phone ? 'btn-o' : 'btn-w'}`}>Get Directions</a></div></div></div>
        <div className="p-8"><h3 className="mb-5 text-xl font-medium">Send an enquiry</h3><ContactForm /></div></div></div></section>

    <footer className="bg-sand"><div className="foot-top bg-ink pb-8 pt-20 text-sm text-white/70"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4">
      <div><div className="flex items-center gap-3"><img src="/images/logo.png" width="64" height="64" alt="Sundus Guest House logo" className="h-16 w-16 rounded-full" /><p className="font-head text-xl text-white">SUNDUS<small className="block text-xs font-normal tracking-widest text-white/70">GUEST HOUSE</small></p></div><p className="mt-3">A family-friendly guest house in Skardu with a restaurant, parking and WiFi.</p></div>
      <div><p className="mb-3 font-medium text-white">Quick Links</p>{nav.map(([n, h]) => <a key={h} href={h} className="block py-0.5 hover:text-gold">{n}</a>)}</div>
      <div><p className="mb-3 font-medium text-white">Contact Info</p><p>{b.address}</p>{b.phone && <p className="mt-1">{b.phone}</p>}{b.email && <p className="mt-1">{b.email}</p>}</div>
      <div><p className="mb-3 font-medium text-white">Stay Details</p><p>Check-in: {b.checkIn}</p><p>Check-out: {b.checkOut}</p><a href={b.mapsUrl} target="_blank" rel="noopener" className="btn btn-o mt-4">Find us on Maps</a></div></div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-5 pt-6 text-xs"><p>© {new Date().getFullYear()} {b.name}. All rights reserved.</p><p>Built by <span className="text-gold">Asma Shahzadi</span></p></div></div></footer>
  </>)
}
