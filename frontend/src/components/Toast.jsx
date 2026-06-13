import React from 'react';
import { useToast } from '../contexts/ToastContext';
import '../styles/global.css';

export default function Toasts(){
  const { items, remove } = useToast();
  return (
    <div className="toasts">
      {items.map(t => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => remove(t.id)}>
          <div style={{fontWeight:600}}>{t.type === 'error' ? 'Error' : t.type === 'success' ? 'Success' : 'Info'}</div>
          <div style={{fontSize:13,marginTop:6}}>{t.message}</div>
        </div>
      ))}
    </div>
  );
}
