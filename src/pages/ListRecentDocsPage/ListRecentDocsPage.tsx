import React from "react";
import "./ListRecentDocsPage.scss";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import { Chip } from "primereact/chip";
import usePageState from "../../hooks/usePageState.ts";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../../shared/utility/useMockData.ts";
import { useUtils } from "../../shared/utility/Util.ts";
import { BreadCrumb } from "primereact/breadcrumb";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const ListRecentDocsPage: React.FC = () => {
  const items = [{ label: "Được xem gần đây" }];
  const home = { label: "Trang chủ", url: "/" };
  const [recentDocs, setRecentDocs] = React.useState<any[]>([]);
  const { repository } = usePageState();
  const navigate = useNavigate();
  const { defaultThumbnail } = useMockData();
  const { getPercentageOfLikes } = useUtils();
  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(10);
  const fetchInitData = async () => {
    const res = await repository.getRecentDocs();
    setRecentDocs(res?.data as any[]);
  };

  React.useEffect(() => {
    fetchInitData();
  }, []);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="list-last-seen-document-wrapper">
      <BreadCrumb model={items} home={home} />
      <div className="title-container">
        <div className="list-title">Được xem gần đây</div>
      </div>
      <div className="list-content">
        {recentDocs?.map((doc) => {
          return (
            <div
              key={doc?.document?.id}
              className="doc-card"
              onClick={() => {
                navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${doc?.document?.id}`);
              }}
            >
              <img
                className="thumbnail"
                src={doc?.document?.thumbnail ?? defaultThumbnail}
                alt="last-seen-img"
              />
              <div className="doc-text-content">
                <div className="doc-title">{doc?.document?.title}</div>
                <div className={"tags-container"}>
                  {doc?.document?.categories
                    ?.slice(0, 2)
                    .map((cate: any) => <Chip key={cate?.id} label={cate?.name} />)}
                </div>
              </div>
              <div className="like-container">
                <Chip
                  icon={"pi pi-thumbs-up-fill"}
                  label={`${getPercentageOfLikes(doc?.liked, doc?.disliked).toString()}% (${
                    doc?.liked ?? 100
                  })`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={recentDocs?.length} // Need BE res have total records count to count page
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange} />
    </div>
  );
};

export default ListRecentDocsPage;
