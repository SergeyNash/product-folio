import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare as Telegram, Linkedin, Mail, Trophy, TreePine, Building2, Ship, 
  Sparkles, Code, Target, Rocket, Sword, Shield, Scroll, 
  Wand, MessageCircle, FlaskRound as Flask
} from 'lucide-react';

interface Location {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: number;
  achievements: string[];
}

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  level: number;
  description: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

const locations: Location[] = [
  {
    id: 'startup-forest',
    title: 'Startup Forest',
    description: 'Ventured through the dense forest of early-stage startups, facing technical challenges and resource limitations head-on.',
    icon: <TreePine className="w-8 h-8 text-emerald-400" />,
    position: 0,
    achievements: ['Launched MVP in record time', 'Grew user base to 1000+']
  },
  {
    id: 'corporate-castle',
    title: 'Corporate Castle',
    description: 'Conquered the mighty fortress of enterprise, mastering cross-functional collaboration and strategic planning.',
    icon: <Building2 className="w-8 h-8 text-slate-300" />,
    position: 1,
    achievements: ['Led team of 10+ developers', 'Delivered $1M+ project']
  },
  {
    id: 'product-ocean',
    title: 'Product Ocean',
    description: 'Navigating the vast seas of product management, charting course through market waves and user feedback storms.',
    icon: <Ship className="w-8 h-8 text-blue-400" />,
    position: 2,
    achievements: ['Increased retention by 40%', 'Launched global product']
  }
];

const skills: Skill[] = [
  {
    id: "agile-sword",
    name: "Меч Agile",
    icon: <Sword className="w-6 h-6 text-red-400" />,
    level: 85,
    description: "Мастерство методологий Scrum и Kanban. Позволяет эффективно управлять спринтами и повышать производительность команды."
  },
  {
    id: "data-shield",
    name: "Щит Data-Driven",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    level: 75,
    description: "Защита от необоснованных решений с помощью аналитики и метрик. Позволяет принимать решения на основе данных."
  },
  {
    id: "roadmap-book",
    name: "Книга Roadmap",
    icon: <Scroll className="w-6 h-6 text-yellow-400" />,
    level: 90,
    description: "Древние знания стратегического планирования. Позволяет создавать четкие и реалистичные дорожные карты продукта."
  },
  {
    id: "ux-wand",
    name: "Жезл UX",
    icon: <Wand className="w-6 h-6 text-purple-400" />,
    level: 70,
    description: "Магический артефакт для создания удобных интерфейсов. Позволяет понимать потребности пользователей и создавать интуитивно понятные продукты."
  },
  {
    id: "communication-amulet",
    name: "Амулет Коммуникации",
    icon: <MessageCircle className="w-6 h-6 text-green-400" />,
    level: 95,
    description: "Усиливает способность к эффективному общению с разными отделами. Незаменим для кросс-функционального взаимодействия."
  },
  {
    id: "analytics-potion",
    name: "Зелье Аналитики",
    icon: <Flask className="w-6 h-6 text-indigo-400" />,
    level: 80,
    description: "Позволяет видеть скрытые паттерны в данных. Повышает способность к анализу метрик и принятию решений."
  }
];

const achievements: Achievement[] = [
  {
    id: "mvp-master",
    name: "Повелитель MVP",
    icon: "🚀",
    description: "Успешно запустил 5 минимально жизнеспособных продуктов, которые превратились в полноценные решения.",
    rarity: "epic",
    unlocked: true,
  },
  {
    id: "deadline-savior",
    name: "Спаситель дедлайнов",
    icon: "⏰",
    description: "Завершил 10 проектов точно в срок, несмотря на все препятствия и изменения требований.",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "communication-wizard",
    name: "Маг коммуникации",
    icon: "🔮",
    description: "Наладил эффективное взаимодействие между 5 разными отделами, говорящими на разных «языках».",
    rarity: "legendary",
    unlocked: true,
  },
  {
    id: "user-whisperer",
    name: "Заклинатель пользователей",
    icon: "👂",
    description: "Собрал и проанализировал отзывы от 1000+ пользователей, превратив их в конкретные улучшения продукта.",
    rarity: "epic",
    unlocked: true,
  },
  {
    id: "metric-hunter",
    name: "Охотник за метриками",
    icon: "📊",
    description: "Увеличил ключевые показатели эффективности на 40% за счет тщательного анализа данных.",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "feature-architect",
    name: "Архитектор функций",
    icon: "🏗️",
    description: "Спроектировал и реализовал 3 инновационные функции, которые стали отличительной чертой продукта.",
    rarity: "epic",
    unlocked: true,
  },
  {
    id: "bug-slayer",
    name: "Истребитель багов",
    icon: "🐞",
    description: "Выявил и устранил 100+ критических ошибок до того, как они достигли пользователей.",
    rarity: "common",
    unlocked: true,
  },
  {
    id: "market-navigator",
    name: "Навигатор рынка",
    icon: "🧭",
    description: "Успешно вывел продукт на 3 новых рынка, адаптировав его под локальные потребности.",
    rarity: "legendary",
    unlocked: false,
  },
  {
    id: "team-leader",
    name: "Лидер команды",
    icon: "👑",
    description: "Руководил командой из 10+ человек, обеспечивая высокую мотивацию и результативность.",
    rarity: "epic",
    unlocked: true,
  }
];

