import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { PrismaClient } from "../../../generated/prisma";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try{
      const body = await req.json()
      const {username, password} = body;

      const user = await prisma.user.findUnique({
        where: {
          username: username,
          password: password
        }})
        
      if (user) {
        return NextResponse.json({ success: true, message: "Login successful" }); 
      }else{
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
      }
      
  }catch(error){
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}

