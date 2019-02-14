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
    password: 'groot',
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
                console.log(`  Thank you. Goodbye!`.bold.yellow);
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

 function addInv() {
     connection.query(`SELECT * FROM products`, function(err, res) {
        if (err) throw err;
        console.log(`
                    Current Inventory
                    -----------------
        `);
        for(let i = 0; i < res.length; i++) {
            console.log(`  PRODUCT NAME: ${res[i].product_name} ..... ITEMS AVAILABLE: ${res[i].stock_quantity} 
            `.bold);
        }
        inquirer
            .prompt([
                {
                    name: 'inventory',
                    type: 'list',
                    message: 'Select an Item to Add Inventory.',
                    choices: function() {
                        let inventory = [];
                        for(let i = 0; i < res.length; i++) {
                            inventory.push(res[i].product_name);
                        }
                        return inventory;
                    }
                },
                {
                    name: 'add',
                    type: 'input',
                    message: 'How many would you like to add to the inventory?',
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                }
            ])
            .then(function(userRes) {
                let addItem;
                for(let j = 0; j < res.length; j++) {
                    if(res[j].product_name === userRes.inventory) {
                        addItem = res[j];
                    }
                }
                connection.query(
                    `UPDATE products SET ? WHERE ?`,
                    [
                        {
                            stock_quantity: (addItem.stock_quantity) + (parseInt(userRes.add))
                        },
                        {
                            product_name: userRes.inventory
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log(`Inventory for ${addItem.product_name} updated successfully.
                        `);
                        continuePrompt();
                    }
                )
            })
        
    });
 }  // End of addInv function

 function addNew() {
     inquirer
        .prompt ([
            {
                name: 'newItem',
                type: 'input',
                message: 'What is the new product name?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Select the department for the new product.',
                choices: [`Collectibles`, `Children's Supplies`, `Automotive`, `Electronics`, `Apparel`, `Jewelry`, `Pet Supplies`, `Home Goods`, `Sporting Goods`, `Tools`, `Other`]
            },
            {
                name: `newPrice`,
                type: `input`,
                message: `How much does the new product cost? (Per unit, no dollar signs)`,
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                name: `newStock`,
                type: `input`,
                message: `How many units of the new product are in stock?`,
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ])
        .then(function(addRes) {
            connection.query(
                `INSERT INTO products (product_name, department_name, price, stock_quantity) 
                VALUES ('${addRes.newItem}', '${addRes.department}', ${addRes.newPrice}, ${addRes.newStock})`,
                function(err) {
                    if (err) throw err;
                    console.log(`${addRes.newItem} Added Successfully!
                    `);
                    continuePrompt();
                }
            )
        })
 }  // End of addNew function