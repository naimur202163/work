import React from "react";
import PaidContentLibrary from "../components/PaidContentLibrary";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";

const Library = ({ isFetching }) => {
  return (
    <>
      <ScrollToTop />
      <PaidContentLibrary />

      {/* rendering footer */}
      <ContactBanner />
      <Footer />

  
    </>
  );
};

export default Library;
