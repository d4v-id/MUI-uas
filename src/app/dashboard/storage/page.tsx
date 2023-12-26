"use client"
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { AppBar, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuApp from '@/app/components/MenuApp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
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
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import { addProduct, deleteProduct, fetchProductById, fetchProductssSearch, updateProduct } from '@/app/components/api';


interface Product {
  id: number;
  name: string;
  class: string;
  brand: string;
  qty: string;
  price: string;
}
interface ProductPageProps {
  products: Product[] | undefined;
}
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
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


const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="Rp."
      />
    );
  },
);

const FormattedPrice: React.FC<{ value: string }> = ({ value }) => (
  <NumericFormat
    value={value}
    displayType="text"
    thousandSeparator
    valueIsNumericString
    prefix="Rp."
  />
);







export default function StoragePage({ products }: ProductPageProps) {

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    brand: '',
    qty: '',
    price: '',
  });

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  // DETAIL
  const [selectedProductDetails, setselectedProductDetails] = React.useState<Product | null>(null);
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleOpenDetail = async (product: Product) => {
    try {
      const details = await fetchProductById(product.id);
      setselectedProductDetails(details);
      setOpenDetail(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  const handleCloseDetail = () => {
    setselectedProductDetails(null);
    setOpenDetail(false);
  };



  // EDIT
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = async (product: Product) => {
    try {
      const details = await fetchProductById(product.id);
      setFormData({
        name: details.name,
        class: details.class,
        brand: details.brand,
        qty: details.qty,
        price: details.price,
      });
      setselectedProductDetails(details);
      setOpenEdit(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  const handleCloseEdit = () => {
    setselectedProductDetails(null);
    setOpenEdit(false);
    setFormData({
      name: '',
      class: '',
      brand: '',
      qty: '',
      price: '',
    });
  };
  const handleSubmitEdit = async () => {
    try {
      if (selectedProductDetails) {
        await updateProduct(selectedProductDetails.id, formData);
        handleCloseEdit();
        setFormData({
          name: '',
          class: '',
          brand: '',
          qty: '',
          price: '',
        });
      }
      setFetchDataTrigger(true);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };



  // DELETE
  const [selectedProduct, setselectedProduct] = React.useState<Product | null>(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = (product: Product) => {
    setselectedProduct(product);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setselectedProduct(null);
    setOpenDelete(false);
  };
  const handleDeleteProduct = async () => {
    try {
      if (selectedProduct) {
        await deleteProduct(selectedProduct.id);
      }
      setFetchDataTrigger(true);
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };




  const [searchQuery, setSearchQuery] = useState<string>('');

  const [data, setData] = useState<Product[] | undefined>(products);
  const [fetchDataTrigger, setFetchDataTrigger] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProductssSearch(searchQuery)
        // : await fetchEmployees();
        setData(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // if (!data) {
    //   fetchData();
    // }
    if (fetchDataTrigger) {
      fetchData();
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger]);


  if (!data || !Array.isArray(data)) {
    return <div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </div>;
  }
  console.log(data);



  // const [gender, setGender] = React.useState('');
  const handleChangeClass = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      class: event.target.value as string,
    });
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      qty: event.target.value,
    });
  };
  const handleIncrement = () => {
    setFormData({
      ...formData,
      qty: String(parseInt(formData.qty, 10) + 1),
    });
  };

  const handleDecrement = () => {
    const newQty = Math.max(0, parseInt(formData.qty, 10) - 1);
    setFormData({
      ...formData,
      qty: String(newQty),
    });
  };
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      price: event.target.value as string,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await addProduct(formData);
      console.log(response);
      setFetchDataTrigger(true);
      handleCloseAdd();
    }
    catch (error) {
      console.error('Handle Submit Error:', error);
    }
  };





  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 h-screen  '>
      <div className='flex bg-white w-full'>
        <MenuApp />
        <div className='flex items-center justify-center w-full text-center text-black'>
          <span className='inline-block tracking-wider'>SMG-DP</span>
          <span className='mx-2'>&#8226;</span>
          <span className='inline-block tracking-wider'>Penyimpanan</span>
        </div>
      </div>
      <div className='p-8'>
        <div className='flex w-full justify-between mb-4'>


          <Button onClick={handleOpenAdd} variant="contained" className='bg-blue-500 shadow' startIcon={<AddIcon />}>
            Tambah
          </Button>
          <TextField
            label="Search"
            size='small'
            className='bg-white text-black rounded'
            variant="filled"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setFetchDataTrigger(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
                    Tambah Data Produk
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
                    name="brand"
                    label="Merek"
                    variant="outlined"
                    className='w-full'
                    value={formData.brand}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='flex w-full mb-4'>
                  <FormControl fullWidth sx={{ mr: 2 }}>
                    <InputLabel id="demo-simple-select-label">Jenis Kelas</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="class"
                      value={formData.class}
                      label="Jenis Kelamin"
                      onChange={handleChangeClass}
                    >
                      <MenuItem value="Small">Small</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Heavy">Heavy</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>

                    <TextField
                      label="Harga Per Jumlah"
                      value={formData.price}
                      onChange={handleChangePrice}
                      name="numberformat"
                      id="formatted-numberformat-input"
                      InputProps={{
                        inputComponent: NumericFormatCustom as any,
                      }}
                      variant="outlined"
                    />
                  </FormControl>

                </div>
                <div className='flex w-full'>
                  <FormControl fullWidth>
                    <label className="block mb-1 text-base  text-gray-600">Jumlah (Qty):</label>
                    <div className="relative flex items-center">
                      <button
                        type="button"
                        id="decrement-button"
                        onClick={handleDecrement}
                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                        placeholder="0"
                        value={formData.qty}
                        onChange={handleChangeQty}
                        required />
                      <button
                        type="button"
                        id="increment-button"
                        onClick={handleIncrement}
                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </FormControl>
                </div>
                <div className='flex justify-center'>
                  <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Button onClick={handleCloseAdd} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
                    <Button onClick={handleSubmit} variant="contained" color='success' className='bg-green-600'>Submit</Button>
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
                <TableCell className='font-semibold tracking-wider'>Brand / Merek</TableCell>
                <TableCell className='font-semibold tracking-wider'>Jumlah</TableCell>
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
                  <TableCell style={{ padding: '6px' }}>{row.brand}</TableCell>
                  <TableCell style={{ padding: '6px' }} className='uppercase'>{row.qty}</TableCell>
                  <TableCell align='right' style={{ padding: '6px', textAlign: 'right' }}>
                    <Stack direction="row" spacing={1}>
                      {/* Button */}
                      <Tooltip title="Detail">
                        <IconButton onClick={() => handleOpenDetail(row)} aria-label="info" color="primary">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openDetail}
                        onClose={handleCloseDetail}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={openDetail}>
                          <Box sx={style}>
                            <div className='flex items-center'>
                              <InventoryIcon color='primary' fontSize='large' />
                              <Typography id="transition-modal-title" sx={{ ml: 2 }} variant="h5" component="h2" className='text-black'>
                                Detail Produk
                              </Typography>
                            </div>
                            <Divider className='my-4' />
                            {selectedProductDetails && (
                              <>
                                <div className="grid grid-cols-2 gap-4 text-black">
                                  <div className="mb-2">
                                    <label className="font-semibold">Nama:</label>
                                    <div className='flex'>
                                      {selectedProductDetails.name}
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <label className="font-semibold">Merek:</label>
                                    <div className='flex'>
                                      {selectedProductDetails.brand}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-black">
                                  <div className="mb-2">
                                    <label className="font-semibold">Jenis Kelas:</label>
                                    <div className='flex'>
                                      {selectedProductDetails.class}
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <label className="font-semibold">Jumlah:</label>
                                    <div className='flex'>
                                      {selectedProductDetails.qty}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-black">
                                  <div className="mb-2">
                                    <label className="font-semibold">Harga Per Jumlah:</label>
                                    <div className='flex'>
                                      <FormattedPrice value={selectedProductDetails.price} />
                                    </div>
                                  </div>

                                </div>
                              </>
                            )}
                            <Divider className='my-4' />
                            <div className='justify-center items-center flex '>
                              <Button onClick={handleCloseDetail} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Tutup</Button>
                            </div>

                          </Box>
                        </Fade>
                      </Modal>

                      {/* Button */}
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpenEdit(row)} aria-label="edit" color="success">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openEdit}
                        onClose={handleCloseEdit}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={openEdit}>
                          <Box sx={style}>
                            <div className='flex items-center mb-4'>
                              <InventoryIcon color='primary' fontSize='large' />
                              <Typography id="transition-modal-title" sx={{ ml: 2 }} variant="h5" component="h2" className='text-black'>
                                Edit Produk
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
                                name="brand"
                                label="Brand / Merek"
                                variant="outlined"
                                className='w-full'
                                value={formData.brand}
                                onChange={handleChangeInput}
                              />
                            </div>
                            <div className='flex w-full mb-4'>
                              <FormControl fullWidth sx={{ mr: 2 }}>
                                <InputLabel id="demo-simple-select-label">Jenis Kelas</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="class"
                                  value={formData.class}
                                  label="Jenis Kelas"
                                  onChange={handleChangeClass}
                                >
                                  <MenuItem value="Small">Small</MenuItem>
                                  <MenuItem value="Medium">Medium</MenuItem>
                                  <MenuItem value="Heavy">Heavy</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <TextField
                                  label="Harga Per Jumlah"
                                  value={formData.price}
                                  onChange={handleChangePrice}
                                  name="numberformat"
                                  id="formatted-numberformat-input"
                                  InputProps={{
                                    inputComponent: NumericFormatCustom as any,
                                  }}
                                  variant="outlined"
                                />

                              </FormControl>

                            </div>
                            <div className='flex w-full'>
                              <FormControl fullWidth>
                                <label className="block mb-1 text-base  text-gray-600">Jumlah (Qty):</label>
                                <div className="relative flex items-center">
                                  <button
                                    type="button"
                                    id="decrement-button"
                                    onClick={handleDecrement}
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                  >
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    id="counter-input"
                                    data-input-counter
                                    className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                    // placeholder="0"
                                    value={formData.qty}
                                    onChange={handleChangeQty}
                                    required />
                                  <button
                                    type="button"
                                    id="increment-button"
                                    onClick={handleIncrement}
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                  >
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                  </button>
                                </div>
                              </FormControl>
                            </div>

                            <div className='flex justify-center'>
                              <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button onClick={handleCloseEdit} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
                                <Button onClick={handleSubmitEdit} variant="contained" color='success' className='bg-green-600'>Submit</Button>
                              </Stack>
                            </div>
                          </Box>
                        </Fade>
                      </Modal>


                      {/* Button */}
                      <Tooltip title="Hapus">
                        <IconButton onClick={() => handleOpenDelete(row)} aria-label="delete" color='error' >
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
                            {selectedProduct && (
                              <>
                                <Typography id="transition-modal-description" sx={{ mt: 1 }} className='text-gray-700'>
                                  Menghapus data produk dengan nama `<span className='font-bold '>{selectedProduct.name}</span>`
                                </Typography>
                                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                                  <Button onClick={handleCloseDelete} variant="outlined" style={{ color: 'gray', borderColor: 'gray' }}>Batal</Button>
                                  <Button onClick={handleDeleteProduct} variant="contained" color='error' className='bg-red-600'>Hapus</Button>
                                </Stack>
                              </>
                            )}
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
