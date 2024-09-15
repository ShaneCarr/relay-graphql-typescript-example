// graphql/resolvers/teamResolvers.ts

let teams = [
    {
        id: '1',
        name: 'Team Alpha',
        activityStatus: {
            hasPersonalMention: true,
            hasChannelMention: false,
            hasTeamMention: false,
            hasUnreadMessage: true,
            isNewForUser: true,
        },
    },
    {
        id: '2',
        name: 'Team Beta',
        activityStatus: {
            hasPersonalMention: false,
            hasChannelMention: true,
            hasTeamMention: true,
            hasUnreadMessage: false,
            isNewForUser: false,
        },
    },
];

// Team resolvers
const teamResolvers = {
    Query: {
        teams: () => teams,
    },
    Mutation: {
        updateTeamStatus: (
            _parent: any,
            { id, hasUnreadMessage }: { id: string; hasUnreadMessage: boolean }
        ) => {
            const team = teams.find((team) => team.id === id);
            if (team) {
                team.activityStatus.hasUnreadMessage = hasUnreadMessage;
            }
            return team;
        },
        markTeamAsRead: (_parent: any, { id }: { id: string }) => {
            const team = teams.find((team) => team.id === id);
            if (team) {
                team.activityStatus.hasUnreadMessage = false;
            }
            return team;
        },
    },
};

export default teamResolvers;
