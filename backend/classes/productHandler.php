<?php

require_once dirname(__FILE__) . '/../config/connection.php';

class ProductHandler
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function createProduct($name, $type, $price)
    {
        $stmt = $this->conn->prepare("INSERT INTO products (name, type_id, price) VALUES (:name, :type, :price)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':price', $price);

        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Product successfully created.'];
        } else {
            return ['success' => false, 'message' => 'Failed to create product.'];
        }
    }
    public function getProductForSelect()
    {
        $stmt = $this->conn->prepare("SELECT products.id, products.name, products.price, types.tax_percentage
        FROM products
        JOIN types ON products.type_id = types.id");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $options = array_map(function ($row) {
            return [
                'value' => $row['id'],
                'id' => $row['id'],
                'label' => $row['name'],
                'tax_percentage' => $row['tax_percentage'],
                'price' => $row['price'],
            ];
        }, $result);

        return $options;
    }
}
