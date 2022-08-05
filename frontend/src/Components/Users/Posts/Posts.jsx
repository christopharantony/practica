import { Box, Avatar } from "@mui/material";
import { useEffect } from "react";
import axios from "../../../axiosInstance";
import { useState } from "react";
import { Grid, Card, CardContent, IconButton } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MessageIcon from "@mui/icons-material/Message";
import Plus from "../../../Assets/Buttons/Plus.svg";
import "./Posts.css";
function Posts() {
    const [posts, setPosts] = useState([]);
    const getAllPosts = async () => {
        const { data } = await axios.get("api/post/all", {
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        setPosts(data);
    };

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })

    useEffect(() => {
        getAllPosts();
    }, []);

    const handleConnect = async (id) => {
        const { data } = await axios.post('api/connect', { id }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        if (data.error) {
            generateError(data.error)
        } else if (data.created) {
            generateSuccess('Connected')
        }
    }

    return (
        <Box
            className="scrollbar-hidden"
            style={scrollbarhidden}
            height={515}
            mt={2}
            pt={2}
        >
            {posts &&
                posts.map((post, index) => (
                    <Card
                        key={index}
                        sx={{
                            borderRadius: "10px",
                            width: "100%",
                            m: "10px auto",
                            bgcolor: "#D9D9D9",
                        }}
                    >
                        <CardContent
                            sx={{
                                height: "28rem",
                                borderBottom: 1,
                                borderColor: "rgba(0, 0, 0, 0.38)",
                            }}
                        >
                            <header className="posts-header">
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Box>
                                            <Avatar sx={{position:'inherit'}} src={post.createdBy.pic}></Avatar>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                ml: 1,
                                                justifyContent: "center",
                                                mt: 1,
                                            }}
                                        >
                                            <Box width="100%">
                                                <h2 className="post-creator-name">
                                                    {post.createdBy.name}
                                                </h2>
                                            </Box>
                                            <Box width="100%">
                                                <p className="post-creator-about">
                                                    {post.createdBy.interviewer ?
                                                        post.createdBy.company
                                                        : post.createdBy.domain
                                                    }
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {post.createdBy.interviewer && (
                                            <Box>
                                                <h2 className="post-creator-join">Request</h2>
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            </header>

                            <Box className="post-content">
                                <img
                                    src={post.postImage}
                                    alt="postImage"
                                    className="post-image"
                                />
                                <p className="post-description">{post.description}</p>
                            </Box>

                            <Box className="post-footer">
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton  sx={{position:'inherit'}} disableRipple={true} >
                                            <ThumbUpOffAltIcon  />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton  sx={{position:'inherit'}} disableRipple={true}>
                                            <MessageIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                            }}
                                            onClick={() => {
                                                handleConnect(post.createdBy._id)
                                            }}
                                        >
                                            <img src={Plus} alt="Plus" className="post-plus" />
                                            <h2 className="post-creator-connect">Connect</h2>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <ToastContainer />
        </Box>
    );
}

export default Posts;

const scrollbarhidden = {
    overflow: "scroll",
    overflowX: "hidden",
};
