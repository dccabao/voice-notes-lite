import React, { useState } from 'react'
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import { Audio } from 'expo-av'
import VoiceNoteItem from './components/VoiceNoteItem'
import { formatTime } from './utils/time'

export default function App() {
  const [recording, setRecording] = useState(null)
  const [recordings, setRecordings] = useState([])
  const [playing, setPlaying] = useState(null)

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync()
    if (permission.status !== 'granted') return

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    })

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    )

    setRecording(recording)
  }

  const stopRecording = async () => {
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    const timestamp = formatTime(new Date())
    setRecordings((prev) => [...prev, { uri, timestamp }])
    setRecording(null)
  }

  const playRecording = async (uri) => {
    if (playing) {
      await playing.unloadAsync()
      setPlaying(null)
      return
    }

    const { sound } = await Audio.Sound.createAsync({ uri })
    setPlaying(sound)
    await sound.playAsync()

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync()
        setPlaying(null)
      }
    })
  }

  const deleteRecording = (indexToDelete) => {
    setRecordings((prev) => prev.filter((_, index) => index !== indexToDelete))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Notes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.recordButton, recording ? styles.stop : styles.start]}
          onPress={recording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {recording ? '⏹ Stop Recording' : '🎙 Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recordings}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <VoiceNoteItem
            item={item}
            onPress={() => playRecording(item.uri)}
            onDelete={() => deleteRecording(index)}
          />
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  recordButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  start: {
    backgroundColor: '#0275d8',
  },
  stop: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})
