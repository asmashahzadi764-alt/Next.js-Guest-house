import { NextResponse } from 'next/server'
import b from '@/data/business.json'
export const GET = () => NextResponse.json({ checkIn: b.checkIn, checkOut: b.checkOut, reception: b.reception })
