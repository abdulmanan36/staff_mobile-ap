import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { Dashboard } from "./components/Dashboard";
import { ChildrenList } from "./components/ChildrenList";
import { ChildProfile } from "./components/ChildProfile";
import { AttendanceScreen } from "./components/AttendanceScreen";
import { DailyNotes } from "./components/DailyNotes";
import { IncidentReportScreen } from "./components/IncidentReportScreen";
import { ChatList } from "./components/ChatList";
import { ChatScreen } from "./components/ChatScreen";
import { ScheduleScreen } from "./components/ScheduleScreen";
import { HealthLogScreen } from "./components/HealthLogScreen";
import { PickupVerificationScreen } from "./components/PickupVerificationScreen";
import { AIAlerts } from "./components/AIAlerts";
import { SettingsScreen } from "./components/SettingsScreen";
import { UploadMedia } from "./components/UploadMedia";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState("Sarah Johnson");
  const [staffPhoto] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  );
  const [roomName] = useState("Room 2A - Toddlers");

  const handleLogin = (name: string) => {
    setStaffName(name);
    setIsLoggedIn(true);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("login");
    setStaffName("");
  };

  const navigateTo = (screen: string, data?: any) => {
    if (screen === "childProfile") {
      setSelectedChild(data);
    } else if (screen === "chat") {
      setSelectedChat(data);
    } else if (
      screen === "dailyNotes" ||
      screen === "healthLog" ||
      screen === "uploadMedia"
    ) {
      setSelectedChild(data);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      switch (currentScreen) {
        case "login":
          return (
            <LoginScreen
              onLogin={handleLogin}
              onNavigate={navigateTo}
            />
          );
        case "signup":
          return <SignupScreen onNavigate={navigateTo} />;
        case "forgotPassword":
          return (
            <ForgotPasswordScreen onNavigate={navigateTo} />
          );
        default:
          return (
            <LoginScreen
              onLogin={handleLogin}
              onNavigate={navigateTo}
            />
          );
      }
    }

    switch (currentScreen) {
      case "dashboard":
        return (
          <Dashboard
            staffName={staffName}
            staffPhoto={staffPhoto}
            roomName={roomName}
            onNavigate={navigateTo}
          />
        );
      case "children":
        return <ChildrenList onNavigate={navigateTo} />;
      case "childProfile":
        return (
          <ChildProfile
            child={selectedChild}
            onNavigate={navigateTo}
          />
        );
      case "attendance":
        return (
          <AttendanceScreen
            roomName={roomName}
            onNavigate={navigateTo}
          />
        );
      case "dailyNotes":
        return (
          <DailyNotes
            child={selectedChild}
            onNavigate={navigateTo}
          />
        );
      case "uploadMedia":
        return (
          <UploadMedia
            child={selectedChild}
            onNavigate={navigateTo}
          />
        );
      case "incidents":
        return <IncidentReportScreen onNavigate={navigateTo} />;
      case "chatList":
        return <ChatList onNavigate={navigateTo} />;
      case "chat":
        return (
          <ChatScreen
            parent={selectedChat}
            onNavigate={navigateTo}
          />
        );
      case "schedule":
        return <ScheduleScreen onNavigate={navigateTo} />;
      case "healthLog":
        return (
          <HealthLogScreen
            selectedChild={selectedChild}
            onNavigate={navigateTo}
          />
        );
      case "pickup":
        return (
          <PickupVerificationScreen onNavigate={navigateTo} />
        );
      case "aiAlerts":
        return <AIAlerts onNavigate={navigateTo} />;
      case "settings":
        return (
          <SettingsScreen
            staffName={staffName}
            staffPhoto={staffPhoto}
            onLogout={handleLogout}
            onNavigate={navigateTo}
          />
        );
      default:
        return (
          <Dashboard
            staffName={staffName}
            staffPhoto={staffPhoto}
            roomName={roomName}
            onNavigate={navigateTo}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {renderScreen()}
    </div>
  );
}