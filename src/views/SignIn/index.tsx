import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../shared/Copyright";
import styled from "styled-components";

export default function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography component="h1" variant="h5" className="heading">
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <div className="textfieldlabel">Email</div>
                        <TextField
                            style={{ marginBottom: "20px !important" }}
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            placeholder="Enter your email"
                        />
                        <div className="textfieldlabel">Password</div>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ marginTop: "8px" }}
                        >
                            Log in
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </Layout>
    );
}

const Layout = styled.div`
    display: flex;
    align-items: Center;
    min-height: 100vh;
    .heading {
        font-weight: 700;
        font-size: 30px;
        margin-bottom: 32px;
    }
    .textfieldlabel {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 8px;
    }
`;
