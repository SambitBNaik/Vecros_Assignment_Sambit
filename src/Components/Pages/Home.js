import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Card, CardContent, Typography, CardActions, IconButton, CardMedia, Collapse, Grid, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';

const Home = () => {
    const blogs = useSelector(state => state.blogs.blogs); 

    const [searchQuery, setSearchQuery] = useState('');
    const [expandedBlogs, setExpandedBlogs] = useState({});

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleExpandClick = (blogId) => {
        setExpandedBlogs(prevState => ({
            ...prevState,
            [blogId]: !prevState[blogId]
        }));
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
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
                            </CardContent>
                            <CardActions>
                             
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
