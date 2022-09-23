import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

//todo:

//when click start button, autofocus on a hidden input to listen for typing 

//add random sentences of randomw sentences/words

//add menu to display wpm, missed words, replay button

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [text, setText] = useState(' ');
  const [sentence, setSentence] = useState('one day there was a cat and that cat was the best cat that ever lived on planet earth');
  const [index, setIndex] = useState(0);

  const spanRef = useRef(new Array());

  const OnType = (e) => {
    setText(e.target.value);
    setIndex(current => current + 1)
    console.log(index)
    
  };

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      // 👇️ your logic here
      console.log('Backspace key pressed ✅');
      setIndex(current => current - 2)
      spanRef.current[index - 1].className = 'text-4xl '
      
    }
    //setText(current => current + event.key);
    //setIndex(current => current + 1)


  }

  useEffect(() => {
    //console.log(`text: ${text[index]}, sentence: ${sentence[index - 1]}`);
    //console.log(`text typed:${text}, sentence existing:${sentence}`);
    if (text == ' ') return
    console.log(`text legth: ${text.length}, index: ${index}`)
    if (text[index] == sentence[index - 1]) {
      spanRef.current[index - 1].className =  spanRef.current[index - 1].className + 'border-b-2 border-green-400 text-green-400';
    } else {
      spanRef.current[index - 1].className = spanRef.current[index - 1].className + 'border-b-2 border-red-400 text-red-400';
    }
  }, [text])

   

 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>typing app </h1>
      <p>
        {sentence.split('').map((char, index_) => (
          <span className={`${index == index_ && text[index] == sentence[index - 1] ? 'border-l-2 border-l-green-200': ''}  text-4xl `}
            key={index_}
            ref={(element) => (spanRef.current[index_] = element)}
          >
            {char}
          </span>
        ))}
      </p>
      <input
        className="border-2 border-black"
        onChange={OnType}
        value={text}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
