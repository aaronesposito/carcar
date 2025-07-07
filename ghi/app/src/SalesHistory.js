import { useState, useEffect} from 'react';

function SalesHistory() {
  const [sales, setSales] = useState([])
  const [salespeople, setSalespeople] = useState([])
  const [salesperson, setSalesperson] = useState('')


  const getData = async ()=> {
    let response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const {sales} = await response.json();
      setSales(sales);
    } else {
      console.error('An error occurred fetching the data')
    }

    response = await fetch('http://localhost:8090/api/salespeople/');
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


const handleChangeSalesperson = (event) => {
    const value = event.target.value;
    setSalesperson(value);
}


return (
    <div className="my-5 container">
      <div className="row">
        <h1>Salesperson History</h1>
        <div className="Salespeople-dropdown">
          <select onChange={handleChangeSalesperson} required name="salesperson" id="salesperson" className="form-select">
            <option value="">Choose a salesperson...</option>
            {salespeople.map(salesperson => (
              <option key={salesperson.employee_id} value={salesperson.employee_id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            ))}
          </select>
        </div>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => {
                if (salesperson == sale.salesperson.employee_id) {
                return (
                  <tr key={sale.id}>
                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>${sale.price}</td>
                  </tr>
                );
            }})}
          </tbody>
        </table>
      </div>
    </div>
  )};

export default SalesHistory;
