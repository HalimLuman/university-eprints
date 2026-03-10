import { NextResponse } from "next/server";

export async function GET() {
  const USER_DEPOSITS_URL = "http://universityrepo.local/cgi/exportview/my_deposits/JSON/";
  const auth = Buffer.from("admin:h13052004").toString("base64");

  try {
    const res = await fetch(USER_DEPOSITS_URL, {
      headers: { "Authorization": `Basic ${auth}` },
      cache: 'no-store'
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json([{ id: '1', title: 'Sample: Quantum Computing', status: 'In Review' }]);
  }
}