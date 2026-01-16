import { Music, Mic, Film } from 'lucide-react';
import { ArtistSection, SECTION_LABELS, SECTION_DESCRIPTIONS } from '../types/artist';

interface SectionSelectorProps {
  onSelectSection: (section: ArtistSection) => void;
}

export function SectionSelector({ onSelectSection }: SectionSelectorProps) {
  const sections: Array<{
    id: ArtistSection;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    hoverGradient: string;
  }> = [
    {
      id: 'stage_artists',
      icon: Music,
      gradient: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'hosts_and_shows',
      icon: Mic,
      gradient: 'from-pink-500 to-rose-500',
      hoverGradient: 'from-pink-600 to-rose-600'
    },
    {
      id: 'creative_production',
      icon: Film,
      gradient: 'from-violet-500 to-purple-500',
      hoverGradient: 'from-violet-600 to-purple-600'
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Найдите нужного артиста</h2>
          <p className="text-muted-foreground text-lg">
            Выберите категорию для поиска профессионалов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all hover:scale-105 hover:shadow-2xl"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-10 group-hover:opacity-15 transition-opacity`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${section.gradient} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold">
                    {SECTION_LABELS[section.id]}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {SECTION_DESCRIPTIONS[section.id]}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-sm font-medium">
                    <span className={`bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                      Перейти в каталог
                    </span>
                    <svg
                      className={`ml-2 w-4 h-4 bg-gradient-to-r ${section.gradient} opacity-70 group-hover:translate-x-1 transition-transform`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
