import { NextResponse } from 'next/server'
import { PrismaClient } from "../../generated/prisma";
import { NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const link = await prisma.link.findUnique({
      where: { Short_Link: id },
    });

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    return NextResponse.redirect(link.ref_link);
  } catch (error) {
    console.error('Error fetching link:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}