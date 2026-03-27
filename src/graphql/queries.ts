/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getApsTempCredential = /* GraphQL */ `query GetApsTempCredential($id: ID!) {
  getApsTempCredential(id: $id) {
    id
    apsID
    registrantId
    email
    tempPasswordCiphertext
    tempPasswordIv
    tempPasswordTag
    expiresAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsTempCredentialQueryVariables,
  APITypes.GetApsTempCredentialQuery
>;
export const listApsTempCredentials = /* GraphQL */ `query ListApsTempCredentials(
  $filter: ModelApsTempCredentialFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsTempCredentials(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      registrantId
      email
      tempPasswordCiphertext
      tempPasswordIv
      tempPasswordTag
      expiresAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsTempCredentialsQueryVariables,
  APITypes.ListApsTempCredentialsQuery
>;
export const getApsAppUserNote = /* GraphQL */ `query GetApsAppUserNote($id: ID!) {
  getApsAppUserNote(id: $id) {
    id
    owner
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    note
    sessionId
    session {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    registrantId
    registrant {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    companyId
    company {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    apsAppUserNotesId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserNoteQueryVariables,
  APITypes.GetApsAppUserNoteQuery
>;
export const listApsAppUserNotes = /* GraphQL */ `query ListApsAppUserNotes(
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserNotesQueryVariables,
  APITypes.ListApsAppUserNotesQuery
>;
export const getApsAppUserFavoriteExhibitor = /* GraphQL */ `query GetApsAppUserFavoriteExhibitor($id: ID!) {
  getApsAppUserFavoriteExhibitor(id: $id) {
    id
    owner
    userProfileId
    userProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    favoriteKey
    createdAt
    updatedAt
    aPSFavoriteExhibitorsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserFavoriteExhibitorQueryVariables,
  APITypes.GetApsAppUserFavoriteExhibitorQuery
>;
export const listApsAppUserFavoriteExhibitors = /* GraphQL */ `query ListApsAppUserFavoriteExhibitors(
  $filter: ModelApsAppUserFavoriteExhibitorFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserFavoriteExhibitors(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      exhibitorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserFavoriteExhibitorsQueryVariables,
  APITypes.ListApsAppUserFavoriteExhibitorsQuery
>;
export const getApsAppUserFavoriteSpeaker = /* GraphQL */ `query GetApsAppUserFavoriteSpeaker($id: ID!) {
  getApsAppUserFavoriteSpeaker(id: $id) {
    id
    owner
    userProfileId
    userProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    speakerId
    speaker {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    favoriteKey
    createdAt
    updatedAt
    aPSFavoriteSpeakersId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserFavoriteSpeakerQueryVariables,
  APITypes.GetApsAppUserFavoriteSpeakerQuery
>;
export const listApsAppUserFavoriteSpeakers = /* GraphQL */ `query ListApsAppUserFavoriteSpeakers(
  $filter: ModelApsAppUserFavoriteSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserFavoriteSpeakers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      speakerId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserFavoriteSpeakersQueryVariables,
  APITypes.ListApsAppUserFavoriteSpeakersQuery
>;
export const getApsAppUserFavoriteSponsor = /* GraphQL */ `query GetApsAppUserFavoriteSponsor($id: ID!) {
  getApsAppUserFavoriteSponsor(id: $id) {
    id
    owner
    userProfileId
    userProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    sponsorId
    sponsor {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    favoriteKey
    createdAt
    updatedAt
    aPSFavoriteSponsorsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserFavoriteSponsorQueryVariables,
  APITypes.GetApsAppUserFavoriteSponsorQuery
>;
export const listApsAppUserFavoriteSponsors = /* GraphQL */ `query ListApsAppUserFavoriteSponsors(
  $filter: ModelApsAppUserFavoriteSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserFavoriteSponsors(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sponsorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSponsorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserFavoriteSponsorsQueryVariables,
  APITypes.ListApsAppUserFavoriteSponsorsQuery
>;
export const getApsAppUserFavoriteSession = /* GraphQL */ `query GetApsAppUserFavoriteSession($id: ID!) {
  getApsAppUserFavoriteSession(id: $id) {
    id
    owner
    userProfileId
    userProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    sessionId
    session {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    favoriteKey
    createdAt
    updatedAt
    aPSFavoriteSessionsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserFavoriteSessionQueryVariables,
  APITypes.GetApsAppUserFavoriteSessionQuery
>;
export const listApsAppUserFavoriteSessions = /* GraphQL */ `query ListApsAppUserFavoriteSessions(
  $filter: ModelApsAppUserFavoriteSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserFavoriteSessions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sessionId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSessionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserFavoriteSessionsQueryVariables,
  APITypes.ListApsAppUserFavoriteSessionsQuery
>;
export const getApsAppUserFavoriteContact = /* GraphQL */ `query GetApsAppUserFavoriteContact($id: ID!) {
  getApsAppUserFavoriteContact(id: $id) {
    id
    owner
    userProfileId
    userProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    contactProfileId
    contactProfile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    favoriteKey
    createdAt
    updatedAt
    aPSFavoriteContactsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserFavoriteContactQueryVariables,
  APITypes.GetApsAppUserFavoriteContactQuery
>;
export const listApsAppUserFavoriteContacts = /* GraphQL */ `query ListApsAppUserFavoriteContacts(
  $filter: ModelApsAppUserFavoriteContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserFavoriteContacts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      contactProfileId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserFavoriteContactsQueryVariables,
  APITypes.ListApsAppUserFavoriteContactsQuery
>;
export const getApsContactRequest = /* GraphQL */ `query GetApsContactRequest($id: ID!) {
  getApsContactRequest(id: $id) {
    id
    eventId
    requestKey
    userAId
    userBId
    owners
    requestedByUserId
    status
    acceptedAt
    declinedAt
    blockedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsContactRequestQueryVariables,
  APITypes.GetApsContactRequestQuery
>;
export const listApsContactRequests = /* GraphQL */ `query ListApsContactRequests(
  $filter: ModelApsContactRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsContactRequests(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      requestKey
      userAId
      userBId
      owners
      requestedByUserId
      status
      acceptedAt
      declinedAt
      blockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsContactRequestsQueryVariables,
  APITypes.ListApsContactRequestsQuery
>;
export const getApsDmThread = /* GraphQL */ `query GetApsDmThread($id: ID!) {
  getApsDmThread(id: $id) {
    id
    eventId
    dmKey
    userAId
    userBId
    owners
    participantStates {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    lastMessageAt
    lastMessagePreview
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsDmThreadQueryVariables,
  APITypes.GetApsDmThreadQuery
>;
export const listApsDmThreads = /* GraphQL */ `query ListApsDmThreads(
  $filter: ModelApsDmThreadFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsDmThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      eventId
      dmKey
      userAId
      userBId
      owners
      lastMessageAt
      lastMessagePreview
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsDmThreadsQueryVariables,
  APITypes.ListApsDmThreadsQuery
>;
export const getApsDmParticipantState = /* GraphQL */ `query GetApsDmParticipantState($id: ID!) {
  getApsDmParticipantState(id: $id) {
    id
    eventId
    threadId
    thread {
      id
      eventId
      dmKey
      userAId
      userBId
      owners
      lastMessageAt
      lastMessagePreview
      createdAt
      updatedAt
      __typename
    }
    userId
    lastReadAt
    unreadCount
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsDmParticipantStateQueryVariables,
  APITypes.GetApsDmParticipantStateQuery
>;
export const listApsDmParticipantStates = /* GraphQL */ `query ListApsDmParticipantStates(
  $filter: ModelApsDmParticipantStateFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsDmParticipantStates(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      threadId
      userId
      lastReadAt
      unreadCount
      lastMessageAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsDmParticipantStatesQueryVariables,
  APITypes.ListApsDmParticipantStatesQuery
>;
export const getApsDmMessage = /* GraphQL */ `query GetApsDmMessage($id: ID!) {
  getApsDmMessage(id: $id) {
    id
    eventId
    threadId
    thread {
      id
      eventId
      dmKey
      userAId
      userBId
      owners
      lastMessageAt
      lastMessagePreview
      createdAt
      updatedAt
      __typename
    }
    senderUserId
    sender {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    owners
    type
    body
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsDmMessageQueryVariables,
  APITypes.GetApsDmMessageQuery
>;
export const listApsDmMessages = /* GraphQL */ `query ListApsDmMessages(
  $filter: ModelApsDmMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsDmMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      eventId
      threadId
      senderUserId
      owners
      type
      body
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsDmMessagesQueryVariables,
  APITypes.ListApsDmMessagesQuery
>;
export const getApsAdminAnnouncement = /* GraphQL */ `query GetApsAdminAnnouncement($id: ID!) {
  getApsAdminAnnouncement(id: $id) {
    id
    eventId
    title
    body
    deepLink
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAdminAnnouncementQueryVariables,
  APITypes.GetApsAdminAnnouncementQuery
>;
export const listApsAdminAnnouncements = /* GraphQL */ `query ListApsAdminAnnouncements(
  $filter: ModelApsAdminAnnouncementFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAdminAnnouncements(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      title
      body
      deepLink
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAdminAnnouncementsQueryVariables,
  APITypes.ListApsAdminAnnouncementsQuery
>;
export const getApsUserEngageState = /* GraphQL */ `query GetApsUserEngageState($id: ID!) {
  getApsUserEngageState(id: $id) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsUserEngageStateQueryVariables,
  APITypes.GetApsUserEngageStateQuery
>;
export const listApsUserEngageStates = /* GraphQL */ `query ListApsUserEngageStates(
  $filter: ModelApsUserEngageStateFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsUserEngageStates(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      userId
      lastSeenAnnouncementAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsUserEngageStatesQueryVariables,
  APITypes.ListApsUserEngageStatesQuery
>;
export const getApsPushToken = /* GraphQL */ `query GetApsPushToken($id: ID!) {
  getApsPushToken(id: $id) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsPushTokenQueryVariables,
  APITypes.GetApsPushTokenQuery
>;
export const listApsPushTokens = /* GraphQL */ `query ListApsPushTokens(
  $filter: ModelApsPushTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsPushTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      token
      platform
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsPushTokensQueryVariables,
  APITypes.ListApsPushTokensQuery
>;
export const apsTempCredentialsByApsIDAndCreatedAt = /* GraphQL */ `query ApsTempCredentialsByApsIDAndCreatedAt(
  $apsID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsTempCredentialFilterInput
  $limit: Int
  $nextToken: String
) {
  apsTempCredentialsByApsIDAndCreatedAt(
    apsID: $apsID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      registrantId
      email
      tempPasswordCiphertext
      tempPasswordIv
      tempPasswordTag
      expiresAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsTempCredentialsByApsIDAndCreatedAtQueryVariables,
  APITypes.ApsTempCredentialsByApsIDAndCreatedAtQuery
>;
export const apsTempCredentialsByRegistrantIdAndCreatedAt = /* GraphQL */ `query ApsTempCredentialsByRegistrantIdAndCreatedAt(
  $registrantId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsTempCredentialFilterInput
  $limit: Int
  $nextToken: String
) {
  apsTempCredentialsByRegistrantIdAndCreatedAt(
    registrantId: $registrantId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      registrantId
      email
      tempPasswordCiphertext
      tempPasswordIv
      tempPasswordTag
      expiresAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsTempCredentialsByRegistrantIdAndCreatedAtQueryVariables,
  APITypes.ApsTempCredentialsByRegistrantIdAndCreatedAtQuery
>;
export const apsAppUserNotesByUserId = /* GraphQL */ `query ApsAppUserNotesByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesByUserIdQueryVariables,
  APITypes.ApsAppUserNotesByUserIdQuery
>;
export const apsAppUserNotesBySessionId = /* GraphQL */ `query ApsAppUserNotesBySessionId(
  $sessionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesBySessionId(
    sessionId: $sessionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesBySessionIdQueryVariables,
  APITypes.ApsAppUserNotesBySessionIdQuery
>;
export const apsAppUserNotesByExhibitorId = /* GraphQL */ `query ApsAppUserNotesByExhibitorId(
  $exhibitorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesByExhibitorId(
    exhibitorId: $exhibitorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesByExhibitorIdQueryVariables,
  APITypes.ApsAppUserNotesByExhibitorIdQuery
>;
export const apsAppUserNotesByRegistrantId = /* GraphQL */ `query ApsAppUserNotesByRegistrantId(
  $registrantId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesByRegistrantId(
    registrantId: $registrantId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesByRegistrantIdQueryVariables,
  APITypes.ApsAppUserNotesByRegistrantIdQuery
>;
export const apsAppUserNotesByProfileId = /* GraphQL */ `query ApsAppUserNotesByProfileId(
  $profileId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesByProfileId(
    profileId: $profileId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesByProfileIdQueryVariables,
  APITypes.ApsAppUserNotesByProfileIdQuery
>;
export const apsAppUserNotesByCompanyId = /* GraphQL */ `query ApsAppUserNotesByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserNotesByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userId
      note
      sessionId
      exhibitorId
      registrantId
      profileId
      companyId
      createdAt
      updatedAt
      apsAppUserNotesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserNotesByCompanyIdQueryVariables,
  APITypes.ApsAppUserNotesByCompanyIdQuery
>;
export const apsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt(
  $userProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteExhibitorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt(
    userProfileId: $userProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      exhibitorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteExhibitorsByExhibitorIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteExhibitorsByExhibitorIdAndCreatedAt(
  $exhibitorId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteExhibitorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteExhibitorsByExhibitorIdAndCreatedAt(
    exhibitorId: $exhibitorId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      exhibitorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteExhibitorsByExhibitorIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteExhibitorsByExhibitorIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteExhibitorsByEventIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteExhibitorsByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteExhibitorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteExhibitorsByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      exhibitorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteExhibitorsByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteExhibitorsByEventIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteExhibitorsByFavoriteKey = /* GraphQL */ `query ApsAppUserFavoriteExhibitorsByFavoriteKey(
  $favoriteKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteExhibitorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteExhibitorsByFavoriteKey(
    favoriteKey: $favoriteKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      exhibitorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteExhibitorsByFavoriteKeyQueryVariables,
  APITypes.ApsAppUserFavoriteExhibitorsByFavoriteKeyQuery
>;
export const apsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt(
  $userProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt(
    userProfileId: $userProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      speakerId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
  $speakerId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
    speakerId: $speakerId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      speakerId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSpeakersByEventIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSpeakersByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSpeakersByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      speakerId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSpeakersByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSpeakersByEventIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSpeakersByFavoriteKey = /* GraphQL */ `query ApsAppUserFavoriteSpeakersByFavoriteKey(
  $favoriteKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSpeakersByFavoriteKey(
    favoriteKey: $favoriteKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      speakerId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSpeakersByFavoriteKeyQueryVariables,
  APITypes.ApsAppUserFavoriteSpeakersByFavoriteKeyQuery
>;
export const apsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt(
  $userProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt(
    userProfileId: $userProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sponsorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSponsorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSponsorsBySponsorIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSponsorsBySponsorIdAndCreatedAt(
  $sponsorId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSponsorsBySponsorIdAndCreatedAt(
    sponsorId: $sponsorId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sponsorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSponsorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSponsorsBySponsorIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSponsorsBySponsorIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSponsorsByEventIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSponsorsByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSponsorsByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sponsorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSponsorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSponsorsByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSponsorsByEventIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSponsorsByFavoriteKey = /* GraphQL */ `query ApsAppUserFavoriteSponsorsByFavoriteKey(
  $favoriteKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSponsorsByFavoriteKey(
    favoriteKey: $favoriteKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sponsorId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSponsorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSponsorsByFavoriteKeyQueryVariables,
  APITypes.ApsAppUserFavoriteSponsorsByFavoriteKeyQuery
>;
export const apsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt(
  $userProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt(
    userProfileId: $userProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sessionId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSessionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSessionsByUserProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSessionsByUserProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSessionsBySessionIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSessionsBySessionIdAndCreatedAt(
  $sessionId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSessionsBySessionIdAndCreatedAt(
    sessionId: $sessionId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sessionId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSessionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSessionsBySessionIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSessionsBySessionIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSessionsByEventIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteSessionsByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSessionsByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sessionId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSessionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSessionsByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteSessionsByEventIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteSessionsByFavoriteKey = /* GraphQL */ `query ApsAppUserFavoriteSessionsByFavoriteKey(
  $favoriteKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteSessionsByFavoriteKey(
    favoriteKey: $favoriteKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      sessionId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteSessionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteSessionsByFavoriteKeyQueryVariables,
  APITypes.ApsAppUserFavoriteSessionsByFavoriteKeyQuery
>;
export const apsAppUserFavoriteContactsByUserProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteContactsByUserProfileIdAndCreatedAt(
  $userProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteContactsByUserProfileIdAndCreatedAt(
    userProfileId: $userProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      contactProfileId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteContactsByUserProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteContactsByUserProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteContactsByContactProfileIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteContactsByContactProfileIdAndCreatedAt(
  $contactProfileId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteContactsByContactProfileIdAndCreatedAt(
    contactProfileId: $contactProfileId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      contactProfileId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteContactsByContactProfileIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteContactsByContactProfileIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteContactsByEventIdAndCreatedAt = /* GraphQL */ `query ApsAppUserFavoriteContactsByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteContactsByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      contactProfileId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteContactsByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAppUserFavoriteContactsByEventIdAndCreatedAtQuery
>;
export const apsAppUserFavoriteContactsByFavoriteKey = /* GraphQL */ `query ApsAppUserFavoriteContactsByFavoriteKey(
  $favoriteKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFavoriteContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserFavoriteContactsByFavoriteKey(
    favoriteKey: $favoriteKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      userProfileId
      contactProfileId
      eventId
      favoriteKey
      createdAt
      updatedAt
      aPSFavoriteContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserFavoriteContactsByFavoriteKeyQueryVariables,
  APITypes.ApsAppUserFavoriteContactsByFavoriteKeyQuery
>;
export const apsContactRequestsByRequestKey = /* GraphQL */ `query ApsContactRequestsByRequestKey(
  $requestKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsContactRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  apsContactRequestsByRequestKey(
    requestKey: $requestKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      requestKey
      userAId
      userBId
      owners
      requestedByUserId
      status
      acceptedAt
      declinedAt
      blockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsContactRequestsByRequestKeyQueryVariables,
  APITypes.ApsContactRequestsByRequestKeyQuery
>;
export const apsContactRequestsByRequestedByUserIdAndCreatedAt = /* GraphQL */ `query ApsContactRequestsByRequestedByUserIdAndCreatedAt(
  $requestedByUserId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsContactRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  apsContactRequestsByRequestedByUserIdAndCreatedAt(
    requestedByUserId: $requestedByUserId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      requestKey
      userAId
      userBId
      owners
      requestedByUserId
      status
      acceptedAt
      declinedAt
      blockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsContactRequestsByRequestedByUserIdAndCreatedAtQueryVariables,
  APITypes.ApsContactRequestsByRequestedByUserIdAndCreatedAtQuery
>;
export const apsContactRequestsByStatusAndUpdatedAt = /* GraphQL */ `query ApsContactRequestsByStatusAndUpdatedAt(
  $status: String!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsContactRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  apsContactRequestsByStatusAndUpdatedAt(
    status: $status
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      requestKey
      userAId
      userBId
      owners
      requestedByUserId
      status
      acceptedAt
      declinedAt
      blockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsContactRequestsByStatusAndUpdatedAtQueryVariables,
  APITypes.ApsContactRequestsByStatusAndUpdatedAtQuery
>;
export const apsDmThreadsByDmKey = /* GraphQL */ `query ApsDmThreadsByDmKey(
  $dmKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsDmThreadFilterInput
  $limit: Int
  $nextToken: String
) {
  apsDmThreadsByDmKey(
    dmKey: $dmKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      dmKey
      userAId
      userBId
      owners
      lastMessageAt
      lastMessagePreview
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsDmThreadsByDmKeyQueryVariables,
  APITypes.ApsDmThreadsByDmKeyQuery
>;
export const apsDmParticipantStatesByThreadIdAndUserId = /* GraphQL */ `query ApsDmParticipantStatesByThreadIdAndUserId(
  $threadId: ID!
  $userId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsDmParticipantStateFilterInput
  $limit: Int
  $nextToken: String
) {
  apsDmParticipantStatesByThreadIdAndUserId(
    threadId: $threadId
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      threadId
      userId
      lastReadAt
      unreadCount
      lastMessageAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsDmParticipantStatesByThreadIdAndUserIdQueryVariables,
  APITypes.ApsDmParticipantStatesByThreadIdAndUserIdQuery
>;
export const apsDmParticipantStatesByUserIdAndLastMessageAt = /* GraphQL */ `query ApsDmParticipantStatesByUserIdAndLastMessageAt(
  $userId: ID!
  $lastMessageAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsDmParticipantStateFilterInput
  $limit: Int
  $nextToken: String
) {
  apsDmParticipantStatesByUserIdAndLastMessageAt(
    userId: $userId
    lastMessageAt: $lastMessageAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      threadId
      userId
      lastReadAt
      unreadCount
      lastMessageAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsDmParticipantStatesByUserIdAndLastMessageAtQueryVariables,
  APITypes.ApsDmParticipantStatesByUserIdAndLastMessageAtQuery
>;
export const apsDmMessagesByThreadIdAndCreatedAt = /* GraphQL */ `query ApsDmMessagesByThreadIdAndCreatedAt(
  $threadId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsDmMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  apsDmMessagesByThreadIdAndCreatedAt(
    threadId: $threadId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      threadId
      senderUserId
      owners
      type
      body
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsDmMessagesByThreadIdAndCreatedAtQueryVariables,
  APITypes.ApsDmMessagesByThreadIdAndCreatedAtQuery
>;
export const apsDmMessagesBySenderUserIdAndCreatedAt = /* GraphQL */ `query ApsDmMessagesBySenderUserIdAndCreatedAt(
  $senderUserId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsDmMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  apsDmMessagesBySenderUserIdAndCreatedAt(
    senderUserId: $senderUserId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      threadId
      senderUserId
      owners
      type
      body
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsDmMessagesBySenderUserIdAndCreatedAtQueryVariables,
  APITypes.ApsDmMessagesBySenderUserIdAndCreatedAtQuery
>;
export const apsAdminAnnouncementsByEventIdAndCreatedAt = /* GraphQL */ `query ApsAdminAnnouncementsByEventIdAndCreatedAt(
  $eventId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsAdminAnnouncementFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAdminAnnouncementsByEventIdAndCreatedAt(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      title
      body
      deepLink
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAdminAnnouncementsByEventIdAndCreatedAtQueryVariables,
  APITypes.ApsAdminAnnouncementsByEventIdAndCreatedAtQuery
>;
export const apsPushTokensByUserIdAndUpdatedAt = /* GraphQL */ `query ApsPushTokensByUserIdAndUpdatedAt(
  $userId: ID!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApsPushTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  apsPushTokensByUserIdAndUpdatedAt(
    userId: $userId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      token
      platform
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsPushTokensByUserIdAndUpdatedAtQueryVariables,
  APITypes.ApsPushTokensByUserIdAndUpdatedAtQuery
>;
export const getAPS = /* GraphQL */ `query GetAPS($id: ID!) {
  getAPS(id: $id) {
    id
    year
    codes {
      nextToken
      __typename
    }
    agenda {
      id
      eventId
      createdAt
      updatedAt
      __typename
    }
    startDate
    endDate
    location
    address
    city
    state
    zip
    website
    Registrants {
      nextToken
      __typename
    }
    Sponsors {
      nextToken
      __typename
    }
    Speakers {
      nextToken
      __typename
    }
    companies {
      nextToken
      __typename
    }
    photos {
      nextToken
      __typename
    }
    exhibitors {
      nextToken
      __typename
    }
    exhibitorPromotions {
      nextToken
      __typename
    }
    exhibitorDeals {
      nextToken
      __typename
    }
    exhibitorPhotos {
      nextToken
      __typename
    }
    exhibitorHandouts {
      nextToken
      __typename
    }
    favoriteExhibitors {
      nextToken
      __typename
    }
    favoriteSpeakers {
      nextToken
      __typename
    }
    favoriteSponsors {
      nextToken
      __typename
    }
    favoriteSessions {
      nextToken
      __typename
    }
    favoriteContacts {
      nextToken
      __typename
    }
    addOns {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    aPSAgendaId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAPSQueryVariables, APITypes.GetAPSQuery>;
export const listAPS = /* GraphQL */ `query ListAPS($filter: ModelAPSFilterInput, $limit: Int, $nextToken: String) {
  listAPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListAPSQueryVariables, APITypes.ListAPSQuery>;
export const getAPSCode = /* GraphQL */ `query GetAPSCode($id: ID!) {
  getAPSCode(id: $id) {
    id
    code
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    limit
    used
    createdAt
    updatedAt
    aPSCodesId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSCodeQueryVariables,
  APITypes.GetAPSCodeQuery
>;
export const listAPSCodes = /* GraphQL */ `query ListAPSCodes(
  $filter: ModelAPSCodeFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      code
      eventId
      limit
      used
      createdAt
      updatedAt
      aPSCodesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSCodesQueryVariables,
  APITypes.ListAPSCodesQuery
>;
export const aPSCodesByEventId = /* GraphQL */ `query APSCodesByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAPSCodeFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSCodesByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      code
      eventId
      limit
      used
      createdAt
      updatedAt
      aPSCodesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSCodesByEventIdQueryVariables,
  APITypes.APSCodesByEventIdQuery
>;
export const getAPSBoard = /* GraphQL */ `query GetAPSBoard($id: ID!) {
  getAPSBoard(id: $id) {
    id
    name
    title
    bio
    company
    email
    linkedin
    profilePic
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSBoardQueryVariables,
  APITypes.GetAPSBoardQuery
>;
export const listAPSBoards = /* GraphQL */ `query ListAPSBoards(
  $filter: ModelAPSBoardFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      title
      bio
      company
      email
      linkedin
      profilePic
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSBoardsQueryVariables,
  APITypes.ListAPSBoardsQuery
>;
export const getApsAgenda = /* GraphQL */ `query GetApsAgenda($id: ID!) {
  getApsAgenda(id: $id) {
    id
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    items {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAgendaQueryVariables,
  APITypes.GetApsAgendaQuery
>;
export const listApsAgenda = /* GraphQL */ `query ListApsAgenda(
  $filter: ModelApsAgendaFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAgenda(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      eventId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAgendaQueryVariables,
  APITypes.ListApsAgendaQuery
>;
export const apsAgendaByEventId = /* GraphQL */ `query ApsAgendaByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAgendaFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAgendaByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      eventId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAgendaByEventIdQueryVariables,
  APITypes.ApsAgendaByEventIdQuery
>;
export const getApsRegistrant = /* GraphQL */ `query GetApsRegistrant($id: ID!) {
  getApsRegistrant(id: $id) {
    id
    apsID
    aps {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    firstName
    lastName
    email
    phone
    companyId
    company {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    jobTitle
    attendeeType
    termsAccepted
    interests
    otherInterest
    buyerQuestion
    packagingChallenge
    certification
    billingAddressFirstName
    billingAddressLastName
    billingAddressEmail
    billingAddressPhone
    billingAddressStreet
    billingAddressCity
    billingAddressState
    billingAddressZip
    sameAsAttendee
    speakerTopic
    learningObjectives
    totalAmount
    discountCode
    status
    paymentConfirmation
    registrationEmailSent
    registrationEmailSentDate
    registrationEmailReceived
    registrationEmailReceivedDate
    welcomeEmailSent
    welcomeEmailSentDate
    welcomeEmailReceived
    welcomeEmailReceivedDate
    paymentMethod
    paymentLast4
    approvedAt
    headshot
    presentation
    presentationTitle
    presentationSummary
    bio
    invoice
    seatingChartRegistrant {
      id
      category
      firstName
      lastName
      company
      email
      role
      tableNumber
      notes
      seatingChartID
      registrantID
      createdAt
      updatedAt
      apsSeatingChartRegistrantsId
      __typename
    }
    addOnRequests {
      nextToken
      __typename
    }
    appUserId
    appUser {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    notes {
      nextToken
      __typename
    }
    qrCode
    createdAt
    updatedAt
    aPSRegistrantsId
    aPSCompanyRegistrantsId
    apsRegistrantSeatingChartRegistrantId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsRegistrantQueryVariables,
  APITypes.GetApsRegistrantQuery
>;
export const listApsRegistrants = /* GraphQL */ `query ListApsRegistrants(
  $filter: ModelApsRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsRegistrantsQueryVariables,
  APITypes.ListApsRegistrantsQuery
>;
export const apsRegistrantsByApsID = /* GraphQL */ `query ApsRegistrantsByApsID(
  $apsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  apsRegistrantsByApsID(
    apsID: $apsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsRegistrantsByApsIDQueryVariables,
  APITypes.ApsRegistrantsByApsIDQuery
>;
export const apsRegistrantsByEmail = /* GraphQL */ `query ApsRegistrantsByEmail(
  $email: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApsRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  apsRegistrantsByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsRegistrantsByEmailQueryVariables,
  APITypes.ApsRegistrantsByEmailQuery
>;
export const apsRegistrantsByCompanyId = /* GraphQL */ `query ApsRegistrantsByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  apsRegistrantsByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsRegistrantsByCompanyIdQueryVariables,
  APITypes.ApsRegistrantsByCompanyIdQuery
>;
export const getApsAppUser = /* GraphQL */ `query GetApsAppUser($id: ID!) {
  getApsAppUser(id: $id) {
    id
    registrantId
    registrant {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    photos {
      nextToken
      __typename
    }
    sessionQuestions {
      nextToken
      __typename
    }
    exhibitorDeals {
      nextToken
      __typename
    }
    contacts {
      nextToken
      __typename
    }
    notes {
      nextToken
      __typename
    }
    leads {
      nextToken
      __typename
    }
    sentDmMessages {
      nextToken
      __typename
    }
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserQueryVariables,
  APITypes.GetApsAppUserQuery
>;
export const listApsAppUsers = /* GraphQL */ `query ListApsAppUsers(
  $filter: ModelApsAppUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUsersQueryVariables,
  APITypes.ListApsAppUsersQuery
>;
export const apsAppUsersByRegistrantId = /* GraphQL */ `query ApsAppUsersByRegistrantId(
  $registrantId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUsersByRegistrantId(
    registrantId: $registrantId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUsersByRegistrantIdQueryVariables,
  APITypes.ApsAppUsersByRegistrantIdQuery
>;
export const getApsAppUserContact = /* GraphQL */ `query GetApsAppUserContact($id: ID!) {
  getApsAppUserContact(id: $id) {
    id
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    favorite
    contact {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    contactId
    createdAt
    updatedAt
    apsAppUserContactsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserContactQueryVariables,
  APITypes.GetApsAppUserContactQuery
>;
export const listApsAppUserContacts = /* GraphQL */ `query ListApsAppUserContacts(
  $filter: ModelApsAppUserContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserContacts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserContactsQueryVariables,
  APITypes.ListApsAppUserContactsQuery
>;
export const apsAppUserContactsByUserId = /* GraphQL */ `query ApsAppUserContactsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserContactsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserContactsByUserIdQueryVariables,
  APITypes.ApsAppUserContactsByUserIdQuery
>;
export const apsAppUserContactsByContactId = /* GraphQL */ `query ApsAppUserContactsByContactId(
  $contactId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserContactFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserContactsByContactId(
    contactId: $contactId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserContactsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserContactsByContactIdQueryVariables,
  APITypes.ApsAppUserContactsByContactIdQuery
>;
export const getApsAppUserLead = /* GraphQL */ `query GetApsAppUserLead($id: ID!) {
  getApsAppUserLead(id: $id) {
    id
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    favorite
    contact {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    contactId
    createdAt
    updatedAt
    apsAppUserLeadsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserLeadQueryVariables,
  APITypes.GetApsAppUserLeadQuery
>;
export const listApsAppUserLeads = /* GraphQL */ `query ListApsAppUserLeads(
  $filter: ModelApsAppUserLeadFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserLeads(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserLeadsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserLeadsQueryVariables,
  APITypes.ListApsAppUserLeadsQuery
>;
export const apsAppUserLeadsByUserId = /* GraphQL */ `query ApsAppUserLeadsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserLeadFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserLeadsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserLeadsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserLeadsByUserIdQueryVariables,
  APITypes.ApsAppUserLeadsByUserIdQuery
>;
export const apsAppUserLeadsByContactId = /* GraphQL */ `query ApsAppUserLeadsByContactId(
  $contactId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserLeadFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserLeadsByContactId(
    contactId: $contactId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      favorite
      contactId
      createdAt
      updatedAt
      apsAppUserLeadsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserLeadsByContactIdQueryVariables,
  APITypes.ApsAppUserLeadsByContactIdQuery
>;
export const getApsAppUserProfile = /* GraphQL */ `query GetApsAppUserProfile($id: ID!) {
  getApsAppUserProfile(id: $id) {
    id
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    firstName
    lastName
    email
    phone
    company
    jobTitle
    attendeeType
    quickTools
    affiliates {
      nextToken
      __typename
    }
    profilePicture
    bio
    linkedin
    twitter
    facebook
    instagram
    youtube
    website
    location
    education {
      nextToken
      __typename
    }
    interests {
      nextToken
      __typename
    }
    resume
    thinkificId
    apcProgress
    contacts {
      nextToken
      __typename
    }
    leads {
      nextToken
      __typename
    }
    favoriteExhibitors {
      nextToken
      __typename
    }
    favoriteSpeakers {
      nextToken
      __typename
    }
    favoriteSponsors {
      nextToken
      __typename
    }
    favoriteSessions {
      nextToken
      __typename
    }
    favoriteContacts {
      nextToken
      __typename
    }
    favoritedByProfiles {
      nextToken
      __typename
    }
    notes {
      nextToken
      __typename
    }
    speakerId
    speaker {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserProfileQueryVariables,
  APITypes.GetApsAppUserProfileQuery
>;
export const listApsAppUserProfiles = /* GraphQL */ `query ListApsAppUserProfiles(
  $filter: ModelApsAppUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserProfiles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserProfilesQueryVariables,
  APITypes.ListApsAppUserProfilesQuery
>;
export const apsAppUserProfilesByUserId = /* GraphQL */ `query ApsAppUserProfilesByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserProfilesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserProfilesByUserIdQueryVariables,
  APITypes.ApsAppUserProfilesByUserIdQuery
>;
export const apsAppUserProfilesBySpeakerId = /* GraphQL */ `query ApsAppUserProfilesBySpeakerId(
  $speakerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserProfilesBySpeakerId(
    speakerId: $speakerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserProfilesBySpeakerIdQueryVariables,
  APITypes.ApsAppUserProfilesBySpeakerIdQuery
>;
export const getProfileAffiliate = /* GraphQL */ `query GetProfileAffiliate($id: ID!) {
  getProfileAffiliate(id: $id) {
    id
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    affiliate
    role
    startDate
    endDate
    createdAt
    updatedAt
    apsAppUserProfileAffiliatesId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProfileAffiliateQueryVariables,
  APITypes.GetProfileAffiliateQuery
>;
export const listProfileAffiliates = /* GraphQL */ `query ListProfileAffiliates(
  $filter: ModelProfileAffiliateFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfileAffiliates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      profileId
      affiliate
      role
      startDate
      endDate
      createdAt
      updatedAt
      apsAppUserProfileAffiliatesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfileAffiliatesQueryVariables,
  APITypes.ListProfileAffiliatesQuery
>;
export const profileAffiliatesByProfileId = /* GraphQL */ `query ProfileAffiliatesByProfileId(
  $profileId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProfileAffiliateFilterInput
  $limit: Int
  $nextToken: String
) {
  profileAffiliatesByProfileId(
    profileId: $profileId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      profileId
      affiliate
      role
      startDate
      endDate
      createdAt
      updatedAt
      apsAppUserProfileAffiliatesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProfileAffiliatesByProfileIdQueryVariables,
  APITypes.ProfileAffiliatesByProfileIdQuery
>;
export const getProfileEducation = /* GraphQL */ `query GetProfileEducation($id: ID!) {
  getProfileEducation(id: $id) {
    id
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    school
    degree
    fieldOfStudy
    createdAt
    updatedAt
    apsAppUserProfileEducationId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProfileEducationQueryVariables,
  APITypes.GetProfileEducationQuery
>;
export const listProfileEducations = /* GraphQL */ `query ListProfileEducations(
  $filter: ModelProfileEducationFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfileEducations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      profileId
      school
      degree
      fieldOfStudy
      createdAt
      updatedAt
      apsAppUserProfileEducationId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfileEducationsQueryVariables,
  APITypes.ListProfileEducationsQuery
>;
export const profileEducationsByProfileId = /* GraphQL */ `query ProfileEducationsByProfileId(
  $profileId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProfileEducationFilterInput
  $limit: Int
  $nextToken: String
) {
  profileEducationsByProfileId(
    profileId: $profileId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      profileId
      school
      degree
      fieldOfStudy
      createdAt
      updatedAt
      apsAppUserProfileEducationId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProfileEducationsByProfileIdQueryVariables,
  APITypes.ProfileEducationsByProfileIdQuery
>;
export const getProfileInterest = /* GraphQL */ `query GetProfileInterest($id: ID!) {
  getProfileInterest(id: $id) {
    id
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    interest
    createdAt
    updatedAt
    apsAppUserProfileInterestsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProfileInterestQueryVariables,
  APITypes.GetProfileInterestQuery
>;
export const listProfileInterests = /* GraphQL */ `query ListProfileInterests(
  $filter: ModelProfileInterestFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfileInterests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      profileId
      interest
      createdAt
      updatedAt
      apsAppUserProfileInterestsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfileInterestsQueryVariables,
  APITypes.ListProfileInterestsQuery
>;
export const profileInterestsByProfileId = /* GraphQL */ `query ProfileInterestsByProfileId(
  $profileId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProfileInterestFilterInput
  $limit: Int
  $nextToken: String
) {
  profileInterestsByProfileId(
    profileId: $profileId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      profileId
      interest
      createdAt
      updatedAt
      apsAppUserProfileInterestsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProfileInterestsByProfileIdQueryVariables,
  APITypes.ProfileInterestsByProfileIdQuery
>;
export const getApsAppUserPhoto = /* GraphQL */ `query GetApsAppUserPhoto($id: ID!) {
  getApsAppUserPhoto(id: $id) {
    id
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    photo
    caption
    approved
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    createdAt
    updatedAt
    aPSPhotosId
    apsAppUserPhotosId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppUserPhotoQueryVariables,
  APITypes.GetApsAppUserPhotoQuery
>;
export const listApsAppUserPhotos = /* GraphQL */ `query ListApsAppUserPhotos(
  $filter: ModelApsAppUserPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppUserPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSPhotosId
      apsAppUserPhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppUserPhotosQueryVariables,
  APITypes.ListApsAppUserPhotosQuery
>;
export const apsAppUserPhotosByUserId = /* GraphQL */ `query ApsAppUserPhotosByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserPhotosByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSPhotosId
      apsAppUserPhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserPhotosByUserIdQueryVariables,
  APITypes.ApsAppUserPhotosByUserIdQuery
>;
export const apsAppUserPhotosByEventId = /* GraphQL */ `query ApsAppUserPhotosByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppUserPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppUserPhotosByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSPhotosId
      apsAppUserPhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppUserPhotosByEventIdQueryVariables,
  APITypes.ApsAppUserPhotosByEventIdQuery
>;
export const getApsAppSession = /* GraphQL */ `query GetApsAppSession($id: ID!) {
  getApsAppSession(id: $id) {
    id
    title
    date
    startTime
    endTime
    location
    description
    agendaId
    agenda {
      id
      eventId
      createdAt
      updatedAt
      __typename
    }
    sessionQuestions {
      nextToken
      __typename
    }
    notes {
      nextToken
      __typename
    }
    speakers {
      nextToken
      __typename
    }
    sponsors {
      nextToken
      __typename
    }
    favoriteByUsers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    apsAgendaItemsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppSessionQueryVariables,
  APITypes.GetApsAppSessionQuery
>;
export const listApsAppSessions = /* GraphQL */ `query ListApsAppSessions(
  $filter: ModelApsAppSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppSessionsQueryVariables,
  APITypes.ListApsAppSessionsQuery
>;
export const apsAppSessionsByAgendaId = /* GraphQL */ `query ApsAppSessionsByAgendaId(
  $agendaId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppSessionsByAgendaId(
    agendaId: $agendaId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppSessionsByAgendaIdQueryVariables,
  APITypes.ApsAppSessionsByAgendaIdQuery
>;
export const getApsAppSessionQuestion = /* GraphQL */ `query GetApsAppSessionQuestion($id: ID!) {
  getApsAppSessionQuestion(id: $id) {
    id
    sessionId
    session {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    question
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    apsAppUserSessionQuestionsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppSessionQuestionQueryVariables,
  APITypes.GetApsAppSessionQuestionQuery
>;
export const listApsAppSessionQuestions = /* GraphQL */ `query ListApsAppSessionQuestions(
  $filter: ModelApsAppSessionQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppSessionQuestions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      sessionId
      question
      userId
      createdAt
      updatedAt
      apsAppUserSessionQuestionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppSessionQuestionsQueryVariables,
  APITypes.ListApsAppSessionQuestionsQuery
>;
export const apsAppSessionQuestionsBySessionId = /* GraphQL */ `query ApsAppSessionQuestionsBySessionId(
  $sessionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppSessionQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppSessionQuestionsBySessionId(
    sessionId: $sessionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      sessionId
      question
      userId
      createdAt
      updatedAt
      apsAppUserSessionQuestionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppSessionQuestionsBySessionIdQueryVariables,
  APITypes.ApsAppSessionQuestionsBySessionIdQuery
>;
export const apsAppSessionQuestionsByUserId = /* GraphQL */ `query ApsAppSessionQuestionsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppSessionQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppSessionQuestionsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      sessionId
      question
      userId
      createdAt
      updatedAt
      apsAppUserSessionQuestionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppSessionQuestionsByUserIdQueryVariables,
  APITypes.ApsAppSessionQuestionsByUserIdQuery
>;
export const getAPSSpeaker = /* GraphQL */ `query GetAPSSpeaker($id: ID!) {
  getAPSSpeaker(id: $id) {
    id
    presentationTitle
    presentationSummary
    profileId
    profile {
      id
      userId
      firstName
      lastName
      email
      phone
      company
      jobTitle
      attendeeType
      quickTools
      profilePicture
      bio
      linkedin
      twitter
      facebook
      instagram
      youtube
      website
      location
      resume
      thinkificId
      apcProgress
      speakerId
      createdAt
      updatedAt
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    sessions {
      nextToken
      __typename
    }
    favoriteByUsers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    aPSSpeakersId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSSpeakerQueryVariables,
  APITypes.GetAPSSpeakerQuery
>;
export const listAPSSpeakers = /* GraphQL */ `query ListAPSSpeakers(
  $filter: ModelAPSSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSSpeakersQueryVariables,
  APITypes.ListAPSSpeakersQuery
>;
export const aPSSpeakersByProfileIdAndEventId = /* GraphQL */ `query APSSpeakersByProfileIdAndEventId(
  $profileId: ID!
  $eventId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAPSSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSSpeakersByProfileIdAndEventId(
    profileId: $profileId
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSSpeakersByProfileIdAndEventIdQueryVariables,
  APITypes.APSSpeakersByProfileIdAndEventIdQuery
>;
export const aPSSpeakersByEventId = /* GraphQL */ `query APSSpeakersByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAPSSpeakerFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSSpeakersByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSSpeakersByEventIdQueryVariables,
  APITypes.APSSpeakersByEventIdQuery
>;
export const getApsSponsor = /* GraphQL */ `query GetApsSponsor($id: ID!) {
  getApsSponsor(id: $id) {
    id
    companyId
    company {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    profile {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    sessions {
      nextToken
      __typename
    }
    favoriteByUsers {
      nextToken
      __typename
    }
    type
    createdAt
    updatedAt
    aPSSponsorsId
    apsSponsorProfileId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsSponsorQueryVariables,
  APITypes.GetApsSponsorQuery
>;
export const listApsSponsors = /* GraphQL */ `query ListApsSponsors(
  $filter: ModelApsSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsSponsors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsSponsorsQueryVariables,
  APITypes.ListApsSponsorsQuery
>;
export const apsSponsorsByCompanyId = /* GraphQL */ `query ApsSponsorsByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsSponsorsByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsSponsorsByCompanyIdQueryVariables,
  APITypes.ApsSponsorsByCompanyIdQuery
>;
export const apsSponsorsByEventId = /* GraphQL */ `query ApsSponsorsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsSponsorFilterInput
  $limit: Int
  $nextToken: String
) {
  apsSponsorsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsSponsorsByEventIdQueryVariables,
  APITypes.ApsSponsorsByEventIdQuery
>;
export const getAPSCompany = /* GraphQL */ `query GetAPSCompany($id: ID!) {
  getAPSCompany(id: $id) {
    id
    name
    email
    type
    description
    website
    phone
    address
    city
    state
    zip
    country
    logo
    events {
      nextToken
      __typename
    }
    registrants {
      nextToken
      __typename
    }
    sponsorId
    sponsor {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    exhibitorProfileId
    exhibitorProfile {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    notes {
      nextToken
      __typename
    }
    contacts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSCompanyQueryVariables,
  APITypes.GetAPSCompanyQuery
>;
export const listAPSCompanies = /* GraphQL */ `query ListAPSCompanies(
  $filter: ModelAPSCompanyFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSCompaniesQueryVariables,
  APITypes.ListAPSCompaniesQuery
>;
export const getAPSCompanyContact = /* GraphQL */ `query GetAPSCompanyContact($id: ID!) {
  getAPSCompanyContact(id: $id) {
    id
    companyId
    company {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    name
    email
    phone
    title
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSCompanyContactQueryVariables,
  APITypes.GetAPSCompanyContactQuery
>;
export const listAPSCompanyContacts = /* GraphQL */ `query ListAPSCompanyContacts(
  $filter: ModelAPSCompanyContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSCompanyContacts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      name
      email
      phone
      title
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSCompanyContactsQueryVariables,
  APITypes.ListAPSCompanyContactsQuery
>;
export const aPSCompanyContactsByCompanyIdAndCreatedAt = /* GraphQL */ `query APSCompanyContactsByCompanyIdAndCreatedAt(
  $companyId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAPSCompanyContactFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSCompanyContactsByCompanyIdAndCreatedAt(
    companyId: $companyId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      name
      email
      phone
      title
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSCompanyContactsByCompanyIdAndCreatedAtQueryVariables,
  APITypes.APSCompanyContactsByCompanyIdAndCreatedAtQuery
>;
export const getApsAppExhibitorProfile = /* GraphQL */ `query GetApsAppExhibitorProfile($id: ID!) {
  getApsAppExhibitorProfile(id: $id) {
    id
    companyId
    company {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    sponsorId
    sponsor {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    deals {
      nextToken
      __typename
    }
    photos {
      nextToken
      __typename
    }
    handouts {
      nextToken
      __typename
    }
    promotions {
      nextToken
      __typename
    }
    video
    videoCaption
    boothNumber
    visits
    views
    likes
    notes {
      nextToken
      __typename
    }
    favoriteByUsers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    aPSExhibitorsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppExhibitorProfileQueryVariables,
  APITypes.GetApsAppExhibitorProfileQuery
>;
export const listApsAppExhibitorProfiles = /* GraphQL */ `query ListApsAppExhibitorProfiles(
  $filter: ModelApsAppExhibitorProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppExhibitorProfiles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppExhibitorProfilesQueryVariables,
  APITypes.ListApsAppExhibitorProfilesQuery
>;
export const apsAppExhibitorProfilesByCompanyId = /* GraphQL */ `query ApsAppExhibitorProfilesByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorProfilesByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorProfilesByCompanyIdQueryVariables,
  APITypes.ApsAppExhibitorProfilesByCompanyIdQuery
>;
export const apsAppExhibitorProfilesBySponsorId = /* GraphQL */ `query ApsAppExhibitorProfilesBySponsorId(
  $sponsorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorProfilesBySponsorId(
    sponsorId: $sponsorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorProfilesBySponsorIdQueryVariables,
  APITypes.ApsAppExhibitorProfilesBySponsorIdQuery
>;
export const apsAppExhibitorProfilesByEventId = /* GraphQL */ `query ApsAppExhibitorProfilesByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorProfilesByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorProfilesByEventIdQueryVariables,
  APITypes.ApsAppExhibitorProfilesByEventIdQuery
>;
export const getApsAppExhibitorPromotion = /* GraphQL */ `query GetApsAppExhibitorPromotion($id: ID!) {
  getApsAppExhibitorPromotion(id: $id) {
    id
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    promotion
    link
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    createdAt
    updatedAt
    aPSExhibitorPromotionsId
    apsAppExhibitorProfilePromotionsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppExhibitorPromotionQueryVariables,
  APITypes.GetApsAppExhibitorPromotionQuery
>;
export const listApsAppExhibitorPromotions = /* GraphQL */ `query ListApsAppExhibitorPromotions(
  $filter: ModelApsAppExhibitorPromotionFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppExhibitorPromotions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      promotion
      link
      eventId
      createdAt
      updatedAt
      aPSExhibitorPromotionsId
      apsAppExhibitorProfilePromotionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppExhibitorPromotionsQueryVariables,
  APITypes.ListApsAppExhibitorPromotionsQuery
>;
export const apsAppExhibitorPromotionsByExhibitorId = /* GraphQL */ `query ApsAppExhibitorPromotionsByExhibitorId(
  $exhibitorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorPromotionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorPromotionsByExhibitorId(
    exhibitorId: $exhibitorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      promotion
      link
      eventId
      createdAt
      updatedAt
      aPSExhibitorPromotionsId
      apsAppExhibitorProfilePromotionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorPromotionsByExhibitorIdQueryVariables,
  APITypes.ApsAppExhibitorPromotionsByExhibitorIdQuery
>;
export const apsAppExhibitorPromotionsByEventId = /* GraphQL */ `query ApsAppExhibitorPromotionsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorPromotionFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorPromotionsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      promotion
      link
      eventId
      createdAt
      updatedAt
      aPSExhibitorPromotionsId
      apsAppExhibitorProfilePromotionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorPromotionsByEventIdQueryVariables,
  APITypes.ApsAppExhibitorPromotionsByEventIdQuery
>;
export const getApsAppExhibitorDeal = /* GraphQL */ `query GetApsAppExhibitorDeal($id: ID!) {
  getApsAppExhibitorDeal(id: $id) {
    id
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    deal
    link
    userId
    user {
      id
      registrantId
      profileId
      createdAt
      updatedAt
      __typename
    }
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    createdAt
    updatedAt
    aPSExhibitorDealsId
    apsAppUserExhibitorDealsId
    apsAppExhibitorProfileDealsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppExhibitorDealQueryVariables,
  APITypes.GetApsAppExhibitorDealQuery
>;
export const listApsAppExhibitorDeals = /* GraphQL */ `query ListApsAppExhibitorDeals(
  $filter: ModelApsAppExhibitorDealFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppExhibitorDeals(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      deal
      link
      userId
      eventId
      createdAt
      updatedAt
      aPSExhibitorDealsId
      apsAppUserExhibitorDealsId
      apsAppExhibitorProfileDealsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppExhibitorDealsQueryVariables,
  APITypes.ListApsAppExhibitorDealsQuery
>;
export const apsAppExhibitorDealsByExhibitorId = /* GraphQL */ `query ApsAppExhibitorDealsByExhibitorId(
  $exhibitorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorDealFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorDealsByExhibitorId(
    exhibitorId: $exhibitorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      deal
      link
      userId
      eventId
      createdAt
      updatedAt
      aPSExhibitorDealsId
      apsAppUserExhibitorDealsId
      apsAppExhibitorProfileDealsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorDealsByExhibitorIdQueryVariables,
  APITypes.ApsAppExhibitorDealsByExhibitorIdQuery
>;
export const apsAppExhibitorDealsByUserId = /* GraphQL */ `query ApsAppExhibitorDealsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorDealFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorDealsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      deal
      link
      userId
      eventId
      createdAt
      updatedAt
      aPSExhibitorDealsId
      apsAppUserExhibitorDealsId
      apsAppExhibitorProfileDealsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorDealsByUserIdQueryVariables,
  APITypes.ApsAppExhibitorDealsByUserIdQuery
>;
export const apsAppExhibitorDealsByEventId = /* GraphQL */ `query ApsAppExhibitorDealsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorDealFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorDealsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      deal
      link
      userId
      eventId
      createdAt
      updatedAt
      aPSExhibitorDealsId
      apsAppUserExhibitorDealsId
      apsAppExhibitorProfileDealsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorDealsByEventIdQueryVariables,
  APITypes.ApsAppExhibitorDealsByEventIdQuery
>;
export const getApsAppExhibitorPhoto = /* GraphQL */ `query GetApsAppExhibitorPhoto($id: ID!) {
  getApsAppExhibitorPhoto(id: $id) {
    id
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    photo
    caption
    approved
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    createdAt
    updatedAt
    aPSExhibitorPhotosId
    apsAppExhibitorProfilePhotosId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppExhibitorPhotoQueryVariables,
  APITypes.GetApsAppExhibitorPhotoQuery
>;
export const listApsAppExhibitorPhotos = /* GraphQL */ `query ListApsAppExhibitorPhotos(
  $filter: ModelApsAppExhibitorPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppExhibitorPhotos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSExhibitorPhotosId
      apsAppExhibitorProfilePhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppExhibitorPhotosQueryVariables,
  APITypes.ListApsAppExhibitorPhotosQuery
>;
export const apsAppExhibitorPhotosByExhibitorId = /* GraphQL */ `query ApsAppExhibitorPhotosByExhibitorId(
  $exhibitorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorPhotosByExhibitorId(
    exhibitorId: $exhibitorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSExhibitorPhotosId
      apsAppExhibitorProfilePhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorPhotosByExhibitorIdQueryVariables,
  APITypes.ApsAppExhibitorPhotosByExhibitorIdQuery
>;
export const apsAppExhibitorPhotosByEventId = /* GraphQL */ `query ApsAppExhibitorPhotosByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorPhotosByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      photo
      caption
      approved
      eventId
      createdAt
      updatedAt
      aPSExhibitorPhotosId
      apsAppExhibitorProfilePhotosId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorPhotosByEventIdQueryVariables,
  APITypes.ApsAppExhibitorPhotosByEventIdQuery
>;
export const getApsAppExhibitorHandout = /* GraphQL */ `query GetApsAppExhibitorHandout($id: ID!) {
  getApsAppExhibitorHandout(id: $id) {
    id
    exhibitorId
    exhibitor {
      id
      companyId
      sponsorId
      eventId
      video
      videoCaption
      boothNumber
      visits
      views
      likes
      createdAt
      updatedAt
      aPSExhibitorsId
      __typename
    }
    handout
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    createdAt
    updatedAt
    aPSExhibitorHandoutsId
    apsAppExhibitorProfileHandoutsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAppExhibitorHandoutQueryVariables,
  APITypes.GetApsAppExhibitorHandoutQuery
>;
export const listApsAppExhibitorHandouts = /* GraphQL */ `query ListApsAppExhibitorHandouts(
  $filter: ModelApsAppExhibitorHandoutFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAppExhibitorHandouts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      handout
      eventId
      createdAt
      updatedAt
      aPSExhibitorHandoutsId
      apsAppExhibitorProfileHandoutsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAppExhibitorHandoutsQueryVariables,
  APITypes.ListApsAppExhibitorHandoutsQuery
>;
export const apsAppExhibitorHandoutsByExhibitorId = /* GraphQL */ `query ApsAppExhibitorHandoutsByExhibitorId(
  $exhibitorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorHandoutFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorHandoutsByExhibitorId(
    exhibitorId: $exhibitorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      handout
      eventId
      createdAt
      updatedAt
      aPSExhibitorHandoutsId
      apsAppExhibitorProfileHandoutsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorHandoutsByExhibitorIdQueryVariables,
  APITypes.ApsAppExhibitorHandoutsByExhibitorIdQuery
>;
export const apsAppExhibitorHandoutsByEventId = /* GraphQL */ `query ApsAppExhibitorHandoutsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAppExhibitorHandoutFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAppExhibitorHandoutsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      exhibitorId
      handout
      eventId
      createdAt
      updatedAt
      aPSExhibitorHandoutsId
      apsAppExhibitorProfileHandoutsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAppExhibitorHandoutsByEventIdQueryVariables,
  APITypes.ApsAppExhibitorHandoutsByEventIdQuery
>;
export const getApsAddOn = /* GraphQL */ `query GetApsAddOn($id: ID!) {
  getApsAddOn(id: $id) {
    id
    title
    description
    subheadline
    location
    date
    time
    altLink
    type
    limit
    eventId
    event {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    price
    preferenceSchema
    registrantRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    aPSAddOnsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsAddOnQueryVariables,
  APITypes.GetApsAddOnQuery
>;
export const listApsAddOns = /* GraphQL */ `query ListApsAddOns(
  $filter: ModelApsAddOnFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsAddOns(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      subheadline
      location
      date
      time
      altLink
      type
      limit
      eventId
      price
      preferenceSchema
      createdAt
      updatedAt
      aPSAddOnsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsAddOnsQueryVariables,
  APITypes.ListApsAddOnsQuery
>;
export const apsAddOnsByEventId = /* GraphQL */ `query ApsAddOnsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsAddOnFilterInput
  $limit: Int
  $nextToken: String
) {
  apsAddOnsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      description
      subheadline
      location
      date
      time
      altLink
      type
      limit
      eventId
      price
      preferenceSchema
      createdAt
      updatedAt
      aPSAddOnsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsAddOnsByEventIdQueryVariables,
  APITypes.ApsAddOnsByEventIdQuery
>;
export const getRegistrantAddOnRequest = /* GraphQL */ `query GetRegistrantAddOnRequest($id: ID!) {
  getRegistrantAddOnRequest(id: $id) {
    id
    registrantId
    registrant {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    addOnId
    addOn {
      id
      title
      description
      subheadline
      location
      date
      time
      altLink
      type
      limit
      eventId
      price
      preferenceSchema
      createdAt
      updatedAt
      aPSAddOnsId
      __typename
    }
    status
    preferences
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRegistrantAddOnRequestQueryVariables,
  APITypes.GetRegistrantAddOnRequestQuery
>;
export const listRegistrantAddOnRequests = /* GraphQL */ `query ListRegistrantAddOnRequests(
  $filter: ModelRegistrantAddOnRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listRegistrantAddOnRequests(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      registrantId
      addOnId
      status
      preferences
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRegistrantAddOnRequestsQueryVariables,
  APITypes.ListRegistrantAddOnRequestsQuery
>;
export const registrantAddOnRequestsByRegistrantId = /* GraphQL */ `query RegistrantAddOnRequestsByRegistrantId(
  $registrantId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRegistrantAddOnRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  registrantAddOnRequestsByRegistrantId(
    registrantId: $registrantId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      registrantId
      addOnId
      status
      preferences
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RegistrantAddOnRequestsByRegistrantIdQueryVariables,
  APITypes.RegistrantAddOnRequestsByRegistrantIdQuery
>;
export const registrantAddOnRequestsByAddOnId = /* GraphQL */ `query RegistrantAddOnRequestsByAddOnId(
  $addOnId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRegistrantAddOnRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  registrantAddOnRequestsByAddOnId(
    addOnId: $addOnId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      registrantId
      addOnId
      status
      preferences
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RegistrantAddOnRequestsByAddOnIdQueryVariables,
  APITypes.RegistrantAddOnRequestsByAddOnIdQuery
>;
export const getApsSeatingChart = /* GraphQL */ `query GetApsSeatingChart($id: ID!) {
  getApsSeatingChart(id: $id) {
    id
    registrants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsSeatingChartQueryVariables,
  APITypes.GetApsSeatingChartQuery
>;
export const listApsSeatingCharts = /* GraphQL */ `query ListApsSeatingCharts(
  $filter: ModelApsSeatingChartFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsSeatingCharts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsSeatingChartsQueryVariables,
  APITypes.ListApsSeatingChartsQuery
>;
export const getApsSeatingChartRegistrant = /* GraphQL */ `query GetApsSeatingChartRegistrant($id: ID!) {
  getApsSeatingChartRegistrant(id: $id) {
    id
    category
    firstName
    lastName
    company
    email
    role
    tableNumber
    notes
    seatingChartID
    seatingChart {
      id
      createdAt
      updatedAt
      __typename
    }
    registrantID
    registrant {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      jobTitle
      attendeeType
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      status
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      invoice
      appUserId
      qrCode
      createdAt
      updatedAt
      aPSRegistrantsId
      aPSCompanyRegistrantsId
      apsRegistrantSeatingChartRegistrantId
      __typename
    }
    createdAt
    updatedAt
    apsSeatingChartRegistrantsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApsSeatingChartRegistrantQueryVariables,
  APITypes.GetApsSeatingChartRegistrantQuery
>;
export const listApsSeatingChartRegistrants = /* GraphQL */ `query ListApsSeatingChartRegistrants(
  $filter: ModelApsSeatingChartRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  listApsSeatingChartRegistrants(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      category
      firstName
      lastName
      company
      email
      role
      tableNumber
      notes
      seatingChartID
      registrantID
      createdAt
      updatedAt
      apsSeatingChartRegistrantsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApsSeatingChartRegistrantsQueryVariables,
  APITypes.ListApsSeatingChartRegistrantsQuery
>;
export const apsSeatingChartRegistrantsBySeatingChartID = /* GraphQL */ `query ApsSeatingChartRegistrantsBySeatingChartID(
  $seatingChartID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsSeatingChartRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  apsSeatingChartRegistrantsBySeatingChartID(
    seatingChartID: $seatingChartID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      category
      firstName
      lastName
      company
      email
      role
      tableNumber
      notes
      seatingChartID
      registrantID
      createdAt
      updatedAt
      apsSeatingChartRegistrantsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsSeatingChartRegistrantsBySeatingChartIDQueryVariables,
  APITypes.ApsSeatingChartRegistrantsBySeatingChartIDQuery
>;
export const apsSeatingChartRegistrantsByRegistrantID = /* GraphQL */ `query ApsSeatingChartRegistrantsByRegistrantID(
  $registrantID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApsSeatingChartRegistrantFilterInput
  $limit: Int
  $nextToken: String
) {
  apsSeatingChartRegistrantsByRegistrantID(
    registrantID: $registrantID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      category
      firstName
      lastName
      company
      email
      role
      tableNumber
      notes
      seatingChartID
      registrantID
      createdAt
      updatedAt
      apsSeatingChartRegistrantsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApsSeatingChartRegistrantsByRegistrantIDQueryVariables,
  APITypes.ApsSeatingChartRegistrantsByRegistrantIDQuery
>;
export const getAPSCompanyEvents = /* GraphQL */ `query GetAPSCompanyEvents($id: ID!) {
  getAPSCompanyEvents(id: $id) {
    id
    aPSId
    aPSCompanyId
    aPS {
      id
      year
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
      createdAt
      updatedAt
      aPSAgendaId
      __typename
    }
    aPSCompany {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
      sponsorId
      exhibitorProfileId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAPSCompanyEventsQueryVariables,
  APITypes.GetAPSCompanyEventsQuery
>;
export const listAPSCompanyEvents = /* GraphQL */ `query ListAPSCompanyEvents(
  $filter: ModelAPSCompanyEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  listAPSCompanyEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      aPSId
      aPSCompanyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAPSCompanyEventsQueryVariables,
  APITypes.ListAPSCompanyEventsQuery
>;
export const aPSCompanyEventsByAPSId = /* GraphQL */ `query APSCompanyEventsByAPSId(
  $aPSId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAPSCompanyEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSCompanyEventsByAPSId(
    aPSId: $aPSId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      aPSId
      aPSCompanyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSCompanyEventsByAPSIdQueryVariables,
  APITypes.APSCompanyEventsByAPSIdQuery
>;
export const aPSCompanyEventsByAPSCompanyId = /* GraphQL */ `query APSCompanyEventsByAPSCompanyId(
  $aPSCompanyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAPSCompanyEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  aPSCompanyEventsByAPSCompanyId(
    aPSCompanyId: $aPSCompanyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      aPSId
      aPSCompanyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.APSCompanyEventsByAPSCompanyIdQueryVariables,
  APITypes.APSCompanyEventsByAPSCompanyIdQuery
>;
export const getSessionSpeakers = /* GraphQL */ `query GetSessionSpeakers($id: ID!) {
  getSessionSpeakers(id: $id) {
    id
    apsAppSessionId
    aPSSpeakerId
    apsAppSession {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    aPSSpeaker {
      id
      presentationTitle
      presentationSummary
      profileId
      eventId
      createdAt
      updatedAt
      aPSSpeakersId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSessionSpeakersQueryVariables,
  APITypes.GetSessionSpeakersQuery
>;
export const listSessionSpeakers = /* GraphQL */ `query ListSessionSpeakers(
  $filter: ModelSessionSpeakersFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessionSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      apsAppSessionId
      aPSSpeakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionSpeakersQueryVariables,
  APITypes.ListSessionSpeakersQuery
>;
export const sessionSpeakersByApsAppSessionId = /* GraphQL */ `query SessionSpeakersByApsAppSessionId(
  $apsAppSessionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSessionSpeakersFilterInput
  $limit: Int
  $nextToken: String
) {
  sessionSpeakersByApsAppSessionId(
    apsAppSessionId: $apsAppSessionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsAppSessionId
      aPSSpeakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SessionSpeakersByApsAppSessionIdQueryVariables,
  APITypes.SessionSpeakersByApsAppSessionIdQuery
>;
export const sessionSpeakersByAPSSpeakerId = /* GraphQL */ `query SessionSpeakersByAPSSpeakerId(
  $aPSSpeakerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSessionSpeakersFilterInput
  $limit: Int
  $nextToken: String
) {
  sessionSpeakersByAPSSpeakerId(
    aPSSpeakerId: $aPSSpeakerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsAppSessionId
      aPSSpeakerId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SessionSpeakersByAPSSpeakerIdQueryVariables,
  APITypes.SessionSpeakersByAPSSpeakerIdQuery
>;
export const getSessionSponsors = /* GraphQL */ `query GetSessionSponsors($id: ID!) {
  getSessionSponsors(id: $id) {
    id
    apsAppSessionId
    apsSponsorId
    apsAppSession {
      id
      title
      date
      startTime
      endTime
      location
      description
      agendaId
      createdAt
      updatedAt
      apsAgendaItemsId
      __typename
    }
    apsSponsor {
      id
      companyId
      eventId
      type
      createdAt
      updatedAt
      aPSSponsorsId
      apsSponsorProfileId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSessionSponsorsQueryVariables,
  APITypes.GetSessionSponsorsQuery
>;
export const listSessionSponsors = /* GraphQL */ `query ListSessionSponsors(
  $filter: ModelSessionSponsorsFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessionSponsors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      apsAppSessionId
      apsSponsorId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionSponsorsQueryVariables,
  APITypes.ListSessionSponsorsQuery
>;
export const sessionSponsorsByApsAppSessionId = /* GraphQL */ `query SessionSponsorsByApsAppSessionId(
  $apsAppSessionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSessionSponsorsFilterInput
  $limit: Int
  $nextToken: String
) {
  sessionSponsorsByApsAppSessionId(
    apsAppSessionId: $apsAppSessionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsAppSessionId
      apsSponsorId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SessionSponsorsByApsAppSessionIdQueryVariables,
  APITypes.SessionSponsorsByApsAppSessionIdQuery
>;
export const sessionSponsorsByApsSponsorId = /* GraphQL */ `query SessionSponsorsByApsSponsorId(
  $apsSponsorId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSessionSponsorsFilterInput
  $limit: Int
  $nextToken: String
) {
  sessionSponsorsByApsSponsorId(
    apsSponsorId: $apsSponsorId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      apsAppSessionId
      apsSponsorId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SessionSponsorsByApsSponsorIdQueryVariables,
  APITypes.SessionSponsorsByApsSponsorIdQuery
>;
