import { useState, useEffect} from 'react';

function ModelList() {
  const [models, setModels] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const { models } = await response.json();
      setModels(models);
    } else {
      console.error('An error occurred fetching the data')
    }
  }

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-3 container">
      <div className="row">
        <h1>Models</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => {
              return (
                <tr key={model.href}>
                  <td>{ model.name }</td>
                  <td>{ model.manufacturer.name } </td>
                  <td><img src={ model.picture_url } className="img-fluid" style={{ maxWidth: '200px' }}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModelList;
