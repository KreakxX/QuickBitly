import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { PrismaClient } from "../../../generated/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;


      const user = await prisma.user.findUnique({
        where: {
          username: username
        }})
      const secret = process.env.JWT_SECRET || "123";

      if (user && await bcrypt.compare(password, user.password)) {
        const CS = await cookies();
        var token = jwt.sign({ username: username}, secret);
        await CS.set('jwtToken',token,{secure: true, httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7}); 

        return NextResponse.json({ success: true, message: "Login successful" }); 
      }else{
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
      }
      
}catch(error){                                                                            
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}

