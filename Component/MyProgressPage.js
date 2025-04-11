import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Circle } from 'react-native-progress'
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const MyProgressPage = () => {
  const route = useRoute()
  const theme = route.params?.theme || 'Light'

  const currentSection = "Intermediate"
  const currentLevel = 4
  const totalLevels = 5
  const progress = currentLevel / totalLevels
  const isTopUser = progress === 1

  const colors = {
    background: theme === 'Dark' ? '#121212' : '#f2f2f2',
    text: theme === 'Dark' ? '#ffffff' : '#000000',
    card: theme === 'Dark' ? '#1e1e1e' : '#ffffff',
    accent: '#4e79ff',
    badge: '#FFD700'
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
        <Circle
          size={150}
          progress={progress}
          showsText={true}
          formatText={() => `${Math.round(progress * 100)}%`}
          color={colors.accent}
          thickness={10}
          borderWidth={0}
          unfilledColor={theme === 'Dark' ? '#333' : '#e0e0e0'}
        />
        <Text style={[styles.sectionText, { color: colors.text }]}>
          Section: {currentSection}
        </Text>
        <Text style={[styles.levelText, { color: colors.text }]}>
          Level: {currentLevel} of {totalLevels}
        </Text>
        {isTopUser && (
          <View style={styles.badgeContainer}>
            <AntDesign name="star" size={24} color={colors.badge} />
            <Text style={[styles.badgeText, { color: colors.badge }]}>Top Achiever</Text>
          </View>
        )}
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Next Lesson</Text>
        <View style={{flexDirection:'row', alignItems:'center',gap:10}}>
            <AntDesign name="arrowright" size={16} color={colors.accent} />
            <Text style={[styles.infoText, { color: colors.text }]}>
            Level 5: Extended Conversation at a Café
            </Text>
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Lesson Streak</Text>
        <View style={styles.streakRow}>
          {/* <FontAwesome5 name="fire" size={20} color="orange" /> */}
          <AntDesign name="arrowright" size={16} color={colors.accent} />
          <Text style={[styles.infoText, { marginLeft: 8, color: colors.text }]}>
            5 days in a row!
          </Text>
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Achievements</Text>
        <View style={styles.achievementsRow}>
          {/* <MaterialIcons name="emoji-events" size={24} color="#FFD700" /> */}
          <AntDesign name="arrowright" size={16} color={colors.accent} />
          <Text style={[styles.infoText, { marginLeft: 8, color: colors.text }]}>
            Completed Beginner Section
          </Text>
        </View>
        <View style={styles.achievementsRow}>
          {/* <MaterialIcons name="school" size={24} color="#4e79ff" /> */}
          <AntDesign name="arrowright" size={16} color={colors.accent} />
          <Text style={[styles.infoText, { marginLeft: 8, color: colors.text }]}>
            100 Quiz Points Earned
          </Text>
        </View>
      </View>
{/* 
      <View style={[styles.rewardCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Next Reward</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Complete Level 5 to unlock 50 credits and a new avatar!
        </Text>
      </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  sectionText: {
    fontSize: 16,
    marginTop: 12
  },
  levelText: {
    fontSize: 14,
    marginTop: 4
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '600'
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  infoText: {
    fontSize: 14
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  rewardCard: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#4e79ff'
  }
})

export default MyProgressPage