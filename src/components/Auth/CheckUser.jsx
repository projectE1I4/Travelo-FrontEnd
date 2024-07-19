import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckUser = ({ onCheckUser }) => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onCheckUser(username);
    if (success) {
      navigate('/users/resetPassword');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border rounded-lg border-txt400 h-10"
          />

          <button type="submit" className="btn">
            유저 체크
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckUser;
