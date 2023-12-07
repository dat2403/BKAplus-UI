import React from "react";

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export type HtmlProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>
