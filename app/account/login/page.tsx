"use client"
import { useNavigator } from "@/components/app/Navigator";
import { useAuth } from "@/components/auth/auth";
import LoadingIndicator from "@/components/ui/popup/LoadingIndicator";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
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
    const [ load, setLoad ] = useState(false);

    return(
        <Box className="flex w-full h-fit py-10">
            <form className="m-auto bg-blue-50 px-8 py-12 rounded-sm" onSubmit={e => {
                e.preventDefault();
                setLoad(true);
                auth.login({ email, password }).then(user => {
                    if(user) navigator.navigate("/");
                    else setError("Kunde inte logga in");
                    setLoad(false);
                })
            }}>
                <div className="pb-10">
                    <Image
                        className="w-80 h-auto rounded-sm"
                        src={"/Logo - Barnloppis ( stor ).jpeg"}
                        alt="Barnloppis.se loga (stor)"
                        width={400}
                        height={400}
                        loading="lazy"
                    />
                </div>
                <Box className="w-full flex flex-col">
                    <div className="m-auto">
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
                    </div>
                    <div className="m-auto">
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
                    </div>
                </Box>
                <Box className="w-full flex">
                    <Button className="m-auto mt-5" type="submit" variant="outlined">Logga in</Button>
                </Box>
                <Typography className="ml-5 mt-5" color="error">{error}</Typography>
            </form>
            {load && <LoadingIndicator label="Loggar in..." />}
        </Box>
    );
}
