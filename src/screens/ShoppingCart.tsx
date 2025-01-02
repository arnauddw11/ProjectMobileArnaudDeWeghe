import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import { useAppSelector } from "../store";
import { db } from "../config/firebase";
import { collection, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { auth } from "../config/firebase";

interface Movie {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
}  

interface Cinema {
    naam: string;
    ligging: string;
    geo_point_2d: {
        lon: number;
        lat: number;
    };
}

interface Ticket {
    movie: Movie;
    cinema: Cinema;
}

const ShoppingCart = () => {
    const user = auth.currentUser;
    const cartItems = useAppSelector((state) => state.tickets); // Use correct state, 'tickets' in this case

    const handleBuyAll = async () => {
        if (!user) {
            Alert.alert("Please log in", "You need to be logged in to proceed with the purchase.");
            return;
        }

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                cartItems: arrayUnion(...cartItems), // Send all items in the cart to Firestore
            });

            Alert.alert("Purchase successful", "All items have been bought.");
        } catch (error) {
            console.error("Error during purchase: ", error);
            Alert.alert("Error", "There was an issue completing your purchase.");
        }
    };

    const renderCartItem = ({ item }: { item: Ticket }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>Movie: {item.movie.title}</Text>
            <Text style={styles.cartItemText}>Selected Cinema: {item.cinema.naam}</Text>
        </View>
    );
    

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text>No Items in Cart</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            {cartItems.length > 0 && (
                <Button title="Buy All" onPress={handleBuyAll} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    cartItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        width: '100%',
    },
    cartItemText: {
        fontSize: 16,
    },
});

export default ShoppingCart;
