import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { auth } from '../lib/api';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  theme: 'light' | 'dark';
  onSuccess: () => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, theme, onSuccess }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: () => auth.login(email, password),
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully!');
      onSuccess();
      onClose();
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  const { mutate: register, isLoading: isRegisterLoading } = useMutation({
    mutationFn: () => auth.register({ email, password, name, company, role }),
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      toast.success('Registered successfully!');
      onSuccess();
      onClose();
    },
    onError: () => {
      toast.error('Registration failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      register();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        theme === 'light' ? 'bg-black/50' : 'bg-black/70'
      }`}
    >
      <div className={`w-full max-w-md rounded-xl p-6 ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                theme === 'light'
                  ? 'border-gray-300 focus:border-blue-500'
                  : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                theme === 'light'
                  ? 'border-gray-300 focus:border-blue-500'
                  : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
              }`}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className={`block mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-blue-500'
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-blue-500'
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'border-gray-300 focus:border-blue-500'
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
                  }`}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoginLoading || isRegisterLoading}
            className={`w-full py-2 px-4 rounded-lg ${
              theme === 'light'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50`}
          >
            {isLoginLoading || isRegisterLoading
              ? 'Loading...'
              : isLogin
              ? 'Login'
              : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={`w-full text-sm ${
              theme === 'light' ? 'text-blue-600' : 'text-blue-400'
            }`}
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};