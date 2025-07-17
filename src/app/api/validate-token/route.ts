import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { PrismaClient } from "../../../generated/prisma";
import jwt from 'jsonwebtoken';


export async function GET(req: Request) {

  try{
    const CS = await cookies();
    const token = CS.get("jwtToken")?.value; 

    if(!token){
        return NextResponse.json({ success: false}, { status: 400 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");
    if (!decoded || typeof decoded === "string") {
            return NextResponse.json({decoded, success: false });
        }
    return NextResponse.json({ decoded, success:true })

  }catch(error){
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });

  }
}