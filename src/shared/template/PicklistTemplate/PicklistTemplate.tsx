import React, { useState } from "react";
import "./index.scss";

interface ITab {
    id: number;
    label: string;
    sourceOptions: any[]
}

const  PicklistTemplate: React.FC = (props) => {
  const [activeTab, setActiveTab] = useState<any>();
  const [selectItem, setSelectItem] = useState<any>({});
  const [targetItemSelect, setTargetItemSelect] = useState<any>({});
  const [searchText, setSearchText] = useState("");
  const [targetOptions, setTargetOptions] = useState<any[]>([]);

  const tabs = [
    {
      id: 1,
      label: "Users",
      sourceOptions: [
        {
          id: 1,
          name: "test1",
        },
        {
          id: 2,
          name: "test2",
        },
        {
          id: 3,
          name: "test3",
        },
        {
          id: 4,
          name: "test4",
        },
      ],
    },
    {
      id: 2,
      label: "User Groups",
      sourceOptions: [
        {
          id: 1,
          name: "louis1",
        },
        {
          id: 2,
          name: "louis1 245",
        },
        {
          id: 3,
          name: "louis1 35486",
        },
        {
          id: 4,
          name: "louis1 67",
        },
      ],
    },
  ];

  const handleSearchOptions = (searchText: string) => {
    if (searchText?.length > 0) {
      setActiveTab({
        ...activeTab,
        sourceOptions: activeTab.sourceOptions?.filter((item: any) =>
          item?.name?.includes(searchText)
        ),
      });
    } else {
      setActiveTab({
        ...activeTab,
        sourceOptions: tabs?.find((item) => item.id === activeTab?.id)
          ?.sourceOptions,
      });
    }
  };

  const handleChangeTab = (tab: ITab) => {
    setActiveTab(tab);
  };

  const handleSelectItem = (item: any) => {
    if (selectItem?.id === item?.id) {
      setSelectItem(undefined);
    } else {
      setSelectItem(item);
    }
  };

  const handleSelectTagertItem = (item :any) => {
    if (targetItemSelect?.id === item?.id) {
      setTargetItemSelect(undefined);
    } else {
      setTargetItemSelect(item);
    }
  };

  const handleChangeTargetItem = (selected : any) => {
    if (!selected) return;
    setTargetOptions([...targetOptions, selected]);
    setActiveTab({...activeTab, sourceOptions: activeTab.sourceOptions?.filter(
      (item: any) => item.id !== selected.id
    )})
    setSelectItem(null);
  };
  const handleChangeSourceItem = (selected: any) => {
    if (!selected) return;
    setTargetOptions (targetOptions?.filter(
      (item) => item.id !== selected.id
    ));
    setActiveTab({...activeTab, sourceOptions: [...activeTab?.sourceOptions, selected ]})
    setTargetItemSelect(null);
  };

  return (
    <div className="custom-picklist-wrapper">
      <div>
        <div className="source-select">
          <div className="tab">
            {tabs?.map((tabItem) => {
              return (
                <div className="tab-item" onClick={() => handleChangeTab(tabItem)}>
                  {tabItem?.label}
                </div>
              );
            })}
          </div>
          <div className="search-by">
            <div className="label">Find Name</div>
            <div className="input-search">
              <div>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e?.target.value)}
                />
              </div>
              <div
                onClick={() => handleSearchOptions(searchText)}
                className="pi pi-search"
              ></div>
            </div>
          </div>
          <div className="sort-by">
            <div className="label">Sort By</div>
            <div className="sort-item"></div>
            <div className="sort-item"></div>
          </div>
          <div className="options">
            <div>
              {tabs[0]?.sourceOptions?.map((item) => {
                return (
                  <div
                    className="select-item"
                    onClick={() => handleSelectItem(item)}
                  >
                    {item?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="btn-selects">
          <div onClick={() => handleChangeTargetItem(selectItem)}>
            <i className="pi pi-angle-right"></i>
          </div>
          <div
            className="mt-2"
            onClick={() => handleChangeSourceItem(targetItemSelect)}
          >
            <i className="pi pi-angle-left"></i>
          </div>
        </div>
        <div className="target-select">
          <div className="label">Recipients</div>
          <div className="options">
            <div>
              {targetOptions?.map((item) => {
                return (
                  <div
                    className="target-item"
                    onClick={() => handleSelectTagertItem(item)}
                  >
                    {item?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="cancel-btn">Cancel</div>
        <div className="confirm-btn">OK</div>
      </div>
    </div>
  );
}
export default PicklistTemplate;
