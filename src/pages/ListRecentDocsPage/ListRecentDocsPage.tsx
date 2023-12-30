import React from "react";
import "./ListRecentDocsPage.scss";
import usePageState from "../../hooks/usePageState.ts";
import { BreadCrumb } from "primereact/breadcrumb";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import RecentDocumentCard from "../HomePage/RecentDocumentCard.tsx";

const ListRecentDocsPage: React.FC = () => {
  const items = [{ label: "Được xem gần đây" }];
  const home = { label: "Trang chủ", url: "/" };
  const [recentDocs, setRecentDocs] = React.useState<any[]>([]);
  const { repository } = usePageState();
  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(10);
  const totalCount = React.useRef(0);
  const fetchInitData = async () => {
    const res = await repository.getRecentDocs();
    setRecentDocs(res?.data?.data as any[]);
    totalCount.current = res?.data?.total_count;
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
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}>
        <BreadCrumb model={items} home={home} />
        <div className="title-container">
          <div className="list-title">Được xem gần đây</div>
        </div>
        <div className="list-content">
          {recentDocs?.map((doc) => {
            return (
              <RecentDocumentCard key={doc?.document?.id} doc={doc?.document} />
            );
          })}
        </div>
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalCount.current} // Need BE res have total records count to count page
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange} />
    </div>
  );
};

export default ListRecentDocsPage;
