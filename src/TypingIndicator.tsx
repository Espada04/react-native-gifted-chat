import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useUpdateLayoutEffect } from './hooks/useUpdateLayoutEffect'
import Color from './Color'

interface Props {
  isTyping?: boolean
}

const TypingIndicator = ({ isTyping }: Props) => {
  const { yCoords, heightScale, marginScale } = React.useMemo(
    () => ({
      yCoords: new Animated.Value(200),
      heightScale: new Animated.Value(0),
      marginScale: new Animated.Value(0),
    }),
    [],
  )

  // on isTyping fire side effect
  useUpdateLayoutEffect(() => {
    if (isTyping) {
      slideIn()
    } else {
      slideOut()
    }
  }, [isTyping])

  // side effect
  const slideIn = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }

  // side effect
  const slideOut = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginBottom: marginScale,
        },
      ]}
    >
      {isTyping ? (
        <View
          style={{ marginLeft: 6, marginTop: 7.2 }}
          // TODO: improve this for typing, was changed from TypingAnimation of react-native-typing-animation
          // dotRadius={4}
          // dotMargin={5.5}
          // dotColor={'rgba(0, 0, 0, 0.38)'}
        />
      ) : null}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    width: 45,
    borderRadius: 15,
    backgroundColor: Color.leftBubbleBackground,
  },
})

export default TypingIndicator
