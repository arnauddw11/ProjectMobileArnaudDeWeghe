import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import { useAppSelector } from "../store";
import { db } from "../config/firebase";
import { updateDoc, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { clearTickets } from '../store/tickets/slice';
import { useAppDispatch } from '../store';

interface Movie {
    id: number;
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
    const cartItems = useAppSelector((state) => state.tickets); 
    const dispatch = useAppDispatch();

    const groupedCartItems = cartItems.reduce((acc, item) => {
        const key = `${item.movie.id}-${item.cinema.naam}`; 
        if (acc[key]) {
            acc[key].count += 1;
        } else {
            acc[key] = { item, count: 1 };
        }
        return acc;
    }, {} as Record<string, { item: Ticket, count: number }>);

    const handleBuyAll = async () => {
        if (!user) {
            Alert.alert("Please log in", "You need to be logged in to proceed with the purchase.");
            return;
        }
    
        try {
            const userDocRef = doc(db, "users", user.uid);
    
            const docSnapshot = await getDoc(userDocRef);
            if (!docSnapshot.exists()) {
                await setDoc(userDocRef, { cartItems: [] });
            }
    
            const userSpecificCartItems = cartItems.map((item) => ({
                ...item,
                userId: user.uid,
                addedAt: Date.now(),
            }));
    
            await updateDoc(userDocRef, {
                cartItems: arrayUnion(...userSpecificCartItems),
            });
    
            dispatch(clearTickets());
            Alert.alert("Purchase successful", "All items have been bought.");
        } catch (error) {
            console.error("Error during purchase:", error);
            Alert.alert("Error", `Purchase failed: ${error}`);
        }
    };

    const renderCartItem = ({ item }: { item: { item: Ticket, count: number } }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>Movie: {item.item.movie.title}</Text>
            <Text style={styles.cartItemText}>Selected Cinema: {item.item.cinema.naam}</Text>
            {item.count > 1 && (
                <Text style={styles.cartItemText}>Quantity: {item.count}</Text>
            )}
        </View>
    );

    const groupedItemsArray = Object.values(groupedCartItems);

    return (
        <View style={styles.container}>
            {groupedItemsArray.length === 0 ? (
                <Text>No Items in Cart</Text>
            ) : (
                <FlatList
                    data={groupedItemsArray}
                    renderItem={renderCartItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            {groupedItemsArray.length > 0 && (
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
