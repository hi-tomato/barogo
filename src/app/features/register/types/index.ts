import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface ValidationRules {
  name: {
    required: string;
    minLength: { value: number; message: string };
  };
  email: {
    required: string;
    pattern: { value: RegExp; message: string };
  };
  password: {
    required: string;
    minLength: { value: number; message: string };
  };
  confirmPassword: {
    required: string;
    validate: (value: string, formData: RegisterFormData) => boolean | string;
  };
  terms: {
    required: string;
  };
}

export interface RegisterFormProps {
  register: UseFormRegister<RegisterFormData>;
  handleSubmit: () => void;
  errors: FieldErrors<RegisterFormData>;
  isSignUpPending: boolean;
  validateRules: ValidationRules;
}
