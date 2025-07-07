import React, {useEffect, useState } from 'react';

function SalesForm(){
    const [autos, setAutomobiles] = useState([])
    const [vin, setVin] = useState('')
    const [salespeople, setSalesPeople] = useState([])
    const [salesperson, setSalesPerson] = useState('')
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState('')
    const [price, setPrice] = useState('')

    const fetchData = async () => {
        const automobile_url = "http://localhost:8100/api/automobiles/"
        let response = await fetch(automobile_url)
        if (response.ok){
          const data = await response.json()
          setAutomobiles(data.autos)
        }

        const salespeople_url = "http://localhost:8090/api/salespeople/"
        response = await fetch(salespeople_url)
        if (response.ok){
            const data = await response.json()
            setSalesPeople(data.salespeople)
        }

        const customers_url = "http://localhost:8090/api/customers/"
        response = await fetch(customers_url)
        if (response.ok){
            const data = await response.json()
            setCustomers(data.customers)
        }
    }
      useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {}
    // What you write here must be the key in your JSON POST request in Insomnia
    data.automobile = vin
    data.salesperson = salesperson
    data.customer = customer
    data.price = price

    const SalesUrl = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(SalesUrl, fetchOptions);
    if (response.ok) {
        setPrice('')
        setVin('')
        setSalesPerson('')
        setCustomer('')
    console.log("Sale created!")
    }else{
        console.error("Submission Error")
    }
    }
    const handleChangeSalesperson = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }
    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleChangePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
    }


    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="create-sale">
            <div className="mb-3">
                <div>Automobile VIN</div>
                  <select onChange={handleChangeVin} value={vin} required name="vin" id="vin" className="form-select">
                    <option value="">Choose an automobile VIN...</option>
                    {autos.map(automobile => {
                      return (
                        <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                      )
                    })}
                    </select>

                <div>Salesperson</div>
                <select onChange={handleChangeSalesperson} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose a salesperson...</option>
                    {salespeople.map(salesperson => {
                      return (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                      )
                    })}
                </select>

                <div>Customer</div>
                <select onChange={handleChangeCustomer} value={customer} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a customer...</option>
                    {customers.map(customer => {
                      return (
                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                      )
                    })}
                </select>

            {/* Price Input box */}
            <div>Price</div>
            <div className="form-floating mb-3">
                  <input onChange={handleChangePrice} value={price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                  <label htmlFor="price">0</label>
            </div>

            </div>
            <button className="btn btn-success">Add</button>
            </form>
        </div>
        </div>
    </div>
    )
}


export default SalesForm
