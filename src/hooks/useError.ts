import {useState, useCallback} from 'react';

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((message: string) => {
    setError(message);
    // You could add more error handling logic here, like logging to a service
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {error, handleError, clearError};
};
