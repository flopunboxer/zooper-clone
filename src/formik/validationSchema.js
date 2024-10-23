
const phoneRegExp = /^(?:\+91|91)?[789]\d{9}$/;

import * as yup from 'yup';

// Step 1: Email validation schema
const emailValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

// Step 2: Name validation schema
const nameValidationSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .required('Name is required'),
});

// Step 3: Phone validation schema
const phoneValidationSchema = yup.object().shape({
  phone: yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
});

// Step 4: Gender validation schema
const genderValidationSchema = yup.object().shape({
  gender: yup.string()
    .oneOf(['male', 'female','not-specified'], 'Please select a valid gender')
    .required('Gender is required'),
});

// Step 5: City and Age validation schema
const cityValidationSchema = yup.object().shape({
  city: yup.string()
    .min(2, 'City name too short')
    .max(50, 'City name too long')
    .required('City is required'),
  
});

//step 6
const AgeValidationSchema = yup.object().shape({
   age: yup.number()
    .min(18, 'Must be at least 18')
    .max(80, 'Age not valid')
    .required('Age is required'),
});
export const Emptyschema = yup.object().shape({

});


// Combine them as needed for the final step
export const validationSchemas = [
  emailValidationSchema,
  nameValidationSchema,
  phoneValidationSchema,
  genderValidationSchema,
  cityValidationSchema,
  AgeValidationSchema,
];
