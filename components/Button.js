import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";

const Button = props => {
  const { onClick, submit, disabled, children } = props;

  return disabled ? (
    <TouchableOpacity>
      <View
        style={[
          styles.Button,
          submit && { backgroundColor: "#62D288", opacity: 0.5 }
        ]}
      >
        <Text style={styles.ButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={[styles.Button, submit && { backgroundColor: "#62D288" }]}>
        <Text style={styles.ButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    padding: 15,
    borderRadius: 3,
    marginBottom: 50,
    backgroundColor: "#3D7BA5",
    marginTop: 30,
    width: Dimensions.get("window").width - 40
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18
  }
});

export default Button;
