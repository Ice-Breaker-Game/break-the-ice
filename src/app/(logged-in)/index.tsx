
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

const questions = [
  {
    question: "What is a good way to break the ice?",
    answers: [
      "Ask a fun question",
      "Ignore everyone",
      "Leave the room",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which activity helps people get to know each other?",
    answers: [
      "Staying silent",
      "Two truths and a lie",
      "Looking at your phone",
    ],
    correctAnswer: 1,
  },
  {
    question: "What makes a good icebreaker?",
    answers: [
      "Making people uncomfortable",
      "Having no instructions",
      "Being fun and inclusive",
    ],
    correctAnswer: 2,
  },
];

type ScoreRecord = {
  score: number;
  totalQuestions: number;
  completedAt: string;
};

type Minigame = "question-challenge" | "icebreaker-prompt";

const icebreakerPrompts = [
  "If you could have any superpower for one day, what would you choose?",
  "What is a tiny thing that instantly makes your day better?",
  "If your life had a theme song, what would it be?",
  "What food could you happily eat every week?",
  "If you could travel anywhere tomorrow, where would you go?",
  "What is a skill you would love to learn just for fun?",
  "What is the funniest thing that has happened to you recently?",
  "Would you rather explore outer space or the deep ocean? Why?",
  "What movie, show, or book would you recommend to everyone?",
  "If you could meet any fictional character, who would it be?",
  "What is one thing people might be surprised to learn about you?",
  "What would your perfect day off look like?",
  "If you opened a café, what would you call it and what would you serve?",
  "What song always makes you want to sing or dance?",
  "What is something new you want to try this year?",
];

export default function Index() {
  const { user } = useAuth();

  const [matchStarted, setMatchStarted] = useState(false);
  const [selectedMinigame, setSelectedMinigame] =
    useState<Minigame>("question-challenge");
  const [promptIndex, setPromptIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeExpired, setTimeExpired] = useState(false);
  const [finished, setFinished] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<ScoreRecord[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [savingScore, setSavingScore] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Prevent the same game from saving its score more than once.
  const scoreSaveStarted = useRef(false);

  const storageKey = `question-challenge-scores-${
    user?.uid ?? user?.email ?? "guest"
  }`;

  const currentQuestion = questions[questionIndex];
