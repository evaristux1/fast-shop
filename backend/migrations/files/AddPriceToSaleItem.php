<?php

class AddPriceToSaleItem
{
    public function up($conn)
    {
        $conn->exec("ALTER TABLE sales_item ADD COLUMN price FLOAT");
    }
    
    public function down($conn)
    {
        $conn->exec("ALTER TABLE sales_item DROP COLUMN price");
    }
}
