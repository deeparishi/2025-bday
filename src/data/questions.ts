export interface Question {
  question: string;
  type: "single" | "multi" | "text";
  options?: string[];
  answer: string | string[];
}

export const questions: Question[] = [
  {
    question: "Deepu plan pani failure aana first movie name enna ammu?",
    type: "single",
    options: ["Love Today", "Kaathuvakula Rendu Kaadhal", "Sita Raman", "Vikram"],
    answer: "Sita Raman"
  },
  {
    question: "Our First Movie?",
    type: "single",
    options: ["Vikram", "Good Night", "Leo", "Chithha"],
    answer: "Good Night"
  },
  {
    question: "2024 Anniversary ku enga ponom namba? ",
    type: "single",
    options: ["Vadapalani Kovil + Forum Mall", "Mylaport Kovil + Birla Planetarium", "Vadapalani Kovil + T Nagar National Park", "Marina Beach + EA Mall"],
    answer: "Mylaport Kovil + Birla Planetarium"
  },
  {
    question: "2024 Anniversary ku ena outfit potrunthom?",
    type: "single",
    options: ["Pink dress + Blue shirt", "Red chudi + Purple dress", "Sandal Shirt + Green chudi", "Blue Tshirt + Yellow dress"],
    answer: "Red chudi + Purple dress"
  },
  {
    question: "Rendu Perukum pedicha dishes",
    type: "multi",
    options: ["Waffle", "Butterscotch Ice", "Rose milk", "Hakka Noodles", "Coffe", "Biriyani", "Home foods"],
    answer: ["Waffle", "Butterscotch Ice", "Home foods", "Biriyani"]
  },
  {
    question: "Which Dress la deepu ku Ammu va pedium",
    type: "single",
    options: ["Red Dress/White shall", "Purple Dress/Sandal Shall", "Pink Dress/Jeans", "Full White"],
    answer: "Purple Dress/Sandal Shall"
  },
  {
    question: "Proposal Date",
    type: "single",
    options: ["27/2/2022", "29/2/2023", "28/2/2023", "24/2/2023"],
    answer: "28/2/2023"
  },
   {
    question: "First time endha bike la enoda vantha",
    type: "single",
    options: ["Scooty", "Bike"],
    answer: "Bike"
  },
  {
    question: "Our First hug happened in which month?",
    type: "single",
    options: ["Sep", "Aug", "Oct", "Nov"],
    answer: "Aug"
  },
   {
    question: "Our First kiss?",
    type: "single",
    options: ["SIDCO", "Bike travel", "While movie", "At home"],
    answer: "SIDCO"
  }
];
