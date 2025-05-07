import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { User } from '@/types';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.watchedCount}</Text>
          <Text style={styles.statLabel}>Watched</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.favGenres.length}</Text>
          <Text style={styles.statLabel}>Favorite Genres</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  memberSince: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#aaa',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#333',
  },
});

export default ProfileHeader;