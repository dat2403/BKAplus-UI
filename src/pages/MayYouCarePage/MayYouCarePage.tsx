import React from "react";
import "./MayYouCarePage.scss";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../../shared/utility/useMockData.ts";
import usePageState from "../../hooks/usePageState.ts";
import { BreadCrumb } from "primereact/breadcrumb";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const MayYouCarePage: React.FC = () => {
  const items = [{ label: "Có thể bạn quan tâm" }];
  const home = { label: "Trang chủ", url: "/" };
  const [listDocs, setListDocs] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const { defaultThumbnail } = useMockData();
  const { repository } = usePageState();
  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(10);

  const fetchAllDocs = async () => {
    try {
      const params = {
        page: first,
        per_page: rows
      };
      const res = await repository.getAllDocs(params);
      const newDocsReverse = res?.data?.reverse();
      setListDocs(newDocsReverse as any[]);
    } catch (error) {
      //
    } finally {
      //
    }
  };

  React.useEffect(() => {
    fetchAllDocs();
  }, [first, rows]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="may-you-care-wrapper">
      <BreadCrumb model={items} home={home} />
      <div className="title-container">
        <div className="list-title">Có thể bạn quan tâm</div>
      </div>

      <div className="list-course-content">
        {listDocs?.map((doc) => {
          return (
            <div key={doc?.id} className="course-card"
                 onClick={() => {
                   navigate(`/${AppRoute.SubjectDocs}/TruongCNTT/${doc?.id}`);
                 }}>
              <img src={doc?.imageUrl ?? defaultThumbnail} alt="course-img" className="course-image" />
              <div className="course-content">
                <div className="title">{doc?.title}</div>
                <div className="description">{doc?.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={listDocs?.length} // Need BE res have total records count to count page
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange} />
    </div>
  );
};
export default MayYouCarePage;
