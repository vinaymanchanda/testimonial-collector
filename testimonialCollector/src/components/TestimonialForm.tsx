import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Star, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonials } from '../lib/api';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const TestimonialForm: React.FC<Props> = ({ onClose, theme }) => {
  const [rating, setRating] = React.useState(5);
  const [content, setContent] = React.useState('');
  const [type, setType] = React.useState<'text' | 'video'>('text');
  const [video, setVideo] = React.useState<File | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: FormData) => testimonials.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial submitted successfully!');
      onClose();
    },
    onError: () => {
      toast.error('Failed to submit testimonial');
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': [] },
    maxFiles: 1,
    onDrop: (files) => setVideo(files[0]),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('rating', rating.toString());
    formData.append('type', type);
    if (video) formData.append('video', video);
    mutate(formData);
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
            Share Your Experience
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
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Your Testimonial
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                theme === 'light'
                  ? 'border-gray-300 focus:border-blue-500'
                  : 'border-gray-600 focus:border-blue-400 bg-gray-700 text-white'
              }`}
              rows={4}
              required
            />
          </div>

          <div>
            <label className={`block mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
            }`}>
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="text"
                  checked={type === 'text'}
                  onChange={(e) => setType(e.target.value as 'text')}
                  className="mr-2"
                />
                Text
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  checked={type === 'video'}
                  onChange={(e) => setType(e.target.value as 'video')}
                  className="mr-2"
                />
                Video
              </label>
            </div>
          </div>

          {type === 'video' && (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 text-center ${
              theme === 'light' ? 'border-gray-300' : 'border-gray-600'
            }`}>
              <input {...getInputProps()} />
              {video ? (
                <div className="flex items-center justify-center gap-2">
                  <Upload size={20} />
                  <span>{video.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} />
                  <p>Drag & drop a video or click to select</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg ${
              theme === 'light'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50`}
          >
            {isLoading ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};