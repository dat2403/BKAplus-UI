import React, { useState } from "react";
import { Tabs } from "antd";
import "./TabPageTemplate.scss";
import { Tab } from "rc-tabs/lib/interface";
import CreateUpdateTableTemplate from "../CreateUpdateTableTemplate/CreateUpdateTableTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const { TabPane } = Tabs;

type ITemplateProps = {
  data: any;
  isModal?: boolean;
  openModal?: boolean;
  title?: string;
  handleShowModal?: (value: boolean) => void;
  selected?: any;
};

const TabPageTemplate: React.FC<ITemplateProps> = (props) => {
  const { data, isModal, title, openModal, handleShowModal, selected } = props;

  const handleConfirm = () => {
    handleShowModal?.(false);
  };

  const handleCancel = () => {
    handleShowModal?.(false);
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const onRowClick = (item: any) => {};

  const onRowDbClick = (item: any) => {};

  const renderTabItemContent = (tabItem: Tab) => {
    if (tabItem.key?.includes("form")) {
      return <CreateUpdateTableTemplate data={data?.updateOptions} onSave={() => {}} />;
    } else if (tabItem?.key?.includes("table")) {
      return (
        <div style={{minHeight: '50vh'}}>
          <DataTable
            value={[]}
            resizableColumns
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
            onRowClick={(eClick) => onRowClick(eClick.data as any)}
            onRowDoubleClick={(eDbClick) => onRowDbClick(eDbClick.data as any)}
          >
            {["Name", "API Name", "Description", "Status"]?.map((item) => {
              return (
                <Column
                  field={item?.toLowerCase()?.trim()?.replaceAll(" ", "_")}
                  header={item}
                ></Column>
              );
            })}
          </DataTable>
        </div>
      );
    }
  };

  const renderTabPageContent = () => {
    return (
      <div className="tab-page-wrapper">
        <Tabs defaultActiveKey="1" onChange={onChangeTab}>
          {data?.tabpage?.map((tabItem: any) => {
            return (
              <TabPane tab={tabItem.label} key={tabItem.key}>
                {renderTabItemContent(tabItem)}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  };
  const renderFooter = () => {
    return (
      <div className="dialog-footer flex justify-content-center">
        <div className="btn cancel">
          <Button
            label="Cancel"
            severity="danger"
            style={{ padding: "6px 12px", fontSize: "14px", fontWeight: "400" }}
            onClick={handleCancel}
          />
        </div>
        <div className="btn refresh">
          <Button
            label="Refresh"
            style={{ padding: "6px 12px", fontSize: "14px", fontWeight: "400" }}
          />
        </div>
        <div className="btn ok">
          <Button
            label="OK"
            severity="info"
            style={{ padding: "6px 12px", fontSize: "14px", fontWeight: "400" }}
            onClick={handleConfirm}
          />
        </div>
      </div>
    );
  };

  return isModal ? (
    <Dialog
      header={title}
      headerStyle={{ padding: "12px 16px", borderBottom: "1px solid #d3d5d7" }}
      visible={openModal}
      style={{ width: "70vw" }}
      onHide={handleCancel}
      footer={renderFooter}
    >
      {renderTabPageContent()}
    </Dialog>
  ) : (
    renderTabPageContent()
  );
};
export default TabPageTemplate;
