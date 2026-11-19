import { Camera, LocationManager, Map } from "@maplibre/maplibre-react-native";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function MapScreen() {
  
  const [hasPermissions, setHasPermission] = useState(false);

  useEffect(() => {
    const askForPermission = async () => {
      try {
        const granted = await LocationManager.requestPermissions();
        setHasPermission(granted);
      } catch (error) {
        console.error("Failed to request location permissions:", error);
        setHasPermission(false);
      }
    };
    
    askForPermission();
  }, []);

  console.log(hasPermissions);
  
  if (!hasPermissions) {
    return (
      <View style={styles.center}>
        <Text>Location permission is required to view the map tracking feature.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map style={styles.map} mapStyle="https://tiles.openfreemap.org/styles/liberty">
        <Camera 
          trackUserLocation="course"
          zoom={9}
        />
      </Map>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});