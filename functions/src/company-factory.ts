import {ICompany} from "./companies/ICompany";
import {DefaultCompany} from "./companies/DefaultCompany";
import {EmptyCompany} from "./companies/EmptyCompany";

export type CompanyType = "default";

/**
 * Adds two numbers together.
 */
export class CompanyFactory {
  /**
 * Adds two numbers together.
 * @param {CompanyType} type asdsad
 * @return {ICompany} asdsad
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
