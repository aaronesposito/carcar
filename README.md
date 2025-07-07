# CarCar

CarCar is an application for tracking inventory, sales, and vehicle service appointments at a car dealership.

Team:

* Aaron Esposito - Service
* Abdullah Raja - Sales

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <<https://gitlab.com/esposito.aaron93/project-beta>>

3. Build and run the project using Docker with these commands:
```
docker volume create two-shot-pgdata
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- Before utlizing the service API log into the django admin interface for service (http://localhost:8080/admin) and create the required status objects. You will need (ID:1 Name:NEW), (ID:2 Name:CANCELED), and (ID:3 Name:FINISHED)

- View the project in the browser: http://localhost:3000/


## Design

CarCar is made up of 3 microservices

- **Inventory**
- **Service**
- **Sales**



## Integration - How we put the "team" in "team"

Our service and sales domains work together with our Wardrobe domain to make everything here at CarCar possible.

How this all starts is at our inventory domain. We keep a record of automobiles that are available at the dealership or have been sold by the dealership. Our sales and service microservices pull vehicle information from the inventory service, using a **poller**, which talks to the inventory domain to keep track of autmobiles available for sale and automobiles that have been sold by the dealership.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Inventory:

Manufacturers:
| Action | Method | URL
| ----------- | ----------- | ----------- |
-----------------------------------------------------------------
| List manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/|
| Delete a specific location | DELETE | http://localhost:8100/api/manufacturers/:id/|


JSON body to send data:

Create and Update a manufacturer (SEND THIS JSON BODY):
```
{
  "name": "Chrysler"
}
```
Create View and Update a manufacturer (SEND THIS JSON BODY):
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/"
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}

Vehicle Models:
| Action | Method | URL
| ----------- | ----------- | ----------- |
-----------------------------------------------------------------
| List models | GET | http://localhost:8100/api/models/ |
| Create a model | POST | http://localhost:8100/api/models/ |
| Get a specific model | GET | http://localhost:8100/api/models/:id/ |
| Update a specific model | PUT | http://localhost:8100/api/models/:id/ |
| Delete a specific location | DELETE | http://localhost:8100/api/models/:id/ |


JSON body to send data:

Create a model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
Update a model (SEND THIS JSON BODY): *Vehicle manufacturer can not be changed after creation
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
Return value for details on a specific model:
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Return value for a list of models:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

Automobiles:
| Action | Method | URL
| ----------- | ----------- | ----------- |
-----------------------------------------------------------------
| List automobiles | GET | http://localhost:8100/api/automobile/ |
| Create a automobile | POST | http://localhost:8100/api/automobile/ |
| Get a specific automobile | GET | http://localhost:8100/api/automobile/:vin/ |
| Update a specific automobile | PUT | http://localhost:8100/api/automobile/:vin/ |
| Delete a specific location | DELETE | http://localhost:8100/api/automobile/:vin/ |


JSON body to send data:

Create an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Update an automobile (SEND THIS JSON BODY): *Vehicle manufacturer can not be changed after creation
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Return value for details on a specific automobile: *Note - VINs are used in the url for automobiles not IDs
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```
Return value for a list automobiles:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```



# Sales Microservice
On the backend, the sales microservice has 4 models: AutomobileVO, Salesperson, Customer, and Sale.
Automobile is comprised of two attributes - VIN (i.e., VIN number of a car), and Sold (which is a Boolean).
Salesperson is comprised of 3 attributes - the salesperson's first name, last name, and employee id (which is a unique identifier).
Customer is comprised of 4 attributes - the customer's first name, last name, address, and phone number.
Sale is comprised of 4 attributes, the sale price, as well as foreign-key relationships to automobile, salesperson, and customer.
Creating a new sale will require the existence of all 3 foreign-keys main models within the database.
## Accessing Endpoints to Send and View Data - Access through Insomnia:
### Sale:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List sales | GET | http://localhost:8090/api/sales/
| Create a sale | POST | http://localhost:8090/api/sales/
Create a sale (SEND THIS JSON BODY):
```
{
  "price": "123456",
  "automobile": "1234",
  "salesperson": "55",
  "customer": 6
}
```
Getting a list of sales:
```
{
  "sales": [
    {
      "price": 12345,
      "automobile": {
        "vin": "123",
        "sold": false
      },
      "salesperson": {
        "first_name": "Bobby",
        "last_name": "Salesman",
        "employee_id": "45"
      },
      "customer": {
        "first_name": "Bill",
        "last_name": "Jack",
        "address": "123 Test Lane",
        "phone_number": "123456789",
        "id": 5
      },
      "id": 1
    }]}
```
### Salespeople
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET |   http://localhost:8090/api/salespeople/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
Create a salesperson (SEND THIS JSON BODY):
```
{
  "first_name": "Bobby",
  "last_name": "Salesman",
  "employee_id": "45"
}
```
Getting a list of salespeople:
```
{
  "salespeople": [
    {
      "first_name": "Bobby",
      "last_name": "Salesman",
      "employee_id": "45"
    },
  ]}
```
### Customers
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET |   http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
Create a customer (SEND THIS JSON BODY):
```
{
  "first_name": "Bill",
  "last_name": "Jack",
  "address": "123 Test Lane",
  "phone_number": "123456789"
}
```
Getting a list of customers:
```
{
  "customers": [
    {
      "first_name": "Bill",
      "last_name": "Jack",
      "address": "123 Test Lane",
      "phone_number": "123456789",
      "id": 5
    },
    {
      "first_name": "Bill",
      "last_name": "Jack",
      "address": "123 Test Lane",
      "phone_number": "123456789",
      "id": 6
    },
    {
      "first_name": "John",
      "last_name": "Doe",
      "address": "1273 Test Ln ",
      "phone_number": "1234568937",
      "id": 7
    }
  ]
}
```
