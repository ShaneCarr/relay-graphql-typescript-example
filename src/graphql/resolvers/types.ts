// User represents a person, independent of groups
export interface User {
    id: string;
    name: string;
}

// Member represents a user in the context of a group, with group-specific data
export interface Member {
    user: User;  // Composition: Member contains a User object
    consumptionHorizon: number;  // This is specific to group membership
}

export interface Message {
    id: string;
    text: string;
    author: User;  // Now using User for the author (not Member)
    arrivalTime: string;
    mentions: Member[];  // Mentions are members (users tied to a group)
}

export interface Thread {
    id: string;
    title: string;
    messages: Message[];  // An array of Message objects
}

export interface Group {
    id: string;
    name: string;
    threads: Thread[];  // An array of Thread objects
    members: Member[];   // An array of Member objects, tied to the group
}
