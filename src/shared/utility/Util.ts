import React from "react";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type HtmlProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export const useUtils = () => {
  const getPercentageOfLikes = (liked: number, disliked: number): number => {
    return Math.floor((liked / (liked + disliked)) * 100);
  };
  return {
    getPercentageOfLikes,
  };
};
