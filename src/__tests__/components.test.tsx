import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';
import Flashcards from '@/app/flashcards/page';
import Timeline from '@/app/timeline/page';
import '@testing-library/jest-dom';

describe('Navigation Component', () => {
  it('renders the logo and links correctly', () => {
    render(<Navigation />);
    
    // Check if Logo is present
    expect(screen.getByText('ElectoGuide')).toBeInTheDocument();
    
    // Check if links are present
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('has accessible roles', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('menubar')).toBeInTheDocument();
  });
});

describe('Flashcards Component', () => {
  it('renders flashcard terms', () => {
    render(<Flashcards />);
    expect(screen.getByText('Electoral College')).toBeInTheDocument();
    expect(screen.getByText('Swing State')).toBeInTheDocument();
  });

  it('flips the card when clicked', () => {
    render(<Flashcards />);
    const cards = screen.getAllByRole('button');
    expect(cards[0]).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(cards[0]);
    
    expect(cards[0]).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Timeline Component', () => {
  it('renders timeline steps', () => {
    render(<Timeline />);
    expect(screen.getByText('Register to Vote')).toBeInTheDocument();
    expect(screen.getByText('Cast Your Ballot')).toBeInTheDocument();
  });
});
