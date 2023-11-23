"use client"
import { AppBar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuApp from '@/app/components/MenuApp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';
import { fetchEmployees } from '@/app/components/api';

interface Employee {
  id: number;
  name: string;
  email: string;
  job: string;
}


interface EmployeePageProps {
  employees: Employee[] | undefined;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

export default function EmployeePage({ employees }: EmployeePageProps) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <div className='flex w-full mb-4'>
          <Button variant="contained" className='bg-blue-500 shadow' startIcon={<AddIcon />}>
            Tambah
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: 'gray'}} className='text-lg uppercase bg-gray-200'>
                <TableCell className='font-semibold tracking-wider'>Name</TableCell>
                <TableCell className='font-semibold tracking-wider'>Email</TableCell>
                <TableCell className='font-semibold tracking-wider'>Job</TableCell>
                <TableCell className='font-semibold tracking-wider'>Actions</TableCell>
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
                  <TableCell style={{ padding: '6px' }}>{row.email}</TableCell>
                  <TableCell style={{ padding: '6px' }} className='uppercase'>{row.job}</TableCell>
                  <TableCell align='right' style={{ padding: '6px', textAlign: 'right' }}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Detail">
                        <IconButton aria-label="info" color="primary">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit" color="success">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus">
                        <IconButton onClick={handleOpen} aria-label="delete" color='error' >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                            <div className='flex items-center'>
                              <WarningAmberIcon color='error' fontSize='large' />
                              <Typography id="transition-modal-title" sx={{ ml: 2 }} variant="h6" component="h2" className='text-black'>
                                Apakah anda yakin?
                              </Typography>
                            </div>
                            <Typography id="transition-modal-description" sx={{ mt: 1 }} className='text-gray-700'>
                              Menghapus data pegawai dengan nama `<span className='font-bold '>{row.name}</span>`
                            </Typography>
                            <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                              <Button onClick={handleClose} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
                              <Button variant="contained" color='error' className='bg-red-600'>Hapus</Button>
                            </Stack>
                          </Box>
                        </Fade>
                      </Modal>
                    </Stack>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
