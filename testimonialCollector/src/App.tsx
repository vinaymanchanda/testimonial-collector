import React from 'react';
import { Sun, Moon, Filter, SlidersHorizontal, PlusCircle, LogIn } from 'lucide-react';
import { TestimonialGrid } from './components/TestimonialGrid';
import { TestimonialForm } from './components/TestimonialForm';
import { AuthModal } from './components/AuthModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { testimonials, auth } from './lib/api';
import { Toaster } from 'react-hot-toast';

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [showTestimonialForm, setShowTestimonialForm] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => auth.me(),
    retry: false,
  });

  const { data: testimonialsList } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonials.getAll(),
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['user'], null);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} transition-colors duration-300`}>
      <Toaster position="top-right" />
      
      <header className={`fixed w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-sm z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Customer Stories
            </h1>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowTestimonialForm(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      theme === 'light'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <PlusCircle size={20} />
                    <span>Add Testimonial</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    theme === 'light'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>
              )}
              <button
                className={`p-2 rounded-lg ${
                  theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
                } transition-colors`}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-white" />}
              </button>
              <button
                className={`p-2 rounded-lg ${
                  theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
                } transition-colors`}
              >
                <Filter size={20} className={theme === 'light' ? 'text-gray-600' : 'text-white'} />
              </button>
              <button
                className={`p-2 rounded-lg ${
                  theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
                } transition-colors`}
              >
                <SlidersHorizontal size={20} className={theme === 'light' ? 'text-gray-600' : 'text-white'} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="space-y-8">
          <div className={`text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Real stories from real customers who love our product
            </p>
          </div>

          {testimonialsList?.data && <TestimonialGrid testimonials={testimonialsList.data} theme={theme} />}
        </div>
      </main>

      {showTestimonialForm && (
        <TestimonialForm onClose={() => setShowTestimonialForm(false)} theme={theme} />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          theme={theme}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['user'] })}
        />
      )}
    </div>
  );
}

export default App;