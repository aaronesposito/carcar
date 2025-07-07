import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success ps-3 justify-content-center">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Manufacturers
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link" to="manufacturers/">View</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="manufacturers/create">Add</NavLink>
                  </li>
                </ul>
              </li>
              </li>
          <li className="nav-item">
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Models
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link" to="models/">View</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="models/create">Add</NavLink>
                  </li>
                </ul>
              </li>
          </li><li className="nav-item">
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Automobiles
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link" to="automobiles/">View</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="automobiles/create">Add</NavLink>
                  </li>
                </ul>
              </li>
          </li><li className="nav-item">
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Service
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link" to="appointments/">View Active Appointments</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="appointments/create">Create Appointment</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="appointments/history">Appointment History</NavLink>
                  </li><li>
                    <NavLink className="nav-link" to="technicians/">List Technicians</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="technicians/create">Add a Technician</NavLink>
                  </li>
                </ul>
              </li>
          </li><li className="nav-item">
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Sales
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                  <NavLink className="nav-link" to="salespeople/">Salespeople</NavLink>
                  </li><li className="nav-item">
                  <NavLink className="nav-link" to="salespeople/create/">Add a Salesperson</NavLink>
                  </li><li className="nav-item">
                  <NavLink className="nav-link" to="sales/create/">Add a Sale</NavLink>
                  </li><li>
                  <NavLink className="nav-link" to="sales/">Show Sales</NavLink>
                  </li><li className="nav-item">
                  <NavLink className="nav-link" to="sales/history">Salesperson History</NavLink>
                  </li>
                </ul>
                </li>
              </li><li className="nav-item">
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Customers
                </a>
                <ul className="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link" to="customers/">View</NavLink>
                  </li><li className="nav-item">
                    <NavLink className="nav-link" to="customers/create">Add</NavLink>
                  </li>
                </ul>
              </li>
          </li>
          </ul>
        </div>
    </nav>
  )
}

export default Nav;
