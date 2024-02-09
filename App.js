import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários:</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Atualizar" onPress={handleRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
