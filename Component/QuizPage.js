import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useColorScheme, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';

const url = process.env.EXPO_PUBLIC_API_URL || '';

export default function QuizPage() {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;

  const route = useRoute();
  // const { levels } = route.params || {};
  const levels = 1;
  const [section, setSection] = useState('');
  const [useremail, setUseremail] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quizquestion, setQuizquestion] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const currentQuestion = quizquestion[currentQuestionIndex];

  useEffect(() => {
    (async () => {
      const uemail = await AsyncStorage.getItem('Email');
      setUseremail(uemail);
    })();
  }, []);

  useEffect(() => {
    if (useremail) {
      fetchUserLevel();
    }
  }, [useremail]);

  useEffect(() => {
    if (section) {
      fetchQuiz();
    }
  }, [section]);

  const fetchUserLevel = () => {
    axios.post(url + 'get-user-avatar', { type: 'getuserdata', useremail })
      .then(response => {
        if (response.status === 200) {
          setSection(response?.data?.level);
        }
      })
      .catch(error => {
        console.log("Avatar error:", error.response?.data || error.message);
      });
  };

  const fetchQuiz = () => {
    setLoading(true);
    axios.post(url + 'quiz', { section, level: levels })
      .then(response => {
        if (response.status === 200) {
          setQuizquestion(response?.data?.questions || []);
        }
      })
      .catch(error => {
        console.log("Quiz error:", error.response?.data || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    setProgress((currentQuestionIndex + 1) / quizquestion.length);

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct_answer,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizquestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsQuizComplete(true);
    }
  };

  const getScore = () => {
    return answers.filter(item => item.selected === item.correct).length;
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? '#ffffff' : '#252525'} />
          <Text style={[styles.loadingText, { color: isDark ? '#fff' : '#000' }]}>Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!quizquestion.length) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
        <View style={styles.emptyContainer}>
          <MaterialIcons name="error-outline" size={48} color={isDark ? '#fff' : '#252525'} />
          <Text style={[styles.emptyText, { color: isDark ? '#fff' : '#000' }]}>
            No quiz questions available.
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchQuiz}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderScoreCard = () => {
    const score = getScore();
    const totalQuestions = quizquestion.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let feedback = '';
    let color = '';
    
    if (percentage >= 90) {
      feedback = 'Excellent!';
      color = '#4CAF50'; // Green
    } else if (percentage >= 70) {
      feedback = 'Great job!';
      color = '#2196F3'; // Blue
    } else if (percentage >= 50) {
      feedback = 'Good effort!';
      color = '#FF9800'; // Orange
    } else {
      feedback = 'Keep practicing!';
      color = '#F44336'; // Red
    }

    return (
      <View style={styles.scoreCardContainer}>
        <View style={[styles.scoreCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[styles.feedbackText, { color }]}>{feedback}</Text>
          <View style={styles.scoreCircleContainer}>
            <View style={[styles.scoreCircle, { borderColor: color }]}>
              <Text style={[styles.scorePercentage, { color }]}>{percentage}%</Text>
            </View>
          </View>
          <Text style={[styles.scoreText, { color: isDark ? '#fff' : '#000' }]}>
            You scored {score} out of {totalQuestions}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#252525' }]}>
            {isQuizComplete ? 'Quiz Results' : `Level ${levels} Quiz`}
          </Text>
          {!isQuizComplete && (
            <View style={styles.progressContainer}>
              <Progress.Bar
                progress={progress}
                width={screenWidth - 80}
                height={8}
                borderRadius={4}
                color={isDark ? '#8e8eff' : '#4a4aff'}
                unfilledColor={isDark ? '#333' : '#e0e0e0'}
                borderColor={isDark ? '#444' : '#ccc'}
              />
              <Text style={[styles.progressText, { color: isDark ? '#ccc' : '#666' }]}>
                {currentQuestionIndex + 1}/{quizquestion.length}
              </Text>
            </View>
          )}
        </View>

        {!isQuizComplete ? (
          <View style={styles.quizContent}>
            <View style={[styles.questionCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
              <Text style={[styles.questionText, { color: isDark ? '#fff' : '#252525' }]}>
                {currentQuestion.question}
              </Text>
              
              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedOption(option)}
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor: selectedOption === option
                          ? isDark ? '#3a3a7a' : '#e6e6ff'
                          : isDark ? '#2a2a2a' : '#f9f9f9',
                        borderColor: selectedOption === option 
                          ? isDark ? '#8e8eff' : '#4a4aff'
                          : isDark ? '#444' : '#ddd',
                      },
                    ]}
                  >
                    <View style={styles.optionContent}>
                      <View style={[
                        styles.optionIndicator, 
                        { 
                          backgroundColor: selectedOption === option 
                            ? isDark ? '#8e8eff' : '#4a4aff' 
                            : 'transparent',
                          borderColor: selectedOption === option
                            ? isDark ? '#8e8eff' : '#4a4aff'
                            : isDark ? '#666' : '#ccc'
                        }
                      ]} />
                      <Text style={[
                        styles.optionText,
                        { 
                          color: selectedOption === option 
                            ? isDark ? '#fff' : '#252525' 
                            : isDark ? '#ddd' : '#555',
                          fontWeight: selectedOption === option ? '600' : 'normal',
                        }
                      ]}>
                        {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!selectedOption}
              style={[
                styles.submitButton,
                { 
                  backgroundColor: selectedOption 
                    ? isDark ? '#8e8eff' : '#4a4aff' 
                    : isDark ? '#444' : '#ccc',
                  opacity: selectedOption ? 1 : 0.7
                },
              ]}
            >
              <Text style={styles.submitButtonText}>
                {currentQuestionIndex === quizquestion.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {renderScoreCard()}

            {showAnswers && (
              <View style={[styles.answersContainer, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
                <Text style={[styles.answersTitle, { color: isDark ? '#fff' : '#252525' }]}>
                  Review Answers
                </Text>
                {answers.map((item, index) => (
                  <View key={index} style={styles.answerItem}>
                    <Text style={[styles.answerQuestion, { color: isDark ? '#fff' : '#252525' }]}>
                      {index + 1}. {item.question}
                    </Text>
                    <View style={styles.answerDetails}>
                      <Text style={[styles.answerLabel, { color: isDark ? '#ccc' : '#666' }]}>
                        Your answer:
                      </Text>
                      <Text style={[
                        styles.answerValue, 
                        { 
                          color: item.selected === item.correct 
                            ? '#4CAF50' 
                            : '#F44336' 
                        }
                      ]}>
                        {item.selected}
                        {' '}
                        {item.selected === item.correct 
                          ? <MaterialIcons name="check-circle" size={16} color="#4CAF50" /> 
                          : <MaterialIcons name="cancel" size={16} color="#F44336" />
                        }
                      </Text>
                    </View>
                    {item.selected !== item.correct && (
                      <View style={styles.answerDetails}>
                        <Text style={[styles.answerLabel, { color: isDark ? '#ccc' : '#666' }]}>
                          Correct answer:
                        </Text>
                        <Text style={[styles.answerValue, { color: '#4CAF50' }]}>
                          {item.correct}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={toggleAnswers}
                style={[
                  styles.secondaryButton, 
                  { 
                    backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
                    borderColor: isDark ? '#444' : '#ddd'
                  }
                ]}
              >
                <Text style={[styles.secondaryButtonText, { color: isDark ? '#fff' : '#252525' }]}>
                  {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('lesson')}
                style={[styles.primaryButton, { backgroundColor: isDark ? '#8e8eff' : '#4a4aff' }]}
              >
                <Text style={styles.primaryButtonText}>Continue to Next Level</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsQuizComplete(false);
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setAnswers([]);
                  setProgress(0);
                  setShowAnswers(false);
                }}
                style={[
                  styles.outlineButton, 
                  { 
                    borderColor: isDark ? '#8e8eff' : '#4a4aff',
                  }
                ]}
              >
                <Text style={[styles.outlineButtonText, { color: isDark ? '#8e8eff' : '#4a4aff' }]}>
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4a4aff',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  quizContent: {
    flex: 1,
  },
  questionCard: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  scoreCardContainer: {
    marginBottom: 24,
  },
  scoreCard: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreCircleContainer: {
    marginVertical: 16,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
  },
  answersContainer: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  answersTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  answerItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  answerQuestion: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  answerDetails: {
    flexDirection: 'row',
    marginTop: 4,
  },
  answerLabel: {
    fontSize: 14,
    marginRight: 8,
    width: 100,
  },
  answerValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 8,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  outlineButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});