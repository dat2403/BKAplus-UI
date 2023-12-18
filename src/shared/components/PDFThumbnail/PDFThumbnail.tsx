import React, { useEffect, useRef } from "react";
import pdfjsLib from "pdfjs-dist";

interface PDFThumbnailProps {
  pdfUrl: string;
}

const PDFThumbnail: React.FC<PDFThumbnailProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const thumbnailRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const fetchAndRenderPDF = async () => {
      try {
        // Load the PDF
        const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;

        // Fetch the first page
        const page = await pdfDoc.getPage(1);

        // Set up canvas
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;

        // Convert canvas to data URL
        const thumbnailDataUrl = canvas.toDataURL("image/png");

        // Set thumbnail source
        thumbnailRef.current!.src = thumbnailDataUrl;
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    fetchAndRenderPDF();
  }, [pdfUrl]);

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={300}></canvas>
      <img ref={thumbnailRef} alt="Thumbnail" />
    </div>
  );
};

export default PDFThumbnail;
