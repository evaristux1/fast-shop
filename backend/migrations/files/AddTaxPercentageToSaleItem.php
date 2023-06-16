<?php

class AddTaxPercentageToSaleItem
{
    public function up($conn)
    {
        $conn->exec("ALTER TABLE sales_item ADD COLUMN tax_percentage FLOAT");
    }
    
    public function down($conn)
    {
        $conn->exec("ALTER TABLE sales_item DROP COLUMN tax_percentage");
    }
}
