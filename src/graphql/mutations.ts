/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const updateAPS = /* GraphQL */ `mutation UpdateAPS(
  $input: UpdateAPSInput!
  $condition: ModelAPSConditionInput
) {
  updateAPS(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSMutationVariables,
  APITypes.UpdateAPSMutation
>;
export const deleteAPS = /* GraphQL */ `mutation DeleteAPS(
  $input: DeleteAPSInput!
  $condition: ModelAPSConditionInput
) {
  deleteAPS(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSMutationVariables,
  APITypes.DeleteAPSMutation
>;
export const createAPSCode = /* GraphQL */ `mutation CreateAPSCode(
  $input: CreateAPSCodeInput!
  $condition: ModelAPSCodeConditionInput
) {
  createAPSCode(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSCodeMutationVariables,
  APITypes.CreateAPSCodeMutation
>;
export const updateAPSCode = /* GraphQL */ `mutation UpdateAPSCode(
  $input: UpdateAPSCodeInput!
  $condition: ModelAPSCodeConditionInput
) {
  updateAPSCode(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSCodeMutationVariables,
  APITypes.UpdateAPSCodeMutation
>;
export const deleteAPSCode = /* GraphQL */ `mutation DeleteAPSCode(
  $input: DeleteAPSCodeInput!
  $condition: ModelAPSCodeConditionInput
) {
  deleteAPSCode(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSCodeMutationVariables,
  APITypes.DeleteAPSCodeMutation
>;
export const createApsAgenda = /* GraphQL */ `mutation CreateApsAgenda(
  $input: CreateApsAgendaInput!
  $condition: ModelApsAgendaConditionInput
) {
  createApsAgenda(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAgendaMutationVariables,
  APITypes.CreateApsAgendaMutation
>;
export const updateApsAgenda = /* GraphQL */ `mutation UpdateApsAgenda(
  $input: UpdateApsAgendaInput!
  $condition: ModelApsAgendaConditionInput
) {
  updateApsAgenda(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAgendaMutationVariables,
  APITypes.UpdateApsAgendaMutation
>;
export const deleteApsAgenda = /* GraphQL */ `mutation DeleteApsAgenda(
  $input: DeleteApsAgendaInput!
  $condition: ModelApsAgendaConditionInput
) {
  deleteApsAgenda(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAgendaMutationVariables,
  APITypes.DeleteApsAgendaMutation
>;
export const deleteApsRegistrant = /* GraphQL */ `mutation DeleteApsRegistrant(
  $input: DeleteApsRegistrantInput!
  $condition: ModelApsRegistrantConditionInput
) {
  deleteApsRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsRegistrantMutationVariables,
  APITypes.DeleteApsRegistrantMutation
>;
export const createApsTempCredential = /* GraphQL */ `mutation CreateApsTempCredential(
  $input: CreateApsTempCredentialInput!
  $condition: ModelApsTempCredentialConditionInput
) {
  createApsTempCredential(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsTempCredentialMutationVariables,
  APITypes.CreateApsTempCredentialMutation
>;
export const updateApsTempCredential = /* GraphQL */ `mutation UpdateApsTempCredential(
  $input: UpdateApsTempCredentialInput!
  $condition: ModelApsTempCredentialConditionInput
) {
  updateApsTempCredential(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsTempCredentialMutationVariables,
  APITypes.UpdateApsTempCredentialMutation
>;
export const deleteApsTempCredential = /* GraphQL */ `mutation DeleteApsTempCredential(
  $input: DeleteApsTempCredentialInput!
  $condition: ModelApsTempCredentialConditionInput
) {
  deleteApsTempCredential(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsTempCredentialMutationVariables,
  APITypes.DeleteApsTempCredentialMutation
>;
export const createApsAppUser = /* GraphQL */ `mutation CreateApsAppUser(
  $input: CreateApsAppUserInput!
  $condition: ModelApsAppUserConditionInput
) {
  createApsAppUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserMutationVariables,
  APITypes.CreateApsAppUserMutation
>;
export const deleteApsAppUser = /* GraphQL */ `mutation DeleteApsAppUser(
  $input: DeleteApsAppUserInput!
  $condition: ModelApsAppUserConditionInput
) {
  deleteApsAppUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserMutationVariables,
  APITypes.DeleteApsAppUserMutation
>;
export const createApsAppUserContact = /* GraphQL */ `mutation CreateApsAppUserContact(
  $input: CreateApsAppUserContactInput!
  $condition: ModelApsAppUserContactConditionInput
) {
  createApsAppUserContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserContactMutationVariables,
  APITypes.CreateApsAppUserContactMutation
>;
export const updateApsAppUserContact = /* GraphQL */ `mutation UpdateApsAppUserContact(
  $input: UpdateApsAppUserContactInput!
  $condition: ModelApsAppUserContactConditionInput
) {
  updateApsAppUserContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserContactMutationVariables,
  APITypes.UpdateApsAppUserContactMutation
>;
export const deleteApsAppUserContact = /* GraphQL */ `mutation DeleteApsAppUserContact(
  $input: DeleteApsAppUserContactInput!
  $condition: ModelApsAppUserContactConditionInput
) {
  deleteApsAppUserContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserContactMutationVariables,
  APITypes.DeleteApsAppUserContactMutation
>;
export const createApsAppUserNote = /* GraphQL */ `mutation CreateApsAppUserNote(
  $input: CreateApsAppUserNoteInput!
  $condition: ModelApsAppUserNoteConditionInput
) {
  createApsAppUserNote(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserNoteMutationVariables,
  APITypes.CreateApsAppUserNoteMutation
>;
export const updateApsAppUserNote = /* GraphQL */ `mutation UpdateApsAppUserNote(
  $input: UpdateApsAppUserNoteInput!
  $condition: ModelApsAppUserNoteConditionInput
) {
  updateApsAppUserNote(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserNoteMutationVariables,
  APITypes.UpdateApsAppUserNoteMutation
>;
export const deleteApsAppUserNote = /* GraphQL */ `mutation DeleteApsAppUserNote(
  $input: DeleteApsAppUserNoteInput!
  $condition: ModelApsAppUserNoteConditionInput
) {
  deleteApsAppUserNote(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserNoteMutationVariables,
  APITypes.DeleteApsAppUserNoteMutation
>;
export const createApsAppUserLead = /* GraphQL */ `mutation CreateApsAppUserLead(
  $input: CreateApsAppUserLeadInput!
  $condition: ModelApsAppUserLeadConditionInput
) {
  createApsAppUserLead(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserLeadMutationVariables,
  APITypes.CreateApsAppUserLeadMutation
>;
export const updateApsAppUserLead = /* GraphQL */ `mutation UpdateApsAppUserLead(
  $input: UpdateApsAppUserLeadInput!
  $condition: ModelApsAppUserLeadConditionInput
) {
  updateApsAppUserLead(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserLeadMutationVariables,
  APITypes.UpdateApsAppUserLeadMutation
>;
export const deleteApsAppUserLead = /* GraphQL */ `mutation DeleteApsAppUserLead(
  $input: DeleteApsAppUserLeadInput!
  $condition: ModelApsAppUserLeadConditionInput
) {
  deleteApsAppUserLead(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserLeadMutationVariables,
  APITypes.DeleteApsAppUserLeadMutation
>;
export const createApsAppUserProfile = /* GraphQL */ `mutation CreateApsAppUserProfile(
  $input: CreateApsAppUserProfileInput!
  $condition: ModelApsAppUserProfileConditionInput
) {
  createApsAppUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserProfileMutationVariables,
  APITypes.CreateApsAppUserProfileMutation
>;
export const deleteApsAppUserProfile = /* GraphQL */ `mutation DeleteApsAppUserProfile(
  $input: DeleteApsAppUserProfileInput!
  $condition: ModelApsAppUserProfileConditionInput
) {
  deleteApsAppUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserProfileMutationVariables,
  APITypes.DeleteApsAppUserProfileMutation
>;
export const createProfileAffiliate = /* GraphQL */ `mutation CreateProfileAffiliate(
  $input: CreateProfileAffiliateInput!
  $condition: ModelProfileAffiliateConditionInput
) {
  createProfileAffiliate(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProfileAffiliateMutationVariables,
  APITypes.CreateProfileAffiliateMutation
>;
export const updateProfileAffiliate = /* GraphQL */ `mutation UpdateProfileAffiliate(
  $input: UpdateProfileAffiliateInput!
  $condition: ModelProfileAffiliateConditionInput
) {
  updateProfileAffiliate(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProfileAffiliateMutationVariables,
  APITypes.UpdateProfileAffiliateMutation
>;
export const deleteProfileAffiliate = /* GraphQL */ `mutation DeleteProfileAffiliate(
  $input: DeleteProfileAffiliateInput!
  $condition: ModelProfileAffiliateConditionInput
) {
  deleteProfileAffiliate(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProfileAffiliateMutationVariables,
  APITypes.DeleteProfileAffiliateMutation
>;
export const createProfileEducation = /* GraphQL */ `mutation CreateProfileEducation(
  $input: CreateProfileEducationInput!
  $condition: ModelProfileEducationConditionInput
) {
  createProfileEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProfileEducationMutationVariables,
  APITypes.CreateProfileEducationMutation
>;
export const updateProfileEducation = /* GraphQL */ `mutation UpdateProfileEducation(
  $input: UpdateProfileEducationInput!
  $condition: ModelProfileEducationConditionInput
) {
  updateProfileEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProfileEducationMutationVariables,
  APITypes.UpdateProfileEducationMutation
>;
export const deleteProfileEducation = /* GraphQL */ `mutation DeleteProfileEducation(
  $input: DeleteProfileEducationInput!
  $condition: ModelProfileEducationConditionInput
) {
  deleteProfileEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProfileEducationMutationVariables,
  APITypes.DeleteProfileEducationMutation
>;
export const createProfileInterest = /* GraphQL */ `mutation CreateProfileInterest(
  $input: CreateProfileInterestInput!
  $condition: ModelProfileInterestConditionInput
) {
  createProfileInterest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProfileInterestMutationVariables,
  APITypes.CreateProfileInterestMutation
>;
export const updateProfileInterest = /* GraphQL */ `mutation UpdateProfileInterest(
  $input: UpdateProfileInterestInput!
  $condition: ModelProfileInterestConditionInput
) {
  updateProfileInterest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProfileInterestMutationVariables,
  APITypes.UpdateProfileInterestMutation
>;
export const deleteProfileInterest = /* GraphQL */ `mutation DeleteProfileInterest(
  $input: DeleteProfileInterestInput!
  $condition: ModelProfileInterestConditionInput
) {
  deleteProfileInterest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProfileInterestMutationVariables,
  APITypes.DeleteProfileInterestMutation
>;
export const createApsAppUserPhoto = /* GraphQL */ `mutation CreateApsAppUserPhoto(
  $input: CreateApsAppUserPhotoInput!
  $condition: ModelApsAppUserPhotoConditionInput
) {
  createApsAppUserPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserPhotoMutationVariables,
  APITypes.CreateApsAppUserPhotoMutation
>;
export const updateApsAppUserPhoto = /* GraphQL */ `mutation UpdateApsAppUserPhoto(
  $input: UpdateApsAppUserPhotoInput!
  $condition: ModelApsAppUserPhotoConditionInput
) {
  updateApsAppUserPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserPhotoMutationVariables,
  APITypes.UpdateApsAppUserPhotoMutation
>;
export const deleteApsAppUserPhoto = /* GraphQL */ `mutation DeleteApsAppUserPhoto(
  $input: DeleteApsAppUserPhotoInput!
  $condition: ModelApsAppUserPhotoConditionInput
) {
  deleteApsAppUserPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserPhotoMutationVariables,
  APITypes.DeleteApsAppUserPhotoMutation
>;
export const createApsAppSession = /* GraphQL */ `mutation CreateApsAppSession(
  $input: CreateApsAppSessionInput!
  $condition: ModelApsAppSessionConditionInput
) {
  createApsAppSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppSessionMutationVariables,
  APITypes.CreateApsAppSessionMutation
>;
export const updateApsAppSession = /* GraphQL */ `mutation UpdateApsAppSession(
  $input: UpdateApsAppSessionInput!
  $condition: ModelApsAppSessionConditionInput
) {
  updateApsAppSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppSessionMutationVariables,
  APITypes.UpdateApsAppSessionMutation
>;
export const deleteApsAppSession = /* GraphQL */ `mutation DeleteApsAppSession(
  $input: DeleteApsAppSessionInput!
  $condition: ModelApsAppSessionConditionInput
) {
  deleteApsAppSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppSessionMutationVariables,
  APITypes.DeleteApsAppSessionMutation
>;
export const createApsAppSessionQuestion = /* GraphQL */ `mutation CreateApsAppSessionQuestion(
  $input: CreateApsAppSessionQuestionInput!
  $condition: ModelApsAppSessionQuestionConditionInput
) {
  createApsAppSessionQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppSessionQuestionMutationVariables,
  APITypes.CreateApsAppSessionQuestionMutation
>;
export const updateApsAppSessionQuestion = /* GraphQL */ `mutation UpdateApsAppSessionQuestion(
  $input: UpdateApsAppSessionQuestionInput!
  $condition: ModelApsAppSessionQuestionConditionInput
) {
  updateApsAppSessionQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppSessionQuestionMutationVariables,
  APITypes.UpdateApsAppSessionQuestionMutation
>;
export const deleteApsAppSessionQuestion = /* GraphQL */ `mutation DeleteApsAppSessionQuestion(
  $input: DeleteApsAppSessionQuestionInput!
  $condition: ModelApsAppSessionQuestionConditionInput
) {
  deleteApsAppSessionQuestion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppSessionQuestionMutationVariables,
  APITypes.DeleteApsAppSessionQuestionMutation
>;
export const createAPSSpeaker = /* GraphQL */ `mutation CreateAPSSpeaker(
  $input: CreateAPSSpeakerInput!
  $condition: ModelAPSSpeakerConditionInput
) {
  createAPSSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSSpeakerMutationVariables,
  APITypes.CreateAPSSpeakerMutation
>;
export const updateAPSSpeaker = /* GraphQL */ `mutation UpdateAPSSpeaker(
  $input: UpdateAPSSpeakerInput!
  $condition: ModelAPSSpeakerConditionInput
) {
  updateAPSSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSSpeakerMutationVariables,
  APITypes.UpdateAPSSpeakerMutation
>;
export const deleteAPSSpeaker = /* GraphQL */ `mutation DeleteAPSSpeaker(
  $input: DeleteAPSSpeakerInput!
  $condition: ModelAPSSpeakerConditionInput
) {
  deleteAPSSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSSpeakerMutationVariables,
  APITypes.DeleteAPSSpeakerMutation
>;
export const createApsSponsor = /* GraphQL */ `mutation CreateApsSponsor(
  $input: CreateApsSponsorInput!
  $condition: ModelApsSponsorConditionInput
) {
  createApsSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsSponsorMutationVariables,
  APITypes.CreateApsSponsorMutation
>;
export const updateApsSponsor = /* GraphQL */ `mutation UpdateApsSponsor(
  $input: UpdateApsSponsorInput!
  $condition: ModelApsSponsorConditionInput
) {
  updateApsSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsSponsorMutationVariables,
  APITypes.UpdateApsSponsorMutation
>;
export const deleteApsSponsor = /* GraphQL */ `mutation DeleteApsSponsor(
  $input: DeleteApsSponsorInput!
  $condition: ModelApsSponsorConditionInput
) {
  deleteApsSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsSponsorMutationVariables,
  APITypes.DeleteApsSponsorMutation
>;
export const deleteAPSCompany = /* GraphQL */ `mutation DeleteAPSCompany(
  $input: DeleteAPSCompanyInput!
  $condition: ModelAPSCompanyConditionInput
) {
  deleteAPSCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSCompanyMutationVariables,
  APITypes.DeleteAPSCompanyMutation
>;
export const createAPSCompanyContact = /* GraphQL */ `mutation CreateAPSCompanyContact(
  $input: CreateAPSCompanyContactInput!
  $condition: ModelAPSCompanyContactConditionInput
) {
  createAPSCompanyContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSCompanyContactMutationVariables,
  APITypes.CreateAPSCompanyContactMutation
>;
export const updateAPSCompanyContact = /* GraphQL */ `mutation UpdateAPSCompanyContact(
  $input: UpdateAPSCompanyContactInput!
  $condition: ModelAPSCompanyContactConditionInput
) {
  updateAPSCompanyContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSCompanyContactMutationVariables,
  APITypes.UpdateAPSCompanyContactMutation
>;
export const deleteAPSCompanyContact = /* GraphQL */ `mutation DeleteAPSCompanyContact(
  $input: DeleteAPSCompanyContactInput!
  $condition: ModelAPSCompanyContactConditionInput
) {
  deleteAPSCompanyContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSCompanyContactMutationVariables,
  APITypes.DeleteAPSCompanyContactMutation
>;
export const createApsAppExhibitorProfile = /* GraphQL */ `mutation CreateApsAppExhibitorProfile(
  $input: CreateApsAppExhibitorProfileInput!
  $condition: ModelApsAppExhibitorProfileConditionInput
) {
  createApsAppExhibitorProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppExhibitorProfileMutationVariables,
  APITypes.CreateApsAppExhibitorProfileMutation
>;
export const deleteApsAppExhibitorProfile = /* GraphQL */ `mutation DeleteApsAppExhibitorProfile(
  $input: DeleteApsAppExhibitorProfileInput!
  $condition: ModelApsAppExhibitorProfileConditionInput
) {
  deleteApsAppExhibitorProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppExhibitorProfileMutationVariables,
  APITypes.DeleteApsAppExhibitorProfileMutation
>;
export const createApsAppUserFavoriteExhibitor = /* GraphQL */ `mutation CreateApsAppUserFavoriteExhibitor(
  $input: CreateApsAppUserFavoriteExhibitorInput!
  $condition: ModelApsAppUserFavoriteExhibitorConditionInput
) {
  createApsAppUserFavoriteExhibitor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserFavoriteExhibitorMutationVariables,
  APITypes.CreateApsAppUserFavoriteExhibitorMutation
>;
export const updateApsAppUserFavoriteExhibitor = /* GraphQL */ `mutation UpdateApsAppUserFavoriteExhibitor(
  $input: UpdateApsAppUserFavoriteExhibitorInput!
  $condition: ModelApsAppUserFavoriteExhibitorConditionInput
) {
  updateApsAppUserFavoriteExhibitor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserFavoriteExhibitorMutationVariables,
  APITypes.UpdateApsAppUserFavoriteExhibitorMutation
>;
export const deleteApsAppUserFavoriteExhibitor = /* GraphQL */ `mutation DeleteApsAppUserFavoriteExhibitor(
  $input: DeleteApsAppUserFavoriteExhibitorInput!
  $condition: ModelApsAppUserFavoriteExhibitorConditionInput
) {
  deleteApsAppUserFavoriteExhibitor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserFavoriteExhibitorMutationVariables,
  APITypes.DeleteApsAppUserFavoriteExhibitorMutation
>;
export const createApsAppUserFavoriteSpeaker = /* GraphQL */ `mutation CreateApsAppUserFavoriteSpeaker(
  $input: CreateApsAppUserFavoriteSpeakerInput!
  $condition: ModelApsAppUserFavoriteSpeakerConditionInput
) {
  createApsAppUserFavoriteSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserFavoriteSpeakerMutationVariables,
  APITypes.CreateApsAppUserFavoriteSpeakerMutation
>;
export const updateApsAppUserFavoriteSpeaker = /* GraphQL */ `mutation UpdateApsAppUserFavoriteSpeaker(
  $input: UpdateApsAppUserFavoriteSpeakerInput!
  $condition: ModelApsAppUserFavoriteSpeakerConditionInput
) {
  updateApsAppUserFavoriteSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserFavoriteSpeakerMutationVariables,
  APITypes.UpdateApsAppUserFavoriteSpeakerMutation
>;
export const deleteApsAppUserFavoriteSpeaker = /* GraphQL */ `mutation DeleteApsAppUserFavoriteSpeaker(
  $input: DeleteApsAppUserFavoriteSpeakerInput!
  $condition: ModelApsAppUserFavoriteSpeakerConditionInput
) {
  deleteApsAppUserFavoriteSpeaker(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserFavoriteSpeakerMutationVariables,
  APITypes.DeleteApsAppUserFavoriteSpeakerMutation
>;
export const createApsAppUserFavoriteSponsor = /* GraphQL */ `mutation CreateApsAppUserFavoriteSponsor(
  $input: CreateApsAppUserFavoriteSponsorInput!
  $condition: ModelApsAppUserFavoriteSponsorConditionInput
) {
  createApsAppUserFavoriteSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserFavoriteSponsorMutationVariables,
  APITypes.CreateApsAppUserFavoriteSponsorMutation
>;
export const updateApsAppUserFavoriteSponsor = /* GraphQL */ `mutation UpdateApsAppUserFavoriteSponsor(
  $input: UpdateApsAppUserFavoriteSponsorInput!
  $condition: ModelApsAppUserFavoriteSponsorConditionInput
) {
  updateApsAppUserFavoriteSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserFavoriteSponsorMutationVariables,
  APITypes.UpdateApsAppUserFavoriteSponsorMutation
>;
export const deleteApsAppUserFavoriteSponsor = /* GraphQL */ `mutation DeleteApsAppUserFavoriteSponsor(
  $input: DeleteApsAppUserFavoriteSponsorInput!
  $condition: ModelApsAppUserFavoriteSponsorConditionInput
) {
  deleteApsAppUserFavoriteSponsor(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserFavoriteSponsorMutationVariables,
  APITypes.DeleteApsAppUserFavoriteSponsorMutation
>;
export const createApsAppUserFavoriteSession = /* GraphQL */ `mutation CreateApsAppUserFavoriteSession(
  $input: CreateApsAppUserFavoriteSessionInput!
  $condition: ModelApsAppUserFavoriteSessionConditionInput
) {
  createApsAppUserFavoriteSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserFavoriteSessionMutationVariables,
  APITypes.CreateApsAppUserFavoriteSessionMutation
>;
export const updateApsAppUserFavoriteSession = /* GraphQL */ `mutation UpdateApsAppUserFavoriteSession(
  $input: UpdateApsAppUserFavoriteSessionInput!
  $condition: ModelApsAppUserFavoriteSessionConditionInput
) {
  updateApsAppUserFavoriteSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserFavoriteSessionMutationVariables,
  APITypes.UpdateApsAppUserFavoriteSessionMutation
>;
export const deleteApsAppUserFavoriteSession = /* GraphQL */ `mutation DeleteApsAppUserFavoriteSession(
  $input: DeleteApsAppUserFavoriteSessionInput!
  $condition: ModelApsAppUserFavoriteSessionConditionInput
) {
  deleteApsAppUserFavoriteSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserFavoriteSessionMutationVariables,
  APITypes.DeleteApsAppUserFavoriteSessionMutation
>;
export const createApsAppUserFavoriteContact = /* GraphQL */ `mutation CreateApsAppUserFavoriteContact(
  $input: CreateApsAppUserFavoriteContactInput!
  $condition: ModelApsAppUserFavoriteContactConditionInput
) {
  createApsAppUserFavoriteContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppUserFavoriteContactMutationVariables,
  APITypes.CreateApsAppUserFavoriteContactMutation
>;
export const updateApsAppUserFavoriteContact = /* GraphQL */ `mutation UpdateApsAppUserFavoriteContact(
  $input: UpdateApsAppUserFavoriteContactInput!
  $condition: ModelApsAppUserFavoriteContactConditionInput
) {
  updateApsAppUserFavoriteContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserFavoriteContactMutationVariables,
  APITypes.UpdateApsAppUserFavoriteContactMutation
>;
export const deleteApsAppUserFavoriteContact = /* GraphQL */ `mutation DeleteApsAppUserFavoriteContact(
  $input: DeleteApsAppUserFavoriteContactInput!
  $condition: ModelApsAppUserFavoriteContactConditionInput
) {
  deleteApsAppUserFavoriteContact(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppUserFavoriteContactMutationVariables,
  APITypes.DeleteApsAppUserFavoriteContactMutation
>;
export const createApsAppExhibitorPromotion = /* GraphQL */ `mutation CreateApsAppExhibitorPromotion(
  $input: CreateApsAppExhibitorPromotionInput!
  $condition: ModelApsAppExhibitorPromotionConditionInput
) {
  createApsAppExhibitorPromotion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppExhibitorPromotionMutationVariables,
  APITypes.CreateApsAppExhibitorPromotionMutation
>;
export const updateApsAppExhibitorPromotion = /* GraphQL */ `mutation UpdateApsAppExhibitorPromotion(
  $input: UpdateApsAppExhibitorPromotionInput!
  $condition: ModelApsAppExhibitorPromotionConditionInput
) {
  updateApsAppExhibitorPromotion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppExhibitorPromotionMutationVariables,
  APITypes.UpdateApsAppExhibitorPromotionMutation
>;
export const deleteApsAppExhibitorPromotion = /* GraphQL */ `mutation DeleteApsAppExhibitorPromotion(
  $input: DeleteApsAppExhibitorPromotionInput!
  $condition: ModelApsAppExhibitorPromotionConditionInput
) {
  deleteApsAppExhibitorPromotion(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppExhibitorPromotionMutationVariables,
  APITypes.DeleteApsAppExhibitorPromotionMutation
>;
export const createApsAppExhibitorDeal = /* GraphQL */ `mutation CreateApsAppExhibitorDeal(
  $input: CreateApsAppExhibitorDealInput!
  $condition: ModelApsAppExhibitorDealConditionInput
) {
  createApsAppExhibitorDeal(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppExhibitorDealMutationVariables,
  APITypes.CreateApsAppExhibitorDealMutation
>;
export const updateApsAppExhibitorDeal = /* GraphQL */ `mutation UpdateApsAppExhibitorDeal(
  $input: UpdateApsAppExhibitorDealInput!
  $condition: ModelApsAppExhibitorDealConditionInput
) {
  updateApsAppExhibitorDeal(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppExhibitorDealMutationVariables,
  APITypes.UpdateApsAppExhibitorDealMutation
>;
export const deleteApsAppExhibitorDeal = /* GraphQL */ `mutation DeleteApsAppExhibitorDeal(
  $input: DeleteApsAppExhibitorDealInput!
  $condition: ModelApsAppExhibitorDealConditionInput
) {
  deleteApsAppExhibitorDeal(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppExhibitorDealMutationVariables,
  APITypes.DeleteApsAppExhibitorDealMutation
>;
export const createApsAppExhibitorPhoto = /* GraphQL */ `mutation CreateApsAppExhibitorPhoto(
  $input: CreateApsAppExhibitorPhotoInput!
  $condition: ModelApsAppExhibitorPhotoConditionInput
) {
  createApsAppExhibitorPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppExhibitorPhotoMutationVariables,
  APITypes.CreateApsAppExhibitorPhotoMutation
>;
export const updateApsAppExhibitorPhoto = /* GraphQL */ `mutation UpdateApsAppExhibitorPhoto(
  $input: UpdateApsAppExhibitorPhotoInput!
  $condition: ModelApsAppExhibitorPhotoConditionInput
) {
  updateApsAppExhibitorPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppExhibitorPhotoMutationVariables,
  APITypes.UpdateApsAppExhibitorPhotoMutation
>;
export const deleteApsAppExhibitorPhoto = /* GraphQL */ `mutation DeleteApsAppExhibitorPhoto(
  $input: DeleteApsAppExhibitorPhotoInput!
  $condition: ModelApsAppExhibitorPhotoConditionInput
) {
  deleteApsAppExhibitorPhoto(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppExhibitorPhotoMutationVariables,
  APITypes.DeleteApsAppExhibitorPhotoMutation
>;
export const createApsAppExhibitorHandout = /* GraphQL */ `mutation CreateApsAppExhibitorHandout(
  $input: CreateApsAppExhibitorHandoutInput!
  $condition: ModelApsAppExhibitorHandoutConditionInput
) {
  createApsAppExhibitorHandout(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAppExhibitorHandoutMutationVariables,
  APITypes.CreateApsAppExhibitorHandoutMutation
>;
export const updateApsAppExhibitorHandout = /* GraphQL */ `mutation UpdateApsAppExhibitorHandout(
  $input: UpdateApsAppExhibitorHandoutInput!
  $condition: ModelApsAppExhibitorHandoutConditionInput
) {
  updateApsAppExhibitorHandout(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppExhibitorHandoutMutationVariables,
  APITypes.UpdateApsAppExhibitorHandoutMutation
>;
export const deleteApsAppExhibitorHandout = /* GraphQL */ `mutation DeleteApsAppExhibitorHandout(
  $input: DeleteApsAppExhibitorHandoutInput!
  $condition: ModelApsAppExhibitorHandoutConditionInput
) {
  deleteApsAppExhibitorHandout(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAppExhibitorHandoutMutationVariables,
  APITypes.DeleteApsAppExhibitorHandoutMutation
>;
export const createApsAddOn = /* GraphQL */ `mutation CreateApsAddOn(
  $input: CreateApsAddOnInput!
  $condition: ModelApsAddOnConditionInput
) {
  createApsAddOn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAddOnMutationVariables,
  APITypes.CreateApsAddOnMutation
>;
export const updateApsAddOn = /* GraphQL */ `mutation UpdateApsAddOn(
  $input: UpdateApsAddOnInput!
  $condition: ModelApsAddOnConditionInput
) {
  updateApsAddOn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAddOnMutationVariables,
  APITypes.UpdateApsAddOnMutation
>;
export const deleteApsAddOn = /* GraphQL */ `mutation DeleteApsAddOn(
  $input: DeleteApsAddOnInput!
  $condition: ModelApsAddOnConditionInput
) {
  deleteApsAddOn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAddOnMutationVariables,
  APITypes.DeleteApsAddOnMutation
>;
export const updateRegistrantAddOnRequest = /* GraphQL */ `mutation UpdateRegistrantAddOnRequest(
  $input: UpdateRegistrantAddOnRequestInput!
  $condition: ModelRegistrantAddOnRequestConditionInput
) {
  updateRegistrantAddOnRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRegistrantAddOnRequestMutationVariables,
  APITypes.UpdateRegistrantAddOnRequestMutation
>;
export const deleteRegistrantAddOnRequest = /* GraphQL */ `mutation DeleteRegistrantAddOnRequest(
  $input: DeleteRegistrantAddOnRequestInput!
  $condition: ModelRegistrantAddOnRequestConditionInput
) {
  deleteRegistrantAddOnRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRegistrantAddOnRequestMutationVariables,
  APITypes.DeleteRegistrantAddOnRequestMutation
>;
export const createApsSeatingChart = /* GraphQL */ `mutation CreateApsSeatingChart(
  $input: CreateApsSeatingChartInput!
  $condition: ModelApsSeatingChartConditionInput
) {
  createApsSeatingChart(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsSeatingChartMutationVariables,
  APITypes.CreateApsSeatingChartMutation
>;
export const updateApsSeatingChart = /* GraphQL */ `mutation UpdateApsSeatingChart(
  $input: UpdateApsSeatingChartInput!
  $condition: ModelApsSeatingChartConditionInput
) {
  updateApsSeatingChart(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsSeatingChartMutationVariables,
  APITypes.UpdateApsSeatingChartMutation
>;
export const deleteApsSeatingChart = /* GraphQL */ `mutation DeleteApsSeatingChart(
  $input: DeleteApsSeatingChartInput!
  $condition: ModelApsSeatingChartConditionInput
) {
  deleteApsSeatingChart(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsSeatingChartMutationVariables,
  APITypes.DeleteApsSeatingChartMutation
>;
export const createApsSeatingChartRegistrant = /* GraphQL */ `mutation CreateApsSeatingChartRegistrant(
  $input: CreateApsSeatingChartRegistrantInput!
  $condition: ModelApsSeatingChartRegistrantConditionInput
) {
  createApsSeatingChartRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsSeatingChartRegistrantMutationVariables,
  APITypes.CreateApsSeatingChartRegistrantMutation
>;
export const updateApsSeatingChartRegistrant = /* GraphQL */ `mutation UpdateApsSeatingChartRegistrant(
  $input: UpdateApsSeatingChartRegistrantInput!
  $condition: ModelApsSeatingChartRegistrantConditionInput
) {
  updateApsSeatingChartRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsSeatingChartRegistrantMutationVariables,
  APITypes.UpdateApsSeatingChartRegistrantMutation
>;
export const deleteApsSeatingChartRegistrant = /* GraphQL */ `mutation DeleteApsSeatingChartRegistrant(
  $input: DeleteApsSeatingChartRegistrantInput!
  $condition: ModelApsSeatingChartRegistrantConditionInput
) {
  deleteApsSeatingChartRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsSeatingChartRegistrantMutationVariables,
  APITypes.DeleteApsSeatingChartRegistrantMutation
>;
export const createApsContactRequest = /* GraphQL */ `mutation CreateApsContactRequest(
  $input: CreateApsContactRequestInput!
  $condition: ModelApsContactRequestConditionInput
) {
  createApsContactRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsContactRequestMutationVariables,
  APITypes.CreateApsContactRequestMutation
>;
export const updateApsContactRequest = /* GraphQL */ `mutation UpdateApsContactRequest(
  $input: UpdateApsContactRequestInput!
  $condition: ModelApsContactRequestConditionInput
) {
  updateApsContactRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsContactRequestMutationVariables,
  APITypes.UpdateApsContactRequestMutation
>;
export const deleteApsContactRequest = /* GraphQL */ `mutation DeleteApsContactRequest(
  $input: DeleteApsContactRequestInput!
  $condition: ModelApsContactRequestConditionInput
) {
  deleteApsContactRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsContactRequestMutationVariables,
  APITypes.DeleteApsContactRequestMutation
>;
export const createApsDmThread = /* GraphQL */ `mutation CreateApsDmThread(
  $input: CreateApsDmThreadInput!
  $condition: ModelApsDmThreadConditionInput
) {
  createApsDmThread(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsDmThreadMutationVariables,
  APITypes.CreateApsDmThreadMutation
>;
export const updateApsDmThread = /* GraphQL */ `mutation UpdateApsDmThread(
  $input: UpdateApsDmThreadInput!
  $condition: ModelApsDmThreadConditionInput
) {
  updateApsDmThread(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsDmThreadMutationVariables,
  APITypes.UpdateApsDmThreadMutation
>;
export const deleteApsDmThread = /* GraphQL */ `mutation DeleteApsDmThread(
  $input: DeleteApsDmThreadInput!
  $condition: ModelApsDmThreadConditionInput
) {
  deleteApsDmThread(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsDmThreadMutationVariables,
  APITypes.DeleteApsDmThreadMutation
>;
export const createApsDmParticipantState = /* GraphQL */ `mutation CreateApsDmParticipantState(
  $input: CreateApsDmParticipantStateInput!
  $condition: ModelApsDmParticipantStateConditionInput
) {
  createApsDmParticipantState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsDmParticipantStateMutationVariables,
  APITypes.CreateApsDmParticipantStateMutation
>;
export const updateApsDmParticipantState = /* GraphQL */ `mutation UpdateApsDmParticipantState(
  $input: UpdateApsDmParticipantStateInput!
  $condition: ModelApsDmParticipantStateConditionInput
) {
  updateApsDmParticipantState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsDmParticipantStateMutationVariables,
  APITypes.UpdateApsDmParticipantStateMutation
>;
export const deleteApsDmParticipantState = /* GraphQL */ `mutation DeleteApsDmParticipantState(
  $input: DeleteApsDmParticipantStateInput!
  $condition: ModelApsDmParticipantStateConditionInput
) {
  deleteApsDmParticipantState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsDmParticipantStateMutationVariables,
  APITypes.DeleteApsDmParticipantStateMutation
>;
export const createApsDmMessage = /* GraphQL */ `mutation CreateApsDmMessage(
  $input: CreateApsDmMessageInput!
  $condition: ModelApsDmMessageConditionInput
) {
  createApsDmMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsDmMessageMutationVariables,
  APITypes.CreateApsDmMessageMutation
>;
export const updateApsDmMessage = /* GraphQL */ `mutation UpdateApsDmMessage(
  $input: UpdateApsDmMessageInput!
  $condition: ModelApsDmMessageConditionInput
) {
  updateApsDmMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsDmMessageMutationVariables,
  APITypes.UpdateApsDmMessageMutation
>;
export const deleteApsDmMessage = /* GraphQL */ `mutation DeleteApsDmMessage(
  $input: DeleteApsDmMessageInput!
  $condition: ModelApsDmMessageConditionInput
) {
  deleteApsDmMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsDmMessageMutationVariables,
  APITypes.DeleteApsDmMessageMutation
>;
export const createApsAdminAnnouncement = /* GraphQL */ `mutation CreateApsAdminAnnouncement(
  $input: CreateApsAdminAnnouncementInput!
  $condition: ModelApsAdminAnnouncementConditionInput
) {
  createApsAdminAnnouncement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsAdminAnnouncementMutationVariables,
  APITypes.CreateApsAdminAnnouncementMutation
>;
export const updateApsAdminAnnouncement = /* GraphQL */ `mutation UpdateApsAdminAnnouncement(
  $input: UpdateApsAdminAnnouncementInput!
  $condition: ModelApsAdminAnnouncementConditionInput
) {
  updateApsAdminAnnouncement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAdminAnnouncementMutationVariables,
  APITypes.UpdateApsAdminAnnouncementMutation
>;
export const deleteApsAdminAnnouncement = /* GraphQL */ `mutation DeleteApsAdminAnnouncement(
  $input: DeleteApsAdminAnnouncementInput!
  $condition: ModelApsAdminAnnouncementConditionInput
) {
  deleteApsAdminAnnouncement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApsAdminAnnouncementMutationVariables,
  APITypes.DeleteApsAdminAnnouncementMutation
>;
export const createApsUserEngageState = /* GraphQL */ `mutation CreateApsUserEngageState(
  $input: CreateApsUserEngageStateInput!
  $condition: ModelApsUserEngageStateConditionInput
) {
  createApsUserEngageState(input: $input, condition: $condition) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApsUserEngageStateMutationVariables,
  APITypes.CreateApsUserEngageStateMutation
>;
export const updateApsUserEngageState = /* GraphQL */ `mutation UpdateApsUserEngageState(
  $input: UpdateApsUserEngageStateInput!
  $condition: ModelApsUserEngageStateConditionInput
) {
  updateApsUserEngageState(input: $input, condition: $condition) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApsUserEngageStateMutationVariables,
  APITypes.UpdateApsUserEngageStateMutation
>;
export const deleteApsUserEngageState = /* GraphQL */ `mutation DeleteApsUserEngageState(
  $input: DeleteApsUserEngageStateInput!
  $condition: ModelApsUserEngageStateConditionInput
) {
  deleteApsUserEngageState(input: $input, condition: $condition) {
    id
    eventId
    userId
    lastSeenAnnouncementAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApsUserEngageStateMutationVariables,
  APITypes.DeleteApsUserEngageStateMutation
>;
export const createApsPushToken = /* GraphQL */ `mutation CreateApsPushToken(
  $input: CreateApsPushTokenInput!
  $condition: ModelApsPushTokenConditionInput
) {
  createApsPushToken(input: $input, condition: $condition) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApsPushTokenMutationVariables,
  APITypes.CreateApsPushTokenMutation
>;
export const updateApsPushToken = /* GraphQL */ `mutation UpdateApsPushToken(
  $input: UpdateApsPushTokenInput!
  $condition: ModelApsPushTokenConditionInput
) {
  updateApsPushToken(input: $input, condition: $condition) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApsPushTokenMutationVariables,
  APITypes.UpdateApsPushTokenMutation
>;
export const deleteApsPushToken = /* GraphQL */ `mutation DeleteApsPushToken(
  $input: DeleteApsPushTokenInput!
  $condition: ModelApsPushTokenConditionInput
) {
  deleteApsPushToken(input: $input, condition: $condition) {
    id
    userId
    token
    platform
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApsPushTokenMutationVariables,
  APITypes.DeleteApsPushTokenMutation
>;
export const deleteAPSCompanyEvents = /* GraphQL */ `mutation DeleteAPSCompanyEvents(
  $input: DeleteAPSCompanyEventsInput!
  $condition: ModelAPSCompanyEventsConditionInput
) {
  deleteAPSCompanyEvents(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSCompanyEventsMutationVariables,
  APITypes.DeleteAPSCompanyEventsMutation
>;
export const createSessionSpeakers = /* GraphQL */ `mutation CreateSessionSpeakers(
  $input: CreateSessionSpeakersInput!
  $condition: ModelSessionSpeakersConditionInput
) {
  createSessionSpeakers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateSessionSpeakersMutationVariables,
  APITypes.CreateSessionSpeakersMutation
>;
export const updateSessionSpeakers = /* GraphQL */ `mutation UpdateSessionSpeakers(
  $input: UpdateSessionSpeakersInput!
  $condition: ModelSessionSpeakersConditionInput
) {
  updateSessionSpeakers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateSessionSpeakersMutationVariables,
  APITypes.UpdateSessionSpeakersMutation
>;
export const deleteSessionSpeakers = /* GraphQL */ `mutation DeleteSessionSpeakers(
  $input: DeleteSessionSpeakersInput!
  $condition: ModelSessionSpeakersConditionInput
) {
  deleteSessionSpeakers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteSessionSpeakersMutationVariables,
  APITypes.DeleteSessionSpeakersMutation
>;
export const createSessionSponsors = /* GraphQL */ `mutation CreateSessionSponsors(
  $input: CreateSessionSponsorsInput!
  $condition: ModelSessionSponsorsConditionInput
) {
  createSessionSponsors(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateSessionSponsorsMutationVariables,
  APITypes.CreateSessionSponsorsMutation
>;
export const updateSessionSponsors = /* GraphQL */ `mutation UpdateSessionSponsors(
  $input: UpdateSessionSponsorsInput!
  $condition: ModelSessionSponsorsConditionInput
) {
  updateSessionSponsors(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateSessionSponsorsMutationVariables,
  APITypes.UpdateSessionSponsorsMutation
>;
export const deleteSessionSponsors = /* GraphQL */ `mutation DeleteSessionSponsors(
  $input: DeleteSessionSponsorsInput!
  $condition: ModelSessionSponsorsConditionInput
) {
  deleteSessionSponsors(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteSessionSponsorsMutationVariables,
  APITypes.DeleteSessionSponsorsMutation
>;
export const createAPS = /* GraphQL */ `mutation CreateAPS(
  $input: CreateAPSInput!
  $condition: ModelAPSConditionInput
) {
  createAPS(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSMutationVariables,
  APITypes.CreateAPSMutation
>;
export const createAPSBoard = /* GraphQL */ `mutation CreateAPSBoard(
  $input: CreateAPSBoardInput!
  $condition: ModelAPSBoardConditionInput
) {
  createAPSBoard(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSBoardMutationVariables,
  APITypes.CreateAPSBoardMutation
>;
export const updateAPSBoard = /* GraphQL */ `mutation UpdateAPSBoard(
  $input: UpdateAPSBoardInput!
  $condition: ModelAPSBoardConditionInput
) {
  updateAPSBoard(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSBoardMutationVariables,
  APITypes.UpdateAPSBoardMutation
>;
export const deleteAPSBoard = /* GraphQL */ `mutation DeleteAPSBoard(
  $input: DeleteAPSBoardInput!
  $condition: ModelAPSBoardConditionInput
) {
  deleteAPSBoard(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAPSBoardMutationVariables,
  APITypes.DeleteAPSBoardMutation
>;
export const createApsRegistrant = /* GraphQL */ `mutation CreateApsRegistrant(
  $input: CreateApsRegistrantInput!
  $condition: ModelApsRegistrantConditionInput
) {
  createApsRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApsRegistrantMutationVariables,
  APITypes.CreateApsRegistrantMutation
>;
export const updateApsRegistrant = /* GraphQL */ `mutation UpdateApsRegistrant(
  $input: UpdateApsRegistrantInput!
  $condition: ModelApsRegistrantConditionInput
) {
  updateApsRegistrant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsRegistrantMutationVariables,
  APITypes.UpdateApsRegistrantMutation
>;
export const updateApsAppUser = /* GraphQL */ `mutation UpdateApsAppUser(
  $input: UpdateApsAppUserInput!
  $condition: ModelApsAppUserConditionInput
) {
  updateApsAppUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserMutationVariables,
  APITypes.UpdateApsAppUserMutation
>;
export const updateApsAppUserProfile = /* GraphQL */ `mutation UpdateApsAppUserProfile(
  $input: UpdateApsAppUserProfileInput!
  $condition: ModelApsAppUserProfileConditionInput
) {
  updateApsAppUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppUserProfileMutationVariables,
  APITypes.UpdateApsAppUserProfileMutation
>;
export const createAPSCompany = /* GraphQL */ `mutation CreateAPSCompany(
  $input: CreateAPSCompanyInput!
  $condition: ModelAPSCompanyConditionInput
) {
  createAPSCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSCompanyMutationVariables,
  APITypes.CreateAPSCompanyMutation
>;
export const updateAPSCompany = /* GraphQL */ `mutation UpdateAPSCompany(
  $input: UpdateAPSCompanyInput!
  $condition: ModelAPSCompanyConditionInput
) {
  updateAPSCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSCompanyMutationVariables,
  APITypes.UpdateAPSCompanyMutation
>;
export const updateApsAppExhibitorProfile = /* GraphQL */ `mutation UpdateApsAppExhibitorProfile(
  $input: UpdateApsAppExhibitorProfileInput!
  $condition: ModelApsAppExhibitorProfileConditionInput
) {
  updateApsAppExhibitorProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApsAppExhibitorProfileMutationVariables,
  APITypes.UpdateApsAppExhibitorProfileMutation
>;
export const createRegistrantAddOnRequest = /* GraphQL */ `mutation CreateRegistrantAddOnRequest(
  $input: CreateRegistrantAddOnRequestInput!
  $condition: ModelRegistrantAddOnRequestConditionInput
) {
  createRegistrantAddOnRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRegistrantAddOnRequestMutationVariables,
  APITypes.CreateRegistrantAddOnRequestMutation
>;
export const createAPSCompanyEvents = /* GraphQL */ `mutation CreateAPSCompanyEvents(
  $input: CreateAPSCompanyEventsInput!
  $condition: ModelAPSCompanyEventsConditionInput
) {
  createAPSCompanyEvents(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAPSCompanyEventsMutationVariables,
  APITypes.CreateAPSCompanyEventsMutation
>;
export const updateAPSCompanyEvents = /* GraphQL */ `mutation UpdateAPSCompanyEvents(
  $input: UpdateAPSCompanyEventsInput!
  $condition: ModelAPSCompanyEventsConditionInput
) {
  updateAPSCompanyEvents(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAPSCompanyEventsMutationVariables,
  APITypes.UpdateAPSCompanyEventsMutation
>;
