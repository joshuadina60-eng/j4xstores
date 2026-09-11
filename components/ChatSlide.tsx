'use client'
import { useEffect, useRef, useState } from 'react';

export default function ChatSlide() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        aria-controls="aiChatPanel"
        aria-expanded={open}
        aria-label="Open chat"
        className="ai-chat-btn"
        onClick={() => setOpen((s) => !s)}
      >
        🤖 Chat
      </button>

      <div
        id="aiChatPanel"
        role="dialog"
        aria-label="Chat"
        aria-hidden={!open}
        className={`ai-chat-panel ${open ? 'open' : ''}`}
      >
        <button
          ref={closeRef}
          className="ai-chat-close"
          onClick={() => setOpen(false)}
          aria-label="Close chat panel"
        >
          ✕
        </button>

        <iframe
          src="https://dinaaicom.vercel.app"
          title="Chat"
          frameBorder={0}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      <style jsx>{`
        .ai-chat-btn { position: fixed; bottom: 20px; right: 20px; background: #6c2bd9; color: white; padding: 12px 18px; border-radius: 28px; border: none; cursor: pointer; font-weight: 700; z-index: 10001; }
        .ai-chat-panel { position: fixed; right: 0; bottom: 0; width: 420px; height: 80vh; max-height: 800px; transform: translateX(110%); transition: transform 300ms ease; box-shadow: 0 20px 40px rgba(0,0,0,0.35); border-radius: 12px 0 0 12px; overflow: hidden; z-index: 10000; background: white; display: flex; flex-direction: column; }
        .ai-chat-panel.open { transform: translateX(0); }
        .ai-chat-close { position: absolute; top: 8px; right: 8px; z-index: 10002; background: rgba(0,0,0,0.6); color: #fff; border: none; width: 34px; height: 34px; border-radius: 6px; cursor: pointer; }
        .ai-chat-panel iframe { width: 100%; height: 100%; border: 0; flex: 1 1 auto; }
        @media (max-width: 480px) { .ai-chat-panel { width: 100%; height: 100vh; border-radius: 0; } }
      `}</style>
    </>
  );
}
