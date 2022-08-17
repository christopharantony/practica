import { Box, Avatar, Typography, Button, TextField } from "@mui/material";
import { Grid, Card, CardContent, IconButton } from "@mui/material";
import { useEffect } from "react";
import axios from "../../../axiosInstance";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from "@mui/icons-material/Message";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Plus from "../../../Assets/Buttons/Plus.svg";
import { useNavigate } from "react-router-dom";
import "./Posts.css";
function Posts() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [posts, setPosts] = useState([]);
    const [like, setLike] = useState(false);
    const [commentStatus, setCommentStatus] = useState(false);
    const [postId, setPostId] = useState("");
    const [comment, setComment] = useState("");

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

    const handleChat = async (id) => {
        const Object = {
            senderId: user._id,
            receiverId: id,
        };
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }
        const { data } = await axios.post('api/chat', Object, config)
        if (data.message === "Chat already exists") {
            const chat = data.chat;
            navigate("/message", { state: { chat }})
        } else if (data.created) {
            generateSuccess('Chat created')
        }
    };

    const handleLike = async (id) => {
        const value = !like;
        setLike(value);
        const body = {
            likes: value,
            postId: id
        }
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }

        await axios.post('api/post/posts/like', body, config);
        const { data } = await axios.get('api/post/all', config);
        setPosts(data)
    }

    const handleCommentStatus = async (id) => {
        const value = !commentStatus;
        setCommentStatus(value);
        setPostId(id);
    }

    const handleComment = async (id) => {
        const body = {
            comment,
            postId: id
        }
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }

        await axios.post('api/post/posts/comment', body, config);
        const { data } = await axios.get('api/post/all', config);
        setPosts(data)
        const value = !commentStatus;
        setCommentStatus(value);
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
                                height: "30rem",
                                borderBottom: 1,
                                borderColor: "rgba(0, 0, 0, 0.38)",
                            }}
                        >
                            <header className="posts-header">
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Box>
                                            <Avatar sx={{ position: 'inherit' }} src={post.createdBy.pic}></Avatar>
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
                                        <IconButton sx={{ position: 'inherit' }} disableRipple={true} onClick={() => {
                                            handleLike(post._id)
                                        }} >
                                            {post.likes.includes(user._id) ? (
                                                <ThumbUpAltIcon sx={{ fontSize: 30, color: "blue" }} />
                                            ) : (
                                                <ThumbUpOffAltIcon />
                                            )
                                            }
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton sx={{ position: 'inherit' }} disableRipple={true} onClick={() => {
                                            handleCommentStatus(post._id)
                                        }}>
                                            <MessageIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {!(
                                            user.connections.includes(post.createdBy._id) ||
                                            post.createdBy._id === user._id
                                        ) ? (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "end"
                                                }}
                                                onClick={() => {
                                                    console.log(post.createdBy._id)
                                                }}
                                            >
                                                <IconButton
                                                    sx={{ position: 'inherit', pr: 5 }}
                                                    disableRipple={true}
                                                    onClick={() => handleChat(post.createdBy._id)}
                                                >
                                                    <SendRoundedIcon />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            !(post.createdBy._id === user._id) && (
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
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 22,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    sx={{ ml: 2, fontWeight: 500 }}
                                >
                                    {post.likes.length} likes
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ mr: 2, fontWeight: 500 }}
                                >
                                    {post.comments.length} comments
                                </Typography>
                            </Box>
                        </CardContent>
                        {commentStatus && post._id === postId && (
                            <>
                                <CardContent
                                    sx={{ display: "flex", justifyContent: "space-around" }}
                                >
                                    <Box sx={{ width: "75%" }}>
                                        <TextField
                                            size="small"
                                            onChange={(e) => setComment(e.target.value)}
                                            sx={{ m: "0 auto" }}
                                            fullWidth
                                            placeholder="Add a comment..."
                                        />
                                    </Box>
                                    <Box>
                                        <Button
                                            size="small"
                                            onClick={() => handleComment(post._id)}
                                            variant="contained"
                                            sx={{ m: "2.5px auto" }}
                                        >
                                            Post
                                        </Button>
                                    </Box>
                                </CardContent>
                                <CardContent>
                                    {post.comments
                                        .map((data) => data)
                                        .map((comment) => comment)
                                        .reverse()
                                        .map((text) => (
                                            <Box sx={{ display: "flex", width: "100%" }}>
                                                <Box sx={{ width: "10%", mt: 1.2 }}>
                                                    <Avatar
                                                        src={text.commentedBy.pic}
                                                        sx={{ height: 38, width: 38 }}
                                                    ></Avatar>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: "90%",
                                                        backgroundColor: "#f2f0f0",
                                                        borderRadius: "15px",
                                                        height: "auto",
                                                        mt: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        fontSize="0.9rem"
                                                        fontWeight={500}
                                                        marginLeft={1}
                                                        marginTop={1}
                                                    >
                                                        {text.commentedBy.name}
                                                    </Typography>
                                                    <Typography fontSize="0.7rem" marginLeft={1}>
                                                        {text.commentedBy?.interviewer ? text.commentedBy?.company : text.commentedBy?.domain}
                                                    </Typography>
                                                    <Typography
                                                        fontSize="0.9rem"
                                                        fontWeight={500}
                                                        marginLeft={1}
                                                        marginTop={1}
                                                    >
                                                        {text.comment}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                </CardContent>
                            </>
                        )}
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
