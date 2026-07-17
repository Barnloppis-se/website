declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Barnloppis server backend URL
             */
            readonly NEXT_PUBLIC_BACKEND: string
        }
    }
}
export{}
