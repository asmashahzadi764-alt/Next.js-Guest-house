import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const d = await req.json().catch(() => null)
  if (!d || typeof d.name !== 'string' || d.name.trim().length < 2 || typeof d.phone !== 'string' || d.phone.trim().length < 7)
    return NextResponse.json({ ok: false, error: 'Please enter your name and phone number.' }, { status: 400 })
  console.log('New enquiry:', { name: d.name, phone: d.phone, checkIn: d.checkIn, checkOut: d.checkOut, guests: d.guests, message: d.message })
  return NextResponse.json({ ok: true })
}
