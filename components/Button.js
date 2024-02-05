'use client';

import { useState } from "react";


export default function Button() {
  // Create a state
  const [counter, setCounter] = useState(0);

  return (
    <button 
      className='btn btn-primary' 
      onClick={() => setCounter(prevCount => prevCount + 1)}
    >
      Counter value: {counter}
    </button>
  );
}
