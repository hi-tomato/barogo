import { useState } from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

interface UseFormBaseProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: (data: T) => void;
}

export function useFormBase<T extends FieldValues>({
  onSubmit,
  ...props
}: UseFormBaseProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<T>(props);
  const wrappedHandleSubmit = formMethods.handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      await onSubmit(data);
    } catch (err) {
      console.error('Error in useFormBase', err);
    } finally {
      setIsSubmitting(false);
    }
  });
  return {
    ...formMethods,
    isSubmitting,
    handleSubmit: wrappedHandleSubmit,
  };
}
