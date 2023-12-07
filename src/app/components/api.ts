// api.ts

// GET ALL
export async function fetchEmployees() {
  const response = await fetch('http://localhost:3000/api/users');
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