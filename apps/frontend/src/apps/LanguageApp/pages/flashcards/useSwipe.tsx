import { useState, useRef } from 'react';



// Custom hook for swipe detection
const useSwipe = (onSwipeLeft: any, onSwipeRight: any, threshold = 50) => {
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: any) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: any) => {
    if (!isDragging || startX === null) {
      setIsDragging(false);
      setStartX(null);
      return;
    }

    const endX = e.clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe right
        onSwipeRight?.();
      } else {
        // Swipe left
        onSwipeLeft?.();
      }
    }

    setIsDragging(false);
    setStartX(null);
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};

export default useSwipe;


    // const handleSwipeLeft = () => {
    //     console.log('Swiped LEFT!');
    //     nextCard()
    //     // Your left swipe logic here
    // };

    // const handleSwipeRight = () => {
    //     console.log('Swiped RIGHT!');
    //     nextCard()
    //     // Your right swipe logic here
    // };


    // const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight, 1);

    //          <div
    //             {...swipeHandlers}
    //             style={{
    //                 backgroundColor: '#f0f0f0',
    //                 justifyContent: 'center',
    //                 userSelect: 'none',
    //                 cursor: 'grab',
    //             }}
    //         ></div>