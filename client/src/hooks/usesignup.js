import { useState } from 'react';
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError('Both passwords are not the same');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      message.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
