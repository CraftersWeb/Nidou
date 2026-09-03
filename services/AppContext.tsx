import React, { createContext, useContext, useState } from 'react';
import {
  Child,
  Homework,
  HomeworkStatus,
  AlertItem,
  SchoolSource,
  DaySchedule,
  Parent,
  GradeItem,
  SubjectSummary,
  SchoolGoData,
} from '@/types';
import {
  mockParent,
  mockChildren,
  mockScheduleDays,
  mockHomeworks,
  mockAlerts,
  mockSchoolSources,
  mockGrades,
  mockSubjectSummaries,
  mockGeneralStats,
  mockSchoolGoData,
} from '@/data/mockData';

interface AppContextType {
  parent: Parent;
  childrenList: Child[];
  selectedChild: Child;
  selectChild: (id: string) => void;
  addNewChild: (name: string, grade: string, school: string) => void;
  homeworks: Homework[];
  grades: GradeItem[];
  subjectSummaries: SubjectSummary[];
  generalStats: typeof mockGeneralStats;
  schoolGoData: SchoolGoData;
  schedules: DaySchedule[];
  alerts: AlertItem[];
  markAlertAsRead: (id: string) => void;
  sources: SchoolSource[];
  triggerSync: (sourceId?: string) => Promise<void>;
  isSyncing: boolean;
  activeFilter: HomeworkStatus | 'all';
  setActiveFilter: (filter: HomeworkStatus | 'all') => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parent] = useState<Parent>(mockParent);
  const [childrenList, setChildrenList] = useState<Child[]>(mockChildren);
  const [selectedChildId, setSelectedChildId] = useState<string>(mockChildren[0].id);
  const [homeworks] = useState<Homework[]>(mockHomeworks);
  const [grades] = useState<GradeItem[]>(mockGrades);
  const [subjectSummaries] = useState<SubjectSummary[]>(mockSubjectSummaries);
  const [generalStats] = useState(mockGeneralStats);
  const [schoolGoData] = useState<SchoolGoData>(mockSchoolGoData);
  const [schedules] = useState<DaySchedule[]>(mockScheduleDays);
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [sources, setSources] = useState<SchoolSource[]>(mockSchoolSources);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<HomeworkStatus | 'all'>('all');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const selectedChild =
    childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  const selectChild = (id: string) => {
    setSelectedChildId(id);
  };

  const addNewChild = (name: string, grade: string, school: string) => {
    const newId = `child_${Date.now()}`;
    const newChild: Child = {
      id: newId,
      firstName: name.trim(),
      lastName: parent.lastName,
      grade: grade.trim(),
      schoolName: school.trim(),
      colorSchemeKey: '#286E58',
    };
    setChildrenList((prev) => [...prev, newChild]);
    setSelectedChildId(newId);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((al) => (al.id === id ? { ...al, read: true } : al))
    );
  };

  const triggerSync = async (sourceId?: string) => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSources((prev) =>
      prev.map((src) => {
        if (!sourceId || src.id === sourceId) {
          return { ...src, lastSync: "À l'instant" };
        }
        return src;
      })
    );
    setIsSyncing(false);
  };

  return (
    <AppContext.Provider
      value={{
        parent,
        childrenList,
        selectedChild,
        selectChild,
        addNewChild,
        homeworks,
        grades,
        subjectSummaries,
        generalStats,
        schoolGoData,
        schedules,
        alerts,
        markAlertAsRead,
        sources,
        triggerSync,
        isSyncing,
        activeFilter,
        setActiveFilter,
        hasCompletedOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
