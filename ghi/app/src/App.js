import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ModelList from './ModelList';
import AutomobileList from './AutomobileList';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import SalesHistory from './SalesHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<ManufacturerList />} />
          <Route path="manufacturers/create/" element={<ManufacturerForm />} />
          <Route path="models/" element={<ModelList />} />
          <Route path="models/create/" element={<ModelForm />} />
          <Route path="automobiles/" element={<AutomobileList />} />
          <Route path="automobiles/create/" element={<AutomobileForm />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="technicians/create/" element={<TechnicianForm />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/create/" element={<AppointmentForm />} />
          <Route path="appointments/history/" element={<ServiceHistory />} />

          <Route path="salespeople/create/" element={<SalespersonForm />} />
          <Route path="salespeople/" element={<SalespeopleList />} />
          <Route path="customers/create/" element={<CustomerForm />} />
          <Route path="customers/" element={<CustomerList />} />
          <Route path="sales/create/" element={<SalesForm />} />
          <Route path="sales/" element={<SalesList />} />
          <Route path="sales/history" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
