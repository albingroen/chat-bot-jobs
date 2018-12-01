import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HeaderLeft = props => (
  <TouchableOpacity onPress={() => props.navigate("Home", {})}>
    <View style={styles.Container}>
      <Text style={styles.Text}>Nina</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 16,
    alignItems: "center"
  },
  Text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  }
});

export default HeaderLeft;
