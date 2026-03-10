import { NextResponse } from "next/server";

export async function GET() {
  try {
    const EPRINTS_API_URL = "http://universityrepo.local/cgi/latest_tool?output=JSON";

    const response = await fetch(EPRINTS_API_URL, {
      headers: {
        "Accept": "application/json",
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      console.error(`EPrints responded with status: ${response.status}`);
      throw new Error(`EPrints server error: ${response.statusText}`);
    }

    const data = await response.json();

    const rawItems = Array.isArray(data) ? data : [data];

    const formattedSubmissions = rawItems.map((item: any) => {
      const authorName = item.creators?.[0]?.name 
        ? `${item.creators[0].name.family}, ${item.creators[0].name.given.charAt(0)}.`
        : "Institutional Author";

      return {
        id: item.eprintid || Math.random(),
        title: item.title || "Untitled Research",
        author: authorName,
        dept: item.divisions?.[0] || "University General",
        date: item.datestamp ? item.datestamp.split(" ")[0] : "Recently",
        type: item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "Article"
      };
    });

    return NextResponse.json(formattedSubmissions);

  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error.message);
    
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}