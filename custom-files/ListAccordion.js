import React from 'react';

import { ListItem, Icon, Avatar } from '@rneui/themed';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

export const ele = () => {
  const [expanded, setExpanded] = React.useState('false');
  return (
    <ListItem.Accordion
      content={
        <>
          <Icon name="place" size={30} />
          <ListItem.Content>
            <ListItem.Title>List Accordion</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
};
