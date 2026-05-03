'use client';

import { useState } from 'react';
import styles from './Flashcards.module.css';

const cards = [
  {
    id: 1,
    term: 'Electoral College',
    definition: 'A body of electors established by the US Constitution, which forms every four years for the sole purpose of electing the president and vice president of the United States.',
  },
  {
    id: 2,
    term: 'Swing State',
    definition: 'A US state where the two major political parties have similar levels of support among voters, viewed as important in determining the overall result of a presidential election.',
  },
  {
    id: 3,
    term: 'Primary Election',
    definition: 'An election that narrows the field of candidates before a general election for office. Primary elections are one means by which a political party nominates candidates.',
  },
  {
    id: 4,
    term: 'Gerrymandering',
    definition: 'The practice of drawing the boundaries of electoral districts in a way that gives one political party an unfair advantage over its rivals.',
  },
  {
    id: 5,
    term: 'Filibuster',
    definition: 'An action such as a prolonged speech that obstructs progress in a legislative assembly while not technically contravening the required procedures.',
  },
  {
    id: 6,
    term: 'Ballot Initiative',
    definition: 'A means by which a petition signed by a certain minimum number of registered voters can force a public vote on a proposed statute, constitutional amendment, etc.',
  }
];

export default function Flashcards() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Electoral <span className="text-gradient">Flashcards</span></h1>
        <p className={styles.subtitle}>Master the terminology. Click on a card to flip it and reveal the definition.</p>
      </header>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div 
            key={card.id} 
            className={styles.scene}
            onClick={() => handleFlip(card.id)}
          >
            <div className={`${styles.card} ${flippedCards[card.id] ? styles.isFlipped : ''}`}>
              <div className={`${styles.cardFace} ${styles.cardFront}`}>
                <h2 className={styles.term}>{card.term}</h2>
                <div className={styles.flipHint}>Click to flip</div>
              </div>
              <div className={`${styles.cardFace} ${styles.cardBack}`}>
                <p className={styles.definition}>{card.definition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
