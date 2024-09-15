// src/App.tsx

import React from 'react';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { AppTeamQuery } from './__generated__/AppTeamQuery.graphql';
import { AppUpdateTeamStatusMutation } from './__generated__/AppUpdateTeamStatusMutation.graphql';

import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Badge,
  ListItemSecondaryAction,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const TeamQuery = graphql`
  query AppTeamQuery {
    teams {
      id
      name
      activityStatus {
        hasUnreadMessage
      }
    }
  }
`;

const UpdateTeamStatusMutation = graphql`
  mutation AppUpdateTeamStatusMutation(
    $id: ID!
    $hasUnreadMessage: Boolean!
  ) {
    updateTeamStatus(
      id: $id
      hasUnreadMessage: $hasUnreadMessage
    ) {
      id
      activityStatus {
        hasUnreadMessage
      }
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppTeamQuery>(TeamQuery, {});
  const [commitUpdate] = useMutation<AppUpdateTeamStatusMutation>(
      UpdateTeamStatusMutation
  );

  const handleUpdateStatus = (id: string, hasUnreadMessage: boolean) => {
    commitUpdate({
      variables: { id, hasUnreadMessage },
      optimisticResponse: {
        updateTeamStatus: {
          id,
          activityStatus: {
            hasUnreadMessage,
          },
        },
      },
    });
  };

  return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Teams</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <List>
            {data.teams?.map((team) => {
              if (!team) return null; // Ensure team is not null

              const { id, name, activityStatus } = team;
              if (!id || !name || !activityStatus) return null; // Ensure essential fields are present

              return (
                  <ListItem key={id} divider>
                    <ListItemText
                        primary={
                          <Typography
                              variant="h6"
                              style={{
                                fontWeight: activityStatus.hasUnreadMessage
                                    ? 'bold'
                                    : 'normal',
                              }}
                          >
                            {name}
                          </Typography>
                        }
                    />
                    {activityStatus.hasUnreadMessage && (
                        <Badge color="secondary" variant="dot">
                          <MessageIcon color="action" />
                        </Badge>
                    )}
                    <ListItemSecondaryAction>
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateStatus(id, false)}
                          style={{ marginRight: 8 }}
                      >
                        Mark as Read
                      </Button>
                      <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleUpdateStatus(id, true)}
                          style={{ marginRight: 8 }}
                      >
                        Mark as Unread
                      </Button>
                      <Button
                          variant="text"
                          color="secondary"
                          onClick={() => handleUpdateStatus(id, true)}
                      >
                        Simulate New Message
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
              );
            })}
          </List>
        </Container>
      </div>
  );
}

export default App;
