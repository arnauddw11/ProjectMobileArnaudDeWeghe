import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {

const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
} | null>(null);

useEffect(() => {
    (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is needed to use this feature.");
        return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
    });
    })();
}, []);

return (
    <View style={styles.container}>
    {location ? (
        <MapView
        style={styles.map}
        initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        />
    ) : (
        <View style={styles.loadingContainer}>
        {/* <Alert alert={"Fetching location..."} /> */}
        </View>
    )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1, // Make sure the container takes up the full screen
},
map: {
    width: "100%", // MapView should stretch to fill the container
    height: "100%",
},
loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});

export default Map;
