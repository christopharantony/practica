import { Box } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useEffect, useState } from 'react';

function MyFeedback() {
    const location = useLocation();
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState(1);
    const [file, setFile] = useState('');

    useEffect(() => {
        const data = location.state.file
        console.log(data);
        setFile(data)
    }, [location.state.file])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleClose = () => {
        navigate('/interviews')
    }
    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box sx={{ height: 430 }} className="All-Request-list" >
                <Box
                    sx={{
                        width: 700,
                        m: "5px auto",
                        border: '1px solid',
                    }}
                >
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page width={700} pageNumber = {1} />
                    </Document>
                    <p>
                        Page 1 of {numPages}
                    </p>
                </Box>
            </Box>
        </div>
    )
}

export default MyFeedback
