import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface GenreChipProps {
  label: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const GenreChip: React.FC<GenreChipProps> = ({ 
  label, 
  onPress, 
  isSelected = false 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Text 
        style={[
          styles.label, 
          isSelected && styles.selectedLabel
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedContainer: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#fff',
  },
  selectedLabel: {
    color: '#fff',
  },
});

export default GenreChip;