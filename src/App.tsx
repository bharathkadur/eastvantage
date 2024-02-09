import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { results } = response.data;
      const user = results[0];
      setUserData({
        name: user.name,
        email: user.email,
      });
      
      localStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      fetchData();
    }
  }, []);

  const handleRefresh = async () => {
  
    localStorage.removeItem('userData');
    
    await fetchData();
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>Name: {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default App;
