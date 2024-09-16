import userResolvers from './userResolvers';
import groupMemberResolvers from './groupMemberResolvers';
import { Group, Message, Member } from './types';

// Mock data: Witcher-themed groups
let groups: Group[] = [
    {
        id: '1',
        name: 'Kaer Morhen',
        threads: [
            {
                id: '1',
                title: 'Monster Hunting Strategies',
                messages: [
                    {
                        id: '1',
                        text: 'Any advice for fighting a Leshen?',
                        author: { id: '1', name: 'Geralt' },  // Author is a User, no consumptionHorizon needed
                        arrivalTime: '2023-09-14T10:00:00Z',
                        mentions: [],  // This will be Member[], an empty array initially
                    },
                ],
            },
        ],
        members: [],  // You explicitly define the members array here
    },
];


// Step 1: Define Query Resolvers
const groupQueryResolvers = {
    groups: () => groups,  // This returns the Witcher-themed groups
};

// Step 2: Define Mutation Resolvers
const groupMutationResolvers = {
    addMessageToThread: (
        _parent: any,
        { threadId, text, authorId, mentions }: { threadId: string, text: string, authorId: string, mentions: string[] }
    ) => {
        const group = groups.find(group => group.threads.find(thread => thread.id === threadId));
        if (group) {
            const thread = group.threads.find(thread => thread.id === threadId);
            if (thread) {
                // Fetch the author as a User
                const author = userResolvers.Query.user(null, { id: authorId });
                if (!author) {
                    throw new Error(`Author with ID ${authorId} not found`);
                }

                // Resolve mentions as Member[] (users within the context of a group)
                const resolvedMentions: Member[] = mentions.map(id => {
                    const mentionedMember = groupMemberResolvers.Query.groupMembers(null, { groupId: group.id })
                        .find((member: Member) => member.user.id === id);
                    if (!mentionedMember) {
                        throw new Error(`Mentioned member with ID ${id} not found`);
                    }
                    return mentionedMember;
                });

                // Create the new message with a User as the author and Member[] as mentions
                const newMessage: Message = {
                    id: `${thread.messages.length + 1}`,
                    text,
                    author: { id: author.id, name: author.name },  // Author is a User
                    arrivalTime: new Date().toISOString(),
                    mentions: resolvedMentions,  // Mentions are Members
                };

                thread.messages.push(newMessage);
                return newMessage;
            }
        }
        return null;
    },
};

// Step 3: Define nested resolvers for Group, Thread, Message, and Member
const groupTypeResolvers = {
    Group: {
        members: (parent: any) => groupMemberResolvers.Query.groupMembers(null, { groupId: parent.id }),  // Resolve group members
        threads: (parent: any) => parent.threads,  // Resolve threads for a group
    },
    Thread: {
        messages: (parent: any) => parent.messages,  // Resolve messages for a thread
    },
    Message: {
        author: (parent: any) => parent.author,  // Resolve author for a message (as User)
        mentions: (parent: any) => parent.mentions,  // Resolve mentions for a message (as Member[])
    },
    Member: {
        name: (parent: any) => parent.user.name,  // Resolve member's name from the User object
        consumptionHorizon: (parent: any) => parent.consumptionHorizon,  // Resolve member's consumption horizon
    },
};

// Step 4: Export the resolvers manually
const groupResolvers = {
    Query: groupQueryResolvers,
    Mutation: groupMutationResolvers,
    ...groupTypeResolvers,  // Spread the type-specific resolvers
};

export default groupResolvers;
