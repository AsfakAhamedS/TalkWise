import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useColorScheme, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'
import { MaterialIcons } from '@expo/vector-icons'
import style from '../style'

const API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export default function QuizPage() {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const screenWidth = Dimensions.get('window').width
  const route = useRoute()
  const { levels } = route.params || {}
  // const levels = 1
  const [section, setSection] = useState('')
  const [useremail, setUseremail] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [quizquestion, setQuizquestion] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const currentQuestion = quizquestion[currentQuestionIndex]

  useEffect(() => {
    (async () => {
      const uemail = await AsyncStorage.getItem('Email')
      setUseremail(uemail)
    })()
  }, [])

  useEffect(() => {
    if (useremail) {
      fetchUserLevel()
    }
  }, [useremail])

  useEffect(() => {
    if (section) {
      fetchQuiz()
    }
  }, [section])

  function fetchUserLevel(){
    axios.post(`${API_URL}get-user-avatar`, { type: 'getuserdata', useremail })
    .then(response => {
      if (response.status === 200) {
        setSection(response?.data?.level)
      }
    })
    .catch(error => {
      console.log("Avatar error:", error.response?.data || error.message)
    })
  }

  function fetchQuiz(){
    setLoading(true)
    axios.post(`${API_URL}quiz`, { section, level: levels })
    .then(response => {
      if (response.status === 200) {
        setQuizquestion(response?.data?.questions || [])
      }
    })
    .catch(error => {
      console.log("Quiz error:", error.response?.data || error.message)
    })
    .finally(() => {setLoading(false)})
  }

  function handleSubmit(){
    setProgress((currentQuestionIndex + 1) / quizquestion.length)
    const updatedAnswers = [...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct_answer,
      },
    ]
    setAnswers(updatedAnswers)
    if (currentQuestionIndex < quizquestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      setIsQuizComplete(true)
    }
  }

  const getScore = () => {
    return answers.filter(item => item.selected === item.correct).length
  }

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers)
  }

  if (loading) {
    return (
      <SafeAreaView style={[style.quiz_container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
        <View style={style.quiz_loadingcontainer}>
          <ActivityIndicator size="large" color={isDark ? '#ffffff' : '#252525'} />
          <Text style={[style.quiz_loadingtext, { color: isDark ? '#fff' : '#000' }]}>Loading quiz...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!quizquestion.length) {
    return (
      <SafeAreaView style={[style.quiz_container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
        <View style={style.quiz_emptycontainer}>
          <MaterialIcons name="error-outline" size={48} color={isDark ? '#fff' : '#252525'} />
          <Text style={[style.quiz_emptytext, { color: isDark ? '#fff' : '#000' }]}>
            No quiz questions available.
          </Text>
          <TouchableOpacity 
            style={style.quiz_retrybutton}
            onPress={fetchQuiz}
          >
            <Text style={style.quiz_retrybuttontext}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const renderScoreCard = () => {
    const score = getScore()
    const totalQuestions = quizquestion.length
    const percentage = Math.round((score / totalQuestions) * 100)
    
    let feedback = ''
    let color = ''
    
    if (percentage >= 90) {
      feedback = 'Excellent!'
      color = '#4CAF50' 
    } else if (percentage >= 70) {
      feedback = 'Great job!'
      color = '#2196F3' 
    } else if (percentage >= 50) {
      feedback = 'Good effort!'
      color = '#FF9800' 
    } else {
      feedback = 'Keep practicing!'
      color = '#F44336'
    }

    return (
      <View style={style.quiz_scorecardcontainer}>
        <View style={[style.quiz_scorecard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          <Text style={[style.quiz_feedbacktext, { color }]}>{feedback}</Text>
          <View style={style.quiz_scorecirclecontainer}>
            <View style={[style.quiz_scorecircle, { borderColor: color }]}>
              <Text style={[style.quiz_scorepercentage, { color }]}>{percentage}%</Text>
            </View>
          </View>
          <Text style={[style.quiz_scoretext, { color: isDark ? '#fff' : '#000' }]}>
            You scored {score} out of {totalQuestions}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[style.quiz_container, { backgroundColor: isDark ? '#121212' : '#f5f5f7' }]}>
      <ScrollView contentContainerStyle={style.quiz_scrollcontent}>
        <View style={style.quiz_header}>
          <Text style={[style.quiz_headertitle, { color: isDark ? '#fff' : '#252525' }]}>
            {isQuizComplete ? 'Quiz Results' : `Level ${levels} Quiz`}
          </Text>
          {!isQuizComplete && (
            <View style={style.quiz_progresscontainer}>
              <Progress.Bar
                progress={progress}
                width={screenWidth - 80}
                height={8}
                borderRadius={4}
                color={isDark ? '#8e8eff' : '#4a4aff'}
                unfilledColor={isDark ? '#333' : '#e0e0e0'}
                borderColor={isDark ? '#444' : '#ccc'}
              />
              <Text style={[style.quiz_progresstext, { color: isDark ? '#ccc' : '#666' }]}>
                {currentQuestionIndex + 1}/{quizquestion.length}
              </Text>
            </View>
          )}
        </View>

        {!isQuizComplete ? (
          <View style={style.quiz_content}>
            <View style={[style.quiz_questioncard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
              <Text style={[style.quiz_questiontext, { color: isDark ? '#fff' : '#252525' }]}>
                {currentQuestion.question}
              </Text>
              
              <View style={style.quiz_optionscontainer}>
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedOption(option)}
                    style={[
                      style.quiz_optionbutton,
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
                    <View style={style.quiz_optioncontent}>
                      <View style={[
                        style.quiz_optionindicator, 
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
                        style.quiz_optiontext,
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
                style.quiz_submitbutton,
                { 
                  backgroundColor: selectedOption 
                    ? isDark ? '#8e8eff' : '#4a4aff' 
                    : isDark ? '#444' : '#ccc',
                  opacity: selectedOption ? 1 : 0.7
                },
              ]}
            >
              <Text style={style.quiz_submitbuttontext}>
                {currentQuestionIndex === quizquestion.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={style.quiz_resultscontainer}>
            {renderScoreCard()}

            {showAnswers && (
              <View style={[style.quiz_answerscontainer, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
                <Text style={[style.quiz_answerstitle, { color: isDark ? '#fff' : '#252525' }]}>
                  Review Answers
                </Text>
                {answers.map((item, index) => (
                  <View key={index} style={style.quiz_answeritem}>
                    <Text style={[style.quiz_answerquestion, { color: isDark ? '#fff' : '#252525' }]}>
                      {index + 1}. {item.question}
                    </Text>
                    <View style={style.quiz_answerdetails}>
                      <Text style={[style.quiz_answerlabel, { color: isDark ? '#ccc' : '#666' }]}>
                        Your answer:
                      </Text>
                      <Text style={[
                        style.quiz_answervalue, 
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
                      <View style={style.quiz_answerdetails}>
                        <Text style={[style.quiz_answerlabel, { color: isDark ? '#ccc' : '#666' }]}>
                          Correct answer:
                        </Text>
                        <Text style={[style.quiz_answervalue, { color: '#4CAF50' }]}>
                          {item.correct}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            <View style={style.quiz_buttonscontainer}>
              <TouchableOpacity
                onPress={toggleAnswers}
                style={[
                  style.quiz_secondarybutton, 
                  { 
                    backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
                    borderColor: isDark ? '#444' : '#ddd'
                  }
                ]}
              >
                <Text style={[style.quiz_secondarybuttontext, { color: isDark ? '#fff' : '#252525' }]}>
                  {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('lesson')}
                style={[style.quiz_primarybutton, { backgroundColor: isDark ? '#8e8eff' : '#4a4aff' }]}
              >
                <Text style={style.quiz_primarybuttontext}>Continue to Next Level</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsQuizComplete(false)
                  setCurrentQuestionIndex(0)
                  setSelectedOption(null)
                  setAnswers([])
                  setProgress(0)
                  setShowAnswers(false)
                }}
                style={[
                  style.quiz_outlinebutton, 
                  { 
                    borderColor: isDark ? '#8e8eff' : '#4a4aff',
                  }
                ]}
              >
                <Text style={[style.quiz_outlinebuttontext, { color: isDark ? '#8e8eff' : '#4a4aff' }]}>
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
