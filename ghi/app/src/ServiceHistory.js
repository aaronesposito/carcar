import { useState, useEffect} from 'react';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('')

  const getData = async ()=> {
    const response = await fetch('http://localhost:8080/api/appointments/');
    if (response.ok) {
      const { appointments } = await response.json();
      const response2 = await fetch('http://localhost:8080/api/automobiles/')
      if (response2.ok) {
          const automobiles = await response2.json();
          const listVins = automobiles["automobiles"]
          const vins = []
          for(let obj of listVins){
              vins.push(obj["vin"])
      }
          appointments.map(appointment => {
          if(vins.includes(appointment.vin)){
              appointment['vip'] = 'Yes'
          }else{
              appointment["vip"] = 'No'
          }
      })
      }else{
          console.error('An error occurred fetching the data')
      }
      setAppointments(appointments);
    } else {
      console.error('An error occurred fetching the data')
    }
    
  }

  useEffect(()=> {
    getData()
  }, []);

  
    const handleSearch = (event) => {
        event.preventDefault()
      setSearch(event.target.value);
    };
    const handleFilter = () => {
        setFilter(search)
    }


  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Service History</h1>
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <div className="input-group">
                        <input onChange={handleSearch} value={search} className="form-control" placeholder="Search by VIN"required type="text" name="search" id="search" />
                        <label htmlFor="search"></label>
                        <div className="input-group-append">
                            <button onClick={handleFilter} className="btn btn-light">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table className="table table-striped m-3">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Is VIP?</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => {
                if (appointment.vin === filter || filter === ''){
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.vip }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ new Date(appointment.datetime).toLocaleDateString() }</td>
                  <td>{ new Date(appointment.datetime).toLocaleTimeString() }</td>
                  <td>{ appointment.technician.first_name } {appointment.technician.last_name}</td>
                  <td>{ appointment.reason }</td>
                  <td>{ appointment.status }</td>
                </tr>
              );
              }})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceHistory
