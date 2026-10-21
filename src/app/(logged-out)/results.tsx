import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Player = {
  uid: string;
  displayName: string;
  score: number;
};

// Fake data for now. Later this comes from Firestore.
const players: Player[] = [
  { uid: "a", displayName: "Sergio", score: 12 },
  { uid: "b", displayName: "Alise", score: 15 },
];

export default function Results() {
  const router = useRouter();
  const [first, second] = players;
  const isTie = first.score === second.score;
  const winner = isTie ? null : first.score > second.score ? first : second;

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>
        {winner ? `${winner.displayName} wins!` : "It's a tie"}
      </Text>

      {players.map((player) => (
        <View
          key={player.uid}
          style={[styles.row, winner?.uid === player.uid && styles.winnerRow]}
        >
          <Text style={styles.name}>{player.displayName}</Text>
          <Text style={styles.score}>{player.score}</Text>
        </View>
      ))}
      <Pressable
        style={styles.button}
        onPress={() => router.replace("/")}
        accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 360,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
  },
  winnerRow: {
    backgroundColor: "#fff4cc",
  },
  name: {
    fontSize: 20,
    fontWeight: "normal",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 32, 
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  
});