import { Box, Grid, Typography } from "@mui/material"

function Messages({ message, own}) {
    const ownStyle = { textAlign:"start", marginTop:2 ,width: '100%'  }
    const otherStyle = { textAlign:"end", marginTop:2 ,width: '100%'  }
    return (
        <Grid container >
            <Box sx={own ? ownStyle : otherStyle }>
                <span
                    style={{
                        backgroundColor: own ? "#BEE3F8" : "#B9F5D0",
                        marginTop: own ? 3 : 10,
                        height:"2rem",
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                    }}>
                    {message?.content}
                </span>
                <Typography fontSize={10.5} sx={{ ml: 1 }}>{message.createdAt}</Typography>
            </Box>
        </Grid>
    )
}

export default Messages
