// src/Groups.tsx

import React from 'react';

// Import the `graphql` function to define Relay queries and mutations
// and hooks for data fetching (`useLazyLoadQuery`) and performing mutations (`useMutation`).
import {
    graphql,
    useLazyLoadQuery,  // Hook for fetching GraphQL data on demand
    useMutation,       // Hook for executing mutations (e.g., updating data on the server)
} from 'react-relay/hooks';

// Type-only import for the generated query type.
// This helps TypeScript ensure that the response returned by the query matches the expected structure of `GroupsQuery`.
// It will enforce that we are correctly using the data returned by the GraphQL server in the component.
import type { GroupsQuery } from './__generated__/GroupsQuery.graphql';

// Type-only import for the generated mutation type.
// It ensures that when we perform the mutation, the arguments and the response follow the correct types as defined in the schema.
import type { GroupsMarkMessageSeenMutation } from './__generated__/GroupsMarkMessageSeenMutation.graphql';

// UI components from Material-UI (used to structure and style the UI)
import {
    AppBar,        // Material-UI component for the top bar, usually used for navigation.
    Toolbar,       // Container for AppBar content, typically holds buttons, titles, etc.
    Typography,    // Used to render text with predefined styles (e.g., headings, subtitles).
    List,          // A Material-UI component that renders a vertical list of items.
    ListItem,      // Represents a single item in a list.
    ListItemText,  // Used inside ListItem to display primary and secondary text (title and subtitle).
    Button,        // Material-UI button component with built-in styling.
    Container,     // A layout component that provides padding and centers content.
} from '@mui/material';

// Define the GraphQL query using the `graphql` function from Relay.
// This query fetches groups along with their members, threads, and messages.
const GroupQuery = graphql`
  query GroupsQuery {
    groups {
      id
      name
      members {
        id
        name
        consumptionHorizon
      }
      threads {
        id
        title
        messages {
          id
          text
          arrivalTime
          mentions {
            id
            name
          }
        }
      }
    }
  }
`;

// Define the mutation using the `graphql` function from Relay.
// This mutation marks a message as "seen" for a particular member in a group.
const GroupsMarkMessageSeenMutation = graphql`
  mutation GroupsMarkMessageSeenMutation($groupId: ID!, $memberId: ID!, $messageId: Int!) {
    markMessageAsSeen(groupId: $groupId, memberId: $memberId, messageId: $messageId) {
      id
      consumptionHorizon
    }
  }
`;

function Groups() {
    // `useLazyLoadQuery` is a Relay hook that fetches data on demand based on the query definition.
    // It takes two parameters: the query (here `GroupQuery`) and the query variables (here an empty object `{}`).
    // The hook returns the data from the server and enforces the structure of the response to match `GroupsQuery`.
    const data = useLazyLoadQuery<GroupsQuery>(GroupQuery, {});

    // `useMutation` is a Relay hook used to execute mutations.
    // It takes the mutation (here `GroupsMarkMessageSeenMutation`) and provides a function (`commitMarkAsSeen`)
    // that can be used to trigger the mutation.
    // The mutation type `GroupsMarkMessageSeenMutation` ensures that TypeScript enforces correct variables and responses.
    const [commitMarkAsSeen] = useMutation<GroupsMarkMessageSeenMutation>(GroupsMarkMessageSeenMutation);

    // Function to execute the mutation and mark a message as seen.
    // It takes the groupId, memberId, and messageId as parameters and calls `commitMarkAsSeen`.
    const markMessageAsSeen = (groupId: string, memberId: string, messageId: number) => {
        // `commitMarkAsSeen` sends the mutation to the server and updates the local Relay store.
        // `variables` contains the input arguments for the mutation.
        // `optimisticResponse` is an optional parameter that simulates the server response before the actual result comes back.
        // This is useful for making the UI feel more responsive by updating it immediately.
        commitMarkAsSeen({
            variables: { groupId, memberId, messageId },
            optimisticResponse: {
                markMessageAsSeen: {
                    id: memberId,
                    consumptionHorizon: messageId,
                },
            },
        });
    };

    return (
        <div>
            {/* AppBar is a Material-UI component for creating an application bar at the top of the screen.
                Here it's used to display a navigation header with the text "Groups". */}
            <AppBar position="static">
                <Toolbar>  {/* Toolbar wraps the content inside the AppBar, often used to contain buttons, titles, etc. */}
                    <Typography variant="h6">Groups</Typography>  {/* Typography displays styled text, here as a heading (h6) */}
                </Toolbar>
            </AppBar>

            {/* Container is a layout component from Material-UI that centers the content and adds padding */}
            <Container>
                {/* List is a Material-UI component that renders a vertical list of items.
                    Here, it lists all the groups retrieved from the GraphQL query */}
                <List>
                    {/* Check if `data.groups` is available and map through it to render each group */}
                    {data.groups?.map((group) => (
                        <div key={group.id}>
                            <Typography variant="h6">{group.name}</Typography> {/* Display the group name in a heading */}
                            <List>
                                {/* Map through each thread in the group */}
                                {group.threads.map((thread) => (
                                    <div key={thread.id}>
                                        <Typography variant="subtitle1">{thread.title}</Typography> {/* Display thread title as a subtitle */}
                                        <List>
                                            {/* Map through the messages in the thread */}
                                            {thread.messages.map((message) => (
                                                <ListItem key={message.id} divider> {/* Each message is a list item, with a divider between items */}
                                                    {/* ListItemText displays the message text and the time it was sent */}
                                                    <ListItemText
                                                        primary={`${message.text}`}  {/* The main message content */}
                                                        secondary={`Sent at: ${message.arrivalTime}`}  {/* Secondary text showing the arrival time */}
                                                    />
                                                    {/* Button to mark the message as seen.
                                                        When clicked, it calls `markMessageAsSeen` with the groupId, memberId, and messageId */}
                                                    <Button onClick={() => markMessageAsSeen(group.id, 'currentMemberId', parseInt(message.id))}>
                                                        Mark as Seen
                                                    </Button>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                ))}
                            </List>
                        </div>
                    ))}
                </List>
            </Container>
        </div>
    );
}

export default Groups;
