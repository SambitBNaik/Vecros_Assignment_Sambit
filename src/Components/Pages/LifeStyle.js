import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Card, CardContent, Typography, CardActions, IconButton, CardMedia, Collapse, Grid, Box } from '@mui/material';
import { addBlog, deleteBlog, editBlog } from '../Redux/blogSlice'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { v4 as uuid } from "uuid";
import AddBlogModal from '../Modal/AddBlogModal'; 

const LifeStyle = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs.blogs); 

    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const [newBlogImage, setNewBlogImage] = useState('');
    const [newBlogAuthor, setNewBlogAuthor] = useState('');
    const [newBlogDate, setNewBlogDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Lifestyle');
    const [editMode, setEditMode] = useState(null);
    const [editBlogTitle, setEditBlogTitle] = useState('');
    const [editBlogContent, setEditBlogContent] = useState('');
    const [editBlogImage, setEditBlogImage] = useState('');
    const [editBlogAuthor, setEditBlogAuthor] = useState('');
    const [editBlogDate, setEditBlogDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedBlogs, setExpandedBlogs] = useState({});

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewBlogTitle('');
        setNewBlogContent('');
        setNewBlogImage('');
        setNewBlogAuthor('');
        setNewBlogDate('');
    };

    const handleAddBlog = () => {
        if (newBlogTitle && newBlogContent && newBlogDate) {
            const unique_id = uuid();
            dispatch(addBlog({
                id: unique_id,
                title: newBlogTitle,
                content: newBlogContent,
                image: newBlogImage,
                author: newBlogAuthor,
                date: newBlogDate,
                category: selectedCategory, 
            }));

            handleCloseModal();
        }
    };

    const handleEditClick = (blog) => {
        setEditMode(blog.id);
        setEditBlogTitle(blog.title);
        setEditBlogContent(blog.content);
        setEditBlogImage(blog.image);
        setEditBlogAuthor(blog.author);
        setEditBlogDate(blog.date);
    };

    const handleEditSave = (id) => {
        dispatch(editBlog({
            id,
            updatedBlog: {
                title: editBlogTitle,
                content: editBlogContent,
                image: editBlogImage,
                author: editBlogAuthor,
                date: editBlogDate
            }
        }));
        setEditMode(null);
        setEditBlogTitle('');
        setEditBlogContent('');
        setEditBlogImage('');
        setEditBlogAuthor('');
        setEditBlogDate('');
    };

    const handleEditCancel = () => {
        setEditMode(null);
        setEditBlogTitle('');
        setEditBlogContent('');
        setEditBlogImage('');
        setEditBlogAuthor('');
        setEditBlogDate('');
    };

    const handleDeleteBlog = (id) => {
        dispatch(deleteBlog(id));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleExpandClick = (blogId) => {
        setExpandedBlogs(prevState => ({
            ...prevState,
            [blogId]: !prevState[blogId]
        }));
    };

    const filteredBlogs = blogs.filter(blog => {
        return blog.category === 'Lifestyle' &&
            (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    return (
        <div style={{ padding: '20px',textAlign:'center' }}>
            <Typography variant="h5" gutterBottom>
                LifeStyle Blogs
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={4}>
                <TextField
                    type='text'
                    variant='outlined'
                    placeholder='Search Blogs'
                    value={searchQuery}
                    onChange={handleSearch}
                    fullWidth
                    sx={{
                        marginBottom: '10px',
                        '@media (min-width: 600px)': {
                            width: '400px',
                        },
                        '@media (min-width: 900px)': {
                            width: '500px',
                        },
                    }}
                />
                <Button variant='contained' color='primary' onClick={handleOpenModal} style={{ marginBottom: '20px' }}>
                    Add Blog
                </Button>
            </Box>

            <Grid container spacing={2} justifyContent="center">
                {filteredBlogs.map(blog => (
                    <Grid item key={blog.id} xs={12} sm={6} md={4} display="flex" justifyContent="center">
                        <Card sx={{ width: 345, marginBottom: '20px' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={blog.image}
                                alt={blog.title}
                            />
                            <CardContent>
                                {editMode === blog.id ? (
                                    <>
                                        <TextField
                                            type='text'
                                            value={editBlogTitle}
                                            onChange={(e) => setEditBlogTitle(e.target.value)}
                                            variant='outlined'
                                            label="Blog Title"
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
                                        <TextField
                                            type='text'
                                            value={editBlogImage}
                                            onChange={(e) => setEditBlogImage(e.target.value)}
                                            variant='outlined'
                                            label="Image URL"
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            type='text'
                                            value={editBlogAuthor}
                                            onChange={(e) => setEditBlogAuthor(e.target.value)}
                                            variant='outlined'
                                            label="Author"
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            type='date'
                                            value={editBlogDate}
                                            onChange={(e) => setEditBlogDate(e.target.value)}
                                            variant='outlined'
                                            label="Publication Date"
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {blog.title}
                                        </Typography>
                                        <Collapse in={expandedBlogs[blog.id]} timeout="auto" unmountOnExit>
                                            <Typography variant="body2" color="text.secondary">
                                                {blog.content}
                                            </Typography>
                                        </Collapse>
                                        <IconButton
                                            className={clsx({
                                                'expand': true,
                                                'expandOpen': expandedBlogs[blog.id],
                                            })}
                                            onClick={() => handleExpandClick(blog.id)}
                                            aria-expanded={expandedBlogs[blog.id]}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                        <Typography variant='caption' color='textSecondary' style={{ marginTop: '10px' }}>
                                            By {blog.author} | Published on {blog.date}
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
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            <AddBlogModal
                open={openModal}
                handleClose={handleCloseModal}
                handleAddBlog={handleAddBlog}
                newBlogTitle={newBlogTitle}
                setNewBlogTitle={setNewBlogTitle}
                newBlogContent={newBlogContent}
                setNewBlogContent={setNewBlogContent}
                newBlogImage={newBlogImage}
                setNewBlogImage={setNewBlogImage}
                newBlogAuthor={newBlogAuthor}
                setNewBlogAuthor={setNewBlogAuthor}
                newBlogDate={newBlogDate}
                setNewBlogDate={setNewBlogDate}
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory}
            />
        </div>
    );
};

export default LifeStyle;
