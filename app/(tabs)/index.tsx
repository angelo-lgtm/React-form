import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Index() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [married, setMarried] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Password:', password);
    console.log('Age:', age);
    console.log('Bio:', bio);
    console.log('Gender:', gender);
    console.log('Married:', married);
    console.log('Notifications:', notifications);
    console.log('Country:', country);
    console.log('Rating:', rating);
    console.log('Date:', date.toDateString());
    console.log('Time:', time.toTimeString().slice(0, 5));
    console.log('Image:', image || 'none');
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Registration Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Short Bio</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Tell us about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Text style={styles.label}>Gender</Text>
      {['Male', 'Female', 'Other'].map(option => (
        <View key={option} style={styles.row}>
          <Button
            title={gender === option ? `● ${option}` : `○ ${option}`}
            onPress={() => setGender(option)}
            color="#2e7d32"
          />
        </View>
      ))}

      <Text style={styles.label}>Marital Status</Text>
      <View style={styles.row}>
        <Button
          title={married ? 'Married' : '# Married'}
          onPress={() => setMarried(prev => !prev)}
          color="#2e7d32"
        />
      </View>

      <Text style={styles.label}>Enable Notifications</Text>
      <View style={styles.row}>
        <Text>{notifications ? 'On' : 'Off'}</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor="#2e7d32"
          trackColor={{ true: '#a5d6a7', false: '#ccc' }}
        />
      </View>

      <Text style={styles.label}>Country</Text>
      <View style={styles.picker}>
        <Picker selectedValue={country} onValueChange={setCountry}>
          <Picker.Item label="-- Select country --" value="" />
          <Picker.Item label="Rwanda" value="rwanda" />
          <Picker.Item label="Kenya" value="kenya" />
          <Picker.Item label="Uganda" value="uganda" />
          <Picker.Item label="USA" value="usa" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <Text style={styles.label}>Rating: {rating} / 15</Text>
      <Slider
        minimumValue={0}
        maximumValue={15}
        step={1}
        value={rating}
        onValueChange={setRating}
        minimumTrackTintColor="#2e7d32"
        thumbTintColor="#2e7d32"
      />

      <Text style={styles.label}>Date: {date.toDateString()}</Text>
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(event, selected) => selected && setDate(selected)}
      />

      <Text style={[styles.label, { marginTop: 10 }]}>
        Time: {time.toTimeString().slice(0, 5)}
      </Text>
      <DateTimePicker
        value={time}
        mode="time"
        onChange={(event, selected) => selected && setTime(selected)}
      />

      <Text style={[styles.label, { marginTop: 10 }]}>Profile Photo</Text>
      <Button title="Pick Image" onPress={pickImage} color="#2e7d32" />
      <Text style={styles.small}>{image ? image.split('/').pop() : 'No image selected'}</Text>

      <View style={styles.submitBtn}>
        <Button title="Submit" onPress={handleSubmit} color="#2e7d32" />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#f1f8f1',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 6,
    backgroundColor: '#f1f8f1',
  },
  small: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  submitBtn: {
    marginTop: 24,
    marginBottom: 40,
  },
});
