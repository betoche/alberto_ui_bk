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

  public static drugstoreUserData = {
    data: {
      attributes: {
        company: {
          address_attributes: {
            canton_code: "1",
            canton_name: "Alajuela",
            country_code: "CR",
            country_name: "Costa Rica",
            district_code: "1",
            district_name: "Alajuela",
            note: "test",
            province_code: "1",
            province_name: "Alajuela",
            suburb_code: "1",
            suburb_name: "Acequia Grande"
          },
          code: "1234",
          company_code: "1138535934684",
          drugstore_attributes: {
            name: "test", company_code: "1138535934684"
          },
          id: "5efea29a50e955002fb9581c",
          logo_url: "http://example.com/logo.png",
          name: "test",
          status: "active",
          type: "DrugstoreLocation"
        },
        email: "drugstore_location@gmail.com",
        name: "Soledad Menchaca Reynoso",
        phone_country: "505",
        phone_number: "88888888",
        role: "drugstore_location_administrator",
        secondary_phone_country: "505",
        secondary_phone_number: "85296121",
        status: "active"
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
      type: 'MedicationCategory',
      attributes: Object.assign({ id: id, name: 'Category A' }, options)
    };
  }

  public static benefitsProviderData(id, options = {}) {
    return {
      id: id,
      type: 'BenefitsProvider',
      attributes: Object.assign({
        id: id,
        name: 'Benefits Provider A',
        type: 'BenefitsProvider',
        status: 'suspended',
        address_attributes: { country_code: 'CR' },
        administrator_user: { id: '123456', email: 'test@example.com' }
      }, options)
    };
  }

  public static pharmaceuticalCompanyData(id, options = {}) {
    return {
      id: id,
      type: 'PharmaceuticalCompany',
      attributes: Object.assign({
        id: id,
        name: `Company ${id}`,
        type: 'PharmaceuticalCompany',
        status: 'active',
        address_attributes: { country_code: 'CR' },
        administrator_user: { id: '123456', email: 'test@example.com' }
      }, options)
    };
  }

  public static drugstoreData(id, options = {}) {
    return {
      id: id,
      type: 'Drugstore',
      attributes: Object.assign({
        id: id,
        name: 'Drugstore A',
        active: true,
        type: 'Drugstore',
        status: 'active',
        address_attributes: { country_code: 'VN' },
        administrator_user: { id: '123456', email: 'test@example.com' }
      }, options)
    };
  }

  public static strategyData(id, options = {}) {
    return {
      id: id,
      type: 'strategy',
      attributes: Object.assign({
        id: id, name: 'Strategy A',
        client_status: 'active',
        age_min_limit: '10',
        age_max_limit: '20',
        description: 'Test',
        strategy_type_id: '1',
        gender_of_target_market: 'female',
        expiration_option: 'defined',
        initial_date: '2020-07-04T00:00:00.000-06:00',
        end_date: '2020-07-04T00:00:00.000-06:00',
        strategy_type_name: 'Strategy Type'
      }, options)
    };
  }

  public static strategyProfileData(id, options = {}) {
    return {
      id: id,
      type: 'strategy_profile',
      attributes: Object.assign({
        id: id, name: 'Profile',
        strategy_attributes: this.strategyData('1234567890').attributes
      }, options)
    };
  }

  public static profileData(id, options = {}) {
    return {
      id: id,
      type: 'strategy_profile',
      attributes: Object.assign({
        id: id, name: 'Profile 1',
        strategy_attributes: {
          client_status: 'active',
          age_min_limit: '10',
          age_max_limit: '20',
          name: 'Test',
          description: 'Test',
          strategy_type_id: '1',
          gender_of_target_market: 'female',
          expiration_option: 'defined',
          initial_date: '2020-07-04T00:00:00.000-06:00',
          end_date: '2020-07-04T00:00:00.000-06:00'
        }
      }, options)
    };
  }

  public static strategyTypeData(id, options = {}) {
    return {
      id: id,
      type: 'strategy_type',
      attributes: Object.assign({ id: id, name: 'Strategy Type 1' }, options)
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

  public static listOfStrategies() {
    return {
      data: [this.strategyData('1234567890'), this.strategyData('1234567891')]
    };
  }

  public static listOfStrategyProfiles() {
    return {
      data: [this.profileData('1234567890')]
    };
  }

  public static listOfStrategyTypes() {
    return {
      data: [this.strategyTypeData('1234567890')]
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
