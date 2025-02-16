import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  speed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset the displayed text and current index when the text changes
    setDisplayedText('');
    currentIndex.current = 0;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval
    intervalRef.current = setInterval(() => {
      if (currentIndex.current < text.length) {
        const nextChar = text[currentIndex.current];
        setDisplayedText((prev) => prev + nextChar);
        currentIndex.current++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, speed);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed]);

  return (
    <div className="text-center mb-6">
      <h1 className="text-xl font-semibold text-blue-600">
        {displayedText}
        <span className="ml-1 bg-blue-600 h-5 w-1 rounded-full animate-pulse"></span>
      </h1>
    </div>
  );
};

export default AnimatedText;