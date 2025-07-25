export const buttonStyles = {
  base: 'font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2',

  size: {
    sm: 'px-3 py-2 text-sm rounded',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-xl',
  },

  variant: {
    outline:
      'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:scale-95',
    secondary: 'bg-gray-200 text-gray-500 cursor-not-allowed',
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95',
    success:
      'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95',
    warning:
      'bg-blue-700 text-white hover:bg-blue-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed',
  },

  fullWidth: 'w-full',
};

export const badgeStyles = {
  success:
    'flex items-center justify-center space-x-2 rounded-xl border border-green-200 bg-green-50 p-3',
  info: 'flex items-center justify-center space-x-2 rounded-xl border border-blue-200 bg-blue-50 p-3',
};
