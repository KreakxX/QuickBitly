import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { PrismaClient } from "../../../generated/prisma";
import jwt from 'jsonwebtoken';


export async function GET(req: Request){

  try{      const prisma = new PrismaClient()
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
  where: { username: decoded.username },
  include: { links: true }
});
        if(!user){
             return NextResponse.json({ success: false }, { status: 400 });
        }
        const links = user.links
        return NextResponse.json({links})
        
  }catch(error){
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });

  }

}