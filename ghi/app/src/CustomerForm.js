import React, {useState } from 'react';

function CustomerForm(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.address = address
        data.phone_number = phoneNumber

    const url = "http://localhost:8090/api/customers/"
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
        setAddress('')
        setPhoneNumber('')
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
    const handleChangeAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handleChangePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }



    return (
    <div className="row">
        <div className="offset-3 col-6">

        <div className="shadow p-4 mt-4">
            <h1>Add a customer</h1>
            <form onSubmit={handleSubmit} id="create-customer">

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
                  <input onChange={handleChangeAddress} value={address} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                  <label htmlFor="address">Address...</label>
            </div>

            <div className="form-floating mb-3">
                  <input onChange={handleChangePhoneNumber} value={phoneNumber} placeholder="phoneNumber" required type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                  <label htmlFor="phoneNumber">Phone number...</label>
            </div>

            </div>
            <button className="btn btn-success">Create</button>
            </form>
        </div>
        </div>
    </div>
    )
}


export default CustomerForm
