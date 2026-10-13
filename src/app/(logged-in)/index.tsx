import { StyleSheet, Text, View } from "react-native";
import { useAuth } from '../../context/AuthContext'

export default function Index() {
  const { user } = useAuth()
  return (
    <View style={styles.container}>
      <Text>Logged in as {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
