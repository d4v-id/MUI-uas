// api.ts

// 
// 
// EMPLOYEE API
// 
// 

// GET ALL

// export async function fetchEmployees() {
//   const response = await fetch('http://localhost:3000/api/users');
//   const data = await response.json();
//   return data.users;
// }

// GET SEARCH
export async function fetchEmployeesSearch(name?: string) {
  const url = `http://localhost:3000/api/users${name ? `?name=${name}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.users;
}


// GET BY ID
export async function fetchEmployeeById(employeeId: number) {
  const response = await fetch(`http://localhost:3000/api/users/employee/${employeeId}`);
  const data = await response.json();
  return data.employee;
}

interface EmployeeData {
  name: string;
  email: string;
  gender: string;
  handphone: string;
  job: string;
  address: string;
}

// POST
export async function addEmployee(employeeData: EmployeeData) {
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to add employee: ${errorMessage}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Add Employee:', error);
    throw new Error('Failed to add employee');
  }
}

// PUT
export async function updateEmployee(employeeId: number, updatedData: EmployeeData) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/employee/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to update employee: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Update Employee:', error);
    throw new Error('Failed to update employee');
  }
}


// DELETE
export async function deleteEmployee(employeeId: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/employee/${employeeId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to delete employee: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Delete Employee:', error);
    throw new Error('Failed to delete employee');
  }
}



// 
// 
// PRODUCT API
// 
// 

// GET SEARCH
export async function fetchProductssSearch(name?: string) {
  const url = `http://localhost:3000/api/storage${name ? `?name=${name}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.product;
}


// GET BY ID
export async function fetchProductById(productId: number) {
  const response = await fetch(`http://localhost:3000/api/storage/product/${productId}`);
  const data = await response.json();
  return data.product;
}

interface ProductData {
  name: string;
  class: string;
  brand: string;
  qty: string;
  price: string;
}

// POST
export async function addProduct(productData: ProductData) {
  try {
    const res = await fetch('http://localhost:3000/api/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to add product: ${errorMessage}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Add Product:', error);
    throw new Error('Failed to add product');
  }
}

// PUT
export async function updateProduct(productId: number, updatedData: ProductData) {
  try {
    const res = await fetch(`http://localhost:3000/api/storage/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to update product: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Update Product:', error);
    throw new Error('Failed to update product');
  }
}


// DELETE
export async function deleteProduct(productId: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/employee/${productId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Message: ${errorMessage}`);
      throw new Error(`Failed to delete product: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Delete Product:', error);
    throw new Error('Failed to delete product');
  }
}