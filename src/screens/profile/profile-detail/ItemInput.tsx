import React from 'react'
import { Text, TextInput, View } from 'react-native'

interface ItemInputProps {
    title ?: string,
    placeholder ?: string
}

export const ItemInput = (props: ItemInputProps) => {

    const {
        title,
        placeholder
    } = props
  return (
      <View style={{ gap: 10 }}>
          <Text>
              {title}
          </Text>
          <TextInput
              style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 0.5, borderColor: '#8C96A6' }}
              placeholder={placeholder}
          />
      </View>
  )
}
