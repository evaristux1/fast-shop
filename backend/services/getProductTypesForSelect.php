<?php

require_once dirname(__FILE__) . '/../config/connection.php';
require_once dirname(__FILE__) . '/../classes/productTypeHandler.php';

$productTypeHandler = new ProductTypeHandler($conn);
$options = $productTypeHandler->getProductTypesForSelect();

echo json_encode(['success' => true, 'data' => $options]);
