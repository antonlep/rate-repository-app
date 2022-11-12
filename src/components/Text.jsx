import { Text as NativeText, StyleSheet } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorLight: {
    color: theme.colors.textLight,
  },
  colorBackgroundDark: {
    backgroundColor: theme.colors.backgroundDark,
  },
  colorBackgroundPrimary: {
    backgroundColor: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeTopbar: {
    fontSize: theme.fontSizes.topbar,
  },
  fontSizeLarge: {
    fontSize: theme.fontSizes.large,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
})

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'light' && styles.colorLight,
    fontSize === 'large' && styles.fontSizeLarge,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'topbar' && styles.fontSizeTopbar,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'darkBackground' && styles.colorBackgroundDark,
    backgroundColor === 'primary' && styles.colorBackgroundPrimary,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

export default Text
