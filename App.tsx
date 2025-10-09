import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);
  const getTheData = async () => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL!);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getTheData();
  },[])
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
      data={data?.data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <Text>{item.title}</Text>
        )
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
