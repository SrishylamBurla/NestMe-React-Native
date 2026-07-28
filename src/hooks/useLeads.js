// hooks/useLeads.js

export default function useLeads(role, agentId) {
    if (role === "admin") {
        return useGetAllLeadsQuery();
    }

    if (role === "agent") {
        return useGetAgentLeadsQuery(agentId);
    }

    return useGetUserLeadsQuery();
}