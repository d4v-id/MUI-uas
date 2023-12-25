import EmployeePage from '@/app/dashboard/employee/page';
import { PrismaClient } from '@prisma/client';


export async function GET(request) {
  const prisma = new PrismaClient();

  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('name')
    let product;

    if (query) {
      product = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
          },
        },
      });
    } else {
      product = await prisma.product.findMany();
    }
    console.log(product);
    return Response.json({ product });
    
  } catch (error) {
    console.error('Get Products:', error);
    return Response.json({ success: false, error: 'Failed to fetch products' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function POST(request) {
  const prisma = new PrismaClient();
  const body = await request.json();

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        class: body.class,
        brand: body.brand,
        qty: body.qty,
        price: body.price,
      },
    });

    return Response.json({ success: true, employee: newProduct });
  } catch (error) {
    console.error('Create Product:', error);
    return Response.json({ success: false, error: 'Failed to create product' });
  } finally {
    await prisma.$disconnect();
  }
}

