import { useState, useEffect} from 'react';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
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
        <h1>Manufacturers</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.href}>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturerList;
