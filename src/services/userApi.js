import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: userId => `/users/${userId}`,
    }),

    getUserProperties: builder.query({
      query: userId => `/users/${userId}/properties`,
    }),

    updateProfile: builder.mutation({
      query: data => ({
        url: '/users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateAvatar: builder.mutation({
      query: formData => ({
        url: '/users/avatar',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation({
      query: data => ({
        url: '/users/change-password',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    setPassword: builder.mutation({
      query: body => ({
        url: '/users/set-password',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation({
      query: body => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserPropertiesQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateAvatarMutation,
  useSetPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
