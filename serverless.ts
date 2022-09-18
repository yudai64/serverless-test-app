import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import createUser from "@functions/users/create";

const serverlessConfiguration: AWS = {
  service: "serverless-test-app",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ], // 必要なプラグインをここに設定
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    // 利用するすべてのLambdaに設定する環境変数
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      NODE_ENV: process.env.NODE_ENV,
    },
    iam: {
      role: {
        managedPolicies: [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
        ],
      },
    },
  },
  // import the function via paths
  functions: { hello, createUser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        dbpath: "dynamodb",
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
  },
  resources: {
    Resources: {
      usersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "usersTable",
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
