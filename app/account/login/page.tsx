"use client"
import { useNavigator } from "@/components/app/Navigator";
import { useAuth } from "@/components/auth/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

/**
 * Login page
 */
export default function Login(): ReactNode {
    const auth = useAuth();
    const navigator = useNavigator();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ error, setError ] = useState<string>();

    return(
        <Box className="flex w-full h-fit py-10">
            <form className="m-auto" onSubmit={e => {
                e.preventDefault();
                auth.login({ email, password }).then(_ => {
                    if(auth.user) navigator.navigate("/");
                    else setError("Kunde inte logga in");
                })
            }}>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    required
                    placeholder="Fyll i email"
                    value={email}
                    onChange={e => {
                        e.preventDefault();
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    className="my-3"
                    id="password"
                    label="Lösenord"
                    type="password"
                    required
                    placeholder="Fyll i lösenord"
                    value={password}
                    onChange={e => {
                        e.preventDefault();
                        setPassword(e.target.value);
                    }}
                />
                <Button type="submit" variant="outlined">Logga in</Button>
                <Typography color="error">{error}</Typography>
            </form>
        </Box>
    );
}
