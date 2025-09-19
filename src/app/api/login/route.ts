import { NextResponse } from "next/server"

const dummyUser = {
  email: "danixsofyan@gmail.com",
  password: "123qweasd",
}

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (email === dummyUser.email && password === dummyUser.password) {
    const response = NextResponse.json({ success: true })
    response.cookies.set("token", "dummy-jwt-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    })
    return response
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  )
}
