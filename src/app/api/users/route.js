import EmployeePage from '@/app/dashboard/employee/page';
import { PrismaClient } from '@prisma/client';

// export async function GET() {
//   const prisma = new PrismaClient();
//   try {
//     const users = await prisma.user.findMany();
//     console.log(users);
//     return Response.json({ users });
//     // return <EmployeePage employees={users}></EmployeePage>
//   } catch (error) {
//     console.error('Get Employees:', error);
//     return Response.json({ success: false, error: 'Failed to fetch employees' });
//   }
// }

export async function GET(request) {
  const prisma = new PrismaClient();

  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('name')
    let users;

    if (query) {
      users = await prisma.user.findMany({
        where: {
          name: {
            contains: query,
          },
        },
      });
    } else {
      users = await prisma.user.findMany();
    }
    console.log(users);
    return Response.json({ users });
    
  } catch (error) {
    console.error('Get Employees:', error);
    return Response.json({ success: false, error: 'Failed to fetch employees' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function POST(request) {
  const prisma = new PrismaClient();
  const body = await request.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        gender: body.gender,
        handphone: body.handphone,
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

