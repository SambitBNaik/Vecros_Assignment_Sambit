import { createSlice } from "@reduxjs/toolkit";

const loadBlogFromLocalStorage=()=>{
    const savedBlogs=localStorage.getItem('blogs');
    return savedBlogs? JSON.parse(savedBlogs) : [];
};

const saveBlogToLocalStorage=(blogs)=>{
    localStorage.setItem('blogs',JSON.stringify(blogs));
}

const initialState={
    blogs:loadBlogFromLocalStorage(),
    categories:['Technology','Travel','Food','Lifestyle'],
};

const blogSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{
        addBlog:(state,action)=>{
            state.blogs.push(action.payload);
            saveBlogToLocalStorage(state.blogs);
        },
        editBlog:(state,action)=>{
            const{id,updatedBlog}=action.payload;
            const index=state.blogs.findIndex((blog)=>blog.id===id);
            if(index!==-1){
                state.blogs[index]={...state.blogs[index],updatedBlog};
                saveBlogToLocalStorage(state.blogs);
            }
        },
        deleteBlog:(state,action)=>{
            state.blogs=state.blogs.filter((blog)=>blog.id!==action.payload);
            saveBlogToLocalStorage(state.blogs);
        },
    },
});

export const {addBlog,editBlog,deleteBlog}=blogSlice.actions;
export default blogSlice.reducer;