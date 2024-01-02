import React, { useRef, useState } from "react";
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
// import { Avatar } from "primereact/avatar";
import usePageState from "../../hooks/usePageState.ts";
import Scaffold, { TypeLoading } from "../../shared/components/Scaffold/Scaffold.tsx";
import { useUtils } from "../../shared/utility/Util.ts";
import { useNavigate, useParams } from "react-router-dom";
import useAsyncEffect from "../../hooks/useAsyncEffect.ts";
import AppConfig from "../../shared/config/AppConfig.ts";
import { TabPanel, TabView } from "primereact/tabview";
import { DocumentModel, UserReactDocument } from "../../network/models/DocumentModel.ts";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import { UserRole } from "../../models/enums/UserRole.ts";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import {
  resetHomeState,
  updateSelectedCategoryName,
  updateSelectedFilteredCategory,
} from "../../store/slices/HomeSlice.ts";
import SeeMoreComment from "./SeeMoreComment.tsx";
import Assets from "../../assets/Assets.ts";
import axios from "axios";

const DocDetailsPage: React.FC = () => {
  const items = [{ label: "SOICT" }, { label: "Lập trình mạng" }];
  const home = { label: "Trang chủ", url: "/" };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { isLoading, setLoading, repository } = usePageState();
  const [data, setData] = useState<DocumentModel | undefined>();
  const params = useParams();
  const [activeFileIndex, setActiveFileIndex] = React.useState(0);
  const [totalReacts, setTotalReacts] = React.useState<UserReactDocument[] | undefined>([]);
  const { formatUtcDateString } = useUtils();
  const { user } = useAppSelector((state) => state.auth);
  const [currentComment, setCurrentComment] = React.useState("");
  const [needFetchListComment, setNeedFetchListComment] = React.useState(false);
  const [listComment, setListComment] = React.useState<any[]>([]);
  const [isShowAdminVerify, setIsShowAdminVerify] = React.useState(false);
  const [isDocVerified, setIsDocVerified] = React.useState(false);
  const isAdmin = Boolean(user?.user?.role === UserRole.Admin);
  const toastRef = React.useRef<Toast>(null);

  const reactOfThisUser = totalReacts?.find((react) => react?.author?.id === user?.user?.id);
  const isUserLike = reactOfThisUser?.vote === true;
  const isUserDislike = reactOfThisUser?.vote === false;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [evidenceUrl, setEvidenceUrl] = React.useState("");

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const detailProperties = [
    { key: "Môn học", value: data?.subject?.name },
    { key: "Trường/Khoa", value: data?.lecturer?.school?.name },
    { key: "Giảng viên", value: data?.lecturer?.name },
    { key: "Mô tả môn học", value: data?.description },
  ];

  const getBase64 = async (url: string) => {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary").toString("base64");
  };

  React.useEffect(() => {
    dispatch(resetHomeState());
  }, []);
  const fetchDocDetailsData = async () => {
    try {
      setLoading(true);
      if (params?.docId) {
        const res = await repository.getDocDetails(params.docId);
        setData(res?.data);
        setTotalReacts(res?.data?.userReactDocuments);
        if (res?.data?.evidence_url) {
          const base64Url = await getBase64(`${AppConfig.baseURL}/files/${res?.data?.evidence_url}`);
          setEvidenceUrl(base64Url);
          console.log(base64Url);
        }
        if (res?.data?.is_verified === true) {
          setIsDocVerified(res?.data?.is_verified as boolean);
        }
        const listCommentReversed = res?.data?.comments?.reverse();
        setListComment(listCommentReversed as any[]);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  useAsyncEffect(fetchDocDetailsData, [needFetchListComment]);

  const downloadPdf = async () => {
    try {
      // Replace 'your-pdf-url' with the actual URL of the PDF file
      const pdfUrl = `${AppConfig.baseURL}/files/${data?.files?.[activeFileIndex]?.url}`;

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

  function renderViewer(fileUrl: string) {
    if (!data?.files) {
      return null;
    }

    if (data.files?.length === 0) {
      return null;
    }

    const url = `${AppConfig.baseURL}/files/${fileUrl}`;

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </div>
    );
  }

  const onHandleReact = (reactValue: boolean) => {
    if (params.docId) {
      if (commentRef && commentRef.current) {
        commentRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (!reactOfThisUser) {
        repository.reactDoc(params.docId, reactValue).then((res) => {
          setTotalReacts(res?.data?.userReactDocuments);
        });
      } else if (reactOfThisUser?.vote !== undefined && reactOfThisUser?.vote === !reactValue) {
        repository.reactDoc(params.docId, reactValue).then((res) => {
          setTotalReacts(res?.data?.userReactDocuments);
        });
      } else {
        repository.reactDoc(params.docId, undefined).then((res) => {
          setTotalReacts(res?.data?.userReactDocuments);
        });
      }
    }
  };

  const showAddCommentSuccess = () => {
    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Thêm đánh giá thành công",
      life: 3000,
    });
  };

  const onPostComment = async () => {
    if (params.docId) {
      const res = await repository.addComment(params.docId, currentComment);
      if (res.status_code === 200) {
        setNeedFetchListComment(!needFetchListComment);
        setCurrentComment("");
        showAddCommentSuccess();
      }
    }
  };

  const onVerifyDocument = async () => {
    try {
      if (params.docId) {
        const res = await repository.verifyDocument(params.docId, true);
        setIsDocVerified(res?.data?.is_verified as boolean);
      }
    } catch (e) {
      //////
    } finally {
      setIsShowAdminVerify(false);
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Hủy Bỏ"
        icon="pi pi-times"
        severity="danger"
        onClick={() => setIsShowAdminVerify(false)}
      />
      <Button
        label="Xác Nhận"
        icon="pi pi-check"
        onClick={async () => {
          await onVerifyDocument();
        }}
        autoFocus
      />
    </div>
  );
  const renderAdminVerifyDialog = () => (
    <Dialog
      header={"Đánh giá tài liệu"}
      visible={isShowAdminVerify}
      style={{ width: "50vw" }}
      onHide={() => setIsShowAdminVerify(false)}
      footer={footerContent}
    >
      <p className="m-0">Bạn xác nhận đánh giá rằng tài liệu này uy tín và đủ chất lượng ?</p>
    </Dialog>
  );

  const onOpenVerifyDialog = () => {
    if (!isDocVerified) {
      setIsShowAdminVerify(true);
    }
  };

  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
      <Scaffold isLoading={isLoading} typeLoading={TypeLoading.OVERLAY}>
        <div className={"doc-detail-page-wrapper"}>
          <BreadCrumb model={items} home={home} />

          <div className="doc-details-content">
            <div className="doc-details-header">
              <div className="left-column">
                <div className="title-container">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div className="title">{data?.title}</div>
                    {isAdmin && (
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={onOpenVerifyDialog}
                      >
                        <img
                          src={!isDocVerified ? Assets.icVerify : Assets.icVerified}
                          alt=""
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="create-download-times">
                    Ngày tạo: {formatUtcDateString(data?.createdAt as string)} -{" "}
                    {data?.download_count} lượt tải
                  </div>
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
                      severity={isUserLike ? "success" : "secondary"}
                      aria-label="Like"
                      onClick={() => {
                        onHandleReact(true);
                      }}
                    />
                    <div className="like-text">
                      {totalReacts?.filter((react) => react?.vote === true)?.length}
                    </div>
                  </div>
                  <div className="react-button">
                    <Button
                      icon="pi pi-thumbs-down-fill"
                      rounded
                      severity={isUserDislike ? "danger" : "secondary"}
                      aria-label="Like"
                      onClick={() => {
                        onHandleReact(false);
                      }}
                    />
                    <div className="dislike-text">
                      {totalReacts?.filter((react) => react?.vote === false)?.length}
                    </div>
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
              <TabView
                activeIndex={activeFileIndex}
                onTabChange={(e) => setActiveFileIndex(e.index)}
                style={{
                  maxWidth: "72%",
                  minWidth: "650px",
                }}
              >
                {data?.files?.map((file: any, index: number) => (
                  <TabPanel
                    key={index}
                    contentStyle={{
                      height: "750px",
                      maxHeight: "800px",
                    }}
                    header={`File ${index + 1}`}
                  >
                    {renderViewer(file?.url)}
                  </TabPanel>
                ))}
              </TabView>
              <div className="right-column">
                <div className="tags-list-container">
                  <div className="list-title">Từ khóa</div>
                  <div className={"tags-container"}>
                    {data?.categories?.map((cate: any) => (
                      <Chip
                        style={{ cursor: "pointer" }}
                        key={cate?.id}
                        label={cate?.name}
                        onClick={() => {
                          dispatch(updateSelectedFilteredCategory(cate?.id));
                          dispatch(updateSelectedCategoryName(cate?.name));
                          navigate("/");
                        }}
                      />
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
                {data?.evidence_url !== "0" && (
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "contain",
                      marginTop: "12px",
                    }}
                    alt={""}
                    src={evidenceUrl}
                  />
                )}
              </div>
            </div>
            <div className="comment-container">
              <div className="list-title">Đánh giá</div>
              <div className="comment-cols">
                <div className="left">
                  <div className="feedback">
                    <div className="title">Đánh giá tài liệu này</div>
                    <div className="react-wrapper">
                      <Button
                        icon="pi pi-thumbs-up-fill"
                        rounded
                        severity={isUserLike ? "success" : "secondary"}
                        aria-label="Like"
                        onClick={() => {
                          onHandleReact(true);
                        }}
                      />
                      <Button
                        icon="pi pi-thumbs-down-fill"
                        rounded
                        severity={isUserDislike ? "danger" : "secondary"}
                        aria-label="Dislike"
                        onClick={() => {
                          onHandleReact(false);
                        }}
                      />
                    </div>
                    <span className="p-float-label">
                      <InputTextarea
                        value={currentComment}
                        onChange={(e) => setCurrentComment(e.target.value)}
                        style={{ width: "100%" }}
                        rows={5}
                        cols={30}
                        ref={commentRef}
                      />
                      <label htmlFor="description">Nhận xét</label>
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "100%",
                        gap: "16px",
                      }}
                    >
                      <Button
                        label="Hủy"
                        severity="secondary"
                        outlined
                        onClick={() => {
                          setCurrentComment("");
                        }}
                      />
                      <Button
                        label="Gửi đánh giá"
                        onClick={async () => {
                          await onPostComment();
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="right">
                  {listComment?.map((comment) => (
                    <SeeMoreComment key={comment?.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scaffold>
      {renderAdminVerifyDialog()}
      <Toast ref={toastRef} />
    </Worker>
  );
};

export default DocDetailsPage;
