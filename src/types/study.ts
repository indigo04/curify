export interface Study {
  hasResults: boolean;
  derivedSection: {
    miscInfoModule: {
      versionHolder: string;
    };
    conditionBrowseModule: {
      meshes: Array<{ id: string; term: string }>;
      browseLeaves: Array<{
        id: string;
        name: string;
        relevance: string;
        asFound?: string;
      }>;
      browseBranches: Array<{ abbrev: string; name: string }>;
    };
  };
  protocolSection: {
    armsInterventionsModule: {
      armGroups: Array<{
        type: string;
        label: string;
        description: string;
        interventionNames?: string[];
      }>;
      interventions: Array<{
        type: string;
        name: string;
        description: string;
        armGroupLabels: string[];
        otherNames: string[];
      }>;
    };
    conditionsModule: {
      conditions: string[];
      keywords: string[];
    };
    contactsLocationsModule?: {
      locations: Array<{
        city: string;
        country: string;
        state: string;
        zip: string;
        facility: string;
        geoPoint: { lat: number; lon: number };
      }>;
      overallOfficials: Array<{
        affiliation: string;
        name: string;
        role: string;
      }>;
    };
    descriptionModule: {
      briefSummary: string;
      detailedDescription: string;
    };
    designModule: {
      studyType: string;
      phases: string[];
      enrollmentInfo: { count: number; type: string };
      designInfo: {
        allocation: string;
        interventionModel: string;
        interventionModelDescription: string;
        primaryPurpose: string;
        maskingInfo: { masking: string };
      };
    };
    eligibilityModule: {
      eligibilityCriteria: string;
      healthyVolunteers: boolean;
      maximumAge: string;
      minimumAge: string;
      sex: string;
      stdAges: string[];
    };
    identificationModule: {
      briefTitle: string;
      nctId: string;
      officialTitle: string;
      orgStudyIdInfo: { id: string };
      organization: { class: string; fullname: string };
    };
    ipdSharingStatementModule: { ipdSharing: string };
    outcomesModule: {
      primaryOutcomes: Array<{
        description: string;
        measure: string;
        timeFrame: string;
      }>;
      secondaryOutcomes: Array<{
        description: string;
        measure: string;
        timeFrame: string;
      }>;
    };
    oversightModule: {
      isFdaRegulatedDevice: boolean;
      isFdaRegulatedDrug: boolean;
      oversightHasDmc: boolean;
    };
    referencesModule: {
      references: Array<{ citation: string; type: string; pmid: string }>;
    };
    sponsorCollaboratorsModule: {
      collaborators: Array<{ class: string; name: string }>;
      leadSponsor: { class: string; name: string };
      responsibleParty: { type: string };
    };
    statusModule: {
      completionDateStruct: { date: Date; type: string };
      expandedAccessInfo: { hasExpandedAccess: boolean };
      lastUpdatePostDateStruct: { date: Date; type: string };
      lastUpdateSubmitDate: Date;
      overallStatus: string;
      primaryCompletionDateStruct: { date: Date; type: string };
      startDateStruct: { date: Date; type: string };
      statusVerifiedDate: Date;
      studyFirstPostDateStruct: { date: Date; type: string };
      studyFirstSubmitDate: Date;
      studyFirstSubmitQcDate: Date;
    };
  };
}
