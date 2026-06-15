import type { V0Dataset } from "./types";

export const V0_DATA = {
  "basketBands": [
    {
      "id": "single_under_50k",
      "label": "Single-person CEX, income under $50k, CPI-adjusted to 2026 dollars",
      "maxGrossIncome": 53416,
      "minGrossIncome": 0,
      "nationalAnnual": {
        "food": 3354.52,
        "healthcare": 1760.64,
        "internet_mobile": 764.44,
        "other_nonhousing": 5508.59,
        "transportation": 6431.17
      },
      "sourceYearMaxGrossIncome": 50000,
      "sourceYearMinGrossIncome": 0,
      "unweightedQuarterRecords": 1608
    },
    {
      "id": "single_50k_100k",
      "label": "Single-person CEX, income $50k-$100k, CPI-adjusted to 2026 dollars",
      "maxGrossIncome": 106833,
      "minGrossIncome": 53416,
      "nationalAnnual": {
        "food": 4689.15,
        "healthcare": 3539.89,
        "internet_mobile": 967.21,
        "other_nonhousing": 6687.4,
        "transportation": 10142.45
      },
      "sourceYearMaxGrossIncome": 100000,
      "sourceYearMinGrossIncome": 50000,
      "unweightedQuarterRecords": 1037
    },
    {
      "id": "single_100k_155925",
      "label": "Single-person CEX, income $100k-$155,925, CPI-adjusted to 2026 dollars",
      "maxGrossIncome": 166579,
      "minGrossIncome": 106833,
      "nationalAnnual": {
        "food": 7267.12,
        "healthcare": 4869.0,
        "internet_mobile": 1005.76,
        "other_nonhousing": 10443.43,
        "transportation": 13749.98
      },
      "sourceYearMaxGrossIncome": 155925,
      "sourceYearMinGrossIncome": 100000,
      "unweightedQuarterRecords": 340
    },
    {
      "id": "single_155925_plus",
      "label": "Single-person CEX, income $155,925+, CPI-adjusted to 2026 dollars",
      "maxGrossIncome": null,
      "minGrossIncome": 166579,
      "nationalAnnual": {
        "food": 9315.19,
        "healthcare": 8311.53,
        "internet_mobile": 991.14,
        "other_nonhousing": 15472.01,
        "transportation": 11303.78
      },
      "sourceYearMaxGrossIncome": null,
      "sourceYearMinGrossIncome": 155925,
      "unweightedQuarterRecords": 74
    }
  ],
  "categoryPriceWeights": {
    "food": {
      "goods": 1.0
    },
    "healthcare": {
      "servicesOther": 1.0
    },
    "internet_mobile": {
      "servicesOther": 1.0
    },
    "other_nonhousing": {
      "goods": 0.45,
      "servicesOther": 0.55
    },
    "transportation": {
      "goods": 0.65,
      "servicesOther": 0.35
    }
  },
  "defaultGrossIncome": 175000,
  "defaultSourceId": "PLACE:4805000",
  "defaultTargetId": "PLACE:0677000",
  "dollarNormalization": {
    "base": "2024 annual average",
    "baseIndex": 313.689,
    "factor": 1.068329390112176,
    "seriesId": "CUUR0000SA0",
    "target": "May 2026",
    "targetIndex": 335.123
  },
  "fixedProfile": {
    "adults": 1,
    "children": 0,
    "citizenship": "US citizen",
    "filingStatus": "single",
    "housing": "Lives alone in a 1BR rental apartment",
    "incomeType": "W-2 wages only"
  },
  "locations": [
    {
      "annualRent1Br": 18744,
      "cbsaCode": "12420",
      "cbsaName": "Austin-Round Rock-San Marcos, TX",
      "confidence": "high",
      "countyFips": "48453",
      "countyName": "Travis County",
      "displayName": "Austin, TX",
      "id": "PLACE:4805000",
      "lat": 30.2672,
      "lon": -97.7431,
      "mapX": 47,
      "mapY": 72,
      "monthlyRent1Br": 1562,
      "placeGeoid": "4805000",
      "priceIndex": {
        "all": 98.066,
        "goods": 93.757,
        "housing": 120.361,
        "servicesOther": 96.24,
        "utilities": 82.044
      },
      "resolutionNote": "Austin spans multiple counties; this calculator uses Travis County as the computation county.",
      "shortName": "Austin",
      "state": "TX",
      "stateName": "Texas",
      "taxFlags": {}
    },
    {
      "annualRent1Br": 35784,
      "cbsaCode": "41940",
      "cbsaName": "San Jose-Sunnyvale-Santa Clara, CA",
      "confidence": "high",
      "countyFips": "06085",
      "countyName": "Santa Clara County",
      "displayName": "Sunnyvale, CA",
      "id": "PLACE:0677000",
      "lat": 37.3688,
      "lon": -122.0363,
      "mapX": 13,
      "mapY": 56,
      "monthlyRent1Br": 2982,
      "placeGeoid": "0677000",
      "priceIndex": {
        "all": 110.423,
        "goods": 105.168,
        "housing": 211.901,
        "servicesOther": 100.267,
        "utilities": 156.659
      },
      "resolutionNote": "Sunnyvale is resolved to Santa Clara County.",
      "shortName": "Sunnyvale",
      "state": "CA",
      "stateName": "California",
      "taxFlags": {}
    },
    {
      "annualRent1Br": 31860,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "36061",
      "countyName": "New York County",
      "displayName": "New York, NY",
      "id": "PLACE:3651000",
      "lat": 40.7128,
      "lon": -74.006,
      "mapX": 88,
      "mapY": 38,
      "monthlyRent1Br": 2655,
      "placeGeoid": "3651000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "New York City spans five counties; this calculator uses New York County and enables NYC resident tax.",
      "shortName": "New York",
      "state": "NY",
      "stateName": "New York",
      "taxFlags": {
        "inNyc": true
      }
    },
    {
      "annualRent1Br": 25752,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53033",
      "countyName": "King County",
      "displayName": "Seattle, WA",
      "id": "PLACE:5363000",
      "lat": 47.6062,
      "lon": -122.3321,
      "mapX": 16,
      "mapY": 24,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5363000",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Seattle is resolved to King County.",
      "shortName": "Seattle",
      "state": "WA",
      "stateName": "Washington",
      "taxFlags": {}
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08031",
      "countyName": "Denver County",
      "displayName": "Denver, CO",
      "id": "PLACE:0820000",
      "lat": 39.7392,
      "lon": -104.9903,
      "mapX": 41,
      "mapY": 49,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0820000",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Denver is resolved to Denver County and includes Denver employee occupational privilege tax.",
      "shortName": "Denver",
      "state": "CO",
      "stateName": "Colorado",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": true
      }
    },
    {
      "annualRent1Br": 19152,
      "cbsaCode": "39580",
      "cbsaName": "Raleigh-Cary, NC",
      "confidence": "high",
      "countyFips": "37183",
      "countyName": "Wake County",
      "displayName": "Raleigh, NC",
      "id": "PLACE:3755000",
      "lat": 35.7796,
      "lon": -78.6382,
      "mapX": 76,
      "mapY": 59,
      "monthlyRent1Br": 1596,
      "placeGeoid": "3755000",
      "priceIndex": {
        "all": 98.157,
        "goods": 96.621,
        "housing": 103.476,
        "servicesOther": 98.186,
        "utilities": 88.96
      },
      "resolutionNote": "Raleigh spans Wake and Durham counties; this calculator uses Wake County as the computation county.",
      "shortName": "Raleigh",
      "state": "NC",
      "stateName": "North Carolina",
      "taxFlags": {}
    }
  ],
  "modelVersion": "six_city_salary_equivalence",
  "sources": {
    "beaRpp": {
      "name": "BEA Regional Price Parities",
      "notes": "MARPP_MSA_2008_2024.csv, line codes 1 all, 2 goods, 3 housing, 4 utilities, 5 other services.",
      "url": "https://apps.bea.gov/regional/zip/MARPP.zip",
      "vintage": "2024 release"
    },
    "blsCex": {
      "name": "BLS Consumer Expenditure Survey PUMD",
      "notes": "Single-person renter consumer units with wage/salary income, no farm or non-farm business income, from FMLI summary expenditure variables; calendar-year combination follows BLS PUMD guide suffix selection.",
      "url": "https://www.bls.gov/cex/pumd/data/csv/intrvw24.zip",
      "vintage": "2024 CSV Interview Survey, CPI-adjusted to May 2026 dollars"
    },
    "blsCpi": {
      "name": "BLS Consumer Price Index",
      "notes": "CPI-U all items, U.S. city average, not seasonally adjusted; used to inflate 2024 CEX dollar amounts and income-band thresholds.",
      "url": "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0",
      "vintage": "May 2026"
    },
    "census": {
      "name": "U.S. Census geography identifiers",
      "notes": "Fixed city-to-county/CBSA mappings for the supported places.",
      "url": "https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_main.html",
      "vintage": "2025 TIGERweb places/counties and 2023 CBSA delineations"
    },
    "hudFmr": {
      "name": "HUD Fair Market Rents",
      "notes": "1BR monthly FMR values manually extracted from HUD FY2026 schedule rows for the supported FMR areas; FMR is a gross rent standard, not live market rent.",
      "url": "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY2026_FMR_Schedule.pdf",
      "vintage": "FY2026"
    },
    "policyengine": {
      "name": "PolicyEngine US",
      "notes": "Tax curves use tax year 2026, single filing status, one adult, no dependents, W-2 employment income only.",
      "url": "https://github.com/PolicyEngine/policyengine-us",
      "vintage": "policyengine-us 1.729.0"
    }
  },
  "taxYear": 2026
} as const satisfies V0Dataset;
