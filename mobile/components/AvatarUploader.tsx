import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function AvatarUploader({ userId }: { userId: string }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar() {
    // Ask permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to photos.');
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (result.canceled) return;

    const file = result.assets[0];
    setImageUri(file.uri);
    setUploading(true);

    const fileExt = file.uri.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, {
        uri: file.uri,
        type: file.mimeType ?? 'image/jpeg',
        name: filePath,
      } as any);

    if (uploadError) {
      Alert.alert('Upload failed', uploadError.message);
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId);
      Alert.alert('Success', 'Avatar updated!');
    }
    setUploading(false);
  }

  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      {uploading ? (
        <ActivityIndicator />
      ) : (
        <>
          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
          <Button title="Upload Avatar" onPress={uploadAvatar} />
        </>
      )}
    </View>
  );
}
