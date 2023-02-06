import * as React from "react";
import Container from "@mui/material/Container";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const axios = require("axios");

const { Configuration, OpenAIApi } = require("openai");
// require("dotenv").config();
const fs = require("fs");

export default function Home() {
    let htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      canvas {
        width: 490px;
        height: 290px;
      }
    </style>
  </head>
  <body>
  </body>
  <script>

  const template = document.createElement('canvas');
  template.setAttribute('id','renderCanvas');
  document.body.appendChild(template);
  </script>
  </html>`;
    const [response, setResponse] = React.useState<string>(htmlContent);
    const [respfetched, setRespfetched] = React.useState<any>(null);
    const [iptresponse, setIptresponse] = React.useState<string>("");
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    async function fetchData() {
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

        let myresponse = completion.data.choices[0].text;
        let opt = htmlContent + myresponse;
        setResponse(opt);
        setRespfetched(true);
        console.log(text, opt);
    }
    // React.useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <Layout>
            <Container component="main" maxWidth="md">
                {/* <input
                    type="text"
                    onChange={(e) => setIptresponse(e.target.value)}
                /> */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="prompt"
                    onChange={(e) => setIptresponse(e.target.value)}
                />
                <Button variant="contained" onClick={() => fetchData()}>
                    Submit
                </Button>
                <div className="contentbox">
                    {respfetched ? (
                        <iframe
                            srcDoc={response}
                            scrolling="no"
                            frameBorder="0"
                        ></iframe>
                    ) : (
                        <CircularProgress />
                    )}
                </div>
            </Container>
        </Layout>
    );
}

const Layout = styled.div`
    iframe {
        overflow: hidden !important;
        height: 300px;
        width: 500px;
        border: 0 !important;
        box-shadow: none !important;
        outline: 0 !important;
    }
    .contentbox {
        display: flex;
        align-items: Center;
        justify-content: Center;
        min-height: 300px;
    }
`;
