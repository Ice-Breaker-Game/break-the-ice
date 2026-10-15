
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
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

export default function Index() {
  const { user } = useAuth();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  function chooseAnswer(answerIndex: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
    } else {
      setQuestionIndex((previousIndex) => previousIndex + 1);
      setSelectedAnswer(null);
    }
  }

  function restartGame() {
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ice Breaker</Text>
      <Text style={styles.subtitle}>Question Challenge</Text>

      <Text style={styles.userText}>
        Logged in as {user?.email ?? "Student"}
      </Text>

      {finished ? (
        <View style={styles.card}>
          <Text style={styles.question}>Game complete!</Text>

          <Text style={styles.score}>
            Your score: {score} / {questions.length}
          </Text>

          <Pressable style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.progress}>
            Question {questionIndex + 1} of {questions.length}
          </Text>

          <Text style={styles.question}>
            {currentQuestion.question}
          </Text>

          {currentQuestion.answers.map((answer, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;

            return (
              <Pressable
                key={answer}
                style={[
                  styles.answer,
                  selectedAnswer !== null && isCorrect
                    ? styles.correctAnswer
                    : null,
                  isSelected && !isCorrect
                    ? styles.wrongAnswer
                    : null,
                ]}
                onPress={() => chooseAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.answerText}>{answer}</Text>
              </Pressable>
            );
          })}

          {selectedAnswer !== null && (
            <>
              <Text style={styles.feedback}>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? "Correct! Well done."
                  : "Not quite! The correct answer is highlighted."}
              </Text>

              <Pressable style={styles.button} onPress={nextQuestion}>
                <Text style={styles.buttonText}>
                  {questionIndex === questions.length - 1
                    ? "See Final Score"
                    : "Next Question"}
                </Text>
              </Pressable>
            </>
          )}

          <Text style={styles.score}>Score: {score}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f7fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#155e75",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 12,
    color: "#334155",
  },
  userText: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 16,
  },
  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 16,
    gap: 14,
  },
  progress: {
    fontSize: 14,
    color: "#64748b",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
  },
  answer: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  correctAnswer: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
  },
  wrongAnswer: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
  },
  answerText: {
    fontSize: 16,
    color: "#1e293b",
  },
  feedback: {
    fontSize: 15,
    color: "#334155",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#155e75",
  },
  button: {
    backgroundColor: "#0e7490",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
```
