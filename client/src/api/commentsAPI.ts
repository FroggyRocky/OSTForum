import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreateCommentData} from "./apiTypes";
import {serverURL} from "./URL";
import {updateArticleComments} from "../redux/articles/articlesSlice";

export const commentsAPI = createApi({
    reducerPath: 'api',
    tagTypes: ['Comments'],
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,

    }),
    endpoints: (build) => ({
        getArticleComments: build.query({
            query: (articleId: number) => `/get-article-comments/${articleId}`,
            providesTags:['Comments'],
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(updateArticleComments(data))
                } catch (e) {
                    console.log('error' + e)
                }
            }
        }),
        createComment: build.mutation({
            query: (commentData: ICreateCommentData) => ({
                url: '/create-comment',
                method: 'POST',
                headers: {
                    'xxx-auth-token': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
                },
                body: commentData,
                responseHandler: (response) => response.text(),
            }),
            invalidatesTags:['Comments']
        }),
        deleteComment: build.mutation({
            query: (commentId: number) => ({
                url: `/delete-comment/${commentId}`,
                headers: {
                    'xxx-auth-token': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
                },
                method: 'DELETE',
                responseHandler: (response) => response.text(),
            }),
            invalidatesTags:['Comments']
        })
    })
})


export const {useCreateCommentMutation, useDeleteCommentMutation, useGetArticleCommentsQuery} = commentsAPI