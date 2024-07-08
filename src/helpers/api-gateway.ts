import type { APIGatewayProxyResult } from 'aws-lambda';

export function formatJSONResponse(data: Record<string, any>, statusCode?: number) {
  return {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'Application/json',
    },
    statusCode: statusCode || 200,
  } as APIGatewayProxyResult;
}
