import b from '@/data/business.json'
import { Rooms, Reviews, Timings, ContactForm } from '@/components/Dynamic'
const bg = (u: string, c = 'rgba(0,0,0,.6),rgba(0,0,0,.7)') => ({ backgroundImage: `linear-gradient(${c}),url(${u}),linear-gradient(135deg,#1b1b1d,#4a3d22)` })
const nav = [['About', '#about'], ['Rooms', '#rooms'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Location', '#location'], ['Contact', '#contact']]
const faqs = [['What are check-in and check-out times?', `Check-in is at ${b.checkIn} and check-out is at ${b.checkOut}.`], ['Is parking and WiFi available?', 'Yes, parking, WiFi and a restaurant are listed for the guest house.'], ['How do I book?', 'Send an enquiry below or call us. We confirm availability and rate before you pay.'], ['What is nearby?', b.nearby.map(n => `${n.name} (${n.km} km)`).join(', ') + '.']]
const ld = { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: b.name, address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.city, addressRegion: b.region, addressCountry: b.country }, geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng }, checkinTime: b.checkIn, checkoutTime: b.checkOut, hasMap: b.mapsUrl, amenityFeature: b.amenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })), aggregateRating: { '@type': 'AggregateRating', ratingValue: b.rating, reviewCount: b.reviewCount }, ...(b.phone ? { telephone: b.phone } : {}) }
export default function Home() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <header className="absolute inset-x-0 top-0 z-20 text-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <a href="#" className="font-head text-xl font-semibold"><span className="text-gold">▼</span> SUNDUS</a>
      <nav className="hidden gap-7 text-sm md:flex">{nav.map(([n, h]) => <a key={h} href={h} className="hover:text-gold">{n}</a>)}</nav>
      <a href="#contact" className="btn btn-w">Book a Stay</a></div></header>

    <section className="hero relative bg-cover bg-center pb-44 pt-40 text-center text-white" style={bg('/images/hero.jpg')}>
      <div className="wedge left-0 top-[38%] h-[26%] w-[14%] [clip-path:polygon(0_0,100%_55%,0_100%)]" /><div className="wedge right-0 top-[22%] h-[32%] w-[14%] [clip-path:polygon(100%_0,100%_100%,0_70%)]" />
      <div className="relative mx-auto max-w-3xl px-5"><h1 className="text-4xl font-medium leading-tight md:text-6xl">A Peaceful Stay in the Heart of Skardu</h1>
        <p className="mx-auto mt-5 max-w-xl text-white/80">Sundus Guest House: family-friendly rooms, a restaurant and easy access to Chunda and Soq valleys.</p>
        <div className="mt-8 flex justify-center gap-3"><a href="#rooms" className="btn btn-w">View Rooms</a><a href="#contact" className="btn btn-o">Contact Us</a></div></div></section>

    <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
      <div className="cut aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: 'url(/images/about.jpg),linear-gradient(135deg,#2a2a2d,#6b5a2e)' }} />
      <div><h2 className="text-3xl font-medium">We Host Every Guest with Comfort and Care</h2><span className="line" />
        <p className="text-gray-600">Sundus Guest House is a family-friendly stay in Skardu, Gilgit-Baltistan, with parking, WiFi and a restaurant. It is a short drive from Chunda Valley and Soq Valley.</p>
        <ul className="mt-5 flex flex-wrap gap-2">{b.amenities.map(a => <li key={a} className="rounded-full border px-4 py-1 text-sm">{a}</li>)}</ul></div></section>

    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 pb-20 text-center md:grid-cols-4">
      {[[String(b.rating), 'Google rating'], [`${b.reviewCount}+`, 'Google reviews'], [b.checkIn, 'Check-in / out'], ['1.9 km', 'To Chunda Valley']].map(([v, l]) => <div key={l} className="md:border-l first:border-0"><p className="font-head text-4xl">{v}</p><p className="text-sm text-gray-500">{l}</p></div>)}</section>

    <section className="bg-sand py-20"><div className="mx-auto max-w-6xl px-5"><h2 className="text-3xl font-medium">Why Stay With Us</h2><span className="line" />
      <div className="grid gap-6 md:grid-cols-3">{[['Family-Friendly', 'A calm place for families and groups.'], ['Restaurant On Site', 'Meals without leaving the guest house.'], ['Near The Valleys', 'Chunda and Soq valleys are about 1.9 km away.']].map(([t, d]) => <div key={t} className="bg-white p-6 shadow-sm"><h3 className="text-lg font-medium">{t}</h3><p className="mt-2 text-sm text-gray-600">{d}</p></div>)}</div></div></section>

    <section id="video" className="bg-cover bg-center py-24 text-center text-white" style={bg('/images/video-poster.jpg')}>
      <div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-medium">Take a Look Inside</h2><span className="line mx-auto" />
        <video className="mt-6 w-full bg-black" controls preload="none" poster="/images/video-poster.jpg"><source src="/videos/tour.mp4" type="video/mp4" /></video></div></section>

    <section id="rooms" className="mx-auto max-w-6xl px-5 py-20"><div className="mb-10 text-center"><h2 className="text-3xl font-medium">Our Rooms</h2><span className="line mx-auto" /><p className="text-gray-500">Ask us for current rates and availability.</p></div><Rooms /></section>

    <section id="gallery" className="mx-auto max-w-6xl px-5 pb-20"><h2 className="text-3xl font-medium">Gallery</h2><span className="line" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className={`bg-cover bg-center ${i === 1 || i === 6 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`} style={{ backgroundImage: `url(/images/gallery-${i}.jpg),linear-gradient(135deg,#2a2a2d,#6b5a2e)` }} />)}</div></section>

    <section id="reviews" className="bg-sand py-20"><div className="mx-auto max-w-6xl px-5"><h2 className="text-3xl font-medium">Guest Reviews</h2><span className="line" /><Reviews /></div></section>

    <section id="location" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
      <div><h2 className="text-3xl font-medium">Location &amp; Timings</h2><span className="line" /><p className="mb-6 text-gray-600">{b.address} · Plus code {b.plusCode}</p><Timings />
        <h3 className="mb-2 mt-8 font-medium">Nearby</h3><ul className="text-sm text-gray-600">{b.nearby.map(n => <li key={n.name}>{n.name} · {n.km} km</li>)}</ul></div>
      <iframe title="Sundus Guest House Skardu on Google Maps" className="h-80 w-full border-0" loading="lazy" src={`https://www.google.com/maps?q=${b.geo.lat},${b.geo.lng}&z=15&output=embed`} /></section>

    <section className="mx-auto max-w-3xl px-5 pb-20"><h2 className="text-3xl font-medium">FAQ</h2><span className="line" />
      {faqs.map(([q, a]) => <details key={q} className="border-b py-4"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-gray-600">{a}</p></details>)}</section>

    <section id="contact" className="bg-cover bg-center py-20 text-white" style={bg('/images/contact.jpg', 'rgba(0,0,0,.75),rgba(0,0,0,.8)')}>
      <div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-medium">Get a Special Offer By Contacting Us</h2><span className="line" /><p className="mb-6 text-white/70">Tell us your dates and group size. We reply with availability and rate.</p><ContactForm />
        {b.phone && <a href={`tel:${b.phone}`} className="btn btn-o mt-6">Call {b.phone}</a>}</div></section>

    <footer className="bg-ink py-10 text-sm text-white/70"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-5">
      <div><p className="font-head text-lg text-white"><span className="text-gold">▼</span> SUNDUS</p><p className="mt-2 max-w-xs">{b.address}</p></div>
      <div><p className="mb-2 text-white">Quick Links</p>{nav.map(([n, h]) => <a key={h} href={h} className="block hover:text-gold">{n}</a>)}</div>
      <a href={b.mapsUrl} target="_blank" rel="noopener" className="hover:text-gold">Find us on Google Maps</a></div>
      <p className="mt-8 text-center text-xs">© {new Date().getFullYear()} {b.name}</p></footer>
  </>)
}
