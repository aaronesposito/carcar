import React, {useEffect, useState } from 'react';

function AutomobileForm(){
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVin] = useState('')
    const [models, setModels] = useState([])
    const [model, setModel] = useState('')

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url)
        if (response.ok){
        const data = await response.json()
        setModels(data.models)
        }
}

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {}
    data.color = color
    data.year = year
    data.vin = vin
    data.model_id = model

    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const response = await fetch(automobileUrl, fetchOptions);
    if (response.ok) {
        setColor('')
        setYear('')
        setVin('')
        setModel('')
    }else{
        console.error("Submission Error")
    }
    }
    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleChangeYear = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleChangeModel = (event) => {
        const value = event.target.value;
        setModel(value);
    }



    return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
                <input onChange={handleChangeColor} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">color</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChangeYear} value={year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChangeVin} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
                <select onChange={handleChangeModel} value={model} required name="model" id="model" className="form-select">
                    <option value="">Choose a model</option>
                    {models.map(model => {
                    return (
                        <option key={model.href} value={model.id}>{model.name}</option>
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

export default AutomobileForm
