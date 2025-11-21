# 💖 Birthday Wishes Website

A beautiful, romantic multi-phase birthday experience for your girlfriend.

## 🎯 Features

- **Phase 1**: Animated welcome messages with smooth transitions
- **Phase 2**: Interactive quiz with hearts animations and session persistence
- **Phase 3**: Polaroid-style photo gallery with captions
- **Phase 4**: Birthday GIFs with heartfelt message

## 🛠 Tech Stack

- React + TypeScript
- Material UI components
- Tailwind CSS
- React Router
- Session Storage (quiz persistence)

## 📁 Project Structure

```
src/
├── components/
│   └── FloatingHeart.tsx
├── pages/
│   ├── Phase1Welcome.tsx
│   ├── Phase2QuizIntro.tsx
│   ├── Phase2Quiz.tsx
│   ├── Phase3Photos.tsx
│   └── Phase4BirthdayGifs.tsx
├── data/
│   ├── messages.ts
│   ├── questions.ts
│   └── photoData.ts
├── files/
│   ├── photo1.jpg - photo6.jpg
│   └── gif1.gif - gif5.gif
├── hooks/
│   └── useQuizSession.ts
├── App.tsx
└── main.tsx
```

## 🎨 Customization Guide

### 1. Welcome Messages
Edit `src/data/messages.ts` to customize the opening messages.

### 2. Quiz Questions
Edit `src/data/questions.ts` to add/modify quiz questions. Support for:
- Single choice (radio buttons)
- Multiple choice (checkboxes)
- Text input

### 3. Photos
1. Replace dummy files in `src/files/` with your actual photos (photo1.jpg to photo6.jpg)
2. Edit captions in `src/data/photoData.ts`
3. Adjust rotation angles for each photo

### 4. Birthday GIFs
Replace `gif1.gif` to `gif5.gif` in `src/files/` with your favorite birthday GIFs.

### 5. Final Message
Edit the birthday message in `src/pages/Phase4BirthdayGifs.tsx` (around line 30).

## 🚀 Usage

The website automatically flows through phases:
1. **Welcome** (`/welcome`) → Auto-navigates after messages
2. **Quiz Intro** (`/quiz`) → Click "Start Quiz" button
3. **Quiz** (`/quiz/start`) → Answer questions, tracked with sessionStorage
4. **Photos** (`/photos`) → Scroll through memories, click "Next"
5. **Birthday** (`/birthday`) → Final celebration page

## 🔄 Quiz Features

- **Session Persistence**: Refreshing won't reset progress
- **2 Attempts** per question (for multi-select and text questions)
- **Instant Feedback**: Single-select questions check immediately
- **Heart Animations**: ❤️ for correct, 💔 for incorrect
- **Score Tracking**: Final score shown at the end
- **Replay Option**: Restart quiz from beginning

## 🎨 Design Features

- Romantic pink/rose color scheme
- Smooth fade animations
- Floating heart effects
- Polaroid photo cards with rotation
- Responsive design
- Handwriting-style font for photo captions

## 📝 Notes

- Images use fallback placeholders if files are missing
- All transitions are smooth and timed perfectly
- Mobile-friendly and fully responsive
- No localStorage used (sessionStorage only)
