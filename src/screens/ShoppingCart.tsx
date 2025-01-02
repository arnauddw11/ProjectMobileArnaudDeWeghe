import { StyleSheet, Text, View } from 'react-native';
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore"; 


const ShoppingCart = () => {
    return (
        <View style={styles.container}>
            <Text>No Items!</Text>
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

export default ShoppingCart;
