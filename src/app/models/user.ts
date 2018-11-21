export class User {
  constructor(initialData: Partial<User> = null) {
    if (initialData !== null) {
      Object.assign(this, initialData);
    }
  }

  '@odata.context': string;
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: null;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
}
