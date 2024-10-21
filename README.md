# Property Management

This project is a simple property management system built using **Node.js**, **Express.js**, **EJS**, and **MySQL**. It allows users to add, view, update, and delete properties, with each property linked to an owner from the `users` table.

## Features

- **View Properties**: Lists all properties, displaying the title, description, price, location, and owner's name.
- **Add Property**: Allows users to add new properties via a form.
- **Update Property**: Enables users to update existing property details.
- **Delete Property**: Provides functionality to delete a property from the database.
- **Dynamic Owner Display**: Displays the owner’s name by joining the `properties` and `users` tables.

## Technology Stack

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for handling routing.
- **EJS**: Embedded JavaScript templating for rendering dynamic HTML.
- **MySQL**: Relational database for storing user and property data.
- **CSS**: Styling for a modern and responsive user interface.

## Installation

### Prerequisites

- **Node.js** and **npm** installed on your system.
- **MySQL** server installed and running.

### Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/property-management-app.git
    ```

2. Navigate into the project directory:
    ```bash
    cd property-management-app
    ```

3. Install the required Node.js dependencies:
    ```bash
    npm install
    ```

4. Set up the MySQL database:
    - Log in to your MySQL server and create a new database:
      ```sql
      CREATE DATABASE dbprop;
      ```

    - Create the `users` and `properties` tables:
      ```sql
      CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE properties (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          location VARCHAR(255) NOT NULL,
          owner_id INT,
          FOREIGN KEY (owner_id) REFERENCES users(id)
      );
      ```

5. Configure the database connection in `app.js`:
    ```javascript
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root', // Your MySQL username
        password: '', // Your MySQL password
        database: 'dbprop' // Name of the database you created
    });
    ```

6. Run the application:
    ```bash
    node app.js
    ```

7. Open your browser and go to:
    ```
    http://localhost:3000/properties
    ```

## Routes

- **GET /properties**: Display all properties.
- **POST /add-property**: Add a new property to the database.
- **POST /update-property/:id**: Update an existing property by its ID.
- **POST /delete-property/:id**: Delete a property by its ID.

## Usage

### Viewing Properties
Visit `/properties` to see the full list of properties.

### Adding a Property
1. Fill in the form with the title, description, price, location, and owner ID.
2. Click "Add Property" to submit the new property.

### Updating a Property
1. Update any field in the property row (title, description, price, etc.).
2. Click "Update" to save changes.

### Deleting a Property
1. Click the "Delete" button next to any property to remove it.
