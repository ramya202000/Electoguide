'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import styles from './Chat.module.css';

/**
 * Interface representing a single chat message.
 */
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

/**
 * AI Assistant Chat Page
 * Provides a real-time chat interface connected to Google Gemini AI.
 * Implements input sanitization and strict accessibility rules.
 * @returns {JSX.Element} The rendered Chat page.
 */
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am your ElectoGuide AI Assistant powered by Google Gemini. How can I help you navigate the election process today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Automatically scrolls the chat window to the newest message.
   */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /**
   * Handles form submission, sending the message to the AI backend.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Sanitize user input to prevent XSS
    const sanitizedInput = DOMPurify.sanitize(input.trim());

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: sanitizedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sanitizedInput }),
      });

      const data = await response.json();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.response || data.error || 'Sorry, I encountered an error.',
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Connection failed. Please try again later.',
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI <span className="text-gradient">Assistant</span></h1>
        <p className={styles.subtitle}>Ask questions and get instant, non-partisan voting guidance.</p>
      </header>

      <section className={`glass-panel ${styles.chatContainer}`} aria-label="Chat Interface">
        <div className={styles.messagesArea} aria-live="polite" aria-atomic="false">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.wrapperUser : styles.wrapperAi}`}
            >
              <div className={`${styles.message} ${msg.sender === 'user' ? styles.msgUser : styles.msgAi}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.messageWrapper} ${styles.wrapperAi}`} aria-label="AI is typing...">
              <div className={`${styles.message} ${styles.msgAi} ${styles.typingIndicator}`}>
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={handleSubmit} aria-label="Message Input Form">
          <label htmlFor="chat-input" className="sr-only">Type your question</label>
          <input 
            id="chat-input"
            type="text" 
            className={styles.input}
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-required="true"
          />
          <button type="submit" className={styles.sendButton} disabled={!input.trim()} aria-label="Send Message">
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
