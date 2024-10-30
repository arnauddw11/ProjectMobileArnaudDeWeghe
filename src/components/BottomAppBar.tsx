import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const BottomAppBar = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="home-filled" size={40} color="black" style={styles.icon} />
            <MaterialIcons name="shopping-cart" size={40} color="black" style={styles.icon} />
            <MaterialIcons name="star-outline" size={40} color="black" style={styles.icon} />
            <MaterialIcons name="map" size={40} color="black" style={styles.icon} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#FFDB58",
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 20,
    }
});


export default BottomAppBar;