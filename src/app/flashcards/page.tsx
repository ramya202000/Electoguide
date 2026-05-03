'use client';

import { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';
import styles from './Flashcards.module.css';

/**
 * Interface representing a single flashcard's data.
 */
interface FlashcardType {
  id: number;
  term: string;
  definition: string;
  isAiGenerated?: boolean;
}

const defaultCards: FlashcardType[] = [
  {
    id: 1,
    term: 'Electoral College',
    definition:
      'A body of electors established by the US Constitution, which forms every four years for the sole purpose of electing the president and vice president of the United States.',
  },
  {
    id: 2,
    term: 'Swing State',
    definition:
      'A US state where the two major political parties have similar levels of support among voters, viewed as important in determining the overall result of a presidential election.',
  },
  {
    id: 3,
    term: 'Primary Election',
    definition:
      'An election that narrows the field of candidates before a general election for office. Primary elections are one means by which a political party nominates candidates.',
  },
  {
    id: 4,
    term: 'Gerrymandering',
    definition:
      'The practice of drawing the boundaries of electoral districts in a way that gives one political party an unfair advantage over its rivals.',
  },
  {
    id: 5,
    term: 'Filibuster',
    definition:
      'An action such as a prolonged speech that obstructs progress in a legislative assembly while not technically contravening the required procedures.',
  },
  {
    id: 6,
    term: 'Ballot Initiative',
    definition:
      'A means by which a petition signed by a certain minimum number of registered voters can force a public vote on a proposed statute, constitutional amendment, etc.',
  },
];

/**
 * Flashcards Page Component
 * Renders an interactive grid of flashcards for educational purposes.
 * Includes an AI-powered flashcard generator using Google Gemini.
 * @returns {JSX.Element} The rendered Flashcards page.
 */
export default function Flashcards() {
  const [cards, setCards] = useState<FlashcardType[]>(defaultCards);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [newTerm, setNewTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorError, setGeneratorError] = useState('');

  /**
   * Toggles the flipped state of a specific card.
   * @param {number} id - The unique identifier of the flashcard.
   */
  const handleFlip = useCallback((id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  /**
   * Handles keyboard interactions for accessibility.
   * Allows users to flip cards using Enter or Space keys.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, id: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFlip(id);
      }
    },
    [handleFlip]
  );

  /**
   * Generates a new flashcard using the Google Gemini API.
   * Sanitizes user input and validates the response before adding.
   */
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = DOMPurify.sanitize(newTerm.trim());
    if (!sanitized) return;

    setIsGenerating(true);
    setGeneratorError('');

    try {
      const res = await fetch('/api/generate-flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: sanitized }),
      });
      const data = await res.json();

      if (data.error) {
        setGeneratorError(data.error);
      } else {
        const newCard: FlashcardType = {
          id: Date.now(),
          term: DOMPurify.sanitize(data.term),
          definition: DOMPurify.sanitize(data.definition),
          isAiGenerated: true,
        };
        setCards((prev) => [newCard, ...prev]);
        setNewTerm('');
      }
    } catch {
      setGeneratorError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Electoral <span className="text-gradient">Flashcards</span>
        </h1>
        <p className={styles.subtitle}>
          Master the terminology. Click on a card to flip it, or generate new
          ones with AI.
        </p>
      </header>

      {/* AI Flashcard Generator */}
      <section className={styles.generatorSection} aria-label="AI Flashcard Generator">
        <form
          className={styles.generatorForm}
          onSubmit={handleGenerate}
          aria-label="Generate a new flashcard"
        >
          <label htmlFor="term-input" className="sr-only">
            Enter a political term
          </label>
          <input
            id="term-input"
            type="text"
            className={styles.generatorInput}
            placeholder="Type any term (e.g., Super PAC, Ranked Choice Voting)..."
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            disabled={isGenerating}
            aria-required="true"
            maxLength={100}
          />
          <button
            type="submit"
            className={styles.generatorButton}
            disabled={!newTerm.trim() || isGenerating}
            aria-label="Generate flashcard with AI"
          >
            {isGenerating ? 'Generating...' : '✨ Generate with AI'}
          </button>
        </form>
        {generatorError && (
          <p className={styles.generatorError} role="alert">
            {generatorError}
          </p>
        )}
      </section>

      <section className={styles.grid} aria-label="Flashcards Grid">
        {cards.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          return (
            <article
              key={card.id}
              className={styles.scene}
              onClick={() => handleFlip(card.id)}
              onKeyDown={(e) => handleKeyDown(e, card.id)}
              tabIndex={0}
              role="button"
              aria-expanded={isFlipped}
              aria-label={`Flashcard: ${card.term}. ${
                isFlipped
                  ? card.definition
                  : 'Click or press enter to flip and reveal definition.'
              }`}
            >
              <div
                className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}
              >
                <div
                  className={`${styles.cardFace} ${styles.cardFront}`}
                  aria-hidden={isFlipped}
                >
                  {card.isAiGenerated && (
                    <span className={styles.aiBadge} aria-label="AI Generated">
                      ✨ AI
                    </span>
                  )}
                  <h2 className={styles.term}>{card.term}</h2>
                  <div className={styles.flipHint} aria-hidden="true">
                    Click to flip
                  </div>
                </div>
                <div
                  className={`${styles.cardFace} ${styles.cardBack}`}
                  aria-hidden={!isFlipped}
                >
                  <p className={styles.definition}>{card.definition}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
