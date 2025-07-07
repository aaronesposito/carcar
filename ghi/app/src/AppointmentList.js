import { useState, useEffect} from 'react';

function AppointmentList() {
  const [appointments, setAppointments] = useState([])

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

  const handleCancel = async (id) =>{
    const delUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
    await fetch(delUrl, {method: 'put'})
    getData()
}

const handleFinish = async (id) =>{
  const delUrl = `http://localhost:8080/api/appointments/${id}/finish/`
  await fetch(delUrl, {method: 'put'})
  getData()
}

  useEffect(()=> {
    getData()
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <h1>Current appointments</h1>
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => {
              if(appointment.status == "NEW"){
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.vip }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ new Date(appointment.datetime).toLocaleDateString() }</td>
                  <td>{ new Date(appointment.datetime).toLocaleTimeString() }</td>
                  <td>{ appointment.technician.first_name } {appointment.technician.last_name}</td>
                  <td>{ appointment.reason }</td>
                  <td><button className="btn btn-danger" onClick={() => {handleCancel(appointment.id)}}>
                      Cancel
                  </button></td>
                  <td><button className="btn btn-success" onClick={() => {handleFinish(appointment.id)}}>
                      Finish
                  </button></td>
                </tr>
              );
              }})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentList
