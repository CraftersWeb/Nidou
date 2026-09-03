import React from 'react';
import { Redirect } from 'expo-router';
import { useApp } from '@/services/AppContext';

export default function Index() {
  const { hasCompletedOnboarding } = useApp();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
