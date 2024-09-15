import userResolvers from './userResolvers';

let groups = [
    {
        id: '1',
        name: 'Group Alpha',
        threads: [
            {
                id: '1',
                title: 'General Chat',
                messages: [
                    { id: '1', text: 'Hello!', author: { id: '1', name: 'Shane' }, arrivalTime: '2023-09-14T10:00:00Z', mentions: [] },
                    { id: '2', text: 'Hey @geraltofrivia, how was your weekend?', author: { id: '1', name: 'Shane' }, arrivalTime: '2023-09-14T10:05:00Z', mentions: [{ id: '2', name: 'Geralt of Rivia' }] },
                ],
            },
        ],
    },
];

// Group resolvers
const groupResolvers = {
    Mutation: {
        addMessageToThread: (_parent: any, { threadId, text, authorId, mentions }: { threadId: string; text: string; authorId: string; mentions: string[] }) => {
            const group = groups.find(group => group.threads.find(thread => thread.id === threadId));
            if (group) {
                const thread = group.threads.find(thread => thread.id === threadId);
                if (thread) {
                    // Check if author exists
                    const author = userResolvers.Query.user(null, { id: authorId });
                    if (!author) {
                        throw new Error(`Author with ID ${authorId} not found`);
                    }

                    // Resolve mentions and check if all mentions are valid
                    const resolvedMentions = mentions.map(id => {
                        const mentionedUser = userResolvers.Query.user(null, { id });
                        if (!mentionedUser) {
                            throw new Error(`Mentioned user with ID ${id} not found`);
                        }
                        return { id: mentionedUser.id, name: mentionedUser.name };
                    });

                    // Create the new message with a valid author and mentions
                    const newMessage = {
                        id: `${thread.messages.length + 1}`,
                        text,
                        author: { id: author.id, name: author.name },  // Validated author
                        arrivalTime: new Date().toISOString(),
                        mentions: resolvedMentions,  // Validated mentions
                    };

                    thread.messages.push(newMessage);
                    return newMessage;
                }
            }
            return null;
        },
    },
};

export default groupResolvers;
