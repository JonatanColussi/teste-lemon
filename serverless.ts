import type { AWS } from '@serverless/typescript';

import schema from './src/schema';

const serverlessConfiguration: AWS = {
  service: 'teste-lemon',
  configValidationMode: 'error',
  frameworkVersion: '3',
  plugins: ['serverless-plugin-typescript'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'us-east-1',
    logs: {
      httpApi: true,
    },
    httpApi: {
      cors: true,
    },
    apiGateway: {
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction'],
        Resource: '*',
      },
    ],
  },
  functions: {
    eligibility: {
      handler: 'src/handler.eligibility',
      events: [
        {
          http: {
            method: 'post',
            path: 'eligibility',
            request: {
              schemas: {
                'application/json': schema,
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
