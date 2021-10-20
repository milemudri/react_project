import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
//import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
// document.oncontextmenu = function (e) {
//     e.preventDefault();
// };

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

function Viewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber,setPageNumber]=useState(1);
    const [podaci,setPodaci]=useState([]);

    const [show, setShow] = useState(props.showState);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        fetch("http://localhost/site/server.php?Data=4&link="+props.link)
        .then(resp => resp.text())
        .then(resp => {
            setPodaci('data:application/pdf;base64,'+(resp));
        })
    },[props.link]);


    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }

      function previousPage() {
        changePage(-1);
      }

      function nextPage() {
        changePage(1);
      }
      function firstPage() {
        setPageNumber(1);
      }

      function lastPage() {
        setPageNumber(numPages);
      }
      console.log(show);
    return (
        <div className="cc">
            <div className="col-4">
                <div>
                      <Button type="button" size="sm" variant="primary" disabled={pageNumber <= 1} onClick={firstPage}>&lt;&lt;</Button>
                      <Button type="button" size="sm" variant="primary" disabled={pageNumber <= 1} onClick={previousPage}>&lt;</Button>
                      <Button type="button" size="sm" variant="primary" disabled={pageNumber >= numPages} onClick={nextPage}>&gt;</Button>
                      <Button type="button" size="sm" variant="primary" disabled={pageNumber >= numPages} onClick={lastPage}>&gt;&gt;</Button>
                </div>
                <p>
                  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
            </div>
            <div className="" >
                <Document file={podaci} onLoadSuccess={onDocumentLoadSuccess} options={options} loading="Loading..." className="center">
                    <Page pageNumber={pageNumber} className="container-div"/>
                </Document>
            </div>
        </div>
    );
}

export default Viewer;
