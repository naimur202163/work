import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const Agreement = ({ setShowLicenseAgreementPage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <AgreementComponent>
        <div
          className="goBack"
          onClick={() => setShowLicenseAgreementPage(false)}
        >
          <i className="fas fa-arrow-left" />
          <span>Go Back</span>
        </div>

        <PDFWrapper>
          <Document
            file="isutraAgreement.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <div className="pagination">
            <div className="pagination__wrapper">
              <div
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                }}
                className="button left"
              >
                <i className="fas fa-chevron-left" />
              </div>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <div
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
                className="button right"
              >
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </div>
        </PDFWrapper>
      </AgreementComponent>
    </>
  );
};

export default Agreement;

const AgreementComponent = styled.div`
  padding: 5rem 2rem 2rem 2rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;
  width: 90%;
  position: relative;

  .goBack {
    position: absolute;
    top: 1rem;
    left: 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    i {
      height: 2.8rem;
      width: 2.8rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme.red};
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.4rem;
      margin-right: 1rem;
    }
  }

  .title {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  .title2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .title3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .paragraph {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 200;
    margin-bottom: 2.5rem;
  }
`;

const PDFWrapper = styled.div`
  .pagination {
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;

    &__wrapper {
      display: inline-block;
      background-color: red;
      display: flex;
      align-items: center;
      background-color: #181818;
      padding: 0.5rem 1rem;
      border-radius: 10rem;
    }

    .button {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #181818;
      transition: all 0.2s ease;
      cursor: pointer;

      i {
        font-size: 1rem;
        color: #fff;
      }

      &:hover {
        background: ${(props) => props.theme.gradient};
      }
    }

    .left {
      margin-right: 1rem;
    }
    .right {
      margin-left: 1rem;
    }

    p {
      font-size: 0.9rem;
      font-weight: 300;
    }
  }

  margin: 1em 0;

  .react-pdf__Page__canvas {
    border-radius: 0.5rem;
  }

  .react-pdf {
    &__Document {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__Page {
      max-width: 100%;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      margin: 1em;

      canvas {
        max-width: 100%;
        height: auto !important;
      }
    }
  }
`;
