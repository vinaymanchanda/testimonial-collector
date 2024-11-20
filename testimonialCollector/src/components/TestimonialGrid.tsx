import React from 'react';
import { TestimonialCard } from './TestimonialCard';
import { Testimonial } from '../types';

interface Props {
  testimonials: Testimonial[];
  theme: 'light' | 'dark';
}

export const TestimonialGrid: React.FC<Props> = ({ testimonials, theme }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} theme={theme} />
      ))}
    </div>
  );
};