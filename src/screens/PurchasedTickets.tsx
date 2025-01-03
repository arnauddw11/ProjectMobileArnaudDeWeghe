import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { auth, db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

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

const PurchasedTickets = () => {
    const [purchasedTickets, setPurchasedTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false); // For pull-to-refresh

    const fetchPurchasedTickets = async () => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                setPurchasedTickets(data.cartItems || []);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching purchased tickets: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasedTickets();
    }, []); // Only run once on mount

    const onRefresh = () => {
        setRefreshing(true);
        fetchPurchasedTickets(); // Refetch data
        setRefreshing(false);
    };

    const renderTicketItem = ({ item }: { item: Ticket }) => (
        <View style={styles.ticketItem}>
            <Text style={styles.ticketText}>Movie: {item.movie.title}</Text>
            <Text style={styles.ticketText}>Cinema: {item.cinema.naam}</Text>
            <Text style={styles.ticketText}>Location: {item.cinema.ligging}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading tickets...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {purchasedTickets.length === 0 ? (
                <Text style={styles.emptyText}>No purchased tickets found.</Text>
            ) : (
                <FlatList
                    data={purchasedTickets}
                    renderItem={renderTicketItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} // Trigger refetch
                            colors={["#0000ff"]}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ticketItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    ticketText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
    },
});

export default PurchasedTickets;
