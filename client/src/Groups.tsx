// src/Groups.tsx

import React from 'react';
import {
    graphql,
    useLazyLoadQuery,
    useMutation,
} from 'react-relay/hooks';
import { AppGroupQuery } from './__generated__/AppGroupQuery.graphql';
import { AppMarkMessageSeenMutation } from './__generated__/AppMarkMessageSeenMutation.graphql';
import {
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Container,
} from '@mui/material';

const GroupQuery = graphql`
  query AppGroupQuery {
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

const MarkMessageSeenMutation = graphql`
  mutation AppMarkMessageSeenMutation($groupId: ID!, $memberId: ID!, $messageId: Int!) {
    markMessageAsSeen(groupId: $groupId, memberId: $memberId, messageId: $messageId) {
      id
      consumptionHorizon
    }
  }
`;

function Groups() {
    const data = useLazyLoadQuery(AppGroupQuery, {});
    const [commitMarkAsSeen] = useMutation(AppMarkMessageSeenMutation);

    const markMessageAsSeen = (groupId: string, memberId: string, messageId: number) => {
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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Groups</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <List>
                    {data.groups?.map((group) => (
                        <div key={group.id}>
                            <Typography variant="h6">{group.name}</Typography>
                            <List>
                                {group.threads.map((thread) => (
                                    <div key={thread.id}>
                                        <Typography variant="subtitle1">{thread.title}</Typography>
                                        <List>
                                            {thread.messages.map((message) => (
                                                <ListItem key={message.id} divider>
                                                    <ListItemText
                                                        primary={`${message.text}`}
                                                        secondary={`Sent at: ${message.arrivalTime}`}
                                                    />
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
