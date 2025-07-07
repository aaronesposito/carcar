import React, {useEffect, useState } from 'react';

function AppointmentForm(){
    const [vin, setVin] = useState('')
    const [reason, setReason] = useState('')
    const [customer, setCustomer] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [technicians, setTechnicians] = useState([])
    const [technician, setTechnician] = useState('')
    
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/"
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          setTechnicians(data.technicians)
        }
      }

      useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {}
    data.vin = vin
    data.customer = customer
    data.datetime = dateTime
    data.technician = technician
    data.reason = reason

    const technicianUrl = 'http://localhost:8080/api/appointments/';
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(technicianUrl, fetchOptions);
    if (response.ok) {
        setVin('')
        setReason('')
        setCustomer('')
        setDateTime('')
        setTechnician('')
    }else{
        console.error("Submission Error")
    }
    }
    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleChangeReason = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleChangeDateTime = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }
    const handleChangeTechnician = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    


    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a service appointment</h1>
              <form onSubmit={handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                  <input onChange={handleChangeVin} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Automobile VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeCustomer} value={customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeDateTime} value={dateTime} placeholder="Date Time" required type="datetime-local" name="dateTime" id="dateTime" className="form-control" />
                  <label htmlFor="dateTime">Date and Time</label>
                </div>
                <div className="mb-3">
                <div>Technician</div>
                  <select onChange={handleChangeTechnician} value={technician} placeholder="Choose a technician..." required name="technician" id="technician" className="form-select">
                    <option value="">Choose a technician...</option>
                    {technicians.map(technician => {
                      return (
                        <option key={technician.id} value={technician.employee_id}>{technician.first_name} {technician.last_name}</option>
                      )
                    })}
                  </select>
                 </div>
                 <div className="form-floating mb-3">
                  <input onChange={handleChangeReason} value={reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                  <label htmlFor="reason">Reason</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )
}


export default AppointmentForm
