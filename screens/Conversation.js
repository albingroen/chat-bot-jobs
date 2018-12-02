import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import ChatBot from "react-native-chatbot";

export const Button = props => {
  const { handleFindJobs } = props;

  return (
    <TouchableOpacity
      onPress={() => handleFindJobs()}
      style={{ backgroundColor: "#3C7CA6", padding: 10, borderRadius: 50 }}
    >
      <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
        Visa jobb!
      </Text>
    </TouchableOpacity>
  );
};

export const Hand = props => {
  const { triggerNextStep } = props;

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
      data: {},
      hasBankID: "false",
      loaded: false
    };
  }

  componentWillMount() {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("bankid");

        if (value !== null) {
          this.setState({
            hasBankID: value,
            loaded: true
          });
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    fetchData();
  }

  static navigationOptions = {
    title: "Nina",
    headerTintColor: "white",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#3C7CA6"
    }
  };

  render() {
    const steps1 = [
      {
        id: "0",
        message: "Välkommen, jag heter Nina",
        trigger: "1"
      },
      {
        id: "1",
        message: "Nu kör vi",
        trigger: "2"
      },
      {
        id: "2",
        component: <Hand />,
        waitAction: true
      },
      {
        id: "3",
        message: "Grymt, vad heter du?",
        trigger: "4"
      },
      {
        id: "4",
        user: true,
        trigger: "5"
      },
      {
        id: "5",
        message: "Great",
        trigger: "6"
      },
      {
        id: "6",
        message: "I vilket län skulle vilja jobba?",
        trigger: "7"
      },
      {
        id: "7",
        user: true,
        trigger: "8"
      },
      {
        id: "8",
        message: "Och hur gammal är du?",
        trigger: "9"
      },
      {
        id: "9",
        user: true,
        trigger: "10"
      },
      {
        id: "10",
        message: "Vilken jobb-typ är du ute efter? (Heltid/Deltid)",
        trigger: "11"
      },
      {
        id: "11",
        user: true,
        trigger: "12"
      },
      {
        id: "12",
        message: "Och sist, vad vill du jobba med? (eg. programmering)",
        trigger: "13"
      },
      {
        id: "13",
        user: true,
        trigger: "14"
      },
      {
        id: "14",
        message: "Super, jag letar upp jobb som passar dig!",
        trigger: "15"
      },
      {
        id: "15",
        component: (
          <Button
            handleFindJobs={() => this.props.navigation.navigate("Jobs")}
          />
        ),
        end: true
      }
    ];

    const steps2 = [
      {
        id: "0",
        message: "Välkommen, jag heter Nina - Kul att du har BankID!",
        trigger: "1"
      },
      {
        id: "1",
        message: "Nu kör vi",
        trigger: "2"
      },
      {
        id: "2",
        component: <Hand />,
        waitAction: true
      },

      {
        id: "3",
        message: "Vilken jobb-typ är du ute efter? (Heltid/Deltid)",
        trigger: "4"
      },
      {
        id: "4",
        user: true,
        trigger: "5"
      },
      {
        id: "5",
        message: "Och sist, vad vill du jobba med? (eg. programmering)",
        trigger: "6"
      },
      {
        id: "6",
        user: true,
        trigger: "7"
      },
      {
        id: "7",
        message: "Super, jag letar upp jobb som passar dig!",
        trigger: "8"
      },
      {
        id: "8",
        component: (
          <Button
            handleFindJobs={() => this.props.navigation.navigate("Jobs")}
          />
        ),
        end: true
      }
    ];

    return (
      <View style={styles.ScreenWrapper}>
        {this.state.loaded && (
          <ChatBot
            submitButtonStyle={{
              backgroundColor: "#3C7CA6",
              color: "white",
              borderRadius: 3,
              borderRadius: 50
            }}
            inputStyle={{ flex: 1, borderRadius: 50 }}
            userDelay={500}
            userBubbleColor="#3C7CA6"
            userFontColor="white"
            avatarStyle={{ borderRadius: 50 }}
            botBubbleColor="#222"
            contentStyle={{ backgroundColor: "white" }}
            steps={this.state.hasBankID === "true" ? steps2 : steps1}
            handleEnd={({ renderedSteps, steps, values }) => {
              let data;

              if (this.state.hasBankID === "true") {
                data = {
                  name: "Albin",
                  city: "Stockholm",
                  age: 19,
                  employmentType: values[0],
                  profession: values[1]
                };
              } else {
                data = {
                  name: values[0],
                  city: values[1],
                  age: values[2],
                  employmentType: values[3],
                  profession: values[4]
                };
              }

              const setData = async () => {
                await AsyncStorage.setItem("data", JSON.stringify(data))
                  .then(() => {
                    // Set data success
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
              };

              setData();
            }}
          />
        )}
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
