import { PrismaClient } from '@prisma/client';

export async function GET(request, { params }) {
  const prisma = new PrismaClient();
  const productId = params.productId;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId, 10),
      },
    });

    return Response.json({ success: true, product });
  } catch (error) {
    console.error('Fetch Product by ID:', error);
    return Response.json({ success: false, error: 'Failed to fetch product' });
  } finally {
    await prisma.$disconnect();
  }
}



export async function PUT(request, { params }) {
  const prisma = new PrismaClient();
  const productId = params.productId;
  const body = await request.json(); 
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(productId, 10),
      },
      data: body,
    });

    return Response.json({ success: true, updatedProduct });
  } catch (error) {
    console.error('Update Product:', error);
    return Response.json({ success: false, error: 'Failed to update product' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function DELETE(request, { params }) {
  const prisma = new PrismaClient();
  // const body = await request.json();
  const product = params.productId;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(product, 10),
      },
    });

    return Response.json({ success: true, deletedProduct });
  } catch (error) {
    console.error('Delete Product:', error);
    return Response.json({ success: false, error: 'Failed to delete product' });
  } finally {
    await prisma.$disconnect();
  }
}