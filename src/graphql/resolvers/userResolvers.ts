let users = [
    { id: '1', name: 'Shane' },
    { id: '2', name: 'Geralt of Rivia' },
];

// User resolvers
const userResolvers = {
    Query: {
        users: () => users,  // Return all users
        user: (_parent: any, { id }: { id: string }) => users.find(user => user.id === id),  // Get a specific user by ID
    },
    Mutation: {
        createUser: (_parent: any, { id, name }: { id: string; name: string }) => {
            const newUser = { id, name };
            users.push(newUser);
            return newUser;
        },
    },
};

export default userResolvers;
