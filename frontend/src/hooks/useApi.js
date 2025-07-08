import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Hook for subscription plans
export const useSubscriptionPlans = () => {
  return useApi(apiService.getSubscriptionPlans);
};

// Hook for features
export const useFeatures = () => {
  return useApi(apiService.getFeatures);
};

// Hook for app settings
export const useAppSettings = () => {
  return useApi(apiService.getAppSettings);
};

// Hook for trial signup
export const useTrialSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createTrial = async (email) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiService.createTrialSignup(email);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTrial, loading, error, success };
};

// Hook for reseller application
export const useResellerApplication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (applicationData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiService.createResellerApplication(applicationData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error, success };
};

// Hook for contact message
export const useContactMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (messageData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiService.createContactMessage(messageData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, success };
};