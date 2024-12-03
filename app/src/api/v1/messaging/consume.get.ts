import { messaging } from "~/global";

export default defineEventHandler(async () => {
  const startTime = Date.now();

  const messages = await messaging.consume("queue");

  await messaging.batchAcknowledge("queue", messages);

  const endTime = Date.now();

  return {
    time: endTime - startTime,
    messages,
  };
});

