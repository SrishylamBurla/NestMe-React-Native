import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config"

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: "include",

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: [
    "User",
    "Property",
    "Lead",
    "Saved",
    "Notification",
    "Notifications",
    "Subscription",
    "UserLeads",
    "SupportTickets",
    "SupportTicket",
    "AdminSupportTickets",
    "AdminSupportTicket",
    "Agent",
    "Admin",
    "UserLeads",
    "Properties",
    "Subscription",
    "Enquiries",
    "Leads",
    "PendingProperties"

  ],

  endpoints: () => ({}),
});