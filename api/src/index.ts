import { createApi } from "@/api";
import env from "@/lib/env";

const app = createApi({
  logger: true
});

async function start() {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();