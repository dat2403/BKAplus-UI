import React from "react";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import { SearchParams } from "../../models/SearchParams.ts";
import _ from "lodash"

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type HtmlProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export const useUtils = () => {
  const getPercentageOfLikes = (liked: number = 100, disliked: number = 0): number => {
    if(liked > 0 || disliked > 0) {
      return Math.floor((liked / (liked + disliked)) * 100);
    }
    return 0;
  };

  const formatUtcDateString = (inputDate: string): string => {
    const formattedDate = dayjs.utc(inputDate).format("DD/MM/YYYY");
    return formattedDate;
  };

  const getCurrentDate = () => {
    const now = dayjs();
    return dayjs(now).format("DD/MM/YYYY HH:mm").toString();
  };

  const calcFileSizeInMB = (fileSizeInBytes: number): number => {
    // Convert bytes to megabytes
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    // Floor the result
    const fileSizeInMBFloored = Math.floor(fileSizeInMB);

    return fileSizeInMBFloored;
  };

  function removeEmptyAndUndefinedParams(params: SearchParams): SearchParams {
    return _.omitBy(params, _.isEmpty);
  }

  return {
    getPercentageOfLikes,
    formatUtcDateString,
    getCurrentDate,
    calcFileSizeInMB,
    removeEmptyAndUndefinedParams
  };
};
