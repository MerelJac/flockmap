import React from 'react';
import { View, Text } from 'react-native';
import AvatarUploader from '../components/AvatarUploader';
import { useUser } from '@/hooks/useUser';

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Profile</Text>
      {user && <AvatarUploader userId={user.id} />}
    </View>
  );
}
