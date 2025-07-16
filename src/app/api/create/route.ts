import { NextResponse } from 'next/server'
import { PrismaClient } from "../../../generated/prisma";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { url } = body
        
        const CS = await cookies();
        const token = CS.get("jwtToken")?.value;

        if(!token){
            return NextResponse.json({ success: false}, { status: 400 })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");
        if (!decoded || typeof decoded === "string") {
                return NextResponse.json({ success: false }, { status: 400 });

            }

        const user = await prisma.user.findUnique({
            where: {username: decoded.username

    }});
    if(!user){
         return NextResponse.json({ success: false }, { status: 400 });
    }

        const shortLink = Math.random().toString(36).substr(2, 8);
        await prisma.link.create({
            data:{
                ref_link: url,
                Short_Link: shortLink,
                userId: user.username, 
            },
        })
        return NextResponse.json({ shortLink })
    } catch (e){
        return NextResponse.json({ success: false}, { status: 400 })
    }
    
}
