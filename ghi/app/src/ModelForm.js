import React, {useEffect, useState } from 'react';

function ModelForm(){
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [manufacturers, setManufacturers] = useState([])
    const [manufacturer, setManufacturer] = useState('')

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          setManufacturers(data.manufacturers)
        }
      }

      useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {}
    data.name = name
    data.picture_url = picture
    data.manufacturer_id = manufacturer

    const modelUrl = 'http://localhost:8100/api/models/';
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(modelUrl, fetchOptions);
    if (response.ok) {
        setName('')
        setPicture('')
        setManufacturer('')
    }else{
        console.error("Submission Error")
    }
    }
    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleChangePicture = (event) => {
        const value = event.target.value;
        setPicture(value);
    }
    const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }



    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a model</h1>
            <form onSubmit={handleSubmit} id="create-model">
            <div className="form-floating mb-3">
                <input onChange={handleChangeName} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Model name</label>
            </div>
            <div className="form-floating mb-3">
                  <input onChange={handleChangePicture} value={picture} placeholder="Picture" required type="url" name="picture" id="picture" className="form-control" />
                  <label htmlFor="picture">Picture URL</label>
            </div>
            <div className="mb-3">
                  <select onChange={handleChangeManufacturer} value={manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.href} value={manufacturer.id}>{manufacturer.name}</option>
                      )
                    })}
                </select>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    )
}


export default ModelForm
