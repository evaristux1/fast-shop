<?php

class UpdateSalesTableAndCreateSalesItemTable
{
    public function up($conn)
    {
        $conn->exec("ALTER TABLE sales DROP COLUMN product_id, DROP COLUMN quantity");

        $conn->exec("CREATE TABLE sales_item (
            id SERIAL PRIMARY KEY,
            sale_id INT,
            product_id INT,
            quantity INT,
            total_value DECIMAL,
            tax_value DECIMAL,
            FOREIGN KEY (sale_id) REFERENCES sales(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )");
    }

    public function down($conn)
    {
        $conn->exec("DROP TABLE IF EXISTS sales_item");

        $conn->exec("ALTER TABLE sales ADD COLUMN product_id INT, ADD COLUMN quantity INT");
    }
}
