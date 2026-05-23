export const MODES = [
  { id: "homework", label: "Homework Help", emoji: "📚", color: "#4f8ef7" },
  { id: "mindset",  label: "Mindset",       emoji: "🧠", color: "#a855f7" },
  { id: "exam",     label: "Exam Prep",     emoji: "✏️", color: "#f97316" },
  { id: "chat",     label: "Just Chat",     emoji: "😊", color: "#22c55e" },
];

export const SUGGESTIONS = {
  homework: [
    "Help me solve: 3x + 5 = 20",
    "Explain photosynthesis simply",
    "What caused World War 2?",
    "Help me write an essay introduction",
  ],
  mindset: [
    "I feel like giving up on school",
    "I failed my test, what do I do?",
    "How do I believe in myself?",
    "I'm scared of exams",
  ],
  exam: [
    "How do I prepare for KCPE?",
    "Tips for passing KCSE Maths",
    "How do I make a study timetable?",
    "What are the best revision strategies?",
  ],
  chat: [
    "What career should I pursue?",
    "Tell me about a successful Kenyan",
    "How do I deal with peer pressure?",
    "What makes a good student?",
  ],
};

export const DAILY_QUOTES = [
  { quote: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "I run to set a good example for young Kenyans who want to succeed.", author: "Eliud Kipchoge" },
  { quote: "It's the little things citizens do. That's what will make the difference.", author: "Wangari Maathai" },
];

export const getDailyQuote = () =>
  DAILY_QUOTES[new Date().getDay() % DAILY_QUOTES.length];

export const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 4,
}));