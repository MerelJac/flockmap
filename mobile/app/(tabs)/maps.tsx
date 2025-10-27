import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";

export default function MapScreen() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/locations");
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {groups.map((group) => (
        <Marker
          key={group.id}
          coordinate={{
            latitude: group.latitude,
            longitude: group.longitude,
          }}
          title={group.name}
          description={group.description}
        />
      ))}
    </MapView>
  );
}
