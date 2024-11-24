import { NavigationContainer } from "@react-navigation/native";
import { DrawerNav } from "./src/components/DrawerNav";
import UserProvider from "./src/context/UserProvider";
import { SQLiteProvider } from "expo-sqlite";
import "react-native-gesture-handler"

export default function App() {
  return (
    <UserProvider>
      <SQLiteProvider
        databaseName="patient.db"
        onInit={migrateDbIfNeeded}
      >
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      </SQLiteProvider>
    </UserProvider>
  );
}

async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync("PRAGMA user_version");
  let currentDbVersion = result.user_version;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE patient (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      CI TEXT NOT NULL CHECK(length(CI) <= 255),
      patient TEXT NOT NULL CHECK(length(patient) <= 255),
      mentor TEXT NOT NULL CHECK(length(mentor) <= 255)
    );
  `);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
