import React from 'react';

export default function Loader({size=36}){
  const s = size;
  return (
    <div style={{width:s,height:s,display:'inline-block'}}>
      <svg viewBox="0 0 50 50" style={{width:s,height:s}}>
        <circle cx="25" cy="25" r="20" fill="none" stroke="#e6eef2" strokeWidth="6"/>
        <path d="M45 25a20 20 0 0 1-20 20" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
