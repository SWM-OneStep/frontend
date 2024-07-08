import { Button, Icon } from '@ui-kitten/components';
import React from 'react';

const GoogleIcon = props => <Icon name="google" {...props} />;

const GoogleLoginButton = ({ onPress }) => {
  return (
    <Button accessoryLeft={GoogleIcon} onPress={onPress}>
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
