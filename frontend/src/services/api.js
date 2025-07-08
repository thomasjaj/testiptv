import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Subscription Plans
  getSubscriptionPlans: async () => {
    try {
      const response = await api.get('/plans');
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  },

  // Features
  getFeatures: async () => {
    try {
      const response = await api.get('/features');
      return response.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  },

  // Trial Signup
  createTrialSignup: async (email) => {
    try {
      const response = await api.post('/trial', { email });
      return response.data;
    } catch (error) {
      console.error('Error creating trial signup:', error);
      throw error;
    }
  },

  // Trial Status
  getTrialStatus: async (email) => {
    try {
      const response = await api.get(`/trial/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trial status:', error);
      throw error;
    }
  },

  // Reseller Application
  createResellerApplication: async (applicationData) => {
    try {
      const response = await api.post('/reseller', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error creating reseller application:', error);
      throw error;
    }
  },

  // Contact Message
  createContactMessage: async (messageData) => {
    try {
      const response = await api.post('/contact', messageData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  },

  // App Settings
  getAppSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching app settings:', error);
      throw error;
    }
  },

  // Health Check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error performing health check:', error);
      throw error;
    }
  }
};

export default apiService;