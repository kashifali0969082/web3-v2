import { toast as showToast } from "../UI/toast";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

export function useToast() {
  const displayToast = ({ title, description, variant = "default", duration = 3000 }: ToastProps) => {
    showToast({
      title,
      description,
      variant,
      duration,
    });
  };

  return {
    toast: displayToast,
  };
};

// Export the toast function directly for easier imports
export const toast = ({ title, description, variant = "default", duration = 3000 }: ToastProps) => {
  showToast({
    title,
    description,
    variant,
    duration,
  });
};