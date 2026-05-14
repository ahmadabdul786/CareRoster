// Doctor Profile Constants
export const DOCTOR_SPECIALTY_OPTIONS = [
  { value: 'general-practice', label: 'General Practice (GP)' },
  { value: 'emergency-medicine', label: 'Emergency Medicine' },
  { value: 'anaesthetics', label: 'Anaesthetics' },
  { value: 'internal-medicine', label: 'Internal Medicine' },
  { value: 'surgery-general', label: 'Surgery (General)' },
  { value: 'paediatrics', label: 'Paediatrics' },
  { value: 'obstetrics-gynaecology', label: 'Obstetrics & Gynaecology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'orthopaedics', label: 'Orthopaedics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'other', label: 'Other (free text input)' },
];

export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 'junior', label: 'Junior' },
  { value: 'registrar', label: 'Registrar' },
  { value: 'consultant', label: 'Consultant' },
];

export const DOCTOR_PROFILE_STEPS = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Add your personal details',
    icon: 'mdi:information-outline',
  },
  {
    id: 'documents',
    title: 'Document Uploads',
    description: 'Upload your required documents',
    icon: 'mdi:file-upload-outline',
  },
];

// Hospital/Clinic Profile Constants
export const FACILITY_TYPE_OPTIONS = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'medical-center', label: 'Medical Center' },
  { value: 'aged-care', label: 'Aged Care Facility' },
  { value: 'private-practice', label: 'Private Practice' },
];

export const AUSTRALIAN_STATE_OPTIONS = [
  { value: 'nsw', label: 'New South Wales' },
  { value: 'vic', label: 'Victoria' },
  { value: 'qld', label: 'Queensland' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'sa', label: 'South Australia' },
  { value: 'tas', label: 'Tasmania' },
  { value: 'act', label: 'Australian Capital Territory' },
  { value: 'nt', label: 'Northern Territory' },
];

export const HOSPITAL_PROFILE_STEPS = [
  {
    id: 'organisation',
    title: 'Organisation Information',
    description: 'Add your organisation details',
    icon: 'ph:hospital',
  },
  {
    id: 'contact',
    title: 'Contact & Location',
    description: 'Add contact and location details',
    icon: 'ph:map-pin',
  },
];
