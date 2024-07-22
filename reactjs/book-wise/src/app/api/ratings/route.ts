import { getRatings } from "@/lib/api/get-ratings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const pageParam = params.get("page");

  if (pageParam && Number.isNaN(pageParam))
    return NextResponse.json({ message: "Invalid page." }, { status: 404 });

  const page = pageParam ? Number(pageParam) : 1;

  const ratings = await getRatings({ page });

  return NextResponse.json(ratings);
}
