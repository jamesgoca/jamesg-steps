import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import Nav from "../components/nav";
import AppFooter from "../components/footer";
import FullBox from "../components/fullbox";
import styled from "styled-components";
import { Grid, Box, Text, Heading } from "grommet";

const StyledBox = styled(Box)`
  border: 3px solid black;
`;

function Home({ steps_data, goals_data, date, yesterday }) {
  return (
    <div>
      <Head>
        <title>james gallagher steps</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="an internet home for @jamesg_oca" />

        <meta itemprop="name" content="James Gallagher" />
        <meta itemprop="description" content="an internet home for @jamesg_oca" />
        <meta itemprop="image" content="/meta.png" />

        <meta property="og:url" content="https://jamesg.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="James Gallagher" />
        <meta property="og:description" content="an internet home for @jamesg_oca" />
        <meta property="og:image" content="/meta.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="James Gallagher" />
        <meta name="twitter:description" content="an internet home for @jamesg_oca" />
        <meta name="twitter:image" content="/meta.png" />
      </Head>
      <Grid align="center">
        <FullBox>
          <Nav />
          <h1 className="title">James Gallagher Steps</h1>
          <hr />
        </FullBox>
        <FullBox>
            <h2 className="title">Hello, I'm James!</h2>
            <Text>This project is designed to hold me accountable for my step count.</Text><br />
            <StyledBox align="center" pad="large">
              <Text weight="bold">{date}</Text>
              <br />
              <Text>Today's Step Count: {steps_data["activities-steps"][2]["value"]} steps.</Text>
              <Text>Today's Goal: {goals_data["goals"]["steps"]} steps.</Text>
              <br />
              {parseInt(steps_data["activities-steps"][2]["value"]) > parseInt(goals_data["goals"]["steps"]) ? (
                <Text style={{ color: "green" }}>James has already met his goal!</Text>
              ) : (
                <Text style={{ color: "red" }}>James has not yet met his goal!</Text>
              )}
              <br />
              {parseInt(steps_data["activities-steps"][2]["value"]) > parseInt(steps_data["activities-steps"][1]["value"]) ? (
                <Text style={{ color: "green" }}>James has improved from yesterday! 🔥</Text>
              ) : (
                <Text style={{ color: "red" }}>James has not improved from yesterday (yet). 🏃</Text>
              )}
            </StyledBox><br />
            <StyledBox align="center" pad="large">
              <Text weight="bold">{yesterday}</Text>
              <br />
              <Text>Yesterday's Step Count: {steps_data["activities-steps"][1]["value"]} steps.</Text>
              <Text>Yesterday's Goal: {goals_data["goals"]["steps"]} steps.</Text>
              <br />
              {parseInt(steps_data["activities-steps"][1]["value"]) > parseInt(goals_data["goals"]["steps"]) ? (
                <Text style={{ color: "green" }}>James met his goal!</Text>
              ) : (
                <Text style={{ color: "red" }}>James did not meet his goal!</Text>
              )}
              <br />
              {parseInt(steps_data["activities-steps"][1]["value"]) > parseInt(steps_data["activities-steps"][0]["value"]) ? (
                <Text style={{ color: "green" }}>James has improved from yesterday! 🔥</Text>
              ) : (
                <Text style={{ color: "red" }}>James has not improved from the day before (yet). 🏃</Text>
              )}
            </StyledBox><br />
            <Text>I am trying to become more active every day, and so I have decided to start publishing my step counts. If you see that yesterday's step count is less than 10,000, give James a <a href="mailto:jamesg@jamesg.app" style={{ color: '#627AFE', textDecoration: "none" }}>nudge</a> and tell him to keep focusing on his goal!</Text><br />
        </FullBox>
      </Grid>
      <AppFooter />
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  var today = new Date();

  console.log(process.env.FITBIT_KEY)

  var date = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
  var yesterday = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + (today.getDate() - 1);
  var day_before = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + (today.getDate() - 2);

  const getStepsData = new Request(`https://api.fitbit.com/1/user/-/activities/steps/date/${day_before}/${date}.json`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${process.env.FITBIT_KEY}`},
    mode: 'cors',
    cache: 'default',
  });

  const getGoalsData = new Request('https://api.fitbit.com/1/user/-/activities/goals/daily.json', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${process.env.FITBIT_KEY}`},
    mode: 'cors',
    cache: 'default',
  });

  const steps = await fetch(getStepsData)
  const steps_data = await steps.json()

  const goals = await fetch(getGoalsData)
  const goals_data = await goals.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      steps_data,
      goals_data,
      date,
      yesterday
    },
  }
}

export default Home;
