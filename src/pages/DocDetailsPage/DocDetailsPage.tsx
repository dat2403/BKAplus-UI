import React, { useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import "./DocDetailsPage.scss";
import { Button } from "primereact/button";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Chip } from "primereact/chip";
import { InputTextarea } from "primereact/inputtextarea";
import { Avatar } from "primereact/avatar";
import usePageState from "../../hooks/usePageState.ts";
import Scaffold, { TypeLoading } from "../../shared/components/Scaffold/Scaffold.tsx";
import { useUtils } from "../../shared/utility/Util.ts";
import { useParams } from "react-router-dom";
import useAsyncEffect from "../../hooks/useAsyncEffect.ts";
import AppConfig from "../../shared/config/AppConfig.ts";

const DocDetailsPage: React.FC = () => {
  const items = [{ label: "SOICT" }, { label: "Lập trình mạng" }];
  const home = { label: "Trang chủ", url: "/" };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { isLoading, setLoading, repository } = usePageState();
  const [data, setData] = useState<any>();
  const params = useParams()

  const { formatUtcDateString, getCurrentDate } = useUtils()

  const detailProperties = [
    { key: "Môn học", value: data?.subject?.name },
    { key: "Trường/Khoa", value: data?.lecturer?.school?.name },
    { key: "Giảng viên", value: data?.lecturer?.name },
    { key: "Mô tả môn học", value: "" },
  ];

  const fetchDocDetailsData = async () => {
    try {
      setLoading(true);
      if (params?.docId) {
        const res = await repository.getDocDetails(params.docId);
        setData(res?.data)
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useAsyncEffect(fetchDocDetailsData, []);

  const downloadPdf = async () => {
    try {
      // Replace 'your-pdf-url' with the actual URL of the PDF file
      const pdfUrl = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

      // Make an HTTP request to get the PDF file as a Blob
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");

      // Set the href attribute to a data URL representing the Blob content
      link.href = window.URL.createObjectURL(blob);

      // Set the download attribute to specify the file name
      link.download = "downloaded-file.pdf";

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  function renderViewer() {
    if (!data?.files) {
      return null
    }

    if (data.files?.length === 0) {
      return null
    }

    const url = `${AppConfig.baseURL}/files/${data.files[0].url}`

    return <Viewer
      fileUrl={url}
      plugins={[defaultLayoutPluginInstance]}
    />
  }

  return (
    <Scaffold isLoading={isLoading} typeLoading={TypeLoading.OVERLAY}>
      <div className={"doc-detail-page-wrapper"}>
        <BreadCrumb model={items} home={home} />

        <div className="doc-details-content">
          <div className="doc-details-header">
            <div className="left-column">
              <div className="title-container">
                <div className="title">{data?.title}</div>
                <div className="create-download-times">Ngày tạo: {formatUtcDateString(data?.createdAt)} - {data?.download_count} lượt tải</div>
                <div className="favorite-share">
                  <div className="button-wrapper love">
                    <i className={"pi pi-heart"}></i>
                  </div>
                  <div className="button-wrapper share">
                    <i className={"pi pi-share-alt"}></i>
                  </div>
                </div>
              </div>
              <div className="like-container">
                <div className="react-button">
                  <Button
                    icon="pi pi-thumbs-up-fill"
                    rounded
                    severity="success"
                    aria-label="Like"
                  />
                  <div className="like-text">100</div>
                </div>
                <div className="react-button">
                  <Button
                    icon="pi pi-thumbs-down-fill"
                    rounded
                    severity="danger"
                    aria-label="Like"
                  />
                  <div className="dislike-text">0</div>
                </div>
              </div>
            </div>
            <div className="download">
              <Button
                onClick={downloadPdf}
                label="Tải xuống"
                rounded
                icon={"pi pi-download"}
                iconPos={"right"}
              />
            </div>
          </div>
          <div className="details-content">
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "750px",
                  marginTop: "30px",
                  display: "flex",
                  flexGrow: "1",
                }}
              >
                {
                  renderViewer()
                }
              </div>
            </Worker>
            <div className="right-column">
              <div className="tags-list-container">
                <div className="list-title">Từ khóa</div>
                <div className={"tags-container"}>
                  {data?.categories?.map((cate: any) => (<Chip key={cate?.id} label={cate?.name} />
                  ))}
                </div>
              </div>
              <div className="doc-details-wrapper">
                <div className="list-title">Thông tin chi tiết</div>
                <div className="list-property">
                  {detailProperties?.map((property) => (
                    <div key={property.key} className="property-item">
                      <div className="pro-key">{property.key}</div>
                      <div className="pro-value">{property.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="comment-container">
            <div className="list-title">Đánh giá</div>
            <div className="comment-cols">
              <div className="left">
                <div className="like-container">
                  <div className="react-button">
                    <Button
                      icon="pi pi-thumbs-up-fill"
                      rounded
                      severity="success"
                      aria-label="Like"
                    />
                    <div className="like-text">100</div>
                  </div>
                  <div className="react-button">
                    <Button
                      icon="pi pi-thumbs-down-fill"
                      rounded
                      severity="danger"
                      aria-label="Like"
                    />
                    <div className="dislike-text">0</div>
                  </div>
                </div>
                <div className="feedback">
                  <div className="title">Đánh giá tài liệu này</div>
                  <div className="react-wrapper">
                    <Button
                      icon="pi pi-thumbs-up-fill"
                      rounded
                      severity="success"
                      aria-label="Like"
                    />
                    <Button
                      icon="pi pi-thumbs-down-fill"
                      rounded
                      severity="danger"
                      aria-label="Dislike"
                    />
                  </div>
                  <span className="p-float-label">
                    <InputTextarea
                      // value={value}
                      // onChange={(e) => setValue(e.target.value)}
                      style={{ width: "100%" }}
                      rows={5}
                      cols={30}
                    />
                    <label htmlFor="description">Nhận xét</label>
                  </span>
                </div>
              </div>
              <div className="right">
                <div className={"comment-item"}>
                  <div className={"user-info"}>
                    <Avatar
                      label="V"
                      size="large"
                      style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                      shape="circle"
                    />
                    <div>Nguyễn Văn A</div>
                  </div>
                  <Button
                    style={{ marginLeft: "10px" }}
                    icon="pi pi-thumbs-up-fill"
                    rounded
                    severity="success"
                    aria-label="Like"
                  />
                  <div className="created-time">Đăng tải ngày {getCurrentDate()}</div>
                  <div className="content">Tài liệu tốt, giúp mình được 9 giữa kì</div>
                  <div className="who-liked">3 người đã thích</div>
                  <div className={"button-group"}>
                    <Button label="Like" />
                    <Button label="Report" severity="secondary" />
                  </div>
                </div>
                <div className={"comment-item"}>
                  <div className={"user-info"}>
                    <Avatar
                      label="V"
                      size="large"
                      style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                      shape="circle"
                    />
                    <div>Nguyễn Văn A</div>
                  </div>
                  <Button
                    style={{ marginLeft: "10px" }}
                    icon="pi pi-thumbs-up-fill"
                    rounded
                    severity="success"
                    aria-label="Like"
                  />
                  <div className="created-time">Đăng tải ngày {getCurrentDate()}</div>
                  <div className="content">Tài liệu tốt, giúp mình được 9 giữa kì</div>
                  <div className="who-liked">3 người đã thích</div>
                  <div className={"button-group"}>
                    <Button label="Like" />
                    <Button label="Report" severity="secondary" />
                  </div>
                </div>
                <div className={"comment-item"}>
                  <div className={"user-info"}>
                    <Avatar
                      label="V"
                      size="large"
                      style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                      shape="circle"
                    />
                    <div>Nguyễn Văn A</div>
                  </div>
                  <Button
                    style={{ marginLeft: "10px" }}
                    icon="pi pi-thumbs-up-fill"
                    rounded
                    severity="success"
                    aria-label="Like"
                  />
                  <div className="created-time">Đăng tải ngày {getCurrentDate()}</div>
                  <div className="content">Tài liệu tốt, giúp mình được 9 giữa kì</div>
                  <div className="who-liked">3 người đã thích</div>
                  <div className={"button-group"}>
                    <Button label="Like" />
                    <Button label="Report" severity="secondary" />
                  </div>
                </div>
                <div className={"comment-item"}>
                  <div className={"user-info"}>
                    <Avatar
                      label="V"
                      size="large"
                      style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                      shape="circle"
                    />
                    <div>Nguyễn Văn A</div>
                  </div>
                  <Button
                    style={{ marginLeft: "10px" }}
                    icon="pi pi-thumbs-up-fill"
                    rounded
                    severity="success"
                    aria-label="Like"
                  />
                  <div className="created-time">Đăng tải ngày {getCurrentDate()}</div>
                  <div className="content">Tài liệu tốt, giúp mình được 9 giữa kì</div>
                  <div className="who-liked">3 người đã thích</div>
                  <div className={"button-group"}>
                    <Button label="Like" />
                    <Button label="Report" severity="secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
};

export default DocDetailsPage;
