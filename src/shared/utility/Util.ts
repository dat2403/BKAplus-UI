import React from "react";
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat)

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type HtmlProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export const useUtils = () => {
  const getPercentageOfLikes = (liked: number = 100, disliked: number = 0): number => {
    return Math.floor((liked / (liked + disliked)) * 100);
  };

  const formatUtcDateString = (inputDate: string): string => {
    const formattedDate = dayjs.utc(inputDate).format('DD/MM/YYYY');
    return formattedDate;
  };

  const getCurrentDate = () => {
    const now = dayjs();
    return dayjs(now).format("DD/MM/YYYY HH:mm").toString();
  }

  return {
    getPercentageOfLikes,
    formatUtcDateString,
    getCurrentDate
  };
};
