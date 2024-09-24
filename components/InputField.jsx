import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

const InputField = ({
  icon,
  isDisabled,
  isInvalid,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const iconSize = 24;
  const iconGap = 12;

  const styles = {
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 46,
      overflow: 'hidden',
    },
    inputField: {
      minWidth: 0,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#a8bac1',
      paddingLeft: 16,
      paddingRight: 16 + (icon ? iconSize + iconGap : 0),
      fontSize: 16,
      borderRadius: 8,
      backgroundColor: '#ffffff',
      color: '#1c1c1c',
    },
    inputFieldIsInvalid: {
      borderColor: '#e15240',
    },
    inputFieldIsFocus: {
      borderColor: '#169f94',
    },
    inputFieldIsDisabled: {
      backgroundColor: '#edf4f8',
    },
    inputIconWrapper: {
      position: 'absolute',
      top: 0,
      right: 16,
      bottom: 0,
      width: iconSize,
      height: null,
      justifyContent: 'center',
    },
    inputIcon: {
      fontSize: iconSize,
      height: iconSize,
      color: '#829aa3',
    },
    inputIconIsInvalid: {
      color: '#e15240',
    },
    inputIconIsFocus: {
      color: '#169f94',
    },
  };

  return (
    <View style={styles.input}>
      <TextInput
        style={[
          styles.inputField,
          isInvalid && styles.inputFieldIsInvalid,
          isFocus && styles.inputFieldIsFocus,
          isDisabled && styles.inputFieldIsDisabled,
        ]}
        underlineColorAndroid="transparent"
        placeholderTextColor="#829aa3"
        onFocus={(e) => {
          setIsFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);
          onBlur?.(e);
        }}
        editable={!isDisabled}
        {...rest}
      />
      {icon ? (
        <View style={styles.inputIconWrapper} pointerEvents="none">
          {React.cloneElement(icon, {style: [styles.inputIcon, isInvalid && styles.inputIconIsInvalid, isFocus && styles.inputIconIsFocus, icon?.props?.style], pointerEvents: 'none'})}
        </View>
      ) : null}
    </View>
  );
};

export default InputField;