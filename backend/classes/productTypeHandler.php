<?php

require_once dirname(__FILE__) . '/../config/connection.php';

class ProductTypeHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function createProductType($name, $taxPercentage) {
        $stmt = $this->conn->prepare("INSERT INTO types (name, tax_percentage) VALUES (:name, :taxPercentage)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':taxPercentage', $taxPercentage);

        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Product type successfully created.'];
        } else {
            return ['success' => false, 'message' => 'Failed to create product type.'];
        }
    }

    public function getProductTypesForSelect() {
        $stmt = $this->conn->prepare("SELECT id, name FROM types");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $options = array_map(function ($row) {
            return [
                'value' => $row['id'],
                'label' => $row['name'],
            ];
        }, $result);

        return $options;
    }
}

