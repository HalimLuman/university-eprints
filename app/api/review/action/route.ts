import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {eprintid, action } = await req.json();
    const username = "admin";
    const password = "h13052004";
    const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

    const actionRes = await fetch("http://universityrepo.local/cgi/users/home?screen=Review", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action,
        dataset: "buffer",
        eprintid: String(eprintid),
      }),
    });

    if (!actionRes.ok) {
      return NextResponse.json({ error: "Action rejected" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
