import React from 'react';
import { statusOptions } from './baropotOptions';

export const getStatusBadge = (status: string) => {
  const statusOption = statusOptions.find((option) => option.value === status);

  if (!statusOption) {
    return (
      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
        {status}
      </span>
    );
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusOption.bgColor} ${statusOption.textColor}`}
    >
      {statusOption.label}
    </span>
  );
};
