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
      style={{ backgroundColor: "dodgerblue", padding: 10, borderRadius: 50 }}
    >
      <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
        Find jobs
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
      hasBankID: "false"
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("bankid");

        if (value !== null) {
          this.setState({
            hasBankID: value
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
      backgroundColor: "dodgerblue"
    }
  };

  render() {
    const steps1 = [
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
        id: "3",
        message: "Awesome, whats your name?",
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
        message: "In what city do you want to work?",
        trigger: "7"
      },
      {
        id: "7",
        user: true,
        trigger: "8"
      },
      {
        id: "8",
        message: "And how old are you?",
        trigger: "9"
      },
      {
        id: "9",
        user: true,
        trigger: "10"
      },
      {
        id: "10",
        message: "What type of employment do you want?",
        trigger: "11"
      },
      {
        id: "11",
        user: true,
        trigger: "12"
      },
      {
        id: "12",
        message: "And finally, what do you want to work as?",
        trigger: "13"
      },
      {
        id: "13",
        user: true,
        trigger: "14"
      },
      {
        id: "14",
        message: "Awesome, I will find some great jobs for you very soon!",
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
        message: "Welcome to Nina, great that you have BankID!",
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
        id: "3",
        message: "What type of employment do you want?",
        trigger: "4"
      },
      {
        id: "4",
        user: true,
        trigger: "5"
      },
      {
        id: "5",
        message: "And, what do you want to work as?",
        trigger: "6"
      },
      {
        id: "6",
        user: true,
        trigger: "7"
      },
      {
        id: "7",
        message: "Awesome, I will find some great jobs for you very soon!",
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
        <TouchableOpacity
          onPress={({ renderedSteps, steps, values }) => {
            const data = {
              name: "Albin",
              city: "Stockholm",
              age: 19,
              employmentType: "Heltid",
              profession: "restaurang"
            };

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

            this.props.navigation.navigate("Jobs");
          }}
        >
          <Text>Skip</Text>
        </TouchableOpacity>
        <ChatBot
          submitButtonStyle={{
            backgroundColor: "dodgerblue",
            color: "white",
            borderRadius: 3,
            borderRadius: 50
          }}
          inputStyle={{ flex: 1, borderRadius: 50 }}
          userDelay={500}
          userBubbleColor="dodgerblue"
          userFontColor="white"
          avatarStyle={{ borderRadius: 50 }}
          botBubbleColor="#222"
          contentStyle={{ backgroundColor: "white" }}
          steps={this.state.hasBankID ? steps2 : steps1}
          handleEnd={({ renderedSteps, steps, values }) => {
            const data = {
              name: values[0],
              city: values[1],
              age: values[2],
              employmentType: values[3],
              profession: values[4]
            };

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
