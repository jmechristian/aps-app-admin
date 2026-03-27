/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateApsTempCredential = /* GraphQL */ `subscription OnCreateApsTempCredential(
  $filter: ModelSubscriptionApsTempCredentialFilterInput
) {
  onCreateApsTempCredential(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsTempCredentialSubscriptionVariables,
  APITypes.OnCreateApsTempCredentialSubscription
>;
export const onUpdateApsTempCredential = /* GraphQL */ `subscription OnUpdateApsTempCredential(
  $filter: ModelSubscriptionApsTempCredentialFilterInput
) {
  onUpdateApsTempCredential(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsTempCredentialSubscriptionVariables,
  APITypes.OnUpdateApsTempCredentialSubscription
>;
export const onDeleteApsTempCredential = /* GraphQL */ `subscription OnDeleteApsTempCredential(
  $filter: ModelSubscriptionApsTempCredentialFilterInput
) {
  onDeleteApsTempCredential(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsTempCredentialSubscriptionVariables,
  APITypes.OnDeleteApsTempCredentialSubscription
>;
export const onCreateApsAppUserNote = /* GraphQL */ `subscription OnCreateApsAppUserNote(
  $filter: ModelSubscriptionApsAppUserNoteFilterInput
  $owner: String
) {
  onCreateApsAppUserNote(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserNoteSubscriptionVariables,
  APITypes.OnCreateApsAppUserNoteSubscription
>;
export const onUpdateApsAppUserNote = /* GraphQL */ `subscription OnUpdateApsAppUserNote(
  $filter: ModelSubscriptionApsAppUserNoteFilterInput
  $owner: String
) {
  onUpdateApsAppUserNote(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserNoteSubscriptionVariables,
  APITypes.OnUpdateApsAppUserNoteSubscription
>;
export const onDeleteApsAppUserNote = /* GraphQL */ `subscription OnDeleteApsAppUserNote(
  $filter: ModelSubscriptionApsAppUserNoteFilterInput
  $owner: String
) {
  onDeleteApsAppUserNote(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserNoteSubscriptionVariables,
  APITypes.OnDeleteApsAppUserNoteSubscription
>;
export const onCreateApsAppUserFavoriteExhibitor = /* GraphQL */ `subscription OnCreateApsAppUserFavoriteExhibitor(
  $filter: ModelSubscriptionApsAppUserFavoriteExhibitorFilterInput
  $owner: String
) {
  onCreateApsAppUserFavoriteExhibitor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserFavoriteExhibitorSubscriptionVariables,
  APITypes.OnCreateApsAppUserFavoriteExhibitorSubscription
>;
export const onUpdateApsAppUserFavoriteExhibitor = /* GraphQL */ `subscription OnUpdateApsAppUserFavoriteExhibitor(
  $filter: ModelSubscriptionApsAppUserFavoriteExhibitorFilterInput
  $owner: String
) {
  onUpdateApsAppUserFavoriteExhibitor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserFavoriteExhibitorSubscriptionVariables,
  APITypes.OnUpdateApsAppUserFavoriteExhibitorSubscription
>;
export const onDeleteApsAppUserFavoriteExhibitor = /* GraphQL */ `subscription OnDeleteApsAppUserFavoriteExhibitor(
  $filter: ModelSubscriptionApsAppUserFavoriteExhibitorFilterInput
  $owner: String
) {
  onDeleteApsAppUserFavoriteExhibitor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserFavoriteExhibitorSubscriptionVariables,
  APITypes.OnDeleteApsAppUserFavoriteExhibitorSubscription
>;
export const onCreateApsAppUserFavoriteSpeaker = /* GraphQL */ `subscription OnCreateApsAppUserFavoriteSpeaker(
  $filter: ModelSubscriptionApsAppUserFavoriteSpeakerFilterInput
  $owner: String
) {
  onCreateApsAppUserFavoriteSpeaker(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserFavoriteSpeakerSubscriptionVariables,
  APITypes.OnCreateApsAppUserFavoriteSpeakerSubscription
>;
export const onUpdateApsAppUserFavoriteSpeaker = /* GraphQL */ `subscription OnUpdateApsAppUserFavoriteSpeaker(
  $filter: ModelSubscriptionApsAppUserFavoriteSpeakerFilterInput
  $owner: String
) {
  onUpdateApsAppUserFavoriteSpeaker(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserFavoriteSpeakerSubscriptionVariables,
  APITypes.OnUpdateApsAppUserFavoriteSpeakerSubscription
>;
export const onDeleteApsAppUserFavoriteSpeaker = /* GraphQL */ `subscription OnDeleteApsAppUserFavoriteSpeaker(
  $filter: ModelSubscriptionApsAppUserFavoriteSpeakerFilterInput
  $owner: String
) {
  onDeleteApsAppUserFavoriteSpeaker(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserFavoriteSpeakerSubscriptionVariables,
  APITypes.OnDeleteApsAppUserFavoriteSpeakerSubscription
>;
export const onCreateApsAppUserFavoriteSponsor = /* GraphQL */ `subscription OnCreateApsAppUserFavoriteSponsor(
  $filter: ModelSubscriptionApsAppUserFavoriteSponsorFilterInput
  $owner: String
) {
  onCreateApsAppUserFavoriteSponsor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserFavoriteSponsorSubscriptionVariables,
  APITypes.OnCreateApsAppUserFavoriteSponsorSubscription
>;
export const onUpdateApsAppUserFavoriteSponsor = /* GraphQL */ `subscription OnUpdateApsAppUserFavoriteSponsor(
  $filter: ModelSubscriptionApsAppUserFavoriteSponsorFilterInput
  $owner: String
) {
  onUpdateApsAppUserFavoriteSponsor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserFavoriteSponsorSubscriptionVariables,
  APITypes.OnUpdateApsAppUserFavoriteSponsorSubscription
>;
export const onDeleteApsAppUserFavoriteSponsor = /* GraphQL */ `subscription OnDeleteApsAppUserFavoriteSponsor(
  $filter: ModelSubscriptionApsAppUserFavoriteSponsorFilterInput
  $owner: String
) {
  onDeleteApsAppUserFavoriteSponsor(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserFavoriteSponsorSubscriptionVariables,
  APITypes.OnDeleteApsAppUserFavoriteSponsorSubscription
>;
export const onCreateApsAppUserFavoriteSession = /* GraphQL */ `subscription OnCreateApsAppUserFavoriteSession(
  $filter: ModelSubscriptionApsAppUserFavoriteSessionFilterInput
  $owner: String
) {
  onCreateApsAppUserFavoriteSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserFavoriteSessionSubscriptionVariables,
  APITypes.OnCreateApsAppUserFavoriteSessionSubscription
>;
export const onUpdateApsAppUserFavoriteSession = /* GraphQL */ `subscription OnUpdateApsAppUserFavoriteSession(
  $filter: ModelSubscriptionApsAppUserFavoriteSessionFilterInput
  $owner: String
) {
  onUpdateApsAppUserFavoriteSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserFavoriteSessionSubscriptionVariables,
  APITypes.OnUpdateApsAppUserFavoriteSessionSubscription
>;
export const onDeleteApsAppUserFavoriteSession = /* GraphQL */ `subscription OnDeleteApsAppUserFavoriteSession(
  $filter: ModelSubscriptionApsAppUserFavoriteSessionFilterInput
  $owner: String
) {
  onDeleteApsAppUserFavoriteSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserFavoriteSessionSubscriptionVariables,
  APITypes.OnDeleteApsAppUserFavoriteSessionSubscription
>;
export const onCreateApsAppUserFavoriteContact = /* GraphQL */ `subscription OnCreateApsAppUserFavoriteContact(
  $filter: ModelSubscriptionApsAppUserFavoriteContactFilterInput
  $owner: String
) {
  onCreateApsAppUserFavoriteContact(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserFavoriteContactSubscriptionVariables,
  APITypes.OnCreateApsAppUserFavoriteContactSubscription
>;
export const onUpdateApsAppUserFavoriteContact = /* GraphQL */ `subscription OnUpdateApsAppUserFavoriteContact(
  $filter: ModelSubscriptionApsAppUserFavoriteContactFilterInput
  $owner: String
) {
  onUpdateApsAppUserFavoriteContact(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserFavoriteContactSubscriptionVariables,
  APITypes.OnUpdateApsAppUserFavoriteContactSubscription
>;
export const onDeleteApsAppUserFavoriteContact = /* GraphQL */ `subscription OnDeleteApsAppUserFavoriteContact(
  $filter: ModelSubscriptionApsAppUserFavoriteContactFilterInput
  $owner: String
) {
  onDeleteApsAppUserFavoriteContact(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserFavoriteContactSubscriptionVariables,
  APITypes.OnDeleteApsAppUserFavoriteContactSubscription
>;
export const onCreateApsContactRequest = /* GraphQL */ `subscription OnCreateApsContactRequest(
  $filter: ModelSubscriptionApsContactRequestFilterInput
) {
  onCreateApsContactRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsContactRequestSubscriptionVariables,
  APITypes.OnCreateApsContactRequestSubscription
>;
export const onUpdateApsContactRequest = /* GraphQL */ `subscription OnUpdateApsContactRequest(
  $filter: ModelSubscriptionApsContactRequestFilterInput
) {
  onUpdateApsContactRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsContactRequestSubscriptionVariables,
  APITypes.OnUpdateApsContactRequestSubscription
>;
export const onDeleteApsContactRequest = /* GraphQL */ `subscription OnDeleteApsContactRequest(
  $filter: ModelSubscriptionApsContactRequestFilterInput
) {
  onDeleteApsContactRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsContactRequestSubscriptionVariables,
  APITypes.OnDeleteApsContactRequestSubscription
>;
export const onCreateApsDmThread = /* GraphQL */ `subscription OnCreateApsDmThread(
  $filter: ModelSubscriptionApsDmThreadFilterInput
) {
  onCreateApsDmThread(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsDmThreadSubscriptionVariables,
  APITypes.OnCreateApsDmThreadSubscription
>;
export const onUpdateApsDmThread = /* GraphQL */ `subscription OnUpdateApsDmThread(
  $filter: ModelSubscriptionApsDmThreadFilterInput
) {
  onUpdateApsDmThread(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsDmThreadSubscriptionVariables,
  APITypes.OnUpdateApsDmThreadSubscription
>;
export const onDeleteApsDmThread = /* GraphQL */ `subscription OnDeleteApsDmThread(
  $filter: ModelSubscriptionApsDmThreadFilterInput
) {
  onDeleteApsDmThread(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsDmThreadSubscriptionVariables,
  APITypes.OnDeleteApsDmThreadSubscription
>;
export const onCreateApsDmParticipantState = /* GraphQL */ `subscription OnCreateApsDmParticipantState(
  $filter: ModelSubscriptionApsDmParticipantStateFilterInput
  $userId: String
) {
  onCreateApsDmParticipantState(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsDmParticipantStateSubscriptionVariables,
  APITypes.OnCreateApsDmParticipantStateSubscription
>;
export const onUpdateApsDmParticipantState = /* GraphQL */ `subscription OnUpdateApsDmParticipantState(
  $filter: ModelSubscriptionApsDmParticipantStateFilterInput
  $userId: String
) {
  onUpdateApsDmParticipantState(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsDmParticipantStateSubscriptionVariables,
  APITypes.OnUpdateApsDmParticipantStateSubscription
>;
export const onDeleteApsDmParticipantState = /* GraphQL */ `subscription OnDeleteApsDmParticipantState(
  $filter: ModelSubscriptionApsDmParticipantStateFilterInput
  $userId: String
) {
  onDeleteApsDmParticipantState(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsDmParticipantStateSubscriptionVariables,
  APITypes.OnDeleteApsDmParticipantStateSubscription
>;
export const onCreateApsDmMessage = /* GraphQL */ `subscription OnCreateApsDmMessage(
  $filter: ModelSubscriptionApsDmMessageFilterInput
) {
  onCreateApsDmMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsDmMessageSubscriptionVariables,
  APITypes.OnCreateApsDmMessageSubscription
>;
export const onUpdateApsDmMessage = /* GraphQL */ `subscription OnUpdateApsDmMessage(
  $filter: ModelSubscriptionApsDmMessageFilterInput
) {
  onUpdateApsDmMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsDmMessageSubscriptionVariables,
  APITypes.OnUpdateApsDmMessageSubscription
>;
export const onDeleteApsDmMessage = /* GraphQL */ `subscription OnDeleteApsDmMessage(
  $filter: ModelSubscriptionApsDmMessageFilterInput
) {
  onDeleteApsDmMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsDmMessageSubscriptionVariables,
  APITypes.OnDeleteApsDmMessageSubscription
>;
export const onCreateApsAdminAnnouncement = /* GraphQL */ `subscription OnCreateApsAdminAnnouncement(
  $filter: ModelSubscriptionApsAdminAnnouncementFilterInput
) {
  onCreateApsAdminAnnouncement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAdminAnnouncementSubscriptionVariables,
  APITypes.OnCreateApsAdminAnnouncementSubscription
>;
export const onUpdateApsAdminAnnouncement = /* GraphQL */ `subscription OnUpdateApsAdminAnnouncement(
  $filter: ModelSubscriptionApsAdminAnnouncementFilterInput
) {
  onUpdateApsAdminAnnouncement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAdminAnnouncementSubscriptionVariables,
  APITypes.OnUpdateApsAdminAnnouncementSubscription
>;
export const onDeleteApsAdminAnnouncement = /* GraphQL */ `subscription OnDeleteApsAdminAnnouncement(
  $filter: ModelSubscriptionApsAdminAnnouncementFilterInput
) {
  onDeleteApsAdminAnnouncement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAdminAnnouncementSubscriptionVariables,
  APITypes.OnDeleteApsAdminAnnouncementSubscription
>;
export const onCreateApsUserEngageState = /* GraphQL */ `subscription OnCreateApsUserEngageState(
  $filter: ModelSubscriptionApsUserEngageStateFilterInput
  $userId: String
) {
  onCreateApsUserEngageState(filter: $filter, userId: $userId) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateApsUserEngageStateSubscriptionVariables,
  APITypes.OnCreateApsUserEngageStateSubscription
>;
export const onUpdateApsUserEngageState = /* GraphQL */ `subscription OnUpdateApsUserEngageState(
  $filter: ModelSubscriptionApsUserEngageStateFilterInput
  $userId: String
) {
  onUpdateApsUserEngageState(filter: $filter, userId: $userId) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateApsUserEngageStateSubscriptionVariables,
  APITypes.OnUpdateApsUserEngageStateSubscription
>;
export const onDeleteApsUserEngageState = /* GraphQL */ `subscription OnDeleteApsUserEngageState(
  $filter: ModelSubscriptionApsUserEngageStateFilterInput
  $userId: String
) {
  onDeleteApsUserEngageState(filter: $filter, userId: $userId) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteApsUserEngageStateSubscriptionVariables,
  APITypes.OnDeleteApsUserEngageStateSubscription
>;
export const onCreateApsPushToken = /* GraphQL */ `subscription OnCreateApsPushToken(
  $filter: ModelSubscriptionApsPushTokenFilterInput
  $userId: String
) {
  onCreateApsPushToken(filter: $filter, userId: $userId) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateApsPushTokenSubscriptionVariables,
  APITypes.OnCreateApsPushTokenSubscription
>;
export const onUpdateApsPushToken = /* GraphQL */ `subscription OnUpdateApsPushToken(
  $filter: ModelSubscriptionApsPushTokenFilterInput
  $userId: String
) {
  onUpdateApsPushToken(filter: $filter, userId: $userId) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateApsPushTokenSubscriptionVariables,
  APITypes.OnUpdateApsPushTokenSubscription
>;
export const onDeleteApsPushToken = /* GraphQL */ `subscription OnDeleteApsPushToken(
  $filter: ModelSubscriptionApsPushTokenFilterInput
  $userId: String
) {
  onDeleteApsPushToken(filter: $filter, userId: $userId) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteApsPushTokenSubscriptionVariables,
  APITypes.OnDeleteApsPushTokenSubscription
>;
export const onCreateAPS = /* GraphQL */ `subscription OnCreateAPS($filter: ModelSubscriptionAPSFilterInput) {
  onCreateAPS(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSSubscriptionVariables,
  APITypes.OnCreateAPSSubscription
>;
export const onUpdateAPS = /* GraphQL */ `subscription OnUpdateAPS($filter: ModelSubscriptionAPSFilterInput) {
  onUpdateAPS(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSSubscriptionVariables,
  APITypes.OnUpdateAPSSubscription
>;
export const onDeleteAPS = /* GraphQL */ `subscription OnDeleteAPS($filter: ModelSubscriptionAPSFilterInput) {
  onDeleteAPS(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSSubscriptionVariables,
  APITypes.OnDeleteAPSSubscription
>;
export const onCreateAPSCode = /* GraphQL */ `subscription OnCreateAPSCode($filter: ModelSubscriptionAPSCodeFilterInput) {
  onCreateAPSCode(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSCodeSubscriptionVariables,
  APITypes.OnCreateAPSCodeSubscription
>;
export const onUpdateAPSCode = /* GraphQL */ `subscription OnUpdateAPSCode($filter: ModelSubscriptionAPSCodeFilterInput) {
  onUpdateAPSCode(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSCodeSubscriptionVariables,
  APITypes.OnUpdateAPSCodeSubscription
>;
export const onDeleteAPSCode = /* GraphQL */ `subscription OnDeleteAPSCode($filter: ModelSubscriptionAPSCodeFilterInput) {
  onDeleteAPSCode(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSCodeSubscriptionVariables,
  APITypes.OnDeleteAPSCodeSubscription
>;
export const onCreateAPSBoard = /* GraphQL */ `subscription OnCreateAPSBoard($filter: ModelSubscriptionAPSBoardFilterInput) {
  onCreateAPSBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSBoardSubscriptionVariables,
  APITypes.OnCreateAPSBoardSubscription
>;
export const onUpdateAPSBoard = /* GraphQL */ `subscription OnUpdateAPSBoard($filter: ModelSubscriptionAPSBoardFilterInput) {
  onUpdateAPSBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSBoardSubscriptionVariables,
  APITypes.OnUpdateAPSBoardSubscription
>;
export const onDeleteAPSBoard = /* GraphQL */ `subscription OnDeleteAPSBoard($filter: ModelSubscriptionAPSBoardFilterInput) {
  onDeleteAPSBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSBoardSubscriptionVariables,
  APITypes.OnDeleteAPSBoardSubscription
>;
export const onCreateApsAgenda = /* GraphQL */ `subscription OnCreateApsAgenda($filter: ModelSubscriptionApsAgendaFilterInput) {
  onCreateApsAgenda(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAgendaSubscriptionVariables,
  APITypes.OnCreateApsAgendaSubscription
>;
export const onUpdateApsAgenda = /* GraphQL */ `subscription OnUpdateApsAgenda($filter: ModelSubscriptionApsAgendaFilterInput) {
  onUpdateApsAgenda(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAgendaSubscriptionVariables,
  APITypes.OnUpdateApsAgendaSubscription
>;
export const onDeleteApsAgenda = /* GraphQL */ `subscription OnDeleteApsAgenda($filter: ModelSubscriptionApsAgendaFilterInput) {
  onDeleteApsAgenda(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAgendaSubscriptionVariables,
  APITypes.OnDeleteApsAgendaSubscription
>;
export const onCreateApsRegistrant = /* GraphQL */ `subscription OnCreateApsRegistrant(
  $filter: ModelSubscriptionApsRegistrantFilterInput
) {
  onCreateApsRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsRegistrantSubscriptionVariables,
  APITypes.OnCreateApsRegistrantSubscription
>;
export const onUpdateApsRegistrant = /* GraphQL */ `subscription OnUpdateApsRegistrant(
  $filter: ModelSubscriptionApsRegistrantFilterInput
) {
  onUpdateApsRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsRegistrantSubscriptionVariables,
  APITypes.OnUpdateApsRegistrantSubscription
>;
export const onDeleteApsRegistrant = /* GraphQL */ `subscription OnDeleteApsRegistrant(
  $filter: ModelSubscriptionApsRegistrantFilterInput
) {
  onDeleteApsRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsRegistrantSubscriptionVariables,
  APITypes.OnDeleteApsRegistrantSubscription
>;
export const onCreateApsAppUser = /* GraphQL */ `subscription OnCreateApsAppUser(
  $filter: ModelSubscriptionApsAppUserFilterInput
) {
  onCreateApsAppUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserSubscriptionVariables,
  APITypes.OnCreateApsAppUserSubscription
>;
export const onUpdateApsAppUser = /* GraphQL */ `subscription OnUpdateApsAppUser(
  $filter: ModelSubscriptionApsAppUserFilterInput
) {
  onUpdateApsAppUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserSubscriptionVariables,
  APITypes.OnUpdateApsAppUserSubscription
>;
export const onDeleteApsAppUser = /* GraphQL */ `subscription OnDeleteApsAppUser(
  $filter: ModelSubscriptionApsAppUserFilterInput
) {
  onDeleteApsAppUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserSubscriptionVariables,
  APITypes.OnDeleteApsAppUserSubscription
>;
export const onCreateApsAppUserContact = /* GraphQL */ `subscription OnCreateApsAppUserContact(
  $filter: ModelSubscriptionApsAppUserContactFilterInput
) {
  onCreateApsAppUserContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserContactSubscriptionVariables,
  APITypes.OnCreateApsAppUserContactSubscription
>;
export const onUpdateApsAppUserContact = /* GraphQL */ `subscription OnUpdateApsAppUserContact(
  $filter: ModelSubscriptionApsAppUserContactFilterInput
) {
  onUpdateApsAppUserContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserContactSubscriptionVariables,
  APITypes.OnUpdateApsAppUserContactSubscription
>;
export const onDeleteApsAppUserContact = /* GraphQL */ `subscription OnDeleteApsAppUserContact(
  $filter: ModelSubscriptionApsAppUserContactFilterInput
) {
  onDeleteApsAppUserContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserContactSubscriptionVariables,
  APITypes.OnDeleteApsAppUserContactSubscription
>;
export const onCreateApsAppUserLead = /* GraphQL */ `subscription OnCreateApsAppUserLead(
  $filter: ModelSubscriptionApsAppUserLeadFilterInput
) {
  onCreateApsAppUserLead(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserLeadSubscriptionVariables,
  APITypes.OnCreateApsAppUserLeadSubscription
>;
export const onUpdateApsAppUserLead = /* GraphQL */ `subscription OnUpdateApsAppUserLead(
  $filter: ModelSubscriptionApsAppUserLeadFilterInput
) {
  onUpdateApsAppUserLead(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserLeadSubscriptionVariables,
  APITypes.OnUpdateApsAppUserLeadSubscription
>;
export const onDeleteApsAppUserLead = /* GraphQL */ `subscription OnDeleteApsAppUserLead(
  $filter: ModelSubscriptionApsAppUserLeadFilterInput
) {
  onDeleteApsAppUserLead(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserLeadSubscriptionVariables,
  APITypes.OnDeleteApsAppUserLeadSubscription
>;
export const onCreateApsAppUserProfile = /* GraphQL */ `subscription OnCreateApsAppUserProfile(
  $filter: ModelSubscriptionApsAppUserProfileFilterInput
) {
  onCreateApsAppUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserProfileSubscriptionVariables,
  APITypes.OnCreateApsAppUserProfileSubscription
>;
export const onUpdateApsAppUserProfile = /* GraphQL */ `subscription OnUpdateApsAppUserProfile(
  $filter: ModelSubscriptionApsAppUserProfileFilterInput
) {
  onUpdateApsAppUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserProfileSubscriptionVariables,
  APITypes.OnUpdateApsAppUserProfileSubscription
>;
export const onDeleteApsAppUserProfile = /* GraphQL */ `subscription OnDeleteApsAppUserProfile(
  $filter: ModelSubscriptionApsAppUserProfileFilterInput
) {
  onDeleteApsAppUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserProfileSubscriptionVariables,
  APITypes.OnDeleteApsAppUserProfileSubscription
>;
export const onCreateProfileAffiliate = /* GraphQL */ `subscription OnCreateProfileAffiliate(
  $filter: ModelSubscriptionProfileAffiliateFilterInput
) {
  onCreateProfileAffiliate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProfileAffiliateSubscriptionVariables,
  APITypes.OnCreateProfileAffiliateSubscription
>;
export const onUpdateProfileAffiliate = /* GraphQL */ `subscription OnUpdateProfileAffiliate(
  $filter: ModelSubscriptionProfileAffiliateFilterInput
) {
  onUpdateProfileAffiliate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfileAffiliateSubscriptionVariables,
  APITypes.OnUpdateProfileAffiliateSubscription
>;
export const onDeleteProfileAffiliate = /* GraphQL */ `subscription OnDeleteProfileAffiliate(
  $filter: ModelSubscriptionProfileAffiliateFilterInput
) {
  onDeleteProfileAffiliate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfileAffiliateSubscriptionVariables,
  APITypes.OnDeleteProfileAffiliateSubscription
>;
export const onCreateProfileEducation = /* GraphQL */ `subscription OnCreateProfileEducation(
  $filter: ModelSubscriptionProfileEducationFilterInput
) {
  onCreateProfileEducation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProfileEducationSubscriptionVariables,
  APITypes.OnCreateProfileEducationSubscription
>;
export const onUpdateProfileEducation = /* GraphQL */ `subscription OnUpdateProfileEducation(
  $filter: ModelSubscriptionProfileEducationFilterInput
) {
  onUpdateProfileEducation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfileEducationSubscriptionVariables,
  APITypes.OnUpdateProfileEducationSubscription
>;
export const onDeleteProfileEducation = /* GraphQL */ `subscription OnDeleteProfileEducation(
  $filter: ModelSubscriptionProfileEducationFilterInput
) {
  onDeleteProfileEducation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfileEducationSubscriptionVariables,
  APITypes.OnDeleteProfileEducationSubscription
>;
export const onCreateProfileInterest = /* GraphQL */ `subscription OnCreateProfileInterest(
  $filter: ModelSubscriptionProfileInterestFilterInput
) {
  onCreateProfileInterest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProfileInterestSubscriptionVariables,
  APITypes.OnCreateProfileInterestSubscription
>;
export const onUpdateProfileInterest = /* GraphQL */ `subscription OnUpdateProfileInterest(
  $filter: ModelSubscriptionProfileInterestFilterInput
) {
  onUpdateProfileInterest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfileInterestSubscriptionVariables,
  APITypes.OnUpdateProfileInterestSubscription
>;
export const onDeleteProfileInterest = /* GraphQL */ `subscription OnDeleteProfileInterest(
  $filter: ModelSubscriptionProfileInterestFilterInput
) {
  onDeleteProfileInterest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfileInterestSubscriptionVariables,
  APITypes.OnDeleteProfileInterestSubscription
>;
export const onCreateApsAppUserPhoto = /* GraphQL */ `subscription OnCreateApsAppUserPhoto(
  $filter: ModelSubscriptionApsAppUserPhotoFilterInput
) {
  onCreateApsAppUserPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppUserPhotoSubscriptionVariables,
  APITypes.OnCreateApsAppUserPhotoSubscription
>;
export const onUpdateApsAppUserPhoto = /* GraphQL */ `subscription OnUpdateApsAppUserPhoto(
  $filter: ModelSubscriptionApsAppUserPhotoFilterInput
) {
  onUpdateApsAppUserPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppUserPhotoSubscriptionVariables,
  APITypes.OnUpdateApsAppUserPhotoSubscription
>;
export const onDeleteApsAppUserPhoto = /* GraphQL */ `subscription OnDeleteApsAppUserPhoto(
  $filter: ModelSubscriptionApsAppUserPhotoFilterInput
) {
  onDeleteApsAppUserPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppUserPhotoSubscriptionVariables,
  APITypes.OnDeleteApsAppUserPhotoSubscription
>;
export const onCreateApsAppSession = /* GraphQL */ `subscription OnCreateApsAppSession(
  $filter: ModelSubscriptionApsAppSessionFilterInput
) {
  onCreateApsAppSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppSessionSubscriptionVariables,
  APITypes.OnCreateApsAppSessionSubscription
>;
export const onUpdateApsAppSession = /* GraphQL */ `subscription OnUpdateApsAppSession(
  $filter: ModelSubscriptionApsAppSessionFilterInput
) {
  onUpdateApsAppSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppSessionSubscriptionVariables,
  APITypes.OnUpdateApsAppSessionSubscription
>;
export const onDeleteApsAppSession = /* GraphQL */ `subscription OnDeleteApsAppSession(
  $filter: ModelSubscriptionApsAppSessionFilterInput
) {
  onDeleteApsAppSession(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppSessionSubscriptionVariables,
  APITypes.OnDeleteApsAppSessionSubscription
>;
export const onCreateApsAppSessionQuestion = /* GraphQL */ `subscription OnCreateApsAppSessionQuestion(
  $filter: ModelSubscriptionApsAppSessionQuestionFilterInput
) {
  onCreateApsAppSessionQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppSessionQuestionSubscriptionVariables,
  APITypes.OnCreateApsAppSessionQuestionSubscription
>;
export const onUpdateApsAppSessionQuestion = /* GraphQL */ `subscription OnUpdateApsAppSessionQuestion(
  $filter: ModelSubscriptionApsAppSessionQuestionFilterInput
) {
  onUpdateApsAppSessionQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppSessionQuestionSubscriptionVariables,
  APITypes.OnUpdateApsAppSessionQuestionSubscription
>;
export const onDeleteApsAppSessionQuestion = /* GraphQL */ `subscription OnDeleteApsAppSessionQuestion(
  $filter: ModelSubscriptionApsAppSessionQuestionFilterInput
) {
  onDeleteApsAppSessionQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppSessionQuestionSubscriptionVariables,
  APITypes.OnDeleteApsAppSessionQuestionSubscription
>;
export const onCreateAPSSpeaker = /* GraphQL */ `subscription OnCreateAPSSpeaker(
  $filter: ModelSubscriptionAPSSpeakerFilterInput
) {
  onCreateAPSSpeaker(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSSpeakerSubscriptionVariables,
  APITypes.OnCreateAPSSpeakerSubscription
>;
export const onUpdateAPSSpeaker = /* GraphQL */ `subscription OnUpdateAPSSpeaker(
  $filter: ModelSubscriptionAPSSpeakerFilterInput
) {
  onUpdateAPSSpeaker(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSSpeakerSubscriptionVariables,
  APITypes.OnUpdateAPSSpeakerSubscription
>;
export const onDeleteAPSSpeaker = /* GraphQL */ `subscription OnDeleteAPSSpeaker(
  $filter: ModelSubscriptionAPSSpeakerFilterInput
) {
  onDeleteAPSSpeaker(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSSpeakerSubscriptionVariables,
  APITypes.OnDeleteAPSSpeakerSubscription
>;
export const onCreateApsSponsor = /* GraphQL */ `subscription OnCreateApsSponsor(
  $filter: ModelSubscriptionApsSponsorFilterInput
) {
  onCreateApsSponsor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsSponsorSubscriptionVariables,
  APITypes.OnCreateApsSponsorSubscription
>;
export const onUpdateApsSponsor = /* GraphQL */ `subscription OnUpdateApsSponsor(
  $filter: ModelSubscriptionApsSponsorFilterInput
) {
  onUpdateApsSponsor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsSponsorSubscriptionVariables,
  APITypes.OnUpdateApsSponsorSubscription
>;
export const onDeleteApsSponsor = /* GraphQL */ `subscription OnDeleteApsSponsor(
  $filter: ModelSubscriptionApsSponsorFilterInput
) {
  onDeleteApsSponsor(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsSponsorSubscriptionVariables,
  APITypes.OnDeleteApsSponsorSubscription
>;
export const onCreateAPSCompany = /* GraphQL */ `subscription OnCreateAPSCompany(
  $filter: ModelSubscriptionAPSCompanyFilterInput
) {
  onCreateAPSCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSCompanySubscriptionVariables,
  APITypes.OnCreateAPSCompanySubscription
>;
export const onUpdateAPSCompany = /* GraphQL */ `subscription OnUpdateAPSCompany(
  $filter: ModelSubscriptionAPSCompanyFilterInput
) {
  onUpdateAPSCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSCompanySubscriptionVariables,
  APITypes.OnUpdateAPSCompanySubscription
>;
export const onDeleteAPSCompany = /* GraphQL */ `subscription OnDeleteAPSCompany(
  $filter: ModelSubscriptionAPSCompanyFilterInput
) {
  onDeleteAPSCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSCompanySubscriptionVariables,
  APITypes.OnDeleteAPSCompanySubscription
>;
export const onCreateAPSCompanyContact = /* GraphQL */ `subscription OnCreateAPSCompanyContact(
  $filter: ModelSubscriptionAPSCompanyContactFilterInput
) {
  onCreateAPSCompanyContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSCompanyContactSubscriptionVariables,
  APITypes.OnCreateAPSCompanyContactSubscription
>;
export const onUpdateAPSCompanyContact = /* GraphQL */ `subscription OnUpdateAPSCompanyContact(
  $filter: ModelSubscriptionAPSCompanyContactFilterInput
) {
  onUpdateAPSCompanyContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSCompanyContactSubscriptionVariables,
  APITypes.OnUpdateAPSCompanyContactSubscription
>;
export const onDeleteAPSCompanyContact = /* GraphQL */ `subscription OnDeleteAPSCompanyContact(
  $filter: ModelSubscriptionAPSCompanyContactFilterInput
) {
  onDeleteAPSCompanyContact(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSCompanyContactSubscriptionVariables,
  APITypes.OnDeleteAPSCompanyContactSubscription
>;
export const onCreateApsAppExhibitorProfile = /* GraphQL */ `subscription OnCreateApsAppExhibitorProfile(
  $filter: ModelSubscriptionApsAppExhibitorProfileFilterInput
) {
  onCreateApsAppExhibitorProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppExhibitorProfileSubscriptionVariables,
  APITypes.OnCreateApsAppExhibitorProfileSubscription
>;
export const onUpdateApsAppExhibitorProfile = /* GraphQL */ `subscription OnUpdateApsAppExhibitorProfile(
  $filter: ModelSubscriptionApsAppExhibitorProfileFilterInput
) {
  onUpdateApsAppExhibitorProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppExhibitorProfileSubscriptionVariables,
  APITypes.OnUpdateApsAppExhibitorProfileSubscription
>;
export const onDeleteApsAppExhibitorProfile = /* GraphQL */ `subscription OnDeleteApsAppExhibitorProfile(
  $filter: ModelSubscriptionApsAppExhibitorProfileFilterInput
) {
  onDeleteApsAppExhibitorProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppExhibitorProfileSubscriptionVariables,
  APITypes.OnDeleteApsAppExhibitorProfileSubscription
>;
export const onCreateApsAppExhibitorPromotion = /* GraphQL */ `subscription OnCreateApsAppExhibitorPromotion(
  $filter: ModelSubscriptionApsAppExhibitorPromotionFilterInput
) {
  onCreateApsAppExhibitorPromotion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppExhibitorPromotionSubscriptionVariables,
  APITypes.OnCreateApsAppExhibitorPromotionSubscription
>;
export const onUpdateApsAppExhibitorPromotion = /* GraphQL */ `subscription OnUpdateApsAppExhibitorPromotion(
  $filter: ModelSubscriptionApsAppExhibitorPromotionFilterInput
) {
  onUpdateApsAppExhibitorPromotion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppExhibitorPromotionSubscriptionVariables,
  APITypes.OnUpdateApsAppExhibitorPromotionSubscription
>;
export const onDeleteApsAppExhibitorPromotion = /* GraphQL */ `subscription OnDeleteApsAppExhibitorPromotion(
  $filter: ModelSubscriptionApsAppExhibitorPromotionFilterInput
) {
  onDeleteApsAppExhibitorPromotion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppExhibitorPromotionSubscriptionVariables,
  APITypes.OnDeleteApsAppExhibitorPromotionSubscription
>;
export const onCreateApsAppExhibitorDeal = /* GraphQL */ `subscription OnCreateApsAppExhibitorDeal(
  $filter: ModelSubscriptionApsAppExhibitorDealFilterInput
) {
  onCreateApsAppExhibitorDeal(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppExhibitorDealSubscriptionVariables,
  APITypes.OnCreateApsAppExhibitorDealSubscription
>;
export const onUpdateApsAppExhibitorDeal = /* GraphQL */ `subscription OnUpdateApsAppExhibitorDeal(
  $filter: ModelSubscriptionApsAppExhibitorDealFilterInput
) {
  onUpdateApsAppExhibitorDeal(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppExhibitorDealSubscriptionVariables,
  APITypes.OnUpdateApsAppExhibitorDealSubscription
>;
export const onDeleteApsAppExhibitorDeal = /* GraphQL */ `subscription OnDeleteApsAppExhibitorDeal(
  $filter: ModelSubscriptionApsAppExhibitorDealFilterInput
) {
  onDeleteApsAppExhibitorDeal(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppExhibitorDealSubscriptionVariables,
  APITypes.OnDeleteApsAppExhibitorDealSubscription
>;
export const onCreateApsAppExhibitorPhoto = /* GraphQL */ `subscription OnCreateApsAppExhibitorPhoto(
  $filter: ModelSubscriptionApsAppExhibitorPhotoFilterInput
) {
  onCreateApsAppExhibitorPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppExhibitorPhotoSubscriptionVariables,
  APITypes.OnCreateApsAppExhibitorPhotoSubscription
>;
export const onUpdateApsAppExhibitorPhoto = /* GraphQL */ `subscription OnUpdateApsAppExhibitorPhoto(
  $filter: ModelSubscriptionApsAppExhibitorPhotoFilterInput
) {
  onUpdateApsAppExhibitorPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppExhibitorPhotoSubscriptionVariables,
  APITypes.OnUpdateApsAppExhibitorPhotoSubscription
>;
export const onDeleteApsAppExhibitorPhoto = /* GraphQL */ `subscription OnDeleteApsAppExhibitorPhoto(
  $filter: ModelSubscriptionApsAppExhibitorPhotoFilterInput
) {
  onDeleteApsAppExhibitorPhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppExhibitorPhotoSubscriptionVariables,
  APITypes.OnDeleteApsAppExhibitorPhotoSubscription
>;
export const onCreateApsAppExhibitorHandout = /* GraphQL */ `subscription OnCreateApsAppExhibitorHandout(
  $filter: ModelSubscriptionApsAppExhibitorHandoutFilterInput
) {
  onCreateApsAppExhibitorHandout(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAppExhibitorHandoutSubscriptionVariables,
  APITypes.OnCreateApsAppExhibitorHandoutSubscription
>;
export const onUpdateApsAppExhibitorHandout = /* GraphQL */ `subscription OnUpdateApsAppExhibitorHandout(
  $filter: ModelSubscriptionApsAppExhibitorHandoutFilterInput
) {
  onUpdateApsAppExhibitorHandout(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAppExhibitorHandoutSubscriptionVariables,
  APITypes.OnUpdateApsAppExhibitorHandoutSubscription
>;
export const onDeleteApsAppExhibitorHandout = /* GraphQL */ `subscription OnDeleteApsAppExhibitorHandout(
  $filter: ModelSubscriptionApsAppExhibitorHandoutFilterInput
) {
  onDeleteApsAppExhibitorHandout(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAppExhibitorHandoutSubscriptionVariables,
  APITypes.OnDeleteApsAppExhibitorHandoutSubscription
>;
export const onCreateApsAddOn = /* GraphQL */ `subscription OnCreateApsAddOn($filter: ModelSubscriptionApsAddOnFilterInput) {
  onCreateApsAddOn(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsAddOnSubscriptionVariables,
  APITypes.OnCreateApsAddOnSubscription
>;
export const onUpdateApsAddOn = /* GraphQL */ `subscription OnUpdateApsAddOn($filter: ModelSubscriptionApsAddOnFilterInput) {
  onUpdateApsAddOn(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsAddOnSubscriptionVariables,
  APITypes.OnUpdateApsAddOnSubscription
>;
export const onDeleteApsAddOn = /* GraphQL */ `subscription OnDeleteApsAddOn($filter: ModelSubscriptionApsAddOnFilterInput) {
  onDeleteApsAddOn(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsAddOnSubscriptionVariables,
  APITypes.OnDeleteApsAddOnSubscription
>;
export const onCreateRegistrantAddOnRequest = /* GraphQL */ `subscription OnCreateRegistrantAddOnRequest(
  $filter: ModelSubscriptionRegistrantAddOnRequestFilterInput
) {
  onCreateRegistrantAddOnRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRegistrantAddOnRequestSubscriptionVariables,
  APITypes.OnCreateRegistrantAddOnRequestSubscription
>;
export const onUpdateRegistrantAddOnRequest = /* GraphQL */ `subscription OnUpdateRegistrantAddOnRequest(
  $filter: ModelSubscriptionRegistrantAddOnRequestFilterInput
) {
  onUpdateRegistrantAddOnRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRegistrantAddOnRequestSubscriptionVariables,
  APITypes.OnUpdateRegistrantAddOnRequestSubscription
>;
export const onDeleteRegistrantAddOnRequest = /* GraphQL */ `subscription OnDeleteRegistrantAddOnRequest(
  $filter: ModelSubscriptionRegistrantAddOnRequestFilterInput
) {
  onDeleteRegistrantAddOnRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRegistrantAddOnRequestSubscriptionVariables,
  APITypes.OnDeleteRegistrantAddOnRequestSubscription
>;
export const onCreateApsSeatingChart = /* GraphQL */ `subscription OnCreateApsSeatingChart(
  $filter: ModelSubscriptionApsSeatingChartFilterInput
) {
  onCreateApsSeatingChart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsSeatingChartSubscriptionVariables,
  APITypes.OnCreateApsSeatingChartSubscription
>;
export const onUpdateApsSeatingChart = /* GraphQL */ `subscription OnUpdateApsSeatingChart(
  $filter: ModelSubscriptionApsSeatingChartFilterInput
) {
  onUpdateApsSeatingChart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsSeatingChartSubscriptionVariables,
  APITypes.OnUpdateApsSeatingChartSubscription
>;
export const onDeleteApsSeatingChart = /* GraphQL */ `subscription OnDeleteApsSeatingChart(
  $filter: ModelSubscriptionApsSeatingChartFilterInput
) {
  onDeleteApsSeatingChart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsSeatingChartSubscriptionVariables,
  APITypes.OnDeleteApsSeatingChartSubscription
>;
export const onCreateApsSeatingChartRegistrant = /* GraphQL */ `subscription OnCreateApsSeatingChartRegistrant(
  $filter: ModelSubscriptionApsSeatingChartRegistrantFilterInput
) {
  onCreateApsSeatingChartRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApsSeatingChartRegistrantSubscriptionVariables,
  APITypes.OnCreateApsSeatingChartRegistrantSubscription
>;
export const onUpdateApsSeatingChartRegistrant = /* GraphQL */ `subscription OnUpdateApsSeatingChartRegistrant(
  $filter: ModelSubscriptionApsSeatingChartRegistrantFilterInput
) {
  onUpdateApsSeatingChartRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApsSeatingChartRegistrantSubscriptionVariables,
  APITypes.OnUpdateApsSeatingChartRegistrantSubscription
>;
export const onDeleteApsSeatingChartRegistrant = /* GraphQL */ `subscription OnDeleteApsSeatingChartRegistrant(
  $filter: ModelSubscriptionApsSeatingChartRegistrantFilterInput
) {
  onDeleteApsSeatingChartRegistrant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApsSeatingChartRegistrantSubscriptionVariables,
  APITypes.OnDeleteApsSeatingChartRegistrantSubscription
>;
export const onCreateAPSCompanyEvents = /* GraphQL */ `subscription OnCreateAPSCompanyEvents(
  $filter: ModelSubscriptionAPSCompanyEventsFilterInput
) {
  onCreateAPSCompanyEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAPSCompanyEventsSubscriptionVariables,
  APITypes.OnCreateAPSCompanyEventsSubscription
>;
export const onUpdateAPSCompanyEvents = /* GraphQL */ `subscription OnUpdateAPSCompanyEvents(
  $filter: ModelSubscriptionAPSCompanyEventsFilterInput
) {
  onUpdateAPSCompanyEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAPSCompanyEventsSubscriptionVariables,
  APITypes.OnUpdateAPSCompanyEventsSubscription
>;
export const onDeleteAPSCompanyEvents = /* GraphQL */ `subscription OnDeleteAPSCompanyEvents(
  $filter: ModelSubscriptionAPSCompanyEventsFilterInput
) {
  onDeleteAPSCompanyEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAPSCompanyEventsSubscriptionVariables,
  APITypes.OnDeleteAPSCompanyEventsSubscription
>;
export const onCreateSessionSpeakers = /* GraphQL */ `subscription OnCreateSessionSpeakers(
  $filter: ModelSubscriptionSessionSpeakersFilterInput
) {
  onCreateSessionSpeakers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionSpeakersSubscriptionVariables,
  APITypes.OnCreateSessionSpeakersSubscription
>;
export const onUpdateSessionSpeakers = /* GraphQL */ `subscription OnUpdateSessionSpeakers(
  $filter: ModelSubscriptionSessionSpeakersFilterInput
) {
  onUpdateSessionSpeakers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionSpeakersSubscriptionVariables,
  APITypes.OnUpdateSessionSpeakersSubscription
>;
export const onDeleteSessionSpeakers = /* GraphQL */ `subscription OnDeleteSessionSpeakers(
  $filter: ModelSubscriptionSessionSpeakersFilterInput
) {
  onDeleteSessionSpeakers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionSpeakersSubscriptionVariables,
  APITypes.OnDeleteSessionSpeakersSubscription
>;
export const onCreateSessionSponsors = /* GraphQL */ `subscription OnCreateSessionSponsors(
  $filter: ModelSubscriptionSessionSponsorsFilterInput
) {
  onCreateSessionSponsors(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionSponsorsSubscriptionVariables,
  APITypes.OnCreateSessionSponsorsSubscription
>;
export const onUpdateSessionSponsors = /* GraphQL */ `subscription OnUpdateSessionSponsors(
  $filter: ModelSubscriptionSessionSponsorsFilterInput
) {
  onUpdateSessionSponsors(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionSponsorsSubscriptionVariables,
  APITypes.OnUpdateSessionSponsorsSubscription
>;
export const onDeleteSessionSponsors = /* GraphQL */ `subscription OnDeleteSessionSponsors(
  $filter: ModelSubscriptionSessionSponsorsFilterInput
) {
  onDeleteSessionSponsors(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionSponsorsSubscriptionVariables,
  APITypes.OnDeleteSessionSponsorsSubscription
>;
