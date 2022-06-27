import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { motion } from "framer-motion";
import { Col, Row } from "react-grid-system";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { contactIsutra, resetContactUs } from "../../actions";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  textArea: {},
}));

const ContactForm = ({ close }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contactUs);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      return setError("All fields are mandatory!");
    }

    // do form submission
    dispatch(contactIsutra(name, email, subject, message));

    // reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setError("");
  };
  const tempFunc = useRef()
  const newFunc = () => {
    if (contact.success) {
      toast.success("Thanks for your Feedback! We will respond shortly.");
      close();
    }
    return () => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setError("");
      dispatch(resetContactUs());
    };
  }
  tempFunc.current = newFunc
  useEffect(() => {
    tempFunc.current()
  }, 
  [contact.success]
  );

  return (
    <ContactFormComponent>
      <div onClick={close} className="closeModal">
        <img src="/assets/utils/close.svg" alt="close" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: "-50rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, duration: 0.8 }}
      >
        <Row>
          <Col md={6} sm={12}>
            <div className="leftSide">
              <h1>Contact Us.</h1>
              <p>
                iSUTRA is here to help you 24*7. Have questions or suggestions?
                Please drop us a line! We will listen to your feedback.
              </p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="item01">
                  <input
                    className={error && !name && "redBorder"}
                    type="text"
                    name="name"
                    id="item01"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Your Name *"
                  />
                </label>
                <label htmlFor="item02">
                  <input
                    className={error && !email && "redBorder"}
                    type="text"
                    name="email"
                    id="item02"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Your email *"
                  />
                </label>
                <label htmlFor="item03">
                  <input
                    className={error && !subject && "redBorder"}
                    type="text"
                    name="subject"
                    id="item03"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    placeholder="Write a Subject"
                  />
                </label>
                <TextareaAutosize
                  className={`${classes.textArea} ${
                    error && !message && "redBorder"
                  }`}
                  aria-label="message"
                  rowsMin={4}
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {error && <div className="formError">{error}</div>}
                <button className="submitButton" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </Col>

          <Col md={6} sm={12}>
            <div className="rightSide">
              <img src="/assets/footer/co-op-works.png" alt="Isutra" />
            </div>
          </Col>
        </Row>
      </motion.div>
    </ContactFormComponent>
  );
};

export default ContactForm;

const ContactFormComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 78vh;
  width: 70vw;
  z-index: 1000;
  background: #fff;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0.3rem;
  padding: 1.3rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  color: #444;

  .formError {
    font-size: 1rem;
    font-weight: 300;
    color: ${(props) => props.theme.red};
    text-transform: capitalize;
    margin-bottom: 1rem;
  }

  .redBorder {
    border: 2px solid ${(props) => props.theme.red} !important;
  }

  .closeModal {
    position: absolute;
    top: 1rem;
    right: 0.7rem;
    height: 2.8rem;
    width: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
    border-radius: 50%;
    cursor: pointer;
    z-index: 5;

    img {
      height: 1.2rem;
      width: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    width: 80vw;
    height: 75vh;
  }

  @media (max-width: 768px) {
    width: 95vw;
    height: 80vh;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #979797;
    border-radius: 10px;
    cursor: pointer;
  }

  .leftSide {
    h1 {
      font-weight: 800;
      font-size: 4rem;
      letter-spacing: 0.2px;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 2rem;
      font-weight: #300;
    }

    span {
      font-weight: 500;
      color: #333;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        color: #ffa200;
      }
    }

    label {
      display: block;
      margin-bottom: 0;
      width: 100%;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    input,
    textarea {
      display: block;
      width: 100%;
      padding: 0 20px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      transition: all 0.3s ease;
      height: 50px;
      line-height: 46px;
      margin-bottom: 20px;
      outline: none;
      color: #333;
      font-size: 15px;
      letter-spacing: 0.1px;
      &:focus {
        border-color: #ffa200;
      }
    }
    textarea {
      height: 80px;
    }

    .submitButton {
      text-transform: uppercase;
      padding: 0.8rem 2.5rem;
      border-radius: 0.4rem;
      color: #fff;
      background-color: #ffa200;
      font-size: 1.1rem;
      display: inline-block;
      outline: none;
      border: none;
    }

    @media (max-width: 414px) {
      h1 {
        font-size: 2.8rem;
      }
    }
  }

  .rightSide {
    img {
      width: 100%;
      height: auto;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }

    @media (max-width: 600px) {
      img {
        margin-top: 2.5rem;
      }
    }

    @media (max-width: 480px) {
      img {
        display: none;
      }
    }
  }
`;
