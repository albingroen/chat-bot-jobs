import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import ConversationScreen from "./screens/Conversation";
import JobScreen from "./screens/Jobs";

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Conversation: { screen: ConversationScreen },
    Jobs: { screen: JobScreen }
  },
  {
    navigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Bakåt"
    }
  }
);

export default App;
