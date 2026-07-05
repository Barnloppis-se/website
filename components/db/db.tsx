import { init } from "@barnloppis-se/api";
import { ReactNode } from "react";

export default function DBContext({ url, children }: Readonly<{url: string, children: ReactNode}>) : ReactNode {
    init(url)

    console.log("Connected to backend...")

    return(
        <div className="w-full h-full">
            {children}
        </div>
    );
}
