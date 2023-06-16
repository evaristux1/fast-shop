<?php

class CreateTables
{
    public function up($conn)
    {
        // Create types table
        $conn->exec("CREATE TABLE types (
            id SERIAL PRIMARY KEY,
            name TEXT,
            tax_percentage DECIMAL
        )");
        
        // Create products table
        $conn->exec("CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name TEXT,
            price DECIMAL,
            type_id INT,
            FOREIGN KEY (type_id) REFERENCES types(id)
        )");
        
        // Create sales table
        $conn->exec("CREATE TABLE sales (
            id SERIAL PRIMARY KEY,
            product_id INT,
            quantity INT,
            total_value DECIMAL,
            tax_value DECIMAL,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )");
    }
    
    public function down($conn)
    {
        // Drop sales table
        $conn->exec("DROP TABLE IF EXISTS sales");
    
        // Drop products table
        $conn->exec("DROP TABLE IF EXISTS products");
    
        // Drop types table
        $conn->exec("DROP TABLE IF EXISTS types");
    }
}

