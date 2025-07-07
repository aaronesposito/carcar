import { useState, useEffect} from 'react';

function SalesList() {
  const [sales, setSales] = useState([])

  const getData = async ()=> {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const {sales} = await response.json();
      setSales(sales);
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
        <h1>Sales</h1>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {sales.map(sale => {
              return (
                <tr key={sale.id}>
                  <td>{ sale.salesperson.employee_id}</td>
                  <td>{ sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                  <td>{ sale.customer.first_name} { sale.customer.last_name}</td>
                  <td>{ sale.automobile.vin}</td>
                  <td>${ sale.price }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesList;
