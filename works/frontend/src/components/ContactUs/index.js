/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { contactIsutra, resetContactUs } from "../../actions";
import { toast } from "react-toastify";

const ContactUs = ({ closeModal }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contactUs);
  const [state, setState] = useState({
    rnName: "",
    rnEmail: "",
    rnSubject: "",
    rnMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      contactIsutra(
        state.rnName,
        state.rnEmail,
        state.rnSubject,
        state.rnMessage
      )
    );
  };

  useEffect(() => {
    if (contact.success) {
      toast.success("Thanks for your Feedback! We will respond shortly.");
      closeModal();
    }
    return () => {
      setState({});
      dispatch(resetContactUs());
    };
  }, [contact.success]);
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div>
          <div>
            <p style={{ padding: "18px" }}>
              iSUTRA is here to help you 24*7. Have questions or suggestions?
              Please drop us a line! We will listen to your feedback.{" "}
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="item01">
              <input
                type="text"
                name="name"
                id="item01"
                required
                value={state.rnName}
                onChange={(e) => {
                  setState({ ...state, rnName: e.target.value });
                }}
                placeholder="Your Name *"
              />
            </label>

            <label htmlFor="item02">
              <input
                type="text"
                name="email"
                required
                id="item02"
                value={state.rnEmail}
                onChange={(e) => {
                  setState({ ...state, rnEmail: e.target.value });
                }}
                placeholder="Your email *"
              />
            </label>

            <label htmlFor="item03">
              <input
                type="text"
                name="subject"
                required
                id="item03"
                value={state.rnSubject}
                onChange={(e) => {
                  setState({ ...state, rnSubject: e.target.value });
                }}
                placeholder="Write a Subject"
              />
            </label>
            <label htmlFor="item04">
              <textarea
                type="text"
                id="item04"
                required
                name="message"
                value={state.rnMessage}
                onChange={(e) => {
                  setState({ ...state, rnMessage: e.target.value });
                }}
                placeholder="Your Message"
              />
            </label>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="submit"
              name="submit"
              style={{ marginRight: "10px" }}
            >
              {contact.isLoading ? "Sending.." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
