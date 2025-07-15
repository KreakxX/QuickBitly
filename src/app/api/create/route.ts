import { NextResponse } from 'next/server'
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { url } = body

        const shortLink = Math.random().toString(36).substr(2, 8);
        await prisma.link.create({
            data:{
                ref_link: url,
                Short_Link: shortLink
            },
        })
        return NextResponse.json({ shortLink })
    } catch (e){
        return NextResponse.json({ success: false}, { status: 400 })
    }
    
}
