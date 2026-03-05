# Limitless Automotive

Limitless Automotive is an application for tracking inventory, sales, and vehicle service appointments at a car dealership.

**Team**:

* **Aaron Esposito - Service**
* **Abdullah Raja - Sales**

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. git clone <<https://github.com/esposito.aaron93/carcar>

3. Build and run the project using Docker:
```
docker volume create two-shot-pgdata
docker-compose build
docker-compose up
```
4. Verify Docker containers are running

5. Before utlizing the service API log into the django admin interface (http://localhost:8080/admin) and create the required status objects. 

|           | ID | Name     |
| --------- | -- | -------- |
|           | 1  | NEW      |
|           | 2  | CANCELED |
|           | 3  | FINISHED |

6. View the project in the browser: http://localhost:3000/


## Design

Limitless Automotive is made up of 3 microservices

### Inventory:
Single source of truth for service and sales referencing automobiles.<br/>
URI - [http://project-beta-inventory-api-1:8000/automobiles/](http://project-beta-inventory-api-1:8000/automobiles/)


### DB Structure:

**Manufacturer:**

| Column | DataType  | FK Table | FK Column | Constraints             |
| ------ | --------- | -------- | --------- | ----------------------- |
| name   | CharField | ---      | ---       | Max Length: 100, Unique |

**VehicleModel:**

| Column       | DataType   | FK Table     | FK Column | Constraints                             |
| ------------ | ---------- | ------------ | --------- | --------------------------------------- |
| name         | CharField  | ---          | ---       | Max Length: 100, Unique                 |
| picture_url  | URLField   | ---          | ---       | ---                                     |
| manufacturer | ForeignKey | Manufacturer | id        | On Delete Cascade, Related Name: models |

**Automobile:**

| Column | DataType                  | FK Table     | FK Column | Constraints                             |
| ------ | ------------------------- | ------------ | --------- | --------------------------------------- |
| color  | CharField                 | ---          | ---       | Max Length: 50                          |
| year   | PositiveSmallIntegerField | ---          | ---       | Max Length: 50                          |
| vin    | CharField                 | ---          | ---       | Max Length: 17, Unique                  |
| sold   | BooleanField              | ---          | ---       | Default: False                          |
| model  | ForeignKey                | VehicleModel | id        | On Delete Cascade, Related Name: models |


### Service:
Microservice that handles service scheduling, management, and personell tracking.<br/>
URI - [localhost:8090/service](localhost:8090/service)

### DB Structure:

**Status:**

| Column | DataType                  | FK Table | FK Column | Constraints            |
| ------ | ------------------------- | -------- | --------- | ---------------------- |
| id     | PositiveSmallIntegerField | ---      | ---       | Primary Key            |
| name   | CharField                 | ---      | ---       | Max Length: 10, Unique |

**Technician:**

| Column      | DataType  | FK Table | FK Column | Constraints             |
| ----------- | --------- | -------- | --------- | ----------------------- |
| first_name  | CharField | ---      | ---       | Max Length: 200         |
| last_name   | CharField | ---      | ---       | Max Length: 200         |
| employee_id | CharField | ---      | ---       | Max Length: 200, Unique |

**Appointment:**

| Column     | DataType      | FK Table   | FK Column | Constraints                                   |
| ---------- | ------------- | ---------- | --------- | --------------------------------------------- |
| datetime   | DateTimeField | ---        | ---       | ---                                           |
| reason     | CharField     | ---        | ---       | Max Length: 200                               |
| status     | ForeignKey    | Status     | id        | On Delete Protect, Related Name: appointments |
| vin        | CharField     | ---        | ---       | Max Length: 200                               |
| customer   | CharField     | ---        | ---       | Max Length: 200                               |
| technician | ForeignKey    | Technician | id        | On Delete Cascade, Related Name: appointments |

**AutomobileVO:**

| Column | DataType     | FK Table | FK Column | Constraints            |
| ------ | ------------ | -------- | --------- | ---------------------- |
| vin    | CharField    | ---      | ---       | Max Length: 17, Unique |
| sold   | BooleanField | ---      | ---       | Default: False         |


### Sales:
Microservice that handles automobile sales, and inventory changes<br/>
URI - [localhost:8080/sales](localhost:8080/sales)

### DB Structure:

**Salesperson:**

| Column      | DataType  | FK Table | FK Column | Constraints            |
| ----------- | --------- | -------- | --------- | ---------------------- |
| first_name  | CharField | ---      | ---       | Max Length: 50         |
| last_name   | CharField | ---      | ---       | Max Length: 50         |
| employee_id | CharField | ---      | ---       | Max Length: 50, Unique |

**Customer:**

| Column       | DataType  | FK Table | FK Column | Constraints    |
| ------------ | --------- | -------- | --------- | -------------- |
| first_name   | CharField | ---      | ---       | Max Length: 50 |
| last_name    | CharField | ---      | ---       | Max Length: 50 |
| address      | CharField | ---      | ---       | Max Length: 75 |
| phone_number | CharField | ---      | ---       | Max Length: 75 |

**Sale:**

| Column      | DataType     | FK Table     | FK Column | Constraints                            |
| ----------- | ------------ | ------------ | --------- | -------------------------------------- |
| price       | IntegerField | ---          | ---       | ---                                    |
| automobile  | ForeignKey   | AutomobileVO | id        | On Delete Cascade, Related Name: sales |
| salesperson | ForeignKey   | Salesperson  | id        | On Delete Cascade, Related Name: sales |
| customer    | ForeignKey   | Customer     | id        | On Delete Cascade, Related Name: sales |

**AutomobileVO:**

| Column | DataType     | FK Table | FK Column | Constraints            |
| ------ | ------------ | -------- | --------- | ---------------------- |
| vin    | CharField    | ---      | ---       | Max Length: 30, Unique |
| sold   | BooleanField | ---      | ---       | Default: False         |

## Integration - How we put the "team" in "team"

Our service and sales domains work together with our inventory domain to make everything here at Limitless Automotive possible.

How this all starts is at our inventory domain. We keep a record of automobiles that are available at the dealership or have been sold by the dealership. Our sales and service microservices pull vehicle information from the inventory service, using a **poller**, which talks to the inventory domain to keep track of autmobiles available for sale and automobiles that have been sold by the dealership.


# API Endpoints

## Inventory:

### Manufacturers:

| Action                         | Method | URL                                                                                          |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------- |
| List manufacturers             | GET    | [http://localhost:8100/api/manufacturers/](http://localhost:8100/api/manufacturers/)         |
| Create a manufacturer          | POST   | [http://localhost:8100/api/manufacturers/](http://localhost:8100/api/manufacturers/)         |
| Get a specific manufacturer    | GET    | [http://localhost:8100/api/manufacturers/:id/](http://localhost:8100/api/manufacturers/:id/) |
| Update a specific manufacturer | PUT    | [http://localhost:8100/api/manufacturers/:id/](http://localhost:8100/api/manufacturers/:id/) |
| Delete a specific location     | DELETE | [http://localhost:8100/api/manufacturers/:id/](http://localhost:8100/api/manufacturers/:id/) |

**Create a manufacturer:**
```
{
  "name": "Chrysler"
}
```
**Update a manufacturer:**
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
**View a single manufacturer:**
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
**List all manufacturers:**
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
```
### Vehicle Models:

| Action                     | Method | URL                                                                            |
| -------------------------- | ------ | ------------------------------------------------------------------------------ |
| List models                | GET    | [http://localhost:8100/api/models/](http://localhost:8100/api/models/)         |
| Create a model             | POST   | [http://localhost:8100/api/models/](http://localhost:8100/api/models/)         |
| Get a specific model       | GET    | [http://localhost:8100/api/models/:id/](http://localhost:8100/api/models/:id/) |
| Update a specific model    | PUT    | [http://localhost:8100/api/models/:id/](http://localhost:8100/api/models/:id/) |
| Delete a specific location | DELETE | [http://localhost:8100/api/models/:id/](http://localhost:8100/api/models/:id/) |

**Create a model:**
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

**Update a model:** <em>Vehicle manufacturer can not be changed after creation</em>
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

**View a specific model:**
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

**List all models:**
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

### Automobiles:

| Action                       | Method | URL                                                                                      |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| List automobiles             | GET    | [http://localhost:8100/api/automobile/](http://localhost:8100/api/automobile/)           |
| Create a automobile          | POST   | [http://localhost:8100/api/automobile/](http://localhost:8100/api/automobile/)           |
| Get a specific automobile    | GET    | [http://localhost:8100/api/automobile/:vin/](http://localhost:8100/api/automobile/:vin/) |
| Update a specific automobile | PUT    | [http://localhost:8100/api/automobile/:vin/](http://localhost:8100/api/automobile/:vin/) |
| Delete a specific location   | DELETE | [http://localhost:8100/api/automobile/:vin/](http://localhost:8100/api/automobile/:vin/) |

**Create an automobile:**
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

**Update an automobile:** <em>Vehicle manufacturer can not be changed after creation</em>
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```

**View a specific automobile:** <em>Vehicle URLs reference by VIN not ID</em>
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

**List all automobiles:**
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

## Sales:

### Sales:

| Action        | Method | URL                                                                  |
| ------------- | ------ | -------------------------------------------------------------------- |
| List sales    | GET    | [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/) |
| Create a sale | POST   | [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/) |

**Create a sale:**
```
{
  "price": "123456",
  "automobile": "1234",
  "salesperson": "55",
  "customer": 6
}
```

**List all sales:**
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

### Salespeople:

| Action               | Method | URL                                                                              |
| -------------------- | ------ | -------------------------------------------------------------------------------- |
| List salespeople     | GET    | [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/) |
| Create a salesperson | POST   | [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/) |

**Create a salesperson:**
```
{
  "first_name": "Bobby",
  "last_name": "Salesman",
  "employee_id": "45"
}
```

**List all salespeople:**
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

### Customers:

| Action            | Method | URL                                                                          |
| ----------------- | ------ | ---------------------------------------------------------------------------- |
| List customers    | GET    | [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/) |
| Create a customer | POST   | [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/) |

**Create a customer:**
```
{
  "first_name": "Bill",
  "last_name": "Jack",
  "address": "123 Test Lane",
  "phone_number": "123456789"
}
```

**List all customers:**
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
