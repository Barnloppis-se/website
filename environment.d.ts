declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Barnloppis server backend URL
             */
            readonly BACKEND: string
        }
    }
}
export{}
