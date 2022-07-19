import React, { useState } from 'react'
import { Box, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AdminLogo from '../../../Assets/Images/Administrator.png';
import './AdminLogin.css'

function AdminLogin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='AdminLogin'>
            <div className='AdminLogin-Image'>
                <img src={AdminLogo} alt="admin" />
            </div>
            <div className='AdminLogin-Form'>
                <h1>Admin Login</h1>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                </Box>
            </div>
        </div>
    )
}

export default AdminLogin