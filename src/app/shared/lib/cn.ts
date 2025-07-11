import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  const result = clsx(inputs);
  const classes = result.split(' ').filter(Boolean);
  const uniqueClasses = [...new Set(classes)];

  return uniqueClasses.join(' ');
}
