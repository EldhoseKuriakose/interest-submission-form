import { createServer } from 'miragejs';
import InterestForm from './pages/InterestForm.page';
import './App.css';

// Mirage js server api mock setup
let server = createServer();

// Form configuration api
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

// Form submission api
server.post('api/form-submission', (schema: any, request: any) => {
  let attrs = JSON.parse(request.requestBody);
  console.log(attrs);
  return { status: 200 };
});

function App() {
  return (
    <div className='App'>
      <InterestForm />
    </div>
  );
}

export default App;
