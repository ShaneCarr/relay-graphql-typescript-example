// groupMemberResolvers.ts

let groupMembers = [
    {
        groupId: '1',
        members: [
            { id: '1', user: { id: '1', name: 'Shane' }, consumptionHorizon: 1 },
            { id: '2', user: { id: '2', name: 'Geralt of Rivia' }, consumptionHorizon: 0 },
        ],
    },
];

// Group Member resolvers
const groupMemberResolvers = {
    Query: {
        groupMembers: (_parent: any, { groupId }: { groupId: string }) => {
            const group = groupMembers.find(group => group.groupId === groupId);
            return group ? group.members : [];
        },
    },
    Mutation: {
        updateConsumptionHorizon: (_parent: any, { groupId, memberId, horizon }: { groupId: string; memberId: string; horizon: number }) => {
            const group = groupMembers.find(group => group.groupId === groupId);
            if (group) {
                const member = group.members.find(member => member.id === memberId);
                if (member) {
                    member.consumptionHorizon = horizon;
                    return member;
                }
            }
            return null;
        },
    },
};

export default groupMemberResolvers;
