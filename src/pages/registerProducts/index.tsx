import { Box, Button, CircularProgress, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const RegisterProduct: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(false);
    const [errors, setErrors] = useState({
        productName: false,
        productType: false,
        price: false,
    });
    const [typeOptions, setTypeOptions] = useState([]);

    useEffect(() => {
        fetchTypeOptions();
    }, []);

    const fetchTypeOptions = async () => {
        setLoadingOptions(true);
        try {
            const response = await fetch('http://localhost:8080/backend/services/getProductTypesForSelect.php');
            const data = await response.json();

            if (response.ok) {
                setTypeOptions(data.data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred. Please try again later.');
        }
        setLoadingOptions(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrors({
            productName: false,
            productType: false,
            price: false,
        });

        if (!productName) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productName: true,
            }));
        }

        if (!productType) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                productType: true,
            }));
        }

        if (!price) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: true,
            }));
        }

        if (!productName || !productType || !price) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/backend/services/createProduct.php', {
                method: 'POST',
                body: JSON.stringify({ productName, productType, price }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setProductName('');
                setProductType('');
                setPrice('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <Box sx={{ height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                component="form"
                sx={{
                    "marginLeft": 1,
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4">Product Registration</Typography>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            error={errors.productName}
                            helperText={errors.productName ? 'Please enter a product name' : ''}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            label="Product Type"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value as string)}
                            error={errors.productType}
                            required
                            fullWidth
                        >
                            <MenuItem value="">Select Product Type</MenuItem>
                            {loadingOptions ? (
                                <MenuItem value="" disabled>
                                    Loading...
                                </MenuItem>
                            ) : (
                                typeOptions.map((option: any) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            error={errors.price}
                            helperText={errors.price ? 'Please enter a price' : ''}
                            type="number"
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    sx={{
                        "marginTop": 1,
                        "marginLeft": 4
                    }}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
            </Box>
        </Box>
    );
};
