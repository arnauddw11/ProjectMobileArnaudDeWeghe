import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ciné Gent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFDB58",
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text :{
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
    }
});


export default Header;