import React from 'react'
import {View ,Text} from 'react-native'
interface to_props {
    color ?: string;
    text : string;
    backgroundColor ?: string;
    opacity ?: any;
}

export const Button = (props : to_props ) => {
    const { color, text, opacity, backgroundColor } = props;
  return (
      <Text style={{ padding: 16, backgroundColor: backgroundColor, borderRadius: 50, opacity : opacity,textAlign:'center' ,color: color }}>
          <Text style={{ fontWeight: '500', fontSize: 15,textAlign:'center' }}>
              {text}
          </Text>
      </Text>
  )
}
