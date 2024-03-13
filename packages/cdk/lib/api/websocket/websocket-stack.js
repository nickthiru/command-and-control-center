const { Stack, CfnOutput, RemovalPolicy } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { WebSocketApi, WebSocketStage } = require("aws-cdk-lib/aws-apigatewayv2");
const { WebSocketLambdaIntegration } = require("aws-cdk-lib/aws-apigatewayv2-integrations");
const { WebSocketLambdaAuthorizer } = require("aws-cdk-lib/aws-apigatewayv2-authorizers");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");
const path = require("path");


const webSocketRouteFunctionsPath = "../../../src/api/websocket/route";
const webSocketLambdaAuthorizerPath = "../../../src/api/websocket/lambda-authorizer.js";
const packageLockJsonFile = "../../../../../package-lock.json";


class WebSocketStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      // auth,
      storage,
    } = props;


    /*** Built-In Route Handling Lambdas ***/

    const webSocketConnectRouteLambda = new NodejsFunction(this, "WebSocketConnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${webSocketRouteFunctionsPath}/connect.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        APP_TABLE_NAME: storage.mainTable.tableName,
      }
    });

    const webSocketDisconnectRouteLambda = new NodejsFunction(this, "WebSocketDisconnectRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${webSocketRouteFunctionsPath}/disconnect.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        APP_TABLE_NAME: storage.mainTable.tableName,
      }
    });

    const webSocketDefaultRouteLambda = new NodejsFunction(this, "WebSocketDefaultRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${webSocketRouteFunctionsPath}/default.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        APP_TABLE_NAME: storage.mainTable.tableName,
      }
    });

    // Authorizer for 'connect' route
    // const webSocketLambdaAuthorizer = new NodejsFunction(this, "WebSocketLambdaAuthorizer", {
    //   runtime: Runtime.NODEJS_18_X,
    //   entry: (path.join(__dirname, webSocketLambdaAuthorizerPath)),
    //   handler: "handler",
    //   depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
    //   environment: {
    //     USER_POOL_ID: auth.userPool.userPoolId,
    //     USER_POOL_CLIENT_ID: auth.userPoolClient.userPoolClientId,
    //   }
    // });



    /*** WebSocket API ***/

    const webSocketApi = new WebSocketApi(this, "WebSocketApi", {

      // The route selection expression value will name the Lambda Function that will
      // be invoked (see "WebSocket Custom Routes" section below).
      routeSelectionExpression: "$request.body.action",


      // Built-in route settings

      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "ConnectRouteWebsocketLambdaIntegration",
          webSocketConnectRouteLambda
        ),
        // authorizer: new WebSocketLambdaAuthorizer(
        //   "WebSocketLambdaAuthorizer",
        //   webSocketLambdaAuthorizer,
        //   { identitySource: ["route.request.querystring.token"] }
        // )
      },

      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DisconnectRouteWebsocketLambdaIntegration",
          webSocketDisconnectRouteLambda
        )
      },

      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "DefaultRouteWebsocketLambdaIntegration",
          webSocketDefaultRouteLambda
        )
      },
    });



    /*** WebSocket Stages ***/

    const devWebSocketStage = new WebSocketStage(this, "DevWebSocketStage", {
      webSocketApi,
      stageName: "dev",
      autoDeploy: true,
    });



    /*** Custom Route Handling Lambdas ***/

    // const webSocketFromWebClientRouteLambda = new NodejsFunction(this, "WebSocketFromWebClientRouteLambda", {
    //   runtime: Runtime.NODEJS_18_X,
    //   entry: (path.join(__dirname, `${webSocketRouteFunctionsPath}/from-web-client.js`)),
    //   handler: "handler",
    //   depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
    //   initialPolicy: [
    //     // Authorize lambda to publish to all SNS topics
    //     new PolicyStatement({
    //       effect: Effect.ALLOW,
    //       resources: ["arn:aws:sns:us-east-1:654654543926:*"],
    //       actions: ["sns:Publish"]
    //     }),
    //     // Authorize cognito users, with temp STS token, to publish to SNS
    //     new PolicyStatement({
    //       effect: Effect.ALLOW,
    //       resources: ["arn:aws:sts::654654543926:assumed-role/*"],
    //       actions: ["sns:Publish"]
    //     })
    //   ]
    // });

    const webSocketToWebClientRouteLambda = new NodejsFunction(this, "WebSocketToWebClientRouteLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${webSocketRouteFunctionsPath}/to-web-client.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      initialPolicy: [
        // Authorize lambda to 'post-to-connection'
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:execute-api:us-east-1:654654543926:${webSocketApi.apiId}/${devWebSocketStage.stageName}/POST/@connections/*`],
          actions: ["execute-api:Invoke", "execute-api:ManageConnections"]
        }),
      ],
      environment: {
        APP_TABLE_NAME: storage.mainTable.tableName,
        WEBSOCKET_API_CONNECTION_URL: `https://${webSocketApi.apiId}.execute-api.us-east-1.amazonaws.com/${devWebSocketStage.stageName}`
      }
    });



    /*** Custom Route Integrations ***/

    // webSocketApi.addRoute("fromwebclient", {
    //   integration: new WebSocketLambdaIntegration(
    //     "FromWebClientRouteWebsocketLambdaIntegration",
    //     webSocketFromWebClientRouteLambda
    //   )
    // });

    webSocketApi.addRoute("towebclient", {
      integration: new WebSocketLambdaIntegration(
        "ToWebClientRouteWebsocketLambdaIntegration",
        webSocketToWebClientRouteLambda
      )
    });



    /*** Integrations ***/

    this.webSocketToWebClientRouteQueue = new Queue(this, "WebSocketToWebClientRouteQueue", {
    });

    new SqsToLambda(this, "WebSocketToWebClientRouteSqsToLambda", {
      existingQueueObj: this.webSocketToWebClientRouteQueue,
      existingLambdaObj: webSocketToWebClientRouteLambda
    });



    /*** Permissions ***/

    storage.mainTable.grantReadWriteData(webSocketConnectRouteLambda);
    storage.mainTable.grantReadWriteData(webSocketDisconnectRouteLambda);
    storage.mainTable.grantReadWriteData(webSocketToWebClientRouteLambda);



    /*** Outputs ***/

    // For web client
    new CfnOutput(this, "DevStageWebSocketApiEndpoint", {
      value: `${webSocketApi.apiEndpoint}/${devWebSocketStage.stageName}`,
      description: "'dev' stage websocket API endpoint to be used by web client",
      exportName: "DevStageWebSocketApiEndpoint"
    });
  }
}

module.exports = { WebSocketStack };