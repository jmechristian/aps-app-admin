## APS Push Fanout Lambda (DynamoDB Streams)

This folder contains a ready-to-drop-in Lambda handler to send **Expo push notifications** when:
- a DM message is created (`ApsDmMessage`)
- an announcement is created (`ApsAdminAnnouncement`)

### How to wire it in Amplify Gen1

Because Amplify Gen1 manages the GraphQL/Dynamo resources, the cleanest setup is:

- Create an Amplify function (Node 18) (via `amplify add function`)
- Enable **DynamoDB Stream triggers** on the `ApsDmMessage` and `ApsAdminAnnouncement` tables
- Add environment variables listed below
- Paste `src/index.mjs` as the handler

### Required environment variables

- `PUSH_TOKEN_TABLE_NAME`: DynamoDB table name for `ApsPushToken`
- `PUSH_TOKEN_GSI_NAME`: the GSI name for querying tokens by user (the `byUserUpdated` index)
- `EXPO_PUSH_URL` (optional): defaults to `https://exp.host/--/api/v2/push/send`
- `EXPO_ACCESS_TOKEN` (optional): if you use Expo Push Security

### Notes

- The handler assumes `ApsPushToken` items contain `{ userId, token }` where `userId` is the Cognito `sub`.
- For announcements it scans all tokens (acceptable for small events). For large installs, add a sharded token fanout strategy.


