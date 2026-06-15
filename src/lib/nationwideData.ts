import type { SalaryDataset } from "./types";

export const SALARY_DATA = {
  "basketBands": [
    {
      "filter": {
        "CUTENURE": "4",
        "FAM_SIZE": 1,
        "FSALARYX": "> 0",
        "FSMPFRMX": 0
      },
      "id": "single_under_50k",
      "label": "Single-person CEX, income under $50k, CPI-adjusted to May 2026 dollars",
      "maxGrossIncome": 53416,
      "minGrossIncome": 0,
      "nationalAnnual": {
        "food": 3252.68,
        "healthcare": 1767.97,
        "internet_mobile": 762.54,
        "other_nonhousing": 5941.04,
        "transportation": 6064.86
      },
      "qa": {
        "categoryStats": {
          "food": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 522.41,
                "suffix": "CQ",
                "unweightedRecords": 206,
                "weightedRecords": 5817055.55
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 478.93,
                "suffix": "PQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 202.83,
                "suffix": "CQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 489.66,
                "suffix": "PQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 256.65,
                "suffix": "CQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 413.58,
                "suffix": "PQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 209.13,
                "suffix": "CQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 471.46,
                "suffix": "PQ",
                "unweightedRecords": 172,
                "weightedRecords": 5339024.22
              }
            ],
            "unweightedQuarterRecords": 1498,
            "weightedQuarterRecords": 44679030.51
          },
          "healthcare": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 130.71,
                "suffix": "CQ",
                "unweightedRecords": 206,
                "weightedRecords": 5817055.55
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 286.43,
                "suffix": "PQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 155.04,
                "suffix": "CQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 316.75,
                "suffix": "PQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 210.41,
                "suffix": "CQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 207.12,
                "suffix": "PQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 102.74,
                "suffix": "CQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 245.7,
                "suffix": "PQ",
                "unweightedRecords": 172,
                "weightedRecords": 5339024.22
              }
            ],
            "unweightedQuarterRecords": 1498,
            "weightedQuarterRecords": 44679030.51
          },
          "internet_mobile": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 47.17,
                "suffix": "CQ",
                "unweightedRecords": 206,
                "weightedRecords": 5817055.55
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 113.74,
                "suffix": "PQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 65.55,
                "suffix": "CQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 124.23,
                "suffix": "PQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 53.61,
                "suffix": "CQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 125.45,
                "suffix": "PQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 54.37,
                "suffix": "CQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 129.64,
                "suffix": "PQ",
                "unweightedRecords": 172,
                "weightedRecords": 5339024.22
              }
            ],
            "unweightedQuarterRecords": 1498,
            "weightedQuarterRecords": 44679030.51
          },
          "other_nonhousing": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 647.28,
                "suffix": "CQ",
                "unweightedRecords": 206,
                "weightedRecords": 5817055.55
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 937.98,
                "suffix": "PQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 328.14,
                "suffix": "CQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 831.94,
                "suffix": "PQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 660.71,
                "suffix": "CQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 949.94,
                "suffix": "PQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 329.18,
                "suffix": "CQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 875.89,
                "suffix": "PQ",
                "unweightedRecords": 172,
                "weightedRecords": 5339024.22
              }
            ],
            "unweightedQuarterRecords": 1498,
            "weightedQuarterRecords": 44679030.51
          },
          "transportation": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 536.8,
                "suffix": "CQ",
                "unweightedRecords": 206,
                "weightedRecords": 5817055.55
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 774.66,
                "suffix": "PQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 442.96,
                "suffix": "CQ",
                "unweightedRecords": 179,
                "weightedRecords": 5343284.89
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1172.41,
                "suffix": "PQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 500.78,
                "suffix": "CQ",
                "unweightedRecords": 187,
                "weightedRecords": 5598541.72
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 938.67,
                "suffix": "PQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 524.3,
                "suffix": "CQ",
                "unweightedRecords": 194,
                "weightedRecords": 5819648.75
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 786.38,
                "suffix": "PQ",
                "unweightedRecords": 172,
                "weightedRecords": 5339024.22
              }
            ],
            "unweightedQuarterRecords": 1498,
            "weightedQuarterRecords": 44679030.51
          }
        },
        "fileRows": {
          "intrvw24/fmli241x.csv": {
            "calendarSuffixes": [
              "CQ"
            ],
            "consumerUnitRows": 206,
            "weightedConsumerUnitRows": 5817055.55
          },
          "intrvw24/fmli242.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 179,
            "weightedConsumerUnitRows": 5343284.89
          },
          "intrvw24/fmli243.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 187,
            "weightedConsumerUnitRows": 5598541.72
          },
          "intrvw24/fmli244.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 194,
            "weightedConsumerUnitRows": 5819648.75
          },
          "intrvw24/fmli251.csv": {
            "calendarSuffixes": [
              "PQ"
            ],
            "consumerUnitRows": 172,
            "weightedConsumerUnitRows": 5339024.22
          }
        },
        "unweightedConsumerUnitRows": 938,
        "unweightedQuarterRecords": 1498,
        "weightedConsumerUnitRows": 27917555.14,
        "weightedQuarterRecords": 44679030.51
      },
      "sourceYearMaxGrossIncome": 50000,
      "sourceYearMinGrossIncome": 0,
      "sourceYearNationalAnnual": {
        "food": 3044.64,
        "healthcare": 1654.89,
        "internet_mobile": 713.76,
        "other_nonhousing": 5561.06,
        "transportation": 5676.95
      },
      "unweightedQuarterRecords": 1498,
      "weightedQuarterRecords": 44679030.51
    },
    {
      "filter": {
        "CUTENURE": "4",
        "FAM_SIZE": 1,
        "FSALARYX": "> 0",
        "FSMPFRMX": 0
      },
      "id": "single_50k_100k",
      "label": "Single-person CEX, income $50k-$100k, CPI-adjusted to May 2026 dollars",
      "maxGrossIncome": 106833,
      "minGrossIncome": 53416,
      "nationalAnnual": {
        "food": 4602.7,
        "healthcare": 3565.82,
        "internet_mobile": 989.04,
        "other_nonhousing": 7219.11,
        "transportation": 8891.52
      },
      "qa": {
        "categoryStats": {
          "food": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 612.92,
                "suffix": "CQ",
                "unweightedRecords": 121,
                "weightedRecords": 3275097.79
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 622.5,
                "suffix": "PQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 347.22,
                "suffix": "CQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 654.7,
                "suffix": "PQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 364.08,
                "suffix": "CQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 694.07,
                "suffix": "PQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 434.74,
                "suffix": "CQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 578.08,
                "suffix": "PQ",
                "unweightedRecords": 119,
                "weightedRecords": 3734607.86
              }
            ],
            "unweightedQuarterRecords": 988,
            "weightedQuarterRecords": 27015733.03
          },
          "healthcare": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 288.27,
                "suffix": "CQ",
                "unweightedRecords": 121,
                "weightedRecords": 3275097.79
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 483.84,
                "suffix": "PQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 297.03,
                "suffix": "CQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 570.21,
                "suffix": "PQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 228.6,
                "suffix": "CQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 559.03,
                "suffix": "PQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 298.26,
                "suffix": "CQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 612.51,
                "suffix": "PQ",
                "unweightedRecords": 119,
                "weightedRecords": 3734607.86
              }
            ],
            "unweightedQuarterRecords": 988,
            "weightedQuarterRecords": 27015733.03
          },
          "internet_mobile": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 74.06,
                "suffix": "CQ",
                "unweightedRecords": 121,
                "weightedRecords": 3275097.79
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 153.37,
                "suffix": "PQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 66.09,
                "suffix": "CQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 141.86,
                "suffix": "PQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 77.45,
                "suffix": "CQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 155.25,
                "suffix": "PQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 90.27,
                "suffix": "CQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 167.43,
                "suffix": "PQ",
                "unweightedRecords": 119,
                "weightedRecords": 3734607.86
              }
            ],
            "unweightedQuarterRecords": 988,
            "weightedQuarterRecords": 27015733.03
          },
          "other_nonhousing": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 489.64,
                "suffix": "CQ",
                "unweightedRecords": 121,
                "weightedRecords": 3275097.79
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1067.17,
                "suffix": "PQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 579.26,
                "suffix": "CQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1219.12,
                "suffix": "PQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 675.83,
                "suffix": "CQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1015.74,
                "suffix": "PQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 631.52,
                "suffix": "CQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 1079.1,
                "suffix": "PQ",
                "unweightedRecords": 119,
                "weightedRecords": 3734607.86
              }
            ],
            "unweightedQuarterRecords": 988,
            "weightedQuarterRecords": 27015733.03
          },
          "transportation": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 787.96,
                "suffix": "CQ",
                "unweightedRecords": 121,
                "weightedRecords": 3275097.79
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1152.22,
                "suffix": "PQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 907.52,
                "suffix": "CQ",
                "unweightedRecords": 120,
                "weightedRecords": 3379905.75
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 2101.23,
                "suffix": "PQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 849.71,
                "suffix": "CQ",
                "unweightedRecords": 128,
                "weightedRecords": 3344473.43
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1067.41,
                "suffix": "PQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 472.75,
                "suffix": "CQ",
                "unweightedRecords": 126,
                "weightedRecords": 3278634.51
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 984.03,
                "suffix": "PQ",
                "unweightedRecords": 119,
                "weightedRecords": 3734607.86
              }
            ],
            "unweightedQuarterRecords": 988,
            "weightedQuarterRecords": 27015733.03
          }
        },
        "fileRows": {
          "intrvw24/fmli241x.csv": {
            "calendarSuffixes": [
              "CQ"
            ],
            "consumerUnitRows": 121,
            "weightedConsumerUnitRows": 3275097.79
          },
          "intrvw24/fmli242.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 120,
            "weightedConsumerUnitRows": 3379905.75
          },
          "intrvw24/fmli243.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 128,
            "weightedConsumerUnitRows": 3344473.43
          },
          "intrvw24/fmli244.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 126,
            "weightedConsumerUnitRows": 3278634.51
          },
          "intrvw24/fmli251.csv": {
            "calendarSuffixes": [
              "PQ"
            ],
            "consumerUnitRows": 119,
            "weightedConsumerUnitRows": 3734607.86
          }
        },
        "unweightedConsumerUnitRows": 614,
        "unweightedQuarterRecords": 988,
        "weightedConsumerUnitRows": 17012719.34,
        "weightedQuarterRecords": 27015733.03
      },
      "sourceYearMaxGrossIncome": 100000,
      "sourceYearMinGrossIncome": 50000,
      "sourceYearNationalAnnual": {
        "food": 4308.31,
        "healthcare": 3337.75,
        "internet_mobile": 925.79,
        "other_nonhousing": 6757.38,
        "transportation": 8322.83
      },
      "unweightedQuarterRecords": 988,
      "weightedQuarterRecords": 27015733.03
    },
    {
      "filter": {
        "CUTENURE": "4",
        "FAM_SIZE": 1,
        "FSALARYX": "> 0",
        "FSMPFRMX": 0
      },
      "id": "single_100k_155925",
      "label": "Single-person CEX, income $100k-$155,925, CPI-adjusted to May 2026 dollars",
      "maxGrossIncome": 166579,
      "minGrossIncome": 106833,
      "nationalAnnual": {
        "food": 7267.43,
        "healthcare": 4897.85,
        "internet_mobile": 1009.74,
        "other_nonhousing": 10968.42,
        "transportation": 13746.25
      },
      "qa": {
        "categoryStats": {
          "food": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 904.33,
                "suffix": "CQ",
                "unweightedRecords": 49,
                "weightedRecords": 1351012.68
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1034.42,
                "suffix": "PQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 321.42,
                "suffix": "CQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1315.09,
                "suffix": "PQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 377.1,
                "suffix": "CQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1230.97,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 559.29,
                "suffix": "CQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 1059.99,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 1032988.29
              }
            ],
            "unweightedQuarterRecords": 337,
            "weightedQuarterRecords": 9113282.12
          },
          "healthcare": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 681.56,
                "suffix": "CQ",
                "unweightedRecords": 49,
                "weightedRecords": 1351012.68
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 898.68,
                "suffix": "PQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 437.91,
                "suffix": "CQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 618.46,
                "suffix": "PQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 236.91,
                "suffix": "CQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 781.92,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 233.18,
                "suffix": "CQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 695.97,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 1032988.29
              }
            ],
            "unweightedQuarterRecords": 337,
            "weightedQuarterRecords": 9113282.12
          },
          "internet_mobile": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 59.01,
                "suffix": "CQ",
                "unweightedRecords": 49,
                "weightedRecords": 1351012.68
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 196.02,
                "suffix": "PQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 44.37,
                "suffix": "CQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 173.83,
                "suffix": "PQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 80.66,
                "suffix": "CQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 161.98,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 68.86,
                "suffix": "CQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 160.43,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 1032988.29
              }
            ],
            "unweightedQuarterRecords": 337,
            "weightedQuarterRecords": 9113282.12
          },
          "other_nonhousing": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 639.88,
                "suffix": "CQ",
                "unweightedRecords": 49,
                "weightedRecords": 1351012.68
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 2256.68,
                "suffix": "PQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 494.6,
                "suffix": "CQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1711.83,
                "suffix": "PQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 588.43,
                "suffix": "CQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1968.77,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1113.86,
                "suffix": "CQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 1492.83,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 1032988.29
              }
            ],
            "unweightedQuarterRecords": 337,
            "weightedQuarterRecords": 9113282.12
          },
          "transportation": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 1169.37,
                "suffix": "CQ",
                "unweightedRecords": 49,
                "weightedRecords": 1351012.68
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1293.12,
                "suffix": "PQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1229.12,
                "suffix": "CQ",
                "unweightedRecords": 48,
                "weightedRecords": 1383837.25
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 3251.92,
                "suffix": "PQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1691.42,
                "suffix": "CQ",
                "unweightedRecords": 42,
                "weightedRecords": 1126423.47
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 1019.31,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 507.69,
                "suffix": "CQ",
                "unweightedRecords": 36,
                "weightedRecords": 854379.86
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 2705.1,
                "suffix": "PQ",
                "unweightedRecords": 36,
                "weightedRecords": 1032988.29
              }
            ],
            "unweightedQuarterRecords": 337,
            "weightedQuarterRecords": 9113282.12
          }
        },
        "fileRows": {
          "intrvw24/fmli241x.csv": {
            "calendarSuffixes": [
              "CQ"
            ],
            "consumerUnitRows": 49,
            "weightedConsumerUnitRows": 1351012.68
          },
          "intrvw24/fmli242.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 48,
            "weightedConsumerUnitRows": 1383837.25
          },
          "intrvw24/fmli243.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 42,
            "weightedConsumerUnitRows": 1126423.47
          },
          "intrvw24/fmli244.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 36,
            "weightedConsumerUnitRows": 854379.86
          },
          "intrvw24/fmli251.csv": {
            "calendarSuffixes": [
              "PQ"
            ],
            "consumerUnitRows": 36,
            "weightedConsumerUnitRows": 1032988.29
          }
        },
        "unweightedConsumerUnitRows": 211,
        "unweightedQuarterRecords": 337,
        "weightedConsumerUnitRows": 5748641.55,
        "weightedQuarterRecords": 9113282.12
      },
      "sourceYearMaxGrossIncome": 155925,
      "sourceYearMinGrossIncome": 100000,
      "sourceYearNationalAnnual": {
        "food": 6802.61,
        "healthcare": 4584.59,
        "internet_mobile": 945.15,
        "other_nonhousing": 10266.89,
        "transportation": 12867.05
      },
      "unweightedQuarterRecords": 337,
      "weightedQuarterRecords": 9113282.12
    },
    {
      "filter": {
        "CUTENURE": "4",
        "FAM_SIZE": 1,
        "FSALARYX": "> 0",
        "FSMPFRMX": 0
      },
      "id": "single_155925_plus",
      "label": "Single-person CEX, income $155,925+, CPI-adjusted to May 2026 dollars",
      "maxGrossIncome": null,
      "minGrossIncome": 166579,
      "nationalAnnual": {
        "food": 9265.54,
        "healthcare": 8179.79,
        "internet_mobile": 993.29,
        "other_nonhousing": 16604.08,
        "transportation": 11331.61
      },
      "qa": {
        "categoryStats": {
          "food": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 990.53,
                "suffix": "CQ",
                "unweightedRecords": 8,
                "weightedRecords": 186112.99
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1704.19,
                "suffix": "PQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 122.71,
                "suffix": "CQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1765.03,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 657.18,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 907.91,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 430.17,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 2095.2,
                "suffix": "PQ",
                "unweightedRecords": 11,
                "weightedRecords": 288958.99
              }
            ],
            "unweightedQuarterRecords": 71,
            "weightedQuarterRecords": 1701324.18
          },
          "healthcare": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 170.12,
                "suffix": "CQ",
                "unweightedRecords": 8,
                "weightedRecords": 186112.99
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 2120.92,
                "suffix": "PQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 87.5,
                "suffix": "CQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 522.05,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 436.95,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 736.83,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 568.46,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 3013.77,
                "suffix": "PQ",
                "unweightedRecords": 11,
                "weightedRecords": 288958.99
              }
            ],
            "unweightedQuarterRecords": 71,
            "weightedQuarterRecords": 1701324.18
          },
          "internet_mobile": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 60.67,
                "suffix": "CQ",
                "unweightedRecords": 8,
                "weightedRecords": 186112.99
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 115.86,
                "suffix": "PQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 29.43,
                "suffix": "CQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 91.2,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 21.52,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 193.81,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 41.49,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 375.76,
                "suffix": "PQ",
                "unweightedRecords": 11,
                "weightedRecords": 288958.99
              }
            ],
            "unweightedQuarterRecords": 71,
            "weightedQuarterRecords": 1701324.18
          },
          "other_nonhousing": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 434.1,
                "suffix": "CQ",
                "unweightedRecords": 8,
                "weightedRecords": 186112.99
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 3397.97,
                "suffix": "PQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 416.44,
                "suffix": "CQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 1985.07,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 661.6,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 3789.41,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 607.05,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 4250.45,
                "suffix": "PQ",
                "unweightedRecords": 11,
                "weightedRecords": 288958.99
              }
            ],
            "unweightedQuarterRecords": 71,
            "weightedQuarterRecords": 1701324.18
          },
          "transportation": {
            "suffixStats": [
              {
                "file": "intrvw24/fmli241x.csv",
                "sourceYearQuarterMean": 687.48,
                "suffix": "CQ",
                "unweightedRecords": 8,
                "weightedRecords": 186112.99
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 1368.21,
                "suffix": "PQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli242.csv",
                "sourceYearQuarterMean": 218.7,
                "suffix": "CQ",
                "unweightedRecords": 6,
                "weightedRecords": 130500.66
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 3346.19,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli243.csv",
                "sourceYearQuarterMean": 391.43,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 194685.68
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 752.69,
                "suffix": "PQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli244.csv",
                "sourceYearQuarterMean": 575.39,
                "suffix": "CQ",
                "unweightedRecords": 10,
                "weightedRecords": 287939.76
              },
              {
                "file": "intrvw24/fmli251.csv",
                "sourceYearQuarterMean": 3266.76,
                "suffix": "PQ",
                "unweightedRecords": 11,
                "weightedRecords": 288958.99
              }
            ],
            "unweightedQuarterRecords": 71,
            "weightedQuarterRecords": 1701324.18
          }
        },
        "fileRows": {
          "intrvw24/fmli241x.csv": {
            "calendarSuffixes": [
              "CQ"
            ],
            "consumerUnitRows": 8,
            "weightedConsumerUnitRows": 186112.99
          },
          "intrvw24/fmli242.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 6,
            "weightedConsumerUnitRows": 130500.66
          },
          "intrvw24/fmli243.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 10,
            "weightedConsumerUnitRows": 194685.68
          },
          "intrvw24/fmli244.csv": {
            "calendarSuffixes": [
              "PQ",
              "CQ"
            ],
            "consumerUnitRows": 10,
            "weightedConsumerUnitRows": 287939.76
          },
          "intrvw24/fmli251.csv": {
            "calendarSuffixes": [
              "PQ"
            ],
            "consumerUnitRows": 11,
            "weightedConsumerUnitRows": 288958.99
          }
        },
        "unweightedConsumerUnitRows": 45,
        "unweightedQuarterRecords": 71,
        "weightedConsumerUnitRows": 1088198.08,
        "weightedQuarterRecords": 1701324.18
      },
      "sourceYearMaxGrossIncome": null,
      "sourceYearMinGrossIncome": 155925,
      "sourceYearNationalAnnual": {
        "food": 8672.93,
        "healthcare": 7656.62,
        "internet_mobile": 929.76,
        "other_nonhousing": 15542.1,
        "transportation": 10606.85
      },
      "unweightedQuarterRecords": 71,
      "weightedQuarterRecords": 1701324.18
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
      "annualRent1Br": 31860,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "36047",
      "countyName": "Kings County",
      "displayName": "New York, NY",
      "id": "PLACE:3651000",
      "lat": 40.662712,
      "lon": -73.938677,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2655,
      "placeGeoid": "3651000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "New York, NY uses Kings County as the computation county. The city spans 5 county parts; the computation county has 30.9% of 2025 city population.",
      "shortName": "New York",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": true
      },
      "taxNotes": [
        "NYC resident income tax enabled through PolicyEngine `in_nyc`."
      ]
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Los Angeles, CA",
      "id": "PLACE:0644000",
      "lat": 34.019394,
      "lon": -118.410825,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0644000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Los Angeles, CA uses Los Angeles County as the computation county.",
      "shortName": "Los Angeles",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18972,
      "cbsaCode": "16980",
      "cbsaName": "Chicago-Naperville-Elgin, IL-IN",
      "confidence": "high",
      "countyFips": "17031",
      "countyName": "Cook County",
      "displayName": "Chicago, IL",
      "id": "PLACE:1714000",
      "lat": 41.837045,
      "lon": -87.684939,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1581,
      "placeGeoid": "1714000",
      "priceIndex": {
        "all": 103.595,
        "goods": 107.258,
        "housing": 112.01,
        "servicesOther": 100.492,
        "utilities": 83.581
      },
      "resolutionNote": "Chicago, IL uses Cook County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Chicago",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15876,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "high",
      "countyFips": "48201",
      "countyName": "Harris County",
      "displayName": "Houston, TX",
      "id": "PLACE:4835000",
      "lat": 29.785743,
      "lon": -95.388806,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1323,
      "placeGeoid": "4835000",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "Houston, TX uses Harris County as the computation county. The city spans 4 county parts; the computation county has 97.9% of 2025 city population.",
      "shortName": "Houston",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Phoenix, AZ",
      "id": "PLACE:0455000",
      "lat": 33.572154,
      "lon": -112.090132,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0455000",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Phoenix, AZ uses Maricopa County as the computation county.",
      "shortName": "Phoenix",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18240,
      "cbsaCode": "37980",
      "cbsaName": "Philadelphia-Camden-Wilmington, PA-NJ-DE-MD",
      "confidence": "high",
      "countyFips": "42101",
      "countyName": "Philadelphia County",
      "displayName": "Philadelphia, PA",
      "id": "PLACE:4260000",
      "lat": 40.009376,
      "lon": -75.133346,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1520,
      "placeGeoid": "4260000",
      "priceIndex": {
        "all": 102.554,
        "goods": 96.833,
        "housing": 113.141,
        "servicesOther": 103.052,
        "utilities": 114.389
      },
      "resolutionNote": "Philadelphia, PA uses Philadelphia County as the computation county.",
      "shortName": "Philadelphia",
      "state": "PA",
      "stateName": "Pennsylvania",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Philadelphia resident wage tax enabled through PolicyEngine Philadelphia wage-tax inputs."
      ]
    },
    {
      "annualRent1Br": 14124,
      "cbsaCode": "41700",
      "cbsaName": "San Antonio-New Braunfels, TX",
      "confidence": "medium",
      "countyFips": "48029",
      "countyName": "Bexar County",
      "displayName": "San Antonio, TX",
      "id": "PLACE:4865000",
      "lat": 29.462809,
      "lon": -98.524635,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1177,
      "placeGeoid": "4865000",
      "priceIndex": {
        "all": 94.716,
        "goods": 93.757,
        "housing": 94.575,
        "servicesOther": 96.24,
        "utilities": 82.169
      },
      "resolutionNote": "San Antonio, TX uses Bexar County as the computation county. The city spans 3 county parts; the computation county has 100.0% of 2025 city population. Housing uses the dominant HUD FMR area (San Antonio-New Braunfels, TX HUD Metro FMR Area, 100.0% population share).",
      "shortName": "San Antonio",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "San Diego, CA",
      "id": "PLACE:0666000",
      "lat": 32.830391,
      "lon": -117.120923,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0666000",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "San Diego, CA uses San Diego County as the computation county.",
      "shortName": "San Diego",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Dallas, TX",
      "id": "PLACE:4819000",
      "lat": 32.793333,
      "lon": -96.766513,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4819000",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Dallas, TX uses Dallas County as the computation county. The city spans 5 county parts; the computation county has 93.7% of 2025 city population.",
      "shortName": "Dallas",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17676,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "medium",
      "countyFips": "48439",
      "countyName": "Tarrant County",
      "displayName": "Fort Worth, TX",
      "id": "PLACE:4827000",
      "lat": 32.781954,
      "lon": -97.348573,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1473,
      "placeGeoid": "4827000",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Fort Worth, TX uses Tarrant County as the computation county. The city spans 5 county parts; the computation county has 97.9% of 2025 city population. Housing uses the dominant HUD FMR area (Fort Worth-Arlington, TX HUD Metro FMR Area, 98.1% population share).",
      "shortName": "Fort Worth",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16584,
      "cbsaCode": "27260",
      "cbsaName": "Jacksonville, FL",
      "confidence": "high",
      "countyFips": "12031",
      "countyName": "Duval County",
      "displayName": "Jacksonville, FL",
      "id": "PLACE:1235000",
      "lat": 30.336864,
      "lon": -81.661603,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1382,
      "placeGeoid": "1235000",
      "priceIndex": {
        "all": 99.484,
        "goods": 96.24,
        "housing": 109.777,
        "servicesOther": 98.864,
        "utilities": 87.514
      },
      "resolutionNote": "Jacksonville, FL uses Duval County as the computation county.",
      "shortName": "Jacksonville",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18744,
      "cbsaCode": "12420",
      "cbsaName": "Austin-Round Rock-San Marcos, TX",
      "confidence": "high",
      "countyFips": "48453",
      "countyName": "Travis County",
      "displayName": "Austin, TX",
      "id": "PLACE:4805000",
      "lat": 30.298622,
      "lon": -97.754134,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1562,
      "placeGeoid": "4805000",
      "priceIndex": {
        "all": 98.066,
        "goods": 93.757,
        "housing": 120.361,
        "servicesOther": 96.24,
        "utilities": 82.044
      },
      "resolutionNote": "Austin, TX uses Travis County as the computation county. The city spans 4 county parts; the computation county has 92.7% of 2025 city population.",
      "shortName": "Austin",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 35784,
      "cbsaCode": "41940",
      "cbsaName": "San Jose-Sunnyvale-Santa Clara, CA",
      "confidence": "high",
      "countyFips": "06085",
      "countyName": "Santa Clara County",
      "displayName": "San Jose, CA",
      "id": "PLACE:0668000",
      "lat": 37.296011,
      "lon": -121.814552,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2982,
      "placeGeoid": "0668000",
      "priceIndex": {
        "all": 110.423,
        "goods": 105.168,
        "housing": 211.901,
        "servicesOther": 100.267,
        "utilities": 156.659
      },
      "resolutionNote": "San Jose, CA uses Santa Clara County as the computation county.",
      "shortName": "San Jose",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18456,
      "cbsaCode": "16740",
      "cbsaName": "Charlotte-Concord-Gastonia, NC-SC",
      "confidence": "high",
      "countyFips": "37119",
      "countyName": "Mecklenburg County",
      "displayName": "Charlotte, NC",
      "id": "PLACE:3712000",
      "lat": 35.209045,
      "lon": -80.83099,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1538,
      "placeGeoid": "3712000",
      "priceIndex": {
        "all": 97.348,
        "goods": 96.58,
        "housing": 97.635,
        "servicesOther": 98.2,
        "utilities": 89.164
      },
      "resolutionNote": "Charlotte, NC uses Mecklenburg County as the computation county.",
      "shortName": "Charlotte",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14328,
      "cbsaCode": "18140",
      "cbsaName": "Columbus, OH",
      "confidence": "low",
      "countyFips": "39049",
      "countyName": "Franklin County",
      "displayName": "Columbus, OH",
      "id": "PLACE:3918000",
      "lat": 39.985531,
      "lon": -82.985594,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1194,
      "placeGeoid": "3918000",
      "priceIndex": {
        "all": 95.469,
        "goods": 93.628,
        "housing": 87.945,
        "servicesOther": 98.939,
        "utilities": 95.523
      },
      "resolutionNote": "Columbus, OH uses Franklin County as the computation county. The city spans 3 county parts; the computation county has 97.1% of 2025 city population. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Columbus",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 15204,
      "cbsaCode": "26900",
      "cbsaName": "Indianapolis-Carmel-Greenwood, IN",
      "confidence": "high",
      "countyFips": "18097",
      "countyName": "Marion County",
      "displayName": "Indianapolis, IN",
      "id": "PLACE:1836003",
      "lat": 39.776664,
      "lon": -86.145935,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1267,
      "placeGeoid": "1836003",
      "priceIndex": {
        "all": 95.696,
        "goods": 94.318,
        "housing": 88.917,
        "servicesOther": 99.141,
        "utilities": 86.358
      },
      "resolutionNote": "Indianapolis, IN uses Marion County as the computation county.",
      "shortName": "Indianapolis",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 35724,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06075",
      "countyName": "San Francisco County",
      "displayName": "San Francisco, CA",
      "id": "PLACE:0667000",
      "lat": 37.727239,
      "lon": -123.032229,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2977,
      "placeGeoid": "0667000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "San Francisco, CA uses San Francisco County as the computation county.",
      "shortName": "San Francisco",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
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
      "lat": 47.619335,
      "lon": -122.351538,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5363000",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Seattle, WA uses King County as the computation county.",
      "shortName": "Seattle",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
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
      "lat": 39.76185,
      "lon": -104.881105,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0820000",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Denver, CO uses Denver County as the computation county.",
      "shortName": "Denver",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": true,
        "inNyc": false
      },
      "taxNotes": [
        "Denver employee occupational privilege tax enabled for all 12 months."
      ]
    },
    {
      "annualRent1Br": 18936,
      "cbsaCode": "34980",
      "cbsaName": "Nashville-Davidson--Murfreesboro--Franklin, TN",
      "confidence": "high",
      "countyFips": "47037",
      "countyName": "Davidson County",
      "displayName": "Nashville-Davidson, TN",
      "id": "PLACE:4752006",
      "lat": 36.1718,
      "lon": -86.785002,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1578,
      "placeGeoid": "4752006",
      "priceIndex": {
        "all": 96.338,
        "goods": 96.247,
        "housing": 104.626,
        "servicesOther": 95.142,
        "utilities": 71.95
      },
      "resolutionNote": "Nashville-Davidson, TN uses Davidson County as the computation county.",
      "shortName": "Nashville-Davidson",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12204,
      "cbsaCode": "36420",
      "cbsaName": "Oklahoma City, OK",
      "confidence": "medium",
      "countyFips": "40109",
      "countyName": "Oklahoma County",
      "displayName": "Oklahoma City, OK",
      "id": "PLACE:4055000",
      "lat": 35.467079,
      "lon": -97.513657,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1017,
      "placeGeoid": "4055000",
      "priceIndex": {
        "all": 90.408,
        "goods": 93.778,
        "housing": 73.885,
        "servicesOther": 95.458,
        "utilities": 74.067
      },
      "resolutionNote": "Oklahoma City, OK uses Oklahoma County as the computation county. The city spans 4 county parts; the computation county has 75.6% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Oklahoma City, OK HUD Metro FMR Area, 100.0% population share).",
      "shortName": "Oklahoma City",
      "state": "OK",
      "stateName": "Oklahoma",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 24180,
      "cbsaCode": "47900",
      "cbsaName": "Washington-Arlington-Alexandria, DC-VA-MD-WV",
      "confidence": "high",
      "countyFips": "11001",
      "countyName": "District of Columbia",
      "displayName": "Washington, DC",
      "id": "PLACE:1150000",
      "lat": 38.904243,
      "lon": -77.016524,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2015,
      "placeGeoid": "1150000",
      "priceIndex": {
        "all": 108.884,
        "goods": 104.847,
        "housing": 151.134,
        "servicesOther": 102.321,
        "utilities": 106.7
      },
      "resolutionNote": "Washington, DC uses District of Columbia as the computation county.",
      "shortName": "Washington",
      "state": "DC",
      "stateName": "District of Columbia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12156,
      "cbsaCode": "21340",
      "cbsaName": "El Paso, TX",
      "confidence": "high",
      "countyFips": "48141",
      "countyName": "El Paso County",
      "displayName": "El Paso, TX",
      "id": "PLACE:4824000",
      "lat": 31.84778,
      "lon": -106.431106,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1013,
      "placeGeoid": "4824000",
      "priceIndex": {
        "all": 89.912,
        "goods": 93.757,
        "housing": 71.248,
        "servicesOther": 96.24,
        "utilities": 82.585
      },
      "resolutionNote": "El Paso, TX uses El Paso County as the computation county.",
      "shortName": "El Paso",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17736,
      "cbsaCode": "29820",
      "cbsaName": "Las Vegas-Henderson-North Las Vegas, NV",
      "confidence": "high",
      "countyFips": "32003",
      "countyName": "Clark County",
      "displayName": "Las Vegas, NV",
      "id": "PLACE:3240000",
      "lat": 36.233499,
      "lon": -115.264037,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1478,
      "placeGeoid": "3240000",
      "priceIndex": {
        "all": 100.215,
        "goods": 96.271,
        "housing": 115.538,
        "servicesOther": 98.744,
        "utilities": 90.646
      },
      "resolutionNote": "Las Vegas, NV uses Clark County as the computation county.",
      "shortName": "Las Vegas",
      "state": "NV",
      "stateName": "Nevada",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29712,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25025",
      "countyName": "Suffolk County",
      "displayName": "Boston, MA",
      "id": "PLACE:2507000",
      "lat": 42.338551,
      "lon": -71.018253,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2476,
      "placeGeoid": "2507000",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Boston, MA uses Suffolk County as the computation county.",
      "shortName": "Boston",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13464,
      "cbsaCode": "19820",
      "cbsaName": "Detroit-Warren-Dearborn, MI",
      "confidence": "low",
      "countyFips": "26163",
      "countyName": "Wayne County",
      "displayName": "Detroit, MI",
      "id": "PLACE:2622000",
      "lat": 42.383037,
      "lon": -83.102237,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1122,
      "placeGeoid": "2622000",
      "priceIndex": {
        "all": 100.298,
        "goods": 98.817,
        "housing": 94.69,
        "servicesOther": 102.591,
        "utilities": 106.988
      },
      "resolutionNote": "Detroit, MI uses Wayne County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Detroit",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 12564,
      "cbsaCode": "31140",
      "cbsaName": "Louisville/Jefferson County, KY-IN",
      "confidence": "low",
      "countyFips": "21111",
      "countyName": "Jefferson County",
      "displayName": "Louisville/Jefferson County, KY",
      "id": "PLACE:2148006",
      "lat": 38.165376,
      "lon": -85.647377,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1047,
      "placeGeoid": "2148006",
      "priceIndex": {
        "all": 93.074,
        "goods": 96.23,
        "housing": 78.558,
        "servicesOther": 96.796,
        "utilities": 74.957
      },
      "resolutionNote": "Louisville/Jefferson County, KY uses Jefferson County as the computation county. Kentucky local occupational/license taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Louisville/Jefferson County",
      "state": "KY",
      "stateName": "Kentucky",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Kentucky local occupational/license taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 20124,
      "cbsaCode": "38900",
      "cbsaName": "Portland-Vancouver-Hillsboro, OR-WA",
      "confidence": "low",
      "countyFips": "41051",
      "countyName": "Multnomah County",
      "displayName": "Portland, OR",
      "id": "PLACE:4159000",
      "lat": 45.536951,
      "lon": -122.649971,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1677,
      "placeGeoid": "4159000",
      "priceIndex": {
        "all": 105.421,
        "goods": 105.222,
        "housing": 125.114,
        "servicesOther": 100.136,
        "utilities": 106.974
      },
      "resolutionNote": "Portland, OR uses Multnomah County as the computation county. The city spans 3 county parts; the computation county has 99.6% of 2025 city population. Portland-area Metro/Multnomah local personal taxes are only partially modeled; Multnomah PFA may be modeled by county, but Metro SHS is not confirmed in PolicyEngine 1.729.0.",
      "shortName": "Portland",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Portland-area Metro/Multnomah local personal taxes are only partially modeled; Multnomah PFA may be modeled by county, but Metro SHS is not confirmed in PolicyEngine 1.729.0."
      ]
    },
    {
      "annualRent1Br": 13848,
      "cbsaCode": "32820",
      "cbsaName": "Memphis, TN-MS-AR",
      "confidence": "high",
      "countyFips": "47157",
      "countyName": "Shelby County",
      "displayName": "Memphis, TN",
      "id": "PLACE:4748000",
      "lat": 35.109164,
      "lon": -89.968511,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1154,
      "placeGeoid": "4748000",
      "priceIndex": {
        "all": 92.179,
        "goods": 96.221,
        "housing": 79.807,
        "servicesOther": 95.372,
        "utilities": 74.097
      },
      "resolutionNote": "Memphis, TN uses Shelby County as the computation county.",
      "shortName": "Memphis",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18132,
      "cbsaCode": "12580",
      "cbsaName": "Baltimore-Columbia-Towson, MD",
      "confidence": "high",
      "countyFips": "24510",
      "countyName": "Baltimore city",
      "displayName": "Baltimore, MD",
      "id": "PLACE:2404000",
      "lat": 39.300032,
      "lon": -76.610476,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1511,
      "placeGeoid": "2404000",
      "priceIndex": {
        "all": 104.487,
        "goods": 102.353,
        "housing": 118.194,
        "servicesOther": 101.496,
        "utilities": 110.215
      },
      "resolutionNote": "Baltimore, MD uses Baltimore city as the computation county.",
      "shortName": "Baltimore",
      "state": "MD",
      "stateName": "Maryland",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Maryland county local income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 13428,
      "cbsaCode": "33340",
      "cbsaName": "Milwaukee-Waukesha, WI",
      "confidence": "high",
      "countyFips": "55079",
      "countyName": "Milwaukee County",
      "displayName": "Milwaukee, WI",
      "id": "PLACE:5553000",
      "lat": 43.063348,
      "lon": -87.966695,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1119,
      "placeGeoid": "5553000",
      "priceIndex": {
        "all": 96.937,
        "goods": 93.787,
        "housing": 97.111,
        "servicesOther": 99.411,
        "utilities": 91.59
      },
      "resolutionNote": "Milwaukee, WI uses Milwaukee County as the computation county. The city spans 3 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Milwaukee",
      "state": "WI",
      "stateName": "Wisconsin",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14220,
      "cbsaCode": "10740",
      "cbsaName": "Albuquerque, NM",
      "confidence": "high",
      "countyFips": "35001",
      "countyName": "Bernalillo County",
      "displayName": "Albuquerque, NM",
      "id": "PLACE:3502000",
      "lat": 35.10478,
      "lon": -106.646809,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1185,
      "placeGeoid": "3502000",
      "priceIndex": {
        "all": 95.546,
        "goods": 96.144,
        "housing": 89.153,
        "servicesOther": 98.54,
        "utilities": 77.852
      },
      "resolutionNote": "Albuquerque, NM uses Bernalillo County as the computation county.",
      "shortName": "Albuquerque",
      "state": "NM",
      "stateName": "New Mexico",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16260,
      "cbsaCode": "23420",
      "cbsaName": "Fresno, CA",
      "confidence": "high",
      "countyFips": "06019",
      "countyName": "Fresno County",
      "displayName": "Fresno, CA",
      "id": "PLACE:0627000",
      "lat": 36.782684,
      "lon": -119.793359,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1355,
      "placeGeoid": "0627000",
      "priceIndex": {
        "all": 102.158,
        "goods": 105.168,
        "housing": 95.725,
        "servicesOther": 100.267,
        "utilities": 161.01
      },
      "resolutionNote": "Fresno, CA uses Fresno County as the computation county.",
      "shortName": "Fresno",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12972,
      "cbsaCode": "46060",
      "cbsaName": "Tucson, AZ",
      "confidence": "high",
      "countyFips": "04019",
      "countyName": "Pima County",
      "displayName": "Tucson, AZ",
      "id": "PLACE:0477000",
      "lat": 32.153036,
      "lon": -110.870773,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1081,
      "placeGeoid": "0477000",
      "priceIndex": {
        "all": 96.896,
        "goods": 96.237,
        "housing": 91.765,
        "servicesOther": 99.838,
        "utilities": 89.521
      },
      "resolutionNote": "Tucson, AZ uses Pima County as the computation county.",
      "shortName": "Tucson",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21984,
      "cbsaCode": "40900",
      "cbsaName": "Sacramento-Roseville-Folsom, CA",
      "confidence": "high",
      "countyFips": "06067",
      "countyName": "Sacramento County",
      "displayName": "Sacramento, CA",
      "id": "PLACE:0664000",
      "lat": 38.567694,
      "lon": -121.468161,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1832,
      "placeGeoid": "0664000",
      "priceIndex": {
        "all": 106.67,
        "goods": 105.168,
        "housing": 130.23,
        "servicesOther": 100.267,
        "utilities": 151.29
      },
      "resolutionNote": "Sacramento, CA uses Sacramento County as the computation county.",
      "shortName": "Sacramento",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19920,
      "cbsaCode": "12060",
      "cbsaName": "Atlanta-Sandy Springs-Roswell, GA",
      "confidence": "high",
      "countyFips": "13121",
      "countyName": "Fulton County",
      "displayName": "Atlanta, GA",
      "id": "PLACE:1304000",
      "lat": 33.762909,
      "lon": -84.422675,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1660,
      "placeGeoid": "1304000",
      "priceIndex": {
        "all": 100.058,
        "goods": 100.416,
        "housing": 111.022,
        "servicesOther": 96.701,
        "utilities": 96.239
      },
      "resolutionNote": "Atlanta, GA uses Fulton County as the computation county. The city spans 2 county parts; the computation county has 91.8% of 2025 city population.",
      "shortName": "Atlanta",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "29095",
      "countyName": "Jackson County",
      "displayName": "Kansas City, MO",
      "id": "PLACE:2938000",
      "lat": 39.125155,
      "lon": -94.550313,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2938000",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Kansas City, MO uses Jackson County as the computation county. The city spans 4 county parts; the computation county has 61.5% of 2025 city population.",
      "shortName": "Kansas City",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Kansas City earnings tax enabled through PolicyEngine taxable earnings input."
      ]
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Mesa, AZ",
      "id": "PLACE:0446000",
      "lat": 33.399355,
      "lon": -111.715968,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0446000",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Mesa, AZ uses Maricopa County as the computation county.",
      "shortName": "Mesa",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19152,
      "cbsaCode": "39580",
      "cbsaName": "Raleigh-Cary, NC",
      "confidence": "medium",
      "countyFips": "37183",
      "countyName": "Wake County",
      "displayName": "Raleigh, NC",
      "id": "PLACE:3755000",
      "lat": 35.831868,
      "lon": -78.641042,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1596,
      "placeGeoid": "3755000",
      "priceIndex": {
        "all": 98.157,
        "goods": 96.621,
        "housing": 103.476,
        "servicesOther": 98.186,
        "utilities": 88.96
      },
      "resolutionNote": "Raleigh, NC uses Wake County as the computation county. The city spans 2 county parts; the computation county has 99.7% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Raleigh-Cary, NC MSA, 99.7% population share).",
      "shortName": "Raleigh",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17568,
      "cbsaCode": "17820",
      "cbsaName": "Colorado Springs, CO",
      "confidence": "high",
      "countyFips": "08041",
      "countyName": "El Paso County",
      "displayName": "Colorado Springs, CO",
      "id": "PLACE:0816000",
      "lat": 38.867255,
      "lon": -104.760749,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1464,
      "placeGeoid": "0816000",
      "priceIndex": {
        "all": 100.707,
        "goods": 96.052,
        "housing": 116.207,
        "servicesOther": 99.822,
        "utilities": 83.195
      },
      "resolutionNote": "Colorado Springs, CO uses El Paso County as the computation county.",
      "shortName": "Colorado Springs",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 23940,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12086",
      "countyName": "Miami-Dade County",
      "displayName": "Miami, FL",
      "id": "PLACE:1245000",
      "lat": 25.775163,
      "lon": -80.208615,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1995,
      "placeGeoid": "1245000",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Miami, FL uses Miami-Dade County as the computation county.",
      "shortName": "Miami",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13776,
      "cbsaCode": "36540",
      "cbsaName": "Omaha, NE-IA",
      "confidence": "high",
      "countyFips": "31055",
      "countyName": "Douglas County",
      "displayName": "Omaha, NE",
      "id": "PLACE:3137000",
      "lat": 41.262705,
      "lon": -96.053475,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1148,
      "placeGeoid": "3137000",
      "priceIndex": {
        "all": 91.911,
        "goods": 94.063,
        "housing": 86.404,
        "servicesOther": 92.975,
        "utilities": 76.378
      },
      "resolutionNote": "Omaha, NE uses Douglas County as the computation county.",
      "shortName": "Omaha",
      "state": "NE",
      "stateName": "Nebraska",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51810",
      "countyName": "Virginia Beach city",
      "displayName": "Virginia Beach, VA",
      "id": "PLACE:5182000",
      "lat": 36.779525,
      "lon": -76.029142,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5182000",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Virginia Beach, VA uses Virginia Beach city as the computation county.",
      "shortName": "Virginia Beach",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Long Beach, CA",
      "id": "PLACE:0643000",
      "lat": 33.780791,
      "lon": -118.16818,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0643000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Long Beach, CA uses Los Angeles County as the computation county.",
      "shortName": "Long Beach",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06001",
      "countyName": "Alameda County",
      "displayName": "Oakland, CA",
      "id": "PLACE:0653000",
      "lat": 37.769846,
      "lon": -122.22569,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0653000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Oakland, CA uses Alameda County as the computation county.",
      "shortName": "Oakland",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16860,
      "cbsaCode": "33460",
      "cbsaName": "Minneapolis-St. Paul-Bloomington, MN-WI",
      "confidence": "high",
      "countyFips": "27053",
      "countyName": "Hennepin County",
      "displayName": "Minneapolis, MN",
      "id": "PLACE:2743000",
      "lat": 44.963324,
      "lon": -93.26832,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1405,
      "placeGeoid": "2743000",
      "priceIndex": {
        "all": 104.822,
        "goods": 103.065,
        "housing": 111.838,
        "servicesOther": 104.419,
        "utilities": 93.493
      },
      "resolutionNote": "Minneapolis, MN uses Hennepin County as the computation county.",
      "shortName": "Minneapolis",
      "state": "MN",
      "stateName": "Minnesota",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13680,
      "cbsaCode": "12540",
      "cbsaName": "Bakersfield-Delano, CA",
      "confidence": "high",
      "countyFips": "06029",
      "countyName": "Kern County",
      "displayName": "Bakersfield, CA",
      "id": "PLACE:0603526",
      "lat": 35.353171,
      "lon": -119.037919,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1140,
      "placeGeoid": "0603526",
      "priceIndex": {
        "all": 100.886,
        "goods": 105.168,
        "housing": 90.291,
        "servicesOther": 100.267,
        "utilities": 158.257
      },
      "resolutionNote": "Bakersfield, CA uses Kern County as the computation county.",
      "shortName": "Bakersfield",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11844,
      "cbsaCode": "46140",
      "cbsaName": "Tulsa, OK",
      "confidence": "high",
      "countyFips": "40143",
      "countyName": "Tulsa County",
      "displayName": "Tulsa, OK",
      "id": "PLACE:4075000",
      "lat": 36.127949,
      "lon": -95.902316,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 987,
      "placeGeoid": "4075000",
      "priceIndex": {
        "all": 89.214,
        "goods": 93.778,
        "housing": 68.235,
        "servicesOther": 95.458,
        "utilities": 73.856
      },
      "resolutionNote": "Tulsa, OK uses Tulsa County as the computation county. The city spans 4 county parts; the computation county has 98.6% of 2025 city population.",
      "shortName": "Tulsa",
      "state": "OK",
      "stateName": "Oklahoma",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20352,
      "cbsaCode": "45300",
      "cbsaName": "Tampa-St. Petersburg-Clearwater, FL",
      "confidence": "high",
      "countyFips": "12057",
      "countyName": "Hillsborough County",
      "displayName": "Tampa, FL",
      "id": "PLACE:1271000",
      "lat": 27.970086,
      "lon": -82.479673,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1696,
      "placeGeoid": "1271000",
      "priceIndex": {
        "all": 100.89,
        "goods": 95.47,
        "housing": 125.839,
        "servicesOther": 97.565,
        "utilities": 88.525
      },
      "resolutionNote": "Tampa, FL uses Hillsborough County as the computation county.",
      "shortName": "Tampa",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08005",
      "countyName": "Arapahoe County",
      "displayName": "Aurora, CO",
      "id": "PLACE:0804000",
      "lat": 39.709537,
      "lon": -104.720509,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0804000",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Aurora, CO uses Arapahoe County as the computation county. The city spans 3 county parts; the computation county has 84.1% of 2025 city population.",
      "shortName": "Aurora",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17676,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48439",
      "countyName": "Tarrant County",
      "displayName": "Arlington, TX",
      "id": "PLACE:4804000",
      "lat": 32.700708,
      "lon": -97.124691,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1473,
      "placeGeoid": "4804000",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Arlington, TX uses Tarrant County as the computation county.",
      "shortName": "Arlington",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10188,
      "cbsaCode": "48620",
      "cbsaName": "Wichita, KS",
      "confidence": "high",
      "countyFips": "20173",
      "countyName": "Sedgwick County",
      "displayName": "Wichita, KS",
      "id": "PLACE:2079000",
      "lat": 37.690638,
      "lon": -97.345836,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 849,
      "placeGeoid": "2079000",
      "priceIndex": {
        "all": 88.946,
        "goods": 94.027,
        "housing": 66.245,
        "servicesOther": 93.816,
        "utilities": 88.459
      },
      "resolutionNote": "Wichita, KS uses Sedgwick County as the computation county.",
      "shortName": "Wichita",
      "state": "KS",
      "stateName": "Kansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12696,
      "cbsaCode": "17410",
      "cbsaName": "Cleveland, OH",
      "confidence": "low",
      "countyFips": "39035",
      "countyName": "Cuyahoga County",
      "displayName": "Cleveland, OH",
      "id": "PLACE:3916000",
      "lat": 41.478462,
      "lon": -81.679435,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1058,
      "placeGeoid": "3916000",
      "priceIndex": {
        "all": 93.923,
        "goods": 93.628,
        "housing": 79.434,
        "servicesOther": 98.939,
        "utilities": 95.967
      },
      "resolutionNote": "Cleveland, OH uses Cuyahoga County as the computation county. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Cleveland",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 13356,
      "cbsaCode": "35380",
      "cbsaName": "New Orleans-Metairie, LA",
      "confidence": "high",
      "countyFips": "22071",
      "countyName": "Orleans Parish",
      "displayName": "New Orleans, LA",
      "id": "PLACE:2255000",
      "lat": 30.05342,
      "lon": -89.934502,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1113,
      "placeGeoid": "2255000",
      "priceIndex": {
        "all": 92.597,
        "goods": 93.691,
        "housing": 86.009,
        "servicesOther": 95.705,
        "utilities": 71.231
      },
      "resolutionNote": "New Orleans, LA uses Orleans Parish as the computation county.",
      "shortName": "New Orleans",
      "state": "LA",
      "stateName": "Louisiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17736,
      "cbsaCode": "29820",
      "cbsaName": "Las Vegas-Henderson-North Las Vegas, NV",
      "confidence": "high",
      "countyFips": "32003",
      "countyName": "Clark County",
      "displayName": "Henderson, NV",
      "id": "PLACE:3231900",
      "lat": 36.008958,
      "lon": -115.0268,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1478,
      "placeGeoid": "3231900",
      "priceIndex": {
        "all": 100.215,
        "goods": 96.271,
        "housing": 115.538,
        "servicesOther": 98.744,
        "utilities": 90.646
      },
      "resolutionNote": "Henderson, NV uses Clark County as the computation county.",
      "shortName": "Henderson",
      "state": "NV",
      "stateName": "Nevada",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 24192,
      "cbsaCode": "46520",
      "cbsaName": "Urban Honolulu, HI",
      "confidence": "high",
      "countyFips": "15003",
      "countyName": "Honolulu County",
      "displayName": "Urban Honolulu CDP, HI",
      "id": "PLACE:1571550",
      "lat": 21.324347,
      "lon": -157.84764,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2016,
      "placeGeoid": "1571550",
      "priceIndex": {
        "all": 110.961,
        "goods": 111.562,
        "housing": 135.538,
        "servicesOther": 102.898,
        "utilities": 187.263
      },
      "resolutionNote": "Urban Honolulu CDP, HI uses Honolulu County as the computation county.",
      "shortName": "Urban Honolulu CDP",
      "state": "HI",
      "stateName": "Hawaii",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Anaheim, CA",
      "id": "PLACE:0602000",
      "lat": 33.855502,
      "lon": -117.758657,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0602000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Anaheim, CA uses Orange County as the computation county.",
      "shortName": "Anaheim",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20772,
      "cbsaCode": "36740",
      "cbsaName": "Orlando-Kissimmee-Sanford, FL",
      "confidence": "high",
      "countyFips": "12095",
      "countyName": "Orange County",
      "displayName": "Orlando, FL",
      "id": "PLACE:1253000",
      "lat": 28.472818,
      "lon": -81.320242,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1731,
      "placeGeoid": "1253000",
      "priceIndex": {
        "all": 101.418,
        "goods": 96.24,
        "housing": 123.374,
        "servicesOther": 98.864,
        "utilities": 87.196
      },
      "resolutionNote": "Orlando, FL uses Orange County as the computation county.",
      "shortName": "Orlando",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12948,
      "cbsaCode": "30460",
      "cbsaName": "Lexington-Fayette, KY",
      "confidence": "low",
      "countyFips": "21067",
      "countyName": "Fayette County",
      "displayName": "Lexington-Fayette urban county, KY",
      "id": "PLACE:2146027",
      "lat": 38.040678,
      "lon": -84.458272,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1079,
      "placeGeoid": "2146027",
      "priceIndex": {
        "all": 92.889,
        "goods": 96.246,
        "housing": 77.093,
        "servicesOther": 96.892,
        "utilities": 74.587
      },
      "resolutionNote": "Lexington-Fayette urban county, KY uses Fayette County as the computation county. Kentucky local occupational/license taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Lexington-Fayette urban county",
      "state": "KY",
      "stateName": "Kentucky",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Kentucky local occupational/license taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 16740,
      "cbsaCode": "44700",
      "cbsaName": "Stockton-Lodi, CA",
      "confidence": "high",
      "countyFips": "06077",
      "countyName": "San Joaquin County",
      "displayName": "Stockton, CA",
      "id": "PLACE:0675000",
      "lat": 37.976553,
      "lon": -121.308598,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1395,
      "placeGeoid": "0675000",
      "priceIndex": {
        "all": 105.089,
        "goods": 105.168,
        "housing": 115.614,
        "servicesOther": 100.267,
        "utilities": 158.247
      },
      "resolutionNote": "Stockton, CA uses San Joaquin County as the computation county.",
      "shortName": "Stockton",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21864,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "34013",
      "countyName": "Essex County",
      "displayName": "Newark, NJ",
      "id": "PLACE:3451000",
      "lat": 40.72422,
      "lon": -74.172574,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1822,
      "placeGeoid": "3451000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "Newark, NJ uses Essex County as the computation county.",
      "shortName": "Newark",
      "state": "NJ",
      "stateName": "New Jersey",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Riverside, CA",
      "id": "PLACE:0662000",
      "lat": 33.938143,
      "lon": -117.393168,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0662000",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Riverside, CA uses Riverside County as the computation county.",
      "shortName": "Riverside",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Irvine, CA",
      "id": "PLACE:0636770",
      "lat": 33.678399,
      "lon": -117.771254,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0636770",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Irvine, CA uses Orange County as the computation county.",
      "shortName": "Irvine",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13404,
      "cbsaCode": "18580",
      "cbsaName": "Corpus Christi, TX",
      "confidence": "medium",
      "countyFips": "48355",
      "countyName": "Nueces County",
      "displayName": "Corpus Christi, TX",
      "id": "PLACE:4817000",
      "lat": 27.754252,
      "lon": -97.173385,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1117,
      "placeGeoid": "4817000",
      "priceIndex": {
        "all": 92.671,
        "goods": 93.757,
        "housing": 84.905,
        "servicesOther": 96.24,
        "utilities": 80.991
      },
      "resolutionNote": "Corpus Christi, TX uses Nueces County as the computation county. The city spans 4 county parts; the computation county has 100.0% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Corpus Christi, TX HUD Metro FMR Area, 100.0% population share).",
      "shortName": "Corpus Christi",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Santa Ana, CA",
      "id": "PLACE:0669000",
      "lat": 33.736332,
      "lon": -117.8829,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0669000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Santa Ana, CA uses Orange County as the computation county.",
      "shortName": "Santa Ana",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12612,
      "cbsaCode": "17140",
      "cbsaName": "Cincinnati, OH-KY-IN",
      "confidence": "low",
      "countyFips": "39061",
      "countyName": "Hamilton County",
      "displayName": "Cincinnati, OH",
      "id": "PLACE:3915000",
      "lat": 39.140183,
      "lon": -84.505829,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1051,
      "placeGeoid": "3915000",
      "priceIndex": {
        "all": 95.37,
        "goods": 93.751,
        "housing": 87.608,
        "servicesOther": 99.04,
        "utilities": 90.954
      },
      "resolutionNote": "Cincinnati, OH uses Hamilton County as the computation county. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Cincinnati",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 14556,
      "cbsaCode": "24660",
      "cbsaName": "Greensboro-High Point, NC",
      "confidence": "high",
      "countyFips": "37081",
      "countyName": "Guilford County",
      "displayName": "Greensboro, NC",
      "id": "PLACE:3728000",
      "lat": 36.09485,
      "lon": -79.823624,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1213,
      "placeGeoid": "3728000",
      "priceIndex": {
        "all": 92.865,
        "goods": 96.621,
        "housing": 74.519,
        "servicesOther": 98.186,
        "utilities": 89.065
      },
      "resolutionNote": "Greensboro, NC uses Guilford County as the computation county.",
      "shortName": "Greensboro",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12924,
      "cbsaCode": "38300",
      "cbsaName": "Pittsburgh, PA",
      "confidence": "low",
      "countyFips": "42003",
      "countyName": "Allegheny County",
      "displayName": "Pittsburgh, PA",
      "id": "PLACE:4261000",
      "lat": 40.439936,
      "lon": -79.975676,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1077,
      "placeGeoid": "4261000",
      "priceIndex": {
        "all": 94.671,
        "goods": 100.684,
        "housing": 71.986,
        "servicesOther": 97.726,
        "utilities": 107.711
      },
      "resolutionNote": "Pittsburgh, PA uses Allegheny County as the computation county. Pennsylvania local earned-income/local-services taxes outside Philadelphia are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Pittsburgh",
      "state": "PA",
      "stateName": "Pennsylvania",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Pennsylvania local earned-income/local-services taxes outside Philadelphia are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 16860,
      "cbsaCode": "33460",
      "cbsaName": "Minneapolis-St. Paul-Bloomington, MN-WI",
      "confidence": "high",
      "countyFips": "27123",
      "countyName": "Ramsey County",
      "displayName": "St. Paul, MN",
      "id": "PLACE:2758000",
      "lat": 44.948901,
      "lon": -93.104063,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1405,
      "placeGeoid": "2758000",
      "priceIndex": {
        "all": 104.822,
        "goods": 103.065,
        "housing": 111.838,
        "servicesOther": 104.419,
        "utilities": 93.493
      },
      "resolutionNote": "St. Paul, MN uses Ramsey County as the computation county.",
      "shortName": "St. Paul",
      "state": "MN",
      "stateName": "Minnesota",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18084,
      "cbsaCode": "20500",
      "cbsaName": "Durham-Chapel Hill, NC",
      "confidence": "medium",
      "countyFips": "37063",
      "countyName": "Durham County",
      "displayName": "Durham, NC",
      "id": "PLACE:3719000",
      "lat": 35.977928,
      "lon": -78.898109,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1507,
      "placeGeoid": "3719000",
      "priceIndex": {
        "all": 97.572,
        "goods": 96.621,
        "housing": 98.934,
        "servicesOther": 98.186,
        "utilities": 89.317
      },
      "resolutionNote": "Durham, NC uses Durham County as the computation county. The city spans 3 county parts; the computation county has 99.9% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Durham-Chapel Hill, NC HUD Metro FMR Area, 99.9% population share).",
      "shortName": "Durham",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29496,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "34017",
      "countyName": "Hudson County",
      "displayName": "Jersey City, NJ",
      "id": "PLACE:3436000",
      "lat": 40.711417,
      "lon": -74.06476,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2458,
      "placeGeoid": "3436000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "Jersey City, NJ uses Hudson County as the computation county.",
      "shortName": "Jersey City",
      "state": "NJ",
      "stateName": "New Jersey",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11112,
      "cbsaCode": "30700",
      "cbsaName": "Lincoln, NE",
      "confidence": "high",
      "countyFips": "31109",
      "countyName": "Lancaster County",
      "displayName": "Lincoln, NE",
      "id": "PLACE:3128000",
      "lat": 40.810284,
      "lon": -96.674856,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 926,
      "placeGeoid": "3128000",
      "priceIndex": {
        "all": 91.581,
        "goods": 94.101,
        "housing": 84.208,
        "servicesOther": 92.98,
        "utilities": 76.817
      },
      "resolutionNote": "Lincoln, NE uses Lancaster County as the computation county.",
      "shortName": "Lincoln",
      "state": "NE",
      "stateName": "Nebraska",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17736,
      "cbsaCode": "29820",
      "cbsaName": "Las Vegas-Henderson-North Las Vegas, NV",
      "confidence": "high",
      "countyFips": "32003",
      "countyName": "Clark County",
      "displayName": "North Las Vegas, NV",
      "id": "PLACE:3251800",
      "lat": 36.289865,
      "lon": -115.089181,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1478,
      "placeGeoid": "3251800",
      "priceIndex": {
        "all": 100.215,
        "goods": 96.271,
        "housing": 115.538,
        "servicesOther": 98.744,
        "utilities": 90.646
      },
      "resolutionNote": "North Las Vegas, NV uses Clark County as the computation county.",
      "shortName": "North Las Vegas",
      "state": "NV",
      "stateName": "Nevada",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48085",
      "countyName": "Collin County",
      "displayName": "Plano, TX",
      "id": "PLACE:4858016",
      "lat": 33.050769,
      "lon": -96.747944,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4858016",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Plano, TX uses Collin County as the computation county. The city spans 2 county parts; the computation county has 98.1% of 2025 city population.",
      "shortName": "Plano",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Gilbert, AZ",
      "id": "PLACE:0427400",
      "lat": 33.310345,
      "lon": -111.743121,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0427400",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Gilbert, AZ uses Maricopa County as the computation county.",
      "shortName": "Gilbert",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14916,
      "cbsaCode": "11260",
      "cbsaName": "Anchorage, AK",
      "confidence": "high",
      "countyFips": "02020",
      "countyName": "Anchorage Municipality",
      "displayName": "Anchorage, AK",
      "id": "PLACE:0203000",
      "lat": 61.17425,
      "lon": -149.284329,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1243,
      "placeGeoid": "0203000",
      "priceIndex": {
        "all": 105.42,
        "goods": 107.34,
        "housing": 109.905,
        "servicesOther": 103.342,
        "utilities": 111.772
      },
      "resolutionNote": "Anchorage, AK uses Anchorage Municipality as the computation county.",
      "shortName": "Anchorage",
      "state": "AK",
      "stateName": "Alaska",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17784,
      "cbsaCode": "31540",
      "cbsaName": "Madison, WI",
      "confidence": "high",
      "countyFips": "55025",
      "countyName": "Dane County",
      "displayName": "Madison, WI",
      "id": "PLACE:5548000",
      "lat": 43.087815,
      "lon": -89.429856,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1482,
      "placeGeoid": "5548000",
      "priceIndex": {
        "all": 97.287,
        "goods": 93.787,
        "housing": 99.748,
        "servicesOther": 99.411,
        "utilities": 89.825
      },
      "resolutionNote": "Madison, WI uses Dane County as the computation county.",
      "shortName": "Madison",
      "state": "WI",
      "stateName": "Wisconsin",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17868,
      "cbsaCode": "39900",
      "cbsaName": "Reno, NV",
      "confidence": "high",
      "countyFips": "32031",
      "countyName": "Washoe County",
      "displayName": "Reno, NV",
      "id": "PLACE:3260600",
      "lat": 39.549097,
      "lon": -119.849907,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1489,
      "placeGeoid": "3260600",
      "priceIndex": {
        "all": 101.014,
        "goods": 96.271,
        "housing": 123.478,
        "servicesOther": 98.744,
        "utilities": 89.274
      },
      "resolutionNote": "Reno, NV uses Washoe County as the computation county.",
      "shortName": "Reno",
      "state": "NV",
      "stateName": "Nevada",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Chandler, AZ",
      "id": "PLACE:0412000",
      "lat": 33.282765,
      "lon": -111.851819,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0412000",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Chandler, AZ uses Maricopa County as the computation county.",
      "shortName": "Chandler",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11940,
      "cbsaCode": "41180",
      "cbsaName": "St. Louis, MO-IL",
      "confidence": "high",
      "countyFips": "29510",
      "countyName": "St. Louis city",
      "displayName": "St. Louis, MO",
      "id": "PLACE:2965000",
      "lat": 38.635699,
      "lon": -90.244582,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 995,
      "placeGeoid": "2965000",
      "priceIndex": {
        "all": 95.088,
        "goods": 99.996,
        "housing": 79.024,
        "servicesOther": 98.642,
        "utilities": 69.921
      },
      "resolutionNote": "St. Louis, MO uses St. Louis city as the computation county.",
      "shortName": "St. Louis",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "St. Louis earnings tax enabled through PolicyEngine taxable earnings input."
      ]
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "Chula Vista, CA",
      "id": "PLACE:0613392",
      "lat": 32.62767,
      "lon": -117.01517,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0613392",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "Chula Vista, CA uses San Diego County as the computation county.",
      "shortName": "Chula Vista",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10992,
      "cbsaCode": "23060",
      "cbsaName": "Fort Wayne, IN",
      "confidence": "high",
      "countyFips": "18003",
      "countyName": "Allen County",
      "displayName": "Fort Wayne, IN",
      "id": "PLACE:1825000",
      "lat": 41.088193,
      "lon": -85.142791,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 916,
      "placeGeoid": "1825000",
      "priceIndex": {
        "all": 92.572,
        "goods": 94.318,
        "housing": 72.277,
        "servicesOther": 99.141,
        "utilities": 86.247
      },
      "resolutionNote": "Fort Wayne, IN uses Allen County as the computation county.",
      "shortName": "Fort Wayne",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 13668,
      "cbsaCode": "15380",
      "cbsaName": "Buffalo-Cheektowaga, NY",
      "confidence": "high",
      "countyFips": "36029",
      "countyName": "Erie County",
      "displayName": "Buffalo, NY",
      "id": "PLACE:3611000",
      "lat": 42.892492,
      "lon": -78.859686,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1139,
      "placeGeoid": "3611000",
      "priceIndex": {
        "all": 95.844,
        "goods": 99.693,
        "housing": 80.989,
        "servicesOther": 97.754,
        "utilities": 129.489
      },
      "resolutionNote": "Buffalo, NY uses Erie County as the computation county.",
      "shortName": "Buffalo",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11880,
      "cbsaCode": "31180",
      "cbsaName": "Lubbock, TX",
      "confidence": "high",
      "countyFips": "48303",
      "countyName": "Lubbock County",
      "displayName": "Lubbock, TX",
      "id": "PLACE:4845000",
      "lat": 33.561901,
      "lon": -101.888883,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 990,
      "placeGeoid": "4845000",
      "priceIndex": {
        "all": 91.317,
        "goods": 93.757,
        "housing": 76.357,
        "servicesOther": 96.24,
        "utilities": 82.768
      },
      "resolutionNote": "Lubbock, TX uses Lubbock County as the computation county.",
      "shortName": "Lubbock",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11544,
      "cbsaCode": "29700",
      "cbsaName": "Laredo, TX",
      "confidence": "high",
      "countyFips": "48479",
      "countyName": "Webb County",
      "displayName": "Laredo, TX",
      "id": "PLACE:4841464",
      "lat": 27.560379,
      "lon": -99.489181,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 962,
      "placeGeoid": "4841464",
      "priceIndex": {
        "all": 86.956,
        "goods": 93.757,
        "housing": 59.746,
        "servicesOther": 96.24,
        "utilities": 80.614
      },
      "resolutionNote": "Laredo, TX uses Webb County as the computation county.",
      "shortName": "Laredo",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17604,
      "cbsaCode": "38940",
      "cbsaName": "Port St. Lucie, FL",
      "confidence": "high",
      "countyFips": "12111",
      "countyName": "St. Lucie County",
      "displayName": "Port St. Lucie, FL",
      "id": "PLACE:1258715",
      "lat": 27.280554,
      "lon": -80.388261,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1467,
      "placeGeoid": "1258715",
      "priceIndex": {
        "all": 100.228,
        "goods": 96.24,
        "housing": 113.642,
        "servicesOther": 98.864,
        "utilities": 87.031
      },
      "resolutionNote": "Port St. Lucie, FL uses St. Lucie County as the computation county.",
      "shortName": "Port St. Lucie",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20352,
      "cbsaCode": "45300",
      "cbsaName": "Tampa-St. Petersburg-Clearwater, FL",
      "confidence": "high",
      "countyFips": "12103",
      "countyName": "Pinellas County",
      "displayName": "St. Petersburg, FL",
      "id": "PLACE:1263000",
      "lat": 27.762727,
      "lon": -82.644131,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1696,
      "placeGeoid": "1263000",
      "priceIndex": {
        "all": 100.89,
        "goods": 95.47,
        "housing": 125.839,
        "servicesOther": 97.565,
        "utilities": 88.525
      },
      "resolutionNote": "St. Petersburg, FL uses Pinellas County as the computation county.",
      "shortName": "St. Petersburg",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 9840,
      "cbsaCode": "45780",
      "cbsaName": "Toledo, OH",
      "confidence": "low",
      "countyFips": "39095",
      "countyName": "Lucas County",
      "displayName": "Toledo, OH",
      "id": "PLACE:3977000",
      "lat": 41.664071,
      "lon": -83.581861,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 820,
      "placeGeoid": "3977000",
      "priceIndex": {
        "all": 91.455,
        "goods": 93.628,
        "housing": 67.317,
        "servicesOther": 98.939,
        "utilities": 96.285
      },
      "resolutionNote": "Toledo, OH uses Lucas County as the computation county. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Toledo",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Glendale, AZ",
      "id": "PLACE:0427820",
      "lat": 33.533111,
      "lon": -112.189901,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0427820",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Glendale, AZ uses Maricopa County as the computation county.",
      "shortName": "Glendale",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12984,
      "cbsaCode": "49180",
      "cbsaName": "Winston-Salem, NC",
      "confidence": "high",
      "countyFips": "37067",
      "countyName": "Forsyth County",
      "displayName": "Winston-Salem, NC",
      "id": "PLACE:3775000",
      "lat": 36.102863,
      "lon": -80.260829,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1082,
      "placeGeoid": "3775000",
      "priceIndex": {
        "all": 92.043,
        "goods": 96.621,
        "housing": 71.377,
        "servicesOther": 98.186,
        "utilities": 88.421
      },
      "resolutionNote": "Winston-Salem, NC uses Forsyth County as the computation county.",
      "shortName": "Winston-Salem",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Irving, TX",
      "id": "PLACE:4837000",
      "lat": 32.857748,
      "lon": -96.970022,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4837000",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Irving, TX uses Dallas County as the computation county.",
      "shortName": "Irving",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51550",
      "countyName": "Chesapeake city",
      "displayName": "Chesapeake, VA",
      "id": "PLACE:5116000",
      "lat": 36.679376,
      "lon": -76.301788,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5116000",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Chesapeake, VA uses Chesapeake city as the computation county.",
      "shortName": "Chesapeake",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Garland, TX",
      "id": "PLACE:4829000",
      "lat": 32.909826,
      "lon": -96.630334,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4829000",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Garland, TX uses Dallas County as the computation county. The city spans 2 county parts; the computation county has 99.9% of 2025 city population.",
      "shortName": "Garland",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Scottsdale, AZ",
      "id": "PLACE:0465000",
      "lat": 33.684272,
      "lon": -111.861448,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0465000",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Scottsdale, AZ uses Maricopa County as the computation county.",
      "shortName": "Scottsdale",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16572,
      "cbsaCode": "14260",
      "cbsaName": "Boise City, ID",
      "confidence": "high",
      "countyFips": "16001",
      "countyName": "Ada County",
      "displayName": "Boise City, ID",
      "id": "PLACE:1608830",
      "lat": 43.59805,
      "lon": -116.231596,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1381,
      "placeGeoid": "1608830",
      "priceIndex": {
        "all": 98.391,
        "goods": 96.179,
        "housing": 105.58,
        "servicesOther": 98.974,
        "utilities": 70.695
      },
      "resolutionNote": "Boise City, ID uses Ada County as the computation county.",
      "shortName": "Boise City",
      "state": "ID",
      "stateName": "Idaho",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18084,
      "cbsaCode": "40060",
      "cbsaName": "Richmond, VA",
      "confidence": "high",
      "countyFips": "51760",
      "countyName": "Richmond city",
      "displayName": "Richmond, VA",
      "id": "PLACE:5167000",
      "lat": 37.531399,
      "lon": -77.476009,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1507,
      "placeGeoid": "5167000",
      "priceIndex": {
        "all": 97.858,
        "goods": 96.773,
        "housing": 99.136,
        "servicesOther": 98.612,
        "utilities": 89.221
      },
      "resolutionNote": "Richmond, VA uses Richmond city as the computation county.",
      "shortName": "Richmond",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48085",
      "countyName": "Collin County",
      "displayName": "Frisco, TX",
      "id": "PLACE:4827684",
      "lat": 33.155427,
      "lon": -96.822596,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4827684",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Frisco, TX uses Collin County as the computation county. The city spans 2 county parts; the computation county has 59.4% of 2025 city population.",
      "shortName": "Frisco",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19656,
      "cbsaCode": "15980",
      "cbsaName": "Cape Coral-Fort Myers, FL",
      "confidence": "high",
      "countyFips": "12071",
      "countyName": "Lee County",
      "displayName": "Cape Coral, FL",
      "id": "PLACE:1210275",
      "lat": 26.643192,
      "lon": -81.997364,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1638,
      "placeGeoid": "1210275",
      "priceIndex": {
        "all": 102.349,
        "goods": 96.24,
        "housing": 125.113,
        "servicesOther": 98.864,
        "utilities": 86.901
      },
      "resolutionNote": "Cape Coral, FL uses Lee County as the computation county.",
      "shortName": "Cape Coral",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48085",
      "countyName": "Collin County",
      "displayName": "McKinney, TX",
      "id": "PLACE:4845744",
      "lat": 33.201125,
      "lon": -96.664161,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4845744",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "McKinney, TX uses Collin County as the computation county.",
      "shortName": "McKinney",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13632,
      "cbsaCode": "26620",
      "cbsaName": "Huntsville, AL",
      "confidence": "medium",
      "countyFips": "01089",
      "countyName": "Madison County",
      "displayName": "Huntsville, AL",
      "id": "PLACE:0137000",
      "lat": 34.69772,
      "lon": -86.67667,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1136,
      "placeGeoid": "0137000",
      "priceIndex": {
        "all": 93.072,
        "goods": 96.397,
        "housing": 77.946,
        "servicesOther": 96.693,
        "utilities": 83.931
      },
      "resolutionNote": "Huntsville, AL uses Madison County as the computation county. The city spans 3 county parts; the computation county has 97.8% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Huntsville, AL MSA, 100.0% population share).",
      "shortName": "Huntsville",
      "state": "AL",
      "stateName": "Alabama",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51710",
      "countyName": "Norfolk city",
      "displayName": "Norfolk, VA",
      "id": "PLACE:5157000",
      "lat": 36.923015,
      "lon": -76.244641,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5157000",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Norfolk, VA uses Norfolk city as the computation county.",
      "shortName": "Norfolk",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 23940,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12086",
      "countyName": "Miami-Dade County",
      "displayName": "Hialeah, FL",
      "id": "PLACE:1230000",
      "lat": 25.869941,
      "lon": -80.302865,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1995,
      "placeGeoid": "1230000",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Hialeah, FL uses Miami-Dade County as the computation county.",
      "shortName": "Hialeah",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14316,
      "cbsaCode": "44060",
      "cbsaName": "Spokane-Spokane Valley, WA",
      "confidence": "high",
      "countyFips": "53063",
      "countyName": "Spokane County",
      "displayName": "Spokane, WA",
      "id": "PLACE:5367000",
      "lat": 47.666935,
      "lon": -117.433322,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1193,
      "placeGeoid": "5367000",
      "priceIndex": {
        "all": 100.346,
        "goods": 105.028,
        "housing": 97.059,
        "servicesOther": 99.472,
        "utilities": 91.196
      },
      "resolutionNote": "Spokane, WA uses Spokane County as the computation county.",
      "shortName": "Spokane",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19260,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53053",
      "countyName": "Pierce County",
      "displayName": "Tacoma, WA",
      "id": "PLACE:5370000",
      "lat": 47.252199,
      "lon": -122.459832,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1605,
      "placeGeoid": "5370000",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Tacoma, WA uses Pierce County as the computation county.",
      "shortName": "Tacoma",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Santa Clarita, CA",
      "id": "PLACE:0669088",
      "lat": 34.416504,
      "lon": -118.500693,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0669088",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Santa Clarita, CA uses Los Angeles County as the computation county.",
      "shortName": "Santa Clarita",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06001",
      "countyName": "Alameda County",
      "displayName": "Fremont, CA",
      "id": "PLACE:0626000",
      "lat": 37.49446,
      "lon": -121.94115,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0626000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Fremont, CA uses Alameda County as the computation county.",
      "shortName": "Fremont",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12768,
      "cbsaCode": "12940",
      "cbsaName": "Baton Rouge, LA",
      "confidence": "high",
      "countyFips": "22033",
      "countyName": "East Baton Rouge Parish",
      "displayName": "Baton Rouge, LA",
      "id": "PLACE:2205000",
      "lat": 30.442174,
      "lon": -91.130894,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1064,
      "placeGeoid": "2205000",
      "priceIndex": {
        "all": 90.78,
        "goods": 93.691,
        "housing": 74.183,
        "servicesOther": 95.705,
        "utilities": 71.185
      },
      "resolutionNote": "Baton Rouge, LA uses East Baton Rouge Parish as the computation county.",
      "shortName": "Baton Rouge",
      "state": "LA",
      "stateName": "Louisiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "San Bernardino, CA",
      "id": "PLACE:0665000",
      "lat": 34.14114,
      "lon": -117.294635,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0665000",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "San Bernardino, CA uses San Bernardino County as the computation county.",
      "shortName": "San Bernardino",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Fontana, CA",
      "id": "PLACE:0624680",
      "lat": 34.109686,
      "lon": -117.462888,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0624680",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Fontana, CA uses San Bernardino County as the computation county.",
      "shortName": "Fontana",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16272,
      "cbsaCode": "33700",
      "cbsaName": "Modesto, CA",
      "confidence": "high",
      "countyFips": "06099",
      "countyName": "Stanislaus County",
      "displayName": "Modesto, CA",
      "id": "PLACE:0648354",
      "lat": 37.637533,
      "lon": -121.003049,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1356,
      "placeGeoid": "0648354",
      "priceIndex": {
        "all": 104.108,
        "goods": 105.168,
        "housing": 108.476,
        "servicesOther": 100.267,
        "utilities": 152.259
      },
      "resolutionNote": "Modesto, CA uses Stanislaus County as the computation county.",
      "shortName": "Modesto",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17472,
      "cbsaCode": "41620",
      "cbsaName": "Salt Lake City-Murray, UT",
      "confidence": "high",
      "countyFips": "49035",
      "countyName": "Salt Lake County",
      "displayName": "Salt Lake City, UT",
      "id": "PLACE:4967000",
      "lat": 40.776928,
      "lon": -111.930991,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1456,
      "placeGeoid": "4967000",
      "priceIndex": {
        "all": 100.868,
        "goods": 96.446,
        "housing": 123.311,
        "servicesOther": 98.959,
        "utilities": 79.0
      },
      "resolutionNote": "Salt Lake City, UT uses Salt Lake County as the computation county.",
      "shortName": "Salt Lake City",
      "state": "UT",
      "stateName": "Utah",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Moreno Valley, CA",
      "id": "PLACE:0649270",
      "lat": 33.923253,
      "lon": -117.205685,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0649270",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Moreno Valley, CA uses Riverside County as the computation county.",
      "shortName": "Moreno Valley",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19188,
      "cbsaCode": "49340",
      "cbsaName": "Worcester, MA",
      "confidence": "high",
      "countyFips": "25027",
      "countyName": "Worcester County",
      "displayName": "Worcester, MA",
      "id": "PLACE:2582000",
      "lat": 42.269478,
      "lon": -71.807783,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1599,
      "placeGeoid": "2582000",
      "priceIndex": {
        "all": 102.523,
        "goods": 97.015,
        "housing": 113.001,
        "servicesOther": 101.197,
        "utilities": 155.206
      },
      "resolutionNote": "Worcester, MA uses Worcester County as the computation county.",
      "shortName": "Worcester",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11832,
      "cbsaCode": "43620",
      "cbsaName": "Sioux Falls, SD-MN",
      "confidence": "high",
      "countyFips": "46099",
      "countyName": "Minnehaha County",
      "displayName": "Sioux Falls, SD",
      "id": "PLACE:4659020",
      "lat": 43.540696,
      "lon": -96.731962,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 986,
      "placeGeoid": "4659020",
      "priceIndex": {
        "all": 90.631,
        "goods": 95.472,
        "housing": 77.605,
        "servicesOther": 91.906,
        "utilities": 80.7
      },
      "resolutionNote": "Sioux Falls, SD uses Minnehaha County as the computation county. The city spans 2 county parts; the computation county has 80.5% of 2025 city population.",
      "shortName": "Sioux Falls",
      "state": "SD",
      "stateName": "South Dakota",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 31860,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "36119",
      "countyName": "Westchester County",
      "displayName": "Yonkers, NY",
      "id": "PLACE:3684000",
      "lat": 40.945862,
      "lon": -73.867446,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2655,
      "placeGeoid": "3684000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "Yonkers, NY uses Westchester County as the computation county.",
      "shortName": "Yonkers",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13308,
      "cbsaCode": "19780",
      "cbsaName": "Des Moines-West Des Moines, IA",
      "confidence": "high",
      "countyFips": "19153",
      "countyName": "Polk County",
      "displayName": "Des Moines, IA",
      "id": "PLACE:1921000",
      "lat": 41.57259,
      "lon": -93.610243,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1109,
      "placeGeoid": "1921000",
      "priceIndex": {
        "all": 91.701,
        "goods": 93.73,
        "housing": 84.741,
        "servicesOther": 92.927,
        "utilities": 84.585
      },
      "resolutionNote": "Des Moines, IA uses Polk County as the computation county. The city spans 2 county parts; the computation county has 99.9% of 2025 city population.",
      "shortName": "Des Moines",
      "state": "IA",
      "stateName": "Iowa",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "medium",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Grand Prairie, TX",
      "id": "PLACE:4830464",
      "lat": 32.67893,
      "lon": -97.020743,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4830464",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Grand Prairie, TX uses Dallas County as the computation county. The city spans 4 county parts; the computation county has 63.6% of 2025 city population. Housing uses the dominant HUD FMR area (Dallas, TX HUD Metro FMR Area, 63.7% population share).",
      "shortName": "Grand Prairie",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13356,
      "cbsaCode": "22180",
      "cbsaName": "Fayetteville, NC",
      "confidence": "high",
      "countyFips": "37051",
      "countyName": "Cumberland County",
      "displayName": "Fayetteville, NC",
      "id": "PLACE:3722920",
      "lat": 35.082766,
      "lon": -78.973515,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1113,
      "placeGeoid": "3722920",
      "priceIndex": {
        "all": 91.978,
        "goods": 96.621,
        "housing": 73.081,
        "servicesOther": 98.186,
        "utilities": 87.779
      },
      "resolutionNote": "Fayetteville, NC uses Cumberland County as the computation county.",
      "shortName": "Fayetteville",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11868,
      "cbsaCode": "30780",
      "cbsaName": "Little Rock-North Little Rock-Conway, AR",
      "confidence": "high",
      "countyFips": "05119",
      "countyName": "Pulaski County",
      "displayName": "Little Rock, AR",
      "id": "PLACE:0541000",
      "lat": 34.725393,
      "lon": -92.358556,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 989,
      "placeGeoid": "0541000",
      "priceIndex": {
        "all": 89.364,
        "goods": 93.577,
        "housing": 68.295,
        "servicesOther": 95.295,
        "utilities": 74.635
      },
      "resolutionNote": "Little Rock, AR uses Pulaski County as the computation county.",
      "shortName": "Little Rock",
      "state": "AR",
      "stateName": "Arkansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15072,
      "cbsaCode": "40380",
      "cbsaName": "Rochester, NY",
      "confidence": "high",
      "countyFips": "36055",
      "countyName": "Monroe County",
      "displayName": "Rochester, NY",
      "id": "PLACE:3663000",
      "lat": 43.169927,
      "lon": -77.616891,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1256,
      "placeGeoid": "3663000",
      "priceIndex": {
        "all": 97.035,
        "goods": 99.693,
        "housing": 87.481,
        "servicesOther": 97.754,
        "utilities": 133.213
      },
      "resolutionNote": "Rochester, NY uses Monroe County as the computation county.",
      "shortName": "Rochester",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10836,
      "cbsaCode": "11100",
      "cbsaName": "Amarillo, TX",
      "confidence": "high",
      "countyFips": "48381",
      "countyName": "Randall County",
      "displayName": "Amarillo, TX",
      "id": "PLACE:4803000",
      "lat": 35.199903,
      "lon": -101.830194,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 903,
      "placeGeoid": "4803000",
      "priceIndex": {
        "all": 91.82,
        "goods": 93.757,
        "housing": 78.38,
        "servicesOther": 96.24,
        "utilities": 83.474
      },
      "resolutionNote": "Amarillo, TX uses Randall County as the computation county. The city spans 2 county parts; the computation county has 52.0% of 2025 city population.",
      "shortName": "Amarillo",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14448,
      "cbsaCode": "45220",
      "cbsaName": "Tallahassee, FL",
      "confidence": "high",
      "countyFips": "12073",
      "countyName": "Leon County",
      "displayName": "Tallahassee, FL",
      "id": "PLACE:1270600",
      "lat": 30.453529,
      "lon": -84.252272,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1204,
      "placeGeoid": "1270600",
      "priceIndex": {
        "all": 93.919,
        "goods": 96.24,
        "housing": 78.528,
        "servicesOther": 98.864,
        "utilities": 87.471
      },
      "resolutionNote": "Tallahassee, FL uses Leon County as the computation county.",
      "shortName": "Tallahassee",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "20091",
      "countyName": "Johnson County",
      "displayName": "Overland Park, KS",
      "id": "PLACE:2053775",
      "lat": 38.889042,
      "lon": -94.690584,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2053775",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Overland Park, KS uses Johnson County as the computation county.",
      "shortName": "Overland Park",
      "state": "KS",
      "stateName": "Kansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11268,
      "cbsaCode": "17980",
      "cbsaName": "Columbus, GA-AL",
      "confidence": "high",
      "countyFips": "13215",
      "countyName": "Muscogee County",
      "displayName": "Columbus, GA",
      "id": "PLACE:1319000",
      "lat": 32.510191,
      "lon": -84.874946,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 939,
      "placeGeoid": "1319000",
      "priceIndex": {
        "all": 89.296,
        "goods": 96.332,
        "housing": 61.185,
        "servicesOther": 98.578,
        "utilities": 89.666
      },
      "resolutionNote": "Columbus, GA uses Muscogee County as the computation county.",
      "shortName": "Columbus",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14208,
      "cbsaCode": "28940",
      "cbsaName": "Knoxville, TN",
      "confidence": "high",
      "countyFips": "47093",
      "countyName": "Knox County",
      "displayName": "Knoxville, TN",
      "id": "PLACE:4740000",
      "lat": 35.97068,
      "lon": -83.94927,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1184,
      "placeGeoid": "4740000",
      "priceIndex": {
        "all": 92.569,
        "goods": 96.247,
        "housing": 82.783,
        "servicesOther": 95.142,
        "utilities": 71.869
      },
      "resolutionNote": "Knoxville, TN uses Knox County as the computation county.",
      "shortName": "Knoxville",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13368,
      "cbsaCode": "12260",
      "cbsaName": "Augusta-Richmond County, GA-SC",
      "confidence": "high",
      "countyFips": "13245",
      "countyName": "Richmond County",
      "displayName": "Augusta-Richmond County consolidated government (balance), GA",
      "id": "PLACE:1304204",
      "lat": 33.365531,
      "lon": -82.073422,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1114,
      "placeGeoid": "1304204",
      "priceIndex": {
        "all": 91.903,
        "goods": 96.293,
        "housing": 70.603,
        "servicesOther": 98.54,
        "utilities": 89.473
      },
      "resolutionNote": "Augusta-Richmond County consolidated government (balance), GA uses Richmond County as the computation county.",
      "shortName": "Augusta-Richmond County consolidated government (balance)",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15336,
      "cbsaCode": "24340",
      "cbsaName": "Grand Rapids-Wyoming-Kentwood, MI",
      "confidence": "low",
      "countyFips": "26081",
      "countyName": "Kent County",
      "displayName": "Grand Rapids, MI",
      "id": "PLACE:2634000",
      "lat": 42.961156,
      "lon": -85.65557,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1278,
      "placeGeoid": "2634000",
      "priceIndex": {
        "all": 95.546,
        "goods": 93.711,
        "housing": 86.596,
        "servicesOther": 99.561,
        "utilities": 93.775
      },
      "resolutionNote": "Grand Rapids, MI uses Kent County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Grand Rapids",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Peoria, AZ",
      "id": "PLACE:0454050",
      "lat": 33.786186,
      "lon": -112.308042,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0454050",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Peoria, AZ uses Maricopa County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Peoria",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11028,
      "cbsaCode": "33660",
      "cbsaName": "Mobile, AL",
      "confidence": "high",
      "countyFips": "01097",
      "countyName": "Mobile County",
      "displayName": "Mobile, AL",
      "id": "PLACE:0150000",
      "lat": 30.668246,
      "lon": -88.107853,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 919,
      "placeGeoid": "0150000",
      "priceIndex": {
        "all": 88.098,
        "goods": 96.397,
        "housing": 60.116,
        "servicesOther": 96.693,
        "utilities": 84.185
      },
      "resolutionNote": "Mobile, AL uses Mobile County as the computation county.",
      "shortName": "Mobile",
      "state": "AL",
      "stateName": "Alabama",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20124,
      "cbsaCode": "38900",
      "cbsaName": "Portland-Vancouver-Hillsboro, OR-WA",
      "confidence": "high",
      "countyFips": "53011",
      "countyName": "Clark County",
      "displayName": "Vancouver, WA",
      "id": "PLACE:5374060",
      "lat": 45.637156,
      "lon": -122.596567,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1677,
      "placeGeoid": "5374060",
      "priceIndex": {
        "all": 105.421,
        "goods": 105.222,
        "housing": 125.114,
        "servicesOther": 100.136,
        "utilities": 106.974
      },
      "resolutionNote": "Vancouver, WA uses Clark County as the computation county.",
      "shortName": "Vancouver",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27000,
      "cbsaCode": "37100",
      "cbsaName": "Oxnard-Thousand Oaks-Ventura, CA",
      "confidence": "high",
      "countyFips": "06111",
      "countyName": "Ventura County",
      "displayName": "Oxnard, CA",
      "id": "PLACE:0654652",
      "lat": 34.199436,
      "lon": -119.207515,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2250,
      "placeGeoid": "0654652",
      "priceIndex": {
        "all": 110.534,
        "goods": 105.168,
        "housing": 171.096,
        "servicesOther": 100.267,
        "utilities": 152.925
      },
      "resolutionNote": "Oxnard, CA uses Ventura County as the computation county.",
      "shortName": "Oxnard",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13860,
      "cbsaCode": "13820",
      "cbsaName": "Birmingham, AL",
      "confidence": "low",
      "countyFips": "01073",
      "countyName": "Jefferson County",
      "displayName": "Birmingham, AL",
      "id": "PLACE:0107000",
      "lat": 33.527174,
      "lon": -86.797036,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1155,
      "placeGeoid": "0107000",
      "priceIndex": {
        "all": 91.644,
        "goods": 96.397,
        "housing": 71.851,
        "servicesOther": 96.693,
        "utilities": 83.803
      },
      "resolutionNote": "Birmingham, AL uses Jefferson County as the computation county. The city spans 2 county parts; the computation county has 99.0% of 2025 city population. Birmingham occupational/license tax is not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Birmingham",
      "state": "AL",
      "stateName": "Alabama",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Birmingham occupational/license tax is not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 16824,
      "cbsaCode": "39300",
      "cbsaName": "Providence-Warwick, RI-MA",
      "confidence": "high",
      "countyFips": "44007",
      "countyName": "Providence County",
      "displayName": "Providence, RI",
      "id": "PLACE:4459000",
      "lat": 41.823056,
      "lon": -71.418784,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1402,
      "placeGeoid": "4459000",
      "priceIndex": {
        "all": 101.773,
        "goods": 97.116,
        "housing": 103.851,
        "servicesOther": 102.275,
        "utilities": 148.809
      },
      "resolutionNote": "Providence, RI uses Providence County as the computation county.",
      "shortName": "Providence",
      "state": "RI",
      "stateName": "Rhode Island",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10440,
      "cbsaCode": "33860",
      "cbsaName": "Montgomery, AL",
      "confidence": "high",
      "countyFips": "01101",
      "countyName": "Montgomery County",
      "displayName": "Montgomery, AL",
      "id": "PLACE:0151000",
      "lat": 32.348503,
      "lon": -86.267307,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 870,
      "placeGeoid": "0151000",
      "priceIndex": {
        "all": 89.682,
        "goods": 96.397,
        "housing": 64.347,
        "servicesOther": 96.693,
        "utilities": 84.907
      },
      "resolutionNote": "Montgomery, AL uses Montgomery County as the computation county.",
      "shortName": "Montgomery",
      "state": "AL",
      "stateName": "Alabama",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15156,
      "cbsaCode": "16860",
      "cbsaName": "Chattanooga, TN-GA",
      "confidence": "high",
      "countyFips": "47065",
      "countyName": "Hamilton County",
      "displayName": "Chattanooga, TN",
      "id": "PLACE:4714000",
      "lat": 35.065958,
      "lon": -85.248386,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1263,
      "placeGeoid": "4714000",
      "priceIndex": {
        "all": 91.464,
        "goods": 95.994,
        "housing": 76.55,
        "servicesOther": 95.311,
        "utilities": 74.209
      },
      "resolutionNote": "Chattanooga, TN uses Hamilton County as the computation county.",
      "shortName": "Chattanooga",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10392,
      "cbsaCode": "15180",
      "cbsaName": "Brownsville-Harlingen, TX",
      "confidence": "high",
      "countyFips": "48061",
      "countyName": "Cameron County",
      "displayName": "Brownsville, TX",
      "id": "PLACE:4810768",
      "lat": 25.989404,
      "lon": -97.480625,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 866,
      "placeGeoid": "4810768",
      "priceIndex": {
        "all": 85.975,
        "goods": 93.757,
        "housing": 57.72,
        "servicesOther": 96.24,
        "utilities": 81.15
      },
      "resolutionNote": "Brownsville, TX uses Cameron County as the computation county.",
      "shortName": "Brownsville",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Huntington Beach, CA",
      "id": "PLACE:0636000",
      "lat": 33.698007,
      "lon": -118.003834,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0636000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Huntington Beach, CA uses Orange County as the computation county.",
      "shortName": "Huntington Beach",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Tempe, AZ",
      "id": "PLACE:0473000",
      "lat": 33.388414,
      "lon": -111.931782,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0473000",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Tempe, AZ uses Maricopa County as the computation county.",
      "shortName": "Tempe",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11820,
      "cbsaCode": "10420",
      "cbsaName": "Akron, OH",
      "confidence": "low",
      "countyFips": "39153",
      "countyName": "Summit County",
      "displayName": "Akron, OH",
      "id": "PLACE:3901000",
      "lat": 41.080456,
      "lon": -81.521429,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 985,
      "placeGeoid": "3901000",
      "priceIndex": {
        "all": 93.37,
        "goods": 93.628,
        "housing": 76.785,
        "servicesOther": 98.939,
        "utilities": 96.448
      },
      "resolutionNote": "Akron, OH uses Summit County as the computation county. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Akron",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 13128,
      "cbsaCode": "17300",
      "cbsaName": "Clarksville, TN-KY",
      "confidence": "high",
      "countyFips": "47125",
      "countyName": "Montgomery County",
      "displayName": "Clarksville, TN",
      "id": "PLACE:4715160",
      "lat": 36.56643,
      "lon": -87.345216,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1094,
      "placeGeoid": "4715160",
      "priceIndex": {
        "all": 90.947,
        "goods": 96.247,
        "housing": 73.801,
        "servicesOther": 95.52,
        "utilities": 72.546
      },
      "resolutionNote": "Clarksville, TN uses Montgomery County as the computation county.",
      "shortName": "Clarksville",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Fort Lauderdale, FL",
      "id": "PLACE:1224000",
      "lat": 26.141227,
      "lon": -80.146731,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1224000",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Fort Lauderdale, FL uses Broward County as the computation county.",
      "shortName": "Fort Lauderdale",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Glendale, CA",
      "id": "PLACE:0630000",
      "lat": 34.181393,
      "lon": -118.24583,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0630000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Glendale, CA uses Los Angeles County as the computation county.",
      "shortName": "Glendale",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Ontario, CA",
      "id": "PLACE:0653896",
      "lat": 34.037042,
      "lon": -117.605956,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0653896",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Ontario, CA uses San Bernardino County as the computation county.",
      "shortName": "Ontario",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21984,
      "cbsaCode": "40900",
      "cbsaName": "Sacramento-Roseville-Folsom, CA",
      "confidence": "high",
      "countyFips": "06067",
      "countyName": "Sacramento County",
      "displayName": "Elk Grove, CA",
      "id": "PLACE:0622020",
      "lat": 38.414621,
      "lon": -121.384961,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1832,
      "placeGeoid": "0622020",
      "priceIndex": {
        "all": 106.67,
        "goods": 105.168,
        "housing": 130.23,
        "servicesOther": 100.267,
        "utilities": 151.29
      },
      "resolutionNote": "Elk Grove, CA uses Sacramento County as the computation county.",
      "shortName": "Elk Grove",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19152,
      "cbsaCode": "39580",
      "cbsaName": "Raleigh-Cary, NC",
      "confidence": "medium",
      "countyFips": "37183",
      "countyName": "Wake County",
      "displayName": "Cary, NC",
      "id": "PLACE:3710740",
      "lat": 35.781302,
      "lon": -78.823444,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1596,
      "placeGeoid": "3710740",
      "priceIndex": {
        "all": 98.157,
        "goods": 96.621,
        "housing": 103.476,
        "servicesOther": 98.186,
        "utilities": 88.96
      },
      "resolutionNote": "Cary, NC uses Wake County as the computation county. The city spans 3 county parts; the computation county has 97.8% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Raleigh-Cary, NC MSA, 97.8% population share).",
      "shortName": "Cary",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51700",
      "countyName": "Newport News city",
      "displayName": "Newport News, VA",
      "id": "PLACE:5156000",
      "lat": 37.076136,
      "lon": -76.52198,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5156000",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Newport News, VA uses Newport News city as the computation county.",
      "shortName": "Newport News",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14412,
      "cbsaCode": "41420",
      "cbsaName": "Salem, OR",
      "confidence": "high",
      "countyFips": "41047",
      "countyName": "Marion County",
      "displayName": "Salem, OR",
      "id": "PLACE:4164900",
      "lat": 44.9239,
      "lon": -123.023007,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1201,
      "placeGeoid": "4164900",
      "priceIndex": {
        "all": 103.649,
        "goods": 105.261,
        "housing": 110.333,
        "servicesOther": 100.298,
        "utilities": 104.689
      },
      "resolutionNote": "Salem, OR uses Marion County as the computation county. The city spans 2 county parts; the computation county has 83.3% of 2025 city population.",
      "shortName": "Salem",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18972,
      "cbsaCode": "16980",
      "cbsaName": "Chicago-Naperville-Elgin, IL-IN",
      "confidence": "medium",
      "countyFips": "17089",
      "countyName": "Kane County",
      "displayName": "Aurora, IL",
      "id": "PLACE:1703012",
      "lat": 41.763455,
      "lon": -88.290099,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1581,
      "placeGeoid": "1703012",
      "priceIndex": {
        "all": 103.595,
        "goods": 107.258,
        "housing": 112.01,
        "servicesOther": 100.492,
        "utilities": 83.581
      },
      "resolutionNote": "Aurora, IL uses Kane County as the computation county. The city spans 4 county parts; the computation county has 61.1% of 2025 city population. Housing uses the dominant HUD FMR area (Chicago-Joliet-Naperville, IL HUD Metro FMR Area, 96.4% population share).",
      "shortName": "Aurora",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25860,
      "cbsaCode": "42220",
      "cbsaName": "Santa Rosa-Petaluma, CA",
      "confidence": "high",
      "countyFips": "06097",
      "countyName": "Sonoma County",
      "displayName": "Santa Rosa, CA",
      "id": "PLACE:0670098",
      "lat": 38.445824,
      "lon": -122.706181,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2155,
      "placeGeoid": "0670098",
      "priceIndex": {
        "all": 107.784,
        "goods": 105.168,
        "housing": 139.569,
        "servicesOther": 100.267,
        "utilities": 154.777
      },
      "resolutionNote": "Santa Rosa, CA uses Sonoma County as the computation county.",
      "shortName": "Santa Rosa",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15432,
      "cbsaCode": "21660",
      "cbsaName": "Eugene-Springfield, OR",
      "confidence": "high",
      "countyFips": "41039",
      "countyName": "Lane County",
      "displayName": "Eugene, OR",
      "id": "PLACE:4123850",
      "lat": 44.056848,
      "lon": -123.119019,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1286,
      "placeGeoid": "4123850",
      "priceIndex": {
        "all": 101.568,
        "goods": 105.261,
        "housing": 98.35,
        "servicesOther": 100.298,
        "utilities": 102.531
      },
      "resolutionNote": "Eugene, OR uses Lane County as the computation county.",
      "shortName": "Eugene",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Rancho Cucamonga, CA",
      "id": "PLACE:0659451",
      "lat": 34.130306,
      "lon": -117.566067,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0659451",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Rancho Cucamonga, CA uses San Bernardino County as the computation county.",
      "shortName": "Rancho Cucamonga",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Pembroke Pines, FL",
      "id": "PLACE:1255775",
      "lat": 26.014716,
      "lon": -80.340171,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1255775",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Pembroke Pines, FL uses Broward County as the computation county.",
      "shortName": "Pembroke Pines",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11784,
      "cbsaCode": "43340",
      "cbsaName": "Shreveport-Bossier City, LA",
      "confidence": "high",
      "countyFips": "22017",
      "countyName": "Caddo Parish",
      "displayName": "Shreveport, LA",
      "id": "PLACE:2270000",
      "lat": 32.466879,
      "lon": -93.792193,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 982,
      "placeGeoid": "2270000",
      "priceIndex": {
        "all": 84.766,
        "goods": 93.691,
        "housing": 52.286,
        "servicesOther": 95.705,
        "utilities": 72.558
      },
      "resolutionNote": "Shreveport, LA uses Caddo Parish as the computation county. The city spans 2 county parts; the computation county has 98.5% of 2025 city population.",
      "shortName": "Shreveport",
      "state": "LA",
      "stateName": "Louisiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Surprise, AZ",
      "id": "PLACE:0471510",
      "lat": 33.670801,
      "lon": -112.452546,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0471510",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Surprise, AZ uses Maricopa County as the computation county.",
      "shortName": "Surprise",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18444,
      "cbsaCode": "22660",
      "cbsaName": "Fort Collins-Loveland, CO",
      "confidence": "high",
      "countyFips": "08069",
      "countyName": "Larimer County",
      "displayName": "Fort Collins, CO",
      "id": "PLACE:0827425",
      "lat": 40.548216,
      "lon": -105.064833,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1537,
      "placeGeoid": "0827425",
      "priceIndex": {
        "all": 101.128,
        "goods": 96.052,
        "housing": 120.592,
        "servicesOther": 99.822,
        "utilities": 82.156
      },
      "resolutionNote": "Fort Collins, CO uses Larimer County as the computation county.",
      "shortName": "Fort Collins",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18936,
      "cbsaCode": "34980",
      "cbsaName": "Nashville-Davidson--Murfreesboro--Franklin, TN",
      "confidence": "high",
      "countyFips": "47149",
      "countyName": "Rutherford County",
      "displayName": "Murfreesboro, TN",
      "id": "PLACE:4751560",
      "lat": 35.853915,
      "lon": -86.421224,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1578,
      "placeGeoid": "4751560",
      "priceIndex": {
        "all": 96.338,
        "goods": 96.247,
        "housing": 104.626,
        "servicesOther": 95.142,
        "utilities": 71.95
      },
      "resolutionNote": "Murfreesboro, TN uses Rutherford County as the computation county.",
      "shortName": "Murfreesboro",
      "state": "TN",
      "stateName": "Tennessee",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "Oceanside, CA",
      "id": "PLACE:0653322",
      "lat": 33.224601,
      "lon": -117.306291,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0653322",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "Oceanside, CA uses San Diego County as the computation county.",
      "shortName": "Oceanside",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Garden Grove, CA",
      "id": "PLACE:0629000",
      "lat": 33.778782,
      "lon": -117.960472,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0629000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Garden Grove, CA uses Orange County as the computation county.",
      "shortName": "Garden Grove",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Lancaster, CA",
      "id": "PLACE:0640130",
      "lat": 34.693558,
      "lon": -118.175305,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0640130",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Lancaster, CA uses Los Angeles County as the computation county.",
      "shortName": "Lancaster",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10596,
      "cbsaCode": "44180",
      "cbsaName": "Springfield, MO",
      "confidence": "high",
      "countyFips": "29077",
      "countyName": "Greene County",
      "displayName": "Springfield, MO",
      "id": "PLACE:2970000",
      "lat": 37.194157,
      "lon": -93.292642,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 883,
      "placeGeoid": "2970000",
      "priceIndex": {
        "all": 88.585,
        "goods": 94.193,
        "housing": 65.568,
        "servicesOther": 93.026,
        "utilities": 85.825
      },
      "resolutionNote": "Springfield, MO uses Greene County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Springfield",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48121",
      "countyName": "Denton County",
      "displayName": "Denton, TX",
      "id": "PLACE:4819972",
      "lat": 33.217449,
      "lon": -97.141346,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4819972",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Denton, TX uses Denton County as the computation county.",
      "shortName": "Denton",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21984,
      "cbsaCode": "40900",
      "cbsaName": "Sacramento-Roseville-Folsom, CA",
      "confidence": "high",
      "countyFips": "06061",
      "countyName": "Placer County",
      "displayName": "Roseville, CA",
      "id": "PLACE:0662938",
      "lat": 38.770296,
      "lon": -121.319634,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1832,
      "placeGeoid": "0662938",
      "priceIndex": {
        "all": 106.67,
        "goods": 105.168,
        "housing": 130.23,
        "servicesOther": 100.267,
        "utilities": 151.29
      },
      "resolutionNote": "Roseville, CA uses Placer County as the computation county.",
      "shortName": "Roseville",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11880,
      "cbsaCode": "28660",
      "cbsaName": "Killeen-Temple, TX",
      "confidence": "high",
      "countyFips": "48027",
      "countyName": "Bell County",
      "displayName": "Killeen, TX",
      "id": "PLACE:4839148",
      "lat": 31.077669,
      "lon": -97.731952,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 990,
      "placeGeoid": "4839148",
      "priceIndex": {
        "all": 91.132,
        "goods": 93.757,
        "housing": 77.884,
        "servicesOther": 96.24,
        "utilities": 81.242
      },
      "resolutionNote": "Killeen, TX uses Bell County as the computation county.",
      "shortName": "Killeen",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Palmdale, CA",
      "id": "PLACE:0655156",
      "lat": 34.591038,
      "lon": -118.105403,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0655156",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Palmdale, CA uses Los Angeles County as the computation county.",
      "shortName": "Palmdale",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 24288,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "34031",
      "countyName": "Passaic County",
      "displayName": "Paterson, NJ",
      "id": "PLACE:3457000",
      "lat": 40.914766,
      "lon": -74.162829,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2024,
      "placeGeoid": "3457000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "Paterson, NJ uses Passaic County as the computation county.",
      "shortName": "Paterson",
      "state": "NJ",
      "stateName": "New Jersey",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Corona, CA",
      "id": "PLACE:0616350",
      "lat": 33.861969,
      "lon": -117.565495,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0616350",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Corona, CA uses Riverside County as the computation county.",
      "shortName": "Corona",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 24180,
      "cbsaCode": "47900",
      "cbsaName": "Washington-Arlington-Alexandria, DC-VA-MD-WV",
      "confidence": "high",
      "countyFips": "51510",
      "countyName": "Alexandria city",
      "displayName": "Alexandria, VA",
      "id": "PLACE:5101000",
      "lat": 38.819251,
      "lon": -77.08367,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2015,
      "placeGeoid": "5101000",
      "priceIndex": {
        "all": 108.884,
        "goods": 104.847,
        "housing": 151.134,
        "servicesOther": 102.321,
        "utilities": 106.7
      },
      "resolutionNote": "Alexandria, VA uses Alexandria city as the computation county.",
      "shortName": "Alexandria",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19560,
      "cbsaCode": "16700",
      "cbsaName": "Charleston-North Charleston, SC",
      "confidence": "high",
      "countyFips": "45019",
      "countyName": "Charleston County",
      "displayName": "Charleston, SC",
      "id": "PLACE:4513330",
      "lat": 32.828017,
      "lon": -79.972896,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1630,
      "placeGeoid": "4513330",
      "priceIndex": {
        "all": 100.962,
        "goods": 96.339,
        "housing": 119.77,
        "servicesOther": 98.284,
        "utilities": 88.212
      },
      "resolutionNote": "Charleston, SC uses Charleston County as the computation county. The city spans 2 county parts; the computation county has 89.5% of 2025 city population.",
      "shortName": "Charleston",
      "state": "SC",
      "stateName": "South Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 26784,
      "cbsaCode": "41500",
      "cbsaName": "Salinas, CA",
      "confidence": "high",
      "countyFips": "06053",
      "countyName": "Monterey County",
      "displayName": "Salinas, CA",
      "id": "PLACE:0664224",
      "lat": 36.690217,
      "lon": -121.633793,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2232,
      "placeGeoid": "0664224",
      "priceIndex": {
        "all": 109.042,
        "goods": 105.168,
        "housing": 145.669,
        "servicesOther": 100.267,
        "utilities": 154.157
      },
      "resolutionNote": "Salinas, CA uses Monterey County as the computation county.",
      "shortName": "Salinas",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "20209",
      "countyName": "Wyandotte County",
      "displayName": "Kansas City, KS",
      "id": "PLACE:2036000",
      "lat": 39.122539,
      "lon": -94.741781,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2036000",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Kansas City, KS uses Wyandotte County as the computation county.",
      "shortName": "Kansas City",
      "state": "KS",
      "stateName": "Kansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13896,
      "cbsaCode": "31420",
      "cbsaName": "Macon-Bibb County, GA",
      "confidence": "high",
      "countyFips": "13021",
      "countyName": "Bibb County",
      "displayName": "Macon-Bibb County, GA",
      "id": "PLACE:1349008",
      "lat": 32.80899,
      "lon": -83.69406,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1158,
      "placeGeoid": "1349008",
      "priceIndex": {
        "all": 88.528,
        "goods": 96.269,
        "housing": 58.916,
        "servicesOther": 98.667,
        "utilities": 89.482
      },
      "resolutionNote": "Macon-Bibb County, GA uses Bibb County as the computation county.",
      "shortName": "Macon-Bibb County",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06001",
      "countyName": "Alameda County",
      "displayName": "Hayward, CA",
      "id": "PLACE:0633000",
      "lat": 37.626826,
      "lon": -122.104015,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0633000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Hayward, CA uses Alameda County as the computation county.",
      "shortName": "Hayward",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Hollywood, FL",
      "id": "PLACE:1232000",
      "lat": 26.030967,
      "lon": -80.164609,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1232000",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Hollywood, FL uses Broward County as the computation county.",
      "shortName": "Hollywood",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08059",
      "countyName": "Jefferson County",
      "displayName": "Lakewood, CO",
      "id": "PLACE:0843000",
      "lat": 39.698939,
      "lon": -105.117573,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0843000",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Lakewood, CO uses Jefferson County as the computation county.",
      "shortName": "Lakewood",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
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
      "lat": 37.385797,
      "lon": -122.026316,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2982,
      "placeGeoid": "0677000",
      "priceIndex": {
        "all": 110.423,
        "goods": 105.168,
        "housing": 211.901,
        "servicesOther": 100.267,
        "utilities": 156.659
      },
      "resolutionNote": "Sunnyvale, CA uses Santa Clara County as the computation county.",
      "shortName": "Sunnyvale",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16584,
      "cbsaCode": "44140",
      "cbsaName": "Springfield, MA",
      "confidence": "high",
      "countyFips": "25013",
      "countyName": "Hampden County",
      "displayName": "Springfield, MA",
      "id": "PLACE:2567000",
      "lat": 42.115454,
      "lon": -72.539978,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1382,
      "placeGeoid": "2567000",
      "priceIndex": {
        "all": 96.061,
        "goods": 97.015,
        "housing": 75.781,
        "servicesOther": 101.197,
        "utilities": 154.996
      },
      "resolutionNote": "Springfield, MA uses Hampden County as the computation county.",
      "shortName": "Springfield",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25752,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53033",
      "countyName": "King County",
      "displayName": "Bellevue, WA",
      "id": "PLACE:5305210",
      "lat": 47.597837,
      "lon": -122.15648,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5305210",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Bellevue, WA uses King County as the computation county.",
      "shortName": "Bellevue",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18972,
      "cbsaCode": "16980",
      "cbsaName": "Chicago-Naperville-Elgin, IL-IN",
      "confidence": "high",
      "countyFips": "17043",
      "countyName": "DuPage County",
      "displayName": "Naperville, IL",
      "id": "PLACE:1751622",
      "lat": 41.749173,
      "lon": -88.162019,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1581,
      "placeGeoid": "1751622",
      "priceIndex": {
        "all": 103.595,
        "goods": 107.258,
        "housing": 112.01,
        "servicesOther": 100.492,
        "utilities": 83.581
      },
      "resolutionNote": "Naperville, IL uses DuPage County as the computation county. The city spans 2 county parts; the computation county has 65.8% of 2025 city population.",
      "shortName": "Naperville",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25200,
      "cbsaCode": "14860",
      "cbsaName": "Bridgeport-Stamford-Danbury, CT",
      "confidence": "high",
      "countyFips": "09120",
      "countyName": "Greater Bridgeport Planning Region",
      "displayName": "Bridgeport, CT",
      "id": "PLACE:0908000",
      "lat": 41.187393,
      "lon": -73.195757,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2100,
      "placeGeoid": "0908000",
      "priceIndex": {
        "all": 106.864,
        "goods": 97.33,
        "housing": 150.453,
        "servicesOther": 102.658,
        "utilities": 147.074
      },
      "resolutionNote": "Bridgeport, CT uses Greater Bridgeport Planning Region as the computation county.",
      "shortName": "Bridgeport",
      "state": "CT",
      "stateName": "Connecticut",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18972,
      "cbsaCode": "16980",
      "cbsaName": "Chicago-Naperville-Elgin, IL-IN",
      "confidence": "medium",
      "countyFips": "17197",
      "countyName": "Will County",
      "displayName": "Joliet, IL",
      "id": "PLACE:1738570",
      "lat": 41.516866,
      "lon": -88.147963,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1581,
      "placeGeoid": "1738570",
      "priceIndex": {
        "all": 103.595,
        "goods": 107.258,
        "housing": 112.01,
        "servicesOther": 100.492,
        "utilities": 83.581
      },
      "resolutionNote": "Joliet, IL uses Will County as the computation county. The city spans 2 county parts; the computation county has 90.4% of 2025 city population. Housing uses the dominant HUD FMR area (Chicago-Joliet-Naperville, IL HUD Metro FMR Area, 90.4% population share).",
      "shortName": "Joliet",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Mesquite, TX",
      "id": "PLACE:4847892",
      "lat": 32.75955,
      "lon": -96.584164,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4847892",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Mesquite, TX uses Dallas County as the computation county. The city spans 2 county parts; the computation county has 99.9% of 2025 city population.",
      "shortName": "Mesquite",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10164,
      "cbsaCode": "32580",
      "cbsaName": "McAllen-Edinburg-Mission, TX",
      "confidence": "high",
      "countyFips": "48215",
      "countyName": "Hidalgo County",
      "displayName": "McAllen, TX",
      "id": "PLACE:4845384",
      "lat": 26.224966,
      "lon": -98.246083,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 847,
      "placeGeoid": "4845384",
      "priceIndex": {
        "all": 85.895,
        "goods": 93.757,
        "housing": 55.892,
        "servicesOther": 96.24,
        "utilities": 81.186
      },
      "resolutionNote": "McAllen, TX uses Hidalgo County as the computation county.",
      "shortName": "McAllen",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "20091",
      "countyName": "Johnson County",
      "displayName": "Olathe, KS",
      "id": "PLACE:2052575",
      "lat": 38.882031,
      "lon": -94.820054,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2052575",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Olathe, KS uses Johnson County as the computation county.",
      "shortName": "Olathe",
      "state": "KS",
      "stateName": "Kansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18396,
      "cbsaCode": "42340",
      "cbsaName": "Savannah, GA",
      "confidence": "high",
      "countyFips": "13051",
      "countyName": "Chatham County",
      "displayName": "Savannah, GA",
      "id": "PLACE:1369000",
      "lat": 32.012457,
      "lon": -81.194157,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1533,
      "placeGeoid": "1369000",
      "priceIndex": {
        "all": 95.206,
        "goods": 96.269,
        "housing": 86.012,
        "servicesOther": 98.667,
        "utilities": 88.603
      },
      "resolutionNote": "Savannah, GA uses Chatham County as the computation county.",
      "shortName": "Savannah",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14952,
      "cbsaCode": "23540",
      "cbsaName": "Gainesville, FL",
      "confidence": "high",
      "countyFips": "12001",
      "countyName": "Alachua County",
      "displayName": "Gainesville, FL",
      "id": "PLACE:1225175",
      "lat": 29.679537,
      "lon": -82.346793,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1246,
      "placeGeoid": "1225175",
      "priceIndex": {
        "all": 96.733,
        "goods": 96.24,
        "housing": 92.982,
        "servicesOther": 98.864,
        "utilities": 88.155
      },
      "resolutionNote": "Gainesville, FL uses Alachua County as the computation county.",
      "shortName": "Gainesville",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15876,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "high",
      "countyFips": "48201",
      "countyName": "Harris County",
      "displayName": "Pasadena, TX",
      "id": "PLACE:4856000",
      "lat": 29.654996,
      "lon": -95.151055,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1323,
      "placeGeoid": "4856000",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "Pasadena, TX uses Harris County as the computation county.",
      "shortName": "Pasadena",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17736,
      "cbsaCode": "37340",
      "cbsaName": "Palm Bay-Melbourne-Titusville, FL",
      "confidence": "high",
      "countyFips": "12009",
      "countyName": "Brevard County",
      "displayName": "Palm Bay, FL",
      "id": "PLACE:1254000",
      "lat": 27.954802,
      "lon": -80.664962,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1478,
      "placeGeoid": "1254000",
      "priceIndex": {
        "all": 100.005,
        "goods": 96.24,
        "housing": 111.731,
        "servicesOther": 98.864,
        "utilities": 88.064
      },
      "resolutionNote": "Palm Bay, FL uses Brevard County as the computation county.",
      "shortName": "Palm Bay",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Pomona, CA",
      "id": "PLACE:0658072",
      "lat": 34.058494,
      "lon": -117.761091,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0658072",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Pomona, CA uses Los Angeles County as the computation county.",
      "shortName": "Pomona",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11952,
      "cbsaCode": "47380",
      "cbsaName": "Waco, TX",
      "confidence": "high",
      "countyFips": "48309",
      "countyName": "McLennan County",
      "displayName": "Waco, TX",
      "id": "PLACE:4876000",
      "lat": 31.557994,
      "lon": -97.18975,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 996,
      "placeGeoid": "4876000",
      "priceIndex": {
        "all": 92.55,
        "goods": 93.757,
        "housing": 83.531,
        "servicesOther": 96.24,
        "utilities": 80.967
      },
      "resolutionNote": "Waco, TX uses McLennan County as the computation county.",
      "shortName": "Waco",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08001",
      "countyName": "Adams County",
      "displayName": "Thornton, CO",
      "id": "PLACE:0877290",
      "lat": 39.920433,
      "lon": -104.941413,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0877290",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Thornton, CO uses Adams County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Thornton",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17388,
      "cbsaCode": "33260",
      "cbsaName": "Midland, TX",
      "confidence": "medium",
      "countyFips": "48329",
      "countyName": "Midland County",
      "displayName": "Midland, TX",
      "id": "PLACE:4848072",
      "lat": 32.024642,
      "lon": -102.113467,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1449,
      "placeGeoid": "4848072",
      "priceIndex": {
        "all": 95.783,
        "goods": 93.757,
        "housing": 101.497,
        "servicesOther": 96.24,
        "utilities": 83.24
      },
      "resolutionNote": "Midland, TX uses Midland County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population. Housing uses the dominant HUD FMR area (Midland, TX HUD Metro FMR Area, 100.0% population share).",
      "shortName": "Midland",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10740,
      "cbsaCode": "40420",
      "cbsaName": "Rockford, IL",
      "confidence": "high",
      "countyFips": "17201",
      "countyName": "Winnebago County",
      "displayName": "Rockford, IL",
      "id": "PLACE:1765000",
      "lat": 42.2593,
      "lon": -89.063478,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 895,
      "placeGeoid": "1765000",
      "priceIndex": {
        "all": 92.154,
        "goods": 93.643,
        "housing": 70.076,
        "servicesOther": 99.59,
        "utilities": 89.378
      },
      "resolutionNote": "Rockford, IL uses Winnebago County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Rockford",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13968,
      "cbsaCode": "17900",
      "cbsaName": "Columbia, SC",
      "confidence": "high",
      "countyFips": "45079",
      "countyName": "Richland County",
      "displayName": "Columbia, SC",
      "id": "PLACE:4516000",
      "lat": 34.040519,
      "lon": -80.906099,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1164,
      "placeGeoid": "4516000",
      "priceIndex": {
        "all": 93.662,
        "goods": 96.339,
        "housing": 79.455,
        "servicesOther": 98.284,
        "utilities": 88.306
      },
      "resolutionNote": "Columbia, SC uses Richland County as the computation county. The city spans 3 county parts; the computation county has 99.6% of 2025 city population.",
      "shortName": "Columbia",
      "state": "SC",
      "stateName": "South Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13476,
      "cbsaCode": "47300",
      "cbsaName": "Visalia, CA",
      "confidence": "high",
      "countyFips": "06107",
      "countyName": "Tulare County",
      "displayName": "Visalia, CA",
      "id": "PLACE:0682954",
      "lat": 36.32921,
      "lon": -119.326984,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1123,
      "placeGeoid": "0682954",
      "priceIndex": {
        "all": 99.825,
        "goods": 105.168,
        "housing": 84.053,
        "servicesOther": 100.267,
        "utilities": 156.446
      },
      "resolutionNote": "Visalia, CA uses Tulare County as the computation county.",
      "shortName": "Visalia",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "Escondido, CA",
      "id": "PLACE:0622804",
      "lat": 33.133053,
      "lon": -117.074043,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0622804",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "Escondido, CA uses San Diego County as the computation county.",
      "shortName": "Escondido",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13476,
      "cbsaCode": "45060",
      "cbsaName": "Syracuse, NY",
      "confidence": "high",
      "countyFips": "36067",
      "countyName": "Onondaga County",
      "displayName": "Syracuse, NY",
      "id": "PLACE:3673000",
      "lat": 43.040998,
      "lon": -76.143554,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1123,
      "placeGeoid": "3673000",
      "priceIndex": {
        "all": 95.742,
        "goods": 99.693,
        "housing": 80.656,
        "servicesOther": 97.754,
        "utilities": 133.405
      },
      "resolutionNote": "Syracuse, NY uses Onondaga County as the computation county.",
      "shortName": "Syracuse",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16572,
      "cbsaCode": "14260",
      "cbsaName": "Boise City, ID",
      "confidence": "high",
      "countyFips": "16001",
      "countyName": "Ada County",
      "displayName": "Meridian, ID",
      "id": "PLACE:1652120",
      "lat": 43.61149,
      "lon": -116.400662,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1381,
      "placeGeoid": "1652120",
      "priceIndex": {
        "all": 98.391,
        "goods": 96.179,
        "housing": 105.58,
        "servicesOther": 98.974,
        "utilities": 70.695
      },
      "resolutionNote": "Meridian, ID uses Ada County as the computation county.",
      "shortName": "Meridian",
      "state": "ID",
      "stateName": "Idaho",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Miramar, FL",
      "id": "PLACE:1245975",
      "lat": 25.972529,
      "lon": -80.338582,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1245975",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Miramar, FL uses Broward County as the computation county.",
      "shortName": "Miramar",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21864,
      "cbsaCode": "35620",
      "cbsaName": "New York-Newark-Jersey City, NY-NJ",
      "confidence": "high",
      "countyFips": "34039",
      "countyName": "Union County",
      "displayName": "Elizabeth, NJ",
      "id": "PLACE:3421000",
      "lat": 40.666367,
      "lon": -74.193503,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1822,
      "placeGeoid": "3421000",
      "priceIndex": {
        "all": 112.563,
        "goods": 110.261,
        "housing": 148.616,
        "servicesOther": 105.836,
        "utilities": 127.018
      },
      "resolutionNote": "Elizabeth, NJ uses Union County as the computation county.",
      "shortName": "Elizabeth",
      "state": "NJ",
      "stateName": "New Jersey",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Victorville, CA",
      "id": "PLACE:0682590",
      "lat": 34.527735,
      "lon": -117.353579,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0682590",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Victorville, CA uses San Bernardino County as the computation county.",
      "shortName": "Victorville",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18744,
      "cbsaCode": "12420",
      "cbsaName": "Austin-Round Rock-San Marcos, TX",
      "confidence": "high",
      "countyFips": "48491",
      "countyName": "Williamson County",
      "displayName": "Round Rock, TX",
      "id": "PLACE:4863500",
      "lat": 30.526146,
      "lon": -97.663532,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1562,
      "placeGeoid": "4863500",
      "priceIndex": {
        "all": 98.066,
        "goods": 93.757,
        "housing": 120.361,
        "servicesOther": 96.24,
        "utilities": 82.044
      },
      "resolutionNote": "Round Rock, TX uses Williamson County as the computation county. The city spans 2 county parts; the computation county has 98.6% of 2025 city population.",
      "shortName": "Round Rock",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13164,
      "cbsaCode": "27140",
      "cbsaName": "Jackson, MS",
      "confidence": "high",
      "countyFips": "28049",
      "countyName": "Hinds County",
      "displayName": "Jackson, MS",
      "id": "PLACE:2836000",
      "lat": 32.315834,
      "lon": -90.21285,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1097,
      "placeGeoid": "2836000",
      "priceIndex": {
        "all": 89.048,
        "goods": 96.219,
        "housing": 64.768,
        "servicesOther": 96.09,
        "utilities": 78.137
      },
      "resolutionNote": "Jackson, MS uses Hinds County as the computation county. The city spans 3 county parts; the computation county has 99.6% of 2025 city population.",
      "shortName": "Jackson",
      "state": "MS",
      "stateName": "Mississippi",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25200,
      "cbsaCode": "14860",
      "cbsaName": "Bridgeport-Stamford-Danbury, CT",
      "confidence": "high",
      "countyFips": "09190",
      "countyName": "Western Connecticut Planning Region",
      "displayName": "Stamford, CT",
      "id": "PLACE:0973000",
      "lat": 41.079611,
      "lon": -73.54608,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2100,
      "placeGeoid": "0973000",
      "priceIndex": {
        "all": 106.864,
        "goods": 97.33,
        "housing": 150.453,
        "servicesOther": 102.658,
        "utilities": 147.074
      },
      "resolutionNote": "Stamford, CT uses Western Connecticut Planning Region as the computation county.",
      "shortName": "Stamford",
      "state": "CT",
      "stateName": "Connecticut",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48121",
      "countyName": "Denton County",
      "displayName": "Lewisville, TX",
      "id": "PLACE:4842508",
      "lat": 33.050725,
      "lon": -96.974623,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4842508",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Lewisville, TX uses Denton County as the computation county. The city spans 2 county parts; the computation county has 99.0% of 2025 city population.",
      "shortName": "Lewisville",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Coral Springs, FL",
      "id": "PLACE:1214400",
      "lat": 26.270722,
      "lon": -80.259301,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1214400",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Coral Springs, FL uses Broward County as the computation county.",
      "shortName": "Coral Springs",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19092,
      "cbsaCode": "35300",
      "cbsaName": "New Haven, CT",
      "confidence": "high",
      "countyFips": "09170",
      "countyName": "South Central Connecticut Planning Region",
      "displayName": "New Haven, CT",
      "id": "PLACE:0952000",
      "lat": 41.310809,
      "lon": -72.924953,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1591,
      "placeGeoid": "0952000",
      "priceIndex": {
        "all": 104.559,
        "goods": 97.33,
        "housing": 124.293,
        "servicesOther": 102.658,
        "utilities": 144.848
      },
      "resolutionNote": "New Haven, CT uses South Central Connecticut Planning Region as the computation county.",
      "shortName": "New Haven",
      "state": "CT",
      "stateName": "Connecticut",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Fullerton, CA",
      "id": "PLACE:0628000",
      "lat": 33.885716,
      "lon": -117.928025,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0628000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Fullerton, CA uses Orange County as the computation county.",
      "shortName": "Fullerton",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Torrance, CA",
      "id": "PLACE:0680000",
      "lat": 33.830453,
      "lon": -118.356618,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0680000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Torrance, CA uses Los Angeles County as the computation county.",
      "shortName": "Torrance",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Orange, CA",
      "id": "PLACE:0653980",
      "lat": 33.786971,
      "lon": -117.861265,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0653980",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Orange, CA uses Orange County as the computation county.",
      "shortName": "Orange",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 9792,
      "cbsaCode": "16300",
      "cbsaName": "Cedar Rapids, IA",
      "confidence": "high",
      "countyFips": "19113",
      "countyName": "Linn County",
      "displayName": "Cedar Rapids, IA",
      "id": "PLACE:1912000",
      "lat": 41.96419,
      "lon": -91.67917,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 816,
      "placeGeoid": "1912000",
      "priceIndex": {
        "all": 88.963,
        "goods": 93.73,
        "housing": 71.447,
        "servicesOther": 92.927,
        "utilities": 83.981
      },
      "resolutionNote": "Cedar Rapids, IA uses Linn County as the computation county.",
      "shortName": "Cedar Rapids",
      "state": "IA",
      "stateName": "Iowa",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17472,
      "cbsaCode": "41620",
      "cbsaName": "Salt Lake City-Murray, UT",
      "confidence": "high",
      "countyFips": "49035",
      "countyName": "Salt Lake County",
      "displayName": "West Valley City, UT",
      "id": "PLACE:4983470",
      "lat": 40.688493,
      "lon": -112.011759,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1456,
      "placeGeoid": "4983470",
      "priceIndex": {
        "all": 100.868,
        "goods": 96.446,
        "housing": 123.311,
        "servicesOther": 98.959,
        "utilities": 79.0
      },
      "resolutionNote": "West Valley City, UT uses Salt Lake County as the computation county.",
      "shortName": "West Valley City",
      "state": "UT",
      "stateName": "Utah",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51650",
      "countyName": "Hampton city",
      "displayName": "Hampton, VA",
      "id": "PLACE:5135000",
      "lat": 37.047961,
      "lon": -76.297293,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5135000",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Hampton, VA uses Hampton city as the computation county.",
      "shortName": "Hampton",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13464,
      "cbsaCode": "19820",
      "cbsaName": "Detroit-Warren-Dearborn, MI",
      "confidence": "low",
      "countyFips": "26099",
      "countyName": "Macomb County",
      "displayName": "Warren, MI",
      "id": "PLACE:2684000",
      "lat": 42.492904,
      "lon": -83.025001,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1122,
      "placeGeoid": "2684000",
      "priceIndex": {
        "all": 100.298,
        "goods": 98.817,
        "housing": 94.69,
        "servicesOther": 102.591,
        "utilities": 106.988
      },
      "resolutionNote": "Warren, MI uses Macomb County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Warren",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 12108,
      "cbsaCode": "19430",
      "cbsaName": "Dayton-Kettering-Beavercreek, OH",
      "confidence": "low",
      "countyFips": "39113",
      "countyName": "Montgomery County",
      "displayName": "Dayton, OH",
      "id": "PLACE:3921000",
      "lat": 39.784743,
      "lon": -84.199632,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1009,
      "placeGeoid": "3921000",
      "priceIndex": {
        "all": 92.694,
        "goods": 93.628,
        "housing": 72.712,
        "servicesOther": 98.939,
        "utilities": 95.388
      },
      "resolutionNote": "Dayton, OH uses Montgomery County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population. Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Dayton",
      "state": "OH",
      "stateName": "Ohio",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 11004,
      "cbsaCode": "22020",
      "cbsaName": "Fargo, ND-MN",
      "confidence": "high",
      "countyFips": "38017",
      "countyName": "Cass County",
      "displayName": "Fargo, ND",
      "id": "PLACE:3825700",
      "lat": 46.8647,
      "lon": -96.82908,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 917,
      "placeGeoid": "3825700",
      "priceIndex": {
        "all": 90.871,
        "goods": 95.654,
        "housing": 81.142,
        "servicesOther": 91.334,
        "utilities": 77.324
      },
      "resolutionNote": "Fargo, ND uses Cass County as the computation county.",
      "shortName": "Fargo",
      "state": "ND",
      "stateName": "North Dakota",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Pasadena, CA",
      "id": "PLACE:0656000",
      "lat": 34.160602,
      "lon": -118.137954,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0656000",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Pasadena, CA uses Los Angeles County as the computation county.",
      "shortName": "Pasadena",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25752,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53033",
      "countyName": "King County",
      "displayName": "Kent, WA",
      "id": "PLACE:5335415",
      "lat": 47.390008,
      "lon": -122.213528,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5335415",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Kent, WA uses King County as the computation county.",
      "shortName": "Kent",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48121",
      "countyName": "Denton County",
      "displayName": "Carrollton, TX",
      "id": "PLACE:4813024",
      "lat": 32.989386,
      "lon": -96.89994,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4813024",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Carrollton, TX uses Denton County as the computation county. The city spans 3 county parts; the computation county has 61.7% of 2025 city population.",
      "shortName": "Carrollton",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13464,
      "cbsaCode": "19820",
      "cbsaName": "Detroit-Warren-Dearborn, MI",
      "confidence": "low",
      "countyFips": "26099",
      "countyName": "Macomb County",
      "displayName": "Sterling Heights, MI",
      "id": "PLACE:2676460",
      "lat": 42.581206,
      "lon": -83.030316,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1122,
      "placeGeoid": "2676460",
      "priceIndex": {
        "all": 100.298,
        "goods": 98.817,
        "housing": 94.69,
        "servicesOther": 102.591,
        "utilities": 106.988
      },
      "resolutionNote": "Sterling Heights, MI uses Macomb County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Sterling Heights",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 35784,
      "cbsaCode": "41940",
      "cbsaName": "San Jose-Sunnyvale-Santa Clara, CA",
      "confidence": "high",
      "countyFips": "06085",
      "countyName": "Santa Clara County",
      "displayName": "Santa Clara, CA",
      "id": "PLACE:0669084",
      "lat": 37.364621,
      "lon": -121.967973,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2982,
      "placeGeoid": "0669084",
      "priceIndex": {
        "all": 110.423,
        "goods": 105.168,
        "housing": 211.901,
        "servicesOther": 100.267,
        "utilities": 156.659
      },
      "resolutionNote": "Santa Clara, CA uses Santa Clara County as the computation county.",
      "shortName": "Santa Clara",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12240,
      "cbsaCode": "10180",
      "cbsaName": "Abilene, TX",
      "confidence": "high",
      "countyFips": "48441",
      "countyName": "Taylor County",
      "displayName": "Abilene, TX",
      "id": "PLACE:4801000",
      "lat": 32.454514,
      "lon": -99.738147,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1020,
      "placeGeoid": "4801000",
      "priceIndex": {
        "all": 90.364,
        "goods": 93.757,
        "housing": 73.791,
        "servicesOther": 96.24,
        "utilities": 81.162
      },
      "resolutionNote": "Abilene, TX uses Taylor County as the computation county. The city spans 2 county parts; the computation county has 95.6% of 2025 city population.",
      "shortName": "Abilene",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12204,
      "cbsaCode": "36420",
      "cbsaName": "Oklahoma City, OK",
      "confidence": "high",
      "countyFips": "40027",
      "countyName": "Cleveland County",
      "displayName": "Norman, OK",
      "id": "PLACE:4052500",
      "lat": 35.240569,
      "lon": -97.345299,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1017,
      "placeGeoid": "4052500",
      "priceIndex": {
        "all": 90.408,
        "goods": 93.778,
        "housing": 73.885,
        "servicesOther": 95.458,
        "utilities": 74.067
      },
      "resolutionNote": "Norman, OK uses Cleveland County as the computation county.",
      "shortName": "Norman",
      "state": "OK",
      "stateName": "Oklahoma",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12132,
      "cbsaCode": "17860",
      "cbsaName": "Columbia, MO",
      "confidence": "high",
      "countyFips": "29019",
      "countyName": "Boone County",
      "displayName": "Columbia, MO",
      "id": "PLACE:2915670",
      "lat": 38.94729,
      "lon": -92.326387,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1011,
      "placeGeoid": "2915670",
      "priceIndex": {
        "all": 89.438,
        "goods": 94.193,
        "housing": 69.248,
        "servicesOther": 93.026,
        "utilities": 85.966
      },
      "resolutionNote": "Columbia, MO uses Boone County as the computation county.",
      "shortName": "Columbia",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14880,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "medium",
      "countyFips": "48039",
      "countyName": "Brazoria County",
      "displayName": "Pearland, TX",
      "id": "PLACE:4856348",
      "lat": 29.555732,
      "lon": -95.323012,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1240,
      "placeGeoid": "4856348",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "Pearland, TX uses Brazoria County as the computation county. The city spans 3 county parts; the computation county has 89.1% of 2025 city population. Housing uses the dominant HUD FMR area (Brazoria County, TX HUD Metro FMR Area, 89.1% population share).",
      "shortName": "Pearland",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16260,
      "cbsaCode": "23420",
      "cbsaName": "Fresno, CA",
      "confidence": "high",
      "countyFips": "06019",
      "countyName": "Fresno County",
      "displayName": "Clovis, CA",
      "id": "PLACE:0614218",
      "lat": 36.827809,
      "lon": -119.681843,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1355,
      "placeGeoid": "0614218",
      "priceIndex": {
        "all": 102.158,
        "goods": 105.168,
        "housing": 95.725,
        "servicesOther": 100.267,
        "utilities": 161.01
      },
      "resolutionNote": "Clovis, CA uses Fresno County as the computation county.",
      "shortName": "Clovis",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19560,
      "cbsaCode": "16700",
      "cbsaName": "Charleston-North Charleston, SC",
      "confidence": "high",
      "countyFips": "45019",
      "countyName": "Charleston County",
      "displayName": "North Charleston, SC",
      "id": "PLACE:4550875",
      "lat": 32.917881,
      "lon": -80.065,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1630,
      "placeGeoid": "4550875",
      "priceIndex": {
        "all": 100.962,
        "goods": 96.339,
        "housing": 119.77,
        "servicesOther": 98.284,
        "utilities": 88.212
      },
      "resolutionNote": "North Charleston, SC uses Charleston County as the computation county. The city spans 3 county parts; the computation county has 75.1% of 2025 city population.",
      "shortName": "North Charleston",
      "state": "SC",
      "stateName": "South Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14196,
      "cbsaCode": "12020",
      "cbsaName": "Athens-Clarke County, GA",
      "confidence": "high",
      "countyFips": "13059",
      "countyName": "Clarke County",
      "displayName": "Athens-Clarke County, GA",
      "id": "PLACE:1303440",
      "lat": 33.949597,
      "lon": -83.370088,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1183,
      "placeGeoid": "1303440",
      "priceIndex": {
        "all": 93.343,
        "goods": 96.269,
        "housing": 76.759,
        "servicesOther": 98.667,
        "utilities": 89.257
      },
      "resolutionNote": "Athens-Clarke County, GA uses Clarke County as the computation county.",
      "shortName": "Athens-Clarke County",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12984,
      "cbsaCode": "17780",
      "cbsaName": "College Station-Bryan, TX",
      "confidence": "high",
      "countyFips": "48041",
      "countyName": "Brazos County",
      "displayName": "College Station, TX",
      "id": "PLACE:4815976",
      "lat": 30.58516,
      "lon": -96.29636,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1082,
      "placeGeoid": "4815976",
      "priceIndex": {
        "all": 90.951,
        "goods": 93.757,
        "housing": 75.088,
        "servicesOther": 96.24,
        "utilities": 84.39
      },
      "resolutionNote": "College Station, TX uses Brazos County as the computation county.",
      "shortName": "College Station",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22812,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12099",
      "countyName": "Palm Beach County",
      "displayName": "West Palm Beach, FL",
      "id": "PLACE:1276600",
      "lat": 26.745114,
      "lon": -80.127038,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1901,
      "placeGeoid": "1276600",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "West Palm Beach, FL uses Palm Beach County as the computation county.",
      "shortName": "West Palm Beach",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18156,
      "cbsaCode": "48900",
      "cbsaName": "Wilmington, NC",
      "confidence": "high",
      "countyFips": "37129",
      "countyName": "New Hanover County",
      "displayName": "Wilmington, NC",
      "id": "PLACE:3774440",
      "lat": 34.209225,
      "lon": -77.885767,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1513,
      "placeGeoid": "3774440",
      "priceIndex": {
        "all": 96.422,
        "goods": 96.621,
        "housing": 93.215,
        "servicesOther": 98.186,
        "utilities": 87.902
      },
      "resolutionNote": "Wilmington, NC uses New Hanover County as the computation county.",
      "shortName": "Wilmington",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16092,
      "cbsaCode": "10900",
      "cbsaName": "Allentown-Bethlehem-Easton, PA-NJ",
      "confidence": "low",
      "countyFips": "42077",
      "countyName": "Lehigh County",
      "displayName": "Allentown, PA",
      "id": "PLACE:4202000",
      "lat": 40.593648,
      "lon": -75.478393,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1341,
      "placeGeoid": "4202000",
      "priceIndex": {
        "all": 99.968,
        "goods": 100.569,
        "housing": 105.52,
        "servicesOther": 97.752,
        "utilities": 107.591
      },
      "resolutionNote": "Allentown, PA uses Lehigh County as the computation county. Pennsylvania local earned-income/local-services taxes outside Philadelphia are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Allentown",
      "state": "PA",
      "stateName": "Pennsylvania",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Pennsylvania local earned-income/local-services taxes outside Philadelphia are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 9840,
      "cbsaCode": "45820",
      "cbsaName": "Topeka, KS",
      "confidence": "high",
      "countyFips": "20177",
      "countyName": "Shawnee County",
      "displayName": "Topeka, KS",
      "id": "PLACE:2071000",
      "lat": 39.034673,
      "lon": -95.696191,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 820,
      "placeGeoid": "2071000",
      "priceIndex": {
        "all": 88.82,
        "goods": 94.027,
        "housing": 64.987,
        "servicesOther": 93.816,
        "utilities": 88.942
      },
      "resolutionNote": "Topeka, KS uses Shawnee County as the computation county.",
      "shortName": "Topeka",
      "state": "KS",
      "stateName": "Kansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14760,
      "cbsaCode": "29460",
      "cbsaName": "Lakeland-Winter Haven, FL",
      "confidence": "high",
      "countyFips": "12105",
      "countyName": "Polk County",
      "displayName": "Lakeland, FL",
      "id": "PLACE:1238250",
      "lat": 28.055496,
      "lon": -81.954772,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1230,
      "placeGeoid": "1238250",
      "priceIndex": {
        "all": 97.141,
        "goods": 96.24,
        "housing": 95.942,
        "servicesOther": 98.864,
        "utilities": 86.883
      },
      "resolutionNote": "Lakeland, FL uses Polk County as the computation county.",
      "shortName": "Lakeland",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Buckeye, AZ",
      "id": "PLACE:0407940",
      "lat": 33.431573,
      "lon": -112.641626,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0407940",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Buckeye, AZ uses Maricopa County as the computation county.",
      "shortName": "Buckeye",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Goodyear, AZ",
      "id": "PLACE:0428380",
      "lat": 33.254031,
      "lon": -112.366472,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0428380",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Goodyear, AZ uses Maricopa County as the computation county.",
      "shortName": "Goodyear",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11844,
      "cbsaCode": "46140",
      "cbsaName": "Tulsa, OK",
      "confidence": "high",
      "countyFips": "40143",
      "countyName": "Tulsa County",
      "displayName": "Broken Arrow, OK",
      "id": "PLACE:4009050",
      "lat": 36.036529,
      "lon": -95.780996,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 987,
      "placeGeoid": "4009050",
      "priceIndex": {
        "all": 89.214,
        "goods": 93.778,
        "housing": 68.235,
        "servicesOther": 95.458,
        "utilities": 73.856
      },
      "resolutionNote": "Broken Arrow, OK uses Tulsa County as the computation county. The city spans 2 county parts; the computation county has 81.4% of 2025 city population.",
      "shortName": "Broken Arrow",
      "state": "OK",
      "stateName": "Oklahoma",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27000,
      "cbsaCode": "37100",
      "cbsaName": "Oxnard-Thousand Oaks-Ventura, CA",
      "confidence": "high",
      "countyFips": "06111",
      "countyName": "Ventura County",
      "displayName": "Simi Valley, CA",
      "id": "PLACE:0672016",
      "lat": 34.266887,
      "lon": -118.748458,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2250,
      "placeGeoid": "0672016",
      "priceIndex": {
        "all": 110.534,
        "goods": 105.168,
        "housing": 171.096,
        "servicesOther": 100.267,
        "utilities": 152.925
      },
      "resolutionNote": "Simi Valley, CA uses Ventura County as the computation county.",
      "shortName": "Simi Valley",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14268,
      "cbsaCode": "40340",
      "cbsaName": "Rochester, MN",
      "confidence": "high",
      "countyFips": "27109",
      "countyName": "Olmsted County",
      "displayName": "Rochester, MN",
      "id": "PLACE:2754880",
      "lat": 44.014299,
      "lon": -92.478592,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1189,
      "placeGeoid": "2754880",
      "priceIndex": {
        "all": 90.821,
        "goods": 95.433,
        "housing": 78.628,
        "servicesOther": 92.193,
        "utilities": 87.389
      },
      "resolutionNote": "Rochester, MN uses Olmsted County as the computation county.",
      "shortName": "Rochester",
      "state": "MN",
      "stateName": "Minnesota",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10776,
      "cbsaCode": "29180",
      "cbsaName": "Lafayette, LA",
      "confidence": "high",
      "countyFips": "22055",
      "countyName": "Lafayette Parish",
      "displayName": "Lafayette, LA",
      "id": "PLACE:2240735",
      "lat": 30.2056,
      "lon": -92.028058,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 898,
      "placeGeoid": "2240735",
      "priceIndex": {
        "all": 87.209,
        "goods": 93.691,
        "housing": 58.845,
        "servicesOther": 95.705,
        "utilities": 71.215
      },
      "resolutionNote": "Lafayette, LA uses Lafayette Parish as the computation county.",
      "shortName": "Lafayette",
      "state": "LA",
      "stateName": "Louisiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20460,
      "cbsaCode": "46700",
      "cbsaName": "Vallejo, CA",
      "confidence": "high",
      "countyFips": "06095",
      "countyName": "Solano County",
      "displayName": "Vallejo, CA",
      "id": "PLACE:0681666",
      "lat": 38.106909,
      "lon": -122.262339,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1705,
      "placeGeoid": "0681666",
      "priceIndex": {
        "all": 108.479,
        "goods": 105.168,
        "housing": 142.042,
        "servicesOther": 100.267,
        "utilities": 154.993
      },
      "resolutionNote": "Vallejo, CA uses Solano County as the computation county.",
      "shortName": "Vallejo",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06013",
      "countyName": "Contra Costa County",
      "displayName": "Concord, CA",
      "id": "PLACE:0616000",
      "lat": 37.972184,
      "lon": -122.001587,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0616000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Concord, CA uses Contra Costa County as the computation county.",
      "shortName": "Concord",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08059",
      "countyName": "Jefferson County",
      "displayName": "Arvada, CO",
      "id": "PLACE:0803455",
      "lat": 39.833728,
      "lon": -105.150306,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0803455",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Arvada, CO uses Jefferson County as the computation county. The city spans 2 county parts; the computation county has 97.7% of 2025 city population.",
      "shortName": "Arvada",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15228,
      "cbsaCode": "36220",
      "cbsaName": "Odessa, TX",
      "confidence": "medium",
      "countyFips": "48135",
      "countyName": "Ector County",
      "displayName": "Odessa, TX",
      "id": "PLACE:4853388",
      "lat": 31.880461,
      "lon": -102.345314,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1269,
      "placeGeoid": "4853388",
      "priceIndex": {
        "all": 93.896,
        "goods": 93.757,
        "housing": 89.709,
        "servicesOther": 96.24,
        "utilities": 82.86
      },
      "resolutionNote": "Odessa, TX uses Ector County as the computation county. The city spans 2 county parts; the computation county has 96.5% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Odessa, TX MSA, 96.5% population share).",
      "shortName": "Odessa",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29712,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25017",
      "countyName": "Middlesex County",
      "displayName": "Cambridge, MA",
      "id": "PLACE:2511000",
      "lat": 42.376043,
      "lon": -71.11868,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2476,
      "placeGeoid": "2511000",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Cambridge, MA uses Middlesex County as the computation county.",
      "shortName": "Cambridge",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14124,
      "cbsaCode": "41700",
      "cbsaName": "San Antonio-New Braunfels, TX",
      "confidence": "high",
      "countyFips": "48091",
      "countyName": "Comal County",
      "displayName": "New Braunfels, TX",
      "id": "PLACE:4850820",
      "lat": 29.699306,
      "lon": -98.115127,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1177,
      "placeGeoid": "4850820",
      "priceIndex": {
        "all": 94.716,
        "goods": 93.757,
        "housing": 94.575,
        "servicesOther": 96.24,
        "utilities": 82.169
      },
      "resolutionNote": "New Braunfels, TX uses Comal County as the computation county. The city spans 2 county parts; the computation county has 77.6% of 2025 city population.",
      "shortName": "New Braunfels",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20460,
      "cbsaCode": "46700",
      "cbsaName": "Vallejo, CA",
      "confidence": "high",
      "countyFips": "06095",
      "countyName": "Solano County",
      "displayName": "Fairfield, CA",
      "id": "PLACE:0623182",
      "lat": 38.261965,
      "lon": -122.032389,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1705,
      "placeGeoid": "0623182",
      "priceIndex": {
        "all": 108.479,
        "goods": 105.168,
        "housing": 142.042,
        "servicesOther": 100.267,
        "utilities": 154.993
      },
      "resolutionNote": "Fairfield, CA uses Solano County as the computation county.",
      "shortName": "Fairfield",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16644,
      "cbsaCode": "11460",
      "cbsaName": "Ann Arbor, MI",
      "confidence": "low",
      "countyFips": "26161",
      "countyName": "Washtenaw County",
      "displayName": "Ann Arbor, MI",
      "id": "PLACE:2603000",
      "lat": 42.276147,
      "lon": -83.73086,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1387,
      "placeGeoid": "2603000",
      "priceIndex": {
        "all": 100.88,
        "goods": 93.711,
        "housing": 125.3,
        "servicesOther": 99.561,
        "utilities": 98.184
      },
      "resolutionNote": "Ann Arbor, MI uses Washtenaw County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Ann Arbor",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 27000,
      "cbsaCode": "37100",
      "cbsaName": "Oxnard-Thousand Oaks-Ventura, CA",
      "confidence": "high",
      "countyFips": "06111",
      "countyName": "Ventura County",
      "displayName": "Thousand Oaks, CA",
      "id": "PLACE:0678582",
      "lat": 34.19329,
      "lon": -118.874235,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2250,
      "placeGeoid": "0678582",
      "priceIndex": {
        "all": 110.534,
        "goods": 105.168,
        "housing": 171.096,
        "servicesOther": 100.267,
        "utilities": 152.925
      },
      "resolutionNote": "Thousand Oaks, CA uses Ventura County as the computation county.",
      "shortName": "Thousand Oaks",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17724,
      "cbsaCode": "25540",
      "cbsaName": "Hartford-West Hartford-East Hartford, CT",
      "confidence": "high",
      "countyFips": "09110",
      "countyName": "Capitol Planning Region",
      "displayName": "Hartford, CT",
      "id": "PLACE:0937000",
      "lat": 41.765933,
      "lon": -72.681579,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1477,
      "placeGeoid": "0937000",
      "priceIndex": {
        "all": 102.746,
        "goods": 97.33,
        "housing": 110.234,
        "servicesOther": 102.658,
        "utilities": 144.854
      },
      "resolutionNote": "Hartford, CT uses Capitol Planning Region as the computation county.",
      "shortName": "Hartford",
      "state": "CT",
      "stateName": "Connecticut",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06001",
      "countyName": "Alameda County",
      "displayName": "Berkeley, CA",
      "id": "PLACE:0606000",
      "lat": 37.865673,
      "lon": -122.298725,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0606000",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Berkeley, CA uses Alameda County as the computation county.",
      "shortName": "Berkeley",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "29095",
      "countyName": "Jackson County",
      "displayName": "Independence, MO",
      "id": "PLACE:2935000",
      "lat": 39.085469,
      "lon": -94.352082,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2935000",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Independence, MO uses Jackson County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Independence",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13308,
      "cbsaCode": "13740",
      "cbsaName": "Billings, MT",
      "confidence": "high",
      "countyFips": "30111",
      "countyName": "Yellowstone County",
      "displayName": "Billings, MT",
      "id": "PLACE:3006550",
      "lat": 45.788538,
      "lon": -108.552475,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1109,
      "placeGeoid": "3006550",
      "priceIndex": {
        "all": 93.526,
        "goods": 96.006,
        "housing": 77.364,
        "servicesOther": 98.715,
        "utilities": 72.437
      },
      "resolutionNote": "Billings, MT uses Yellowstone County as the computation county.",
      "shortName": "Billings",
      "state": "MT",
      "stateName": "Montana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14556,
      "cbsaCode": "24660",
      "cbsaName": "Greensboro-High Point, NC",
      "confidence": "medium",
      "countyFips": "37081",
      "countyName": "Guilford County",
      "displayName": "High Point, NC",
      "id": "PLACE:3731400",
      "lat": 35.990803,
      "lon": -79.992713,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1213,
      "placeGeoid": "3731400",
      "priceIndex": {
        "all": 92.865,
        "goods": 96.621,
        "housing": 74.519,
        "servicesOther": 98.186,
        "utilities": 89.065
      },
      "resolutionNote": "High Point, NC uses Guilford County as the computation county. The city spans 4 county parts; the computation county has 93.6% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Greensboro-High Point, NC HUD Metro FMR Area, 93.6% population share).",
      "shortName": "High Point",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16572,
      "cbsaCode": "14260",
      "cbsaName": "Boise City, ID",
      "confidence": "high",
      "countyFips": "16027",
      "countyName": "Canyon County",
      "displayName": "Nampa, ID",
      "id": "PLACE:1656260",
      "lat": 43.586441,
      "lon": -116.56389,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1381,
      "placeGeoid": "1656260",
      "priceIndex": {
        "all": 98.391,
        "goods": 96.179,
        "housing": 105.58,
        "servicesOther": 98.974,
        "utilities": 70.695
      },
      "resolutionNote": "Nampa, ID uses Canyon County as the computation county.",
      "shortName": "Nampa",
      "state": "ID",
      "stateName": "Idaho",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21504,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25017",
      "countyName": "Middlesex County",
      "displayName": "Lowell, MA",
      "id": "PLACE:2537000",
      "lat": 42.638995,
      "lon": -71.32102,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1792,
      "placeGeoid": "2537000",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Lowell, MA uses Middlesex County as the computation county.",
      "shortName": "Lowell",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15876,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "high",
      "countyFips": "48167",
      "countyName": "Galveston County",
      "displayName": "League City, TX",
      "id": "PLACE:4841980",
      "lat": 29.490064,
      "lon": -95.109093,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1323,
      "placeGeoid": "4841980",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "League City, TX uses Galveston County as the computation county. The city spans 2 county parts; the computation county has 97.8% of 2025 city population.",
      "shortName": "League City",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15876,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "high",
      "countyFips": "48339",
      "countyName": "Montgomery County",
      "displayName": "Conroe, TX",
      "id": "PLACE:4816432",
      "lat": 30.328717,
      "lon": -95.4846,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1323,
      "placeGeoid": "4816432",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "Conroe, TX uses Montgomery County as the computation county.",
      "shortName": "Conroe",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06013",
      "countyName": "Contra Costa County",
      "displayName": "Antioch, CA",
      "id": "PLACE:0602252",
      "lat": 37.978336,
      "lon": -121.796064,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0602252",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Antioch, CA uses Contra Costa County as the computation county.",
      "shortName": "Antioch",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Menifee, CA",
      "id": "PLACE:0646842",
      "lat": 33.689858,
      "lon": -117.184383,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0646842",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Menifee, CA uses Riverside County as the computation county.",
      "shortName": "Menifee",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48113",
      "countyName": "Dallas County",
      "displayName": "Richardson, TX",
      "id": "PLACE:4861796",
      "lat": 32.972291,
      "lon": -96.708069,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4861796",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Richardson, TX uses Dallas County as the computation county. The city spans 2 county parts; the computation county has 63.8% of 2025 city population.",
      "shortName": "Richardson",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Pompano Beach, FL",
      "id": "PLACE:1258050",
      "lat": 26.241622,
      "lon": -80.133851,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1258050",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Pompano Beach, FL uses Broward County as the computation county.",
      "shortName": "Pompano Beach",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11412,
      "cbsaCode": "29740",
      "cbsaName": "Las Cruces, NM",
      "confidence": "high",
      "countyFips": "35013",
      "countyName": "Do\u00f1a Ana County",
      "displayName": "Las Cruces, NM",
      "id": "PLACE:3539380",
      "lat": 32.326444,
      "lon": -106.789695,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 951,
      "placeGeoid": "3539380",
      "priceIndex": {
        "all": 90.212,
        "goods": 96.144,
        "housing": 62.982,
        "servicesOther": 98.54,
        "utilities": 77.918
      },
      "resolutionNote": "Las Cruces, NM uses Do\u00f1a Ana County as the computation county.",
      "shortName": "Las Cruces",
      "state": "NM",
      "stateName": "New Mexico",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18624,
      "cbsaCode": "31700",
      "cbsaName": "Manchester-Nashua, NH",
      "confidence": "high",
      "countyFips": "33011",
      "countyName": "Hillsborough County",
      "displayName": "Manchester, NH",
      "id": "PLACE:3345140",
      "lat": 42.984941,
      "lon": -71.444131,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1552,
      "placeGeoid": "3345140",
      "priceIndex": {
        "all": 105.657,
        "goods": 97.687,
        "housing": 134.22,
        "servicesOther": 103.687,
        "utilities": 133.535
      },
      "resolutionNote": "Manchester, NH uses Hillsborough County as the computation county.",
      "shortName": "Manchester",
      "state": "NH",
      "stateName": "New Hampshire",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17472,
      "cbsaCode": "41620",
      "cbsaName": "Salt Lake City-Murray, UT",
      "confidence": "high",
      "countyFips": "49035",
      "countyName": "Salt Lake County",
      "displayName": "West Jordan, UT",
      "id": "PLACE:4982950",
      "lat": 40.602666,
      "lon": -112.001255,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1456,
      "placeGeoid": "4982950",
      "priceIndex": {
        "all": 100.868,
        "goods": 96.446,
        "housing": 123.311,
        "servicesOther": 98.959,
        "utilities": 79.0
      },
      "resolutionNote": "West Jordan, UT uses Salt Lake County as the computation county.",
      "shortName": "West Jordan",
      "state": "UT",
      "stateName": "Utah",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08001",
      "countyName": "Adams County",
      "displayName": "Westminster, CO",
      "id": "PLACE:0883835",
      "lat": 39.880122,
      "lon": -105.061513,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0883835",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Westminster, CO uses Adams County as the computation county. The city spans 2 county parts; the computation county has 60.7% of 2025 city population.",
      "shortName": "Westminster",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10320,
      "cbsaCode": "21780",
      "cbsaName": "Evansville, IN",
      "confidence": "high",
      "countyFips": "18163",
      "countyName": "Vanderburgh County",
      "displayName": "Evansville, IN",
      "id": "PLACE:1822000",
      "lat": 37.987737,
      "lon": -87.534705,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 860,
      "placeGeoid": "1822000",
      "priceIndex": {
        "all": 91.528,
        "goods": 94.318,
        "housing": 66.735,
        "servicesOther": 99.141,
        "utilities": 86.717
      },
      "resolutionNote": "Evansville, IN uses Vanderburgh County as the computation county.",
      "shortName": "Evansville",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 17340,
      "cbsaCode": "47930",
      "cbsaName": "Waterbury-Shelton, CT",
      "confidence": "high",
      "countyFips": "09140",
      "countyName": "Naugatuck Valley Planning Region",
      "displayName": "Waterbury, CT",
      "id": "PLACE:0980000",
      "lat": 41.5585,
      "lon": -73.036685,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1445,
      "placeGeoid": "0980000",
      "priceIndex": {
        "all": 99.778,
        "goods": 97.33,
        "housing": 89.111,
        "servicesOther": 102.658,
        "utilities": 147.562
      },
      "resolutionNote": "Waterbury, CT uses Naugatuck Valley Planning Region as the computation county.",
      "shortName": "Waterbury",
      "state": "CT",
      "stateName": "Connecticut",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18972,
      "cbsaCode": "16980",
      "cbsaName": "Chicago-Naperville-Elgin, IL-IN",
      "confidence": "high",
      "countyFips": "17089",
      "countyName": "Kane County",
      "displayName": "Elgin, IL",
      "id": "PLACE:1723074",
      "lat": 42.038963,
      "lon": -88.325671,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1581,
      "placeGeoid": "1723074",
      "priceIndex": {
        "all": 103.595,
        "goods": 107.258,
        "housing": 112.01,
        "servicesOther": 100.492,
        "utilities": 83.581
      },
      "resolutionNote": "Elgin, IL uses Kane County as the computation county. The city spans 2 county parts; the computation county has 78.6% of 2025 city population.",
      "shortName": "Elgin",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14856,
      "cbsaCode": "24540",
      "cbsaName": "Greeley, CO",
      "confidence": "high",
      "countyFips": "08123",
      "countyName": "Weld County",
      "displayName": "Greeley, CO",
      "id": "PLACE:0832155",
      "lat": 40.414034,
      "lon": -104.771043,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1238,
      "placeGeoid": "0832155",
      "priceIndex": {
        "all": 100.176,
        "goods": 96.052,
        "housing": 112.599,
        "servicesOther": 99.822,
        "utilities": 81.997
      },
      "resolutionNote": "Greeley, CO uses Weld County as the computation county.",
      "shortName": "Greeley",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Temecula, CA",
      "id": "PLACE:0678120",
      "lat": 33.493073,
      "lon": -117.131734,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0678120",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Temecula, CA uses Riverside County as the computation county.",
      "shortName": "Temecula",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 28620,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06013",
      "countyName": "Contra Costa County",
      "displayName": "Richmond, CA",
      "id": "PLACE:0660620",
      "lat": 37.952278,
      "lon": -122.360609,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2385,
      "placeGeoid": "0660620",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Richmond, CA uses Contra Costa County as the computation county.",
      "shortName": "Richmond",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18456,
      "cbsaCode": "16740",
      "cbsaName": "Charlotte-Concord-Gastonia, NC-SC",
      "confidence": "high",
      "countyFips": "37025",
      "countyName": "Cabarrus County",
      "displayName": "Concord, NC",
      "id": "PLACE:3714100",
      "lat": 35.392094,
      "lon": -80.63551,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1538,
      "placeGeoid": "3714100",
      "priceIndex": {
        "all": 97.348,
        "goods": 96.58,
        "housing": 97.635,
        "servicesOther": 98.2,
        "utilities": 89.164
      },
      "resolutionNote": "Concord, NC uses Cabarrus County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Concord",
      "state": "NC",
      "stateName": "North Carolina",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15180,
      "cbsaCode": "39340",
      "cbsaName": "Provo-Orem-Lehi, UT",
      "confidence": "high",
      "countyFips": "49049",
      "countyName": "Utah County",
      "displayName": "Provo, UT",
      "id": "PLACE:4962470",
      "lat": 40.245312,
      "lon": -111.645057,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1265,
      "placeGeoid": "4962470",
      "priceIndex": {
        "all": 98.232,
        "goods": 96.446,
        "housing": 104.081,
        "servicesOther": 98.959,
        "utilities": 78.63
      },
      "resolutionNote": "Provo, UT uses Utah County as the computation county.",
      "shortName": "Provo",
      "state": "UT",
      "stateName": "Utah",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14220,
      "cbsaCode": "10740",
      "cbsaName": "Albuquerque, NM",
      "confidence": "high",
      "countyFips": "35043",
      "countyName": "Sandoval County",
      "displayName": "Rio Rancho, NM",
      "id": "PLACE:3563460",
      "lat": 35.28507,
      "lon": -106.698867,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1185,
      "placeGeoid": "3563460",
      "priceIndex": {
        "all": 95.546,
        "goods": 96.144,
        "housing": 89.153,
        "servicesOther": 98.54,
        "utilities": 77.852
      },
      "resolutionNote": "Rio Rancho, NM uses Sandoval County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Rio Rancho",
      "state": "NM",
      "stateName": "New Mexico",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20352,
      "cbsaCode": "45300",
      "cbsaName": "Tampa-St. Petersburg-Clearwater, FL",
      "confidence": "high",
      "countyFips": "12103",
      "countyName": "Pinellas County",
      "displayName": "Clearwater, FL",
      "id": "PLACE:1212875",
      "lat": 27.979419,
      "lon": -82.771256,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1696,
      "placeGeoid": "1212875",
      "priceIndex": {
        "all": 100.89,
        "goods": 95.47,
        "housing": 125.839,
        "servicesOther": 97.565,
        "utilities": 88.525
      },
      "resolutionNote": "Clearwater, FL uses Pinellas County as the computation county.",
      "shortName": "Clearwater",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11664,
      "cbsaCode": "46220",
      "cbsaName": "Tuscaloosa, AL",
      "confidence": "high",
      "countyFips": "01125",
      "countyName": "Tuscaloosa County",
      "displayName": "Tuscaloosa, AL",
      "id": "PLACE:0177256",
      "lat": 33.234404,
      "lon": -87.5283,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 972,
      "placeGeoid": "0177256",
      "priceIndex": {
        "all": 87.722,
        "goods": 96.397,
        "housing": 58.246,
        "servicesOther": 96.693,
        "utilities": 84.396
      },
      "resolutionNote": "Tuscaloosa, AL uses Tuscaloosa County as the computation county.",
      "shortName": "Tuscaloosa",
      "state": "AL",
      "stateName": "Alabama",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Murrieta, CA",
      "id": "PLACE:0650076",
      "lat": 33.573214,
      "lon": -117.191007,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0650076",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Murrieta, CA uses Riverside County as the computation county.",
      "shortName": "Murrieta",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12144,
      "cbsaCode": "29620",
      "cbsaName": "Lansing-East Lansing, MI",
      "confidence": "low",
      "countyFips": "26065",
      "countyName": "Ingham County",
      "displayName": "Lansing, MI",
      "id": "PLACE:2646000",
      "lat": 42.714341,
      "lon": -84.560889,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1012,
      "placeGeoid": "2646000",
      "priceIndex": {
        "all": 94.991,
        "goods": 93.711,
        "housing": 83.472,
        "servicesOther": 99.561,
        "utilities": 95.519
      },
      "resolutionNote": "Lansing, MI uses Ingham County as the computation county. The city spans 3 county parts; the computation county has 95.5% of 2025 city population. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Lansing",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 13068,
      "cbsaCode": "46340",
      "cbsaName": "Tyler, TX",
      "confidence": "high",
      "countyFips": "48423",
      "countyName": "Smith County",
      "displayName": "Tyler, TX",
      "id": "PLACE:4874144",
      "lat": 32.317334,
      "lon": -95.306399,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1089,
      "placeGeoid": "4874144",
      "priceIndex": {
        "all": 92.156,
        "goods": 93.757,
        "housing": 79.911,
        "servicesOther": 96.24,
        "utilities": 82.904
      },
      "resolutionNote": "Tyler, TX uses Smith County as the computation county.",
      "shortName": "Tyler",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 23940,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12086",
      "countyName": "Miami-Dade County",
      "displayName": "Miami Gardens, FL",
      "id": "PLACE:1245060",
      "lat": 25.948892,
      "lon": -80.243585,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1995,
      "placeGeoid": "1245060",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Miami Gardens, FL uses Miami-Dade County as the computation county.",
      "shortName": "Miami Gardens",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25752,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53061",
      "countyName": "Snohomish County",
      "displayName": "Everett, WA",
      "id": "PLACE:5322640",
      "lat": 47.965413,
      "lon": -122.189895,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5322640",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Everett, WA uses Snohomish County as the computation county.",
      "shortName": "Everett",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19776,
      "cbsaCode": "19100",
      "cbsaName": "Dallas-Fort Worth-Arlington, TX",
      "confidence": "high",
      "countyFips": "48085",
      "countyName": "Collin County",
      "displayName": "Allen, TX",
      "id": "PLACE:4801924",
      "lat": 33.107224,
      "lon": -96.674676,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1648,
      "placeGeoid": "4801924",
      "priceIndex": {
        "all": 103.09,
        "goods": 102.838,
        "housing": 117.874,
        "servicesOther": 99.673,
        "utilities": 90.711
      },
      "resolutionNote": "Allen, TX uses Collin County as the computation county.",
      "shortName": "Allen",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11640,
      "cbsaCode": "44100",
      "cbsaName": "Springfield, IL",
      "confidence": "high",
      "countyFips": "17167",
      "countyName": "Sangamon County",
      "displayName": "Springfield, IL",
      "id": "PLACE:1772000",
      "lat": 39.791063,
      "lon": -89.644572,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 970,
      "placeGeoid": "1772000",
      "priceIndex": {
        "all": 92.745,
        "goods": 93.643,
        "housing": 71.616,
        "servicesOther": 99.59,
        "utilities": 90.406
      },
      "resolutionNote": "Springfield, IL uses Sangamon County as the computation county.",
      "shortName": "Springfield",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10776,
      "cbsaCode": "13140",
      "cbsaName": "Beaumont-Port Arthur, TX",
      "confidence": "high",
      "countyFips": "48245",
      "countyName": "Jefferson County",
      "displayName": "Beaumont, TX",
      "id": "PLACE:4807000",
      "lat": 30.084912,
      "lon": -94.14533,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 898,
      "placeGeoid": "4807000",
      "priceIndex": {
        "all": 90.046,
        "goods": 93.757,
        "housing": 70.939,
        "servicesOther": 96.24,
        "utilities": 83.098
      },
      "resolutionNote": "Beaumont, TX uses Jefferson County as the computation county.",
      "shortName": "Beaumont",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19920,
      "cbsaCode": "12060",
      "cbsaName": "Atlanta-Sandy Springs-Roswell, GA",
      "confidence": "high",
      "countyFips": "13121",
      "countyName": "Fulton County",
      "displayName": "South Fulton, GA",
      "id": "PLACE:1372122",
      "lat": 33.63572,
      "lon": -84.583417,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1660,
      "placeGeoid": "1372122",
      "priceIndex": {
        "all": 100.058,
        "goods": 100.416,
        "housing": 111.022,
        "servicesOther": 96.701,
        "utilities": 96.239
      },
      "resolutionNote": "South Fulton, GA uses Fulton County as the computation county.",
      "shortName": "South Fulton",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "Carlsbad, CA",
      "id": "PLACE:0611194",
      "lat": 33.129284,
      "lon": -117.284183,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0611194",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "Carlsbad, CA uses San Diego County as the computation county.",
      "shortName": "Carlsbad",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17868,
      "cbsaCode": "39900",
      "cbsaName": "Reno, NV",
      "confidence": "high",
      "countyFips": "32031",
      "countyName": "Washoe County",
      "displayName": "Sparks, NV",
      "id": "PLACE:3268400",
      "lat": 39.574341,
      "lon": -119.715154,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1489,
      "placeGeoid": "3268400",
      "priceIndex": {
        "all": 101.014,
        "goods": 96.271,
        "housing": 123.478,
        "servicesOther": 98.744,
        "utilities": 89.274
      },
      "resolutionNote": "Sparks, NV uses Washoe County as the computation county.",
      "shortName": "Sparks",
      "state": "NV",
      "stateName": "Nevada",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20124,
      "cbsaCode": "38900",
      "cbsaName": "Portland-Vancouver-Hillsboro, OR-WA",
      "confidence": "low",
      "countyFips": "41051",
      "countyName": "Multnomah County",
      "displayName": "Gresham, OR",
      "id": "PLACE:4131250",
      "lat": 45.502319,
      "lon": -122.441609,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1677,
      "placeGeoid": "4131250",
      "priceIndex": {
        "all": 105.421,
        "goods": 105.222,
        "housing": 125.114,
        "servicesOther": 100.136,
        "utilities": 106.974
      },
      "resolutionNote": "Gresham, OR uses Multnomah County as the computation county. Portland-area Metro/Multnomah local personal taxes are only partially modeled; Multnomah PFA may be modeled by county, but Metro SHS is not confirmed in PolicyEngine 1.729.0.",
      "shortName": "Gresham",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Portland-area Metro/Multnomah local personal taxes are only partially modeled; Multnomah PFA may be modeled by county, but Metro SHS is not confirmed in PolicyEngine 1.729.0."
      ]
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "42200",
      "cbsaName": "Santa Maria-Santa Barbara, CA",
      "confidence": "high",
      "countyFips": "06083",
      "countyName": "Santa Barbara County",
      "displayName": "Santa Maria, CA",
      "id": "PLACE:0669196",
      "lat": 34.933076,
      "lon": -120.443559,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0669196",
      "priceIndex": {
        "all": 108.798,
        "goods": 105.168,
        "housing": 151.394,
        "servicesOther": 100.267,
        "utilities": 149.807
      },
      "resolutionNote": "Santa Maria, CA uses Santa Barbara County as the computation county.",
      "shortName": "Santa Maria",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20124,
      "cbsaCode": "38900",
      "cbsaName": "Portland-Vancouver-Hillsboro, OR-WA",
      "confidence": "high",
      "countyFips": "41067",
      "countyName": "Washington County",
      "displayName": "Hillsboro, OR",
      "id": "PLACE:4134100",
      "lat": 45.526798,
      "lon": -122.935395,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1677,
      "placeGeoid": "4134100",
      "priceIndex": {
        "all": 105.421,
        "goods": 105.222,
        "housing": 125.114,
        "servicesOther": 100.136,
        "utilities": 106.974
      },
      "resolutionNote": "Hillsboro, OR uses Washington County as the computation county.",
      "shortName": "Hillsboro",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 9816,
      "cbsaCode": "37900",
      "cbsaName": "Peoria, IL",
      "confidence": "high",
      "countyFips": "17143",
      "countyName": "Peoria County",
      "displayName": "Peoria, IL",
      "id": "PLACE:1759000",
      "lat": 40.751641,
      "lon": -89.617198,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 818,
      "placeGeoid": "1759000",
      "priceIndex": {
        "all": 91.231,
        "goods": 93.643,
        "housing": 63.763,
        "servicesOther": 99.59,
        "utilities": 90.504
      },
      "resolutionNote": "Peoria, IL uses Peoria County as the computation county.",
      "shortName": "Peoria",
      "state": "IL",
      "stateName": "Illinois",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22800,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12011",
      "countyName": "Broward County",
      "displayName": "Davie, FL",
      "id": "PLACE:1216475",
      "lat": 26.079169,
      "lon": -80.283013,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1900,
      "placeGeoid": "1216475",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Davie, FL uses Broward County as the computation county.",
      "shortName": "Davie",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 10164,
      "cbsaCode": "32580",
      "cbsaName": "McAllen-Edinburg-Mission, TX",
      "confidence": "high",
      "countyFips": "48215",
      "countyName": "Hidalgo County",
      "displayName": "Edinburg, TX",
      "id": "PLACE:4822660",
      "lat": 26.318374,
      "lon": -98.15348,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 847,
      "placeGeoid": "4822660",
      "priceIndex": {
        "all": 85.895,
        "goods": 93.757,
        "housing": 55.892,
        "servicesOther": 96.24,
        "utilities": 81.186
      },
      "resolutionNote": "Edinburg, TX uses Hidalgo County as the computation county.",
      "shortName": "Edinburg",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11604,
      "cbsaCode": "39380",
      "cbsaName": "Pueblo, CO",
      "confidence": "high",
      "countyFips": "08101",
      "countyName": "Pueblo County",
      "displayName": "Pueblo, CO",
      "id": "PLACE:0862000",
      "lat": 38.269228,
      "lon": -104.610816,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 967,
      "placeGeoid": "0862000",
      "priceIndex": {
        "all": 91.762,
        "goods": 96.052,
        "housing": 71.285,
        "servicesOther": 99.822,
        "utilities": 81.933
      },
      "resolutionNote": "Pueblo, CO uses Pueblo County as the computation county.",
      "shortName": "Pueblo",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27000,
      "cbsaCode": "37100",
      "cbsaName": "Oxnard-Thousand Oaks-Ventura, CA",
      "confidence": "high",
      "countyFips": "06111",
      "countyName": "Ventura County",
      "displayName": "San Buenaventura (Ventura), CA",
      "id": "PLACE:0665042",
      "lat": 34.26778,
      "lon": -119.254206,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2250,
      "placeGeoid": "0665042",
      "priceIndex": {
        "all": 110.534,
        "goods": 105.168,
        "housing": 171.096,
        "servicesOther": 100.267,
        "utilities": 152.925
      },
      "resolutionNote": "San Buenaventura (Ventura), CA uses Ventura County as the computation county.",
      "shortName": "San Buenaventura (Ventura)",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17196,
      "cbsaCode": "19660",
      "cbsaName": "Deltona-Daytona Beach-Ormond Beach, FL",
      "confidence": "high",
      "countyFips": "12035",
      "countyName": "Flagler County",
      "displayName": "Palm Coast, FL",
      "id": "PLACE:1254200",
      "lat": 29.536837,
      "lon": -81.242627,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1433,
      "placeGeoid": "1254200",
      "priceIndex": {
        "all": 99.367,
        "goods": 96.24,
        "housing": 108.375,
        "servicesOther": 98.864,
        "utilities": 87.566
      },
      "resolutionNote": "Palm Coast, FL uses Flagler County as the computation county.",
      "shortName": "Palm Coast",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 32952,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06059",
      "countyName": "Orange County",
      "displayName": "Costa Mesa, CA",
      "id": "PLACE:0616532",
      "lat": 33.665905,
      "lon": -117.912336,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2746,
      "placeGeoid": "0616532",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Costa Mesa, CA uses Orange County as the computation county.",
      "shortName": "Costa Mesa",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14616,
      "cbsaCode": "41100",
      "cbsaName": "St. George, UT",
      "confidence": "high",
      "countyFips": "49053",
      "countyName": "Washington County",
      "displayName": "St. George, UT",
      "id": "PLACE:4965330",
      "lat": 37.077006,
      "lon": -113.576534,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1218,
      "placeGeoid": "4965330",
      "priceIndex": {
        "all": 97.321,
        "goods": 96.446,
        "housing": 98.148,
        "servicesOther": 98.959,
        "utilities": 77.69
      },
      "resolutionNote": "St. George, UT uses Washington County as the computation county.",
      "shortName": "St. George",
      "state": "UT",
      "stateName": "Utah",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21048,
      "cbsaCode": "19740",
      "cbsaName": "Denver-Aurora-Centennial, CO",
      "confidence": "high",
      "countyFips": "08005",
      "countyName": "Arapahoe County",
      "displayName": "Centennial, CO",
      "id": "PLACE:0812815",
      "lat": 39.590856,
      "lon": -104.863754,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1754,
      "placeGeoid": "0812815",
      "priceIndex": {
        "all": 105.782,
        "goods": 100.957,
        "housing": 146.919,
        "servicesOther": 99.448,
        "utilities": 87.856
      },
      "resolutionNote": "Centennial, CO uses Arapahoe County as the computation county.",
      "shortName": "Centennial",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Downey, CA",
      "id": "PLACE:0619766",
      "lat": 33.938237,
      "lon": -118.130856,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0619766",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Downey, CA uses Los Angeles County as the computation county.",
      "shortName": "Downey",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14316,
      "cbsaCode": "44060",
      "cbsaName": "Spokane-Spokane Valley, WA",
      "confidence": "high",
      "countyFips": "53063",
      "countyName": "Spokane County",
      "displayName": "Spokane Valley, WA",
      "id": "PLACE:5367167",
      "lat": 47.663353,
      "lon": -117.23278,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1193,
      "placeGeoid": "5367167",
      "priceIndex": {
        "all": 100.346,
        "goods": 105.028,
        "housing": 97.059,
        "servicesOther": 99.472,
        "utilities": 91.196
      },
      "resolutionNote": "Spokane Valley, WA uses Spokane County as the computation county.",
      "shortName": "Spokane Valley",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15876,
      "cbsaCode": "26420",
      "cbsaName": "Houston-Pasadena-The Woodlands, TX",
      "confidence": "high",
      "countyFips": "48157",
      "countyName": "Fort Bend County",
      "displayName": "Sugar Land, TX",
      "id": "PLACE:4870808",
      "lat": 29.592764,
      "lon": -95.633801,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1323,
      "placeGeoid": "4870808",
      "priceIndex": {
        "all": 98.629,
        "goods": 100.639,
        "housing": 104.51,
        "servicesOther": 95.595,
        "utilities": 95.288
      },
      "resolutionNote": "Sugar Land, TX uses Fort Bend County as the computation county.",
      "shortName": "Sugar Land",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14364,
      "cbsaCode": "28140",
      "cbsaName": "Kansas City, MO-KS",
      "confidence": "high",
      "countyFips": "29095",
      "countyName": "Jackson County",
      "displayName": "Lee's Summit, MO",
      "id": "PLACE:2941348",
      "lat": 38.921601,
      "lon": -94.384763,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1197,
      "placeGeoid": "2941348",
      "priceIndex": {
        "all": 92.543,
        "goods": 94.12,
        "housing": 86.642,
        "servicesOther": 93.373,
        "utilities": 89.034
      },
      "resolutionNote": "Lee's Summit, MO uses Jackson County as the computation county. The city spans 2 county parts; the computation county has 97.4% of 2025 city population.",
      "shortName": "Lee's Summit",
      "state": "MO",
      "stateName": "Missouri",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16452,
      "cbsaCode": "13460",
      "cbsaName": "Bend, OR",
      "confidence": "high",
      "countyFips": "41017",
      "countyName": "Deschutes County",
      "displayName": "Bend, OR",
      "id": "PLACE:4105800",
      "lat": 44.056683,
      "lon": -121.307991,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1371,
      "placeGeoid": "4105800",
      "priceIndex": {
        "all": 103.607,
        "goods": 105.261,
        "housing": 109.958,
        "servicesOther": 100.298,
        "utilities": 104.992
      },
      "resolutionNote": "Bend, OR uses Deschutes County as the computation county.",
      "shortName": "Bend",
      "state": "OR",
      "stateName": "Oregon",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06065",
      "countyName": "Riverside County",
      "displayName": "Jurupa Valley, CA",
      "id": "PLACE:0637692",
      "lat": 34.002591,
      "lon": -117.467612,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0637692",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Jurupa Valley, CA uses Riverside County as the computation county.",
      "shortName": "Jurupa Valley",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18744,
      "cbsaCode": "12420",
      "cbsaName": "Austin-Round Rock-San Marcos, TX",
      "confidence": "high",
      "countyFips": "48491",
      "countyName": "Williamson County",
      "displayName": "Georgetown, TX",
      "id": "PLACE:4829336",
      "lat": 30.668136,
      "lon": -97.698744,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1562,
      "placeGeoid": "4829336",
      "priceIndex": {
        "all": 98.066,
        "goods": 93.757,
        "housing": 120.361,
        "servicesOther": 96.24,
        "utilities": 82.044
      },
      "resolutionNote": "Georgetown, TX uses Williamson County as the computation county.",
      "shortName": "Georgetown",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11172,
      "cbsaCode": "24580",
      "cbsaName": "Green Bay, WI",
      "confidence": "high",
      "countyFips": "55009",
      "countyName": "Brown County",
      "displayName": "Green Bay, WI",
      "id": "PLACE:5531000",
      "lat": 44.521542,
      "lon": -87.986568,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 931,
      "placeGeoid": "5531000",
      "priceIndex": {
        "all": 93.086,
        "goods": 93.787,
        "housing": 74.696,
        "servicesOther": 99.411,
        "utilities": 90.041
      },
      "resolutionNote": "Green Bay, WI uses Brown County as the computation county.",
      "shortName": "Green Bay",
      "state": "WI",
      "stateName": "Wisconsin",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13380,
      "cbsaCode": "22220",
      "cbsaName": "Fayetteville-Springdale-Rogers, AR",
      "confidence": "high",
      "countyFips": "05143",
      "countyName": "Washington County",
      "displayName": "Fayetteville, AR",
      "id": "PLACE:0523290",
      "lat": 36.071455,
      "lon": -94.166564,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1115,
      "placeGeoid": "0523290",
      "priceIndex": {
        "all": 91.353,
        "goods": 93.577,
        "housing": 76.886,
        "servicesOther": 95.295,
        "utilities": 75.109
      },
      "resolutionNote": "Fayetteville, AR uses Washington County as the computation county.",
      "shortName": "Fayetteville",
      "state": "AR",
      "stateName": "Arkansas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Rialto, CA",
      "id": "PLACE:0660466",
      "lat": 34.117427,
      "lon": -117.389211,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0660466",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Rialto, CA uses San Bernardino County as the computation county.",
      "shortName": "Rialto",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21132,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25023",
      "countyName": "Plymouth County",
      "displayName": "Brockton, MA",
      "id": "PLACE:2509000",
      "lat": 42.082543,
      "lon": -71.024638,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1761,
      "placeGeoid": "2509000",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Brockton, MA uses Plymouth County as the computation county.",
      "shortName": "Brockton",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21540,
      "cbsaCode": "14500",
      "cbsaName": "Boulder, CO",
      "confidence": "high",
      "countyFips": "08013",
      "countyName": "Boulder County",
      "displayName": "Boulder, CO",
      "id": "PLACE:0807850",
      "lat": 40.024431,
      "lon": -105.251251,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1795,
      "placeGeoid": "0807850",
      "priceIndex": {
        "all": 105.202,
        "goods": 96.052,
        "housing": 157.02,
        "servicesOther": 99.822,
        "utilities": 82.741
      },
      "resolutionNote": "Boulder, CO uses Boulder County as the computation county.",
      "shortName": "Boulder",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15204,
      "cbsaCode": "26900",
      "cbsaName": "Indianapolis-Carmel-Greenwood, IN",
      "confidence": "high",
      "countyFips": "18057",
      "countyName": "Hamilton County",
      "displayName": "Carmel, IN",
      "id": "PLACE:1810342",
      "lat": 39.965479,
      "lon": -86.148369,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1267,
      "placeGeoid": "1810342",
      "priceIndex": {
        "all": 95.696,
        "goods": 94.318,
        "housing": 88.917,
        "servicesOther": 99.141,
        "utilities": 86.358
      },
      "resolutionNote": "Carmel, IN uses Hamilton County as the computation county.",
      "shortName": "Carmel",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 13464,
      "cbsaCode": "19820",
      "cbsaName": "Detroit-Warren-Dearborn, MI",
      "confidence": "low",
      "countyFips": "26163",
      "countyName": "Wayne County",
      "displayName": "Dearborn, MI",
      "id": "PLACE:2621000",
      "lat": 42.313057,
      "lon": -83.211488,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1122,
      "placeGeoid": "2621000",
      "priceIndex": {
        "all": 100.298,
        "goods": 98.817,
        "housing": 94.69,
        "servicesOther": 102.591,
        "utilities": 106.988
      },
      "resolutionNote": "Dearborn, MI uses Wayne County as the computation county. Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
      "shortName": "Dearborn",
      "state": "MI",
      "stateName": "Michigan",
      "taxCoverageStatus": "partial_local_missing",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline."
      ]
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "West Covina, CA",
      "id": "PLACE:0684200",
      "lat": 34.055941,
      "lon": -117.909937,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0684200",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "West Covina, CA uses Los Angeles County as the computation county.",
      "shortName": "West Covina",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12636,
      "cbsaCode": "49740",
      "cbsaName": "Yuma, AZ",
      "confidence": "high",
      "countyFips": "04027",
      "countyName": "Yuma County",
      "displayName": "Yuma, AZ",
      "id": "PLACE:0485540",
      "lat": 32.516286,
      "lon": -114.521782,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1053,
      "placeGeoid": "0485540",
      "priceIndex": {
        "all": 92.706,
        "goods": 96.237,
        "housing": 73.776,
        "servicesOther": 99.838,
        "utilities": 87.834
      },
      "resolutionNote": "Yuma, AZ uses Yuma County as the computation county.",
      "shortName": "Yuma",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15240,
      "cbsaCode": "17020",
      "cbsaName": "Chico, CA",
      "confidence": "high",
      "countyFips": "06007",
      "countyName": "Butte County",
      "displayName": "Chico, CA",
      "id": "PLACE:0613014",
      "lat": 39.758951,
      "lon": -121.81772,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1270,
      "placeGeoid": "0613014",
      "priceIndex": {
        "all": 101.197,
        "goods": 105.168,
        "housing": 91.946,
        "servicesOther": 100.267,
        "utilities": 158.837
      },
      "resolutionNote": "Chico, CA uses Butte County as the computation county.",
      "shortName": "Chico",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "El Monte, CA",
      "id": "PLACE:0622230",
      "lat": 34.074633,
      "lon": -118.029136,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0622230",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "El Monte, CA uses Los Angeles County as the computation county.",
      "shortName": "El Monte",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19920,
      "cbsaCode": "12060",
      "cbsaName": "Atlanta-Sandy Springs-Roswell, GA",
      "confidence": "high",
      "countyFips": "13121",
      "countyName": "Fulton County",
      "displayName": "Sandy Springs, GA",
      "id": "PLACE:1368516",
      "lat": 33.931501,
      "lon": -84.368886,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1660,
      "placeGeoid": "1368516",
      "priceIndex": {
        "all": 100.058,
        "goods": 100.416,
        "housing": 111.022,
        "servicesOther": 96.701,
        "utilities": 96.239
      },
      "resolutionNote": "Sandy Springs, GA uses Fulton County as the computation county.",
      "shortName": "Sandy Springs",
      "state": "GA",
      "stateName": "Georgia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 25752,
      "cbsaCode": "42660",
      "cbsaName": "Seattle-Tacoma-Bellevue, WA",
      "confidence": "high",
      "countyFips": "53033",
      "countyName": "King County",
      "displayName": "Renton, WA",
      "id": "PLACE:5357745",
      "lat": 47.47919,
      "lon": -122.194613,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2146,
      "placeGeoid": "5357745",
      "priceIndex": {
        "all": 111.133,
        "goods": 103.972,
        "housing": 151.314,
        "servicesOther": 106.835,
        "utilities": 92.814
      },
      "resolutionNote": "Renton, WA uses King County as the computation county.",
      "shortName": "Renton",
      "state": "WA",
      "stateName": "Washington",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 15204,
      "cbsaCode": "26900",
      "cbsaName": "Indianapolis-Carmel-Greenwood, IN",
      "confidence": "high",
      "countyFips": "18057",
      "countyName": "Hamilton County",
      "displayName": "Fishers, IN",
      "id": "PLACE:1823278",
      "lat": 39.96183,
      "lon": -85.968364,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1267,
      "placeGeoid": "1823278",
      "priceIndex": {
        "all": 95.696,
        "goods": 94.318,
        "housing": 88.917,
        "servicesOther": 99.141,
        "utilities": 86.358
      },
      "resolutionNote": "Fishers, IN uses Hamilton County as the computation county.",
      "shortName": "Fishers",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 18144,
      "cbsaCode": "47260",
      "cbsaName": "Virginia Beach-Chesapeake-Norfolk, VA-NC",
      "confidence": "high",
      "countyFips": "51800",
      "countyName": "Suffolk city",
      "displayName": "Suffolk, VA",
      "id": "PLACE:5176432",
      "lat": 36.697157,
      "lon": -76.634781,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1512,
      "placeGeoid": "5176432",
      "priceIndex": {
        "all": 97.941,
        "goods": 96.767,
        "housing": 99.805,
        "servicesOther": 98.599,
        "utilities": 89.579
      },
      "resolutionNote": "Suffolk, VA uses Suffolk city as the computation county.",
      "shortName": "Suffolk",
      "state": "VA",
      "stateName": "Virginia",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29712,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25009",
      "countyName": "Essex County",
      "displayName": "Lynn, MA",
      "id": "PLACE:2537490",
      "lat": 42.474762,
      "lon": -70.96203,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2476,
      "placeGeoid": "2537490",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Lynn, MA uses Essex County as the computation county.",
      "shortName": "Lynn",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 20460,
      "cbsaCode": "46700",
      "cbsaName": "Vallejo, CA",
      "confidence": "high",
      "countyFips": "06095",
      "countyName": "Solano County",
      "displayName": "Vacaville, CA",
      "id": "PLACE:0681554",
      "lat": 38.358621,
      "lon": -121.968601,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1705,
      "placeGeoid": "0681554",
      "priceIndex": {
        "all": 108.479,
        "goods": 105.168,
        "housing": 142.042,
        "servicesOther": 100.267,
        "utilities": 154.993
      },
      "resolutionNote": "Vacaville, CA uses Solano County as the computation county.",
      "shortName": "Vacaville",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 35724,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06081",
      "countyName": "San Mateo County",
      "displayName": "San Mateo, CA",
      "id": "PLACE:0668252",
      "lat": 37.56031,
      "lon": -122.3106,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2977,
      "placeGeoid": "0668252",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "San Mateo, CA uses San Mateo County as the computation county.",
      "shortName": "San Mateo",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 13260,
      "cbsaCode": "43780",
      "cbsaName": "South Bend-Mishawaka, IN-MI",
      "confidence": "high",
      "countyFips": "18141",
      "countyName": "St. Joseph County",
      "displayName": "South Bend, IN",
      "id": "PLACE:1871000",
      "lat": 41.676643,
      "lon": -86.268809,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1105,
      "placeGeoid": "1871000",
      "priceIndex": {
        "all": 92.858,
        "goods": 94.221,
        "housing": 74.586,
        "servicesOther": 99.213,
        "utilities": 87.733
      },
      "resolutionNote": "South Bend, IN uses St. Joseph County as the computation county.",
      "shortName": "South Bend",
      "state": "IN",
      "stateName": "Indiana",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": [
        "Indiana county income tax is modeled by PolicyEngine from county_fips."
      ]
    },
    {
      "annualRent1Br": 29712,
      "cbsaCode": "14460",
      "cbsaName": "Boston-Cambridge-Newton, MA-NH",
      "confidence": "high",
      "countyFips": "25021",
      "countyName": "Norfolk County",
      "displayName": "Quincy, MA",
      "id": "PLACE:2555745",
      "lat": 42.261006,
      "lon": -71.008988,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2476,
      "placeGeoid": "2555745",
      "priceIndex": {
        "all": 108.266,
        "goods": 99.651,
        "housing": 148.424,
        "servicesOther": 103.603,
        "utilities": 148.768
      },
      "resolutionNote": "Quincy, MA uses Norfolk County as the computation county.",
      "shortName": "Quincy",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Burbank, CA",
      "id": "PLACE:0608954",
      "lat": 34.190079,
      "lon": -118.326405,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0608954",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Burbank, CA uses Los Angeles County as the computation county.",
      "shortName": "Burbank",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21324,
      "cbsaCode": "40140",
      "cbsaName": "Riverside-San Bernardino-Ontario, CA",
      "confidence": "high",
      "countyFips": "06071",
      "countyName": "San Bernardino County",
      "displayName": "Hesperia, CA",
      "id": "PLACE:0633434",
      "lat": 34.397038,
      "lon": -117.315198,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1777,
      "placeGeoid": "0633434",
      "priceIndex": {
        "all": 106.442,
        "goods": 101.431,
        "housing": 129.312,
        "servicesOther": 101.281,
        "utilities": 148.641
      },
      "resolutionNote": "Hesperia, CA uses San Bernardino County as the computation county.",
      "shortName": "Hesperia",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11100,
      "cbsaCode": "48660",
      "cbsaName": "Wichita Falls, TX",
      "confidence": "high",
      "countyFips": "48485",
      "countyName": "Wichita County",
      "displayName": "Wichita Falls, TX",
      "id": "PLACE:4879000",
      "lat": 33.906654,
      "lon": -98.525848,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 925,
      "placeGeoid": "4879000",
      "priceIndex": {
        "all": 89.513,
        "goods": 93.757,
        "housing": 68.208,
        "servicesOther": 96.24,
        "utilities": 84.092
      },
      "resolutionNote": "Wichita Falls, TX uses Wichita County as the computation county. The city spans 2 county parts; the computation county has 100.0% of 2025 city population.",
      "shortName": "Wichita Falls",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16740,
      "cbsaCode": "44700",
      "cbsaName": "Stockton-Lodi, CA",
      "confidence": "high",
      "countyFips": "06077",
      "countyName": "San Joaquin County",
      "displayName": "Tracy, CA",
      "id": "PLACE:0680238",
      "lat": 37.727396,
      "lon": -121.452195,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1395,
      "placeGeoid": "0680238",
      "priceIndex": {
        "all": 105.089,
        "goods": 105.168,
        "housing": 115.614,
        "servicesOther": 100.267,
        "utilities": 158.247
      },
      "resolutionNote": "Tracy, CA uses San Joaquin County as the computation county.",
      "shortName": "Tracy",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 14760,
      "cbsaCode": "39300",
      "cbsaName": "Providence-Warwick, RI-MA",
      "confidence": "high",
      "countyFips": "25005",
      "countyName": "Bristol County",
      "displayName": "New Bedford, MA",
      "id": "PLACE:2545000",
      "lat": 41.661303,
      "lon": -70.937913,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1230,
      "placeGeoid": "2545000",
      "priceIndex": {
        "all": 101.773,
        "goods": 97.116,
        "housing": 103.851,
        "servicesOther": 102.275,
        "utilities": 148.809
      },
      "resolutionNote": "New Bedford, MA uses Bristol County as the computation county.",
      "shortName": "New Bedford",
      "state": "MA",
      "stateName": "Massachusetts",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 29508,
      "cbsaCode": "41740",
      "cbsaName": "San Diego-Chula Vista-Carlsbad, CA",
      "confidence": "high",
      "countyFips": "06073",
      "countyName": "San Diego County",
      "displayName": "El Cajon, CA",
      "id": "PLACE:0621712",
      "lat": 32.801673,
      "lon": -116.960468,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2459,
      "placeGeoid": "0621712",
      "priceIndex": {
        "all": 111.887,
        "goods": 107.963,
        "housing": 179.267,
        "servicesOther": 99.597,
        "utilities": 174.247
      },
      "resolutionNote": "El Cajon, CA uses San Diego County as the computation county.",
      "shortName": "El Cajon",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 17004,
      "cbsaCode": "10580",
      "cbsaName": "Albany-Schenectady-Troy, NY",
      "confidence": "high",
      "countyFips": "36001",
      "countyName": "Albany County",
      "displayName": "Albany, NY",
      "id": "PLACE:3601000",
      "lat": 42.665745,
      "lon": -73.798353,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1417,
      "placeGeoid": "3601000",
      "priceIndex": {
        "all": 99.566,
        "goods": 99.693,
        "housing": 102.582,
        "servicesOther": 97.754,
        "utilities": 134.048
      },
      "resolutionNote": "Albany, NY uses Albany County as the computation county.",
      "shortName": "Albany",
      "state": "NY",
      "stateName": "New York",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 27936,
      "cbsaCode": "31080",
      "cbsaName": "Los Angeles-Long Beach-Anaheim, CA",
      "confidence": "high",
      "countyFips": "06037",
      "countyName": "Los Angeles County",
      "displayName": "Inglewood, CA",
      "id": "PLACE:0636546",
      "lat": 33.956068,
      "lon": -118.344274,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2328,
      "placeGeoid": "0636546",
      "priceIndex": {
        "all": 113.566,
        "goods": 106.623,
        "housing": 170.433,
        "servicesOther": 104.362,
        "utilities": 158.589
      },
      "resolutionNote": "Inglewood, CA uses Los Angeles County as the computation county.",
      "shortName": "Inglewood",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 22812,
      "cbsaCode": "33100",
      "cbsaName": "Miami-Fort Lauderdale-West Palm Beach, FL",
      "confidence": "high",
      "countyFips": "12099",
      "countyName": "Palm Beach County",
      "displayName": "Boca Raton, FL",
      "id": "PLACE:1207300",
      "lat": 26.37269,
      "lon": -80.103711,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1901,
      "placeGeoid": "1207300",
      "priceIndex": {
        "all": 114.155,
        "goods": 103.556,
        "housing": 155.551,
        "servicesOther": 109.113,
        "utilities": 97.235
      },
      "resolutionNote": "Boca Raton, FL uses Palm Beach County as the computation county.",
      "shortName": "Boca Raton",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 19656,
      "cbsaCode": "15980",
      "cbsaName": "Cape Coral-Fort Myers, FL",
      "confidence": "high",
      "countyFips": "12071",
      "countyName": "Lee County",
      "displayName": "Fort Myers, FL",
      "id": "PLACE:1224125",
      "lat": 26.617839,
      "lon": -81.831725,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1638,
      "placeGeoid": "1224125",
      "priceIndex": {
        "all": 102.349,
        "goods": 96.24,
        "housing": 125.113,
        "servicesOther": 98.864,
        "utilities": 86.901
      },
      "resolutionNote": "Fort Myers, FL uses Lee County as the computation county.",
      "shortName": "Fort Myers",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 35724,
      "cbsaCode": "41860",
      "cbsaName": "San Francisco-Oakland-Fremont, CA",
      "confidence": "high",
      "countyFips": "06081",
      "countyName": "San Mateo County",
      "displayName": "Daly City, CA",
      "id": "PLACE:0617918",
      "lat": 37.701684,
      "lon": -122.464968,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 2977,
      "placeGeoid": "0617918",
      "priceIndex": {
        "all": 115.613,
        "goods": 108.465,
        "housing": 194.718,
        "servicesOther": 106.207,
        "utilities": 172.585
      },
      "resolutionNote": "Daly City, CA uses San Mateo County as the computation county.",
      "shortName": "Daly City",
      "state": "CA",
      "stateName": "California",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 18996,
      "cbsaCode": "38060",
      "cbsaName": "Phoenix-Mesa-Chandler, AZ",
      "confidence": "high",
      "countyFips": "04013",
      "countyName": "Maricopa County",
      "displayName": "Avondale, AZ",
      "id": "PLACE:0404720",
      "lat": 33.313236,
      "lon": -112.328928,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1583,
      "placeGeoid": "0404720",
      "priceIndex": {
        "all": 103.316,
        "goods": 95.024,
        "housing": 121.236,
        "servicesOther": 104.016,
        "utilities": 93.332
      },
      "resolutionNote": "Avondale, AZ uses Maricopa County as the computation county.",
      "shortName": "Avondale",
      "state": "AZ",
      "stateName": "Arizona",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12588,
      "cbsaCode": "41660",
      "cbsaName": "San Angelo, TX",
      "confidence": "high",
      "countyFips": "48451",
      "countyName": "Tom Green County",
      "displayName": "San Angelo, TX",
      "id": "PLACE:4864472",
      "lat": 31.441078,
      "lon": -100.450499,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1049,
      "placeGeoid": "4864472",
      "priceIndex": {
        "all": 92.453,
        "goods": 93.757,
        "housing": 81.442,
        "servicesOther": 96.24,
        "utilities": 81.575
      },
      "resolutionNote": "San Angelo, TX uses Tom Green County as the computation county.",
      "shortName": "San Angelo",
      "state": "TX",
      "stateName": "Texas",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 12204,
      "cbsaCode": "36420",
      "cbsaName": "Oklahoma City, OK",
      "confidence": "high",
      "countyFips": "40109",
      "countyName": "Oklahoma County",
      "displayName": "Edmond, OK",
      "id": "PLACE:4023200",
      "lat": 35.673807,
      "lon": -97.413076,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1017,
      "placeGeoid": "4023200",
      "priceIndex": {
        "all": 90.408,
        "goods": 93.778,
        "housing": 73.885,
        "servicesOther": 95.458,
        "utilities": 74.067
      },
      "resolutionNote": "Edmond, OK uses Oklahoma County as the computation county.",
      "shortName": "Edmond",
      "state": "OK",
      "stateName": "Oklahoma",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 11136,
      "cbsaCode": "19340",
      "cbsaName": "Davenport-Moline-Rock Island, IA-IL",
      "confidence": "high",
      "countyFips": "19163",
      "countyName": "Scott County",
      "displayName": "Davenport, IA",
      "id": "PLACE:1919000",
      "lat": 41.55682,
      "lon": -90.603948,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 928,
      "placeGeoid": "1919000",
      "priceIndex": {
        "all": 89.079,
        "goods": 94.2,
        "housing": 68.346,
        "servicesOther": 93.53,
        "utilities": 89.945
      },
      "resolutionNote": "Davenport, IA uses Scott County as the computation county.",
      "shortName": "Davenport",
      "state": "IA",
      "stateName": "Iowa",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 16620,
      "cbsaCode": "19660",
      "cbsaName": "Deltona-Daytona Beach-Ormond Beach, FL",
      "confidence": "high",
      "countyFips": "12127",
      "countyName": "Volusia County",
      "displayName": "Deltona, FL",
      "id": "PLACE:1217200",
      "lat": 28.905121,
      "lon": -81.210978,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1385,
      "placeGeoid": "1217200",
      "priceIndex": {
        "all": 99.367,
        "goods": 96.24,
        "housing": 108.375,
        "servicesOther": 98.864,
        "utilities": 87.566
      },
      "resolutionNote": "Deltona, FL uses Volusia County as the computation county.",
      "shortName": "Deltona",
      "state": "FL",
      "stateName": "Florida",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    },
    {
      "annualRent1Br": 21540,
      "cbsaCode": "14500",
      "cbsaName": "Boulder, CO",
      "confidence": "medium",
      "countyFips": "08013",
      "countyName": "Boulder County",
      "displayName": "Longmont, CO",
      "id": "PLACE:0845970",
      "lat": 40.168199,
      "lon": -105.100522,
      "mapX": 0,
      "mapY": 0,
      "monthlyRent1Br": 1795,
      "placeGeoid": "0845970",
      "priceIndex": {
        "all": 105.202,
        "goods": 96.052,
        "housing": 157.02,
        "servicesOther": 99.822,
        "utilities": 82.741
      },
      "resolutionNote": "Longmont, CO uses Boulder County as the computation county. The city spans 2 county parts; the computation county has 98.7% of 2025 city population. The city spans multiple CBSAs; the primary CBSA is chosen by population share. Housing uses the dominant HUD FMR area (Boulder, CO MSA, 98.7% population share).",
      "shortName": "Longmont",
      "state": "CO",
      "stateName": "Colorado",
      "taxCoverageStatus": "supported",
      "taxFlags": {
        "denverOccupationalPrivilegeTax": false,
        "inNyc": false
      },
      "taxNotes": []
    }
  ],
  "modelVersion": "nationwide_2026_343_city",
  "sources": {
    "beaRpp": {
      "name": "BEA Regional Price Parities",
      "notes": "Metro RPP line codes 1 all items, 2 goods, 3 housing, 4 utilities, 5 other services; all 343 city primary CBSAs mapped to MARPP metro rows.",
      "url": "https://apps.bea.gov/regional/zip/MARPP.zip",
      "vintage": "2024 release"
    },
    "blsCex": {
      "name": "BLS Consumer Expenditure Survey PUMD",
      "notes": "Single-person renter consumer units with wage/salary income and no self-employment income.",
      "url": "https://www.bls.gov/cex/pumd/data/csv/intrvw24.zip",
      "vintage": "2024 CSV Interview Survey, CPI-adjusted to May 2026 dollars"
    },
    "blsCpi": {
      "name": "BLS Consumer Price Index",
      "notes": "CPI-U all items, U.S. city average, not seasonally adjusted; used to inflate 2024 CEX dollars and income bands.",
      "url": "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0",
      "vintage": "May 2026"
    },
    "census": {
      "name": "U.S. Census Bureau Geography",
      "notes": "City universe is Census SUMLEV 162 records with 2025 population at least 100,000; county and CBSA mappings use official Census/OMB files.",
      "url": "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/cities/totals/sub-est2025.csv",
      "vintage": "2025 subcounty population estimates, 2025 Gazetteer, and July 2023 CBSA delineations"
    },
    "hudFmr": {
      "name": "HUD Fair Market Rents",
      "notes": "One-bedroom Fair Market Rent from HUD FY2026 revised workbook; multi-area cities use the dominant population-share HUD area and carry a review note.",
      "url": "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26_FMRs_revised.xlsx",
      "vintage": "FY2026 revised, effective May 21 2026"
    },
    "policyengine": {
      "name": "PolicyEngine US",
      "notes": "Tax year 2026 curves for single filer W-2 wages. Known unsupported municipal local taxes are flagged in city confidence notes.",
      "url": "https://github.com/PolicyEngine/policyengine-us",
      "vintage": "policyengine-us 1.729.0"
    }
  },
  "taxYear": 2026
} as const satisfies SalaryDataset;
