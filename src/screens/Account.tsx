import { Text, View, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
    const navigation = useNavigation();
    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <View className="bg-red p-4">
            <Text className="text-xl text-white">Account</Text>
            {user ? (
                <Text className="text-white mt-4">Ingelogd als: {user.email}</Text>
            ) : (
                <Text className="text-white mt-4">Geen ingelogde gebruiker</Text>
            )}
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    );
};

export default Account;
