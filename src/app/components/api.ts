// api.ts

// GET
export async function fetchEmployees() {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    return data.users;
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