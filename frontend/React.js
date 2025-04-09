import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/tempat-ibadah")
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Tempat Ibadah Terdekat</h1>
      <ul>
        {places.map(place => (
          <li key={place.id}>
            <h3>{place.nama}</h3>
            <p>Alamat: {place.alamat}</p>
            <p>Agama: {place.agama}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
