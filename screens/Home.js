import React from "react";
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
          Med den här appen kan du snabbt och enkelt utforska och hitta jobb
          baserad på dina preferenser.
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

          <Text style={styles.buttonText}>Kom igång med BankID</Text>
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
          <Text style={styles.optionsText}>Jag har inte BankID</Text>
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
    padding: 15,
    borderRadius: 3,
    backgroundColor: "#3C7CA6",
    marginTop: 30,
    width: Dimensions.get("window").width - 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 15
  },

  optionsText: {
    color: "#222",
    fontSize: 17,
    paddingTop: 20
  }
});

export default HomeScreen;
