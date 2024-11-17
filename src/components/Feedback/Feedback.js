import React, { useState } from 'react';
import Statistics from './Statistics';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import './Feedback.module.css';

const FeedbackWidget = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Функція для підрахунку кожного відгуку
  const handleFeedback = feedback => {
    switch (feedback) {
      case 'good':
        setGood(prev => prev + 1);
        break;

      case 'neutral':
        setNeutral(prev => prev + 1);
        break;

      case 'bad':
        setBad(prev => prev + 1);
        break;

      default:
        break;
    }
  };
  // Функція для підрахунку відсотку позитивних  відгуків
  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = good + neutral + bad;
    return totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
  };

  {
    const total = good + neutral + bad;
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
};

export default FeedbackWidget;
