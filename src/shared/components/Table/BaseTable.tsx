import {DataTable, DataTableProps, DataTableValue} from "primereact/datatable";
import {Column} from "primereact/column";
import React from "react";

type Mapper<T> = {
  [key in keyof T]: string;
};

type OnlyTableProps<T> = {
  listData: T[],
  mapFieldToColumnName?: Mapper<T>
}

export type BaseTableProps<DataType extends DataTableValue> = DataTableProps<DataType[]> & OnlyTableProps<DataType>

function BaseTable<DataType extends DataTableValue>(props: BaseTableProps<DataType>) {
  const {listData, mapFieldToColumnName, ...rest} = props

  function renderColumn(): React.ReactNode {
    if (listData.length === 0) {
      return <p>Empty data!</p>
    }
    const columns = Object.keys(listData[0])
    return columns.map((col) => {
      const columnName = mapFieldToColumnName ? mapFieldToColumnName[col] : col.toUpperCase()

      return <Column
        key={col}
        field={col}
        header={columnName}/>
    })
  }

  return <DataTable
    showGridlines
    stripedRows
    reorderableColumns
    value={props.listData}
    tableStyle={{minWidth: '50rem'}}
    {...rest}
  >
    {
      renderColumn()
    }
  </DataTable>
}

export default BaseTable