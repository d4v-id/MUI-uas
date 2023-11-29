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
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { addEmployee, fetchEmployees } from '@/app/components/api';


interface Employee {
  id: number;
  name: string;
  email: string;
  gender: string;
  handphone: string;
  job: string;
  address: string;
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '', 
    handphone: '', 
    job: '',
    address: '',
  });

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

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



  // const [gender, setGender] = React.useState('');
  const handleChangeGender = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      gender: event.target.value as string,
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeJob = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      job: event.target.value as string,
    });
  };

  const handleSubmit = async () => {
    const response = await addEmployee(formData);
    console.log(response);
    handleCloseAdd();
  };




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
          <Button onClick={handleOpenAdd} variant="contained" className='bg-blue-500 shadow' startIcon={<AddIcon />}>
            Tambah
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAdd}
            onClose={handleCloseAdd}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openAdd}>
              <Box sx={style}>
                <div className='flex items-center'>
                  <Typography id="transition-modal-title" variant="h6" component="h2" className='text-black justify-center mb-4'>
                    Tambah Data Pegawai
                  </Typography>
                </div>

                {/* Form */}
                <div className='flex w-full mb-4'>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    label="Nama"
                    variant="outlined"
                    sx={{ mr: 2 }}
                    className='w-full'
                    value={formData.name}
                    onChange={handleChangeInput}
                  />
                  <TextField
                    id="outlined-basic"
                    name="email"
                    label="Email"
                    variant="outlined"
                    className='w-full'
                    value={formData.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='flex w-full mb-4'>
                  <FormControl fullWidth sx={{ mr: 2 }}>
                    <InputLabel id="demo-simple-select-label">Jenis Kelamin</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="gender"
                      value={formData.gender}
                      label="Jenis Kelamin"
                      onChange={handleChangeGender}
                    >
                      <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                      <MenuItem value="Perempuan">Perempuan</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    name="handphone"
                    label="No.HP"
                    variant="outlined"
                    className='w-full'
                    value={formData.handphone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='flex w-full'>
                  <TextField
                    id="outlined-basic"
                    name="address"
                    label="Alamat"
                    variant="outlined"
                    className='w-full'
                    value={formData.address}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='mt-4 flex w-full'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Jenis Pekerjaan</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="job"
                      value={formData.job}
                      label="Jenis Pekerjaan"
                      onChange={handleChangeJob}
                    >
                      <MenuItem value="LOGISTIK">Logistik</MenuItem>
                      <MenuItem value="DISTRIBUSI">Distribusi</MenuItem>
                      <MenuItem value="MARKETING">Marketing</MenuItem>
                      <MenuItem value="STAFF">Staff</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className='flex justify-center'>
                  <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Button onClick={handleCloseAdd} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
                    <Button variant="contained" color='success' className='bg-green-600'>Submit</Button>
                  </Stack>
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>



        {/* TABEL */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: 'gray' }} className='text-lg uppercase bg-gray-200'>
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
                        <IconButton onClick={handleOpenDelete} aria-label="delete" color='error' >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openDelete}
                        onClose={handleCloseDelete}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={openDelete}>
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
                              <Button onClick={handleCloseDelete} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
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
