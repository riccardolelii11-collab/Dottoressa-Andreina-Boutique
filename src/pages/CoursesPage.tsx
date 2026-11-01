import React, { useState } from 'react';
import { VideoCourse } from '../types';
import { 
  GraduationCap, 
  PlayCircle, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Lock,
  Layers
} from 'lucide-react';

interface CoursesPageProps {
  courses: VideoCourse[];
  hasPremiumAccess: boolean;
  onOpenCheckoutCourse: (course: VideoCourse) => void;
  onToast: (msg: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  hasPremiumAccess,
  onOpenCheckoutCourse,
  onToast,
}) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string>(courses[0]?.id || '');
  const [activeLesson, setActiveLesson] = useState<{ courseTitle: string; lessonTitle: string } | null>(null);

  const toggleExpand = (courseId: string) => {
    setExpandedCourseId(prev => prev === courseId ? '' : courseId);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
          <GraduationCap className="w-4 h-4" />
          <span>Catalogo Video Corsi</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0f2338]">
          Corsi Pratici & Metodo Nutrizionale
        </h1>
        <p className="text-xs sm:text-sm text-[#4a5e73] max-w-2xl leading-relaxed">
          Percorsi formativi strutturati in moduli tematici con lezioni brevi e focalizzate. Ciascun corso include dispense scaricabili ed è disponibile per acquisto singolo o incluso nel Club Premium.
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-8">
        {courses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          const isUnlocked = hasPremiumAccess && course.isIncludedInPremium;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden shadow-xs hover:border-[#cbdfe9] transition-all"
            >
              {/* Top Banner Row */}
              <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-start justify-between">
                
                {/* Course Media Container */}
                <div className="relative aspect-video w-full lg:w-72 rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-slate-100">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <button
                      onClick={() => {
                        const firstLesson = course.modules[0]?.lessons[0];
                        if (firstLesson) {
                          setActiveLesson({ courseTitle: course.title, lessonTitle: firstLesson.title });
                          onToast(`Riproduzione anteprima: ${firstLesson.title}`);
                        }
                      }}
                      className="w-12 h-12 rounded-full bg-white/95 text-[#0f2338] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    >
                      <PlayCircle className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                  </div>

                  {course.isIncludedInPremium && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-amber-950 bg-amber-300 px-2.5 py-0.5 rounded shadow-xs">
                      Incluso in Premium
                    </span>
                  )}
                </div>

                {/* Course Main Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#5b6e82]">
                    <span className="font-semibold text-[#2b5374] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {course.modulesCount} Moduli Formativi
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.totalDuration}
                    </span>
                    <span>·</span>
                    <span>Livello: <strong>{course.level}</strong></span>
                  </div>

                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0f2338]">
                    {course.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4a5e73] leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-xs text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Include dispensa operativa e schede riassuntive in PDF</span>
                  </div>
                </div>

                {/* Pricing & CTA Panel */}
                <div className="w-full lg:w-56 p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between shrink-0 space-y-3">
                  <div>
                    <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold">
                      Accesso al Corso
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-editorial text-2xl font-bold text-[#0f2338] tabular-nums">
                        {course.formattedPrice}
                      </span>
                      <span className="text-xs text-[#64748b]">una tantum</span>
                    </div>
                    {course.isIncludedInPremium && (
                      <span className="text-[11px] text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded font-medium block mt-1">
                        Gratuito per i membri Premium
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-2">
                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          const firstLesson = course.modules[0]?.lessons[0];
                          if (firstLesson) {
                            setActiveLesson({ courseTitle: course.title, lessonTitle: firstLesson.title });
                            onToast(`Accesso sbloccato: riproduzione corso avviata`);
                          }
                        }}
                        className="w-full py-2.5 px-3 bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Avvia Corso</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenCheckoutCourse(course)}
                        className="w-full py-2.5 px-3 bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Acquista Corso</span>
                      </button>
                    )}

                    <button
                      onClick={() => toggleExpand(course.id)}
                      className="w-full py-2 px-3 bg-white border border-[#cbdfe9] text-[#2b5374] hover:bg-[#edf4f8] text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Nascondi Moduli' : 'Visualizza Moduli'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Collapsible Syllabus & Lesson Player */}
              {isExpanded && (
                <div className="border-t border-[#e2e8f0] p-6 sm:p-8 bg-[#fcfdfd] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b5374]">
                    Programma Dettagliato delle Lezioni ({course.modules.length} Moduli)
                  </h4>

                  <div className="space-y-3">
                    {course.modules.map((mod) => (
                      <div key={mod.id} className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-editorial text-sm font-semibold text-[#0f2338]">
                            {mod.title}
                          </h5>
                          <span className="text-[11px] text-[#64748b] tabular-nums font-medium">
                            {mod.duration}
                          </span>
                        </div>

                        <div className="divide-y divide-[#f1f5f9] pt-1">
                          {mod.lessons.map((les) => (
                            <div key={les.id} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                <PlayCircle className="w-3.5 h-3.5 text-[#2b5374]" />
                                <span className="text-[#334155]">{les.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-slate-400 tabular-nums">{les.duration}</span>
                                {les.previewAvailable && (
                                  <button
                                    onClick={() => {
                                      setActiveLesson({ courseTitle: course.title, lessonTitle: les.title });
                                      onToast(`Anteprima avviata: ${les.title}`);
                                    }}
                                    className="text-[10px] text-[#2b5374] font-semibold bg-[#edf4f8] px-2 py-0.5 rounded cursor-pointer hover:bg-[#dcebf4]"
                                  >
                                    Anteprima
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active Lesson Preview Banner */}
                  {activeLesson && activeLesson.courseTitle === course.title && (
                    <div className="p-4 rounded-2xl bg-[#0f2338] text-white flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <PlayCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#9dbdd1] uppercase block">In Riproduzione Dimostrativa</span>
                          <span className="text-xs font-semibold">{activeLesson.lessonTitle}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveLesson(null)}
                        className="text-xs text-slate-300 hover:text-white cursor-pointer"
                      >
                        Chiudi Player
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
