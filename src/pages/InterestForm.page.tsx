import { JSX, useEffect, useState, FormEvent, useRef } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';

const InterestForm = (): JSX.Element => {
  const [formJsonConfig, setFormJsonConfig] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const formTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let formDataValues: any = {};

  // Fetching form-configurations api from miragejs
  useEffect(() => {
    fetch('/api/form-configurations')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data?.pages)) {
          // Setting the form configurations
          setFormJsonConfig(json.data);
        }
      })
      .catch((e) => {
        // Error
      })
      .finally(() => {
        // Disable loading
        setLoading(false);
      });
  }, []);

  // Form timeout setup
  useEffect(() => {
    if (typeof formJsonConfig?.timeoutMinutes === 'number') {
      formTimeout.current = setTimeout(() => {
        alert('Timeout reached. Please start fresh!');
        // Reloading page when scroll timeout reaaches
        window.location.reload();
      }, 1000 * 60 * formJsonConfig.timeoutMinutes);
    }
  }, [formJsonConfig?.timeoutMinutes]);

  // Submitting form
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    formDataValues = { ...formDataValues, ...formValues };

    // Incrementing current page if there are more pages
    if (formJsonConfig.pages.length > currentPage + 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      // Submitting form to server
      const result = await fetch('api/form-submission', {
        method: 'POST',
        body: JSON.stringify(formDataValues)
      });
      if (result.status === 201) {
        // Form submission success
        alert('Form submitted successfully!');

        // Reloading page
        window.location.reload();
      }
    }
  };

  return formJsonConfig?.pages?.length > 0 ? (
    <Box sx={{ width: '100%', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography variant='h4' gutterBottom>
        {formJsonConfig?.pages[currentPage]?.title}
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleFormSubmit}>
        {formJsonConfig?.pages[currentPage]?.fields?.map((field: any) => (
          <FormControl fullWidth key={field?.name} sx={{ marginTop: '10px', marginBottom: '10px' }}>
            <FormComponent fieldProps={field} />
          </FormControl>
        ))}

        {/* Submit button */}
        <Button variant='contained' fullWidth sx={{ marginTop: '20px' }} type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  ) : loading ? (
    <Loader />
  ) : (
    <h1>No forms found</h1>
  );
};

export default InterestForm;
