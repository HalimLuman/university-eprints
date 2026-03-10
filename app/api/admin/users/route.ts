import { NextResponse } from "next/server";

export async function GET() {
  // EPrints internal user search
  const USERS_URL = "http://universityrepo.local/rest/user"; 
  const auth = Buffer.from("admin:h13052004").toString("base64");

  try {
    const res = await fetch(USERS_URL, {
      headers: { "Authorization": `Basic ${auth}`, "Accept": "application/json" }
    });
    const data = await res.json();
    return NextResponse.json(data.items || []);
  } catch {
    return NextResponse.json([{ username: 'jdoe', dept: 'CS', role: 'Editor' }]);
  }
}