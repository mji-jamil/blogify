import { actions } from "../actions";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.blog.DATA_FETCHED: {
            return {
                ...state,
                blogs: action.data.blogs,
                loading: false,
            };
        }

        case actions.blog.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.blog.POST_CREATED: {
            return {
                ...state,
                loading: false,
                blogs: [...state.posts, action.data],
            };
        }

        case actions.blog.POST_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: state.posts.filter((item) => item.id !== action.data),
            };
        }

        case actions.post.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };