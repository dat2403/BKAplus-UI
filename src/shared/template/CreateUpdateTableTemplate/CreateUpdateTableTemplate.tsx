import React, { useEffect, useState } from "react";
import { Input, InputNumber, Checkbox } from "antd";
import "./CreateUpdateTableTemplate.scss";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface IOptionItem {
  name: string;
  code: any;
}

interface IItem {
  id: number;
  type: string;
  label: string;
  key: string;
  value?: string;
  options?: IOptionItem[];
  selectItem?: IOptionItem;
  readOnly?: boolean;
  maxLength?: number;
  max?: number;
  checked?: boolean;
  target?: any[];
  placeholder?: string;
}

type ITemplateProps = {
  data: IItem[];
  isModal?: boolean;
  openModal?: boolean;
  title?: string;
  handleShowModal?: (value: boolean) => void;
  onSave: (request: any) => void;
};

const { TextArea } = Input;

function CreateUpdateTableTemplate(props: ITemplateProps){
  const { data, isModal, openModal, title, handleShowModal, onSave } = props;

  const [listData, setListData] = useState<any>({});

  useEffect(() => {
    if(data){
      const a = data?.map((item : IItem) => {
        if(item.type !== 'dropdown') return;
        setListData({ ...listData, [item.key]: item.selectItem?.code });
      })
    }
  }, [])

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleConfirm = () => {
    onSave(listData);
    handleShowModal?.(false);
  };

  const handleCancel = () => {
    handleShowModal?.(false);
  };

  const handleChangeData = (key: string, value: any) => {
    setListData({ ...listData, [key]: value });
  };

  const renderItem = (item: IItem) => {
    switch (item?.type) {
      case "inputtext":
        return (
          <div className="line-item" key={item?.id}>
            <div className="label">{item?.label}</div>
            <div>
              <Input
                maxLength={item?.maxLength}
                readOnly={item?.readOnly}
                onChange={(e) => handleChangeData(item.key, e.target.value)}
              />
            </div>
          </div>
        );
      case "inputnumber":
        return (
          <div className="line-item" key={item?.id}>
            <div className="label">{item?.label}</div>
            <div>
              <InputNumber
                min={0}
                max={item?.max}
                readOnly={item?.readOnly}
                onChange={(e) => handleChangeData(item.key, e)}
              />
            </div>
          </div>
        );
      case "textarea":
        return (
          <div className="line-item" key={item?.id}>
            <div className="label">{item?.label}</div>
            <div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 2 }}
                onChange={(e) => handleChangeData(item.key, e.target.value)}
              />
            </div>
          </div>
        );
      case "title": {
        return (
          <div className="line-item title" key={item?.id}>
            <h4>{item?.label}</h4>
          </div>
        );
      }
      case "checkbox":
        return (
          <div className="line-item checkbox" key={item?.id}>
            <Checkbox onChange={onChangeCheckbox} checked={item?.checked}>
              {item?.label}
            </Checkbox>
          </div>
        );
      case "dropdown":
        const select =
          item?.options?.find((e: any) => e.code === listData[item.key]) || item.selectItem;
        return (
          <div className="line-item dropdown" key={item?.id}>
            <div className="label">{item?.placeholder ? null : item?.label}</div>
            <Dropdown
              value={select}
              onChange={(event: DropdownChangeEvent) =>
                handleChangeData(item.key, event.value.code)
              }
              options={item.options}
              optionLabel="name"
              placeholder={item?.placeholder}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="create-update-table-template">{data?.map((item) => renderItem(item))}</div>
      </>
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
      style={{ width: "50vw" }}
      onHide={handleCancel}
      footer={renderFooter}
    >
      {renderContent()}
    </Dialog>
  ) : (
    renderContent()
  );
};
export default CreateUpdateTableTemplate;
