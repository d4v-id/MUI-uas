import { PrismaClient } from '@prisma/client';

export async function GET(request, { params }) {
  const prisma = new PrismaClient();
  const employeeId = params.employeeId;

  try {
    const employee = await prisma.user.findUnique({
      where: {
        id: parseInt(employeeId, 10),
      },
    });

    return Response.json({ success: true, employee });
  } catch (error) {
    console.error('Fetch Employee by ID:', error);
    return Response.json({ success: false, error: 'Failed to fetch employee' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function DELETE(request, { params }) {
  const prisma = new PrismaClient();
  // const body = await request.json();
  const employee = params.employeeId;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(employee, 10),
      },
    });

    return Response.json({ success: true, deletedUser });
  } catch (error) {
    console.error('Delete Employee:', error);
    return Response.json({ success: false, error: 'Failed to delete employee' });
  } finally {
    await prisma.$disconnect();
  }
}