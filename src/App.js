import React, { useState } from 'react';
import axios from 'axios';

function App() {
   const [formData, setFormData] = useState({ name: '', category: '', value: ''});
   const [aggregatedData, setAggregatedData] = useState([]);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/data', formData);
      alert('Data submitted');
    } catch (error) {
      console.error(error);
    }
   };

   const fetchAggregatedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/aggregate');
      setAggregatedData(response.data);

    } catch (error) {
      console.error(error);
    }
   }

   return (
    <div style={{ padding: '20px' }}>
      <h2>Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required /><br /><br />
        <input type="number" name="value" placeholder="Value" onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button><br /><br />
      </form>

      <h2>Aggregated Data</h2>
      <button onClick={fetchAggregatedData}>Fetch Aggregated Data</button>
      <ul>
        {aggregatedData.map((item, index) => (
          <li key={index}>
            <strong>Category:</strong> {item._id}, <strong>Count:</strong> {item.count}, <strong>Avg Value:</strong> {item.avgValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
