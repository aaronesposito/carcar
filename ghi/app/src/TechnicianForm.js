import React, {useState } from 'react';

function TechnicianForm(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeID, setEmployeeID] = useState('')
    
    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {}
    data.first_name = firstName
    data.last_name = lastName
    data.employee_id = employeeID

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(technicianUrl, fetchOptions);
    if (response.ok) {
        setFirstName('')
        setLastName('')
        setEmployeeID('')
    }else{
        console.error("Submission Error")
    }
    }
    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleChangeEmployeeID = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }

    


    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a technician</h1>
              <form onSubmit={handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                  <input onChange={handleChangeFirstName} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                  <label htmlFor="firstName">First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeLastName} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                  <label htmlFor="lastName">Last name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleChangeEmployeeID} value={employeeID} placeholder="Emplyee ID" required type="text" name="employeeID" id="employeeID" className="form-control" />
                  <label htmlFor="employeeID">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )
}


export default TechnicianForm
