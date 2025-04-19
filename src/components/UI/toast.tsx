import React from "react";

// This is a very simplified version of a toast system
// In a real app, you'd use a proper toast library or component system

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

let toastQueue: ToastProps[] = [];
let listeners: ((toast: ToastProps) => void)[] = [];

export function toast(props: ToastProps) {
  toastQueue.push(props);
  listeners.forEach(listener => listener(props));
}

export function useToasts() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  React.useEffect(() => {
    const listener = (toast: ToastProps) => {
      setToasts(prev => [...prev, toast]);
      
      // Auto-dismiss after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t !== toast));
      }, toast.duration || 3000);
    };
    
    listeners.push(listener);
    
    // Process any queued toasts
    toastQueue.forEach(listener);
    toastQueue = [];
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return toasts;
}

export const Toaster: React.FC = () => {
  const toasts = useToasts();
  
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    {toasts.map((toast, index) => (
      <div 
        key={index}
        className={`p-4 rounded-md shadow-lg ${
          toast.variant === "destructive" ? "bg-red-600" : "bg-blue-600"
        } text-white max-w-xs animate-in slide-in-from-right`}
      >
        <div className="font-medium">{toast.title}</div>
        {toast.description && <div className="text-sm mt-1">{toast.description}</div>}
      </div>
    ))}
  </div>
  );
};