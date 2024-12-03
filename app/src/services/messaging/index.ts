import { awsMessagingAdapter } from "./implementations/sqs-messaging.adapter";
import { MessagingAdapter } from "./interfaces/messaging.adapter";

export const messaging: MessagingAdapter = awsMessagingAdapter;
