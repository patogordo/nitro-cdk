import { messaging } from "~/global";

export default defineEventHandler(async () => {
  const startTime = Date.now();

  await messaging.produce("queue", {
    hello: "world",
  });

  const endTime = Date.now();

  return {
    time: endTime - startTime,
    ok: true,
  };
});


