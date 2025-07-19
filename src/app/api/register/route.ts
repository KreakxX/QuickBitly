import { NextResponse } from 'next/server'
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()

export async function POST(req: Request) {
  
  try{
      const body = await req.json()
      const {username,password} = body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data:{
          username: username,
          password: hashedPassword
        }
      })
      return NextResponse.json({ success: true, message: "Login successful" }); 

  }catch(error){
    return NextResponse.json({ success: false}, { status: 400 })
  }

}