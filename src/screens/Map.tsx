import { StyleSheet, Text, View } from 'react-native';

const Map = () => {
    return (
        <View style={styles.container}>
            <Text>No cinemas near you!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Map;