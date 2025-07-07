import { useState, useEffect} from 'react';

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const {salespeople} = await response.json();
      setSalespeople(salespeople);
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
        <h1>Salespeople</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
          {salespeople.map(salesperson => {
              return (
                <tr key={salesperson.employee_id}>
                  <td>{ salesperson.employee_id}</td>
                  <td>{ salesperson.first_name}</td>
                  <td>{ salesperson.last_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalespeopleList;
