import EmployeePage from '@/app/dashboard/employee/page';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  return Response.json({ users })
  // return <EmployeePage employees={users}></EmployeePage>
}

export async function POST(request) {
  const prisma = new PrismaClient();
  const body = JSON.parse(request.body);
  
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        gender: body.gender,
        handpnone: body.handpnone,
        job: body.job,
        address: body.address,
      },
    });

    return Response.json({ success: true, employee: newUser });
  } catch (error) {
    console.error('Create Employee:', error);
    return Response.json({ success: false, error: 'Failed to create employee' });
  } finally {
    await prisma.$disconnect();
  }
}
