![](screen_captures/bamazon_title.JPG)

### An Amazon-style storefront that takes orders from users and adjusts inventory in a database

#### The Bamazon Marketplace is a program written in JavaScript that runs solely in the command line, pulling data from a local MySQL database.
#### Users can run the Bamazon Customer file to view inventory, select and 'purchase' an item.
#### Users can run the Bamazon Manager file to view inventory, check low inventory, add stock, or add a new item.

#### Both files connect to a local MySQL database and table, which is updated based on the actions taken by the user in the comman line.

#### Languages/Technologies Used
* JavaScript
* Node.js
* Inquirer (npm)
* Colors (npm)
* MySQL server

#### Below you can see screenshot examples of the functionality of the different commands.

## Customer File:

### View all items &#9660;
![](screen_captures/bamazon_customer/customer_all_products.JPG)

### Attempted purchase, but insufficient inventory &#9660;
![](screen_captures/bamazon_customer/customer_not_enough.JPG)

### Successful purchase with total amount paid &#9660;
![](screen_captures/bamazon_customer/customer_purchase.JPG)

### Updated table of items after user purchase &#9660;
![](screen_captures/bamazon_customer/customer_all_after_purchase.JPG)

## Manager File:

### Initial menu options &#9660;
![](screen_captures/bamazon_manager/manager_menu.JPG)

### View all items &#9660;
![](screen_captures/bamazon_manager/manager_view_all.JPG)

### View low inventory (less than 5 items in stock) &#9660;
![](screen_captures/bamazon_manager/manager_low.JPG)

### Add inventory menu &#9660;
![](screen_captures/bamazon_manager/manager_add_stock_menu.JPG)

### Inventory successfully added message &#9660;
![](screen_captures/bamazon_manager/manager_add_success.JPG)

### Add new item &#9660;
![](screen_captures/bamazon_manager/manager_add_new.JPG)

### New item in menu &#9660;
![](screen_captures/bamazon_manager/manager_new_item_added.JPG)

### Exit message &#9660;
![](screen_captures/bamazon_manager/manager_exit.JPG)