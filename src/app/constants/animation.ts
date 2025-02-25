export const slideLeft = `@keyframes slideLeft {from {transform: translateX(-10vw);} to { transform: translateX(-550vw);}}  .slide-left { animation: slideLeft 70s linear infinite; }`;

export const initialRight = { opacity: 0.7, x: 15 };
export const animateRight = { opacity: 1, x: 0 };
export const transitionRight = {
  duration: 2,
  x: { type: 'spring', stiffness: 50 },
  opacity: { duration: 0.5 },
};
