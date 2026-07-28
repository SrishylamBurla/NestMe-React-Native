import { api } from "./api";

export const savedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getSavedProperties: builder.query({
      query: () => "/saved",
      providesTags: ["Saved"],
    }),

    // toggleSaveProperty: builder.mutation({
    //   query: (propertyId) => ({
    //     url: `/saved/${propertyId}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: (result, error, propertyId) => [
    //     { type: "Property", id: propertyId },
    //     "Saved",
    //   ],
    // }),

    toggleSaveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/saved/${propertyId}`,
        method: "POST",
      }),

      async onQueryStarted(propertyId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getSavedProperties",
            undefined,
            (draft) => {
              const index = draft.saved.findIndex(
                (item) => item.property._id === propertyId
              );

              if (index >= 0) {
                draft.saved.splice(index, 1);
              } else {
                draft.saved.unshift({
                  _id: Date.now().toString(),
                  property: { _id: propertyId },
                });
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ["Saved"],
    }),

    removeSavedProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/saved/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, propertyId) => [
        { type: "Property", id: propertyId },
        "Saved",
      ],
    }),

  }),
});

export const {
  useGetSavedPropertiesQuery,
  useToggleSavePropertyMutation,
  useRemoveSavedPropertyMutation,
} = savedApi;
