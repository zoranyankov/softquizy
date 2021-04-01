import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quizes/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders home title', () => {
  render(<App />);
  const titleElement = screen.getByText(/CHOOSE YOUR QUIZ/i);
  expect(titleElement).toBeVisible();
});

test('renders login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders register link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});