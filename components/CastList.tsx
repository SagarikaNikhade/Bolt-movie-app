import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Cast } from '@/types';
import { getProfileUrl } from '@/utils/api';

interface CastListProps {
  cast: Cast[];
}

const CastList: React.FC<CastListProps> = ({ cast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.castItem}>
            <Image
              source={{ uri: getProfileUrl(item.profile_path) }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={styles.actorName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.character} numberOfLines={1}>
              {item.character}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  castItem: {
    width: 100,
    marginRight: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  actorName: {
    fontFamily: 'Inter-Medium',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  character: {
    fontFamily: 'Inter-Regular',
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CastList;