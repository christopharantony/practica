import { useState } from "react";
import { motion } from "framer-motion"
import BackdropLanding from "../BackdropLanding/BackdropLanding"
import noimage from '../../../Assets/Images/Big No Image.png'
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../axiosInstance'
// import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import './CreatePostModal.css'

const dropIn = {
    hidden: {
        y: "-50vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "3vh",
        opacity: 0
    }
}

function CreatePostModal({ handleClose }) {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })
    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })
    // let postImage = '';
    // const navigate = useNavigate();
    // const [values, setValues] = useState({
    //     image: "",
    //     description: "",
    // });


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log('submit', values)
    //     try {
    //         if (values.email === "" || values.password === "") {
    //             generateError("Please fill all fields")
    //             return;
    //         }
    //         const { data } = await axios.post('api/login', {
    //             ...values
    //         }, {
    //             withCredentials: true
    //         })
    //         if (data.error) {
    //             generateError("Invalid Email or Password")
    //         } else {
    //             navigate('/home')
    //             handleClose()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const imageHandler = (e) => {
    //     postImage = e.target.files[0]
    //     console.log('postIMage',postImage);
    // };
    const handlePost = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const { description } = data

        let values = new FormData()
        if (description) {
            console.log("description", description)
            console.log("image", image)
            console.log("user", user._id)

            values.append('image', image)
            values.append('description', description)
            values.append('createdBy', user._id)

            for (var pair of values.entries()) {
                console.log(pair[0]+ ' - ' + pair[1]); 
            }
            try {
            const res = await axios.post(`api/post/create`, values, {
                headers: {
                    'authToken': localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("res", res)
            generateSuccess("Post Created Successfully")
            handleClose()
        } catch (error) {
            console.log('Error',error)
        }
        }else{
            generateError('Please Write a Description')
        }
    }
    return (
        <BackdropLanding style={Backdropstyle} onClick={handleClose}>
            <motion.div
                // drag
                onClick={(e) => { e.stopPropagation() }}
                className="CreatePost-modal bg-white"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <header className='CreatePost-header'>
                    <Grid container spacing={3} >
                        <Grid item xs={10}>
                            <h2 className="CreatePost-Heading">Create post</h2>
                        </Grid>
                        <Grid item xs={2}>
                            <CloseIcon className="CreatePost-Close-button" onClick={handleClose} />
                        </Grid>
                    </Grid>
                </header>
                    <form onSubmit={handleSubmit(handlePost)}>
                        <Grid container spacing={3} >
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    {...register('postImage')}
                                    id="CreatePostImage"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <label className="CreatePost-Image-Label" htmlFor="CreatePostImage">
                                    {
                                        image ?
                                            <img src={URL.createObjectURL(image)} alt="postImage" className="CreatePost-Image" />
                                            :
                                            <img className="CreatePost-DefaultImage" src={noimage} alt="Post" />
                                    }
                                </label>
                            </Grid>
                        </Grid>
                        <footer className="CreatePost-Footer">
                            <Grid container spacing={3} >
                                <Grid item xs={9}>
                                    <input
                                        type="text"
                                        name="Description"
                                        value={description}
                                        {...register('description')}
                                        placeholder='Write something here...'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <button type='submit' className="CreatePost-send">Send</button>
                                </Grid>
                            </Grid>
                        </footer>
                    </form>
            </motion.div>
            <ToastContainer />
        </BackdropLanding>
    )
}

export default CreatePostModal

const Backdropstyle = {
    height: "700px"
}