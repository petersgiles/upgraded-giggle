import { DisplayLookup } from '../../models';

export abstract class CoreMapperService<T> {
  constructor() {}

  public abstract mapSingle(item: any): T

  protected idFromLookup(lookupValue: any) {
    return lookupValue['ID'] || lookupValue['Id'] || lookupValue['id']
  }

  protected fromLookup(lookupValue: any): DisplayLookup {
    const id = lookupValue['ID'] || lookupValue['Id'] || lookupValue['id']
    const title = lookupValue['Title'] || lookupValue['title']
    return {
      id: id,
      title: title
    }
  }

  protected fromUser(lookupValue) {
    return {
      id: lookupValue['ID'] || lookupValue['Id'] || lookupValue['id'],
      title: lookupValue['Title'] || lookupValue['title'],
      username: lookupValue['ID'] || lookupValue['Id'] || lookupValue['id'],
      name: lookupValue['Name'] || lookupValue['name'],
      email: lookupValue['Email'] || lookupValue['email'],
      phone: null
    }
  }

  public mapMany = (items: any): T[] => (items || []).map(this.mapSingle)
}
