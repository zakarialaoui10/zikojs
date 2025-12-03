import { createSPAFileBasedRouter } from "ziko/router";

globalThis.pairs = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)