/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAPSInput = {
  id?: string | null,
  year: string,
  codes?: Array< string | null > | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  website?: string | null,
  aPSAgendaId?: string | null,
};

export type ModelAPSConditionInput = {
  year?: ModelStringInput | null,
  codes?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  website?: ModelStringInput | null,
  and?: Array< ModelAPSConditionInput | null > | null,
  or?: Array< ModelAPSConditionInput | null > | null,
  not?: ModelAPSConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSAgendaId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type APS = {
  __typename: "APS",
  id: string,
  year: string,
  codes?: Array< string | null > | null,
  agenda?: ApsAgenda | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  website?: string | null,
  Registrants?: ModelApsRegistrantConnection | null,
  Sponsors?: ModelApsSponsorConnection | null,
  Speakers?: ModelAPSSpeakerConnection | null,
  companies?: ModelAPSCompanyEventsConnection | null,
  photos?: ModelApsAppUserPhotoConnection | null,
  exhibitors?: ModelApsAppExhibitorProfileConnection | null,
  exhibitorPromotions?: ModelApsAppExhibitorPromotionConnection | null,
  exhibitorDeals?: ModelApsAppExhibitorDealConnection | null,
  exhibitorPhotos?: ModelApsAppExhibitorPhotoConnection | null,
  exhibitorHandouts?: ModelApsAppExhibitorHandoutConnection | null,
  addOns?: ModelApsAddOnConnection | null,
  createdAt: string,
  updatedAt: string,
  aPSAgendaId?: string | null,
};

export type ApsAgenda = {
  __typename: "ApsAgenda",
  id: string,
  eventId: string,
  event: APS,
  items?: ModelApsAppSessionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsAppSessionConnection = {
  __typename: "ModelApsAppSessionConnection",
  items:  Array<ApsAppSession | null >,
  nextToken?: string | null,
};

export type ApsAppSession = {
  __typename: "ApsAppSession",
  id: string,
  title?: string | null,
  date?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  location?: string | null,
  description?: string | null,
  agendaId?: string | null,
  agenda?: ApsAgenda | null,
  sessionQuestions?: ModelApsAppSessionQuestionConnection | null,
  notes?: ModelApsAppUserNoteConnection | null,
  speakers?: ModelSessionSpeakersConnection | null,
  sponsors?: ModelSessionSponsorsConnection | null,
  createdAt: string,
  updatedAt: string,
  apsAgendaItemsId?: string | null,
};

export type ModelApsAppSessionQuestionConnection = {
  __typename: "ModelApsAppSessionQuestionConnection",
  items:  Array<ApsAppSessionQuestion | null >,
  nextToken?: string | null,
};

export type ApsAppSessionQuestion = {
  __typename: "ApsAppSessionQuestion",
  id: string,
  sessionId: string,
  session: ApsAppSession,
  question?: string | null,
  userId: string,
  user: ApsAppUser,
  createdAt: string,
  updatedAt: string,
  apsAppUserSessionQuestionsId?: string | null,
};

export type ApsAppUser = {
  __typename: "ApsAppUser",
  id: string,
  registrantId: string,
  registrant: ApsRegistrant,
  photos?: ModelApsAppUserPhotoConnection | null,
  sessionQuestions?: ModelApsAppSessionQuestionConnection | null,
  exhibitorDeals?: ModelApsAppExhibitorDealConnection | null,
  contacts?: ModelApsAppUserContactConnection | null,
  notes?: ModelApsAppUserNoteConnection | null,
  leads?: ModelApsAppUserLeadConnection | null,
  sentDmMessages?: ModelApsDmMessageConnection | null,
  profileId?: string | null,
  profile?: ApsAppUserProfile | null,
  createdAt: string,
  updatedAt: string,
};

export type ApsRegistrant = {
  __typename: "ApsRegistrant",
  id: string,
  apsID: string,
  aps: APS,
  firstName?: string | null,
  lastName?: string | null,
  email: string,
  phone?: string | null,
  companyId?: string | null,
  company?: APSCompany | null,
  jobTitle?: string | null,
  attendeeType: RegistrantType,
  termsAccepted?: boolean | null,
  interests?: Array< string | null > | null,
  otherInterest?: string | null,
  interestQuestionOne?: string | null,
  interestQuestionTwo?: string | null,
  billingAddressFirstName?: string | null,
  billingAddressLastName?: string | null,
  billingAddressEmail?: string | null,
  billingAddressPhone?: string | null,
  billingAddressStreet?: string | null,
  billingAddressCity?: string | null,
  billingAddressState?: string | null,
  billingAddressZip?: string | null,
  sameAsAttendee?: boolean | null,
  speakerTopic?: string | null,
  learningObjectives?: string | null,
  totalAmount?: number | null,
  discountCode?: string | null,
  status: RegistrantStatus,
  paymentConfirmation?: string | null,
  registrationEmailSent?: boolean | null,
  registrationEmailSentDate?: string | null,
  registrationEmailReceived?: boolean | null,
  registrationEmailReceivedDate?: string | null,
  welcomeEmailSent?: boolean | null,
  welcomeEmailSentDate?: string | null,
  welcomeEmailReceived?: boolean | null,
  welcomeEmailReceivedDate?: string | null,
  paymentMethod?: string | null,
  paymentLast4?: string | null,
  approvedAt?: string | null,
  headshot?: string | null,
  presentation?: string | null,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  bio?: string | null,
  seatingChartRegistrant?: ApsSeatingChartRegistrant | null,
  addOnsRequested?: ModelRegistrantAddOnsRequestedConnection | null,
  addOnsApproved?: ModelRegistrantAddOnsApprovedConnection | null,
  appUserId?: string | null,
  appUser?: ApsAppUser | null,
  notes?: ModelApsAppUserNoteConnection | null,
  qrCode?: string | null,
  createdAt: string,
  updatedAt: string,
  aPSRegistrantsId?: string | null,
  aPSCompanyRegistrantsId?: string | null,
  apsRegistrantSeatingChartRegistrantId?: string | null,
};

export type APSCompany = {
  __typename: "APSCompany",
  id: string,
  name: string,
  email: string,
  type?: CompanyType | null,
  description?: string | null,
  website?: string | null,
  phone?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  country?: string | null,
  logo?: string | null,
  events?: ModelAPSCompanyEventsConnection | null,
  registrants?: ModelApsRegistrantConnection | null,
  sponsorId?: string | null,
  sponsor?: ApsSponsor | null,
  exhibitorProfileId?: string | null,
  exhibitorProfile?: ApsAppExhibitorProfile | null,
  notes?: ModelApsAppUserNoteConnection | null,
  contacts?: ModelAPSCompanyContactConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum CompanyType {
  OEMTIER1 = "OEMTIER1",
  SOLUTIONPROVIDER = "SOLUTIONPROVIDER",
  SPONSOR = "SPONSOR",
}


export type ModelAPSCompanyEventsConnection = {
  __typename: "ModelAPSCompanyEventsConnection",
  items:  Array<APSCompanyEvents | null >,
  nextToken?: string | null,
};

export type APSCompanyEvents = {
  __typename: "APSCompanyEvents",
  id: string,
  aPSId: string,
  aPSCompanyId: string,
  aPS: APS,
  aPSCompany: APSCompany,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsRegistrantConnection = {
  __typename: "ModelApsRegistrantConnection",
  items:  Array<ApsRegistrant | null >,
  nextToken?: string | null,
};

export type ApsSponsor = {
  __typename: "ApsSponsor",
  id: string,
  companyId: string,
  company: APSCompany,
  eventId: string,
  event: APS,
  profile?: ApsAppExhibitorProfile | null,
  sessions?: ModelSessionSponsorsConnection | null,
  type?: SponsorType | null,
  createdAt: string,
  updatedAt: string,
  aPSSponsorsId?: string | null,
  apsSponsorProfileId?: string | null,
};

export type ApsAppExhibitorProfile = {
  __typename: "ApsAppExhibitorProfile",
  id: string,
  companyId: string,
  company: APSCompany,
  sponsorId?: string | null,
  sponsor?: ApsSponsor | null,
  eventId: string,
  event: APS,
  deals?: ModelApsAppExhibitorDealConnection | null,
  photos?: ModelApsAppExhibitorPhotoConnection | null,
  handouts?: ModelApsAppExhibitorHandoutConnection | null,
  promotions?: ModelApsAppExhibitorPromotionConnection | null,
  video?: string | null,
  videoCaption?: string | null,
  boothNumber?: string | null,
  visits?: number | null,
  views?: number | null,
  likes?: number | null,
  notes?: ModelApsAppUserNoteConnection | null,
  createdAt: string,
  updatedAt: string,
  aPSExhibitorsId?: string | null,
};

export type ModelApsAppExhibitorDealConnection = {
  __typename: "ModelApsAppExhibitorDealConnection",
  items:  Array<ApsAppExhibitorDeal | null >,
  nextToken?: string | null,
};

export type ApsAppExhibitorDeal = {
  __typename: "ApsAppExhibitorDeal",
  id: string,
  exhibitorId: string,
  exhibitor: ApsAppExhibitorProfile,
  deal?: string | null,
  link?: string | null,
  userId?: string | null,
  user?: ApsAppUser | null,
  eventId: string,
  event: APS,
  createdAt: string,
  updatedAt: string,
  aPSExhibitorDealsId?: string | null,
  apsAppUserExhibitorDealsId?: string | null,
  apsAppExhibitorProfileDealsId?: string | null,
};

export type ModelApsAppExhibitorPhotoConnection = {
  __typename: "ModelApsAppExhibitorPhotoConnection",
  items:  Array<ApsAppExhibitorPhoto | null >,
  nextToken?: string | null,
};

export type ApsAppExhibitorPhoto = {
  __typename: "ApsAppExhibitorPhoto",
  id: string,
  exhibitorId: string,
  exhibitor: ApsAppExhibitorProfile,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId: string,
  event: APS,
  createdAt: string,
  updatedAt: string,
  aPSExhibitorPhotosId?: string | null,
  apsAppExhibitorProfilePhotosId?: string | null,
};

export type ModelApsAppExhibitorHandoutConnection = {
  __typename: "ModelApsAppExhibitorHandoutConnection",
  items:  Array<ApsAppExhibitorHandout | null >,
  nextToken?: string | null,
};

export type ApsAppExhibitorHandout = {
  __typename: "ApsAppExhibitorHandout",
  id: string,
  exhibitorId: string,
  exhibitor: ApsAppExhibitorProfile,
  handout?: string | null,
  eventId: string,
  event: APS,
  createdAt: string,
  updatedAt: string,
  aPSExhibitorHandoutsId?: string | null,
  apsAppExhibitorProfileHandoutsId?: string | null,
};

export type ModelApsAppExhibitorPromotionConnection = {
  __typename: "ModelApsAppExhibitorPromotionConnection",
  items:  Array<ApsAppExhibitorPromotion | null >,
  nextToken?: string | null,
};

export type ApsAppExhibitorPromotion = {
  __typename: "ApsAppExhibitorPromotion",
  id: string,
  exhibitorId: string,
  exhibitor: ApsAppExhibitorProfile,
  promotion?: string | null,
  link?: string | null,
  eventId: string,
  event: APS,
  createdAt: string,
  updatedAt: string,
  aPSExhibitorPromotionsId?: string | null,
  apsAppExhibitorProfilePromotionsId?: string | null,
};

export type ModelApsAppUserNoteConnection = {
  __typename: "ModelApsAppUserNoteConnection",
  items:  Array<ApsAppUserNote | null >,
  nextToken?: string | null,
};

export type ApsAppUserNote = {
  __typename: "ApsAppUserNote",
  id: string,
  owner?: string | null,
  userId: string,
  user: ApsAppUser,
  note?: string | null,
  sessionId?: string | null,
  session?: ApsAppSession | null,
  exhibitorId?: string | null,
  exhibitor?: ApsAppExhibitorProfile | null,
  registrantId?: string | null,
  registrant?: ApsRegistrant | null,
  profileId?: string | null,
  profile?: ApsAppUserProfile | null,
  companyId?: string | null,
  company?: APSCompany | null,
  createdAt: string,
  updatedAt: string,
  apsAppUserNotesId?: string | null,
};

export type ApsAppUserProfile = {
  __typename: "ApsAppUserProfile",
  id: string,
  userId: string,
  user: ApsAppUser,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phone?: string | null,
  company?: string | null,
  jobTitle?: string | null,
  attendeeType?: RegistrantType | null,
  quickTools?: Array< string | null > | null,
  affiliates?: ModelProfileAffiliateConnection | null,
  profilePicture?: string | null,
  bio?: string | null,
  linkedin?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  website?: Array< string | null > | null,
  location?: string | null,
  education?: ModelProfileEducationConnection | null,
  interests?: ModelProfileInterestConnection | null,
  resume?: string | null,
  contacts?: ModelApsAppUserContactConnection | null,
  leads?: ModelApsAppUserLeadConnection | null,
  notes?: ModelApsAppUserNoteConnection | null,
  speakerId?: string | null,
  speaker?: APSSpeaker | null,
  createdAt: string,
  updatedAt: string,
};

export enum RegistrantType {
  OEM = "OEM",
  TIER1 = "TIER1",
  SOLUTIONPROVIDER = "SOLUTIONPROVIDER",
  SPONSOR = "SPONSOR",
  SPEAKER = "SPEAKER",
  STAFF = "STAFF",
  EXHIBITOR = "EXHIBITOR",
}


export type ModelProfileAffiliateConnection = {
  __typename: "ModelProfileAffiliateConnection",
  items:  Array<ProfileAffiliate | null >,
  nextToken?: string | null,
};

export type ProfileAffiliate = {
  __typename: "ProfileAffiliate",
  id: string,
  profileId: string,
  profile: ApsAppUserProfile,
  affiliate?: string | null,
  role?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  createdAt: string,
  updatedAt: string,
  apsAppUserProfileAffiliatesId?: string | null,
};

export type ModelProfileEducationConnection = {
  __typename: "ModelProfileEducationConnection",
  items:  Array<ProfileEducation | null >,
  nextToken?: string | null,
};

export type ProfileEducation = {
  __typename: "ProfileEducation",
  id: string,
  profileId: string,
  profile: ApsAppUserProfile,
  school?: string | null,
  degree?: string | null,
  fieldOfStudy?: string | null,
  createdAt: string,
  updatedAt: string,
  apsAppUserProfileEducationId?: string | null,
};

export type ModelProfileInterestConnection = {
  __typename: "ModelProfileInterestConnection",
  items:  Array<ProfileInterest | null >,
  nextToken?: string | null,
};

export type ProfileInterest = {
  __typename: "ProfileInterest",
  id: string,
  profileId: string,
  profile: ApsAppUserProfile,
  interest?: string | null,
  createdAt: string,
  updatedAt: string,
  apsAppUserProfileInterestsId?: string | null,
};

export type ModelApsAppUserContactConnection = {
  __typename: "ModelApsAppUserContactConnection",
  items:  Array<ApsAppUserContact | null >,
  nextToken?: string | null,
};

export type ApsAppUserContact = {
  __typename: "ApsAppUserContact",
  id: string,
  userId: string,
  user: ApsAppUser,
  favorite?: boolean | null,
  contact: ApsAppUserProfile,
  contactId: string,
  createdAt: string,
  updatedAt: string,
  apsAppUserContactsId?: string | null,
};

export type ModelApsAppUserLeadConnection = {
  __typename: "ModelApsAppUserLeadConnection",
  items:  Array<ApsAppUserLead | null >,
  nextToken?: string | null,
};

export type ApsAppUserLead = {
  __typename: "ApsAppUserLead",
  id: string,
  userId: string,
  user: ApsAppUser,
  favorite?: boolean | null,
  contact: ApsAppUserProfile,
  contactId: string,
  createdAt: string,
  updatedAt: string,
  apsAppUserLeadsId?: string | null,
};

export type APSSpeaker = {
  __typename: "APSSpeaker",
  id: string,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  profileId: string,
  profile: ApsAppUserProfile,
  eventId: string,
  event: APS,
  sessions?: ModelSessionSpeakersConnection | null,
  createdAt: string,
  updatedAt: string,
  aPSSpeakersId?: string | null,
};

export type ModelSessionSpeakersConnection = {
  __typename: "ModelSessionSpeakersConnection",
  items:  Array<SessionSpeakers | null >,
  nextToken?: string | null,
};

export type SessionSpeakers = {
  __typename: "SessionSpeakers",
  id: string,
  apsAppSessionId: string,
  aPSSpeakerId: string,
  apsAppSession: ApsAppSession,
  aPSSpeaker: APSSpeaker,
  createdAt: string,
  updatedAt: string,
};

export type ModelSessionSponsorsConnection = {
  __typename: "ModelSessionSponsorsConnection",
  items:  Array<SessionSponsors | null >,
  nextToken?: string | null,
};

export type SessionSponsors = {
  __typename: "SessionSponsors",
  id: string,
  apsAppSessionId: string,
  apsSponsorId: string,
  apsAppSession: ApsAppSession,
  apsSponsor: ApsSponsor,
  createdAt: string,
  updatedAt: string,
};

export enum SponsorType {
  BOOTH = "BOOTH",
  TABLE = "TABLE",
  NONE = "NONE",
}


export type ModelAPSCompanyContactConnection = {
  __typename: "ModelAPSCompanyContactConnection",
  items:  Array<APSCompanyContact | null >,
  nextToken?: string | null,
};

export type APSCompanyContact = {
  __typename: "APSCompanyContact",
  id: string,
  companyId: string,
  company: APSCompany,
  name?: string | null,
  email: string,
  phone?: string | null,
  title?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum RegistrantStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}


export type ApsSeatingChartRegistrant = {
  __typename: "ApsSeatingChartRegistrant",
  id: string,
  category?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  company?: string | null,
  email?: string | null,
  role?: string | null,
  tableNumber?: number | null,
  notes?: string | null,
  seatingChartID: string,
  seatingChart: ApsSeatingChart,
  registrantID: string,
  registrant: ApsRegistrant,
  createdAt: string,
  updatedAt: string,
  apsSeatingChartRegistrantsId?: string | null,
};

export type ApsSeatingChart = {
  __typename: "ApsSeatingChart",
  id: string,
  registrants?: ModelApsSeatingChartRegistrantConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsSeatingChartRegistrantConnection = {
  __typename: "ModelApsSeatingChartRegistrantConnection",
  items:  Array<ApsSeatingChartRegistrant | null >,
  nextToken?: string | null,
};

export type ModelRegistrantAddOnsRequestedConnection = {
  __typename: "ModelRegistrantAddOnsRequestedConnection",
  items:  Array<RegistrantAddOnsRequested | null >,
  nextToken?: string | null,
};

export type RegistrantAddOnsRequested = {
  __typename: "RegistrantAddOnsRequested",
  id: string,
  apsRegistrantId: string,
  apsAddOnId: string,
  apsRegistrant: ApsRegistrant,
  apsAddOn: ApsAddOn,
  createdAt: string,
  updatedAt: string,
};

export type ApsAddOn = {
  __typename: "ApsAddOn",
  id: string,
  title: string,
  description: string,
  subheadline?: string | null,
  location: string,
  date: string,
  time: string,
  company: string,
  altLink?: string | null,
  type?: string | null,
  limit?: number | null,
  eventId: string,
  event: APS,
  price?: number | null,
  registrantsRequested?: ModelRegistrantAddOnsRequestedConnection | null,
  registrantsApproved?: ModelRegistrantAddOnsApprovedConnection | null,
  createdAt: string,
  updatedAt: string,
  aPSAddOnsId?: string | null,
};

export type ModelRegistrantAddOnsApprovedConnection = {
  __typename: "ModelRegistrantAddOnsApprovedConnection",
  items:  Array<RegistrantAddOnsApproved | null >,
  nextToken?: string | null,
};

export type RegistrantAddOnsApproved = {
  __typename: "RegistrantAddOnsApproved",
  id: string,
  apsRegistrantId: string,
  apsAddOnId: string,
  apsRegistrant: ApsRegistrant,
  apsAddOn: ApsAddOn,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsAppUserPhotoConnection = {
  __typename: "ModelApsAppUserPhotoConnection",
  items:  Array<ApsAppUserPhoto | null >,
  nextToken?: string | null,
};

export type ApsAppUserPhoto = {
  __typename: "ApsAppUserPhoto",
  id: string,
  userId?: string | null,
  user?: ApsAppUser | null,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId: string,
  event: APS,
  createdAt: string,
  updatedAt: string,
  aPSPhotosId?: string | null,
  apsAppUserPhotosId?: string | null,
};

export type ModelApsDmMessageConnection = {
  __typename: "ModelApsDmMessageConnection",
  items:  Array<ApsDmMessage | null >,
  nextToken?: string | null,
};

export type ApsDmMessage = {
  __typename: "ApsDmMessage",
  id: string,
  eventId: string,
  threadId: string,
  thread: ApsDmThread,
  senderUserId: string,
  sender: ApsAppUser,
  owners: Array< string >,
  type?: string | null,
  body?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ApsDmThread = {
  __typename: "ApsDmThread",
  id: string,
  eventId: string,
  dmKey: string,
  userAId: string,
  userBId: string,
  owners: Array< string >,
  participantStates?: ModelApsDmParticipantStateConnection | null,
  messages?: ModelApsDmMessageConnection | null,
  lastMessageAt?: string | null,
  lastMessagePreview?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsDmParticipantStateConnection = {
  __typename: "ModelApsDmParticipantStateConnection",
  items:  Array<ApsDmParticipantState | null >,
  nextToken?: string | null,
};

export type ApsDmParticipantState = {
  __typename: "ApsDmParticipantState",
  id: string,
  eventId: string,
  threadId: string,
  thread: ApsDmThread,
  userId: string,
  lastReadAt?: string | null,
  unreadCount?: number | null,
  lastMessageAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelApsSponsorConnection = {
  __typename: "ModelApsSponsorConnection",
  items:  Array<ApsSponsor | null >,
  nextToken?: string | null,
};

export type ModelAPSSpeakerConnection = {
  __typename: "ModelAPSSpeakerConnection",
  items:  Array<APSSpeaker | null >,
  nextToken?: string | null,
};

export type ModelApsAppExhibitorProfileConnection = {
  __typename: "ModelApsAppExhibitorProfileConnection",
  items:  Array<ApsAppExhibitorProfile | null >,
  nextToken?: string | null,
};

export type ModelApsAddOnConnection = {
  __typename: "ModelApsAddOnConnection",
  items:  Array<ApsAddOn | null >,
  nextToken?: string | null,
};

export type UpdateAPSInput = {
  id: string,
  year?: string | null,
  codes?: Array< string | null > | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  website?: string | null,
  aPSAgendaId?: string | null,
};

export type DeleteAPSInput = {
  id: string,
};

export type CreateAPSBoardInput = {
  id?: string | null,
  name: string,
  title?: string | null,
  bio?: string | null,
  company: string,
  email: string,
  linkedin?: string | null,
  profilePic?: string | null,
};

export type ModelAPSBoardConditionInput = {
  name?: ModelStringInput | null,
  title?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  and?: Array< ModelAPSBoardConditionInput | null > | null,
  or?: Array< ModelAPSBoardConditionInput | null > | null,
  not?: ModelAPSBoardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type APSBoard = {
  __typename: "APSBoard",
  id: string,
  name: string,
  title?: string | null,
  bio?: string | null,
  company: string,
  email: string,
  linkedin?: string | null,
  profilePic?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAPSBoardInput = {
  id: string,
  name?: string | null,
  title?: string | null,
  bio?: string | null,
  company?: string | null,
  email?: string | null,
  linkedin?: string | null,
  profilePic?: string | null,
};

export type DeleteAPSBoardInput = {
  id: string,
};

export type CreateApsAgendaInput = {
  id?: string | null,
  eventId: string,
};

export type ModelApsAgendaConditionInput = {
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAgendaConditionInput | null > | null,
  or?: Array< ModelApsAgendaConditionInput | null > | null,
  not?: ModelApsAgendaConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateApsAgendaInput = {
  id: string,
  eventId?: string | null,
};

export type DeleteApsAgendaInput = {
  id: string,
};

export type CreateApsRegistrantInput = {
  id?: string | null,
  apsID: string,
  firstName?: string | null,
  lastName?: string | null,
  email: string,
  phone?: string | null,
  companyId?: string | null,
  jobTitle?: string | null,
  attendeeType: RegistrantType,
  termsAccepted?: boolean | null,
  interests?: Array< string | null > | null,
  otherInterest?: string | null,
  interestQuestionOne?: string | null,
  interestQuestionTwo?: string | null,
  billingAddressFirstName?: string | null,
  billingAddressLastName?: string | null,
  billingAddressEmail?: string | null,
  billingAddressPhone?: string | null,
  billingAddressStreet?: string | null,
  billingAddressCity?: string | null,
  billingAddressState?: string | null,
  billingAddressZip?: string | null,
  sameAsAttendee?: boolean | null,
  speakerTopic?: string | null,
  learningObjectives?: string | null,
  totalAmount?: number | null,
  discountCode?: string | null,
  status: RegistrantStatus,
  paymentConfirmation?: string | null,
  registrationEmailSent?: boolean | null,
  registrationEmailSentDate?: string | null,
  registrationEmailReceived?: boolean | null,
  registrationEmailReceivedDate?: string | null,
  welcomeEmailSent?: boolean | null,
  welcomeEmailSentDate?: string | null,
  welcomeEmailReceived?: boolean | null,
  welcomeEmailReceivedDate?: string | null,
  paymentMethod?: string | null,
  paymentLast4?: string | null,
  approvedAt?: string | null,
  headshot?: string | null,
  presentation?: string | null,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  bio?: string | null,
  appUserId?: string | null,
  qrCode?: string | null,
  aPSRegistrantsId?: string | null,
  aPSCompanyRegistrantsId?: string | null,
  apsRegistrantSeatingChartRegistrantId?: string | null,
};

export type ModelApsRegistrantConditionInput = {
  apsID?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  companyId?: ModelIDInput | null,
  jobTitle?: ModelStringInput | null,
  attendeeType?: ModelRegistrantTypeInput | null,
  termsAccepted?: ModelBooleanInput | null,
  interests?: ModelStringInput | null,
  otherInterest?: ModelStringInput | null,
  interestQuestionOne?: ModelStringInput | null,
  interestQuestionTwo?: ModelStringInput | null,
  billingAddressFirstName?: ModelStringInput | null,
  billingAddressLastName?: ModelStringInput | null,
  billingAddressEmail?: ModelStringInput | null,
  billingAddressPhone?: ModelStringInput | null,
  billingAddressStreet?: ModelStringInput | null,
  billingAddressCity?: ModelStringInput | null,
  billingAddressState?: ModelStringInput | null,
  billingAddressZip?: ModelStringInput | null,
  sameAsAttendee?: ModelBooleanInput | null,
  speakerTopic?: ModelStringInput | null,
  learningObjectives?: ModelStringInput | null,
  totalAmount?: ModelIntInput | null,
  discountCode?: ModelStringInput | null,
  status?: ModelRegistrantStatusInput | null,
  paymentConfirmation?: ModelStringInput | null,
  registrationEmailSent?: ModelBooleanInput | null,
  registrationEmailSentDate?: ModelStringInput | null,
  registrationEmailReceived?: ModelBooleanInput | null,
  registrationEmailReceivedDate?: ModelStringInput | null,
  welcomeEmailSent?: ModelBooleanInput | null,
  welcomeEmailSentDate?: ModelStringInput | null,
  welcomeEmailReceived?: ModelBooleanInput | null,
  welcomeEmailReceivedDate?: ModelStringInput | null,
  paymentMethod?: ModelStringInput | null,
  paymentLast4?: ModelStringInput | null,
  approvedAt?: ModelStringInput | null,
  headshot?: ModelStringInput | null,
  presentation?: ModelStringInput | null,
  presentationTitle?: ModelStringInput | null,
  presentationSummary?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  appUserId?: ModelIDInput | null,
  qrCode?: ModelStringInput | null,
  and?: Array< ModelApsRegistrantConditionInput | null > | null,
  or?: Array< ModelApsRegistrantConditionInput | null > | null,
  not?: ModelApsRegistrantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSRegistrantsId?: ModelIDInput | null,
  aPSCompanyRegistrantsId?: ModelIDInput | null,
  apsRegistrantSeatingChartRegistrantId?: ModelIDInput | null,
};

export type ModelRegistrantTypeInput = {
  eq?: RegistrantType | null,
  ne?: RegistrantType | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelRegistrantStatusInput = {
  eq?: RegistrantStatus | null,
  ne?: RegistrantStatus | null,
};

export type UpdateApsRegistrantInput = {
  id: string,
  apsID?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phone?: string | null,
  companyId?: string | null,
  jobTitle?: string | null,
  attendeeType?: RegistrantType | null,
  termsAccepted?: boolean | null,
  interests?: Array< string | null > | null,
  otherInterest?: string | null,
  interestQuestionOne?: string | null,
  interestQuestionTwo?: string | null,
  billingAddressFirstName?: string | null,
  billingAddressLastName?: string | null,
  billingAddressEmail?: string | null,
  billingAddressPhone?: string | null,
  billingAddressStreet?: string | null,
  billingAddressCity?: string | null,
  billingAddressState?: string | null,
  billingAddressZip?: string | null,
  sameAsAttendee?: boolean | null,
  speakerTopic?: string | null,
  learningObjectives?: string | null,
  totalAmount?: number | null,
  discountCode?: string | null,
  status?: RegistrantStatus | null,
  paymentConfirmation?: string | null,
  registrationEmailSent?: boolean | null,
  registrationEmailSentDate?: string | null,
  registrationEmailReceived?: boolean | null,
  registrationEmailReceivedDate?: string | null,
  welcomeEmailSent?: boolean | null,
  welcomeEmailSentDate?: string | null,
  welcomeEmailReceived?: boolean | null,
  welcomeEmailReceivedDate?: string | null,
  paymentMethod?: string | null,
  paymentLast4?: string | null,
  approvedAt?: string | null,
  headshot?: string | null,
  presentation?: string | null,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  bio?: string | null,
  appUserId?: string | null,
  qrCode?: string | null,
  aPSRegistrantsId?: string | null,
  aPSCompanyRegistrantsId?: string | null,
  apsRegistrantSeatingChartRegistrantId?: string | null,
};

export type DeleteApsRegistrantInput = {
  id: string,
};

export type CreateApsTempCredentialInput = {
  id?: string | null,
  apsID: string,
  registrantId: string,
  email: string,
  tempPasswordCiphertext: string,
  tempPasswordIv: string,
  tempPasswordTag: string,
  expiresAt?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsTempCredentialConditionInput = {
  apsID?: ModelIDInput | null,
  registrantId?: ModelIDInput | null,
  email?: ModelStringInput | null,
  tempPasswordCiphertext?: ModelStringInput | null,
  tempPasswordIv?: ModelStringInput | null,
  tempPasswordTag?: ModelStringInput | null,
  expiresAt?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsTempCredentialConditionInput | null > | null,
  or?: Array< ModelApsTempCredentialConditionInput | null > | null,
  not?: ModelApsTempCredentialConditionInput | null,
};

export type ApsTempCredential = {
  __typename: "ApsTempCredential",
  id: string,
  apsID: string,
  registrantId: string,
  email: string,
  tempPasswordCiphertext: string,
  tempPasswordIv: string,
  tempPasswordTag: string,
  expiresAt?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateApsTempCredentialInput = {
  id: string,
  apsID?: string | null,
  registrantId?: string | null,
  email?: string | null,
  tempPasswordCiphertext?: string | null,
  tempPasswordIv?: string | null,
  tempPasswordTag?: string | null,
  expiresAt?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsTempCredentialInput = {
  id: string,
};

export type CreateApsAppUserInput = {
  id?: string | null,
  registrantId: string,
  profileId?: string | null,
};

export type ModelApsAppUserConditionInput = {
  registrantId?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserConditionInput | null > | null,
  or?: Array< ModelApsAppUserConditionInput | null > | null,
  not?: ModelApsAppUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateApsAppUserInput = {
  id: string,
  registrantId?: string | null,
  profileId?: string | null,
};

export type DeleteApsAppUserInput = {
  id: string,
};

export type CreateApsAppUserContactInput = {
  id?: string | null,
  userId: string,
  favorite?: boolean | null,
  contactId: string,
  apsAppUserContactsId?: string | null,
};

export type ModelApsAppUserContactConditionInput = {
  userId?: ModelIDInput | null,
  favorite?: ModelBooleanInput | null,
  contactId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserContactConditionInput | null > | null,
  or?: Array< ModelApsAppUserContactConditionInput | null > | null,
  not?: ModelApsAppUserContactConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserContactsId?: ModelIDInput | null,
};

export type UpdateApsAppUserContactInput = {
  id: string,
  userId?: string | null,
  favorite?: boolean | null,
  contactId?: string | null,
  apsAppUserContactsId?: string | null,
};

export type DeleteApsAppUserContactInput = {
  id: string,
};

export type CreateApsAppUserNoteInput = {
  id?: string | null,
  owner?: string | null,
  userId: string,
  note?: string | null,
  sessionId?: string | null,
  exhibitorId?: string | null,
  registrantId?: string | null,
  profileId?: string | null,
  companyId?: string | null,
  apsAppUserNotesId?: string | null,
};

export type ModelApsAppUserNoteConditionInput = {
  owner?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  note?: ModelStringInput | null,
  sessionId?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  registrantId?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserNoteConditionInput | null > | null,
  or?: Array< ModelApsAppUserNoteConditionInput | null > | null,
  not?: ModelApsAppUserNoteConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserNotesId?: ModelIDInput | null,
};

export type UpdateApsAppUserNoteInput = {
  id: string,
  owner?: string | null,
  userId?: string | null,
  note?: string | null,
  sessionId?: string | null,
  exhibitorId?: string | null,
  registrantId?: string | null,
  profileId?: string | null,
  companyId?: string | null,
  apsAppUserNotesId?: string | null,
};

export type DeleteApsAppUserNoteInput = {
  id: string,
};

export type CreateApsAppUserLeadInput = {
  id?: string | null,
  userId: string,
  favorite?: boolean | null,
  contactId: string,
  apsAppUserLeadsId?: string | null,
};

export type ModelApsAppUserLeadConditionInput = {
  userId?: ModelIDInput | null,
  favorite?: ModelBooleanInput | null,
  contactId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserLeadConditionInput | null > | null,
  or?: Array< ModelApsAppUserLeadConditionInput | null > | null,
  not?: ModelApsAppUserLeadConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserLeadsId?: ModelIDInput | null,
};

export type UpdateApsAppUserLeadInput = {
  id: string,
  userId?: string | null,
  favorite?: boolean | null,
  contactId?: string | null,
  apsAppUserLeadsId?: string | null,
};

export type DeleteApsAppUserLeadInput = {
  id: string,
};

export type CreateApsAppUserProfileInput = {
  id?: string | null,
  userId: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phone?: string | null,
  company?: string | null,
  jobTitle?: string | null,
  attendeeType?: RegistrantType | null,
  quickTools?: Array< string | null > | null,
  profilePicture?: string | null,
  bio?: string | null,
  linkedin?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  website?: Array< string | null > | null,
  location?: string | null,
  resume?: string | null,
  speakerId?: string | null,
};

export type ModelApsAppUserProfileConditionInput = {
  userId?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  company?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  attendeeType?: ModelRegistrantTypeInput | null,
  quickTools?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  facebook?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  youtube?: ModelStringInput | null,
  website?: ModelStringInput | null,
  location?: ModelStringInput | null,
  resume?: ModelStringInput | null,
  speakerId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserProfileConditionInput | null > | null,
  or?: Array< ModelApsAppUserProfileConditionInput | null > | null,
  not?: ModelApsAppUserProfileConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateApsAppUserProfileInput = {
  id: string,
  userId?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phone?: string | null,
  company?: string | null,
  jobTitle?: string | null,
  attendeeType?: RegistrantType | null,
  quickTools?: Array< string | null > | null,
  profilePicture?: string | null,
  bio?: string | null,
  linkedin?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  website?: Array< string | null > | null,
  location?: string | null,
  resume?: string | null,
  speakerId?: string | null,
};

export type DeleteApsAppUserProfileInput = {
  id: string,
};

export type CreateProfileAffiliateInput = {
  id?: string | null,
  profileId: string,
  affiliate?: string | null,
  role?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  apsAppUserProfileAffiliatesId?: string | null,
};

export type ModelProfileAffiliateConditionInput = {
  profileId?: ModelIDInput | null,
  affiliate?: ModelStringInput | null,
  role?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelProfileAffiliateConditionInput | null > | null,
  or?: Array< ModelProfileAffiliateConditionInput | null > | null,
  not?: ModelProfileAffiliateConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserProfileAffiliatesId?: ModelIDInput | null,
};

export type UpdateProfileAffiliateInput = {
  id: string,
  profileId?: string | null,
  affiliate?: string | null,
  role?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  apsAppUserProfileAffiliatesId?: string | null,
};

export type DeleteProfileAffiliateInput = {
  id: string,
};

export type CreateProfileEducationInput = {
  id?: string | null,
  profileId: string,
  school?: string | null,
  degree?: string | null,
  fieldOfStudy?: string | null,
  apsAppUserProfileEducationId?: string | null,
};

export type ModelProfileEducationConditionInput = {
  profileId?: ModelIDInput | null,
  school?: ModelStringInput | null,
  degree?: ModelStringInput | null,
  fieldOfStudy?: ModelStringInput | null,
  and?: Array< ModelProfileEducationConditionInput | null > | null,
  or?: Array< ModelProfileEducationConditionInput | null > | null,
  not?: ModelProfileEducationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserProfileEducationId?: ModelIDInput | null,
};

export type UpdateProfileEducationInput = {
  id: string,
  profileId?: string | null,
  school?: string | null,
  degree?: string | null,
  fieldOfStudy?: string | null,
  apsAppUserProfileEducationId?: string | null,
};

export type DeleteProfileEducationInput = {
  id: string,
};

export type CreateProfileInterestInput = {
  id?: string | null,
  profileId: string,
  interest?: string | null,
  apsAppUserProfileInterestsId?: string | null,
};

export type ModelProfileInterestConditionInput = {
  profileId?: ModelIDInput | null,
  interest?: ModelStringInput | null,
  and?: Array< ModelProfileInterestConditionInput | null > | null,
  or?: Array< ModelProfileInterestConditionInput | null > | null,
  not?: ModelProfileInterestConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserProfileInterestsId?: ModelIDInput | null,
};

export type UpdateProfileInterestInput = {
  id: string,
  profileId?: string | null,
  interest?: string | null,
  apsAppUserProfileInterestsId?: string | null,
};

export type DeleteProfileInterestInput = {
  id: string,
};

export type CreateApsAppUserPhotoInput = {
  id?: string | null,
  userId?: string | null,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId: string,
  aPSPhotosId?: string | null,
  apsAppUserPhotosId?: string | null,
};

export type ModelApsAppUserPhotoConditionInput = {
  userId?: ModelIDInput | null,
  photo?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  approved?: ModelBooleanInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAppUserPhotoConditionInput | null > | null,
  or?: Array< ModelApsAppUserPhotoConditionInput | null > | null,
  not?: ModelApsAppUserPhotoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSPhotosId?: ModelIDInput | null,
  apsAppUserPhotosId?: ModelIDInput | null,
};

export type UpdateApsAppUserPhotoInput = {
  id: string,
  userId?: string | null,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId?: string | null,
  aPSPhotosId?: string | null,
  apsAppUserPhotosId?: string | null,
};

export type DeleteApsAppUserPhotoInput = {
  id: string,
};

export type CreateApsAppSessionInput = {
  id?: string | null,
  title?: string | null,
  date?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  location?: string | null,
  description?: string | null,
  agendaId?: string | null,
  apsAgendaItemsId?: string | null,
};

export type ModelApsAppSessionConditionInput = {
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  location?: ModelStringInput | null,
  description?: ModelStringInput | null,
  agendaId?: ModelIDInput | null,
  and?: Array< ModelApsAppSessionConditionInput | null > | null,
  or?: Array< ModelApsAppSessionConditionInput | null > | null,
  not?: ModelApsAppSessionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAgendaItemsId?: ModelIDInput | null,
};

export type UpdateApsAppSessionInput = {
  id: string,
  title?: string | null,
  date?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  location?: string | null,
  description?: string | null,
  agendaId?: string | null,
  apsAgendaItemsId?: string | null,
};

export type DeleteApsAppSessionInput = {
  id: string,
};

export type CreateApsAppSessionQuestionInput = {
  id?: string | null,
  sessionId: string,
  question?: string | null,
  userId: string,
  apsAppUserSessionQuestionsId?: string | null,
};

export type ModelApsAppSessionQuestionConditionInput = {
  sessionId?: ModelIDInput | null,
  question?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelApsAppSessionQuestionConditionInput | null > | null,
  or?: Array< ModelApsAppSessionQuestionConditionInput | null > | null,
  not?: ModelApsAppSessionQuestionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsAppUserSessionQuestionsId?: ModelIDInput | null,
};

export type UpdateApsAppSessionQuestionInput = {
  id: string,
  sessionId?: string | null,
  question?: string | null,
  userId?: string | null,
  apsAppUserSessionQuestionsId?: string | null,
};

export type DeleteApsAppSessionQuestionInput = {
  id: string,
};

export type CreateAPSSpeakerInput = {
  id?: string | null,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  profileId: string,
  eventId: string,
  aPSSpeakersId?: string | null,
};

export type ModelAPSSpeakerConditionInput = {
  presentationTitle?: ModelStringInput | null,
  presentationSummary?: ModelStringInput | null,
  profileId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelAPSSpeakerConditionInput | null > | null,
  or?: Array< ModelAPSSpeakerConditionInput | null > | null,
  not?: ModelAPSSpeakerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSSpeakersId?: ModelIDInput | null,
};

export type UpdateAPSSpeakerInput = {
  id: string,
  presentationTitle?: string | null,
  presentationSummary?: string | null,
  profileId?: string | null,
  eventId?: string | null,
  aPSSpeakersId?: string | null,
};

export type DeleteAPSSpeakerInput = {
  id: string,
};

export type CreateApsSponsorInput = {
  id?: string | null,
  companyId: string,
  eventId: string,
  type?: SponsorType | null,
  aPSSponsorsId?: string | null,
  apsSponsorProfileId?: string | null,
};

export type ModelApsSponsorConditionInput = {
  companyId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  type?: ModelSponsorTypeInput | null,
  and?: Array< ModelApsSponsorConditionInput | null > | null,
  or?: Array< ModelApsSponsorConditionInput | null > | null,
  not?: ModelApsSponsorConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSSponsorsId?: ModelIDInput | null,
  apsSponsorProfileId?: ModelIDInput | null,
};

export type ModelSponsorTypeInput = {
  eq?: SponsorType | null,
  ne?: SponsorType | null,
};

export type UpdateApsSponsorInput = {
  id: string,
  companyId?: string | null,
  eventId?: string | null,
  type?: SponsorType | null,
  aPSSponsorsId?: string | null,
  apsSponsorProfileId?: string | null,
};

export type DeleteApsSponsorInput = {
  id: string,
};

export type CreateAPSCompanyInput = {
  id?: string | null,
  name: string,
  email: string,
  type?: CompanyType | null,
  description?: string | null,
  website?: string | null,
  phone?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  country?: string | null,
  logo?: string | null,
  sponsorId?: string | null,
  exhibitorProfileId?: string | null,
};

export type ModelAPSCompanyConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  type?: ModelCompanyTypeInput | null,
  description?: ModelStringInput | null,
  website?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  sponsorId?: ModelIDInput | null,
  exhibitorProfileId?: ModelIDInput | null,
  and?: Array< ModelAPSCompanyConditionInput | null > | null,
  or?: Array< ModelAPSCompanyConditionInput | null > | null,
  not?: ModelAPSCompanyConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCompanyTypeInput = {
  eq?: CompanyType | null,
  ne?: CompanyType | null,
};

export type UpdateAPSCompanyInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  type?: CompanyType | null,
  description?: string | null,
  website?: string | null,
  phone?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  country?: string | null,
  logo?: string | null,
  sponsorId?: string | null,
  exhibitorProfileId?: string | null,
};

export type DeleteAPSCompanyInput = {
  id: string,
};

export type CreateAPSCompanyContactInput = {
  id?: string | null,
  companyId: string,
  name?: string | null,
  email: string,
  phone?: string | null,
  title?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelAPSCompanyContactConditionInput = {
  companyId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  title?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSCompanyContactConditionInput | null > | null,
  or?: Array< ModelAPSCompanyContactConditionInput | null > | null,
  not?: ModelAPSCompanyContactConditionInput | null,
};

export type UpdateAPSCompanyContactInput = {
  id: string,
  companyId?: string | null,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  title?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteAPSCompanyContactInput = {
  id: string,
};

export type CreateApsAppExhibitorProfileInput = {
  id?: string | null,
  companyId: string,
  sponsorId?: string | null,
  eventId: string,
  video?: string | null,
  videoCaption?: string | null,
  boothNumber?: string | null,
  visits?: number | null,
  views?: number | null,
  likes?: number | null,
  aPSExhibitorsId?: string | null,
};

export type ModelApsAppExhibitorProfileConditionInput = {
  companyId?: ModelIDInput | null,
  sponsorId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  video?: ModelStringInput | null,
  videoCaption?: ModelStringInput | null,
  boothNumber?: ModelStringInput | null,
  visits?: ModelIntInput | null,
  views?: ModelIntInput | null,
  likes?: ModelIntInput | null,
  and?: Array< ModelApsAppExhibitorProfileConditionInput | null > | null,
  or?: Array< ModelApsAppExhibitorProfileConditionInput | null > | null,
  not?: ModelApsAppExhibitorProfileConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSExhibitorsId?: ModelIDInput | null,
};

export type UpdateApsAppExhibitorProfileInput = {
  id: string,
  companyId?: string | null,
  sponsorId?: string | null,
  eventId?: string | null,
  video?: string | null,
  videoCaption?: string | null,
  boothNumber?: string | null,
  visits?: number | null,
  views?: number | null,
  likes?: number | null,
  aPSExhibitorsId?: string | null,
};

export type DeleteApsAppExhibitorProfileInput = {
  id: string,
};

export type CreateApsAppExhibitorPromotionInput = {
  id?: string | null,
  exhibitorId: string,
  promotion?: string | null,
  link?: string | null,
  eventId: string,
  aPSExhibitorPromotionsId?: string | null,
  apsAppExhibitorProfilePromotionsId?: string | null,
};

export type ModelApsAppExhibitorPromotionConditionInput = {
  exhibitorId?: ModelIDInput | null,
  promotion?: ModelStringInput | null,
  link?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAppExhibitorPromotionConditionInput | null > | null,
  or?: Array< ModelApsAppExhibitorPromotionConditionInput | null > | null,
  not?: ModelApsAppExhibitorPromotionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSExhibitorPromotionsId?: ModelIDInput | null,
  apsAppExhibitorProfilePromotionsId?: ModelIDInput | null,
};

export type UpdateApsAppExhibitorPromotionInput = {
  id: string,
  exhibitorId?: string | null,
  promotion?: string | null,
  link?: string | null,
  eventId?: string | null,
  aPSExhibitorPromotionsId?: string | null,
  apsAppExhibitorProfilePromotionsId?: string | null,
};

export type DeleteApsAppExhibitorPromotionInput = {
  id: string,
};

export type CreateApsAppExhibitorDealInput = {
  id?: string | null,
  exhibitorId: string,
  deal?: string | null,
  link?: string | null,
  userId?: string | null,
  eventId: string,
  aPSExhibitorDealsId?: string | null,
  apsAppUserExhibitorDealsId?: string | null,
  apsAppExhibitorProfileDealsId?: string | null,
};

export type ModelApsAppExhibitorDealConditionInput = {
  exhibitorId?: ModelIDInput | null,
  deal?: ModelStringInput | null,
  link?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAppExhibitorDealConditionInput | null > | null,
  or?: Array< ModelApsAppExhibitorDealConditionInput | null > | null,
  not?: ModelApsAppExhibitorDealConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSExhibitorDealsId?: ModelIDInput | null,
  apsAppUserExhibitorDealsId?: ModelIDInput | null,
  apsAppExhibitorProfileDealsId?: ModelIDInput | null,
};

export type UpdateApsAppExhibitorDealInput = {
  id: string,
  exhibitorId?: string | null,
  deal?: string | null,
  link?: string | null,
  userId?: string | null,
  eventId?: string | null,
  aPSExhibitorDealsId?: string | null,
  apsAppUserExhibitorDealsId?: string | null,
  apsAppExhibitorProfileDealsId?: string | null,
};

export type DeleteApsAppExhibitorDealInput = {
  id: string,
};

export type CreateApsAppExhibitorPhotoInput = {
  id?: string | null,
  exhibitorId: string,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId: string,
  aPSExhibitorPhotosId?: string | null,
  apsAppExhibitorProfilePhotosId?: string | null,
};

export type ModelApsAppExhibitorPhotoConditionInput = {
  exhibitorId?: ModelIDInput | null,
  photo?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  approved?: ModelBooleanInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAppExhibitorPhotoConditionInput | null > | null,
  or?: Array< ModelApsAppExhibitorPhotoConditionInput | null > | null,
  not?: ModelApsAppExhibitorPhotoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSExhibitorPhotosId?: ModelIDInput | null,
  apsAppExhibitorProfilePhotosId?: ModelIDInput | null,
};

export type UpdateApsAppExhibitorPhotoInput = {
  id: string,
  exhibitorId?: string | null,
  photo?: string | null,
  caption?: string | null,
  approved?: boolean | null,
  eventId?: string | null,
  aPSExhibitorPhotosId?: string | null,
  apsAppExhibitorProfilePhotosId?: string | null,
};

export type DeleteApsAppExhibitorPhotoInput = {
  id: string,
};

export type CreateApsAppExhibitorHandoutInput = {
  id?: string | null,
  exhibitorId: string,
  handout?: string | null,
  eventId: string,
  aPSExhibitorHandoutsId?: string | null,
  apsAppExhibitorProfileHandoutsId?: string | null,
};

export type ModelApsAppExhibitorHandoutConditionInput = {
  exhibitorId?: ModelIDInput | null,
  handout?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelApsAppExhibitorHandoutConditionInput | null > | null,
  or?: Array< ModelApsAppExhibitorHandoutConditionInput | null > | null,
  not?: ModelApsAppExhibitorHandoutConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSExhibitorHandoutsId?: ModelIDInput | null,
  apsAppExhibitorProfileHandoutsId?: ModelIDInput | null,
};

export type UpdateApsAppExhibitorHandoutInput = {
  id: string,
  exhibitorId?: string | null,
  handout?: string | null,
  eventId?: string | null,
  aPSExhibitorHandoutsId?: string | null,
  apsAppExhibitorProfileHandoutsId?: string | null,
};

export type DeleteApsAppExhibitorHandoutInput = {
  id: string,
};

export type CreateApsAddOnInput = {
  id?: string | null,
  title: string,
  description: string,
  subheadline?: string | null,
  location: string,
  date: string,
  time: string,
  company: string,
  altLink?: string | null,
  type?: string | null,
  limit?: number | null,
  eventId: string,
  price?: number | null,
  aPSAddOnsId?: string | null,
};

export type ModelApsAddOnConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  subheadline?: ModelStringInput | null,
  location?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  company?: ModelStringInput | null,
  altLink?: ModelStringInput | null,
  type?: ModelStringInput | null,
  limit?: ModelIntInput | null,
  eventId?: ModelIDInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelApsAddOnConditionInput | null > | null,
  or?: Array< ModelApsAddOnConditionInput | null > | null,
  not?: ModelApsAddOnConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aPSAddOnsId?: ModelIDInput | null,
};

export type UpdateApsAddOnInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  subheadline?: string | null,
  location?: string | null,
  date?: string | null,
  time?: string | null,
  company?: string | null,
  altLink?: string | null,
  type?: string | null,
  limit?: number | null,
  eventId?: string | null,
  price?: number | null,
  aPSAddOnsId?: string | null,
};

export type DeleteApsAddOnInput = {
  id: string,
};

export type CreateApsSeatingChartInput = {
  id?: string | null,
};

export type ModelApsSeatingChartConditionInput = {
  and?: Array< ModelApsSeatingChartConditionInput | null > | null,
  or?: Array< ModelApsSeatingChartConditionInput | null > | null,
  not?: ModelApsSeatingChartConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateApsSeatingChartInput = {
  id: string,
};

export type DeleteApsSeatingChartInput = {
  id: string,
};

export type CreateApsSeatingChartRegistrantInput = {
  id?: string | null,
  category?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  company?: string | null,
  email?: string | null,
  role?: string | null,
  tableNumber?: number | null,
  notes?: string | null,
  seatingChartID: string,
  registrantID: string,
  apsSeatingChartRegistrantsId?: string | null,
};

export type ModelApsSeatingChartRegistrantConditionInput = {
  category?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  tableNumber?: ModelIntInput | null,
  notes?: ModelStringInput | null,
  seatingChartID?: ModelIDInput | null,
  registrantID?: ModelIDInput | null,
  and?: Array< ModelApsSeatingChartRegistrantConditionInput | null > | null,
  or?: Array< ModelApsSeatingChartRegistrantConditionInput | null > | null,
  not?: ModelApsSeatingChartRegistrantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  apsSeatingChartRegistrantsId?: ModelIDInput | null,
};

export type UpdateApsSeatingChartRegistrantInput = {
  id: string,
  category?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  company?: string | null,
  email?: string | null,
  role?: string | null,
  tableNumber?: number | null,
  notes?: string | null,
  seatingChartID?: string | null,
  registrantID?: string | null,
  apsSeatingChartRegistrantsId?: string | null,
};

export type DeleteApsSeatingChartRegistrantInput = {
  id: string,
};

export type CreateApsContactRequestInput = {
  id?: string | null,
  eventId: string,
  requestKey: string,
  userAId: string,
  userBId: string,
  owners: Array< string >,
  requestedByUserId: string,
  status: string,
  acceptedAt?: string | null,
  declinedAt?: string | null,
  blockedAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsContactRequestConditionInput = {
  eventId?: ModelIDInput | null,
  requestKey?: ModelStringInput | null,
  userAId?: ModelIDInput | null,
  userBId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  requestedByUserId?: ModelIDInput | null,
  status?: ModelStringInput | null,
  acceptedAt?: ModelStringInput | null,
  declinedAt?: ModelStringInput | null,
  blockedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsContactRequestConditionInput | null > | null,
  or?: Array< ModelApsContactRequestConditionInput | null > | null,
  not?: ModelApsContactRequestConditionInput | null,
};

export type ApsContactRequest = {
  __typename: "ApsContactRequest",
  id: string,
  eventId: string,
  requestKey: string,
  userAId: string,
  userBId: string,
  owners: Array< string >,
  requestedByUserId: string,
  status: string,
  acceptedAt?: string | null,
  declinedAt?: string | null,
  blockedAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateApsContactRequestInput = {
  id: string,
  eventId?: string | null,
  requestKey?: string | null,
  userAId?: string | null,
  userBId?: string | null,
  owners?: Array< string > | null,
  requestedByUserId?: string | null,
  status?: string | null,
  acceptedAt?: string | null,
  declinedAt?: string | null,
  blockedAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsContactRequestInput = {
  id: string,
};

export type CreateApsDmThreadInput = {
  id?: string | null,
  eventId: string,
  dmKey: string,
  userAId: string,
  userBId: string,
  owners: Array< string >,
  lastMessageAt?: string | null,
  lastMessagePreview?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsDmThreadConditionInput = {
  eventId?: ModelIDInput | null,
  dmKey?: ModelStringInput | null,
  userAId?: ModelIDInput | null,
  userBId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  lastMessageAt?: ModelStringInput | null,
  lastMessagePreview?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmThreadConditionInput | null > | null,
  or?: Array< ModelApsDmThreadConditionInput | null > | null,
  not?: ModelApsDmThreadConditionInput | null,
};

export type UpdateApsDmThreadInput = {
  id: string,
  eventId?: string | null,
  dmKey?: string | null,
  userAId?: string | null,
  userBId?: string | null,
  owners?: Array< string > | null,
  lastMessageAt?: string | null,
  lastMessagePreview?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsDmThreadInput = {
  id: string,
};

export type CreateApsDmParticipantStateInput = {
  id?: string | null,
  eventId: string,
  threadId: string,
  userId: string,
  lastReadAt?: string | null,
  unreadCount?: number | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsDmParticipantStateConditionInput = {
  eventId?: ModelIDInput | null,
  threadId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  lastReadAt?: ModelStringInput | null,
  unreadCount?: ModelIntInput | null,
  lastMessageAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmParticipantStateConditionInput | null > | null,
  or?: Array< ModelApsDmParticipantStateConditionInput | null > | null,
  not?: ModelApsDmParticipantStateConditionInput | null,
};

export type UpdateApsDmParticipantStateInput = {
  id: string,
  eventId?: string | null,
  threadId?: string | null,
  userId?: string | null,
  lastReadAt?: string | null,
  unreadCount?: number | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsDmParticipantStateInput = {
  id: string,
};

export type CreateApsDmMessageInput = {
  id?: string | null,
  eventId: string,
  threadId: string,
  senderUserId: string,
  owners: Array< string >,
  type?: string | null,
  body?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsDmMessageConditionInput = {
  eventId?: ModelIDInput | null,
  threadId?: ModelIDInput | null,
  senderUserId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  type?: ModelStringInput | null,
  body?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmMessageConditionInput | null > | null,
  or?: Array< ModelApsDmMessageConditionInput | null > | null,
  not?: ModelApsDmMessageConditionInput | null,
};

export type UpdateApsDmMessageInput = {
  id: string,
  eventId?: string | null,
  threadId?: string | null,
  senderUserId?: string | null,
  owners?: Array< string > | null,
  type?: string | null,
  body?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsDmMessageInput = {
  id: string,
};

export type CreateApsAdminAnnouncementInput = {
  id?: string | null,
  eventId: string,
  title?: string | null,
  body: string,
  deepLink?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsAdminAnnouncementConditionInput = {
  eventId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  deepLink?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAdminAnnouncementConditionInput | null > | null,
  or?: Array< ModelApsAdminAnnouncementConditionInput | null > | null,
  not?: ModelApsAdminAnnouncementConditionInput | null,
};

export type ApsAdminAnnouncement = {
  __typename: "ApsAdminAnnouncement",
  id: string,
  eventId: string,
  title?: string | null,
  body: string,
  deepLink?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateApsAdminAnnouncementInput = {
  id: string,
  eventId?: string | null,
  title?: string | null,
  body?: string | null,
  deepLink?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsAdminAnnouncementInput = {
  id: string,
};

export type CreateApsUserEngageStateInput = {
  id?: string | null,
  eventId: string,
  userId: string,
  lastSeenAnnouncementAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelApsUserEngageStateConditionInput = {
  eventId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  lastSeenAnnouncementAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsUserEngageStateConditionInput | null > | null,
  or?: Array< ModelApsUserEngageStateConditionInput | null > | null,
  not?: ModelApsUserEngageStateConditionInput | null,
};

export type ApsUserEngageState = {
  __typename: "ApsUserEngageState",
  id: string,
  eventId: string,
  userId: string,
  lastSeenAnnouncementAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateApsUserEngageStateInput = {
  id: string,
  eventId?: string | null,
  userId?: string | null,
  lastSeenAnnouncementAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteApsUserEngageStateInput = {
  id: string,
};

export type CreateApsPushTokenInput = {
  id?: string | null,
  userId: string,
  token: string,
  platform?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelApsPushTokenConditionInput = {
  userId?: ModelIDInput | null,
  token?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelApsPushTokenConditionInput | null > | null,
  or?: Array< ModelApsPushTokenConditionInput | null > | null,
  not?: ModelApsPushTokenConditionInput | null,
};

export type ApsPushToken = {
  __typename: "ApsPushToken",
  id: string,
  userId: string,
  token: string,
  platform?: string | null,
  updatedAt: string,
  createdAt: string,
};

export type UpdateApsPushTokenInput = {
  id: string,
  userId?: string | null,
  token?: string | null,
  platform?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteApsPushTokenInput = {
  id: string,
};

export type CreateAPSCompanyEventsInput = {
  id?: string | null,
  aPSId: string,
  aPSCompanyId: string,
};

export type ModelAPSCompanyEventsConditionInput = {
  aPSId?: ModelIDInput | null,
  aPSCompanyId?: ModelIDInput | null,
  and?: Array< ModelAPSCompanyEventsConditionInput | null > | null,
  or?: Array< ModelAPSCompanyEventsConditionInput | null > | null,
  not?: ModelAPSCompanyEventsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateAPSCompanyEventsInput = {
  id: string,
  aPSId?: string | null,
  aPSCompanyId?: string | null,
};

export type DeleteAPSCompanyEventsInput = {
  id: string,
};

export type CreateRegistrantAddOnsRequestedInput = {
  id?: string | null,
  apsRegistrantId: string,
  apsAddOnId: string,
};

export type ModelRegistrantAddOnsRequestedConditionInput = {
  apsRegistrantId?: ModelIDInput | null,
  apsAddOnId?: ModelIDInput | null,
  and?: Array< ModelRegistrantAddOnsRequestedConditionInput | null > | null,
  or?: Array< ModelRegistrantAddOnsRequestedConditionInput | null > | null,
  not?: ModelRegistrantAddOnsRequestedConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateRegistrantAddOnsRequestedInput = {
  id: string,
  apsRegistrantId?: string | null,
  apsAddOnId?: string | null,
};

export type DeleteRegistrantAddOnsRequestedInput = {
  id: string,
};

export type CreateRegistrantAddOnsApprovedInput = {
  id?: string | null,
  apsRegistrantId: string,
  apsAddOnId: string,
};

export type ModelRegistrantAddOnsApprovedConditionInput = {
  apsRegistrantId?: ModelIDInput | null,
  apsAddOnId?: ModelIDInput | null,
  and?: Array< ModelRegistrantAddOnsApprovedConditionInput | null > | null,
  or?: Array< ModelRegistrantAddOnsApprovedConditionInput | null > | null,
  not?: ModelRegistrantAddOnsApprovedConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateRegistrantAddOnsApprovedInput = {
  id: string,
  apsRegistrantId?: string | null,
  apsAddOnId?: string | null,
};

export type DeleteRegistrantAddOnsApprovedInput = {
  id: string,
};

export type CreateSessionSpeakersInput = {
  id?: string | null,
  apsAppSessionId: string,
  aPSSpeakerId: string,
};

export type ModelSessionSpeakersConditionInput = {
  apsAppSessionId?: ModelIDInput | null,
  aPSSpeakerId?: ModelIDInput | null,
  and?: Array< ModelSessionSpeakersConditionInput | null > | null,
  or?: Array< ModelSessionSpeakersConditionInput | null > | null,
  not?: ModelSessionSpeakersConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateSessionSpeakersInput = {
  id: string,
  apsAppSessionId?: string | null,
  aPSSpeakerId?: string | null,
};

export type DeleteSessionSpeakersInput = {
  id: string,
};

export type CreateSessionSponsorsInput = {
  id?: string | null,
  apsAppSessionId: string,
  apsSponsorId: string,
};

export type ModelSessionSponsorsConditionInput = {
  apsAppSessionId?: ModelIDInput | null,
  apsSponsorId?: ModelIDInput | null,
  and?: Array< ModelSessionSponsorsConditionInput | null > | null,
  or?: Array< ModelSessionSponsorsConditionInput | null > | null,
  not?: ModelSessionSponsorsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateSessionSponsorsInput = {
  id: string,
  apsAppSessionId?: string | null,
  apsSponsorId?: string | null,
};

export type DeleteSessionSponsorsInput = {
  id: string,
};

export type ModelApsTempCredentialFilterInput = {
  id?: ModelIDInput | null,
  apsID?: ModelIDInput | null,
  registrantId?: ModelIDInput | null,
  email?: ModelStringInput | null,
  tempPasswordCiphertext?: ModelStringInput | null,
  tempPasswordIv?: ModelStringInput | null,
  tempPasswordTag?: ModelStringInput | null,
  expiresAt?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsTempCredentialFilterInput | null > | null,
  or?: Array< ModelApsTempCredentialFilterInput | null > | null,
  not?: ModelApsTempCredentialFilterInput | null,
};

export type ModelApsTempCredentialConnection = {
  __typename: "ModelApsTempCredentialConnection",
  items:  Array<ApsTempCredential | null >,
  nextToken?: string | null,
};

export type ModelApsAppUserNoteFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  note?: ModelStringInput | null,
  sessionId?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  registrantId?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserNoteFilterInput | null > | null,
  or?: Array< ModelApsAppUserNoteFilterInput | null > | null,
  not?: ModelApsAppUserNoteFilterInput | null,
  apsAppUserNotesId?: ModelIDInput | null,
};

export type ModelApsContactRequestFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  requestKey?: ModelStringInput | null,
  userAId?: ModelIDInput | null,
  userBId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  requestedByUserId?: ModelIDInput | null,
  status?: ModelStringInput | null,
  acceptedAt?: ModelStringInput | null,
  declinedAt?: ModelStringInput | null,
  blockedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsContactRequestFilterInput | null > | null,
  or?: Array< ModelApsContactRequestFilterInput | null > | null,
  not?: ModelApsContactRequestFilterInput | null,
};

export type ModelApsContactRequestConnection = {
  __typename: "ModelApsContactRequestConnection",
  items:  Array<ApsContactRequest | null >,
  nextToken?: string | null,
};

export type ModelApsDmThreadFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  dmKey?: ModelStringInput | null,
  userAId?: ModelIDInput | null,
  userBId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  lastMessageAt?: ModelStringInput | null,
  lastMessagePreview?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmThreadFilterInput | null > | null,
  or?: Array< ModelApsDmThreadFilterInput | null > | null,
  not?: ModelApsDmThreadFilterInput | null,
};

export type ModelApsDmThreadConnection = {
  __typename: "ModelApsDmThreadConnection",
  items:  Array<ApsDmThread | null >,
  nextToken?: string | null,
};

export type ModelApsDmParticipantStateFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  threadId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  lastReadAt?: ModelStringInput | null,
  unreadCount?: ModelIntInput | null,
  lastMessageAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmParticipantStateFilterInput | null > | null,
  or?: Array< ModelApsDmParticipantStateFilterInput | null > | null,
  not?: ModelApsDmParticipantStateFilterInput | null,
};

export type ModelApsDmMessageFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  threadId?: ModelIDInput | null,
  senderUserId?: ModelIDInput | null,
  owners?: ModelStringInput | null,
  type?: ModelStringInput | null,
  body?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsDmMessageFilterInput | null > | null,
  or?: Array< ModelApsDmMessageFilterInput | null > | null,
  not?: ModelApsDmMessageFilterInput | null,
};

export type ModelApsAdminAnnouncementFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  deepLink?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAdminAnnouncementFilterInput | null > | null,
  or?: Array< ModelApsAdminAnnouncementFilterInput | null > | null,
  not?: ModelApsAdminAnnouncementFilterInput | null,
};

export type ModelApsAdminAnnouncementConnection = {
  __typename: "ModelApsAdminAnnouncementConnection",
  items:  Array<ApsAdminAnnouncement | null >,
  nextToken?: string | null,
};

export type ModelApsUserEngageStateFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  lastSeenAnnouncementAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsUserEngageStateFilterInput | null > | null,
  or?: Array< ModelApsUserEngageStateFilterInput | null > | null,
  not?: ModelApsUserEngageStateFilterInput | null,
};

export type ModelApsUserEngageStateConnection = {
  __typename: "ModelApsUserEngageStateConnection",
  items:  Array<ApsUserEngageState | null >,
  nextToken?: string | null,
};

export type ModelApsPushTokenFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  token?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelApsPushTokenFilterInput | null > | null,
  or?: Array< ModelApsPushTokenFilterInput | null > | null,
  not?: ModelApsPushTokenFilterInput | null,
};

export type ModelApsPushTokenConnection = {
  __typename: "ModelApsPushTokenConnection",
  items:  Array<ApsPushToken | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelAPSFilterInput = {
  id?: ModelIDInput | null,
  year?: ModelStringInput | null,
  codes?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  website?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSFilterInput | null > | null,
  or?: Array< ModelAPSFilterInput | null > | null,
  not?: ModelAPSFilterInput | null,
  aPSAgendaId?: ModelIDInput | null,
};

export type ModelAPSConnection = {
  __typename: "ModelAPSConnection",
  items:  Array<APS | null >,
  nextToken?: string | null,
};

export type ModelAPSBoardFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  title?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSBoardFilterInput | null > | null,
  or?: Array< ModelAPSBoardFilterInput | null > | null,
  not?: ModelAPSBoardFilterInput | null,
};

export type ModelAPSBoardConnection = {
  __typename: "ModelAPSBoardConnection",
  items:  Array<APSBoard | null >,
  nextToken?: string | null,
};

export type ModelApsAgendaFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAgendaFilterInput | null > | null,
  or?: Array< ModelApsAgendaFilterInput | null > | null,
  not?: ModelApsAgendaFilterInput | null,
};

export type ModelApsAgendaConnection = {
  __typename: "ModelApsAgendaConnection",
  items:  Array<ApsAgenda | null >,
  nextToken?: string | null,
};

export type ModelApsRegistrantFilterInput = {
  id?: ModelIDInput | null,
  apsID?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  companyId?: ModelIDInput | null,
  jobTitle?: ModelStringInput | null,
  attendeeType?: ModelRegistrantTypeInput | null,
  termsAccepted?: ModelBooleanInput | null,
  interests?: ModelStringInput | null,
  otherInterest?: ModelStringInput | null,
  interestQuestionOne?: ModelStringInput | null,
  interestQuestionTwo?: ModelStringInput | null,
  billingAddressFirstName?: ModelStringInput | null,
  billingAddressLastName?: ModelStringInput | null,
  billingAddressEmail?: ModelStringInput | null,
  billingAddressPhone?: ModelStringInput | null,
  billingAddressStreet?: ModelStringInput | null,
  billingAddressCity?: ModelStringInput | null,
  billingAddressState?: ModelStringInput | null,
  billingAddressZip?: ModelStringInput | null,
  sameAsAttendee?: ModelBooleanInput | null,
  speakerTopic?: ModelStringInput | null,
  learningObjectives?: ModelStringInput | null,
  totalAmount?: ModelIntInput | null,
  discountCode?: ModelStringInput | null,
  status?: ModelRegistrantStatusInput | null,
  paymentConfirmation?: ModelStringInput | null,
  registrationEmailSent?: ModelBooleanInput | null,
  registrationEmailSentDate?: ModelStringInput | null,
  registrationEmailReceived?: ModelBooleanInput | null,
  registrationEmailReceivedDate?: ModelStringInput | null,
  welcomeEmailSent?: ModelBooleanInput | null,
  welcomeEmailSentDate?: ModelStringInput | null,
  welcomeEmailReceived?: ModelBooleanInput | null,
  welcomeEmailReceivedDate?: ModelStringInput | null,
  paymentMethod?: ModelStringInput | null,
  paymentLast4?: ModelStringInput | null,
  approvedAt?: ModelStringInput | null,
  headshot?: ModelStringInput | null,
  presentation?: ModelStringInput | null,
  presentationTitle?: ModelStringInput | null,
  presentationSummary?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  appUserId?: ModelIDInput | null,
  qrCode?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsRegistrantFilterInput | null > | null,
  or?: Array< ModelApsRegistrantFilterInput | null > | null,
  not?: ModelApsRegistrantFilterInput | null,
  aPSRegistrantsId?: ModelIDInput | null,
  aPSCompanyRegistrantsId?: ModelIDInput | null,
  apsRegistrantSeatingChartRegistrantId?: ModelIDInput | null,
};

export type ModelApsAppUserFilterInput = {
  id?: ModelIDInput | null,
  registrantId?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserFilterInput | null > | null,
  or?: Array< ModelApsAppUserFilterInput | null > | null,
  not?: ModelApsAppUserFilterInput | null,
};

export type ModelApsAppUserConnection = {
  __typename: "ModelApsAppUserConnection",
  items:  Array<ApsAppUser | null >,
  nextToken?: string | null,
};

export type ModelApsAppUserContactFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  favorite?: ModelBooleanInput | null,
  contactId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserContactFilterInput | null > | null,
  or?: Array< ModelApsAppUserContactFilterInput | null > | null,
  not?: ModelApsAppUserContactFilterInput | null,
  apsAppUserContactsId?: ModelIDInput | null,
};

export type ModelApsAppUserLeadFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  favorite?: ModelBooleanInput | null,
  contactId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserLeadFilterInput | null > | null,
  or?: Array< ModelApsAppUserLeadFilterInput | null > | null,
  not?: ModelApsAppUserLeadFilterInput | null,
  apsAppUserLeadsId?: ModelIDInput | null,
};

export type ModelApsAppUserProfileFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  company?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  attendeeType?: ModelRegistrantTypeInput | null,
  quickTools?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  facebook?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  youtube?: ModelStringInput | null,
  website?: ModelStringInput | null,
  location?: ModelStringInput | null,
  resume?: ModelStringInput | null,
  speakerId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserProfileFilterInput | null > | null,
  or?: Array< ModelApsAppUserProfileFilterInput | null > | null,
  not?: ModelApsAppUserProfileFilterInput | null,
};

export type ModelApsAppUserProfileConnection = {
  __typename: "ModelApsAppUserProfileConnection",
  items:  Array<ApsAppUserProfile | null >,
  nextToken?: string | null,
};

export type ModelProfileAffiliateFilterInput = {
  id?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  affiliate?: ModelStringInput | null,
  role?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProfileAffiliateFilterInput | null > | null,
  or?: Array< ModelProfileAffiliateFilterInput | null > | null,
  not?: ModelProfileAffiliateFilterInput | null,
  apsAppUserProfileAffiliatesId?: ModelIDInput | null,
};

export type ModelProfileEducationFilterInput = {
  id?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  school?: ModelStringInput | null,
  degree?: ModelStringInput | null,
  fieldOfStudy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProfileEducationFilterInput | null > | null,
  or?: Array< ModelProfileEducationFilterInput | null > | null,
  not?: ModelProfileEducationFilterInput | null,
  apsAppUserProfileEducationId?: ModelIDInput | null,
};

export type ModelProfileInterestFilterInput = {
  id?: ModelIDInput | null,
  profileId?: ModelIDInput | null,
  interest?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProfileInterestFilterInput | null > | null,
  or?: Array< ModelProfileInterestFilterInput | null > | null,
  not?: ModelProfileInterestFilterInput | null,
  apsAppUserProfileInterestsId?: ModelIDInput | null,
};

export type ModelApsAppUserPhotoFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  photo?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  approved?: ModelBooleanInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppUserPhotoFilterInput | null > | null,
  or?: Array< ModelApsAppUserPhotoFilterInput | null > | null,
  not?: ModelApsAppUserPhotoFilterInput | null,
  aPSPhotosId?: ModelIDInput | null,
  apsAppUserPhotosId?: ModelIDInput | null,
};

export type ModelApsAppSessionFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  location?: ModelStringInput | null,
  description?: ModelStringInput | null,
  agendaId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppSessionFilterInput | null > | null,
  or?: Array< ModelApsAppSessionFilterInput | null > | null,
  not?: ModelApsAppSessionFilterInput | null,
  apsAgendaItemsId?: ModelIDInput | null,
};

export type ModelApsAppSessionQuestionFilterInput = {
  id?: ModelIDInput | null,
  sessionId?: ModelIDInput | null,
  question?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppSessionQuestionFilterInput | null > | null,
  or?: Array< ModelApsAppSessionQuestionFilterInput | null > | null,
  not?: ModelApsAppSessionQuestionFilterInput | null,
  apsAppUserSessionQuestionsId?: ModelIDInput | null,
};

export type ModelAPSSpeakerFilterInput = {
  id?: ModelIDInput | null,
  presentationTitle?: ModelStringInput | null,
  presentationSummary?: ModelStringInput | null,
  profileId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSSpeakerFilterInput | null > | null,
  or?: Array< ModelAPSSpeakerFilterInput | null > | null,
  not?: ModelAPSSpeakerFilterInput | null,
  aPSSpeakersId?: ModelIDInput | null,
};

export type ModelApsSponsorFilterInput = {
  id?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  type?: ModelSponsorTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsSponsorFilterInput | null > | null,
  or?: Array< ModelApsSponsorFilterInput | null > | null,
  not?: ModelApsSponsorFilterInput | null,
  aPSSponsorsId?: ModelIDInput | null,
  apsSponsorProfileId?: ModelIDInput | null,
};

export type ModelAPSCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  type?: ModelCompanyTypeInput | null,
  description?: ModelStringInput | null,
  website?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  sponsorId?: ModelIDInput | null,
  exhibitorProfileId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSCompanyFilterInput | null > | null,
  or?: Array< ModelAPSCompanyFilterInput | null > | null,
  not?: ModelAPSCompanyFilterInput | null,
};

export type ModelAPSCompanyConnection = {
  __typename: "ModelAPSCompanyConnection",
  items:  Array<APSCompany | null >,
  nextToken?: string | null,
};

export type ModelAPSCompanyContactFilterInput = {
  id?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  title?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSCompanyContactFilterInput | null > | null,
  or?: Array< ModelAPSCompanyContactFilterInput | null > | null,
  not?: ModelAPSCompanyContactFilterInput | null,
};

export type ModelApsAppExhibitorProfileFilterInput = {
  id?: ModelIDInput | null,
  companyId?: ModelIDInput | null,
  sponsorId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  video?: ModelStringInput | null,
  videoCaption?: ModelStringInput | null,
  boothNumber?: ModelStringInput | null,
  visits?: ModelIntInput | null,
  views?: ModelIntInput | null,
  likes?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppExhibitorProfileFilterInput | null > | null,
  or?: Array< ModelApsAppExhibitorProfileFilterInput | null > | null,
  not?: ModelApsAppExhibitorProfileFilterInput | null,
  aPSExhibitorsId?: ModelIDInput | null,
};

export type ModelApsAppExhibitorPromotionFilterInput = {
  id?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  promotion?: ModelStringInput | null,
  link?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppExhibitorPromotionFilterInput | null > | null,
  or?: Array< ModelApsAppExhibitorPromotionFilterInput | null > | null,
  not?: ModelApsAppExhibitorPromotionFilterInput | null,
  aPSExhibitorPromotionsId?: ModelIDInput | null,
  apsAppExhibitorProfilePromotionsId?: ModelIDInput | null,
};

export type ModelApsAppExhibitorDealFilterInput = {
  id?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  deal?: ModelStringInput | null,
  link?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppExhibitorDealFilterInput | null > | null,
  or?: Array< ModelApsAppExhibitorDealFilterInput | null > | null,
  not?: ModelApsAppExhibitorDealFilterInput | null,
  aPSExhibitorDealsId?: ModelIDInput | null,
  apsAppUserExhibitorDealsId?: ModelIDInput | null,
  apsAppExhibitorProfileDealsId?: ModelIDInput | null,
};

export type ModelApsAppExhibitorPhotoFilterInput = {
  id?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  photo?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  approved?: ModelBooleanInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppExhibitorPhotoFilterInput | null > | null,
  or?: Array< ModelApsAppExhibitorPhotoFilterInput | null > | null,
  not?: ModelApsAppExhibitorPhotoFilterInput | null,
  aPSExhibitorPhotosId?: ModelIDInput | null,
  apsAppExhibitorProfilePhotosId?: ModelIDInput | null,
};

export type ModelApsAppExhibitorHandoutFilterInput = {
  id?: ModelIDInput | null,
  exhibitorId?: ModelIDInput | null,
  handout?: ModelStringInput | null,
  eventId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAppExhibitorHandoutFilterInput | null > | null,
  or?: Array< ModelApsAppExhibitorHandoutFilterInput | null > | null,
  not?: ModelApsAppExhibitorHandoutFilterInput | null,
  aPSExhibitorHandoutsId?: ModelIDInput | null,
  apsAppExhibitorProfileHandoutsId?: ModelIDInput | null,
};

export type ModelApsAddOnFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  subheadline?: ModelStringInput | null,
  location?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  company?: ModelStringInput | null,
  altLink?: ModelStringInput | null,
  type?: ModelStringInput | null,
  limit?: ModelIntInput | null,
  eventId?: ModelIDInput | null,
  price?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsAddOnFilterInput | null > | null,
  or?: Array< ModelApsAddOnFilterInput | null > | null,
  not?: ModelApsAddOnFilterInput | null,
  aPSAddOnsId?: ModelIDInput | null,
};

export type ModelApsSeatingChartFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsSeatingChartFilterInput | null > | null,
  or?: Array< ModelApsSeatingChartFilterInput | null > | null,
  not?: ModelApsSeatingChartFilterInput | null,
};

export type ModelApsSeatingChartConnection = {
  __typename: "ModelApsSeatingChartConnection",
  items:  Array<ApsSeatingChart | null >,
  nextToken?: string | null,
};

export type ModelApsSeatingChartRegistrantFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  company?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  tableNumber?: ModelIntInput | null,
  notes?: ModelStringInput | null,
  seatingChartID?: ModelIDInput | null,
  registrantID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelApsSeatingChartRegistrantFilterInput | null > | null,
  or?: Array< ModelApsSeatingChartRegistrantFilterInput | null > | null,
  not?: ModelApsSeatingChartRegistrantFilterInput | null,
  apsSeatingChartRegistrantsId?: ModelIDInput | null,
};

export type ModelAPSCompanyEventsFilterInput = {
  id?: ModelIDInput | null,
  aPSId?: ModelIDInput | null,
  aPSCompanyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAPSCompanyEventsFilterInput | null > | null,
  or?: Array< ModelAPSCompanyEventsFilterInput | null > | null,
  not?: ModelAPSCompanyEventsFilterInput | null,
};

export type ModelRegistrantAddOnsRequestedFilterInput = {
  id?: ModelIDInput | null,
  apsRegistrantId?: ModelIDInput | null,
  apsAddOnId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRegistrantAddOnsRequestedFilterInput | null > | null,
  or?: Array< ModelRegistrantAddOnsRequestedFilterInput | null > | null,
  not?: ModelRegistrantAddOnsRequestedFilterInput | null,
};

export type ModelRegistrantAddOnsApprovedFilterInput = {
  id?: ModelIDInput | null,
  apsRegistrantId?: ModelIDInput | null,
  apsAddOnId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRegistrantAddOnsApprovedFilterInput | null > | null,
  or?: Array< ModelRegistrantAddOnsApprovedFilterInput | null > | null,
  not?: ModelRegistrantAddOnsApprovedFilterInput | null,
};

export type ModelSessionSpeakersFilterInput = {
  id?: ModelIDInput | null,
  apsAppSessionId?: ModelIDInput | null,
  aPSSpeakerId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSessionSpeakersFilterInput | null > | null,
  or?: Array< ModelSessionSpeakersFilterInput | null > | null,
  not?: ModelSessionSpeakersFilterInput | null,
};

export type ModelSessionSponsorsFilterInput = {
  id?: ModelIDInput | null,
  apsAppSessionId?: ModelIDInput | null,
  apsSponsorId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSessionSponsorsFilterInput | null > | null,
  or?: Array< ModelSessionSponsorsFilterInput | null > | null,
  not?: ModelSessionSponsorsFilterInput | null,
};

export type ModelSubscriptionApsTempCredentialFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsID?: ModelSubscriptionIDInput | null,
  registrantId?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  tempPasswordCiphertext?: ModelSubscriptionStringInput | null,
  tempPasswordIv?: ModelSubscriptionStringInput | null,
  tempPasswordTag?: ModelSubscriptionStringInput | null,
  expiresAt?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsTempCredentialFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsTempCredentialFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionApsAppUserNoteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  note?: ModelSubscriptionStringInput | null,
  sessionId?: ModelSubscriptionIDInput | null,
  exhibitorId?: ModelSubscriptionIDInput | null,
  registrantId?: ModelSubscriptionIDInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserNoteFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserNoteFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionApsContactRequestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  requestKey?: ModelSubscriptionStringInput | null,
  userAId?: ModelSubscriptionIDInput | null,
  userBId?: ModelSubscriptionIDInput | null,
  requestedByUserId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  acceptedAt?: ModelSubscriptionStringInput | null,
  declinedAt?: ModelSubscriptionStringInput | null,
  blockedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsContactRequestFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsContactRequestFilterInput | null > | null,
  owners?: ModelStringInput | null,
};

export type ModelSubscriptionApsDmThreadFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  dmKey?: ModelSubscriptionStringInput | null,
  userAId?: ModelSubscriptionIDInput | null,
  userBId?: ModelSubscriptionIDInput | null,
  lastMessageAt?: ModelSubscriptionStringInput | null,
  lastMessagePreview?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsDmThreadFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsDmThreadFilterInput | null > | null,
  owners?: ModelStringInput | null,
};

export type ModelSubscriptionApsDmParticipantStateFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  threadId?: ModelSubscriptionIDInput | null,
  lastReadAt?: ModelSubscriptionStringInput | null,
  unreadCount?: ModelSubscriptionIntInput | null,
  lastMessageAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsDmParticipantStateFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsDmParticipantStateFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionApsDmMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  threadId?: ModelSubscriptionIDInput | null,
  senderUserId?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  body?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsDmMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsDmMessageFilterInput | null > | null,
  owners?: ModelStringInput | null,
};

export type ModelSubscriptionApsAdminAnnouncementFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  body?: ModelSubscriptionStringInput | null,
  deepLink?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAdminAnnouncementFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAdminAnnouncementFilterInput | null > | null,
};

export type ModelSubscriptionApsUserEngageStateFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  lastSeenAnnouncementAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsUserEngageStateFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsUserEngageStateFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionApsPushTokenFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  token?: ModelSubscriptionStringInput | null,
  platform?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsPushTokenFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsPushTokenFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionAPSFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  year?: ModelSubscriptionStringInput | null,
  codes?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  zip?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSFilterInput | null > | null,
  aPSRegistrantsId?: ModelSubscriptionIDInput | null,
  aPSSponsorsId?: ModelSubscriptionIDInput | null,
  aPSSpeakersId?: ModelSubscriptionIDInput | null,
  aPSPhotosId?: ModelSubscriptionIDInput | null,
  aPSExhibitorsId?: ModelSubscriptionIDInput | null,
  aPSExhibitorPromotionsId?: ModelSubscriptionIDInput | null,
  aPSExhibitorDealsId?: ModelSubscriptionIDInput | null,
  aPSExhibitorPhotosId?: ModelSubscriptionIDInput | null,
  aPSExhibitorHandoutsId?: ModelSubscriptionIDInput | null,
  aPSAddOnsId?: ModelSubscriptionIDInput | null,
  aPSAgendaId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionAPSBoardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  company?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  linkedin?: ModelSubscriptionStringInput | null,
  profilePic?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSBoardFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSBoardFilterInput | null > | null,
};

export type ModelSubscriptionApsAgendaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAgendaFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAgendaFilterInput | null > | null,
  apsAgendaItemsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionApsRegistrantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsID?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  jobTitle?: ModelSubscriptionStringInput | null,
  attendeeType?: ModelSubscriptionStringInput | null,
  termsAccepted?: ModelSubscriptionBooleanInput | null,
  interests?: ModelSubscriptionStringInput | null,
  otherInterest?: ModelSubscriptionStringInput | null,
  interestQuestionOne?: ModelSubscriptionStringInput | null,
  interestQuestionTwo?: ModelSubscriptionStringInput | null,
  billingAddressFirstName?: ModelSubscriptionStringInput | null,
  billingAddressLastName?: ModelSubscriptionStringInput | null,
  billingAddressEmail?: ModelSubscriptionStringInput | null,
  billingAddressPhone?: ModelSubscriptionStringInput | null,
  billingAddressStreet?: ModelSubscriptionStringInput | null,
  billingAddressCity?: ModelSubscriptionStringInput | null,
  billingAddressState?: ModelSubscriptionStringInput | null,
  billingAddressZip?: ModelSubscriptionStringInput | null,
  sameAsAttendee?: ModelSubscriptionBooleanInput | null,
  speakerTopic?: ModelSubscriptionStringInput | null,
  learningObjectives?: ModelSubscriptionStringInput | null,
  totalAmount?: ModelSubscriptionIntInput | null,
  discountCode?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  paymentConfirmation?: ModelSubscriptionStringInput | null,
  registrationEmailSent?: ModelSubscriptionBooleanInput | null,
  registrationEmailSentDate?: ModelSubscriptionStringInput | null,
  registrationEmailReceived?: ModelSubscriptionBooleanInput | null,
  registrationEmailReceivedDate?: ModelSubscriptionStringInput | null,
  welcomeEmailSent?: ModelSubscriptionBooleanInput | null,
  welcomeEmailSentDate?: ModelSubscriptionStringInput | null,
  welcomeEmailReceived?: ModelSubscriptionBooleanInput | null,
  welcomeEmailReceivedDate?: ModelSubscriptionStringInput | null,
  paymentMethod?: ModelSubscriptionStringInput | null,
  paymentLast4?: ModelSubscriptionStringInput | null,
  approvedAt?: ModelSubscriptionStringInput | null,
  headshot?: ModelSubscriptionStringInput | null,
  presentation?: ModelSubscriptionStringInput | null,
  presentationTitle?: ModelSubscriptionStringInput | null,
  presentationSummary?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  appUserId?: ModelSubscriptionIDInput | null,
  qrCode?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsRegistrantFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsRegistrantFilterInput | null > | null,
  apsRegistrantSeatingChartRegistrantId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionApsAppUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  registrantId?: ModelSubscriptionIDInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserFilterInput | null > | null,
  apsAppUserPhotosId?: ModelSubscriptionIDInput | null,
  apsAppUserSessionQuestionsId?: ModelSubscriptionIDInput | null,
  apsAppUserExhibitorDealsId?: ModelSubscriptionIDInput | null,
  apsAppUserContactsId?: ModelSubscriptionIDInput | null,
  apsAppUserNotesId?: ModelSubscriptionIDInput | null,
  apsAppUserLeadsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionApsAppUserContactFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  favorite?: ModelSubscriptionBooleanInput | null,
  contactId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserContactFilterInput | null > | null,
};

export type ModelSubscriptionApsAppUserLeadFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  favorite?: ModelSubscriptionBooleanInput | null,
  contactId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserLeadFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserLeadFilterInput | null > | null,
};

export type ModelSubscriptionApsAppUserProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  company?: ModelSubscriptionStringInput | null,
  jobTitle?: ModelSubscriptionStringInput | null,
  attendeeType?: ModelSubscriptionStringInput | null,
  quickTools?: ModelSubscriptionStringInput | null,
  profilePicture?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  linkedin?: ModelSubscriptionStringInput | null,
  twitter?: ModelSubscriptionStringInput | null,
  facebook?: ModelSubscriptionStringInput | null,
  instagram?: ModelSubscriptionStringInput | null,
  youtube?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  resume?: ModelSubscriptionStringInput | null,
  speakerId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserProfileFilterInput | null > | null,
  apsAppUserProfileAffiliatesId?: ModelSubscriptionIDInput | null,
  apsAppUserProfileEducationId?: ModelSubscriptionIDInput | null,
  apsAppUserProfileInterestsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionProfileAffiliateFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  affiliate?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProfileAffiliateFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileAffiliateFilterInput | null > | null,
};

export type ModelSubscriptionProfileEducationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  school?: ModelSubscriptionStringInput | null,
  degree?: ModelSubscriptionStringInput | null,
  fieldOfStudy?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProfileEducationFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileEducationFilterInput | null > | null,
};

export type ModelSubscriptionProfileInterestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  interest?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProfileInterestFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileInterestFilterInput | null > | null,
};

export type ModelSubscriptionApsAppUserPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  photo?: ModelSubscriptionStringInput | null,
  caption?: ModelSubscriptionStringInput | null,
  approved?: ModelSubscriptionBooleanInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppUserPhotoFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppUserPhotoFilterInput | null > | null,
};

export type ModelSubscriptionApsAppSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  endTime?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  agendaId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppSessionFilterInput | null > | null,
};

export type ModelSubscriptionApsAppSessionQuestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sessionId?: ModelSubscriptionIDInput | null,
  question?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppSessionQuestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppSessionQuestionFilterInput | null > | null,
};

export type ModelSubscriptionAPSSpeakerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  presentationTitle?: ModelSubscriptionStringInput | null,
  presentationSummary?: ModelSubscriptionStringInput | null,
  profileId?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSSpeakerFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSSpeakerFilterInput | null > | null,
};

export type ModelSubscriptionApsSponsorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsSponsorFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsSponsorFilterInput | null > | null,
  apsSponsorProfileId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionAPSCompanyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  zip?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  logo?: ModelSubscriptionStringInput | null,
  sponsorId?: ModelSubscriptionIDInput | null,
  exhibitorProfileId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSCompanyFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSCompanyFilterInput | null > | null,
  aPSCompanyRegistrantsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionAPSCompanyContactFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSCompanyContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSCompanyContactFilterInput | null > | null,
};

export type ModelSubscriptionApsAppExhibitorProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  sponsorId?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  video?: ModelSubscriptionStringInput | null,
  videoCaption?: ModelSubscriptionStringInput | null,
  boothNumber?: ModelSubscriptionStringInput | null,
  visits?: ModelSubscriptionIntInput | null,
  views?: ModelSubscriptionIntInput | null,
  likes?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppExhibitorProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppExhibitorProfileFilterInput | null > | null,
  apsAppExhibitorProfileDealsId?: ModelSubscriptionIDInput | null,
  apsAppExhibitorProfilePhotosId?: ModelSubscriptionIDInput | null,
  apsAppExhibitorProfileHandoutsId?: ModelSubscriptionIDInput | null,
  apsAppExhibitorProfilePromotionsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionApsAppExhibitorPromotionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  exhibitorId?: ModelSubscriptionIDInput | null,
  promotion?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppExhibitorPromotionFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppExhibitorPromotionFilterInput | null > | null,
};

export type ModelSubscriptionApsAppExhibitorDealFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  exhibitorId?: ModelSubscriptionIDInput | null,
  deal?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppExhibitorDealFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppExhibitorDealFilterInput | null > | null,
};

export type ModelSubscriptionApsAppExhibitorPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  exhibitorId?: ModelSubscriptionIDInput | null,
  photo?: ModelSubscriptionStringInput | null,
  caption?: ModelSubscriptionStringInput | null,
  approved?: ModelSubscriptionBooleanInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppExhibitorPhotoFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppExhibitorPhotoFilterInput | null > | null,
};

export type ModelSubscriptionApsAppExhibitorHandoutFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  exhibitorId?: ModelSubscriptionIDInput | null,
  handout?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAppExhibitorHandoutFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAppExhibitorHandoutFilterInput | null > | null,
};

export type ModelSubscriptionApsAddOnFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  subheadline?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  time?: ModelSubscriptionStringInput | null,
  company?: ModelSubscriptionStringInput | null,
  altLink?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  limit?: ModelSubscriptionIntInput | null,
  eventId?: ModelSubscriptionIDInput | null,
  price?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsAddOnFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsAddOnFilterInput | null > | null,
};

export type ModelSubscriptionApsSeatingChartFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsSeatingChartFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsSeatingChartFilterInput | null > | null,
  apsSeatingChartRegistrantsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionApsSeatingChartRegistrantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  company?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  tableNumber?: ModelSubscriptionIntInput | null,
  notes?: ModelSubscriptionStringInput | null,
  seatingChartID?: ModelSubscriptionIDInput | null,
  registrantID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApsSeatingChartRegistrantFilterInput | null > | null,
  or?: Array< ModelSubscriptionApsSeatingChartRegistrantFilterInput | null > | null,
};

export type ModelSubscriptionAPSCompanyEventsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  aPSId?: ModelSubscriptionIDInput | null,
  aPSCompanyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAPSCompanyEventsFilterInput | null > | null,
  or?: Array< ModelSubscriptionAPSCompanyEventsFilterInput | null > | null,
};

