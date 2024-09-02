import React, { useEffect, useState } from 'react';
import { createServer } from 'miragejs';
import './App.css';

// Mirage js server api mock setup
let server = createServer();
server.get('/api/form-configurations', {
  data: {
    pages: [
      {
        title: 'Personal Information',
        fields: [
          {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            options: ['Male', 'Female', 'Non-binary'],
            required: true
          },
          {
            name: 'age',
            label: 'Age',
            type: 'number',
            required: true,
            min: 18,
            max: 100
          }
        ]
      },
      {
        title: 'Professional Information',
        fields: [
          {
            name: 'profession',
            label: 'Profession',
            type: 'select',
            options: ['Owner', 'Agent', 'Buyer', 'Seller'],
            allowCustom: true,
            required: true
          },
          {
            name: 'skills',
            label: 'Skills',
            type: 'multi-select',
            options: ['JavaScript', 'React', 'Node.js', 'Python'],
            allowCustom: true,
            required: false
          },
          {
            name: 'services',
            label: 'What services do you need?',
            type: 'text',
            required: false
          }
        ]
      }
    ],
    timeoutMinutes: 30
  }
});

function App() {
  const [formJsonConfig, setFormJsonConfig] = useState<any>(null);

  // Fetching form-configurations api from miragejs
  useEffect(() => {
    fetch('/api/form-configurations')
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          // Setting the form configurations
          setFormJsonConfig(json.data);
        }
      })
      .catch((e) => {
        // Error
      });
  }, []);

  return (
    <div className='App'>
      <></>
    </div>
  );
}

export default App;
