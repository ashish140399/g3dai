import * as React from "react";
import Container from "@mui/material/Container";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid, TextareaAutosize } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
    AddMechanic,
    ScoreMechanic,
    LabelHead,
    PageHeading,
    IOSSlider,
} from "./style";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const axios = require("axios");

const { Configuration, OpenAIApi } = require("openai");
// require("dotenv").config();
const fs = require("fs");

export default function Home() {
    let htmlContent = `<!DOCTYPE html>
  <html>
  <head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babylonjs/5.45.1/babylon.js" integrity="sha512-g9mJaOgYqoC/OBhGGXaa7O5gcbbdDd+gekoF34XiSPV9I3m5QSNWBrloKwU6je2OcpD/uMW+DhzO4lozJ4z9UQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <style>
    html,body{
      margin:0;
      padding:0;
    }
      body{
        background: #424D6D;
      
      }
      canvas {
        width: 500px;
        height: 300px;
      }
    </style>
  </head>
  <body></body>
  <script>
    const template = document.createElement('canvas');
    template.setAttribute('id','renderCanvas');
    document.body.appendChild(template);
  </script>
  </html>`;
    const [response, setResponse] = React.useState<string>(htmlContent);
    const [respfetched, setRespfetched] = React.useState<any>(null);
    const [showloader, setShowloader] = React.useState<any>(null);
    const [showscreen, setShowscreen] = React.useState(true);
    const [iptresponse, setIptresponse] = React.useState<string>("");
    const [chatgptmodel, setChatgptmodel] = React.useState("0");
    const handleChange = (event: SelectChangeEvent) => {
        setChatgptmodel(event.target.value as string);
    };
    const [outputwork, setOutputwork] = React.useState("0");
    const handleOutputChange = (event: SelectChangeEvent) => {
        setOutputwork(event.target.value as string);
    };
    const API_KEY = process.env.REACT_APP_API_KEY;
    const configuration = new Configuration({
        apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const fetchData = async () => {
        setShowloader(true);
        const before = "HTML code to";
        const middle = iptresponse;
        const after = "using babylonJS";
        const text = before + middle + after;
        const completion = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: text,
                temperature: 0,
                max_tokens: 1000,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(completion);
        let myresponse = completion.data.choices[0].text;
        let opt = htmlContent + myresponse;
        setResponse(opt);
        setShowloader(false);
        setShowscreen(false);
        setRespfetched(true);
        console.log(text, opt);
    };
    console.log(iptresponse);

    const resetpage = () => {
        setResponse(htmlContent);
        setShowloader(null);
        setShowscreen(true);
        setRespfetched(null);
        setIptresponse("");
        setChatgptmodel("0");
        setOutputwork("0");
    };
    return (
        <Layout>
            {showloader ? (
                <div className="overlay">
                    <CircularProgress />
                </div>
            ) : null}

            <Container component="main" maxWidth="lg">
                {showscreen ? (
                    <AddMechanic>
                        <PageHeading>Add Mechanic</PageHeading>
                        <Grid container>
                            <Grid item sm={5}>
                                <Box component="form" noValidate>
                                    <div className="minbx">
                                        <LabelHead>
                                            Choose your AI model
                                        </LabelHead>
                                        <Select
                                            labelId="modelselect"
                                            id="modelselect"
                                            defaultValue={chatgptmodel}
                                            value={chatgptmodel}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={0}>
                                                Chat GPT
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                Chat GPT 3.0
                                            </MenuItem>
                                        </Select>
                                    </div>
                                    <LabelHead>Add a 3D asset</LabelHead>
                                    <div className="buttonOuter">
                                        <Button variant="contained">
                                            Use Standard
                                        </Button>
                                        <Button variant="contained">
                                            Generate New
                                        </Button>
                                        <Button variant="contained">
                                            Import own
                                        </Button>
                                    </div>
                                    <div className="minbx ipte">
                                        <LabelHead>
                                            Input your text request
                                        </LabelHead>
                                        <TextareaAutosize
                                            required
                                            minRows={2}
                                            id="inputtext"
                                            name="prompt"
                                            autoFocus
                                            onChange={(e) =>
                                                setIptresponse(e.target.value)
                                            }
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={() => fetchData()}
                                            className="submitbutton"
                                        >
                                            Generate mechanic
                                        </Button>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item sm={7}></Grid>
                        </Grid>
                    </AddMechanic>
                ) : (
                    <ScoreMechanic>
                        <div className="backbutton" onClick={() => resetpage()}>
                            <img src="./return.png" alt="" />
                        </div>
                        <PageHeading>Score Mechanic</PageHeading>
                        <Grid container>
                            <Grid item sm={5}>
                                <Box component="form" noValidate>
                                    <div className="minbx">
                                        <LabelHead>
                                            Did this work as intented?
                                        </LabelHead>
                                        <Select
                                            labelId="modelselect"
                                            id="modelselect"
                                            defaultValue={outputwork}
                                            value={outputwork}
                                            onChange={handleOutputChange}
                                        >
                                            <MenuItem value={0}>Yes</MenuItem>
                                            <MenuItem value={1}>No</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="minbx">
                                        <LabelHead>
                                            How would you score this out of 100?
                                        </LabelHead>
                                        <div className="sliderbx">
                                            <IOSSlider
                                                aria-label="ios slider"
                                                defaultValue={60}
                                                valueLabelDisplay="on"
                                            />
                                            <div className="rnge">
                                                <div>0</div>
                                                <div>100</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="minbx ipte">
                                        <LabelHead>
                                            Add any relevant text feedback here
                                        </LabelHead>
                                        <TextareaAutosize
                                            required
                                            minRows={2}
                                            id="inputtext"
                                            name="prompt"
                                            autoFocus
                                        />
                                        <Button
                                            variant="contained"
                                            className="submitbutton"
                                        >
                                            Submit Results
                                        </Button>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item sm={7}>
                                <iframe
                                    srcDoc={response}
                                    scrolling="no"
                                    frameBorder="0"
                                ></iframe>
                            </Grid>
                        </Grid>
                    </ScoreMechanic>
                )}

                {/* <div className="contentbox">
                    {respfetched ? (
                        <iframe
                            srcDoc={response}
                            scrolling="no"
                            frameBorder="0"
                        ></iframe>
                    ) : showloader ? (
                        <CircularProgress />
                    ) : null}
                </div> */}
            </Container>
        </Layout>
    );
}

const Layout = styled.div`
    padding-top: 90px;
    .overlay {
        position: fixed;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .MuiCircularProgress-root {
        color: #c4fc04;
    }
    .MuiInputBase-root {
        width: 100% !important;
        .MuiSelect-icon {
            color: #fff !important;
            // display: none !important;
        }
    }
    iframe {
        overflow: hidden !important;
        height: 300px;
        width: 500px;
        box-shadow: none !important;
        outline: 0 !important;
        border: 1px solid #ff60dd !important;
        border-radius: 12px;
    }
    .contentbox {
        display: flex;
        align-items: Center;
        justify-content: Center;
        min-height: 300px;
    }
    .minbx {
        max-width: 350px;
        margin-bottom: 40px;
        &.ipte {
            margin-top: 40px;
        }
    }
    .buttonOuter {
        display: flex;
        .MuiButtonBase-root {
            background: #424d6d !important;
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
            border-radius: 8px !important;
            font-weight: 400 !important;
            font-size: 14px !important;
            color: #e0e0e0 !important;
            margin-right: 14px;
            white-space: nowrap !important;
        }
    }
    .submitbutton {
        width: 100% !important;
        font-weight: 600 !important;
        margin-top: 32px !important;
    }
`;
