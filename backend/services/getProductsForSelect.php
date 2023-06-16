<?php

require_once dirname(__FILE__) . '/../config/connection.php';
require_once dirname(__FILE__) . '/../classes/productHandler.php';

$productTypeHandler = new ProductHandler($conn);
$options = $productTypeHandler->getProductForSelect();

echo json_encode(['success' => true, 'data' => $options]);
