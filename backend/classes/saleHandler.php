<?php

class SaleHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function createSale($saleItems)
    {
        try {
            $stmt = $this->conn->prepare("INSERT INTO sales (total_quantity, total_value, tax_value) VALUES (?, ?, ?)");
            
            $totalQuantity = 0;
            $totalValue = 0;
            $totalTax = 0;
            
            foreach ($saleItems as $item) {
                $quantity = $item['quantity'] ?? 0;
                $price = $item['price'] ?? 0;
                $taxPercentage = $item['taxPercentage'] ?? 0;
                
                $totalQuantity += $quantity;
                $itemTotalValue = $price * $quantity;
                $itemTaxValue = ($itemTotalValue * $taxPercentage) / 100;
                
                $totalValue += $itemTotalValue;
                $totalTax += $itemTaxValue;
            }
            
            $stmt->bindParam(1, $totalQuantity);
            $stmt->bindParam(2, $totalValue);
            $stmt->bindParam(3, $totalTax);
            
            $stmt->execute();
            
            return $this->conn->lastInsertId();
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }
    
    public function createSaleItem($saleId, $productId, $quantity, $price, $taxPercentage)
    {
        try {
            $stmt = $this->conn->prepare("INSERT INTO sales_item (sale_id, product_id, quantity, price, tax_percentage) VALUES (?, ?, ?, ?, ?)");
            
            $stmt->bindParam(1, $saleId);
            $stmt->bindParam(2, $productId);
            $stmt->bindParam(3, $quantity);
            $stmt->bindParam(4, $price);
            $stmt->bindParam(5, $taxPercentage);
            
            $stmt->execute();
            
            return $this->conn->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }
}    
