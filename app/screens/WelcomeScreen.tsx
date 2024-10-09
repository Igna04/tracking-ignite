import React, { FC, useEffect, useState } from "react"
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Button, Image, ImageStyle, TextStyle, ViewStyle, Linking } from "react-native"
import Geolocation from "react-native-geolocation-service"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { isRTL } from "../i18n"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    return true
  }

  const startLocationTracking = () => {
    setIsTracking(true) 
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setIsTracking(false) 
      },
      (error) => {
        console.error(error.code, error.message)
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    )
  }

  const handleStartTracking = async () => {
    const hasPermission = await requestLocationPermission()
    if (hasPermission) {
      startLocationTracking()
    } else {
      console.log('Location permission denied')
    }
  }

  const openGoogleMaps = () => {
    if (location) {
      const { latitude, longitude } = location
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      Linking.openURL(url).catch(err => console.error("Error opening Google Maps", err))
    }
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text testID="welcome-heading" style={$welcomeHeading} preset="heading">
          Welcome to my Tracking-Geolocation
        </Text>
        <Text preset="subheading">I will track your location!</Text>
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text size="md">Let’s get started!</Text>

        <Button title="Start Tracking" onPress={handleStartTracking} />

        {isTracking ? (
          <Text>Sedang mencari koordinat terbaru...</Text>
        ) : location ? (
          <>
            <Text>
              Garis Lintang: {location.latitude}, Garis Bujur: {location.longitude}
            </Text>
            <Button title="Open in Google Maps" onPress={openGoogleMaps} />
          </>
        ) : (
          <Text>Tekan tombol untuk memulai pencarian koordinat.</Text> // Tampilkan ketika lokasi belum ada
        )}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
