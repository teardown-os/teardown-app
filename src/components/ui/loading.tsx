import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import type { UseQueryResult } from "@tanstack/react-query";
import type { FunctionComponent, PropsWithChildren } from "react";

export type LoadingProps = PropsWithChildren<{
  id?: string;
  text?: string;
  query?: UseQueryResult<any>;
}>;

export const Loading: FunctionComponent<LoadingProps> = (props) => {
  const { children, text, query } = props;

  return (
    <View {...props} style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0000ff" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
      {children}

      <View style={styles.errorContainer}>
        {query?.error != null && (
          <Text style={styles.errorText}>{query.error.message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  text: {
    marginTop: 8,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#ef4444', // equivalent to text-red-500
  },
}); 