import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import axios from "axios";

class JobsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=19&nyckelord=programmering",
        {
          headers: {
            "Accept-Language": "application/json"
          }
        }
      )
      .then(res => {
        this.setState({
          jobs: res.data.matchningslista.matchningdata
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { jobs } = this.state;

    return (
      <ScrollView style={{ backgroundColor: "#f4f4f4", flex: 1 }}>
        {jobs.length > 0 ? (
          jobs.map(job => {
            return <JobCard key={job.annonsid} job={job} />;
          })
        ) : (
          <Text>Laddar...</Text>
        )}
      </ScrollView>
    );
  }
}

export default JobsScreen;

export class JobCard extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 0
    };
  }

  loadInfo(id) {
    axios
      .get(`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`, {
        headers: {
          "Accept-Language": "application/json"
        }
      })
      .then(res => {
        this.setState({
          jobInfo: res.data.platsannons.annons,
          size: 1
        });
      });
  }

  renderTags(text) {
    const exampleTags = [
      "Javascript",
      "Programmering",
      "Kod",
      "Webbutveckling",
      "Junior"
    ];

    console.log({ text });

    if (this.state.size === 1) {
      const matches = exampleTags
        .filter(tag => text.includes(tag.toLocaleLowerCase()))
        .map(tag => tag);

      if (matches === undefined) {
        return [];
      } else {
        return matches;
      }
    }
  }

  render() {
    const { job } = this.props;
    const { jobInfo, size } = this.state;

    return size === 0 ? (
      <TouchableOpacity
        onPress={() => this.loadInfo(job.annonsid)}
        style={{
          backgroundColor: "white",
          borderRadius: 3,
          padding: 20,
          margin: 10
        }}
      >
        <Text style={{ fontSize: 20 }}>{job.annonsrubrik}</Text>
        <Text style={{ fontSize: 14, fontWeight: "600", paddingTop: 10 }}>
          {job.arbetsplatsnamn}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => this.setState({ size: 0 })}
        style={{
          backgroundColor: "white",
          borderRadius: 3,
          padding: 20,
          margin: 10
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          {job.annonsrubrik}
        </Text>
        <Text
          style={{
            fontSize: 20,
            opacity: 0.7,
            fontWeight: "600",
            paddingTop: 10
          }}
        >
          {job.arbetsplatsnamn}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", paddingTop: 20 }}>
          {this.renderTags(jobInfo.annonstext).map(m => {
            return (
              <View
                key={m}
                style={{
                  backgroundColor: "#222",
                  padding: 7,
                  borderRadius: 5,
                  display: "inline-flex",
                  margin: 5
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>{m}</Text>
              </View>
            );
          })}
        </View>

        <Text style={{ fontSize: 14, paddingTop: 20 }}>
          {jobInfo.annonstext}
        </Text>
      </TouchableOpacity>
    );
  }
}
