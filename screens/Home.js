import React from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { Image, View, StyleSheet, AsyncStorage } from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.ScreenWrapper}>
        <Image
          style={styles.Image}
          source={require("../assets/img/home.jpg")}
        />
        <Title center>Welcome!</Title>
        <Paragraph center>
          Need a job within a day? That's fully possible with Nina.
        </Paragraph>

        <Button onClick={() => navigate("Conversation")}>Nu kör vi!</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    width: 250,
    height: 250
  },
  ScreenWrapper: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  Paragraph: {
    textAlign: "center",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 20,
    opacity: 0.85
  }
});

export default HomeScreen;
