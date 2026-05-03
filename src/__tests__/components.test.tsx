import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flashcards from '@/app/flashcards/page';
import Timeline from '@/app/timeline/page';
import Home from '@/app/page';
import Loading from '@/app/loading';
import ErrorPage from '@/app/error';

// Mock next/link for testing
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock DOMPurify
jest.mock('dompurify', () => ({
  sanitize: (input: string) => input,
}));

// Mock fetch for API tests
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Home (Landing Page)', () => {
  it('renders the hero title', () => {
    render(<Home />);
    expect(screen.getByText('Democracy,')).toBeInTheDocument();
    expect(screen.getByText('Simplified.')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Interactive Timeline')).toBeInTheDocument();
    expect(screen.getByText('AI Flashcards')).toBeInTheDocument();
    expect(screen.getByText('AI Guidance')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    expect(screen.getByText('Get Started')).toHaveAttribute('href', '/timeline');
    expect(screen.getByText('Ask AI Assistant')).toHaveAttribute('href', '/chat');
  });

  it('has accessible aria labels on feature cards', () => {
    render(<Home />);
    expect(screen.getByLabelText('Navigate to Interactive Timeline')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to Election Flashcards')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to AI Guidance Chat')).toBeInTheDocument();
  });
});

describe('Flashcards Component', () => {
  it('renders default flashcard terms', () => {
    render(<Flashcards />);
    expect(screen.getByText('Electoral College')).toBeInTheDocument();
    expect(screen.getByText('Swing State')).toBeInTheDocument();
    expect(screen.getByText('Primary Election')).toBeInTheDocument();
  });

  it('flips a card on click and updates aria-expanded', () => {
    render(<Flashcards />);
    const firstCard = screen.getByLabelText(/Flashcard: Electoral College/);
    expect(firstCard).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(firstCard);
    expect(firstCard).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(firstCard);
    expect(firstCard).toHaveAttribute('aria-expanded', 'false');
  });

  it('flips a card on keyboard Enter key', () => {
    render(<Flashcards />);
    const firstCard = screen.getByLabelText(/Flashcard: Electoral College/);

    fireEvent.keyDown(firstCard, { key: 'Enter' });
    expect(firstCard).toHaveAttribute('aria-expanded', 'true');
  });

  it('flips a card on keyboard Space key', () => {
    render(<Flashcards />);
    const firstCard = screen.getByLabelText(/Flashcard: Electoral College/);

    fireEvent.keyDown(firstCard, { key: ' ' });
    expect(firstCard).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the AI generator form', () => {
    render(<Flashcards />);
    expect(screen.getByPlaceholderText(/Type any term/)).toBeInTheDocument();
    expect(screen.getByText('✨ Generate with AI')).toBeInTheDocument();
  });

  it('generates a flashcard using the API', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        term: 'Super PAC',
        definition: 'A political action committee that can raise unlimited funds.',
      }),
    });

    render(<Flashcards />);
    const input = screen.getByPlaceholderText(/Type any term/);
    const button = screen.getByText('✨ Generate with AI');

    fireEvent.change(input, { target: { value: 'Super PAC' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Super PAC')).toBeInTheDocument();
    });
  });

  it('shows an error when API fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Flashcards />);
    const input = screen.getByPlaceholderText(/Type any term/);
    const button = screen.getByText('✨ Generate with AI');

    fireEvent.change(input, { target: { value: 'Bad Term' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error. Please try again.');
    });
  });
});

describe('Timeline Component', () => {
  it('renders all timeline steps', () => {
    render(<Timeline />);
    expect(screen.getByText('Register to Vote')).toBeInTheDocument();
    expect(screen.getByText('Research Candidates')).toBeInTheDocument();
    expect(screen.getByText('Make a Plan')).toBeInTheDocument();
    expect(screen.getByText('Cast Your Ballot')).toBeInTheDocument();
  });

  it('renders the page heading', () => {
    render(<Timeline />);
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('uses semantic article elements for steps', () => {
    render(<Timeline />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(4);
  });
});

describe('Loading Component', () => {
  it('renders with a loading status role', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('Error Boundary Component', () => {
  const mockReset = jest.fn();

  it('renders the error message', () => {
    render(<ErrorPage error={new Error('Test error message')} reset={mockReset} />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders the try again button', () => {
    render(<ErrorPage error={new Error('Test')} reset={mockReset} />);
    expect(screen.getByLabelText('Try again')).toBeInTheDocument();
  });

  it('calls reset when the button is clicked', () => {
    render(<ErrorPage error={new Error('Test')} reset={mockReset} />);
    fireEvent.click(screen.getByLabelText('Try again'));
    expect(mockReset).toHaveBeenCalled();
  });

  it('has an alert role for accessibility', () => {
    render(<ErrorPage error={new Error('Test')} reset={mockReset} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
