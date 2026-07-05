declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Barnloppis API backend URL
             */
            readonly BACKEND: string
        }
    }
}
export{}
