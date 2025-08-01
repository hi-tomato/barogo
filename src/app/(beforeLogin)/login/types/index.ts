import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationRule {
  required?: string;
  pattern?: { value: RegExp; message: string };
}

interface LoginValidationRules {
  email: ValidationRule;
  password: ValidationRule;
}

export interface LoginFormProps {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: () => void;
  errors: FieldErrors<LoginFormData>;
  isLoginPending: boolean;
  LOGIN_FORM_VALIDATE_RULES: LoginValidationRules;
}
