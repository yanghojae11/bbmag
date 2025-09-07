// src/app/api/community/stats/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // API 호출 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 300))

  const stats = {
    totalPosts: 1247,
    todayPosts: 12,
    activeUsers: 2847,
    todayComments: 156
  }

  return NextResponse.json(stats)
}