export type ModelSubscriptionRegistrantAddOnsRequestedFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsRegistrantId?: ModelSubscriptionIDInput | null,
  apsAddOnId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRegistrantAddOnsRequestedFilterInput | null > | null,
  or?: Array< ModelSubscriptionRegistrantAddOnsRequestedFilterInput | null > | null,
};

export type ModelSubscriptionRegistrantAddOnsApprovedFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsRegistrantId?: ModelSubscriptionIDInput | null,
  apsAddOnId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRegistrantAddOnsApprovedFilterInput | null > | null,
  or?: Array< ModelSubscriptionRegistrantAddOnsApprovedFilterInput | null > | null,
};

export type ModelSubscriptionSessionSpeakersFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsAppSessionId?: ModelSubscriptionIDInput | null,
  aPSSpeakerId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSessionSpeakersFilterInput | null > | null,
  or?: Array< ModelSubscriptionSessionSpeakersFilterInput | null > | null,
};

export type ModelSubscriptionSessionSponsorsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  apsAppSessionId?: ModelSubscriptionIDInput | null,
  apsSponsorId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSessionSponsorsFilterInput | null > | null,
  or?: Array< ModelSubscriptionSessionSponsorsFilterInput | null > | null,
};

export type CreateAPSMutationVariables = {
  input: CreateAPSInput,
  condition?: ModelAPSConditionInput | null,
};

