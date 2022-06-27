import React, { useEffect, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { Box, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import { verifyEmail } from "../actions";
import { toast } from "react-toastify";
import { ScrollToTop } from "../utils/index"

const VerifyEmail = ({ verifyEmail, isEmailVerified }) => {
    const history = useHistory();
    const { token } = useParams();
    const tempFunction = useRef()
    const imgFunction = () => {
        verifyEmail(token)
    }
    tempFunction.current = imgFunction
    useEffect(() => {
        tempFunction.current()
    }, [])
    const tempFunc = useRef()
    const imgFunc = () => {
        if (isEmailVerified) {
            toast.success("Email Verified.");
            history.push('/home')
        }
    }
    tempFunc.current = imgFunc
    useEffect(() => {
        tempFunc.current()

    }, [isEmailVerified])

    return (
        <>
            <ScrollToTop />
            <Box py={2}>
                {
                    <Typography
                        variant="h4"
                        align="center"
                        color="initial">
                        {isEmailVerified ? "Verified your email ...." : "Verifying your email ...."}
                    </Typography>
                }

            </Box>
        </>
    )
}

const mapStateToProps = ({ user }) => ({
    isEmailVerified: user.is_email_verified,
});

export default connect(mapStateToProps, { verifyEmail })(VerifyEmail);
