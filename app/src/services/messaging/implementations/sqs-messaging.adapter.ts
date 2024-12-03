import {
  DeleteMessageBatchCommand,
  DeleteMessageCommand,
  Message,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";
import { MessagingAdapter } from "../interfaces/messaging.adapter";

const sqsClient = new SQSClient({
  // region: process.env.AWS_SQS_REGION,
  // credentials: {
  //   accountId: process.env.AWS_SQS_ACCOUNT_ID,
  //   accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY,
  // },
  useQueueUrlAsEndpoint: false,
});

const produce = async (queue: string, data: any) => {
  await sqsClient.send(
    new SendMessageCommand({
      QueueUrl: queue,
      MessageBody: JSON.stringify(data),
    })
  );
};

const consume = async (queue: string) => {
  const messages = await sqsClient.send(
    new ReceiveMessageCommand({
      QueueUrl: queue,
      WaitTimeSeconds: 0.5,
    })
  );

  return messages?.Messages || [];
};

const acknowledge = async (queue: string, message: Message) => {
  await sqsClient.send(
    new DeleteMessageCommand({
      QueueUrl: queue,
      ReceiptHandle: message.ReceiptHandle,
    })
  );
};

const batchAcknowledge = async (queue: string, messages: Message[]) => {
  if (!messages.length) {
    return;
  }

  await sqsClient.send(
    new DeleteMessageBatchCommand({
      QueueUrl: queue,
      Entries: messages.map((m) => ({
        Id: m.MessageId,
        ReceiptHandle: m.ReceiptHandle,
      })),
    })
  );
};

export const awsMessagingAdapter: MessagingAdapter = {
  produce,
  consume,
  acknowledge,
  batchAcknowledge,
};

