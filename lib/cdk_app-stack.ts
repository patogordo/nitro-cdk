import * as cdk from "aws-cdk-lib";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path = require("path");

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new Queue(this, "Queue", {
      queueName: "queue",
    });

    const lambdaFunction = new lambda.Function(this, "Function", {
      functionName: "function",
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,

      code: lambda.Code.fromAsset(path.join(__dirname, "..", "server.zip")),
    });

    lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    queue.grantSendMessages(lambdaFunction);
    queue.grantConsumeMessages(lambdaFunction);
  }
}
