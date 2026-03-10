import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

    const eprintsRes = await fetch("http://universityrepo.local/cgi/users/login?target=http%3A%2F%2Funiversityrepo.local%2Fcgi%2Fusers%2Fhome", {
      method: "GET",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
      },
    });

    if (!eprintsRes.ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const html = await eprintsRes.text();

    return NextResponse.json({ username, role: "authenticated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
