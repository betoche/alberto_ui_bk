import { LoyaltyPlanData } from './test-data/loyalty-plan-data'
import { LoyaltyPlanMedicationData } from './test-data/loyalty-plan-medication-data'
import { LoyaltyPlanCountryData } from './test-data/loyalty-plan-country-data'
import { MedicationsIncludedByCountryData } from './test-data/medications-included-by-country-data'
import { ParticipatingDrigstoreData } from './test-data/participating-drugstore-data'

export class DataHelper {
  public static userData = {
    data: {
      id: '1',
      type: 'admin_user',
      attributes: {
        id: '1',
        authentication_token: 'sRcsimK7gx_Fz_Cms_es',
        email: 'admin@admin.com',
        completed_profile: true
      }
    }
  };

  public static usersData(id, options = {}) {
    return {
      id: id,
      type: 'user',
      attributes: Object.assign(
        {
          id: id,
          company: null,
          current_sign_in_at: null,
          email: `user-${id}@gmail.com`,
          government_id: "12345678",
          name: `Monica Alice ${id}`,
          phone_country: null,
          phone_number: null,
          role: "support_administrator",
          secondary_phone_country: 'CR',
          secondary_phone_number: '81234567'
        },
        options
      )
    };
  }

  public static medicationCategoryData(id, options = {}) {
    return {
      id: id,
      type: 'medication_category',
      attributes: Object.assign({ id: id, name: 'Category A' }, options)
    };
  }

  public static benefitsProviderData(id, options = {}) {
    return {
      id: id,
      type: 'benefits_provider',
      attributes: Object.assign({ id: id, name: 'Benefits Provider A' }, options)
    };
  }

  public static pharmaceuticalCompanyData(id, options = {}) {
    return {
      id: id,
      type: 'pharmaceutical_company',
      attributes: Object.assign({ id: id, name: `Company ${id}` }, options)
    };
  }

  public static drugstoreData(id, options = {}) {
    return {
      id: id,
      type: 'drugstore',
      attributes: Object.assign({ id: id, name: 'Drugstore A', active: true }, options)
    };
  }

  // ############################################################

  public static currentUserData() {
    return DataHelper.userData;
  }

  public static listOfAdministratorUsers() {
    return {
      data: [this.usersData('123456'), this.usersData('123457')]
    };
  }

  public static listOfDrugstoreAdministrators() {
    return {
      data: [
        this.usersData('123456', { role: 'pharmacy_administrator' }),
        this.usersData('123457', { role: 'pharmacy_administrator' })
      ]
    };
  }

  public static listOfBenefitAdministrators() {
    return {
      data: [
        this.usersData('123456', { role: 'benefits_provider_administrator' }),
        this.usersData('123457', { role: 'benefits_provider_administrator' })
      ]
    };
  }

  public static listOfMedicationDistributors() {
    return {
      data: [
        this.usersData('123456', { role: 'medications_distributor' }),
        this.usersData('123457', { role: 'medications_distributor' })
      ]
    };
  }

  public static listOfMedicationCategories() {
    return {
      data: [this.medicationCategoryData('123456'), this.medicationCategoryData('123457')]
    };
  }

  public static listOfBenefitsProviders() {
    return {
      data: [this.benefitsProviderData('123456'), this.benefitsProviderData('123457')]
    };
  }

  public static listOfCompanies() {
    return [
      this.pharmaceuticalCompanyData('55555'),
      this.drugstoreData('666666'),
      this.benefitsProviderData('77777')
    ];
  }

  public static listOfDrugstores() {
    return {
      data: [this.drugstoreData('123456'), this.drugstoreData('123457')]
    };
  }

  public static medicationData(id, options = {}) {
    return {
      id: id,
      type: 'medication',
      attributes: Object.assign(
        {
          id: id,
          adults_dosification_amount: 1,
          adults_dosification_frequency: "hours",
          adults_dosification_frequency_measure: 1,
          children_dosification_amount: 1,
          children_dosification_frequency: "hours",
          children_dosification_frequency_measure: 1,
          code: "1",
          description: "testing",
          logo_url: "http://example.com/logo.png",
          medication_category_id: "5ede2602ca2bbf1968e7e173",
          medication_category_name: "Antipyretics",
          name: `Medication ${id}`,
          pharmaceutical_company_id: "5ec3725aca2bbf3ae04488ee",
          pharmaceutical_company_name: "Farmaclan",
          medication_presentations_attributes: [{
            id: "5edf7144ca2bbf0aa5c64183",
            presentation_content: "awdasd",
            presentation_type: "vials"
          }],
          medication_prices_attributes: [{
            id: "5edf7144ca2bbf0aa5c64185",
            country_code: "VN",
            country_name: "Viet Nam",
            iva_tax_percentage: 1,
            price: "1.0"
          }]
        },
        options
      )
    };
  }

  public static listOfMedications() {
    return {
      data: [this.medicationData('1234567890'), this.medicationData('1234567891')]
    };
  }

  public static loyaltyPlan(options={}){
    let planData = LoyaltyPlanData
    if (!!options['id']) { planData['attributes']['id'] = options['id'] }

    return {
      "data": Object.assign(planData, options)
    }
  }

  public static loyaltyPlans(){
    return {
      "data": [LoyaltyPlanData]
    }
  }

  public static LoyaltyPlanMedication(){
    return {
      "data": LoyaltyPlanMedicationData
    }
  }

  public static LoyaltyPlanMedications(){
    return {
      "data": [LoyaltyPlanMedicationData]
    }
  }

  public static LoyaltyPlanCountry(){
    return {
      "data": LoyaltyPlanCountryData
    }
  }

  public static LoyaltyPlanCountries(){
    return {
      "data": [LoyaltyPlanCountryData]
    }
  }

  public static MedicationsIncludedByCountry(){
    return {
      "data": MedicationsIncludedByCountryData
    }
  }

  public static MedicationsIncludedByCountries(){
    return {
      "data": [MedicationsIncludedByCountryData]
    }
  }

  public static ParticipatingDrigstores(){
    return {
      "data": [ParticipatingDrigstoreData]
    }
  }
}
