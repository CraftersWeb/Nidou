import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/services/AppContext';

interface Slide {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  features: string[];
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    id: '1',
    stepNumber: '1 / 4',
    badge: 'Bienvenue sur Nidou',
    title: 'L’essentiel scolaire',
    highlight: 'au même endroit.',
    description:
      'Nidou centralise les informations de la scolarité de vos enfants pour remplacer la jungle des applications multiples (PRONOTE, School & Go).',
    iconName: 'sparkles',
    features: [
      'PRONOTE et School & Go réunis',
      'Pensé exclusivement pour les parents',
      'Interface épurée et sans surcharge',
    ],
  },
  {
    id: '2',
    stepNumber: '2 / 4',
    badge: 'Centralisation & Clarté',
    title: 'Toutes les sources',
    highlight: 'enfin rassemblées.',
    description:
      'Plus besoin de jongler entre 3 identifiants et applications différentes. Emploi du temps, devoirs, notes et absences convergent ici.',
    iconName: 'layers-outline',
    features: [
      'Accès cantine & vie scolaire regroupés',
      'Plus de mot de passe oublié chaque matin',
      'Données synchronisées en continu',
    ],
  },
  {
    id: '3',
    stepNumber: '3 / 4',
    badge: 'Visibilité Quotidienne',
    title: 'Une vision limpide',
    highlight: 'de la journée.',
    description:
      'Consultez en un coup d’œil l’emploi du temps du jour : les cours, les salles, les professeurs et les temps de pause.',
    iconName: 'calendar-outline',
    features: [
      'Timeline moderne et intuitive',
      'Indicateur du cours en cours',
      'Anticipation de la fin des cours et pauses',
    ],
  },
  {
    id: '4',
    stepNumber: '4 / 4',
    badge: 'Sérénité Parentale',
    title: 'Devoirs, notes, alertes',
    highlight: 'et informations clés.',
    description:
      'Suivez les devoirs cochés par votre enfant, découvrez les dernières notes avec leurs moyennes et soyez averti des urgences en quelques secondes.',
    iconName: 'shield-checkmark-outline',
    features: [
      'Vérifiez si les devoirs sont cochés par l’élève',
      'Dernières notes et moyennes de classe',
      'Alertes prioritaires (messages, absences)',
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = ONBOARDING_SLIDES[currentIndex];
  const isLast = currentIndex === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.background} />

      {/* Top Header with Brand & Skip Button */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoDot} />
          <Text style={styles.brandName}>Nidou</Text>
        </View>

        {!isLast ? (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleFinish}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{currentSlide.stepNumber}</Text>
          </View>
        )}
      </View>

      {/* Main Slide Content - Fully reactive to currentIndex */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* Visual Graphic Banner */}
        <View style={styles.graphicContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Ionicons
                name={currentSlide.iconName}
                size={48}
                color={Palette.primary}
              />
            </View>
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>{currentSlide.badge}</Text>
          </View>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepCounterRow}>
          <Text style={styles.stepCounterText}>Étape {currentSlide.stepNumber}</Text>
        </View>

        {/* Text Content */}
        <View style={styles.textWrapper}>
          <Text style={styles.headline}>
            {currentSlide.title}{' '}
            <Text style={styles.headlineHighlight}>
              {currentSlide.highlight}
            </Text>
          </Text>

          <Text style={styles.description}>{currentSlide.description}</Text>

          {/* Key Feature Bullets */}
          <View style={styles.featuresContainer}>
            {currentSlide.features.map((feature, idx) => (
              <View key={`${currentSlide.id}-${idx}`} style={styles.featureRow}>
                <View style={styles.featureDot}>
                  <Ionicons
                    name="checkmark"
                    size={13}
                    color={Palette.primary}
                  />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.bottomBar}>
        {/* Pagination Dots (clickable) */}
        <View style={styles.paginationRow}>
          {ONBOARDING_SLIDES.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndex(index)}
                style={[
                  styles.dot,
                  isActive ? styles.dotActive : styles.dotInactive,
                ]}
                activeOpacity={0.7}
              />
            );
          })}
        </View>

        {/* Actions row with optional Previous and Next/Commencer */}
        <View style={styles.actionsRow}>
          {currentIndex > 0 ? (
            <TouchableOpacity
              style={styles.prevButton}
              activeOpacity={0.75}
              onPress={handlePrev}
            >
              <Ionicons name="arrow-back" size={18} color={Palette.primary} />
              <Text style={styles.prevButtonText}>Retour</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 80 }} />
          )}

          <TouchableOpacity
            style={[styles.primaryButton, isLast && styles.primaryButtonFinish]}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {isLast ? 'Commencer' : 'Suivant'}
            </Text>
            <Ionicons
              name={isLast ? 'checkmark-circle' : 'arrow-forward'}
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Palette.primary,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: Palette.primary,
    letterSpacing: -0.5,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  stepBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
  },
  scrollArea: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  innerCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  badgePill: {
    marginTop: -14,
    backgroundColor: Palette.primary,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Palette.surface,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  stepCounterRow: {
    marginBottom: 6,
  },
  stepCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textWrapper: {
    alignItems: 'flex-start',
  },
  headline: {
    fontSize: 27,
    fontWeight: '800',
    color: Palette.textPrimary,
    lineHeight: 34,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  headlineHighlight: {
    color: Palette.primary,
  },
  description: {
    fontSize: 15,
    color: Palette.textSecondary,
    lineHeight: 22,
    marginBottom: 18,
  },
  featuresContainer: {
    gap: 10,
    marginTop: 4,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Palette.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  featureDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textPrimary,
    flex: 1,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: Palette.background,
    borderTopWidth: 1,
    borderTopColor: Palette.borderLight,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: Palette.primary,
  },
  dotInactive: {
    width: 7,
    backgroundColor: Palette.borderStrong,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  prevButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.primary,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonFinish: {
    backgroundColor: '#1E5E4B',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
