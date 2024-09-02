import { JSX } from 'react';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';

type FieldProps = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: Array<string | number>;
};

type FormComponentProps = {
  fieldProps: FieldProps;
};

const FormComponent = ({ fieldProps }: FormComponentProps): JSX.Element => {
  return fieldProps.type === 'text' || fieldProps.type === 'number' ? (
    <TextField {...fieldProps} />
  ) : fieldProps.type === 'select' || fieldProps.type === 'multi-select' ? (
    <>
      <InputLabel id={`${fieldProps.name}_label`}>{fieldProps.label}</InputLabel>
      <Select
        name={fieldProps.name}
        multiple={fieldProps.type === 'multi-select'}
        defaultValue={fieldProps.type === 'multi-select' ? [] : ''}
        label={fieldProps.label}
        labelId={`${fieldProps.name}_label`}
      >
        {fieldProps.options?.map((option, index) => (
          <MenuItem value={option} key={`${option}_${index}`}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  ) : (
    <></>
  );
};

export default FormComponent;
