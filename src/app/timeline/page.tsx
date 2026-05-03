import styles from './Timeline.module.css';

export const metadata = {
  title: 'Election Timeline | ElectoGuide',
  description: 'Your step-by-step guide to the voting process.',
};

const steps = [
  {
    id: 1,
    title: 'Register to Vote',
    date: '30-45 Days Before Election',
    description: 'Check your voter registration status and register if you haven\'t already. Deadlines vary by state.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Research Candidates',
    date: 'Ongoing',
    description: 'Learn about the candidates and ballot measures. Look at their platforms and voting records.',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'Make a Plan',
    date: '1-2 Weeks Before',
    description: 'Decide when and how you will vote (early, mail-in, or Election Day). Locate your polling place.',
    icon: '📅',
  },
  {
    id: 4,
    title: 'Cast Your Ballot',
    date: 'Election Day (or Earlier)',
    description: 'Bring required ID, go to your polling place, and cast your vote. You are participating in democracy!',
    icon: '🗳️',
  },
];

export default function Timeline() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Voting <span className="text-gradient">Timeline</span></h1>
        <p className={styles.subtitle}>Follow these essential steps to ensure your voice is heard in the upcoming election.</p>
      </header>

      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.step}>
            <div className={styles.connector}>
              <div className={styles.node}>{step.id}</div>
              {index !== steps.length - 1 && <div className={styles.line}></div>}
            </div>
            
            <div className={`glass-panel ${styles.content}`}>
              <div className={styles.icon}>{step.icon}</div>
              <div className={styles.details}>
                <span className={styles.date}>{step.date}</span>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
