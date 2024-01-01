import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageThumbnailPlugin } from "./ThumbnailPlugin.tsx";

interface DisplayThumbnailExampleProps {
  fileUrl: string;
  pageIndex: number;
  width: number;
}

const FileThumbnail: React.FC<DisplayThumbnailExampleProps> = ({ fileUrl, pageIndex, width }) => {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => pageIndex} width={width}/>
  });

  return <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
    <Viewer fileUrl={fileUrl} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} />
  </Worker>;
};

export default FileThumbnail;
