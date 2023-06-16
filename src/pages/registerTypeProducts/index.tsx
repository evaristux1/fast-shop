import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export const RegisterTypeProduct: React.FC = () => {
    const [typeName, setTypeName] = useState('');
    const [taxPercentage, setTaxPercentage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        typeName: false,
        taxPercentage: false,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrors({
            typeName: false,
            taxPercentage: false,
        });

        if (!typeName) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                typeName: true,
            }));
        }

        if (!taxPercentage) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                taxPercentage: true,
            }));
        }

        if (!typeName || !taxPercentage) {
            return;
        }

        setLoading(true);

        try {
            console.log("🚀 ~ file: index.tsx:45 ~ handleSubmit ~ { typeName, taxPercentage }:", { typeName, taxPercentage })
            const response = await fetch('http://localhost:8080/backend/services/createTypeProduct.php', {
                method: 'POST',
                body: JSON.stringify({ typeName, taxPercentage }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("🚀 ~ file: index.tsx:49 ~ handleSubmit ~ response:", response.body)

            const data = await response.json();
            console.log("🚀 ~ file: index.tsx:53 ~ handleSubmit ~ response.ok:", data)
            if (response.ok) {
                alert(data.message);
                setTypeName('');
                setTaxPercentage('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:59 ~ handleSubmit ~ error:", error)
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
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4">Type Product Registration</Typography>
                <div>
                    <TextField
                        label="Type Name"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        error={errors.typeName}
                        helperText={errors.typeName ? 'Please enter a type name' : ''}
                        required
                    />
                    <TextField
                        label="Tax Percentage"
                        value={taxPercentage}
                        onChange={(e) => setTaxPercentage(e.target.value)}
                        error={errors.taxPercentage}
                        helperText={errors.taxPercentage ? 'Please enter a tax percentage' : ''}
                        type="number"
                        required
                    />

                </div>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading} onClick={handleSubmit} sx={{
                    "marginLeft": 1
                }}>
                    {isLoading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
            </Box>
        </Box>
    );
};
