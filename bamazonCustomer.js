const mysql = require("mysql");

const inquirer = require("inquirer");

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
           +  Welcome to the Bamazon Marketplace!        +
           +  You are connected with the shopper id ${connection.threadId}  +
           +++++++++++++++++++++++++++++++++++++++++++++++
`);
});

connection.query(`SELECT * FROM products`, function(err, res) {
    if (err) throw err;
    console.log(`
                   Check out our amazing products!
                   -------------------------------
`);
    for(let i = 0; i < res.length; i++) {
        console.log(`  ITEM ID: ${res[i].item_id} ..... PRODUCT NAME: ${res[i].product_name}
  DEPARTMENT: ${res[i].department_name} ..... PRICE: $${res[i].price} ..... ITEMS AVAILABLE: ${res[i].stock_quantity}
        `);
    }
    askCustomer();
});

function askCustomer() {
    connection.query(`SELECT * FROM products`, function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'ids',
                    type: 'input',
                    message: 'What is the Item ID of the product you want to purchase?',
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                },
                {
                        name: 'amount',
                        type: 'input',
                        message: 'How many of the items would you like to purchase?'
                }
            ])
            .then(function(userRes) {
                if(userRes.ids > res.length) {
                    console.log(`  Sorry, that's not a valid Item ID - please try again!
                    `);
                    askCustomer();
                } else if(isNaN(userRes.amount)) {
                    console.log(`  Oops, it looks like you didn't enter a number for the items you want to buy. Please try again!
                    `);
                    askCustomer();
                } 
                else {
                    let purchaseItem;
                    for(let k = 0; k < res.length; k++) {
                        if(res[k].item_id === parseInt(userRes.ids)) {
                            purchaseItem = res[k];
                        }
                    }
                    if(purchaseItem.stock_quantity < userRes.amount) {
                        console.log(`  We apologize...we currently only have ${purchaseItem.stock_quantity} of ${purchaseItem.product_name} in stock. Please try again.
                        `);
                        askCustomer();
                    }
                    else {
                        connection.query(
                            `UPDATE products SET ? WHERE ?`,
                            [
                                {
                                    stock_quantity: (purchaseItem.stock_quantity) - (userRes.amount)
                                },
                                {
                                    item_id: parseInt(userRes.ids)
                                }
                            ],
                            function(error) {
                                if (error) throw err;
                                console.log(`  
  Congratulations! You purchased ${userRes.amount} of ${purchaseItem.product_name} for $${(purchaseItem.price) * (userRes.amount)}.
  Thank you for shopping on the Bamazon Marketplace!
                                `);
                                connection.end();
                            }
                        )
                    }
                }
            })
    })
} // Ends askCustomer function