import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';

export function Feedback() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add feedback submission logic here
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold">Feedback</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback to help us improve..."
          className="w-full h-32 px-3 py-2 text-base text-gray-700 dark:text-gray-200 placeholder-gray-500 border rounded-lg focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}