// ErrorFallback.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        문제가 발생했습니다.
      </Text>
      <Text style={{ fontSize: 14, color: 'gray', marginBottom: 20 }}>
        데이터를 불러오는 중에 오류가 발생했습니다.
      </Text>
      <Button onPress={resetErrorBoundary} title="다시 시도하기" />
    </View>
  );
}

export default ErrorFallback;