const bioHighlights = [
  { icon: <Code className="w-5 h-5" />, text: '8+ years in Product Management' },
  { icon: <Target className="w-5 h-5" />, text: 'Led 20+ successful product launches' },
  { icon: <Rocket className="w-5 h-5" />, text: 'Scaled products from 0 to 1M users' }
];

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'legendary':
      return 'text-amber-400 bg-amber-400/10';
    case 'epic':
      return 'text-purple-400 bg-purple-400/10';
    case 'rare':
      return 'text-blue-400 bg-blue-400/10';
    default:
      return 'text-slate-400 bg-slate-400/10';
  }
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [decorations, setDecorations] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const newDecorations = Array.from({ length: 12 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setDecorations(newDecorations);
  }, []);

  const handleLocationClick = (location: Location) => {
    setPlayerPosition(location.position);
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4">
      {/* Header */}
      <header className="text-center mb-12 pt-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="w-full h-full bg-yellow-400 rounded-full relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-4 h-4 bg-slate-900 rounded-full ml-8"></div>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 clip-triangle"></div>
          </div>
        </div>
        <h1 className="text-2xl mb-4 text-emerald-400">Product Manager's Quest</h1>
        <p className="text-sm text-slate-400">A journey through the realms of product development</p>
      </header>

      {/* Bio Section */}
      <div className="mb-12 pixel-borders bg-slate-800 p-6 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-xl text-emerald-400 mb-4">The Hero's Tale</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Greetings, traveler! I'm a Product Manager with a passion for crafting digital experiences that make a difference. 
              My journey began in the startup wilderness, where I learned to navigate through resource constraints and technical challenges. 
              Now, I wield the power of data-driven decision making and user-centric design to forge successful products.
            </p>
            <div className="space-y-3 mt-4">
              {bioHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="text-emerald-400">{highlight.icon}</div>
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg pixel-borders">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                alt="Product Manager Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map and Experience Section */}
      <div className="mb-12 pixel-borders bg-slate-800 rounded-lg overflow-hidden">
        {/* Map Area */}
        <div className="relative h-[200px] p-8 retro-grid">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-emerald-400/30 transform -translate-y-1/2"></div>
          
          {decorations.map((dec, index) => (
            <div
              key={index}
              className="map-decoration"
              style={{
                left: `${dec.x}%`,
                top: `${dec.y}%`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
          
          {/* Location spots */}
          <div className="relative h-full flex items-center justify-between mx-12">
            {locations.map((location) => (
              <div
                key={location.id}
                className="location relative"
                onClick={() => handleLocationClick(location)}
              >
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                  {location.icon}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-emerald-400">
                  {location.title}
                </div>
              </div>
            ))}
            
            {/* Player marker */}
            <motion.div
              className="absolute w-12 h-12 bg-emerald-400/20 rounded-full border-2 border-emerald-400"
              animate={{
                left: `${(playerPosition / (locations.length - 1)) * 100}%`,
                transform: 'translateX(-50%)'
              }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        {/* Experience Details */}
        {selectedLocation && (
          <div className="p-6 border-t-2 border-slate-700">
            <h3 className="text-emerald-400 mb-2">{selectedLocation.title}</h3>
            <p className="text-slate-300 mb-2">{selectedLocation.description}</p>
            <div className="flex gap-4 mt-4">
              {selectedLocation.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Skills Inventory */}
      <div className="mb-12">
        <h2 className="text-xl mb-6 text-center text-emerald-400">Инвентарь Героя</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="inventory-slot rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-700 rounded-lg">{skill.icon}</div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
              <div className="mb-2">
                <div className="skill-bar rounded">
                  <div 
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="text-right text-xs text-slate-400 mt-1">
                  {skill.level}/100
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <h2 className="text-xl mb-6 text-center text-emerald-400">Достижения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`achievement pixel-borders p-4 rounded-lg ${achievement.unlocked ? getRarityColor(achievement.rarity) : 'opacity-50 grayscale'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{achievement.icon}</span>
                <h3 className="text-sm font-medium">{achievement.name}</h3>
              </div>
              <p className="text-xs opacity-90">{achievement.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider opacity-75">
                  {achievement.rarity}
                </span>
                {!achievement.unlocked && (
                  <span className="text-xs">🔒 Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <footer className="text-center pb-8">
        <h2 className="text-xl mb-6 text-emerald-400">Save & Connect</h2>
        <div className="flex justify-center gap-6">
          <a href="https://t.me/username" className="hover:text-emerald-400 transition-colors">
            <Telegram className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" className="hover:text-emerald-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:contact@pm-hero.com" className="hover:text-emerald-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;