"use client"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import React from 'react'

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <html>
            <body className='bg-gradient-to-r from-green-400 to-blue-500  flex items-center justify-center '>
                <div className='bg-gradient-to-r from-green-400 to-blue-500 h-screen flex items-center justify-center '>
                    <div className='shadow p-4 w-auto bg-white rounded-lg'>
                        <h1 className='tracking-wide text-black flex text-center justify-center font-bold text-lg'>SMG-DP</h1>
                        <h4 className='mb-4 text-black text-sm'>Sistem Manajemen Gudang Digital Printing</h4>
                        <FormControl className='space-y-2 w-full'>
                            <TextField id="outlined-basic" label="Username" variant="outlined" />
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button variant="contained" color='success' className='bg-green-600'>LOGIN</Button>
                        </FormControl>
                    </div>
                </div>
            </body>
        </html>

    )
}
