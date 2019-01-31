const mysql = require("mysql");

const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: 'Lesoth0M@ple',
    database: "bamazon"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}
    `);
});

connection.query(`SELECT * FROM products`, function(err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
        console.log(`ITEM ID: ${res[i].item_id} ..... PRODUCT NAME: ${res[i].product_name}
DEPARTMENT: ${res[i].department_name} ..... PRICE: $${res[i].price} ..... ITEMS AVAILABLE: ${res[i].stock_quantity}
        `);
    }
    connection.end();
})