export type CreateAPSMutation = {
  createAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type UpdateAPSMutationVariables = {
  input: UpdateAPSInput,
  condition?: ModelAPSConditionInput | null,
};

export type UpdateAPSMutation = {
  updateAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type DeleteAPSMutationVariables = {
  input: DeleteAPSInput,
  condition?: ModelAPSConditionInput | null,
};

export type DeleteAPSMutation = {
  deleteAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type CreateAPSBoardMutationVariables = {
  input: CreateAPSBoardInput,
  condition?: ModelAPSBoardConditionInput | null,
};

export type CreateAPSBoardMutation = {
  createAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAPSBoardMutationVariables = {
  input: UpdateAPSBoardInput,
  condition?: ModelAPSBoardConditionInput | null,
};

export type UpdateAPSBoardMutation = {
  updateAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAPSBoardMutationVariables = {
  input: DeleteAPSBoardInput,
  condition?: ModelAPSBoardConditionInput | null,
};

export type DeleteAPSBoardMutation = {
  deleteAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsAgendaMutationVariables = {
  input: CreateApsAgendaInput,
  condition?: ModelApsAgendaConditionInput | null,
};

export type CreateApsAgendaMutation = {
  createApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsAgendaMutationVariables = {
  input: UpdateApsAgendaInput,
  condition?: ModelApsAgendaConditionInput | null,
};

export type UpdateApsAgendaMutation = {
  updateApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsAgendaMutationVariables = {
  input: DeleteApsAgendaInput,
  condition?: ModelApsAgendaConditionInput | null,
};

export type DeleteApsAgendaMutation = {
  deleteApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsRegistrantMutationVariables = {
  input: CreateApsRegistrantInput,
  condition?: ModelApsRegistrantConditionInput | null,
};

export type CreateApsRegistrantMutation = {
  createApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type UpdateApsRegistrantMutationVariables = {
  input: UpdateApsRegistrantInput,
  condition?: ModelApsRegistrantConditionInput | null,
};

export type UpdateApsRegistrantMutation = {
  updateApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type DeleteApsRegistrantMutationVariables = {
  input: DeleteApsRegistrantInput,
  condition?: ModelApsRegistrantConditionInput | null,
};

export type DeleteApsRegistrantMutation = {
  deleteApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type CreateApsTempCredentialMutationVariables = {
  input: CreateApsTempCredentialInput,
  condition?: ModelApsTempCredentialConditionInput | null,
};

export type CreateApsTempCredentialMutation = {
  createApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateApsTempCredentialMutationVariables = {
  input: UpdateApsTempCredentialInput,
  condition?: ModelApsTempCredentialConditionInput | null,
};

export type UpdateApsTempCredentialMutation = {
  updateApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteApsTempCredentialMutationVariables = {
  input: DeleteApsTempCredentialInput,
  condition?: ModelApsTempCredentialConditionInput | null,
};

export type DeleteApsTempCredentialMutation = {
  deleteApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateApsAppUserMutationVariables = {
  input: CreateApsAppUserInput,
  condition?: ModelApsAppUserConditionInput | null,
};

export type CreateApsAppUserMutation = {
  createApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsAppUserMutationVariables = {
  input: UpdateApsAppUserInput,
  condition?: ModelApsAppUserConditionInput | null,
};

export type UpdateApsAppUserMutation = {
  updateApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsAppUserMutationVariables = {
  input: DeleteApsAppUserInput,
  condition?: ModelApsAppUserConditionInput | null,
};

export type DeleteApsAppUserMutation = {
  deleteApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsAppUserContactMutationVariables = {
  input: CreateApsAppUserContactInput,
  condition?: ModelApsAppUserContactConditionInput | null,
};

export type CreateApsAppUserContactMutation = {
  createApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type UpdateApsAppUserContactMutationVariables = {
  input: UpdateApsAppUserContactInput,
  condition?: ModelApsAppUserContactConditionInput | null,
};

export type UpdateApsAppUserContactMutation = {
  updateApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type DeleteApsAppUserContactMutationVariables = {
  input: DeleteApsAppUserContactInput,
  condition?: ModelApsAppUserContactConditionInput | null,
};

export type DeleteApsAppUserContactMutation = {
  deleteApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type CreateApsAppUserNoteMutationVariables = {
  input: CreateApsAppUserNoteInput,
  condition?: ModelApsAppUserNoteConditionInput | null,
};

export type CreateApsAppUserNoteMutation = {
  createApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type UpdateApsAppUserNoteMutationVariables = {
  input: UpdateApsAppUserNoteInput,
  condition?: ModelApsAppUserNoteConditionInput | null,
};

export type UpdateApsAppUserNoteMutation = {
  updateApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type DeleteApsAppUserNoteMutationVariables = {
  input: DeleteApsAppUserNoteInput,
  condition?: ModelApsAppUserNoteConditionInput | null,
};

export type DeleteApsAppUserNoteMutation = {
  deleteApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type CreateApsAppUserLeadMutationVariables = {
  input: CreateApsAppUserLeadInput,
  condition?: ModelApsAppUserLeadConditionInput | null,
};

export type CreateApsAppUserLeadMutation = {
  createApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type UpdateApsAppUserLeadMutationVariables = {
  input: UpdateApsAppUserLeadInput,
  condition?: ModelApsAppUserLeadConditionInput | null,
};

export type UpdateApsAppUserLeadMutation = {
  updateApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type DeleteApsAppUserLeadMutationVariables = {
  input: DeleteApsAppUserLeadInput,
  condition?: ModelApsAppUserLeadConditionInput | null,
};

export type DeleteApsAppUserLeadMutation = {
  deleteApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type CreateApsAppUserProfileMutationVariables = {
  input: CreateApsAppUserProfileInput,
  condition?: ModelApsAppUserProfileConditionInput | null,
};

export type CreateApsAppUserProfileMutation = {
  createApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsAppUserProfileMutationVariables = {
  input: UpdateApsAppUserProfileInput,
  condition?: ModelApsAppUserProfileConditionInput | null,
};

export type UpdateApsAppUserProfileMutation = {
  updateApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsAppUserProfileMutationVariables = {
  input: DeleteApsAppUserProfileInput,
  condition?: ModelApsAppUserProfileConditionInput | null,
};

export type DeleteApsAppUserProfileMutation = {
  deleteApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProfileAffiliateMutationVariables = {
  input: CreateProfileAffiliateInput,
  condition?: ModelProfileAffiliateConditionInput | null,
};

export type CreateProfileAffiliateMutation = {
  createProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type UpdateProfileAffiliateMutationVariables = {
  input: UpdateProfileAffiliateInput,
  condition?: ModelProfileAffiliateConditionInput | null,
};

export type UpdateProfileAffiliateMutation = {
  updateProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type DeleteProfileAffiliateMutationVariables = {
  input: DeleteProfileAffiliateInput,
  condition?: ModelProfileAffiliateConditionInput | null,
};

export type DeleteProfileAffiliateMutation = {
  deleteProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type CreateProfileEducationMutationVariables = {
  input: CreateProfileEducationInput,
  condition?: ModelProfileEducationConditionInput | null,
};

export type CreateProfileEducationMutation = {
  createProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type UpdateProfileEducationMutationVariables = {
  input: UpdateProfileEducationInput,
  condition?: ModelProfileEducationConditionInput | null,
};

export type UpdateProfileEducationMutation = {
  updateProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type DeleteProfileEducationMutationVariables = {
  input: DeleteProfileEducationInput,
  condition?: ModelProfileEducationConditionInput | null,
};

export type DeleteProfileEducationMutation = {
  deleteProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type CreateProfileInterestMutationVariables = {
  input: CreateProfileInterestInput,
  condition?: ModelProfileInterestConditionInput | null,
};

export type CreateProfileInterestMutation = {
  createProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type UpdateProfileInterestMutationVariables = {
  input: UpdateProfileInterestInput,
  condition?: ModelProfileInterestConditionInput | null,
};

export type UpdateProfileInterestMutation = {
  updateProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type DeleteProfileInterestMutationVariables = {
  input: DeleteProfileInterestInput,
  condition?: ModelProfileInterestConditionInput | null,
};

export type DeleteProfileInterestMutation = {
  deleteProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type CreateApsAppUserPhotoMutationVariables = {
  input: CreateApsAppUserPhotoInput,
  condition?: ModelApsAppUserPhotoConditionInput | null,
};

export type CreateApsAppUserPhotoMutation = {
  createApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type UpdateApsAppUserPhotoMutationVariables = {
  input: UpdateApsAppUserPhotoInput,
  condition?: ModelApsAppUserPhotoConditionInput | null,
};

export type UpdateApsAppUserPhotoMutation = {
  updateApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type DeleteApsAppUserPhotoMutationVariables = {
  input: DeleteApsAppUserPhotoInput,
  condition?: ModelApsAppUserPhotoConditionInput | null,
};

export type DeleteApsAppUserPhotoMutation = {
  deleteApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type CreateApsAppSessionMutationVariables = {
  input: CreateApsAppSessionInput,
  condition?: ModelApsAppSessionConditionInput | null,
};

export type CreateApsAppSessionMutation = {
  createApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type UpdateApsAppSessionMutationVariables = {
  input: UpdateApsAppSessionInput,
  condition?: ModelApsAppSessionConditionInput | null,
};

export type UpdateApsAppSessionMutation = {
  updateApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type DeleteApsAppSessionMutationVariables = {
  input: DeleteApsAppSessionInput,
  condition?: ModelApsAppSessionConditionInput | null,
};

export type DeleteApsAppSessionMutation = {
  deleteApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type CreateApsAppSessionQuestionMutationVariables = {
  input: CreateApsAppSessionQuestionInput,
  condition?: ModelApsAppSessionQuestionConditionInput | null,
};

export type CreateApsAppSessionQuestionMutation = {
  createApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type UpdateApsAppSessionQuestionMutationVariables = {
  input: UpdateApsAppSessionQuestionInput,
  condition?: ModelApsAppSessionQuestionConditionInput | null,
};

export type UpdateApsAppSessionQuestionMutation = {
  updateApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type DeleteApsAppSessionQuestionMutationVariables = {
  input: DeleteApsAppSessionQuestionInput,
  condition?: ModelApsAppSessionQuestionConditionInput | null,
};

export type DeleteApsAppSessionQuestionMutation = {
  deleteApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type CreateAPSSpeakerMutationVariables = {
  input: CreateAPSSpeakerInput,
  condition?: ModelAPSSpeakerConditionInput | null,
};

export type CreateAPSSpeakerMutation = {
  createAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type UpdateAPSSpeakerMutationVariables = {
  input: UpdateAPSSpeakerInput,
  condition?: ModelAPSSpeakerConditionInput | null,
};

export type UpdateAPSSpeakerMutation = {
  updateAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type DeleteAPSSpeakerMutationVariables = {
  input: DeleteAPSSpeakerInput,
  condition?: ModelAPSSpeakerConditionInput | null,
};

export type DeleteAPSSpeakerMutation = {
  deleteAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type CreateApsSponsorMutationVariables = {
  input: CreateApsSponsorInput,
  condition?: ModelApsSponsorConditionInput | null,
};

export type CreateApsSponsorMutation = {
  createApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type UpdateApsSponsorMutationVariables = {
  input: UpdateApsSponsorInput,
  condition?: ModelApsSponsorConditionInput | null,
};

export type UpdateApsSponsorMutation = {
  updateApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type DeleteApsSponsorMutationVariables = {
  input: DeleteApsSponsorInput,
  condition?: ModelApsSponsorConditionInput | null,
};

export type DeleteApsSponsorMutation = {
  deleteApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type CreateAPSCompanyMutationVariables = {
  input: CreateAPSCompanyInput,
  condition?: ModelAPSCompanyConditionInput | null,
};

export type CreateAPSCompanyMutation = {
  createAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAPSCompanyMutationVariables = {
  input: UpdateAPSCompanyInput,
  condition?: ModelAPSCompanyConditionInput | null,
};

export type UpdateAPSCompanyMutation = {
  updateAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAPSCompanyMutationVariables = {
  input: DeleteAPSCompanyInput,
  condition?: ModelAPSCompanyConditionInput | null,
};

export type DeleteAPSCompanyMutation = {
  deleteAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAPSCompanyContactMutationVariables = {
  input: CreateAPSCompanyContactInput,
  condition?: ModelAPSCompanyContactConditionInput | null,
};

export type CreateAPSCompanyContactMutation = {
  createAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAPSCompanyContactMutationVariables = {
  input: UpdateAPSCompanyContactInput,
  condition?: ModelAPSCompanyContactConditionInput | null,
};

export type UpdateAPSCompanyContactMutation = {
  updateAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAPSCompanyContactMutationVariables = {
  input: DeleteAPSCompanyContactInput,
  condition?: ModelAPSCompanyContactConditionInput | null,
};

export type DeleteAPSCompanyContactMutation = {
  deleteAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsAppExhibitorProfileMutationVariables = {
  input: CreateApsAppExhibitorProfileInput,
  condition?: ModelApsAppExhibitorProfileConditionInput | null,
};

export type CreateApsAppExhibitorProfileMutation = {
  createApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type UpdateApsAppExhibitorProfileMutationVariables = {
  input: UpdateApsAppExhibitorProfileInput,
  condition?: ModelApsAppExhibitorProfileConditionInput | null,
};

export type UpdateApsAppExhibitorProfileMutation = {
  updateApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type DeleteApsAppExhibitorProfileMutationVariables = {
  input: DeleteApsAppExhibitorProfileInput,
  condition?: ModelApsAppExhibitorProfileConditionInput | null,
};

export type DeleteApsAppExhibitorProfileMutation = {
  deleteApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type CreateApsAppExhibitorPromotionMutationVariables = {
  input: CreateApsAppExhibitorPromotionInput,
  condition?: ModelApsAppExhibitorPromotionConditionInput | null,
};

export type CreateApsAppExhibitorPromotionMutation = {
  createApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type UpdateApsAppExhibitorPromotionMutationVariables = {
  input: UpdateApsAppExhibitorPromotionInput,
  condition?: ModelApsAppExhibitorPromotionConditionInput | null,
};

export type UpdateApsAppExhibitorPromotionMutation = {
  updateApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type DeleteApsAppExhibitorPromotionMutationVariables = {
  input: DeleteApsAppExhibitorPromotionInput,
  condition?: ModelApsAppExhibitorPromotionConditionInput | null,
};

export type DeleteApsAppExhibitorPromotionMutation = {
  deleteApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type CreateApsAppExhibitorDealMutationVariables = {
  input: CreateApsAppExhibitorDealInput,
  condition?: ModelApsAppExhibitorDealConditionInput | null,
};

export type CreateApsAppExhibitorDealMutation = {
  createApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type UpdateApsAppExhibitorDealMutationVariables = {
  input: UpdateApsAppExhibitorDealInput,
  condition?: ModelApsAppExhibitorDealConditionInput | null,
};

export type UpdateApsAppExhibitorDealMutation = {
  updateApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type DeleteApsAppExhibitorDealMutationVariables = {
  input: DeleteApsAppExhibitorDealInput,
  condition?: ModelApsAppExhibitorDealConditionInput | null,
};

export type DeleteApsAppExhibitorDealMutation = {
  deleteApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type CreateApsAppExhibitorPhotoMutationVariables = {
  input: CreateApsAppExhibitorPhotoInput,
  condition?: ModelApsAppExhibitorPhotoConditionInput | null,
};

export type CreateApsAppExhibitorPhotoMutation = {
  createApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type UpdateApsAppExhibitorPhotoMutationVariables = {
  input: UpdateApsAppExhibitorPhotoInput,
  condition?: ModelApsAppExhibitorPhotoConditionInput | null,
};

export type UpdateApsAppExhibitorPhotoMutation = {
  updateApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type DeleteApsAppExhibitorPhotoMutationVariables = {
  input: DeleteApsAppExhibitorPhotoInput,
  condition?: ModelApsAppExhibitorPhotoConditionInput | null,
};

export type DeleteApsAppExhibitorPhotoMutation = {
  deleteApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type CreateApsAppExhibitorHandoutMutationVariables = {
  input: CreateApsAppExhibitorHandoutInput,
  condition?: ModelApsAppExhibitorHandoutConditionInput | null,
};

export type CreateApsAppExhibitorHandoutMutation = {
  createApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type UpdateApsAppExhibitorHandoutMutationVariables = {
  input: UpdateApsAppExhibitorHandoutInput,
  condition?: ModelApsAppExhibitorHandoutConditionInput | null,
};

export type UpdateApsAppExhibitorHandoutMutation = {
  updateApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type DeleteApsAppExhibitorHandoutMutationVariables = {
  input: DeleteApsAppExhibitorHandoutInput,
  condition?: ModelApsAppExhibitorHandoutConditionInput | null,
};

export type DeleteApsAppExhibitorHandoutMutation = {
  deleteApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type CreateApsAddOnMutationVariables = {
  input: CreateApsAddOnInput,
  condition?: ModelApsAddOnConditionInput | null,
};

export type CreateApsAddOnMutation = {
  createApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type UpdateApsAddOnMutationVariables = {
  input: UpdateApsAddOnInput,
  condition?: ModelApsAddOnConditionInput | null,
};

export type UpdateApsAddOnMutation = {
  updateApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type DeleteApsAddOnMutationVariables = {
  input: DeleteApsAddOnInput,
  condition?: ModelApsAddOnConditionInput | null,
};

export type DeleteApsAddOnMutation = {
  deleteApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type CreateApsSeatingChartMutationVariables = {
  input: CreateApsSeatingChartInput,
  condition?: ModelApsSeatingChartConditionInput | null,
};

export type CreateApsSeatingChartMutation = {
  createApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsSeatingChartMutationVariables = {
  input: UpdateApsSeatingChartInput,
  condition?: ModelApsSeatingChartConditionInput | null,
};

export type UpdateApsSeatingChartMutation = {
  updateApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsSeatingChartMutationVariables = {
  input: DeleteApsSeatingChartInput,
  condition?: ModelApsSeatingChartConditionInput | null,
};

export type DeleteApsSeatingChartMutation = {
  deleteApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsSeatingChartRegistrantMutationVariables = {
  input: CreateApsSeatingChartRegistrantInput,
  condition?: ModelApsSeatingChartRegistrantConditionInput | null,
};

export type CreateApsSeatingChartRegistrantMutation = {
  createApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type UpdateApsSeatingChartRegistrantMutationVariables = {
  input: UpdateApsSeatingChartRegistrantInput,
  condition?: ModelApsSeatingChartRegistrantConditionInput | null,
};

export type UpdateApsSeatingChartRegistrantMutation = {
  updateApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type DeleteApsSeatingChartRegistrantMutationVariables = {
  input: DeleteApsSeatingChartRegistrantInput,
  condition?: ModelApsSeatingChartRegistrantConditionInput | null,
};

export type DeleteApsSeatingChartRegistrantMutation = {
  deleteApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type CreateApsContactRequestMutationVariables = {
  input: CreateApsContactRequestInput,
  condition?: ModelApsContactRequestConditionInput | null,
};

export type CreateApsContactRequestMutation = {
  createApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsContactRequestMutationVariables = {
  input: UpdateApsContactRequestInput,
  condition?: ModelApsContactRequestConditionInput | null,
};

export type UpdateApsContactRequestMutation = {
  updateApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsContactRequestMutationVariables = {
  input: DeleteApsContactRequestInput,
  condition?: ModelApsContactRequestConditionInput | null,
};

export type DeleteApsContactRequestMutation = {
  deleteApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsDmThreadMutationVariables = {
  input: CreateApsDmThreadInput,
  condition?: ModelApsDmThreadConditionInput | null,
};

export type CreateApsDmThreadMutation = {
  createApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsDmThreadMutationVariables = {
  input: UpdateApsDmThreadInput,
  condition?: ModelApsDmThreadConditionInput | null,
};

export type UpdateApsDmThreadMutation = {
  updateApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsDmThreadMutationVariables = {
  input: DeleteApsDmThreadInput,
  condition?: ModelApsDmThreadConditionInput | null,
};

export type DeleteApsDmThreadMutation = {
  deleteApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsDmParticipantStateMutationVariables = {
  input: CreateApsDmParticipantStateInput,
  condition?: ModelApsDmParticipantStateConditionInput | null,
};

export type CreateApsDmParticipantStateMutation = {
  createApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsDmParticipantStateMutationVariables = {
  input: UpdateApsDmParticipantStateInput,
  condition?: ModelApsDmParticipantStateConditionInput | null,
};

export type UpdateApsDmParticipantStateMutation = {
  updateApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsDmParticipantStateMutationVariables = {
  input: DeleteApsDmParticipantStateInput,
  condition?: ModelApsDmParticipantStateConditionInput | null,
};

export type DeleteApsDmParticipantStateMutation = {
  deleteApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsDmMessageMutationVariables = {
  input: CreateApsDmMessageInput,
  condition?: ModelApsDmMessageConditionInput | null,
};

export type CreateApsDmMessageMutation = {
  createApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsDmMessageMutationVariables = {
  input: UpdateApsDmMessageInput,
  condition?: ModelApsDmMessageConditionInput | null,
};

export type UpdateApsDmMessageMutation = {
  updateApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsDmMessageMutationVariables = {
  input: DeleteApsDmMessageInput,
  condition?: ModelApsDmMessageConditionInput | null,
};

export type DeleteApsDmMessageMutation = {
  deleteApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsAdminAnnouncementMutationVariables = {
  input: CreateApsAdminAnnouncementInput,
  condition?: ModelApsAdminAnnouncementConditionInput | null,
};

export type CreateApsAdminAnnouncementMutation = {
  createApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsAdminAnnouncementMutationVariables = {
  input: UpdateApsAdminAnnouncementInput,
  condition?: ModelApsAdminAnnouncementConditionInput | null,
};

export type UpdateApsAdminAnnouncementMutation = {
  updateApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsAdminAnnouncementMutationVariables = {
  input: DeleteApsAdminAnnouncementInput,
  condition?: ModelApsAdminAnnouncementConditionInput | null,
};

export type DeleteApsAdminAnnouncementMutation = {
  deleteApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsUserEngageStateMutationVariables = {
  input: CreateApsUserEngageStateInput,
  condition?: ModelApsUserEngageStateConditionInput | null,
};

export type CreateApsUserEngageStateMutation = {
  createApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApsUserEngageStateMutationVariables = {
  input: UpdateApsUserEngageStateInput,
  condition?: ModelApsUserEngageStateConditionInput | null,
};

export type UpdateApsUserEngageStateMutation = {
  updateApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApsUserEngageStateMutationVariables = {
  input: DeleteApsUserEngageStateInput,
  condition?: ModelApsUserEngageStateConditionInput | null,
};

export type DeleteApsUserEngageStateMutation = {
  deleteApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateApsPushTokenMutationVariables = {
  input: CreateApsPushTokenInput,
  condition?: ModelApsPushTokenConditionInput | null,
};

export type CreateApsPushTokenMutation = {
  createApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type UpdateApsPushTokenMutationVariables = {
  input: UpdateApsPushTokenInput,
  condition?: ModelApsPushTokenConditionInput | null,
};

export type UpdateApsPushTokenMutation = {
  updateApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type DeleteApsPushTokenMutationVariables = {
  input: DeleteApsPushTokenInput,
  condition?: ModelApsPushTokenConditionInput | null,
};

export type DeleteApsPushTokenMutation = {
  deleteApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type CreateAPSCompanyEventsMutationVariables = {
  input: CreateAPSCompanyEventsInput,
  condition?: ModelAPSCompanyEventsConditionInput | null,
};

export type CreateAPSCompanyEventsMutation = {
  createAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAPSCompanyEventsMutationVariables = {
  input: UpdateAPSCompanyEventsInput,
  condition?: ModelAPSCompanyEventsConditionInput | null,
};

export type UpdateAPSCompanyEventsMutation = {
  updateAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAPSCompanyEventsMutationVariables = {
  input: DeleteAPSCompanyEventsInput,
  condition?: ModelAPSCompanyEventsConditionInput | null,
};

export type DeleteAPSCompanyEventsMutation = {
  deleteAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRegistrantAddOnsRequestedMutationVariables = {
  input: CreateRegistrantAddOnsRequestedInput,
  condition?: ModelRegistrantAddOnsRequestedConditionInput | null,
};

export type CreateRegistrantAddOnsRequestedMutation = {
  createRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRegistrantAddOnsRequestedMutationVariables = {
  input: UpdateRegistrantAddOnsRequestedInput,
  condition?: ModelRegistrantAddOnsRequestedConditionInput | null,
};

export type UpdateRegistrantAddOnsRequestedMutation = {
  updateRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRegistrantAddOnsRequestedMutationVariables = {
  input: DeleteRegistrantAddOnsRequestedInput,
  condition?: ModelRegistrantAddOnsRequestedConditionInput | null,
};

export type DeleteRegistrantAddOnsRequestedMutation = {
  deleteRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRegistrantAddOnsApprovedMutationVariables = {
  input: CreateRegistrantAddOnsApprovedInput,
  condition?: ModelRegistrantAddOnsApprovedConditionInput | null,
};

export type CreateRegistrantAddOnsApprovedMutation = {
  createRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRegistrantAddOnsApprovedMutationVariables = {
  input: UpdateRegistrantAddOnsApprovedInput,
  condition?: ModelRegistrantAddOnsApprovedConditionInput | null,
};

export type UpdateRegistrantAddOnsApprovedMutation = {
  updateRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRegistrantAddOnsApprovedMutationVariables = {
  input: DeleteRegistrantAddOnsApprovedInput,
  condition?: ModelRegistrantAddOnsApprovedConditionInput | null,
};

export type DeleteRegistrantAddOnsApprovedMutation = {
  deleteRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSessionSpeakersMutationVariables = {
  input: CreateSessionSpeakersInput,
  condition?: ModelSessionSpeakersConditionInput | null,
};

export type CreateSessionSpeakersMutation = {
  createSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionSpeakersMutationVariables = {
  input: UpdateSessionSpeakersInput,
  condition?: ModelSessionSpeakersConditionInput | null,
};

export type UpdateSessionSpeakersMutation = {
  updateSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionSpeakersMutationVariables = {
  input: DeleteSessionSpeakersInput,
  condition?: ModelSessionSpeakersConditionInput | null,
};

export type DeleteSessionSpeakersMutation = {
  deleteSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSessionSponsorsMutationVariables = {
  input: CreateSessionSponsorsInput,
  condition?: ModelSessionSponsorsConditionInput | null,
};

export type CreateSessionSponsorsMutation = {
  createSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionSponsorsMutationVariables = {
  input: UpdateSessionSponsorsInput,
  condition?: ModelSessionSponsorsConditionInput | null,
};

export type UpdateSessionSponsorsMutation = {
  updateSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionSponsorsMutationVariables = {
  input: DeleteSessionSponsorsInput,
  condition?: ModelSessionSponsorsConditionInput | null,
};

export type DeleteSessionSponsorsMutation = {
  deleteSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetApsTempCredentialQueryVariables = {
  id: string,
};

export type GetApsTempCredentialQuery = {
  getApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListApsTempCredentialsQueryVariables = {
  filter?: ModelApsTempCredentialFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsTempCredentialsQuery = {
  listApsTempCredentials?:  {
    __typename: "ModelApsTempCredentialConnection",
    items:  Array< {
      __typename: "ApsTempCredential",
      id: string,
      apsID: string,
      registrantId: string,
      email: string,
      tempPasswordCiphertext: string,
      tempPasswordIv: string,
      tempPasswordTag: string,
      expiresAt?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserNoteQueryVariables = {
  id: string,
};

export type GetApsAppUserNoteQuery = {
  getApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type ListApsAppUserNotesQueryVariables = {
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUserNotesQuery = {
  listApsAppUserNotes?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsContactRequestQueryVariables = {
  id: string,
};

export type GetApsContactRequestQuery = {
  getApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsContactRequestsQueryVariables = {
  filter?: ModelApsContactRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsContactRequestsQuery = {
  listApsContactRequests?:  {
    __typename: "ModelApsContactRequestConnection",
    items:  Array< {
      __typename: "ApsContactRequest",
      id: string,
      eventId: string,
      requestKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      requestedByUserId: string,
      status: string,
      acceptedAt?: string | null,
      declinedAt?: string | null,
      blockedAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsDmThreadQueryVariables = {
  id: string,
};

export type GetApsDmThreadQuery = {
  getApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsDmThreadsQueryVariables = {
  filter?: ModelApsDmThreadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsDmThreadsQuery = {
  listApsDmThreads?:  {
    __typename: "ModelApsDmThreadConnection",
    items:  Array< {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsDmParticipantStateQueryVariables = {
  id: string,
};

export type GetApsDmParticipantStateQuery = {
  getApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsDmParticipantStatesQueryVariables = {
  filter?: ModelApsDmParticipantStateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsDmParticipantStatesQuery = {
  listApsDmParticipantStates?:  {
    __typename: "ModelApsDmParticipantStateConnection",
    items:  Array< {
      __typename: "ApsDmParticipantState",
      id: string,
      eventId: string,
      threadId: string,
      userId: string,
      lastReadAt?: string | null,
      unreadCount?: number | null,
      lastMessageAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsDmMessageQueryVariables = {
  id: string,
};

export type GetApsDmMessageQuery = {
  getApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsDmMessagesQueryVariables = {
  filter?: ModelApsDmMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsDmMessagesQuery = {
  listApsDmMessages?:  {
    __typename: "ModelApsDmMessageConnection",
    items:  Array< {
      __typename: "ApsDmMessage",
      id: string,
      eventId: string,
      threadId: string,
      senderUserId: string,
      owners: Array< string >,
      type?: string | null,
      body?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAdminAnnouncementQueryVariables = {
  id: string,
};

export type GetApsAdminAnnouncementQuery = {
  getApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsAdminAnnouncementsQueryVariables = {
  filter?: ModelApsAdminAnnouncementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAdminAnnouncementsQuery = {
  listApsAdminAnnouncements?:  {
    __typename: "ModelApsAdminAnnouncementConnection",
    items:  Array< {
      __typename: "ApsAdminAnnouncement",
      id: string,
      eventId: string,
      title?: string | null,
      body: string,
      deepLink?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsUserEngageStateQueryVariables = {
  id: string,
};

export type GetApsUserEngageStateQuery = {
  getApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsUserEngageStatesQueryVariables = {
  filter?: ModelApsUserEngageStateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsUserEngageStatesQuery = {
  listApsUserEngageStates?:  {
    __typename: "ModelApsUserEngageStateConnection",
    items:  Array< {
      __typename: "ApsUserEngageState",
      id: string,
      eventId: string,
      userId: string,
      lastSeenAnnouncementAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsPushTokenQueryVariables = {
  id: string,
};

export type GetApsPushTokenQuery = {
  getApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type ListApsPushTokensQueryVariables = {
  filter?: ModelApsPushTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsPushTokensQuery = {
  listApsPushTokens?:  {
    __typename: "ModelApsPushTokenConnection",
    items:  Array< {
      __typename: "ApsPushToken",
      id: string,
      userId: string,
      token: string,
      platform?: string | null,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsTempCredentialsByApsIDAndCreatedAtQueryVariables = {
  apsID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsTempCredentialFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsTempCredentialsByApsIDAndCreatedAtQuery = {
  apsTempCredentialsByApsIDAndCreatedAt?:  {
    __typename: "ModelApsTempCredentialConnection",
    items:  Array< {
      __typename: "ApsTempCredential",
      id: string,
      apsID: string,
      registrantId: string,
      email: string,
      tempPasswordCiphertext: string,
      tempPasswordIv: string,
      tempPasswordTag: string,
      expiresAt?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsTempCredentialsByRegistrantIdAndCreatedAtQueryVariables = {
  registrantId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsTempCredentialFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsTempCredentialsByRegistrantIdAndCreatedAtQuery = {
  apsTempCredentialsByRegistrantIdAndCreatedAt?:  {
    __typename: "ModelApsTempCredentialConnection",
    items:  Array< {
      __typename: "ApsTempCredential",
      id: string,
      apsID: string,
      registrantId: string,
      email: string,
      tempPasswordCiphertext: string,
      tempPasswordIv: string,
      tempPasswordTag: string,
      expiresAt?: number | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesByUserIdQuery = {
  apsAppUserNotesByUserId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesBySessionIdQueryVariables = {
  sessionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesBySessionIdQuery = {
  apsAppUserNotesBySessionId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesByExhibitorIdQueryVariables = {
  exhibitorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesByExhibitorIdQuery = {
  apsAppUserNotesByExhibitorId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesByRegistrantIdQueryVariables = {
  registrantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesByRegistrantIdQuery = {
  apsAppUserNotesByRegistrantId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesByProfileIdQueryVariables = {
  profileId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesByProfileIdQuery = {
  apsAppUserNotesByProfileId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserNotesByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserNotesByCompanyIdQuery = {
  apsAppUserNotesByCompanyId?:  {
    __typename: "ModelApsAppUserNoteConnection",
    items:  Array< {
      __typename: "ApsAppUserNote",
      id: string,
      owner?: string | null,
      userId: string,
      note?: string | null,
      sessionId?: string | null,
      exhibitorId?: string | null,
      registrantId?: string | null,
      profileId?: string | null,
      companyId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserNotesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsContactRequestsByRequestKeyQueryVariables = {
  requestKey: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsContactRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsContactRequestsByRequestKeyQuery = {
  apsContactRequestsByRequestKey?:  {
    __typename: "ModelApsContactRequestConnection",
    items:  Array< {
      __typename: "ApsContactRequest",
      id: string,
      eventId: string,
      requestKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      requestedByUserId: string,
      status: string,
      acceptedAt?: string | null,
      declinedAt?: string | null,
      blockedAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsContactRequestsByRequestedByUserIdAndCreatedAtQueryVariables = {
  requestedByUserId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsContactRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsContactRequestsByRequestedByUserIdAndCreatedAtQuery = {
  apsContactRequestsByRequestedByUserIdAndCreatedAt?:  {
    __typename: "ModelApsContactRequestConnection",
    items:  Array< {
      __typename: "ApsContactRequest",
      id: string,
      eventId: string,
      requestKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      requestedByUserId: string,
      status: string,
      acceptedAt?: string | null,
      declinedAt?: string | null,
      blockedAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsContactRequestsByStatusAndUpdatedAtQueryVariables = {
  status: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsContactRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsContactRequestsByStatusAndUpdatedAtQuery = {
  apsContactRequestsByStatusAndUpdatedAt?:  {
    __typename: "ModelApsContactRequestConnection",
    items:  Array< {
      __typename: "ApsContactRequest",
      id: string,
      eventId: string,
      requestKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      requestedByUserId: string,
      status: string,
      acceptedAt?: string | null,
      declinedAt?: string | null,
      blockedAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsDmThreadsByDmKeyQueryVariables = {
  dmKey: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsDmThreadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsDmThreadsByDmKeyQuery = {
  apsDmThreadsByDmKey?:  {
    __typename: "ModelApsDmThreadConnection",
    items:  Array< {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsDmParticipantStatesByThreadIdAndUserIdQueryVariables = {
  threadId: string,
  userId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsDmParticipantStateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsDmParticipantStatesByThreadIdAndUserIdQuery = {
  apsDmParticipantStatesByThreadIdAndUserId?:  {
    __typename: "ModelApsDmParticipantStateConnection",
    items:  Array< {
      __typename: "ApsDmParticipantState",
      id: string,
      eventId: string,
      threadId: string,
      userId: string,
      lastReadAt?: string | null,
      unreadCount?: number | null,
      lastMessageAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsDmParticipantStatesByUserIdAndLastMessageAtQueryVariables = {
  userId: string,
  lastMessageAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsDmParticipantStateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsDmParticipantStatesByUserIdAndLastMessageAtQuery = {
  apsDmParticipantStatesByUserIdAndLastMessageAt?:  {
    __typename: "ModelApsDmParticipantStateConnection",
    items:  Array< {
      __typename: "ApsDmParticipantState",
      id: string,
      eventId: string,
      threadId: string,
      userId: string,
      lastReadAt?: string | null,
      unreadCount?: number | null,
      lastMessageAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsDmMessagesByThreadIdAndCreatedAtQueryVariables = {
  threadId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsDmMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsDmMessagesByThreadIdAndCreatedAtQuery = {
  apsDmMessagesByThreadIdAndCreatedAt?:  {
    __typename: "ModelApsDmMessageConnection",
    items:  Array< {
      __typename: "ApsDmMessage",
      id: string,
      eventId: string,
      threadId: string,
      senderUserId: string,
      owners: Array< string >,
      type?: string | null,
      body?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsDmMessagesBySenderUserIdAndCreatedAtQueryVariables = {
  senderUserId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsDmMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsDmMessagesBySenderUserIdAndCreatedAtQuery = {
  apsDmMessagesBySenderUserIdAndCreatedAt?:  {
    __typename: "ModelApsDmMessageConnection",
    items:  Array< {
      __typename: "ApsDmMessage",
      id: string,
      eventId: string,
      threadId: string,
      senderUserId: string,
      owners: Array< string >,
      type?: string | null,
      body?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAdminAnnouncementsByEventIdAndCreatedAtQueryVariables = {
  eventId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAdminAnnouncementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAdminAnnouncementsByEventIdAndCreatedAtQuery = {
  apsAdminAnnouncementsByEventIdAndCreatedAt?:  {
    __typename: "ModelApsAdminAnnouncementConnection",
    items:  Array< {
      __typename: "ApsAdminAnnouncement",
      id: string,
      eventId: string,
      title?: string | null,
      body: string,
      deepLink?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsPushTokensByUserIdAndUpdatedAtQueryVariables = {
  userId: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsPushTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsPushTokensByUserIdAndUpdatedAtQuery = {
  apsPushTokensByUserIdAndUpdatedAt?:  {
    __typename: "ModelApsPushTokenConnection",
    items:  Array< {
      __typename: "ApsPushToken",
      id: string,
      userId: string,
      token: string,
      platform?: string | null,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSQueryVariables = {
  id: string,
};

export type GetAPSQuery = {
  getAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type ListAPSQueryVariables = {
  filter?: ModelAPSFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSQuery = {
  listAPS?:  {
    __typename: "ModelAPSConnection",
    items:  Array< {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSBoardQueryVariables = {
  id: string,
};

export type GetAPSBoardQuery = {
  getAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAPSBoardsQueryVariables = {
  filter?: ModelAPSBoardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSBoardsQuery = {
  listAPSBoards?:  {
    __typename: "ModelAPSBoardConnection",
    items:  Array< {
      __typename: "APSBoard",
      id: string,
      name: string,
      title?: string | null,
      bio?: string | null,
      company: string,
      email: string,
      linkedin?: string | null,
      profilePic?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAgendaQueryVariables = {
  id: string,
};

export type GetApsAgendaQuery = {
  getApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsAgendaQueryVariables = {
  filter?: ModelApsAgendaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAgendaQuery = {
  listApsAgenda?:  {
    __typename: "ModelApsAgendaConnection",
    items:  Array< {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAgendaByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAgendaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAgendaByEventIdQuery = {
  apsAgendaByEventId?:  {
    __typename: "ModelApsAgendaConnection",
    items:  Array< {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsRegistrantQueryVariables = {
  id: string,
};

export type GetApsRegistrantQuery = {
  getApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type ListApsRegistrantsQueryVariables = {
  filter?: ModelApsRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsRegistrantsQuery = {
  listApsRegistrants?:  {
    __typename: "ModelApsRegistrantConnection",
    items:  Array< {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsRegistrantsByApsIDQueryVariables = {
  apsID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsRegistrantsByApsIDQuery = {
  apsRegistrantsByApsID?:  {
    __typename: "ModelApsRegistrantConnection",
    items:  Array< {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsRegistrantsByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsRegistrantsByCompanyIdQuery = {
  apsRegistrantsByCompanyId?:  {
    __typename: "ModelApsRegistrantConnection",
    items:  Array< {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserQueryVariables = {
  id: string,
};

export type GetApsAppUserQuery = {
  getApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsAppUsersQueryVariables = {
  filter?: ModelApsAppUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUsersQuery = {
  listApsAppUsers?:  {
    __typename: "ModelApsAppUserConnection",
    items:  Array< {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUsersByRegistrantIdQueryVariables = {
  registrantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUsersByRegistrantIdQuery = {
  apsAppUsersByRegistrantId?:  {
    __typename: "ModelApsAppUserConnection",
    items:  Array< {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserContactQueryVariables = {
  id: string,
};

export type GetApsAppUserContactQuery = {
  getApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type ListApsAppUserContactsQueryVariables = {
  filter?: ModelApsAppUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUserContactsQuery = {
  listApsAppUserContacts?:  {
    __typename: "ModelApsAppUserContactConnection",
    items:  Array< {
      __typename: "ApsAppUserContact",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserContactsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserContactsByUserIdQuery = {
  apsAppUserContactsByUserId?:  {
    __typename: "ModelApsAppUserContactConnection",
    items:  Array< {
      __typename: "ApsAppUserContact",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserContactsByContactIdQueryVariables = {
  contactId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserContactsByContactIdQuery = {
  apsAppUserContactsByContactId?:  {
    __typename: "ModelApsAppUserContactConnection",
    items:  Array< {
      __typename: "ApsAppUserContact",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserLeadQueryVariables = {
  id: string,
};

export type GetApsAppUserLeadQuery = {
  getApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type ListApsAppUserLeadsQueryVariables = {
  filter?: ModelApsAppUserLeadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUserLeadsQuery = {
  listApsAppUserLeads?:  {
    __typename: "ModelApsAppUserLeadConnection",
    items:  Array< {
      __typename: "ApsAppUserLead",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserLeadsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserLeadsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserLeadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserLeadsByUserIdQuery = {
  apsAppUserLeadsByUserId?:  {
    __typename: "ModelApsAppUserLeadConnection",
    items:  Array< {
      __typename: "ApsAppUserLead",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserLeadsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserLeadsByContactIdQueryVariables = {
  contactId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserLeadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserLeadsByContactIdQuery = {
  apsAppUserLeadsByContactId?:  {
    __typename: "ModelApsAppUserLeadConnection",
    items:  Array< {
      __typename: "ApsAppUserLead",
      id: string,
      userId: string,
      favorite?: boolean | null,
      contactId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserLeadsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserProfileQueryVariables = {
  id: string,
};

export type GetApsAppUserProfileQuery = {
  getApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsAppUserProfilesQueryVariables = {
  filter?: ModelApsAppUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUserProfilesQuery = {
  listApsAppUserProfiles?:  {
    __typename: "ModelApsAppUserProfileConnection",
    items:  Array< {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserProfilesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserProfilesByUserIdQuery = {
  apsAppUserProfilesByUserId?:  {
    __typename: "ModelApsAppUserProfileConnection",
    items:  Array< {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserProfilesBySpeakerIdQueryVariables = {
  speakerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserProfilesBySpeakerIdQuery = {
  apsAppUserProfilesBySpeakerId?:  {
    __typename: "ModelApsAppUserProfileConnection",
    items:  Array< {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProfileAffiliateQueryVariables = {
  id: string,
};

export type GetProfileAffiliateQuery = {
  getProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type ListProfileAffiliatesQueryVariables = {
  filter?: ModelProfileAffiliateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfileAffiliatesQuery = {
  listProfileAffiliates?:  {
    __typename: "ModelProfileAffiliateConnection",
    items:  Array< {
      __typename: "ProfileAffiliate",
      id: string,
      profileId: string,
      affiliate?: string | null,
      role?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileAffiliatesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProfileAffiliatesByProfileIdQueryVariables = {
  profileId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProfileAffiliateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProfileAffiliatesByProfileIdQuery = {
  profileAffiliatesByProfileId?:  {
    __typename: "ModelProfileAffiliateConnection",
    items:  Array< {
      __typename: "ProfileAffiliate",
      id: string,
      profileId: string,
      affiliate?: string | null,
      role?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileAffiliatesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProfileEducationQueryVariables = {
  id: string,
};

export type GetProfileEducationQuery = {
  getProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type ListProfileEducationsQueryVariables = {
  filter?: ModelProfileEducationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfileEducationsQuery = {
  listProfileEducations?:  {
    __typename: "ModelProfileEducationConnection",
    items:  Array< {
      __typename: "ProfileEducation",
      id: string,
      profileId: string,
      school?: string | null,
      degree?: string | null,
      fieldOfStudy?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileEducationId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProfileEducationsByProfileIdQueryVariables = {
  profileId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProfileEducationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProfileEducationsByProfileIdQuery = {
  profileEducationsByProfileId?:  {
    __typename: "ModelProfileEducationConnection",
    items:  Array< {
      __typename: "ProfileEducation",
      id: string,
      profileId: string,
      school?: string | null,
      degree?: string | null,
      fieldOfStudy?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileEducationId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProfileInterestQueryVariables = {
  id: string,
};

export type GetProfileInterestQuery = {
  getProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type ListProfileInterestsQueryVariables = {
  filter?: ModelProfileInterestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfileInterestsQuery = {
  listProfileInterests?:  {
    __typename: "ModelProfileInterestConnection",
    items:  Array< {
      __typename: "ProfileInterest",
      id: string,
      profileId: string,
      interest?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileInterestsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProfileInterestsByProfileIdQueryVariables = {
  profileId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProfileInterestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProfileInterestsByProfileIdQuery = {
  profileInterestsByProfileId?:  {
    __typename: "ModelProfileInterestConnection",
    items:  Array< {
      __typename: "ProfileInterest",
      id: string,
      profileId: string,
      interest?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAppUserProfileInterestsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppUserPhotoQueryVariables = {
  id: string,
};

export type GetApsAppUserPhotoQuery = {
  getApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type ListApsAppUserPhotosQueryVariables = {
  filter?: ModelApsAppUserPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppUserPhotosQuery = {
  listApsAppUserPhotos?:  {
    __typename: "ModelApsAppUserPhotoConnection",
    items:  Array< {
      __typename: "ApsAppUserPhoto",
      id: string,
      userId?: string | null,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSPhotosId?: string | null,
      apsAppUserPhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserPhotosByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserPhotosByUserIdQuery = {
  apsAppUserPhotosByUserId?:  {
    __typename: "ModelApsAppUserPhotoConnection",
    items:  Array< {
      __typename: "ApsAppUserPhoto",
      id: string,
      userId?: string | null,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSPhotosId?: string | null,
      apsAppUserPhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppUserPhotosByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppUserPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppUserPhotosByEventIdQuery = {
  apsAppUserPhotosByEventId?:  {
    __typename: "ModelApsAppUserPhotoConnection",
    items:  Array< {
      __typename: "ApsAppUserPhoto",
      id: string,
      userId?: string | null,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSPhotosId?: string | null,
      apsAppUserPhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppSessionQueryVariables = {
  id: string,
};

export type GetApsAppSessionQuery = {
  getApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type ListApsAppSessionsQueryVariables = {
  filter?: ModelApsAppSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppSessionsQuery = {
  listApsAppSessions?:  {
    __typename: "ModelApsAppSessionConnection",
    items:  Array< {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppSessionsByAgendaIdQueryVariables = {
  agendaId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppSessionsByAgendaIdQuery = {
  apsAppSessionsByAgendaId?:  {
    __typename: "ModelApsAppSessionConnection",
    items:  Array< {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppSessionQuestionQueryVariables = {
  id: string,
};

export type GetApsAppSessionQuestionQuery = {
  getApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type ListApsAppSessionQuestionsQueryVariables = {
  filter?: ModelApsAppSessionQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppSessionQuestionsQuery = {
  listApsAppSessionQuestions?:  {
    __typename: "ModelApsAppSessionQuestionConnection",
    items:  Array< {
      __typename: "ApsAppSessionQuestion",
      id: string,
      sessionId: string,
      question?: string | null,
      userId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserSessionQuestionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppSessionQuestionsBySessionIdQueryVariables = {
  sessionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppSessionQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppSessionQuestionsBySessionIdQuery = {
  apsAppSessionQuestionsBySessionId?:  {
    __typename: "ModelApsAppSessionQuestionConnection",
    items:  Array< {
      __typename: "ApsAppSessionQuestion",
      id: string,
      sessionId: string,
      question?: string | null,
      userId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserSessionQuestionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppSessionQuestionsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppSessionQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppSessionQuestionsByUserIdQuery = {
  apsAppSessionQuestionsByUserId?:  {
    __typename: "ModelApsAppSessionQuestionConnection",
    items:  Array< {
      __typename: "ApsAppSessionQuestion",
      id: string,
      sessionId: string,
      question?: string | null,
      userId: string,
      createdAt: string,
      updatedAt: string,
      apsAppUserSessionQuestionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSSpeakerQueryVariables = {
  id: string,
};

export type GetAPSSpeakerQuery = {
  getAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type ListAPSSpeakersQueryVariables = {
  filter?: ModelAPSSpeakerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSSpeakersQuery = {
  listAPSSpeakers?:  {
    __typename: "ModelAPSSpeakerConnection",
    items:  Array< {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type APSSpeakersByProfileIdAndEventIdQueryVariables = {
  profileId: string,
  eventId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAPSSpeakerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type APSSpeakersByProfileIdAndEventIdQuery = {
  aPSSpeakersByProfileIdAndEventId?:  {
    __typename: "ModelAPSSpeakerConnection",
    items:  Array< {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type APSSpeakersByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAPSSpeakerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type APSSpeakersByEventIdQuery = {
  aPSSpeakersByEventId?:  {
    __typename: "ModelAPSSpeakerConnection",
    items:  Array< {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsSponsorQueryVariables = {
  id: string,
};

export type GetApsSponsorQuery = {
  getApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type ListApsSponsorsQueryVariables = {
  filter?: ModelApsSponsorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsSponsorsQuery = {
  listApsSponsors?:  {
    __typename: "ModelApsSponsorConnection",
    items:  Array< {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsSponsorsByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsSponsorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsSponsorsByCompanyIdQuery = {
  apsSponsorsByCompanyId?:  {
    __typename: "ModelApsSponsorConnection",
    items:  Array< {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsSponsorsByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsSponsorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsSponsorsByEventIdQuery = {
  apsSponsorsByEventId?:  {
    __typename: "ModelApsSponsorConnection",
    items:  Array< {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSCompanyQueryVariables = {
  id: string,
};

export type GetAPSCompanyQuery = {
  getAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAPSCompaniesQueryVariables = {
  filter?: ModelAPSCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSCompaniesQuery = {
  listAPSCompanies?:  {
    __typename: "ModelAPSCompanyConnection",
    items:  Array< {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSCompanyContactQueryVariables = {
  id: string,
};

export type GetAPSCompanyContactQuery = {
  getAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAPSCompanyContactsQueryVariables = {
  filter?: ModelAPSCompanyContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSCompanyContactsQuery = {
  listAPSCompanyContacts?:  {
    __typename: "ModelAPSCompanyContactConnection",
    items:  Array< {
      __typename: "APSCompanyContact",
      id: string,
      companyId: string,
      name?: string | null,
      email: string,
      phone?: string | null,
      title?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type APSCompanyContactsByCompanyIdAndCreatedAtQueryVariables = {
  companyId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAPSCompanyContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type APSCompanyContactsByCompanyIdAndCreatedAtQuery = {
  aPSCompanyContactsByCompanyIdAndCreatedAt?:  {
    __typename: "ModelAPSCompanyContactConnection",
    items:  Array< {
      __typename: "APSCompanyContact",
      id: string,
      companyId: string,
      name?: string | null,
      email: string,
      phone?: string | null,
      title?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppExhibitorProfileQueryVariables = {
  id: string,
};

export type GetApsAppExhibitorProfileQuery = {
  getApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type ListApsAppExhibitorProfilesQueryVariables = {
  filter?: ModelApsAppExhibitorProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppExhibitorProfilesQuery = {
  listApsAppExhibitorProfiles?:  {
    __typename: "ModelApsAppExhibitorProfileConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorProfilesByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorProfilesByCompanyIdQuery = {
  apsAppExhibitorProfilesByCompanyId?:  {
    __typename: "ModelApsAppExhibitorProfileConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorProfilesBySponsorIdQueryVariables = {
  sponsorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorProfilesBySponsorIdQuery = {
  apsAppExhibitorProfilesBySponsorId?:  {
    __typename: "ModelApsAppExhibitorProfileConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorProfilesByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorProfilesByEventIdQuery = {
  apsAppExhibitorProfilesByEventId?:  {
    __typename: "ModelApsAppExhibitorProfileConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppExhibitorPromotionQueryVariables = {
  id: string,
};

export type GetApsAppExhibitorPromotionQuery = {
  getApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type ListApsAppExhibitorPromotionsQueryVariables = {
  filter?: ModelApsAppExhibitorPromotionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppExhibitorPromotionsQuery = {
  listApsAppExhibitorPromotions?:  {
    __typename: "ModelApsAppExhibitorPromotionConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPromotion",
      id: string,
      exhibitorId: string,
      promotion?: string | null,
      link?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPromotionsId?: string | null,
      apsAppExhibitorProfilePromotionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorPromotionsByExhibitorIdQueryVariables = {
  exhibitorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorPromotionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorPromotionsByExhibitorIdQuery = {
  apsAppExhibitorPromotionsByExhibitorId?:  {
    __typename: "ModelApsAppExhibitorPromotionConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPromotion",
      id: string,
      exhibitorId: string,
      promotion?: string | null,
      link?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPromotionsId?: string | null,
      apsAppExhibitorProfilePromotionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorPromotionsByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorPromotionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorPromotionsByEventIdQuery = {
  apsAppExhibitorPromotionsByEventId?:  {
    __typename: "ModelApsAppExhibitorPromotionConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPromotion",
      id: string,
      exhibitorId: string,
      promotion?: string | null,
      link?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPromotionsId?: string | null,
      apsAppExhibitorProfilePromotionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppExhibitorDealQueryVariables = {
  id: string,
};

export type GetApsAppExhibitorDealQuery = {
  getApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type ListApsAppExhibitorDealsQueryVariables = {
  filter?: ModelApsAppExhibitorDealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppExhibitorDealsQuery = {
  listApsAppExhibitorDeals?:  {
    __typename: "ModelApsAppExhibitorDealConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorDeal",
      id: string,
      exhibitorId: string,
      deal?: string | null,
      link?: string | null,
      userId?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorDealsId?: string | null,
      apsAppUserExhibitorDealsId?: string | null,
      apsAppExhibitorProfileDealsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorDealsByExhibitorIdQueryVariables = {
  exhibitorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorDealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorDealsByExhibitorIdQuery = {
  apsAppExhibitorDealsByExhibitorId?:  {
    __typename: "ModelApsAppExhibitorDealConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorDeal",
      id: string,
      exhibitorId: string,
      deal?: string | null,
      link?: string | null,
      userId?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorDealsId?: string | null,
      apsAppUserExhibitorDealsId?: string | null,
      apsAppExhibitorProfileDealsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorDealsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorDealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorDealsByUserIdQuery = {
  apsAppExhibitorDealsByUserId?:  {
    __typename: "ModelApsAppExhibitorDealConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorDeal",
      id: string,
      exhibitorId: string,
      deal?: string | null,
      link?: string | null,
      userId?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorDealsId?: string | null,
      apsAppUserExhibitorDealsId?: string | null,
      apsAppExhibitorProfileDealsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorDealsByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorDealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorDealsByEventIdQuery = {
  apsAppExhibitorDealsByEventId?:  {
    __typename: "ModelApsAppExhibitorDealConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorDeal",
      id: string,
      exhibitorId: string,
      deal?: string | null,
      link?: string | null,
      userId?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorDealsId?: string | null,
      apsAppUserExhibitorDealsId?: string | null,
      apsAppExhibitorProfileDealsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppExhibitorPhotoQueryVariables = {
  id: string,
};

export type GetApsAppExhibitorPhotoQuery = {
  getApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type ListApsAppExhibitorPhotosQueryVariables = {
  filter?: ModelApsAppExhibitorPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppExhibitorPhotosQuery = {
  listApsAppExhibitorPhotos?:  {
    __typename: "ModelApsAppExhibitorPhotoConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPhoto",
      id: string,
      exhibitorId: string,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPhotosId?: string | null,
      apsAppExhibitorProfilePhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorPhotosByExhibitorIdQueryVariables = {
  exhibitorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorPhotosByExhibitorIdQuery = {
  apsAppExhibitorPhotosByExhibitorId?:  {
    __typename: "ModelApsAppExhibitorPhotoConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPhoto",
      id: string,
      exhibitorId: string,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPhotosId?: string | null,
      apsAppExhibitorProfilePhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorPhotosByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorPhotosByEventIdQuery = {
  apsAppExhibitorPhotosByEventId?:  {
    __typename: "ModelApsAppExhibitorPhotoConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorPhoto",
      id: string,
      exhibitorId: string,
      photo?: string | null,
      caption?: string | null,
      approved?: boolean | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorPhotosId?: string | null,
      apsAppExhibitorProfilePhotosId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAppExhibitorHandoutQueryVariables = {
  id: string,
};

export type GetApsAppExhibitorHandoutQuery = {
  getApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type ListApsAppExhibitorHandoutsQueryVariables = {
  filter?: ModelApsAppExhibitorHandoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAppExhibitorHandoutsQuery = {
  listApsAppExhibitorHandouts?:  {
    __typename: "ModelApsAppExhibitorHandoutConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorHandout",
      id: string,
      exhibitorId: string,
      handout?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorHandoutsId?: string | null,
      apsAppExhibitorProfileHandoutsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorHandoutsByExhibitorIdQueryVariables = {
  exhibitorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorHandoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorHandoutsByExhibitorIdQuery = {
  apsAppExhibitorHandoutsByExhibitorId?:  {
    __typename: "ModelApsAppExhibitorHandoutConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorHandout",
      id: string,
      exhibitorId: string,
      handout?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorHandoutsId?: string | null,
      apsAppExhibitorProfileHandoutsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAppExhibitorHandoutsByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAppExhibitorHandoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAppExhibitorHandoutsByEventIdQuery = {
  apsAppExhibitorHandoutsByEventId?:  {
    __typename: "ModelApsAppExhibitorHandoutConnection",
    items:  Array< {
      __typename: "ApsAppExhibitorHandout",
      id: string,
      exhibitorId: string,
      handout?: string | null,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorHandoutsId?: string | null,
      apsAppExhibitorProfileHandoutsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsAddOnQueryVariables = {
  id: string,
};

export type GetApsAddOnQuery = {
  getApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type ListApsAddOnsQueryVariables = {
  filter?: ModelApsAddOnFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsAddOnsQuery = {
  listApsAddOns?:  {
    __typename: "ModelApsAddOnConnection",
    items:  Array< {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsAddOnsByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsAddOnFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsAddOnsByEventIdQuery = {
  apsAddOnsByEventId?:  {
    __typename: "ModelApsAddOnConnection",
    items:  Array< {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsSeatingChartQueryVariables = {
  id: string,
};

export type GetApsSeatingChartQuery = {
  getApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApsSeatingChartsQueryVariables = {
  filter?: ModelApsSeatingChartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsSeatingChartsQuery = {
  listApsSeatingCharts?:  {
    __typename: "ModelApsSeatingChartConnection",
    items:  Array< {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApsSeatingChartRegistrantQueryVariables = {
  id: string,
};

export type GetApsSeatingChartRegistrantQuery = {
  getApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type ListApsSeatingChartRegistrantsQueryVariables = {
  filter?: ModelApsSeatingChartRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApsSeatingChartRegistrantsQuery = {
  listApsSeatingChartRegistrants?:  {
    __typename: "ModelApsSeatingChartRegistrantConnection",
    items:  Array< {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsSeatingChartRegistrantsBySeatingChartIDQueryVariables = {
  seatingChartID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsSeatingChartRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsSeatingChartRegistrantsBySeatingChartIDQuery = {
  apsSeatingChartRegistrantsBySeatingChartID?:  {
    __typename: "ModelApsSeatingChartRegistrantConnection",
    items:  Array< {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApsSeatingChartRegistrantsByRegistrantIDQueryVariables = {
  registrantID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApsSeatingChartRegistrantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApsSeatingChartRegistrantsByRegistrantIDQuery = {
  apsSeatingChartRegistrantsByRegistrantID?:  {
    __typename: "ModelApsSeatingChartRegistrantConnection",
    items:  Array< {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAPSCompanyEventsQueryVariables = {
  id: string,
};

export type GetAPSCompanyEventsQuery = {
  getAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAPSCompanyEventsQueryVariables = {
  filter?: ModelAPSCompanyEventsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAPSCompanyEventsQuery = {
  listAPSCompanyEvents?:  {
    __typename: "ModelAPSCompanyEventsConnection",
    items:  Array< {
      __typename: "APSCompanyEvents",
      id: string,
      aPSId: string,
      aPSCompanyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type APSCompanyEventsByAPSIdQueryVariables = {
  aPSId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAPSCompanyEventsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type APSCompanyEventsByAPSIdQuery = {
  aPSCompanyEventsByAPSId?:  {
    __typename: "ModelAPSCompanyEventsConnection",
    items:  Array< {
      __typename: "APSCompanyEvents",
      id: string,
      aPSId: string,
      aPSCompanyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type APSCompanyEventsByAPSCompanyIdQueryVariables = {
  aPSCompanyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAPSCompanyEventsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type APSCompanyEventsByAPSCompanyIdQuery = {
  aPSCompanyEventsByAPSCompanyId?:  {
    __typename: "ModelAPSCompanyEventsConnection",
    items:  Array< {
      __typename: "APSCompanyEvents",
      id: string,
      aPSId: string,
      aPSCompanyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRegistrantAddOnsRequestedQueryVariables = {
  id: string,
};

export type GetRegistrantAddOnsRequestedQuery = {
  getRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRegistrantAddOnsRequestedsQueryVariables = {
  filter?: ModelRegistrantAddOnsRequestedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRegistrantAddOnsRequestedsQuery = {
  listRegistrantAddOnsRequesteds?:  {
    __typename: "ModelRegistrantAddOnsRequestedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsRequested",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrantAddOnsRequestedsByApsRegistrantIdQueryVariables = {
  apsRegistrantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrantAddOnsRequestedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrantAddOnsRequestedsByApsRegistrantIdQuery = {
  registrantAddOnsRequestedsByApsRegistrantId?:  {
    __typename: "ModelRegistrantAddOnsRequestedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsRequested",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrantAddOnsRequestedsByApsAddOnIdQueryVariables = {
  apsAddOnId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrantAddOnsRequestedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrantAddOnsRequestedsByApsAddOnIdQuery = {
  registrantAddOnsRequestedsByApsAddOnId?:  {
    __typename: "ModelRegistrantAddOnsRequestedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsRequested",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRegistrantAddOnsApprovedQueryVariables = {
  id: string,
};

export type GetRegistrantAddOnsApprovedQuery = {
  getRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRegistrantAddOnsApprovedsQueryVariables = {
  filter?: ModelRegistrantAddOnsApprovedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRegistrantAddOnsApprovedsQuery = {
  listRegistrantAddOnsApproveds?:  {
    __typename: "ModelRegistrantAddOnsApprovedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsApproved",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrantAddOnsApprovedsByApsRegistrantIdQueryVariables = {
  apsRegistrantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrantAddOnsApprovedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrantAddOnsApprovedsByApsRegistrantIdQuery = {
  registrantAddOnsApprovedsByApsRegistrantId?:  {
    __typename: "ModelRegistrantAddOnsApprovedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsApproved",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RegistrantAddOnsApprovedsByApsAddOnIdQueryVariables = {
  apsAddOnId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRegistrantAddOnsApprovedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RegistrantAddOnsApprovedsByApsAddOnIdQuery = {
  registrantAddOnsApprovedsByApsAddOnId?:  {
    __typename: "ModelRegistrantAddOnsApprovedConnection",
    items:  Array< {
      __typename: "RegistrantAddOnsApproved",
      id: string,
      apsRegistrantId: string,
      apsAddOnId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSessionSpeakersQueryVariables = {
  id: string,
};

export type GetSessionSpeakersQuery = {
  getSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionSpeakersQueryVariables = {
  filter?: ModelSessionSpeakersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionSpeakersQuery = {
  listSessionSpeakers?:  {
    __typename: "ModelSessionSpeakersConnection",
    items:  Array< {
      __typename: "SessionSpeakers",
      id: string,
      apsAppSessionId: string,
      aPSSpeakerId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SessionSpeakersByApsAppSessionIdQueryVariables = {
  apsAppSessionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionSpeakersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionSpeakersByApsAppSessionIdQuery = {
  sessionSpeakersByApsAppSessionId?:  {
    __typename: "ModelSessionSpeakersConnection",
    items:  Array< {
      __typename: "SessionSpeakers",
      id: string,
      apsAppSessionId: string,
      aPSSpeakerId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SessionSpeakersByAPSSpeakerIdQueryVariables = {
  aPSSpeakerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionSpeakersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionSpeakersByAPSSpeakerIdQuery = {
  sessionSpeakersByAPSSpeakerId?:  {
    __typename: "ModelSessionSpeakersConnection",
    items:  Array< {
      __typename: "SessionSpeakers",
      id: string,
      apsAppSessionId: string,
      aPSSpeakerId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSessionSponsorsQueryVariables = {
  id: string,
};

export type GetSessionSponsorsQuery = {
  getSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionSponsorsQueryVariables = {
  filter?: ModelSessionSponsorsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionSponsorsQuery = {
  listSessionSponsors?:  {
    __typename: "ModelSessionSponsorsConnection",
    items:  Array< {
      __typename: "SessionSponsors",
      id: string,
      apsAppSessionId: string,
      apsSponsorId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SessionSponsorsByApsAppSessionIdQueryVariables = {
  apsAppSessionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionSponsorsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionSponsorsByApsAppSessionIdQuery = {
  sessionSponsorsByApsAppSessionId?:  {
    __typename: "ModelSessionSponsorsConnection",
    items:  Array< {
      __typename: "SessionSponsors",
      id: string,
      apsAppSessionId: string,
      apsSponsorId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SessionSponsorsByApsSponsorIdQueryVariables = {
  apsSponsorId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionSponsorsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SessionSponsorsByApsSponsorIdQuery = {
  sessionSponsorsByApsSponsorId?:  {
    __typename: "ModelSessionSponsorsConnection",
    items:  Array< {
      __typename: "SessionSponsors",
      id: string,
      apsAppSessionId: string,
      apsSponsorId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateApsTempCredentialSubscriptionVariables = {
  filter?: ModelSubscriptionApsTempCredentialFilterInput | null,
};

export type OnCreateApsTempCredentialSubscription = {
  onCreateApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateApsTempCredentialSubscriptionVariables = {
  filter?: ModelSubscriptionApsTempCredentialFilterInput | null,
};

export type OnUpdateApsTempCredentialSubscription = {
  onUpdateApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteApsTempCredentialSubscriptionVariables = {
  filter?: ModelSubscriptionApsTempCredentialFilterInput | null,
};

export type OnDeleteApsTempCredentialSubscription = {
  onDeleteApsTempCredential?:  {
    __typename: "ApsTempCredential",
    id: string,
    apsID: string,
    registrantId: string,
    email: string,
    tempPasswordCiphertext: string,
    tempPasswordIv: string,
    tempPasswordTag: string,
    expiresAt?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateApsAppUserNoteSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserNoteFilterInput | null,
  owner?: string | null,
};

export type OnCreateApsAppUserNoteSubscription = {
  onCreateApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type OnUpdateApsAppUserNoteSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserNoteFilterInput | null,
  owner?: string | null,
};

export type OnUpdateApsAppUserNoteSubscription = {
  onUpdateApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type OnDeleteApsAppUserNoteSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserNoteFilterInput | null,
  owner?: string | null,
};

export type OnDeleteApsAppUserNoteSubscription = {
  onDeleteApsAppUserNote?:  {
    __typename: "ApsAppUserNote",
    id: string,
    owner?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    note?: string | null,
    sessionId?: string | null,
    session?:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    } | null,
    exhibitorId?: string | null,
    exhibitor?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    registrantId?: string | null,
    registrant?:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserNotesId?: string | null,
  } | null,
};

export type OnCreateApsContactRequestSubscriptionVariables = {
  filter?: ModelSubscriptionApsContactRequestFilterInput | null,
};

export type OnCreateApsContactRequestSubscription = {
  onCreateApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsContactRequestSubscriptionVariables = {
  filter?: ModelSubscriptionApsContactRequestFilterInput | null,
};

export type OnUpdateApsContactRequestSubscription = {
  onUpdateApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsContactRequestSubscriptionVariables = {
  filter?: ModelSubscriptionApsContactRequestFilterInput | null,
};

export type OnDeleteApsContactRequestSubscription = {
  onDeleteApsContactRequest?:  {
    __typename: "ApsContactRequest",
    id: string,
    eventId: string,
    requestKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    requestedByUserId: string,
    status: string,
    acceptedAt?: string | null,
    declinedAt?: string | null,
    blockedAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsDmThreadSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmThreadFilterInput | null,
};

export type OnCreateApsDmThreadSubscription = {
  onCreateApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsDmThreadSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmThreadFilterInput | null,
};

export type OnUpdateApsDmThreadSubscription = {
  onUpdateApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsDmThreadSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmThreadFilterInput | null,
};

export type OnDeleteApsDmThreadSubscription = {
  onDeleteApsDmThread?:  {
    __typename: "ApsDmThread",
    id: string,
    eventId: string,
    dmKey: string,
    userAId: string,
    userBId: string,
    owners: Array< string >,
    participantStates?:  {
      __typename: "ModelApsDmParticipantStateConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    lastMessageAt?: string | null,
    lastMessagePreview?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsDmParticipantStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmParticipantStateFilterInput | null,
  userId?: string | null,
};

export type OnCreateApsDmParticipantStateSubscription = {
  onCreateApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsDmParticipantStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmParticipantStateFilterInput | null,
  userId?: string | null,
};

export type OnUpdateApsDmParticipantStateSubscription = {
  onUpdateApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsDmParticipantStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmParticipantStateFilterInput | null,
  userId?: string | null,
};

export type OnDeleteApsDmParticipantStateSubscription = {
  onDeleteApsDmParticipantState?:  {
    __typename: "ApsDmParticipantState",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    userId: string,
    lastReadAt?: string | null,
    unreadCount?: number | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsDmMessageSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmMessageFilterInput | null,
};

export type OnCreateApsDmMessageSubscription = {
  onCreateApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsDmMessageSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmMessageFilterInput | null,
};

export type OnUpdateApsDmMessageSubscription = {
  onUpdateApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsDmMessageSubscriptionVariables = {
  filter?: ModelSubscriptionApsDmMessageFilterInput | null,
};

export type OnDeleteApsDmMessageSubscription = {
  onDeleteApsDmMessage?:  {
    __typename: "ApsDmMessage",
    id: string,
    eventId: string,
    threadId: string,
    thread:  {
      __typename: "ApsDmThread",
      id: string,
      eventId: string,
      dmKey: string,
      userAId: string,
      userBId: string,
      owners: Array< string >,
      lastMessageAt?: string | null,
      lastMessagePreview?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    senderUserId: string,
    sender:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owners: Array< string >,
    type?: string | null,
    body?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsAdminAnnouncementSubscriptionVariables = {
  filter?: ModelSubscriptionApsAdminAnnouncementFilterInput | null,
};

export type OnCreateApsAdminAnnouncementSubscription = {
  onCreateApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsAdminAnnouncementSubscriptionVariables = {
  filter?: ModelSubscriptionApsAdminAnnouncementFilterInput | null,
};

export type OnUpdateApsAdminAnnouncementSubscription = {
  onUpdateApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsAdminAnnouncementSubscriptionVariables = {
  filter?: ModelSubscriptionApsAdminAnnouncementFilterInput | null,
};

export type OnDeleteApsAdminAnnouncementSubscription = {
  onDeleteApsAdminAnnouncement?:  {
    __typename: "ApsAdminAnnouncement",
    id: string,
    eventId: string,
    title?: string | null,
    body: string,
    deepLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsUserEngageStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsUserEngageStateFilterInput | null,
  userId?: string | null,
};

export type OnCreateApsUserEngageStateSubscription = {
  onCreateApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsUserEngageStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsUserEngageStateFilterInput | null,
  userId?: string | null,
};

export type OnUpdateApsUserEngageStateSubscription = {
  onUpdateApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsUserEngageStateSubscriptionVariables = {
  filter?: ModelSubscriptionApsUserEngageStateFilterInput | null,
  userId?: string | null,
};

export type OnDeleteApsUserEngageStateSubscription = {
  onDeleteApsUserEngageState?:  {
    __typename: "ApsUserEngageState",
    id: string,
    eventId: string,
    userId: string,
    lastSeenAnnouncementAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsPushTokenSubscriptionVariables = {
  filter?: ModelSubscriptionApsPushTokenFilterInput | null,
  userId?: string | null,
};

export type OnCreateApsPushTokenSubscription = {
  onCreateApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnUpdateApsPushTokenSubscriptionVariables = {
  filter?: ModelSubscriptionApsPushTokenFilterInput | null,
  userId?: string | null,
};

export type OnUpdateApsPushTokenSubscription = {
  onUpdateApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnDeleteApsPushTokenSubscriptionVariables = {
  filter?: ModelSubscriptionApsPushTokenFilterInput | null,
  userId?: string | null,
};

export type OnDeleteApsPushTokenSubscription = {
  onDeleteApsPushToken?:  {
    __typename: "ApsPushToken",
    id: string,
    userId: string,
    token: string,
    platform?: string | null,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnCreateAPSSubscriptionVariables = {
  filter?: ModelSubscriptionAPSFilterInput | null,
};

export type OnCreateAPSSubscription = {
  onCreateAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type OnUpdateAPSSubscriptionVariables = {
  filter?: ModelSubscriptionAPSFilterInput | null,
};

export type OnUpdateAPSSubscription = {
  onUpdateAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type OnDeleteAPSSubscriptionVariables = {
  filter?: ModelSubscriptionAPSFilterInput | null,
};

export type OnDeleteAPSSubscription = {
  onDeleteAPS?:  {
    __typename: "APS",
    id: string,
    year: string,
    codes?: Array< string | null > | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    startDate?: string | null,
    endDate?: string | null,
    location?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    website?: string | null,
    Registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    Sponsors?:  {
      __typename: "ModelApsSponsorConnection",
      nextToken?: string | null,
    } | null,
    Speakers?:  {
      __typename: "ModelAPSSpeakerConnection",
      nextToken?: string | null,
    } | null,
    companies?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitors?:  {
      __typename: "ModelApsAppExhibitorProfileConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPromotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    exhibitorPhotos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    exhibitorHandouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    addOns?:  {
      __typename: "ModelApsAddOnConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAgendaId?: string | null,
  } | null,
};

export type OnCreateAPSBoardSubscriptionVariables = {
  filter?: ModelSubscriptionAPSBoardFilterInput | null,
};

export type OnCreateAPSBoardSubscription = {
  onCreateAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAPSBoardSubscriptionVariables = {
  filter?: ModelSubscriptionAPSBoardFilterInput | null,
};

export type OnUpdateAPSBoardSubscription = {
  onUpdateAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAPSBoardSubscriptionVariables = {
  filter?: ModelSubscriptionAPSBoardFilterInput | null,
};

export type OnDeleteAPSBoardSubscription = {
  onDeleteAPSBoard?:  {
    __typename: "APSBoard",
    id: string,
    name: string,
    title?: string | null,
    bio?: string | null,
    company: string,
    email: string,
    linkedin?: string | null,
    profilePic?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsAgendaSubscriptionVariables = {
  filter?: ModelSubscriptionApsAgendaFilterInput | null,
};

export type OnCreateApsAgendaSubscription = {
  onCreateApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsAgendaSubscriptionVariables = {
  filter?: ModelSubscriptionApsAgendaFilterInput | null,
};

export type OnUpdateApsAgendaSubscription = {
  onUpdateApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsAgendaSubscriptionVariables = {
  filter?: ModelSubscriptionApsAgendaFilterInput | null,
};

export type OnDeleteApsAgendaSubscription = {
  onDeleteApsAgenda?:  {
    __typename: "ApsAgenda",
    id: string,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    items?:  {
      __typename: "ModelApsAppSessionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsRegistrantFilterInput | null,
};

export type OnCreateApsRegistrantSubscription = {
  onCreateApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type OnUpdateApsRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsRegistrantFilterInput | null,
};

export type OnUpdateApsRegistrantSubscription = {
  onUpdateApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type OnDeleteApsRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsRegistrantFilterInput | null,
};

export type OnDeleteApsRegistrantSubscription = {
  onDeleteApsRegistrant?:  {
    __typename: "ApsRegistrant",
    id: string,
    apsID: string,
    aps:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    firstName?: string | null,
    lastName?: string | null,
    email: string,
    phone?: string | null,
    companyId?: string | null,
    company?:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    jobTitle?: string | null,
    attendeeType: RegistrantType,
    termsAccepted?: boolean | null,
    interests?: Array< string | null > | null,
    otherInterest?: string | null,
    interestQuestionOne?: string | null,
    interestQuestionTwo?: string | null,
    billingAddressFirstName?: string | null,
    billingAddressLastName?: string | null,
    billingAddressEmail?: string | null,
    billingAddressPhone?: string | null,
    billingAddressStreet?: string | null,
    billingAddressCity?: string | null,
    billingAddressState?: string | null,
    billingAddressZip?: string | null,
    sameAsAttendee?: boolean | null,
    speakerTopic?: string | null,
    learningObjectives?: string | null,
    totalAmount?: number | null,
    discountCode?: string | null,
    status: RegistrantStatus,
    paymentConfirmation?: string | null,
    registrationEmailSent?: boolean | null,
    registrationEmailSentDate?: string | null,
    registrationEmailReceived?: boolean | null,
    registrationEmailReceivedDate?: string | null,
    welcomeEmailSent?: boolean | null,
    welcomeEmailSentDate?: string | null,
    welcomeEmailReceived?: boolean | null,
    welcomeEmailReceivedDate?: string | null,
    paymentMethod?: string | null,
    paymentLast4?: string | null,
    approvedAt?: string | null,
    headshot?: string | null,
    presentation?: string | null,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    bio?: string | null,
    seatingChartRegistrant?:  {
      __typename: "ApsSeatingChartRegistrant",
      id: string,
      category?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      company?: string | null,
      email?: string | null,
      role?: string | null,
      tableNumber?: number | null,
      notes?: string | null,
      seatingChartID: string,
      registrantID: string,
      createdAt: string,
      updatedAt: string,
      apsSeatingChartRegistrantsId?: string | null,
    } | null,
    addOnsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    addOnsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    appUserId?: string | null,
    appUser?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    qrCode?: string | null,
    createdAt: string,
    updatedAt: string,
    aPSRegistrantsId?: string | null,
    aPSCompanyRegistrantsId?: string | null,
    apsRegistrantSeatingChartRegistrantId?: string | null,
  } | null,
};

export type OnCreateApsAppUserSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserFilterInput | null,
};

export type OnCreateApsAppUserSubscription = {
  onCreateApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsAppUserSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserFilterInput | null,
};

export type OnUpdateApsAppUserSubscription = {
  onUpdateApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsAppUserSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserFilterInput | null,
};

export type OnDeleteApsAppUserSubscription = {
  onDeleteApsAppUser?:  {
    __typename: "ApsAppUser",
    id: string,
    registrantId: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    photos?:  {
      __typename: "ModelApsAppUserPhotoConnection",
      nextToken?: string | null,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    exhibitorDeals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    sentDmMessages?:  {
      __typename: "ModelApsDmMessageConnection",
      nextToken?: string | null,
    } | null,
    profileId?: string | null,
    profile?:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsAppUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserContactFilterInput | null,
};

export type OnCreateApsAppUserContactSubscription = {
  onCreateApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type OnUpdateApsAppUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserContactFilterInput | null,
};

export type OnUpdateApsAppUserContactSubscription = {
  onUpdateApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type OnDeleteApsAppUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserContactFilterInput | null,
};

export type OnDeleteApsAppUserContactSubscription = {
  onDeleteApsAppUserContact?:  {
    __typename: "ApsAppUserContact",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserContactsId?: string | null,
  } | null,
};

export type OnCreateApsAppUserLeadSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserLeadFilterInput | null,
};

export type OnCreateApsAppUserLeadSubscription = {
  onCreateApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type OnUpdateApsAppUserLeadSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserLeadFilterInput | null,
};

export type OnUpdateApsAppUserLeadSubscription = {
  onUpdateApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type OnDeleteApsAppUserLeadSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserLeadFilterInput | null,
};

export type OnDeleteApsAppUserLeadSubscription = {
  onDeleteApsAppUserLead?:  {
    __typename: "ApsAppUserLead",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    favorite?: boolean | null,
    contact:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    contactId: string,
    createdAt: string,
    updatedAt: string,
    apsAppUserLeadsId?: string | null,
  } | null,
};

export type OnCreateApsAppUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserProfileFilterInput | null,
};

export type OnCreateApsAppUserProfileSubscription = {
  onCreateApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsAppUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserProfileFilterInput | null,
};

export type OnUpdateApsAppUserProfileSubscription = {
  onUpdateApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsAppUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserProfileFilterInput | null,
};

export type OnDeleteApsAppUserProfileSubscription = {
  onDeleteApsAppUserProfile?:  {
    __typename: "ApsAppUserProfile",
    id: string,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phone?: string | null,
    company?: string | null,
    jobTitle?: string | null,
    attendeeType?: RegistrantType | null,
    quickTools?: Array< string | null > | null,
    affiliates?:  {
      __typename: "ModelProfileAffiliateConnection",
      nextToken?: string | null,
    } | null,
    profilePicture?: string | null,
    bio?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    website?: Array< string | null > | null,
    location?: string | null,
    education?:  {
      __typename: "ModelProfileEducationConnection",
      nextToken?: string | null,
    } | null,
    interests?:  {
      __typename: "ModelProfileInterestConnection",
      nextToken?: string | null,
    } | null,
    resume?: string | null,
    contacts?:  {
      __typename: "ModelApsAppUserContactConnection",
      nextToken?: string | null,
    } | null,
    leads?:  {
      __typename: "ModelApsAppUserLeadConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakerId?: string | null,
    speaker?:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProfileAffiliateSubscriptionVariables = {
  filter?: ModelSubscriptionProfileAffiliateFilterInput | null,
};

export type OnCreateProfileAffiliateSubscription = {
  onCreateProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type OnUpdateProfileAffiliateSubscriptionVariables = {
  filter?: ModelSubscriptionProfileAffiliateFilterInput | null,
};

export type OnUpdateProfileAffiliateSubscription = {
  onUpdateProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type OnDeleteProfileAffiliateSubscriptionVariables = {
  filter?: ModelSubscriptionProfileAffiliateFilterInput | null,
};

export type OnDeleteProfileAffiliateSubscription = {
  onDeleteProfileAffiliate?:  {
    __typename: "ProfileAffiliate",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    affiliate?: string | null,
    role?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileAffiliatesId?: string | null,
  } | null,
};

export type OnCreateProfileEducationSubscriptionVariables = {
  filter?: ModelSubscriptionProfileEducationFilterInput | null,
};

export type OnCreateProfileEducationSubscription = {
  onCreateProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type OnUpdateProfileEducationSubscriptionVariables = {
  filter?: ModelSubscriptionProfileEducationFilterInput | null,
};

export type OnUpdateProfileEducationSubscription = {
  onUpdateProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type OnDeleteProfileEducationSubscriptionVariables = {
  filter?: ModelSubscriptionProfileEducationFilterInput | null,
};

export type OnDeleteProfileEducationSubscription = {
  onDeleteProfileEducation?:  {
    __typename: "ProfileEducation",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    school?: string | null,
    degree?: string | null,
    fieldOfStudy?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileEducationId?: string | null,
  } | null,
};

export type OnCreateProfileInterestSubscriptionVariables = {
  filter?: ModelSubscriptionProfileInterestFilterInput | null,
};

export type OnCreateProfileInterestSubscription = {
  onCreateProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type OnUpdateProfileInterestSubscriptionVariables = {
  filter?: ModelSubscriptionProfileInterestFilterInput | null,
};

export type OnUpdateProfileInterestSubscription = {
  onUpdateProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type OnDeleteProfileInterestSubscriptionVariables = {
  filter?: ModelSubscriptionProfileInterestFilterInput | null,
};

export type OnDeleteProfileInterestSubscription = {
  onDeleteProfileInterest?:  {
    __typename: "ProfileInterest",
    id: string,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    interest?: string | null,
    createdAt: string,
    updatedAt: string,
    apsAppUserProfileInterestsId?: string | null,
  } | null,
};

export type OnCreateApsAppUserPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserPhotoFilterInput | null,
};

export type OnCreateApsAppUserPhotoSubscription = {
  onCreateApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type OnUpdateApsAppUserPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserPhotoFilterInput | null,
};

export type OnUpdateApsAppUserPhotoSubscription = {
  onUpdateApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type OnDeleteApsAppUserPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppUserPhotoFilterInput | null,
};

export type OnDeleteApsAppUserPhotoSubscription = {
  onDeleteApsAppUserPhoto?:  {
    __typename: "ApsAppUserPhoto",
    id: string,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSPhotosId?: string | null,
    apsAppUserPhotosId?: string | null,
  } | null,
};

export type OnCreateApsAppSessionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionFilterInput | null,
};

export type OnCreateApsAppSessionSubscription = {
  onCreateApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type OnUpdateApsAppSessionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionFilterInput | null,
};

export type OnUpdateApsAppSessionSubscription = {
  onUpdateApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type OnDeleteApsAppSessionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionFilterInput | null,
};

export type OnDeleteApsAppSessionSubscription = {
  onDeleteApsAppSession?:  {
    __typename: "ApsAppSession",
    id: string,
    title?: string | null,
    date?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    location?: string | null,
    description?: string | null,
    agendaId?: string | null,
    agenda?:  {
      __typename: "ApsAgenda",
      id: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sessionQuestions?:  {
      __typename: "ModelApsAppSessionQuestionConnection",
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    speakers?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    sponsors?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    apsAgendaItemsId?: string | null,
  } | null,
};

export type OnCreateApsAppSessionQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionQuestionFilterInput | null,
};

export type OnCreateApsAppSessionQuestionSubscription = {
  onCreateApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type OnUpdateApsAppSessionQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionQuestionFilterInput | null,
};

export type OnUpdateApsAppSessionQuestionSubscription = {
  onUpdateApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type OnDeleteApsAppSessionQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppSessionQuestionFilterInput | null,
};

export type OnDeleteApsAppSessionQuestionSubscription = {
  onDeleteApsAppSessionQuestion?:  {
    __typename: "ApsAppSessionQuestion",
    id: string,
    sessionId: string,
    session:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    question?: string | null,
    userId: string,
    user:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    apsAppUserSessionQuestionsId?: string | null,
  } | null,
};

export type OnCreateAPSSpeakerSubscriptionVariables = {
  filter?: ModelSubscriptionAPSSpeakerFilterInput | null,
};

export type OnCreateAPSSpeakerSubscription = {
  onCreateAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type OnUpdateAPSSpeakerSubscriptionVariables = {
  filter?: ModelSubscriptionAPSSpeakerFilterInput | null,
};

export type OnUpdateAPSSpeakerSubscription = {
  onUpdateAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type OnDeleteAPSSpeakerSubscriptionVariables = {
  filter?: ModelSubscriptionAPSSpeakerFilterInput | null,
};

export type OnDeleteAPSSpeakerSubscription = {
  onDeleteAPSSpeaker?:  {
    __typename: "APSSpeaker",
    id: string,
    presentationTitle?: string | null,
    presentationSummary?: string | null,
    profileId: string,
    profile:  {
      __typename: "ApsAppUserProfile",
      id: string,
      userId: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      phone?: string | null,
      company?: string | null,
      jobTitle?: string | null,
      attendeeType?: RegistrantType | null,
      quickTools?: Array< string | null > | null,
      profilePicture?: string | null,
      bio?: string | null,
      linkedin?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      website?: Array< string | null > | null,
      location?: string | null,
      resume?: string | null,
      speakerId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    sessions?:  {
      __typename: "ModelSessionSpeakersConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSSpeakersId?: string | null,
  } | null,
};

export type OnCreateApsSponsorSubscriptionVariables = {
  filter?: ModelSubscriptionApsSponsorFilterInput | null,
};

export type OnCreateApsSponsorSubscription = {
  onCreateApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type OnUpdateApsSponsorSubscriptionVariables = {
  filter?: ModelSubscriptionApsSponsorFilterInput | null,
};

export type OnUpdateApsSponsorSubscription = {
  onUpdateApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type OnDeleteApsSponsorSubscriptionVariables = {
  filter?: ModelSubscriptionApsSponsorFilterInput | null,
};

export type OnDeleteApsSponsorSubscription = {
  onDeleteApsSponsor?:  {
    __typename: "ApsSponsor",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    profile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    sessions?:  {
      __typename: "ModelSessionSponsorsConnection",
      nextToken?: string | null,
    } | null,
    type?: SponsorType | null,
    createdAt: string,
    updatedAt: string,
    aPSSponsorsId?: string | null,
    apsSponsorProfileId?: string | null,
  } | null,
};

export type OnCreateAPSCompanySubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyFilterInput | null,
};

export type OnCreateAPSCompanySubscription = {
  onCreateAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAPSCompanySubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyFilterInput | null,
};

export type OnUpdateAPSCompanySubscription = {
  onUpdateAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAPSCompanySubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyFilterInput | null,
};

export type OnDeleteAPSCompanySubscription = {
  onDeleteAPSCompany?:  {
    __typename: "APSCompany",
    id: string,
    name: string,
    email: string,
    type?: CompanyType | null,
    description?: string | null,
    website?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
    logo?: string | null,
    events?:  {
      __typename: "ModelAPSCompanyEventsConnection",
      nextToken?: string | null,
    } | null,
    registrants?:  {
      __typename: "ModelApsRegistrantConnection",
      nextToken?: string | null,
    } | null,
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    exhibitorProfileId?: string | null,
    exhibitorProfile?:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelAPSCompanyContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAPSCompanyContactSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyContactFilterInput | null,
};

export type OnCreateAPSCompanyContactSubscription = {
  onCreateAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAPSCompanyContactSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyContactFilterInput | null,
};

export type OnUpdateAPSCompanyContactSubscription = {
  onUpdateAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAPSCompanyContactSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyContactFilterInput | null,
};

export type OnDeleteAPSCompanyContactSubscription = {
  onDeleteAPSCompanyContact?:  {
    __typename: "APSCompanyContact",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email: string,
    phone?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsAppExhibitorProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorProfileFilterInput | null,
};

export type OnCreateApsAppExhibitorProfileSubscription = {
  onCreateApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type OnUpdateApsAppExhibitorProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorProfileFilterInput | null,
};

export type OnUpdateApsAppExhibitorProfileSubscription = {
  onUpdateApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type OnDeleteApsAppExhibitorProfileSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorProfileFilterInput | null,
};

export type OnDeleteApsAppExhibitorProfileSubscription = {
  onDeleteApsAppExhibitorProfile?:  {
    __typename: "ApsAppExhibitorProfile",
    id: string,
    companyId: string,
    company:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sponsorId?: string | null,
    sponsor?:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    deals?:  {
      __typename: "ModelApsAppExhibitorDealConnection",
      nextToken?: string | null,
    } | null,
    photos?:  {
      __typename: "ModelApsAppExhibitorPhotoConnection",
      nextToken?: string | null,
    } | null,
    handouts?:  {
      __typename: "ModelApsAppExhibitorHandoutConnection",
      nextToken?: string | null,
    } | null,
    promotions?:  {
      __typename: "ModelApsAppExhibitorPromotionConnection",
      nextToken?: string | null,
    } | null,
    video?: string | null,
    videoCaption?: string | null,
    boothNumber?: string | null,
    visits?: number | null,
    views?: number | null,
    likes?: number | null,
    notes?:  {
      __typename: "ModelApsAppUserNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSExhibitorsId?: string | null,
  } | null,
};

export type OnCreateApsAppExhibitorPromotionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPromotionFilterInput | null,
};

export type OnCreateApsAppExhibitorPromotionSubscription = {
  onCreateApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type OnUpdateApsAppExhibitorPromotionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPromotionFilterInput | null,
};

export type OnUpdateApsAppExhibitorPromotionSubscription = {
  onUpdateApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type OnDeleteApsAppExhibitorPromotionSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPromotionFilterInput | null,
};

export type OnDeleteApsAppExhibitorPromotionSubscription = {
  onDeleteApsAppExhibitorPromotion?:  {
    __typename: "ApsAppExhibitorPromotion",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    promotion?: string | null,
    link?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPromotionsId?: string | null,
    apsAppExhibitorProfilePromotionsId?: string | null,
  } | null,
};

export type OnCreateApsAppExhibitorDealSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorDealFilterInput | null,
};

export type OnCreateApsAppExhibitorDealSubscription = {
  onCreateApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type OnUpdateApsAppExhibitorDealSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorDealFilterInput | null,
};

export type OnUpdateApsAppExhibitorDealSubscription = {
  onUpdateApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type OnDeleteApsAppExhibitorDealSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorDealFilterInput | null,
};

export type OnDeleteApsAppExhibitorDealSubscription = {
  onDeleteApsAppExhibitorDeal?:  {
    __typename: "ApsAppExhibitorDeal",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    deal?: string | null,
    link?: string | null,
    userId?: string | null,
    user?:  {
      __typename: "ApsAppUser",
      id: string,
      registrantId: string,
      profileId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorDealsId?: string | null,
    apsAppUserExhibitorDealsId?: string | null,
    apsAppExhibitorProfileDealsId?: string | null,
  } | null,
};

export type OnCreateApsAppExhibitorPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPhotoFilterInput | null,
};

export type OnCreateApsAppExhibitorPhotoSubscription = {
  onCreateApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type OnUpdateApsAppExhibitorPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPhotoFilterInput | null,
};

export type OnUpdateApsAppExhibitorPhotoSubscription = {
  onUpdateApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type OnDeleteApsAppExhibitorPhotoSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorPhotoFilterInput | null,
};

export type OnDeleteApsAppExhibitorPhotoSubscription = {
  onDeleteApsAppExhibitorPhoto?:  {
    __typename: "ApsAppExhibitorPhoto",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    photo?: string | null,
    caption?: string | null,
    approved?: boolean | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorPhotosId?: string | null,
    apsAppExhibitorProfilePhotosId?: string | null,
  } | null,
};

export type OnCreateApsAppExhibitorHandoutSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorHandoutFilterInput | null,
};

export type OnCreateApsAppExhibitorHandoutSubscription = {
  onCreateApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type OnUpdateApsAppExhibitorHandoutSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorHandoutFilterInput | null,
};

export type OnUpdateApsAppExhibitorHandoutSubscription = {
  onUpdateApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type OnDeleteApsAppExhibitorHandoutSubscriptionVariables = {
  filter?: ModelSubscriptionApsAppExhibitorHandoutFilterInput | null,
};

export type OnDeleteApsAppExhibitorHandoutSubscription = {
  onDeleteApsAppExhibitorHandout?:  {
    __typename: "ApsAppExhibitorHandout",
    id: string,
    exhibitorId: string,
    exhibitor:  {
      __typename: "ApsAppExhibitorProfile",
      id: string,
      companyId: string,
      sponsorId?: string | null,
      eventId: string,
      video?: string | null,
      videoCaption?: string | null,
      boothNumber?: string | null,
      visits?: number | null,
      views?: number | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSExhibitorsId?: string | null,
    },
    handout?: string | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    aPSExhibitorHandoutsId?: string | null,
    apsAppExhibitorProfileHandoutsId?: string | null,
  } | null,
};

export type OnCreateApsAddOnSubscriptionVariables = {
  filter?: ModelSubscriptionApsAddOnFilterInput | null,
};

export type OnCreateApsAddOnSubscription = {
  onCreateApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type OnUpdateApsAddOnSubscriptionVariables = {
  filter?: ModelSubscriptionApsAddOnFilterInput | null,
};

export type OnUpdateApsAddOnSubscription = {
  onUpdateApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type OnDeleteApsAddOnSubscriptionVariables = {
  filter?: ModelSubscriptionApsAddOnFilterInput | null,
};

export type OnDeleteApsAddOnSubscription = {
  onDeleteApsAddOn?:  {
    __typename: "ApsAddOn",
    id: string,
    title: string,
    description: string,
    subheadline?: string | null,
    location: string,
    date: string,
    time: string,
    company: string,
    altLink?: string | null,
    type?: string | null,
    limit?: number | null,
    eventId: string,
    event:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    price?: number | null,
    registrantsRequested?:  {
      __typename: "ModelRegistrantAddOnsRequestedConnection",
      nextToken?: string | null,
    } | null,
    registrantsApproved?:  {
      __typename: "ModelRegistrantAddOnsApprovedConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    aPSAddOnsId?: string | null,
  } | null,
};

export type OnCreateApsSeatingChartSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartFilterInput | null,
};

export type OnCreateApsSeatingChartSubscription = {
  onCreateApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApsSeatingChartSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartFilterInput | null,
};

export type OnUpdateApsSeatingChartSubscription = {
  onUpdateApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApsSeatingChartSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartFilterInput | null,
};

export type OnDeleteApsSeatingChartSubscription = {
  onDeleteApsSeatingChart?:  {
    __typename: "ApsSeatingChart",
    id: string,
    registrants?:  {
      __typename: "ModelApsSeatingChartRegistrantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateApsSeatingChartRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartRegistrantFilterInput | null,
};

export type OnCreateApsSeatingChartRegistrantSubscription = {
  onCreateApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type OnUpdateApsSeatingChartRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartRegistrantFilterInput | null,
};

export type OnUpdateApsSeatingChartRegistrantSubscription = {
  onUpdateApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type OnDeleteApsSeatingChartRegistrantSubscriptionVariables = {
  filter?: ModelSubscriptionApsSeatingChartRegistrantFilterInput | null,
};

export type OnDeleteApsSeatingChartRegistrantSubscription = {
  onDeleteApsSeatingChartRegistrant?:  {
    __typename: "ApsSeatingChartRegistrant",
    id: string,
    category?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    company?: string | null,
    email?: string | null,
    role?: string | null,
    tableNumber?: number | null,
    notes?: string | null,
    seatingChartID: string,
    seatingChart:  {
      __typename: "ApsSeatingChart",
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    registrantID: string,
    registrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    apsSeatingChartRegistrantsId?: string | null,
  } | null,
};

export type OnCreateAPSCompanyEventsSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyEventsFilterInput | null,
};

export type OnCreateAPSCompanyEventsSubscription = {
  onCreateAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAPSCompanyEventsSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyEventsFilterInput | null,
};

export type OnUpdateAPSCompanyEventsSubscription = {
  onUpdateAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAPSCompanyEventsSubscriptionVariables = {
  filter?: ModelSubscriptionAPSCompanyEventsFilterInput | null,
};

export type OnDeleteAPSCompanyEventsSubscription = {
  onDeleteAPSCompanyEvents?:  {
    __typename: "APSCompanyEvents",
    id: string,
    aPSId: string,
    aPSCompanyId: string,
    aPS:  {
      __typename: "APS",
      id: string,
      year: string,
      codes?: Array< string | null > | null,
      startDate?: string | null,
      endDate?: string | null,
      location?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      website?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSAgendaId?: string | null,
    },
    aPSCompany:  {
      __typename: "APSCompany",
      id: string,
      name: string,
      email: string,
      type?: CompanyType | null,
      description?: string | null,
      website?: string | null,
      phone?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zip?: string | null,
      country?: string | null,
      logo?: string | null,
      sponsorId?: string | null,
      exhibitorProfileId?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRegistrantAddOnsRequestedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsRequestedFilterInput | null,
};

export type OnCreateRegistrantAddOnsRequestedSubscription = {
  onCreateRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRegistrantAddOnsRequestedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsRequestedFilterInput | null,
};

export type OnUpdateRegistrantAddOnsRequestedSubscription = {
  onUpdateRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRegistrantAddOnsRequestedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsRequestedFilterInput | null,
};

export type OnDeleteRegistrantAddOnsRequestedSubscription = {
  onDeleteRegistrantAddOnsRequested?:  {
    __typename: "RegistrantAddOnsRequested",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRegistrantAddOnsApprovedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsApprovedFilterInput | null,
};

export type OnCreateRegistrantAddOnsApprovedSubscription = {
  onCreateRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRegistrantAddOnsApprovedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsApprovedFilterInput | null,
};

export type OnUpdateRegistrantAddOnsApprovedSubscription = {
  onUpdateRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRegistrantAddOnsApprovedSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrantAddOnsApprovedFilterInput | null,
};

export type OnDeleteRegistrantAddOnsApprovedSubscription = {
  onDeleteRegistrantAddOnsApproved?:  {
    __typename: "RegistrantAddOnsApproved",
    id: string,
    apsRegistrantId: string,
    apsAddOnId: string,
    apsRegistrant:  {
      __typename: "ApsRegistrant",
      id: string,
      apsID: string,
      firstName?: string | null,
      lastName?: string | null,
      email: string,
      phone?: string | null,
      companyId?: string | null,
      jobTitle?: string | null,
      attendeeType: RegistrantType,
      termsAccepted?: boolean | null,
      interests?: Array< string | null > | null,
      otherInterest?: string | null,
      interestQuestionOne?: string | null,
      interestQuestionTwo?: string | null,
      billingAddressFirstName?: string | null,
      billingAddressLastName?: string | null,
      billingAddressEmail?: string | null,
      billingAddressPhone?: string | null,
      billingAddressStreet?: string | null,
      billingAddressCity?: string | null,
      billingAddressState?: string | null,
      billingAddressZip?: string | null,
      sameAsAttendee?: boolean | null,
      speakerTopic?: string | null,
      learningObjectives?: string | null,
      totalAmount?: number | null,
      discountCode?: string | null,
      status: RegistrantStatus,
      paymentConfirmation?: string | null,
      registrationEmailSent?: boolean | null,
      registrationEmailSentDate?: string | null,
      registrationEmailReceived?: boolean | null,
      registrationEmailReceivedDate?: string | null,
      welcomeEmailSent?: boolean | null,
      welcomeEmailSentDate?: string | null,
      welcomeEmailReceived?: boolean | null,
      welcomeEmailReceivedDate?: string | null,
      paymentMethod?: string | null,
      paymentLast4?: string | null,
      approvedAt?: string | null,
      headshot?: string | null,
      presentation?: string | null,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      bio?: string | null,
      appUserId?: string | null,
      qrCode?: string | null,
      createdAt: string,
      updatedAt: string,
      aPSRegistrantsId?: string | null,
      aPSCompanyRegistrantsId?: string | null,
      apsRegistrantSeatingChartRegistrantId?: string | null,
    },
    apsAddOn:  {
      __typename: "ApsAddOn",
      id: string,
      title: string,
      description: string,
      subheadline?: string | null,
      location: string,
      date: string,
      time: string,
      company: string,
      altLink?: string | null,
      type?: string | null,
      limit?: number | null,
      eventId: string,
      price?: number | null,
      createdAt: string,
      updatedAt: string,
      aPSAddOnsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSpeakersSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSpeakersFilterInput | null,
};

export type OnCreateSessionSpeakersSubscription = {
  onCreateSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionSpeakersSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSpeakersFilterInput | null,
};

export type OnUpdateSessionSpeakersSubscription = {
  onUpdateSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionSpeakersSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSpeakersFilterInput | null,
};

export type OnDeleteSessionSpeakersSubscription = {
  onDeleteSessionSpeakers?:  {
    __typename: "SessionSpeakers",
    id: string,
    apsAppSessionId: string,
    aPSSpeakerId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    aPSSpeaker:  {
      __typename: "APSSpeaker",
      id: string,
      presentationTitle?: string | null,
      presentationSummary?: string | null,
      profileId: string,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      aPSSpeakersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSponsorsSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSponsorsFilterInput | null,
};

export type OnCreateSessionSponsorsSubscription = {
  onCreateSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionSponsorsSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSponsorsFilterInput | null,
};

export type OnUpdateSessionSponsorsSubscription = {
  onUpdateSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionSponsorsSubscriptionVariables = {
  filter?: ModelSubscriptionSessionSponsorsFilterInput | null,
};

export type OnDeleteSessionSponsorsSubscription = {
  onDeleteSessionSponsors?:  {
    __typename: "SessionSponsors",
    id: string,
    apsAppSessionId: string,
    apsSponsorId: string,
    apsAppSession:  {
      __typename: "ApsAppSession",
      id: string,
      title?: string | null,
      date?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      location?: string | null,
      description?: string | null,
      agendaId?: string | null,
      createdAt: string,
      updatedAt: string,
      apsAgendaItemsId?: string | null,
    },
    apsSponsor:  {
      __typename: "ApsSponsor",
      id: string,
      companyId: string,
      eventId: string,
      type?: SponsorType | null,
      createdAt: string,
      updatedAt: string,
      aPSSponsorsId?: string | null,
      apsSponsorProfileId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
