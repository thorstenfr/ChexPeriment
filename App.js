import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_KEY = 'ITEMS_KEY';

const App = () => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await AsyncStorage.getItem(ITEMS_KEY);
        if (items) {
          setItems(JSON.parse(items));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handlePress = () => {
    setItems([...items, { key: Date.now(), value }]);
    setValue('');
  };

  useEffect(() => {
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  const handleDelete = key => {
    setItems(items.filter(item => item.key !== key));
  };

  return (
    <View style={{ padding: 30 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setValue(text)}
        value={value}
        placeholder="Enter value here"
      />
      <Button title="Hinzufügen" onPress={handlePress} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{new Date(item.key).toLocaleDateString()} {item.value} </Text>
            <Button title="Delete" onPress={() => handleDelete(item.key)} />
          </View>
        )}
      />
    </View>
  );
};

export default App;
