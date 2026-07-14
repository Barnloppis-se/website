"use client"
import { init } from "@barnloppis-se/api";
import { ReactNode, useEffect } from "react";

export default function DBContext({ url, children }: Readonly<{url: string, children: ReactNode}>) : ReactNode {
    useEffect(() => {
        init(url);
        console.log("Connected to backend...");
    }, []);

    return(
        <div className="w-full h-full">
            {children}
        </div>
    );
}
