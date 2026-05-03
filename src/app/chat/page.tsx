'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

// Simulated knowledge base for the demo
const getSimulatedResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('register')) {
    return 'To register to vote, you can usually do it online, by mail, or in person. You generally need to be a US citizen, meet your state\'s residency requirements, and be 18 years old on or before Election Day. You can check your specific state requirements at vote.gov!';
  } else if (lowercaseInput.includes('where') || lowercaseInput.includes('polling place') || lowercaseInput.includes('location')) {
    return 'Your polling place depends on your residential address. You can easily find it by visiting your state\'s election office website or using tools like Vote.org\'s polling place locator.';
  } else if (lowercaseInput.includes('mail') || lowercaseInput.includes('absentee')) {
    return 'Mail-in or absentee voting allows you to vote without going to a polling place on Election Day. Each state has different rules—some automatically mail ballots to all registered voters, while others require you to request one with a valid excuse.';
  } else if (lowercaseInput.includes('id') || lowercaseInput.includes('identification')) {
    return 'Voter ID laws vary significantly by state. Some require a photo ID (like a driver\'s license), some accept non-photo IDs, and others don\'t require ID at all if you sign an affidavit. I recommend checking your state\'s Secretary of State website to be sure before Election Day.';
  } else if (lowercaseInput.includes('when') || lowercaseInput.includes('date')) {
    return 'Federal Election Day is always the Tuesday next after the first Monday in November. However, many states offer early voting options which can start weeks before Election Day!';
  } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
    return 'Hello! I am ready to help answer your questions about the election process. What would you like to know?';
  }
  
  return 'That is a great question! For the purpose of this demo, I only have limited responses available (try asking about registering, voting locations, mail-in ballots, or ID requirements). In the full version, I would connect to a real AI service to give you accurate, comprehensive information.';
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am your ElectoGuide AI Assistant. How can I help you navigate the election process today? (Try asking about registering, polling places, or mail-in voting!)',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getSimulatedResponse(currentInput);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI <span className="text-gradient">Assistant</span></h1>
        <p className={styles.subtitle}>Ask questions and get instant, non-partisan voting guidance.</p>
      </header>

      <div className={`glass-panel ${styles.chatContainer}`}>
        <div className={styles.messagesArea}>
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
            <div className={`${styles.messageWrapper} ${styles.wrapperAi}`}>
              <div className={`${styles.message} ${styles.msgAi} ${styles.typingIndicator}`}>
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.sendButton} disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
