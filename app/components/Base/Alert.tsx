import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
  ViewProps,
  TextStyle,
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import { useTheme } from '../../util/theme';

export enum AlertType {
  Info = 'Info',
  Warning = 'Warning',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Error = 'Error',
}

interface Props {
  type: AlertType;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
  renderIcon?: () => ReactNode;
  onPress?: () => void;
  onDismiss?: () => void;
  children?: ReactNode | ((textStyle: StyleProp<TextStyle>) => ReactNode);
}

// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStyles = (colors: any) =>
  StyleSheet.create({
    base: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
    },
    baseSmall: {
      paddingVertical: 8,
    },
    info: {
      backgroundColor: colors.primary.muted,
      borderColor: colors.primary.default,
    },
    warning: {
      backgroundColor: colors.warning.muted,
      borderColor: colors.warning.default,
    },
    error: {
      backgroundColor: colors.error.muted,
      borderColor: colors.error.default,
    },
    closeIcon: {
      color: colors.text.default,
    },
    baseTextStyle: { fontSize: 14, flex: 1, lineHeight: 17 },
    textInfo: { color: colors.text.default },
    textWarning: { color: colors.text.default },
    textError: { color: colors.text.default },
    textIconStyle: { marginRight: 12 },
    iconWrapper: {
      alignItems: 'center',
    },
  });

const getAlertStyles: (
  alertType: AlertType,
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles: StyleSheet.NamedStyles<any>,
) => [StyleProp<ViewStyle>, StyleProp<TextStyle>] = (alertType, styles) => {
  switch (alertType) {
    case AlertType.Warning: {
      return [
        styles.warning,
        { ...styles.textWarning, ...styles.baseTextStyle },
      ];
    }
    case AlertType.Error: {
      return [styles.error, { ...styles.textError, ...styles.baseTextStyle }];
    }
    case AlertType.Info:
    default: {
      return [styles.info, { ...styles.textInfo, ...styles.baseTextStyle }];
    }
  }
};

/**
 * @deprecated The `<Alert />` component has been deprecated in favor of the new `<BannerAlert>` component from the component-library.
 * Please update your code to use the new `<BannerAlert>` component instead, which can be found at app/component-library/components/Banners/Banner/variants/BannerAlert/BannerAlert.tsx.
 * You can find documentation for the new BannerAlert component in the README:
 * {@link https://github.com/MetaMask/metamask-mobile/tree/main/app/component-library/components/Banners/Banner/variants/BannerAlert}
 * If you would like to help with the replacement of the old Alert component, please submit a pull request against this GitHub issue:
 * {@link https://github.com/MetaMask/metamask-mobile/issues/6889}
 */
const Alert = ({
  type = AlertType.Info,
  small,
  renderIcon,
  style,
  onPress,
  onDismiss,
  children,
  ...props
}: Props) => {
  const Wrapper:
    | React.ComponentType<TouchableOpacityProps>
    | React.ComponentType<ViewProps> = onPress ? TouchableOpacity : View;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [wrapperStyle, textStyle] = getAlertStyles(type, styles);

  return (
    <Wrapper
      style={[styles.base, small && styles.baseSmall, wrapperStyle, style]}
      onPress={onPress}
      {...props}
    >
      {renderIcon && <View style={styles.iconWrapper}>{renderIcon()}</View>}
      {typeof children === 'function' ? (
        children(textStyle)
      ) : (
        <Text
          small={small}
          style={[textStyle, !!renderIcon && styles.textIconStyle]}
        >
          {children}
        </Text>
      )}
      {onDismiss && (
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            onPress={onDismiss}
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          >
            {
              // All this component is deprecated so it should be replaced and removed
              <IonicIcon name="close" style={styles.closeIcon} size={30} />
            }
          </TouchableOpacity>
        </View>
      )}
    </Wrapper>
  );
};

export default Alert;
