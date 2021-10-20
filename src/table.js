import React, {useState,useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
// A great library for fuzzy filtering/sorting items
//import {matchSorter} from 'match-sorter'
import Viewer from './viewer';
import {Modal,Button} from 'react-bootstrap';


function Table({ data }) {
    const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: " ",
        // First group columns
        columns: [
          {
            Header: "ID",
            accessor: "ID",
            width:100,
          },
          {
            Header: "NAZIV",
            accessor: "NAZIV",
            width:300,
        },
        {
            Header : "Action",
            id:'action',
            Cell: ({row})=>(
                <button className="btn btn-primary btn-sm" onClick={ (e) => onClickToShow(row.original) }>view</button>
            )
        }
        ]
      }
    ],
    []
  );
    const [document, setDocument] = useState(null);
    const [prikazi,setPrikazi]=useState(false)
    const handleZatvori=(a)=>{
        console.log(a);
    }
    const togglePopup=()=>{        
        setPrikazi(!prikazi);
    }
    const onClickToShow=(item)=> {
        console.log(item);
        setDocument(item);
        setPrikazi(true);
      }
  const props = useTable(
    {
      columns,
      data
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = props;

  React.useEffect(() => {
      setPageSize(20);
    // props.dispatch({ type: actions.resetPage })
    console.log(document);
  }, [globalFilter]);

  return (
    <>
      <div className="row align-items-start">Pretraga :
          <input
              className="col-4"
            type="text"
            value={globalFilter || ""}
            onChange={e => setGlobalFilter(e.target.value)}
          />
      </div>

  <table {...getTableProps()} className="table table-striped table-hover table-sm">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
          <Modal
              show={prikazi}
              animation={false}
              onHide={togglePopup}
              dialogClassName="modal-90w nopadd"
              keyboard={false}
              size="lg"
          >
          <Modal.Header className="nopadd row justify-content-between">
            <Modal.Title className="sfont row justify-content-between">

            <div className="col"></div>
            <div className="col-4 align-right">
              <button type="button" className="close btn btn-secondary" aria-label="Close" onClick={togglePopup}>
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="cc">
              <div className="" >
                  <Viewer showState={prikazi} parentAction={togglePopup} document={document}/>
              </div>
          </div>
          </Modal.Body>

        </Modal>

      </div>
    </>
  );
}

export default Table
