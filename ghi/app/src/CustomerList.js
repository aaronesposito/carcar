import { useState, useEffect} from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/customers/');
    if (response.ok) {
      const {customers} = await response.json();
      setCustomers(customers);
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
        <h1>Customers</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
          {customers.map(customer => {
              return (
                <tr key={customer.id}>
                  <td>{ customer.first_name}</td>
                  <td>{ customer.last_name}</td>
                  <td>{ customer.phone_number}</td>
                  <td>{ customer.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
