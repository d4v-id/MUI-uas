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
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    const data = await response.json();
    return data;
}