import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddBlogModal = ({
    open,
    handleClose,
    handleAddBlog,
    newBlogTitle,
    setNewBlogTitle,
    newBlogContent,
    setNewBlogContent,
    newBlogImage,
    setNewBlogImage,
    newBlogAuthor,
    setNewBlogAuthor,
    newBlogDate,
    setNewBlogDate,
    selectedCategory,
    setSelectedCategory
}) => {
    const categories = ['Technology', 'Travel', 'Food', 'Lifestyle'];

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="add-blog-dialog">
            <DialogTitle id="add-blog-dialog-title">Add a New Blog</DialogTitle>
            <DialogContent dividers>
                <TextField
                    type='text'
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    variant='outlined'
                    label="Blog Title"
                    fullWidth
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
                <TextField
                    type='text'
                    value={newBlogImage}
                    onChange={(e) => setNewBlogImage(e.target.value)}
                    variant='outlined'
                    label="Image URL"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    type='text'
                    value={newBlogAuthor}
                    onChange={(e) => setNewBlogAuthor(e.target.value)}
                    variant='outlined'
                    label="Author"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    type='date'
                    value={newBlogDate}
                    onChange={(e) => setNewBlogDate(e.target.value)}
                    variant='outlined'
                    label="Publication Date"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        label="Category"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddBlog} color="primary">
                    Add Blog
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBlogModal;

