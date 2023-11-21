// import React from 'react'
import EmployeePage from '@/app/dashboard/employee/page';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  return Response.json({ users })
  // return <EmployeePage employees={users}></EmployeePage>
}
