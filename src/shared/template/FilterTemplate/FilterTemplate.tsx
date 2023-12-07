import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button, Input } from "antd";
import "./FilterTemplate.scss";
import { IFrListRequest } from "../../../network/models/DataSettings/FrListModel";

interface IOption {
  name: string;
  key: string;
}

interface IFilterOptions {
  filterBy: IOption[];
  matchIf: IOption[];
  searchText: string;
}
type FilterTemplateProps = {
  filterOptions: IFilterOptions,
  onFilter: (request: IFrListRequest) => void
};

const FilterTemplate: React.FC<FilterTemplateProps> = (props) => {
  const { filterOptions, onFilter } = props;

  const [filterByItem, setFilterByItem] = useState<IOption | null>(filterOptions.filterBy?.[0] || null);
  const [matchIfItem, setMatchIfItem] = useState<IOption | null>(filterOptions.matchIf?.[0] || null);
  const [searchValue, setSearchValue] = useState<string>(filterOptions.searchText || '');

  const handleFilterData = () => {
    const request = {
      match_if: matchIfItem?.key || '',
      field_type : filterByItem?.key || '',
      content : searchValue || ''
    }
    onFilter(request);
  }

  return (
    <div className="filter-template-wrapper">
      <div className="filter by">
        <div className="label"> Filter By</div>
        <div>
          <Dropdown
            value={filterByItem}
            onChange={(e: DropdownChangeEvent) => setFilterByItem(e.value)}
            options={filterOptions.filterBy}
            optionLabel="name"
            editable
            className="w-full md:w-14rem"
          />
        </div>
      </div>
      <div className="filter match-if">
        <div className="label">Match If</div>
        <div className="card flex justify-content-center">
          <Dropdown
            value={matchIfItem}
            onChange={(e: DropdownChangeEvent) => setMatchIfItem(e.value)}
            options={filterOptions.matchIf}
            optionLabel="name"
            editable
            className="w-full md:w-14rem"
          />
        </div>
      </div>
      <div className="filter search">
        <div className="label">Value</div>
        <div>
          <Input value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} placeholder="Enter your key" />
        </div>
      </div>
      <div className="search-btn">
        <Button type="primary" onClick={handleFilterData}>Find</Button>
      </div>
    </div>
  );
};
export default FilterTemplate;
