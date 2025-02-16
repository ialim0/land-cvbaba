import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`border border-gray-300 rounded-lg p-2 w-full ${className}`}
      {...props}
    />
  );
};

export default TextArea;
