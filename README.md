# Voice Notes Lite (React Native / Expo)

This is a simple voice memo app built using **React Native with Expo**. The app allows users to record and playback short voice notes, and persists them locally using AsyncStorage.

---

## 🛠 Features

- Start and stop voice recording
- View saved recordings with timestamps
- Tap to play any saved recording
- Delete a voice note
- Persist recordings list using AsyncStorage
- Custom styled buttons and basic animation

---

## 🚀 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/dccabao/voice-notes-lite
cd voice-notes-lite
```

Install dependencies
npm install

# or

yarn

npx expo start

Then press i to open it on the iOS Simulator, or scan the QR code with Expo Go.

✅ Requires Xcode if running on iOS Simulator

⸻

📌 Notes on My Approach
• Used expo-av for recording and playback (no native modules required)
• Audio files are stored temporarily, but their metadata (uri, timestamp) is persisted using AsyncStorage
• Kept components modular with VoiceNoteItem for clean rendering
• Added basic UI enhancements like color-coded buttons and fade-in animation
• Focused on clarity and testability within the 1-hour constraint
