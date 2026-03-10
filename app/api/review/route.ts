import { NextResponse } from "next/server";

export async function GET() {
  try {
    const BUFFER_URL = "http://universityrepo.local/cgi/users/home?screen=Review";

    const username = "admin";
    const password = "h13052004"; 
    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    const response = await fetch(BUFFER_URL, {
      headers: {
        "Authorization": `Basic ${auth}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) throw new Error(`Access Denied: ${response.status}`);

    const html = await response.text();
    const idMatches = [...html.matchAll(/eprintid=(\d+)/g)];
    const titleMatches = [...html.matchAll(/<span class="ep_description">(.*?)<\/span>/g)];
    const formattedBuffer = idMatches.map((match, index) => {
      const id = match[1];
      const rawTitle = titleMatches[index]?.[1] || "Research Output #" + id;
      const cleanTitle = rawTitle.replace(/<[^>]*>/g, '').trim();

      return {
        id: id,
        title: cleanTitle,
        user: "Staff Account", 
        status: "Pending Review",
        date: "2026-02-23" 
      };
    });
    const uniqueBuffer = Array.from(new Map(formattedBuffer.map(item => [item.id, item])).values());

    if (uniqueBuffer.length === 0) {
      console.log("Scraper found 0 items. Check if the admin user actually has items in 'Review'.");
      return NextResponse.json([]);
    }

    return NextResponse.json(uniqueBuffer);

  } catch (error: any) {
    console.error("SCRAPER CRASH:", error.message);
    return NextResponse.json([
      { id: "OFFLINE", title: "Server connected but data hidden. Check credentials.", user: "System", status: "Error", date: "2026" }
    ]);
  }
}