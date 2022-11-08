import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notify/Notify';
import { TbCoffeeOff } from 'react-icons/tb';

const INIT = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [state, setState] = useState(INIT);

  const feedbackCollector = e => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: prevState[e.target.name] + 1,
    }));
  };

  const countTotalFeedback = () => state.good + state.bad + state.neutral;

  const countPositiveFeedbackPercentage = () => {
    const result = (
      (state.good / (state.good + state.bad + state.neutral)) *
      100
    ).toFixed(1);

    if (isNaN(result)) {
      return 'No data about current';
    } else {
      return result;
    }
  };

  const { good, bad, neutral } = state;
  const feed = countTotalFeedback();
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={state} onLeaveFeedback={feedbackCollector} />
      </Section>
      {feed ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        </Section>
      ) : (
        <div>
          <TbCoffeeOff
            style={{ fill: 'brown', display: 'inline-', width: '50px' }}
          />
          <Notification message="There is no feedback" />
        </div>
      )}
    </>
  );
};
