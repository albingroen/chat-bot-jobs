import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ChatBot from "react-native-chatbot";
import KeyboardAvoid from "../components/KeyboardAvoid";
import Button from "../components/Button";
import Title from "../components/Title";

export const Hand = props => {
  const { triggerNextStep } = props;

  console.log(triggerNextStep);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={() => triggerNextStep({ trigger: "3" })}
        style={{
          height: 50,
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "dodgerblue",
          marginRight: 15
        }}
      >
        <Text style={{ fontSize: 25 }}>👍</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => triggerNextStep({ trigger: "3" })}
        style={{
          height: 50,
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "dodgerblue"
        }}
      >
        <Text style={{ fontSize: 25 }}>🔥</Text>
      </TouchableOpacity>
    </View>
  );
};

class ConversationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clickedHand: false
    };
  }

  static navigationOptions = {
    title: "Nina",
    headerTintColor: "white",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "dodgerblue"
    }
  };

  render() {
    const { clickedHand } = this.state;

    const steps = [
      {
        id: "0",
        message: "Welcome to Nina!",
        trigger: "1"
      },
      {
        id: "1",
        message: "Lets get started",
        trigger: "2"
      },
      {
        id: "2",
        component: <Hand />,
        waitAction: true
      },
      {
        id: 3,
        message: "Awesome!"
      }
    ];

    return (
      <View style={styles.ScreenWrapper}>
        <ChatBot
          avatarStyle={{ borderRadius: 50 }}
          botBubbleColor="#222"
          contentStyle={{ backgroundColor: "white" }}
          steps={steps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white"
  }
});

export default ConversationScreen;
