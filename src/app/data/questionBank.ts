export interface Question {
  key: string;
  text: string;
  required: boolean;
  order: number;
  options?: string[];
}

export const Bucket_A_questions: Question[] = [
  {
    key: "first_name",
    text: "First Name*",
    required: true,
    order: 1,
  },
  {
    key: "last_name",
    text: "Last Name*",
    required: true,
    order: 2,
  },
  {
    key: "nric",
    text: "NRIC*",
    required: true,
    order: 3,
  },
  {
    key: "email",
    text: "Email*",
    required: true,
    order: 4,
  },
  {
    key: "contact_number",
    text: "Contact Number*",
    required: true,
    order: 5,
  },
  {
    key: "linkedin_url",
    text: "LinkedIn Profile URL*",
    required: true,
    order: 6,
  },
  {
    key: "nationality",
    text: "Nationality* - Non-Singaporeans and Permanent Residents are not eligible to apply for this scholarship.",
    required: true,
    order: 7,
    options: ["Singapore Citizen", "Singapore Permanent Resident", "Foreigner"],
  },
  {
    key: "date_of_birth",
    text: "Date Of Birth*",
    required: true,
    order: 8,
  },
  {
    key: "institution",
    text: "Institution* (Type your answer if it's not present in the list.)",
    required: true,
    order: 9,
    options: [
      "NUS",
      "NTU",
      "SMU",
      "SUTD",
      "SIT",
      "SUSS",
      "SP",
      "NP",
      "NYP",
      "TP",
      "RP",
    ],
  },
  {
    key: "course_title",
    text: "Course Title* - What is the name of the current course you are pursuing?",
    required: true,
    order: 10,
  },
  {
    key: "course_information",
    text: "Course Information*",
    required: true,
    order: 11,
  },
  {
    key: "applicant_gross_monthly_income",
    text: "Applicant Gross Monthly Income* - Average monthly income",
    required: true,
    order: 12,
  },
  {
    key: "total_gross_household_income",
    text: "Total Gross Household Income ($)* - Total income earned by all household members.",
    required: true,
    order: 13,
  },
  {
    key: "per_capita_income",
    text: "Per Capita Income*",
    required: true,
    order: 14,
  },
];

export const Bucket_B_questions: Question[] = [
  {
    key: "before_you_begin",
    text: "Before You Begin - Please ensure you have the following documents ready for uploading to successfully complete this form. You may also choose to fill up the information you currently have and save your form first before submission.",
    required: false,
    order: 1,
  },
  {
    key: "referral_source",
    text: "I learned about the MILK Scholarship from",
    required: false,
    order: 2,
  },
  {
    key: "ethnicity",
    text: "Ethnicity* - Singaporean students who are Malay, Acehnese, Ambonese, Banjarese, Batak, Boyanese, Bugis, Butonese, Dayak, Dusun, Iban, Indonesian, Javanese, Kadazan, Kelabit, Makasarese, Melanau, Minangkabau, Murut, Sumatran, Sundanese, or Indonesian Extract. Please apply for the Tertiary Tuition Fee Subsidy (TTFS) through Mendaki.",
    required: true,
    order: 3,
  },
  {
    key: "address",
    text: "Address* (Street Address, City, State/Province, Postal Code, Country)",
    required: true,
    order: 4,
  },
  {
    key: "employment_status",
    text: "Applicant Employment Status* (Choose from the list or type your answer if it's not present.)",
    required: true,
    order: 5,
    options: ["Full Time", "Part Time", "Not Working"],
  },
  {
    key: "place_of_employment",
    text: "Applicant Place of Employment",
    required: false,
    order: 6,
  },
  {
    key: "cpf_oa_balance",
    text: "Applicant CPF Ordinary Account Balance* - Please input your OA account balance.",
    required: true,
    order: 7,
  },
  {
    key: "psea_balance",
    text: "Applicant PSEA Balance* - Call 6260 0777 to enquire.",
    required: true,
    order: 8,
  },
  {
    key: "total_course_fees",
    text: "Total Course Fees (After Subsidies)* - Please check and provide the estimated total course fees.",
    required: true,
    order: 9,
  },
  {
    key: "housing_type",
    text: "Housing Type* (Choose from the list or type your answer if it's not present.)",
    required: true,
    order: 10,
    options: [
      "HDB 1-Rm",
      "HDB 2-Rm",
      "HDB 3-Rm",
      "HDB 4-Rm",
      "HDB 5-Rm / Executive",
      "Other",
    ],
  },
  {
    key: "home_ownership",
    text: "Home Ownership* (Choose from the list or type your answer if it's not present.)",
    required: true,
    order: 11,
    options: ["Sole Owner", "Co-Owner", "Rental", "Other"],
  },
  {
    key: "household_size",
    text: "Number of persons living in same household including applicant*",
    required: true,
    order: 12,
  },
  {
    key: "household_members",
    text: "Particulars of ALL household members*",
    required: true,
    order: 13,
  },
  {
    key: "household_members_income",
    text: "Income of household members*",
    required: true,
    order: 14,
  },
  {
    key: "receiving_other_support",
    text: "Are you or your family receiving help or support from other charities, SSOs, FSCs or agencies? Please state them below in as much detail as possible.",
    required: false,
    order: 15,
  },
  {
    key: "educational_qualifications",
    text: "Please give us the details of all educational qualifications, excluding primary level, starting from the most current educational level, e.g. Higher Nitec, GCE 'O' Level, GCE 'N' Level*",
    required: true,
    order: 16,
  },
  {
    key: "co_curricular",
    text: "Co-curricular activities, community involvement, voluntary work, etc.",
    required: false,
    order: 17,
  },
  {
    key: "current_schemes",
    text: "Please indicate all current schemes received, rejected, pending approval, and intending to apply.*",
    required: true,
    order: 18,
  },
  {
    key: "extenuating_circumstances",
    text: "In 300 words, please state any special/extenuating circumstances in your family which make you deserving of this award and intended use of the MILK Scholarship.* - Please provide extensive information about your family circumstances.",
    required: true,
    order: 19,
  },
  {
    key: "nric_scan",
    text: "Scanned Copy of Applicant NRIC (Front & Back)*",
    required: true,
    order: 20,
  },
  {
    key: "income_documents",
    text: "Proof of Income and Financial Information of applicant and family members staying in same household. (CPF Statements, Payslips)*",
    required: true,
    order: 21,
  },
  {
    key: "recommendation_letters",
    text: "Copies of Testimonials, Recommendation Letters, Reference Letters, if any.",
    required: false,
    order: 22,
  },
  {
    key: "bank_account_details",
    text: "Provide a copy of your Bank Account details. Just the first page that shows your Bank name, your name, your address, and account number.",
    required: true,
    order: 23,
  },
];
