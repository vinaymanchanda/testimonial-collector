import React from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonial } from '../types';

interface Props {
  testimonial: Testimonial;
  theme: 'light' | 'dark';
}

export const TestimonialCard: React.FC<Props> = ({ testimonial, theme }) => {
  const themeStyles = {
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-800 text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${themeStyles[theme]} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-start gap-4">
        <img
          src={testimonial.author.avatar}
          alt={testimonial.author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{testimonial.author.name}</h3>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {testimonial.author.role} at {testimonial.author.company}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>

      <div className="mt-4 relative">
        <Quote size={24} className="absolute -left-2 -top-2 opacity-20" />
        <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
          {testimonial.content}
        </p>
      </div>

      {testimonial.type === 'video' && (
        <div className="mt-4">
          <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
            <PlayCircle size={20} />
            <span>Watch video testimonial</span>
          </button>
        </div>
      )}

      <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        {new Date(testimonial.date).toLocaleDateString()}
      </div>
    </motion.div>
  );
};