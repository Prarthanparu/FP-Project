const static_column_expectations = [
  {
    title: "expect_column_wasserstein_distance_to_be_less_than",
  },
  {
    title: "expect_column_values_to_not_match_regex_list",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      regex_list: "",
    },
  },
  {
    title: "expect_column_values_to_not_match_regex",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      regex: "",
    },
  },
  {
    title: "expect_column_values_to_not_match_like_pattern_list",
  },
  {
    title: "expect_column_values_to_not_match_like_pattern",
  },
  {
    title: "expect_column_values_to_not_contain_special_characters",
  },
  {
    title: "expect_column_values_to_not_contain_character",
  },
  {
    title: "expect_column_values_to_not_be_outliers",
  },
  {
    title: "expect_column_values_to_not_be_null",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      mostly: "",
    },
  },
  {
    title: "expect_column_values_to_not_be_in_set",
  },
  {
    title: "expect_column_values_to_match_strftime_format",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_values_to_match_regex_list",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      regex_list: "",
    },
  },
  {
    title: "expect_column_values_to_match_regex",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      regex: "",
    },
  },
  {
    title: "expect_column_values_to_match_like_pattern_list",
  },
  {
    title: "expect_column_values_to_match_like_pattern",
  },
  {
    title: "expect_column_values_to_match_json_schema",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      json_schema: "",
    },
  },
  {
    title: "expect_column_values_to_follow_rule",
  },
  {
    title: "expect_column_values_to_contain_valid_email",
  },
  {
    title: "expect_column_values_to_change_between",
  },
  {
    title: "expect_column_values_to_be_xml_parseable",
  },
  {
    title: "expect_column_values_to_be_valid_wikipedia_articles",
  },
  {
    title: "expect_column_values_to_be_valid_urls",
  },
  {
    title:
      "expect_column_values_to_be_us_zipcode_within_mile_radius_of_given_zipcode",
  },
  {
    title: "expect_column_values_to_be_unique",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      mostly: "",
    },
  },
  {
    title: "expect_column_values_to_be_string_integers_increasing",
  },
  {
    title: "expect_column_values_to_be_secure_passwords",
  },
  {
    title: "expect_column_values_to_be_of_type",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      type: "",
    },
  },
  {
    title: "expect_column_values_to_be_null",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      mostly: "",
    },
  },
  {
    title: "expect_column_values_to_be_normally_distributed",
  },
  {
    title: "expect_column_values_to_be_json_parseable",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      mostly: "",
    },
  },
  {
    title: "expect_column_values_to_be_increasing",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      strictly: "",
    },
  },
  {
    title: "expect_column_values_to_be_in_type_list",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      type_list: "",
    },
  },
  {
    title: "expect_column_values_to_be_in_set",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_values_to_be_edtf_parseable",
  },
  {
    title: "expect_column_values_to_be_decreasing",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      strictly: "",
    },
  },
  {
    title: "expect_column_values_to_be_dateutil_parseable",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      mostly: "",
    },
  },
  {
    title: "expect_column_values_to_be_ascii",
  },
  {
    title: "expect_column_values_to_be_alphabetical",
  },
  {
    title: "expect_column_values_to_be_a_non_bot_user_agent",
  },
  {
    title: "expect_column_values_point_within_geo_region",
  },
  {
    title: "expect_column_values_number_of_decimal_places_to_equal",
  },
  {
    title: "expect_column_values_are_in_language",
  },
  {
    title: "expect_column_value_z_scores_to_be_less_than",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      threshold: "",
    },
  },
  {
    title: "expect_column_value_lengths_to_equal",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value: "",
    },
  },
  {
    title: "expect_column_value_lengths_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
    },
  },
  {
    title: "expect_column_unique_value_count_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
    },
  },
  {
    title: "expect_column_to_exist",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      column_index: "",
    },
  },
  {
    title: "expect_column_sum_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
    },
  },
  {
    title: "expect_column_stdev_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
    },
  },
  {
    title: "expect_column_skew_to_be_between",
  },
  {
    title: "expect_column_quantile_values_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      quantile_range: "",
    },
  },
  {
    title: "expect_column_proportion_of_unique_values_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
    },
  },
  {
    title: "expect_column_pair_values_to_be_in_set",
    kwargs: {
      column_A: "",
      column_B: "",
      value_pairs_set: "",
      ignore_row_if: "",
    },
  },
  {
    title: "expect_column_pair_values_to_be_equal",
    kwargs: {
      column_A: "",
      column_B: "",
      ignore_row_if: "",
    },
  },
  {
    title: "expect_column_pair_values_a_to_be_greater_than_b",
    kwargs: {
      column_A: "",
      column_B: "",
      or_equal: "",
      parse_strings_as_datetimes: "",
    },
  },
  {
    title: "expect_column_most_common_value_to_be_in_set",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_min_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
      max_value: "",
    },
  },
  {
    title: "expect_column_median_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
      max_value: "",
    },
  },
  {
    title: "expect_column_mean_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
      max_value: "",
    },
  },
  {
    title: "expect_column_max_to_be_between",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      min_value: "",
      max_value: "",
    },
  },
  {
    title: "expect_column_kurtosis_to_be_between",
  },
  {
    title: "expect_column_kl_divergence_to_be_less_than",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      threshold: "",
      tail_weight_holdout: "",
      internal_weight_holdout: "",
    },
  },
  {
    title: "expect_column_distribution_to_match_benfords_law",
  },
  {
    title: "expect_column_distinct_values_to_equal_set",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_distinct_values_to_contain_set",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_distinct_values_to_be_in_set",
    kwargs: {
      column: "", // this is not a input , I should get the column name which is in the table , no need to show this in UI
      value_set: "",
    },
  },
  {
    title: "expect_column_discrete_entropy_to_be_between",
  },
];

export { static_column_expectations };
