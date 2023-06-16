<?php

require_once dirname(__FILE__) . '/../config/connection.php';

$migrationFiles = glob(dirname(__FILE__) . '/files/*.php');
var_dump($migrationFiles);

try {

    $conn->exec("CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        migration_name TEXT,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    $executedMigrations = $conn->query("SELECT migration_name FROM migrations")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($migrationFiles as $file) {
        $migrationName = pathinfo($file, PATHINFO_FILENAME);

        if (in_array($migrationName, $executedMigrations)) {
            continue;
        }

        require_once $file;
        $migration = new $migrationName();
        $migration->up($conn);

        $conn->exec("INSERT INTO migrations (migration_name) VALUES ('$migrationName')");

        echo "Migration $migrationName executed successfully!" . PHP_EOL;
    }

    echo "All migrations executed successfully!";
} catch (PDOException $e) {
    echo "Error executing migrations: " . $e->getMessage();
}
