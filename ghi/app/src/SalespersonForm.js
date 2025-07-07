import React, {useState } from 'react';

function SalespersonForm(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeId, setEmployeeId] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.employee_id = employeeId

    const url = "http://localhost:8090/api/salespeople/"
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, fetchOptions);
    if (response.ok) {
        setFirstName('')
        setLastName('')
        setEmployeeId('')
        console.log("Added")
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
    const handleChangeEmployeeId = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }



    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a salesperson</h1>
            <form onSubmit={handleSubmit} id="create-salesperson">
            <div className="form-floating mb-3">
                <input onChange={handleChangeFirstName} value={firstName} placeholder="FirstName" required type="text" name="FirstName" id="FirstName" className="form-control" />
                <label htmlFor="FirstName">First name...</label>
            </div>
            <div className="form-floating mb-3">
                  <input onChange={handleChangeLastName} value={lastName} placeholder="LastName" required type="text" name="LastName" id="LastName" className="form-control" />
                  <label htmlFor="LastName">Last name...</label>
            </div>
            <div className="mb-3">
            <div className="form-floating mb-3">
                  <input onChange={handleChangeEmployeeId} value={employeeId} placeholder="EmployeeId" required type="text" name="EmployeeId" id="EmployeeId" className="form-control" />
                  <label htmlFor="EmployeeId">Employee ID...</label>
            </div>
            </div>
            <button className="btn btn-success">Create</button>
            </form>
        </div>
        </div>
    </div>
    )
}


export default SalespersonForm
