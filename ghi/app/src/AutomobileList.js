import { useState, useEffect} from 'react';

function AutomobileList() {
  const [autos, setAutomobiles] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const {autos} = await response.json();
      setAutomobiles(autos);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Automobiles</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
          {autos.map(automobile => {
              return (
                <tr key={automobile.vin}>
                  <td>{ automobile.vin}</td>
                  <td>{ automobile.color}</td>
                  <td>{ automobile.year}</td>
                  <td>{ automobile.model.name}</td>
                  <td>{ automobile.model.manufacturer.name }</td>
                  <td>{ automobile.sold ? "Yes":"No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AutomobileList;
