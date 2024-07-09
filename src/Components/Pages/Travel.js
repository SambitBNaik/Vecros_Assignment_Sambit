// import React, { useState, useId } from 'react'
// import {useDispatch, useSelector} from 'react-redux';
// import { Button, TextField,Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
// import { addBlog,deleteBlog,editBlog } from '../Redux/blogSlice';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { v4 as uuid } from "uuid";

// const Travel = () => {
//     const dispatch=useDispatch();
//     const blogs=useSelector(state=> state.blogs.blogs);

//     const[newBlogTitle,setNewBlogTitle]=useState('');
//     const[newBlogContent,setNewBlogContent]=useState('');
//     const unique_id=uuid();

//     const handleAddBlog=()=>{
//         dispatch(addBlog({
//             id:unique_id,
//             title: newBlogTitle,
//             content: newBlogContent,
//             category:'Travel'
//         }));

//         setNewBlogTitle('');
//         setNewBlogContent('');
//     }

//     const handleEditBlog=(id,updatedBlog)=>{
//         dispatch(editBlog({id, updatedBlog: updatedBlog}))
//     }

//     const handleDeleteBlog=(id)=>{
//         dispatch(deleteBlog(id));
//     }

//   return (
//     <div>
//         <div>
//             <TextField
//             type='text'
//             variant='outlined'
//             placeholder='Search Blogs'
//             sx={{
//                 height:'50px',
//                 width:'450px',
//                 padding:'12px',

//             }}
//             />  
//         </div>
//         <div style={{marginBottom:'20px'}}>
//             <TextField
//             type='text'
//             value={newBlogTitle}
//             variant='outlined'
//             label="Blog Title"
//             onChange={(e)=>{setNewBlogTitle(e.target.value)}}
//             style={{marginBottom:'10px'}} 
//             />
//             <TextField/>
//             <TextField
//                value={newBlogContent}
//                onChange={(e)=>setNewBlogContent(e.target.value)}
//                variant="outlined"
//                label='Blog Content'
//                multiline
//                rows={4}
//                fullWidth
//                style={{marginBottom:"10px"}}
//             />
//             <Button variant='contained' color='primary' onClick={handleAddBlog}>Add Blog</Button>
//         </div>
//         <div>
//             {blogs.map(blog=>(
//                 blog.category==='Travel' &&(
//                     <Card key={blog.id} style={{marginBottom: '10px'}}>
//                         <CardContent>
//                             <Typography variant='h5' component="h2">
//                                 {blog.title}
//                             </Typography>
//                             <Typography variant='body2' componenet="p" style={{marginTop: '10px'}}>
//                                 {blog.content}
//                             </Typography>
//                         </CardContent>
//                         <CardActions>
//                             <IconButton aria-label="edit" onClick={()=>handleEditBlog(blog.id,{title:"Update Title", content:"Updated Content"})}>
//                                 <EditIcon/>
//                             </IconButton>
//                             <IconButton aria-label="delete" onClick={()=>handleDeleteBlog(blog.id)}>
//                                 <DeleteIcon/>
//                             </IconButton>
//                         </CardActions>
//                     </Card>
//                 )
//             ))}
//         </div>
//     </div>
//   );
// };

// export default Travel

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { addBlog, deleteBlog, editBlog } from '../Redux/blogSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid } from "uuid";

const Travel = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs.blogs);

    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editBlogTitle, setEditBlogTitle] = useState('');
    const [editBlogContent, setEditBlogContent] = useState('');

    const handleAddBlog = () => {
        if (newBlogTitle && newBlogContent) {
            const unique_id = uuid();
            dispatch(addBlog({
                id: unique_id,
                title: newBlogTitle,
                content: newBlogContent,
                category: 'Travel'
            }));

            setNewBlogTitle('');
            setNewBlogContent('');
        }
    };

    const handleEditClick = (blog) => {
        setEditMode(blog.id);
        setEditBlogTitle(blog.title);
        setEditBlogContent(blog.content);
    };

    const handleEditSave = (id) => {
        dispatch(editBlog({ id, updatedBlog: { title: editBlogTitle, content: editBlogContent } }));
        setEditMode(null);
        setEditBlogTitle('');
        setEditBlogContent('');
    };

    const handleEditCancel = () => {
        setEditMode(null);
        setEditBlogTitle('');
        setEditBlogContent('');
    };

    const handleDeleteBlog = (id) => {
        dispatch(deleteBlog(id));
    };

    return (
        <div>
            <div>
                <TextField
                    type='text'
                    variant='outlined'
                    placeholder='Search Blogs'
                    sx={{
                        height: '50px',
                        width: '450px',
                        padding: '12px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    type='text'
                    value={newBlogTitle}
                    variant='outlined'
                    label="Blog Title"
                    onChange={(e) => { setNewBlogTitle(e.target.value) }}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    variant="outlined"
                    label='Blog Content'
                    multiline
                    rows={4}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                />
                <Button variant='contained' color='primary' onClick={handleAddBlog}>Add Blog</Button>
            </div>
            <div>
                {blogs.map(blog => (
                    blog.category === 'Travel' && (
                        <Card key={blog.id} style={{ marginBottom: '10px' }}>
                            <CardContent>
                                {editMode === blog.id ? (
                                    <>
                                        <TextField
                                            type='text'
                                            value={editBlogTitle}
                                            variant='outlined'
                                            label="Blog Title"
                                            onChange={(e) => { setEditBlogTitle(e.target.value) }}
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            value={editBlogContent}
                                            onChange={(e) => setEditBlogContent(e.target.value)}
                                            variant="outlined"
                                            label='Blog Content'
                                            multiline
                                            rows={4}
                                            fullWidth
                                            style={{ marginBottom: "10px" }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant='h5' component="h2">
                                            {blog.title}
                                        </Typography>
                                        <Typography variant='body2' component="p" style={{ marginTop: '10px' }}>
                                            {blog.content}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                            <CardActions>
                                {editMode === blog.id ? (
                                    <>
                                        <IconButton aria-label="save" onClick={() => handleEditSave(blog.id)}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton aria-label="cancel" onClick={handleEditCancel}>
                                            <CancelIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton aria-label="edit" onClick={() => handleEditClick(blog)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteBlog(blog.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    )
                ))}
            </div>
        </div>
    );
};

export default Travel;

