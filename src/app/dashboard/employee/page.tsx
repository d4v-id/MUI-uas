"use client"
import { AppBar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuApp from '@/app/components/MenuApp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { fetchEmployees } from '@/app/components/api';

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface EmployeePageProps {
  employees: Employee[] | undefined;
}

export default function EmployeePage({ employees }: EmployeePageProps) {

  const [data, setData] = useState<Employee[] | undefined>(employees);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await fetchEmployees();
        setData(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!data) {
      fetchData();
    }

  }, [data]);

  if (!data || !Array.isArray(data)) {
    return <div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </div>;
  }

  console.log(data);

  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 h-screen  '>
      <div className='flex bg-white w-full'>
        <MenuApp />
        <div className='flex items-center justify-center w-full text-center text-black'>
          <span className='inline-block tracking-wider'>SMG-DP</span>
          <span className='mx-2'>&#8226;</span>
          <span className='inline-block tracking-wider'>Pegawai</span>
        </div>
      </div>
      <div className='p-8'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className='text-lg uppercase'>
                <TableCell className='font-semibold tracking-wider'>Name</TableCell>
                <TableCell className='font-semibold tracking-wider'>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
