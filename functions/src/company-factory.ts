import {ICompany} from "./companies/ICompany";
import {DefaultCompany} from "./companies/DefaultCompany";
import {EmptyCompany} from "./companies/EmptyCompany";

export type CompanyType = "default";

/**
 * Defines the CompanyFactory object that utilizes the
 * factory design pattern.
 */
export class CompanyFactory {
  /**
 * Returns the correct class instance for the specified company
 * type. As of right now we only have one specific company that is
 * created. But this is designed for future maintainability. When we
 * decided to add a new company type we only have to make a change here
 * and not in the calling functions
 * @param {CompanyType} type desired company to create
 * @return {ICompany} instance of the company
 */
  static getCompanyInstance(type: CompanyType): ICompany {
    switch (type) {
      case "default":
        return new DefaultCompany();
      default:
        return new EmptyCompany();
    }
  }
}
