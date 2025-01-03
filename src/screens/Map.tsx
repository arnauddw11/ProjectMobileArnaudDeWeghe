import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import biosGentData from '../json/bios_gent.json';

const Map = () => {
const ghentLatitude = 51.0543;
const ghentLongitude = 3.7267;

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
            latitude: ghentLatitude,
            longitude: ghentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        {biosGentData.map((item, index) => (
            <Marker
            key={index}
            coordinate={{
                latitude: item.geometry.geometry.coordinates[1],
                longitude: item.geometry.geometry.coordinates[0],
            }}
            title={item.naam}
            description={item.ligging}
            />
        ))}
        </MapView>
    ) : (
        <View style={styles.loadingContainer}>
        </View>
    )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1, 
},
map: {
    width: "100%", 
    height: "100%",
},
loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});

export default Map;
