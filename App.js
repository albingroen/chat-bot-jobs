import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import ConversationScreen from "./screens/Conversation";

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Conversation: { screen: ConversationScreen }
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
