export type HomeworkStatus = 'todo' | 'in_progress' | 'completed';

export type AlertType = 'message' | 'homework' | 'absence' | 'grade' | 'canteen';

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  grade: string; // e.g., "5e B"
  schoolName: string;
  avatarUrl?: string;
  colorSchemeKey?: string;
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  subject: string;
  startTime: string; // "08:00"
  endTime: string;   // "09:00"
  room: string;
  teacher: string;
  isBreak?: boolean;
  notes?: string;
  status?: 'past' | 'current' | 'upcoming';
  color?: string;
}

export interface DaySchedule {
  date: string; // "2026-09-04"
  label: string; // "Aujourd'hui", "Demain", "Lundi 8 sept."
  fullDateFormatted: string; // "Vendredi 4 septembre"
  courses: Course[];
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string; // "2026-09-05"
  dueDateLabel: string; // "Pour demain", "Pour vendredi"
  status: HomeworkStatus;
  checkedByStudent: boolean; // Indique si l'élève l'a coché comme fait sur PRONOTE
  checkedAtLabel?: string;   // Ex: "Coché hier à 17:45"
  estimatedMinutes?: number;
  source: 'PRONOTE' | 'School & Go';
  childId: string;
}

export interface GradeItem {
  id: string;
  subject: string;
  title: string;          // Ex: "Contrôle - L'Empire Carolingien"
  grade: number;          // Ex: 17
  outOf: number;          // Ex: 20
  classAverage: number;   // Ex: 13.5
  minGrade: number;       // Ex: 8
  maxGrade: number;       // Ex: 19
  coefficient: number;    // Ex: 2
  date: string;           // Ex: "02 sept."
  period: string;         // Ex: "Trimestre 1"
  childId: string;
  comment?: string;       // Ex: "Très bonne copie, continue ainsi."
  color?: string;
}

export interface SubjectSummary {
  subject: string;
  average: number;
  classAverage: number;
  gradesCount: number;
  color: string;
}

// School & Go Specific Models
export interface CanteenMenu {
  date: string;
  dayLabel: string;
  starter: string;
  mainCourse: string;
  sideDish: string;
  dairy: string;
  dessert: string;
  labels: string[]; // e.g. ["Bio", "Fait Maison", "Produit Local"]
}

export interface CanteenAccount {
  balance: number;           // Solde restant en € (ex: 34.80)
  mealsRemaining: number;    // Nombre de repas (ex: 8)
  bookedToday: boolean;      // Réservé pour aujourd'hui
  lastScanTime?: string;     // Ex: "Validé au self à 12:14"
  cardNumber: string;        // Ex: "VH-2026-8842"
  pricePerMeal: number;      // 4.35 €
}

export interface AfterSchoolActivity {
  id: string;
  title: string;             // "Étude surveillée" ou "Garderie"
  timeSlot: string;          // "16h30 - 17h30"
  location: string;          // "Salle d'étude 02"
  supervisor: string;        // "M. Gomez"
  isEnrolledToday: boolean;  // Inscrit ce jour
  pickupAuthorization: string; // "Sortie autonome autorisée"
}

export interface SchoolTransport {
  lineName: string;          // "Ligne S-14 (Circuit Collège)"
  stopName: string;          // "Arrêt Mairie / Place Centrale"
  morningDeparture: string;  // "07:42"
  eveningDropoff: string;    // "17:48"
  driverAlert?: string;      // "Trafic fluide"
}

export interface SchoolGoData {
  canteenAccount: CanteenAccount;
  menus: CanteenMenu[];
  todayMenu: CanteenMenu;
  afterSchool: AfterSchoolActivity;
  transport: SchoolTransport;
}

export interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  subtitle: string;
  timestamp: string; // "Il y a 25 min", "14:30"
  badgeText: string;
  priority: 'high' | 'medium' | 'normal';
  read: boolean;
  childId: string;
  actionDetails?: string;
}

export interface SchoolSource {
  id: string;
  name: 'PRONOTE' | 'School & Go' | 'Toutatice' | 'MonBureauNumerique';
  connected: boolean;
  lastSync: string;
  accountName: string;
  iconName: string;
  color: string;
  description: string;
}
