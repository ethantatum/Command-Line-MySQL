const mysql = require("mysql");

const inquirer = require("inquirer");

const colors = require('colors');

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
    console.log(`
           +++++++++++++++++++++++++++++++++++++++++++++++
           +  Welcome to the Bamazon manager portal!     +
           +  You are connected with the manager id ${connection.threadId}  +
           +++++++++++++++++++++++++++++++++++++++++++++++
`.bold);
    firstPrompt();
});

function firstPrompt() {
    inquirer
        .prompt ([
            {
                name: 'options',
                type: 'list',
                message: 'Please select a product inventory command option from the list.',
                choices: ['View All', 'View Low Inventory', 'Add Inventory', 'Add New Product']
            }
        ])
        .then(function(initRes) {
            if(initRes.options === 'View All') {
                viewAll();
            }
            else if(initRes.options === 'View Low Inventory') {
                viewLow();
            }
            else if(initRes.options === 'Add Inventory') {
                addInv();
            }
            else {
                addNew();
            }
        })
} // End of firstPrompt function

function continuePrompt() {
    inquirer
        .prompt([
            {
                name: 'continue',
                type: 'confirm',
                message: 'Would you like to enter another command?'
            }
        ])
        .then(function(check) {
            if(check.continue) {
                firstPrompt();
            }
            else {
                console.log(`  Thank you. Goodbye!`);
                connection.end();
            }
        })
} // End of continuePrompt function

function viewAll() {
    connection.query(`SELECT * FROM products`, function(err, res) {
        if (err) throw err;
        console.log(`
                   ALL ITEMS IN MARKETPLACE
                   ------------------------
`);
        for(let i = 0; i < res.length; i++) {
            console.log(`  ITEM ID: ${res[i].item_id} ..... PRODUCT NAME: ${res[i].product_name}
  PRICE: $${res[i].price} ..... ITEMS AVAILABLE: ${res[i].stock_quantity}
            `);
        }
        continuePrompt();
    });
} // End of viewAll function

function viewLow() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function(err, res) {
        if (err) throw err;
        console.log(`
                   LOW INVENTORY ( < 5 in stock)
                   -----------------------------
            `.bold.red);
        for(let i = 0; i < res.length; i++) {
            console.log(`  ITEMS AVAILABLE: ${res[i].stock_quantity} ..... PRODUCT NAME: ${res[i].product_name}
            `.bold.red);
        }
        continuePrompt();
    });
} // End of viewLow function