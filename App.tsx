import { StatusBar } from 'expo-status-bar';
import  Header  from './src/components/Header';
import { StyleSheet, Text, View } from 'react-native';
import BottomAppBar from './src/components/BottomAppBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Text>Welkom bij Ciné Gent!</Text>
      <StatusBar style="auto" />
      <BottomAppBar></BottomAppBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
