'use client'
import React, { useEffect, useState } from 'react';

export default function WorldClocks({ initial = ['UTC','Local','America/New_York','Europe/London','Asia/Tokyo'] }: { initial?: string[] }) {
  const [zones, setZones] = useState<string[]>(initial);
  const [now, setNow] = useState<Date>(new Date());
  const [hour12, setHour12] = useState<boolean>(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function formatForZone(date: Date, tz: string) {
    if (tz === 'Local') {
      return {
        time: new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12 }).format(date),
        date: new Intl.DateTimeFormat(undefined, { weekday:'short', year:'numeric', month:'short', day:'numeric' }).format(date)
      };
    }
    try {
      return {
        time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12, timeZone: tz }).format(date),
        date: new Intl.DateTimeFormat('en-GB', { weekday:'short', year:'numeric', month:'short', day:'numeric', timeZone: tz }).format(date)
      };
    } catch {
      return { time: 'Invalid timezone', date: '' };
    }
  }

  return (
    <div style={{maxWidth:980,margin:'0 auto',padding:24,fontFamily:'system-ui'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2 style={{margin:0}}>World Clocks</h2>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label style={{fontSize:13}}>12-hour</label>
          <input type="checkbox" checked={hour12} onChange={e => setHour12(e.target.checked)} />
        </div>
      </div>

      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add IANA timezone (e.g. America/Los_Angeles)" style={{flex:1,padding:8,borderRadius:8,border:'1px solid #ddd'}} />
        <button onClick={() => { if(!input) return; if(!zones.includes(input)) setZones(prev => [...prev, input]); setInput(''); }} style={{padding:'8px 12px',borderRadius:8,background:'#6366f1',color:'#fff',border:0}}>Add</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {zones.map(tz => {
          const { time, date } = formatForZone(now, tz);
          return (
            <div key={tz} style={{background:'#fff',padding:12,borderRadius:10,boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
              <div style={{fontSize:13,color:'#374151'}}>{tz === 'Local' ? 'Local time' : tz}</div>
              <div style={{fontSize:20,fontWeight:700,marginTop:6}}>{time}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>{date}</div>
              <div style={{marginTop:8}}>
                <button onClick={() => setZones(zones.filter(z => z !== tz))} style={{background:'transparent',border:0,color:'#ef4444',cursor:'pointer'}}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
