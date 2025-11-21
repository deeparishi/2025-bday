export interface Question {
  question: string;
  type: "single" | "multi" | "text";
  options?: string[];
  answer: string | string[];
}

export const questions: Question[] = [
  {
    question: "What was the first movie we watched together?",
    type: "single",
    options: ["The Notebook", "Titanic", "La La Land", "A Walk to Remember"],
    answer: "The Notebook"
  },
  {
    question: "Which places have we traveled to together? (Select all)",
    type: "multi",
    options: ["Paris", "Tokyo", "New York", "London"],
    answer: ["Paris", "Tokyo"]
  },
  {
    question: "Where did we have our first date?",
    type: "single",
    options: ["Coffee Shop", "Restaurant", "Park", "Beach"],
    answer: "Coffee Shop"
  },
  {
    question: "What are my favorite colors? (Select all)",
    type: "multi",
    options: ["Pink", "Blue", "Purple", "Green"],
    answer: ["Pink", "Blue"]
  }
];
