export const keyframes = {
  "fade-up": {
    "0%": {
      opacity: "0",
      transform: "translateY(10px)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "fade-in": {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "1",
    },
  },
  "scale-in": {
    "0%": {
      transform: "scale(0.95)",
      opacity: "0",
    },
    "100%": {
      transform: "scale(1)",
      opacity: "1",
    },
  },
};

export const animations = {
  "fade-up": "fade-up 0.5s ease-out",
  "fade-in": "fade-in 0.3s ease-out",
  "scale-in": "scale-in 0.2s ease-out",
};