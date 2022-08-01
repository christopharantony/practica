import { Box, Avatar, Typography } from "@mui/material"
import { useEffect } from "react"
import axios from '../../../axiosInstance'
import { useState } from 'react'
import { Card, CardContent } from '@mui/material'
function Posts() {

    const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
        const { data } = await axios.get('api/post/all')
        console.log('Post Data =>', data)
        setPosts(data)
    }

    useEffect(() => {
        getAllPosts()
    }, [])
    return (
        <Box className="scrollbar-hidden" height={440} bgcolor='primary.light' mt={6} p={2}>
            {posts && posts.map((post, index) => (
                <Card
                    key={index}
                    sx={{ borderRadius: "10px", width: "80%", m: "10px auto", bgcolor: "#D9D9D9" }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: 1,
                            borderColor: "rgba(0, 0, 0, 0.38)",
                        }}
                    >
                        <Box>
                            <Avatar
                                src={post.createdBy.pic}
                            ></Avatar>
                        </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    ml: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Box width="100%">
                                    <Typography fontSize="1rem">
                                        {post.createdBy.name}
                                    </Typography>
                                </Box>
                                <Box width="100%">
                                    <Typography fontSize="0.8rem">
                                        {post.createdBy.domain}
                                    </Typography>
                                </Box>
                            </Box>

                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default Posts
