import { Message } from "@aws-sdk/client-sqs";

export type MessagingAdapter = {
  consume(queue: string): Promise<Message[]>;
  produce(queue: string, data: any): Promise<void>;
  acknowledge(queue: string, message: Message): Promise<void>;
  batchAcknowledge(queue: string, messages: Message[]): Promise<void>;
};

