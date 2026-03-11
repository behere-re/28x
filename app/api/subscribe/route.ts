import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid email' },
        { status: 400 },
      )
    }

    // Placeholder: hook into loops.so or another email provider here.
    // Example shape:
    // await fetch('https://app.loops.so/api/v1/contacts/create', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    //   },
    //   body: JSON.stringify({ email }),
    // })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to process subscription' },
      { status: 500 },
    )
  }
}

