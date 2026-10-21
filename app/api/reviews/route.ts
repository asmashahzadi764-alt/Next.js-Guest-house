import { NextResponse } from 'next/server'
import b from '@/data/business.json'
export const GET = () => NextResponse.json({ rating: b.rating, count: b.reviewCount, mapsUrl: b.googleReviewsUrl || b.mapsUrl, items: b.reviews })
