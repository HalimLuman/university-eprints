import { NextResponse } from "next/server";

export async function GET() {
  try {
    const browseData = {
      years: ["2026", "2025", "2024", "2023", "2022", "2021"],
      subjects: [
        "Computer Science",
        "Information Systems",
        "Digital Communication",
        "Machine Learning",
        "Software Engineering",
        "Network Security"
      ],
      divisions: [
        "Faculty of Computer Science and Engineering",
        "Faculty of Communication Networks",
        "Faculty of Information Systems",
        "Doctoral School"
      ]
    };

    return NextResponse.json(browseData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate browse index" }, { status: 500 });
  }
}