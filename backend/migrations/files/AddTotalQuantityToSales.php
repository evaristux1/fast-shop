<?php

class AddTotalQuantityToSales
{
    public function up($conn)
    {
        $conn->exec("ALTER TABLE sales ADD COLUMN total_quantity INT");
    }
    
    public function down($conn)
    {
        $conn->exec("ALTER TABLE sales DROP COLUMN total_quantity");
    }
}
