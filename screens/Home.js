import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.ScreenWrapper}>
        <Image
          resizeMode="contain"
          style={styles.Image}
          source={{
            uri: "https://i.imgur.com/7Pi6VYq.png"
          }}
        />

        <Text style={styles.Paragraph}>
          With this application you can in a quick and easy way find jobs based
          on your skills and your interests.
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigate("Conversation");
            const setData = async () => {
              await AsyncStorage.setItem("bankid", "true")
                .then(() => {
                  // Save data success
                })
                .catch(err => {
                  console.log(err.message);
                });
            };

            setData();
          }}
          style={styles.button}
        >
          <Image
            style={styles.icon}
            source={{
              uri:
                "https://partner.ikanobank.se/web/site_files/img/_common/customer/Ikoner/BankID-white.png"
            }}
          />

          <Text style={styles.buttonText}>Get started!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate("Conversation");
            const setData = async () => {
              await AsyncStorage.setItem("bankid", "false")
                .then(() => {
                  // Save data success
                })
                .catch(err => {
                  console.log(err.message);
                });
            };

            setData();
          }}
          style={styles.options}
        >
          <Text style={styles.optionsText}>I don't have BankID</Text>
        </TouchableOpacity>
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
    opacity: 0.85,
    fontSize: 16,
    lineHeight: 23
  },

  button: {
    backgroundColor: "#3D7BA5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    padding: 15,
    borderRadius: 3,
    width: 300,
    marginTop: 30
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },

  icon: {
    width: 50,
    height: 50,
    marginRight: 15
  },

  optionsText: {
    color: "#222",
    fontSize: 17,
    paddingTop: 20
  }
});

export default HomeScreen;
