import { ReactNode } from 'react';
import ToastContainer from '@/app/shared/ui/toast/ToastContainer';
import ToastContextProvider from '@/app/shared/ui/toast/ToastContext';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#d3dbe2]">
      <ToastContextProvider>
        {children}
        <ToastContainer />
      </ToastContextProvider>
    </div>
  );
}
