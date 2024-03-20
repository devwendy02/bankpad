import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const useNotification = () => {

  const success = useCallback(
    (message: string) => {
      toast.success(message);
    },
    [],
  );
  const failed = useCallback(
    (message: string) => {
      toast.error(message);
    },
    [],
  );
  return { success, failed };
};

export default useNotification;
