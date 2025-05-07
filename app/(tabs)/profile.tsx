import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, Settings, Heart, Film, Clock, Calendar } from 'lucide-react-native';
import ProfileHeader from '@/components/ProfileHeader';
import GenreChip from '@/components/GenreChip';
import { User } from '@/types';

// Mock user data
const mockUser: User = {
  name: 'Jane Thompson',
  avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
  watchedCount: 42,
  favGenres: ['Science Fiction', 'Drama', 'Thriller'],
  memberSince: 'January 2024'
};

export default function ProfileScreen() {
  const renderProfileSection = (
    title: string, 
    icon: React.ReactNode, 
    subtitle?: string
  ) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.sectionItem}>
      <View style={styles.sectionLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={mockUser} />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Favorite Genres</Text>
          <View style={styles.genreContainer}>
            {mockUser.favGenres.map((genre, index) => (
              <GenreChip 
                key={index} 
                label={genre} 
                isSelected={true}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Account</Text>
          {renderProfileSection(
            'Watch History', 
            <Clock size={18} color="#fff" />, 
            'See what you\'ve watched'
          )}
          {renderProfileSection(
            'My Collection', 
            <Film size={18} color="#fff" />, 
            'All your favorite movies'
          )}
          {renderProfileSection(
            'Preferences', 
            <Heart size={18} color="#fff" />, 
            'Update your interests'
          )}
          {renderProfileSection(
            'Subscription', 
            <Calendar size={18} color="#fff" />, 
            'Manage your plan'
          )}
          {renderProfileSection(
            'Settings', 
            <Settings size={18} color="#fff" />, 
            'Account settings and privacy'
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#fff',
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});