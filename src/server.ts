import { Server } from "http";
import app from "./app";
import configs from "./app/configs";


let server: Server;

const main = async () => {
  try {
    server = app.listen(configs.port, () => {
      console.log(`🟢🔵🟢 Server Is Running On Port ${configs.port} 🟢🔵🟢`);
    });
  } catch (err) {
    console.dir(err, { depth: Infinity });
  }
};

main();

process.on("unhandledRejection", (reason, promise) => {
  console.log({ reason, promise });

  if (server) {
    server.close((err) => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(` 🔴🔴🔴 Server detected unCaughtException 😡`);
  process.exit(1);
});
