import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './styles.css';

interface SaleItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    taxPercentage: number;
}

interface Product {
    id: string;
    label: string;
    price: number;
    tax_percentage: number;
}

export const SaleForm: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/backend/services/getProductsForSelect.php');
            const data = await response.json();

            if (response.ok) {
                setProducts(data.data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleAddSaleItem = () => {
        if (!selectedProduct || !quantity) {
            return;
        }

        const product = products.find((p: any) => p.id === selectedProduct);

        if (!product) {
            return;
        }

        const existingItem = saleItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedSaleItems = saleItems.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + parseInt(quantity),
                    };
                }
                return item;
            });
            setSaleItems(updatedSaleItems);
        } else {
            const newItem: SaleItem = {
                id: product.id,
                name: product.label,
                quantity: parseInt(quantity),
                price: product.price,
                taxPercentage: product.tax_percentage,
            };
            const updatedSaleItems = [...saleItems, newItem];
            setSaleItems(updatedSaleItems);
        }

        const itemTotalAmount = product.price * parseInt(quantity);
        const itemTotalTax = (itemTotalAmount * product.tax_percentage) / 100;

        setTotalAmount(totalAmount + itemTotalAmount);
        setTotalTax(totalTax + itemTotalTax);

        setSelectedProduct('');
        setQuantity('');
    };

    const handleRemoveItem = (itemId: string) => {
        const itemToRemove = saleItems.find((item) => item.id === itemId);

        if (!itemToRemove) {
            return;
        }

        const itemTotalAmount = itemToRemove.price * itemToRemove.quantity;
        const itemTotalTax = (itemTotalAmount * itemToRemove.taxPercentage) / 100;

        const updatedSaleItems = saleItems.filter((item) => item.id !== itemId);
        setSaleItems(updatedSaleItems);

        setTotalAmount(totalAmount - itemTotalAmount);
        setTotalTax(totalTax - itemTotalTax);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/backend/services/createSale.php', {
                method: 'POST',
                body: JSON.stringify({ saleItems }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setSaleItems([]);
                setTotalAmount(0);
                setTotalTax(0);
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
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Sale Form</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        label="Product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value as string)}
                        fullWidth
                    >
                        <MenuItem value="">Select Product</MenuItem>
                        {products.map((product: any) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddSaleItem}>
                        Add Item
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        Create Sale
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="h6">Sale Items</Typography>
            <table className="sale-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Tax (%)</th>
                        <th>Total Amount</th>
                        <th>Tax Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {saleItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.taxPercentage}</td>
                            <td>{item.price * item.quantity}</td>
                            <td>{((item.price * item.quantity * item.taxPercentage) / 100).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleRemoveItem(item.id)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Typography variant="h6">Total Amount: {totalAmount}</Typography>
            <Typography variant="h6">Total Tax: {totalTax.toFixed(2)}</Typography>
        </Box>
    );
};
