import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

prisma.$on("error", (err) => {
  console.log(`🔴 ${err.message}
      >> ${err.timestamp}
      >> ${err.target}
    `)
});


prisma.$on("query", (event) => {
  console.log(`🟢 ${event.query}
      >> ${event.timestamp}
      >> ${event.target}
      >> ${event.query}
    `)
});

export default prisma;
