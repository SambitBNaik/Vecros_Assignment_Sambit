
import { createSlice } from "@reduxjs/toolkit";


const loadBlogFromLocalStorage = () => {
    const savedBlogs = localStorage.getItem('blogs');
    return savedBlogs ? JSON.parse(savedBlogs) : [];
};


const saveBlogToLocalStorage = (blogs) => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
};

const initialState = {
    blogs: loadBlogFromLocalStorage(), 
    categories: ['Technology', 'Travel', 'Food', 'Lifestyle'],
    editMode: {}, 
    expandedBlogId: null, 
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        addBlog: (state, action) => {
            state.blogs.push(action.payload);
            saveBlogToLocalStorage(state.blogs);
        },
        editBlog: (state, action) => {
            const { id, updatedBlog } = action.payload;
            const index = state.blogs.findIndex((blog) => blog.id === id);
            if (index !== -1) {
                state.blogs[index] = { ...state.blogs[index], ...updatedBlog };
                saveBlogToLocalStorage(state.blogs);
                state.editMode[id] = false; 
            }
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
            saveBlogToLocalStorage(state.blogs);
            state.editMode[action.payload] = false; 
            if (state.expandedBlogId === action.payload) {
                state.expandedBlogId = null; 
            }
        },
        toggleEditMode: (state, action) => {
            const id = action.payload;
            state.editMode[id] = !state.editMode[id];
        },
        toggleExpandBlog: (state, action) => {
            const id = action.payload;
            state.expandedBlogId = state.expandedBlogId === id ? null : id;
        },
    },
});

export const { addBlog, editBlog, deleteBlog, toggleEditMode, toggleExpandBlog } = blogSlice.actions;
export default blogSlice.reducer;
