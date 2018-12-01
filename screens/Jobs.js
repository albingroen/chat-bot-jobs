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

    console.log(jobs);

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
      size: 0,
      jobInfo: {}
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
        console.log(res.data);
        this.setState({
          jobInfo: res.data.platsannons.annons,
          size: 1
        });
      });
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
        <Text style={{ fontSize: 20 }}>{job.annonsrubrik}</Text>
        <Text style={{ fontSize: 14, fontWeight: "600", paddingTop: 10 }}>
          {job.arbetsplatsnamn}
        </Text>
        <Text style={{ fontSize: 14, paddingTop: 20 }}>
          {jobInfo.annonstext}
        </Text>
      </TouchableOpacity>
    );
  }
}
