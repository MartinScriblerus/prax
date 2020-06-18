import React, { useState, useEffect, useRef } from 'react';
import './App.css'


export default function MetroOuter() {
    const [count, setCount] = useState(0);
  
    useInterval(() => {
      setCount(count + 1);
    }, 1000);
  
    return <h1 id="metroOuter">{count}</h1>;
  }
  
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }