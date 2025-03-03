export const slideLeft = `@keyframes slideLeft {from {transform: translateX(-10vw);} to { transform: translateX(-550vw);}}  .slide-left { animation: slideLeft 70s linear infinite; }`;

export const initialRight = { x: 15 };
export const animateRight = { x: 0 };
export const transitionRight = {
  duration: 2,
  x: { type: 'spring', stiffness: 50 },
  opacity: { duration: 0.5 },
};

export const customToast = {
  style: {
    border: '1px solid #dd6b20',
    padding: '16px',
    color: '#dd6b20',
  },
  iconTheme: {
    primary: '#dd6b20',
    secondary: '#FFFAEE',
  },
};
