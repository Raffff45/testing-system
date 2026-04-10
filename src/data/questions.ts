export interface Question {
  id: number;
  term: string;
  definition: string;
  options: string[];
  correct: string;
  category: string;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  questions: Question[];
}

const allQuestions: Omit<Question, 'options'>[] = [
  // Level 1 — Основы стартапа
  { id: 1, term: 'Startup', definition: 'Молодая компания, которая ищет рабочую бизнес-модель и хочет быстро расти.', correct: 'Startup', category: 'Основы' },
  { id: 2, term: 'Founder', definition: 'Основатель компании.', correct: 'Founder', category: 'Основы' },
  { id: 3, term: 'Co-founder', definition: 'Сооснователь компании.', correct: 'Co-founder', category: 'Основы' },
  { id: 4, term: 'Bootstrapping', definition: 'Запуск бизнеса на свои деньги без инвесторов.', correct: 'Bootstrapping', category: 'Основы' },
  { id: 5, term: 'Burn Rate', definition: 'Сколько денег стартап тратит каждый месяц.', correct: 'Burn Rate', category: 'Основы' },
  { id: 6, term: 'Runway', definition: 'Сколько месяцев компания сможет жить на текущих деньгах.', correct: 'Runway', category: 'Основы' },
  { id: 7, term: 'Pivot', definition: 'Смена направления бизнеса или продукта.', correct: 'Pivot', category: 'Основы' },
  { id: 8, term: 'Exit', definition: 'Продажа компании или выход инвесторов из бизнеса.', correct: 'Exit', category: 'Основы' },
  { id: 9, term: 'MVP', definition: 'Минимальная рабочая версия продукта.', correct: 'MVP', category: 'Продукт' },
  { id: 10, term: 'Prototype', definition: 'Черновой макет продукта.', correct: 'Prototype', category: 'Продукт' },

  // Level 2 — Продукт и разработка
  { id: 11, term: 'Wireframe', definition: 'Простой каркас интерфейса без дизайна.', correct: 'Wireframe', category: 'Продукт' },
  { id: 12, term: 'UI', definition: 'Внешний вид интерфейса.', correct: 'UI', category: 'Продукт' },
  { id: 13, term: 'UX', definition: 'Пользовательский опыт — насколько удобно пользоваться продуктом.', correct: 'UX', category: 'Продукт' },
  { id: 14, term: 'Feature', definition: 'Отдельная функция продукта.', correct: 'Feature', category: 'Продукт' },
  { id: 15, term: 'Roadmap', definition: 'План развития продукта на будущее.', correct: 'Roadmap', category: 'Продукт' },
  { id: 16, term: 'Backlog', definition: 'Список задач и функций, которые нужно сделать.', correct: 'Backlog', category: 'Продукт' },
  { id: 17, term: 'Sprint', definition: 'Короткий период работы команды, обычно 1–2 недели.', correct: 'Sprint', category: 'Продукт' },
  { id: 18, term: 'Agile', definition: 'Гибкая методология управления проектом.', correct: 'Agile', category: 'Продукт' },
  { id: 19, term: 'Scalability', definition: 'Способность продукта выдерживать рост пользователей.', correct: 'Scalability', category: 'Продукт' },
  { id: 20, term: 'DAU', definition: 'Активные пользователи в день (Daily Active Users).', correct: 'DAU', category: 'Метрики' },

  // Level 3 — Пользователи и метрики
  { id: 21, term: 'MAU', definition: 'Активные пользователи в месяц (Monthly Active Users).', correct: 'MAU', category: 'Метрики' },
  { id: 22, term: 'Retention', definition: 'Показатель того, сколько пользователей возвращаются в продукт.', correct: 'Retention', category: 'Метрики' },
  { id: 23, term: 'Churn Rate', definition: 'Процент пользователей, которые перестали пользоваться продуктом.', correct: 'Churn Rate', category: 'Метрики' },
  { id: 24, term: 'CAC', definition: 'Стоимость привлечения одного клиента (Customer Acquisition Cost).', correct: 'CAC', category: 'Метрики' },
  { id: 25, term: 'LTV', definition: 'Сколько денег приносит один клиент за всё время (Lifetime Value).', correct: 'LTV', category: 'Метрики' },
  { id: 26, term: 'Conversion Rate', definition: 'Процент пользователей, которые выполнили нужное действие.', correct: 'Conversion Rate', category: 'Метрики' },
  { id: 27, term: 'KPI', definition: 'Ключевой показатель эффективности (Key Performance Indicator).', correct: 'KPI', category: 'Метрики' },
  { id: 28, term: 'Unit Economics', definition: 'Экономика на одного клиента или одну продажу.', correct: 'Unit Economics', category: 'Метрики' },
  { id: 29, term: 'Lead', definition: 'Потенциальный клиент, который проявил интерес к продукту.', correct: 'Lead', category: 'Маркетинг' },
  { id: 30, term: 'ICP', definition: 'Идеальный портрет клиента (Ideal Customer Profile).', correct: 'ICP', category: 'Маркетинг' },

  // Level 4 — Маркетинг и продажи
  { id: 31, term: 'Value Proposition', definition: 'Почему клиент должен выбрать именно вас — ценностное предложение.', correct: 'Value Proposition', category: 'Маркетинг' },
  { id: 32, term: 'USP', definition: 'Уникальное торговое предложение (Unique Selling Proposition).', correct: 'USP', category: 'Маркетинг' },
  { id: 33, term: 'Sales Funnel', definition: 'Воронка продаж — путь клиента от знакомства до покупки.', correct: 'Sales Funnel', category: 'Маркетинг' },
  { id: 34, term: 'CRM', definition: 'Система управления отношениями с клиентами.', correct: 'CRM', category: 'Маркетинг' },
  { id: 35, term: 'Organic Traffic', definition: 'Бесплатный трафик из поиска и естественных источников.', correct: 'Organic Traffic', category: 'Маркетинг' },
  { id: 36, term: 'Paid Traffic', definition: 'Платный трафик, за который компания платит рекламным платформам.', correct: 'Paid Traffic', category: 'Маркетинг' },
  { id: 37, term: 'Performance Marketing', definition: 'Маркетинг, где платят только за конкретный результат.', correct: 'Performance Marketing', category: 'Маркетинг' },
  { id: 38, term: 'Revenue', definition: 'Выручка — все деньги, которые компания получила от продаж.', correct: 'Revenue', category: 'Финансы' },
  { id: 39, term: 'Profit', definition: 'Прибыль — то, что осталось после всех расходов.', correct: 'Profit', category: 'Финансы' },
  { id: 40, term: 'Gross Profit', definition: 'Валовая прибыль — выручка минус себестоимость.', correct: 'Gross Profit', category: 'Финансы' },

  // Level 5 — Финансы
  { id: 41, term: 'Net Profit', definition: 'Чистая прибыль — выручка минус все расходы и налоги.', correct: 'Net Profit', category: 'Финансы' },
  { id: 42, term: 'Cash Flow', definition: 'Движение денег в компании — приход и расход.', correct: 'Cash Flow', category: 'Финансы' },
  { id: 43, term: 'P&L', definition: 'Отчёт о прибыли и убытках (Profit & Loss).', correct: 'P&L', category: 'Финансы' },
  { id: 44, term: 'OPEX', definition: 'Операционные расходы — регулярные затраты на ведение бизнеса.', correct: 'OPEX', category: 'Финансы' },
  { id: 45, term: 'CAPEX', definition: 'Капитальные расходы — вложения в долгосрочные активы.', correct: 'CAPEX', category: 'Финансы' },
  { id: 46, term: 'Break-even Point', definition: 'Точка безубыточности — момент, когда доходы покрывают расходы.', correct: 'Break-even Point', category: 'Финансы' },
  { id: 47, term: 'MRR', definition: 'Ежемесячная регулярная выручка (Monthly Recurring Revenue).', correct: 'MRR', category: 'Финансы' },
  { id: 48, term: 'ARR', definition: 'Годовая регулярная выручка (Annual Recurring Revenue).', correct: 'ARR', category: 'Финансы' },
  { id: 49, term: 'Valuation', definition: 'Оценка стоимости компании на рынке.', correct: 'Valuation', category: 'Финансы' },
  { id: 50, term: 'Angel Investor', definition: 'Частный инвестор, который вкладывает деньги на ранней стадии.', correct: 'Angel Investor', category: 'Инвестиции' },

  // Level 6 — Инвестиции и технологии
  { id: 51, term: 'VC', definition: 'Венчурный фонд — инвестиционный фонд для стартапов (Venture Capital).', correct: 'VC', category: 'Инвестиции' },
  { id: 52, term: 'Pre-seed', definition: 'Самый ранний этап финансирования стартапа.', correct: 'Pre-seed', category: 'Инвестиции' },
  { id: 53, term: 'Seed Round', definition: 'Первый официальный раунд инвестиций.', correct: 'Seed Round', category: 'Инвестиции' },
  { id: 54, term: 'Series A/B/C', definition: 'Следующие этапы инвестиций после Seed Round.', correct: 'Series A/B/C', category: 'Инвестиции' },
  { id: 55, term: 'Term Sheet', definition: 'Предварительные условия сделки с инвестором.', correct: 'Term Sheet', category: 'Инвестиции' },
  { id: 56, term: 'Due Diligence', definition: 'Тщательная проверка компании инвестором перед вложением денег.', correct: 'Due Diligence', category: 'Инвестиции' },
  { id: 57, term: 'SAFE', definition: 'Договор, дающий право получить долю в компании позже.', correct: 'SAFE', category: 'Инвестиции' },
  { id: 58, term: 'Pitch Deck', definition: 'Презентация стартапа для инвесторов.', correct: 'Pitch Deck', category: 'Инвестиции' },
  { id: 59, term: 'Backend', definition: 'Серверная часть продукта, которую не видит пользователь.', correct: 'Backend', category: 'Технологии' },
  { id: 60, term: 'Frontend', definition: 'Видимая часть продукта — интерфейс, с которым работает пользователь.', correct: 'Frontend', category: 'Технологии' },

  // Level 7 — Технические термины (продолжение)
  { id: 61, term: 'API', definition: 'Способ обмена данными между разными сервисами и программами.', correct: 'API', category: 'Технологии' },
  { id: 62, term: 'Cloud', definition: 'Облачные сервисы — хранение и обработка данных на удалённых серверах.', correct: 'Cloud', category: 'Технологии' },
  { id: 63, term: 'Hosting', definition: 'Место, где физически размещается сайт или сервер.', correct: 'Hosting', category: 'Технологии' },
  { id: 64, term: 'Database', definition: 'База данных — организованное хранилище информации.', correct: 'Database', category: 'Технологии' },
  { id: 65, term: 'DevOps', definition: 'Настройка серверов, автоматизации и инфраструктуры.', correct: 'DevOps', category: 'Технологии' },
  { id: 66, term: 'CI/CD', definition: 'Автоматическая сборка и обновление продукта (Continuous Integration/Deployment).', correct: 'CI/CD', category: 'Технологии' },
  { id: 67, term: 'Cybersecurity', definition: 'Защита данных и компьютерных систем от взломов.', correct: 'Cybersecurity', category: 'Технологии' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateOptions(correct: string, allTerms: string[]): string[] {
  const wrong = shuffle(allTerms.filter(t => t !== correct)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

const allTerms = allQuestions.map(q => q.term);

function buildQuestions(raw: Omit<Question, 'options'>[]): Question[] {
  return raw.map(q => ({
    ...q,
    options: generateOptions(q.correct, allTerms),
  }));
}

export const levels: Level[] = [
  {
    id: 1,
    title: 'Основы стартапа',
    subtitle: 'Базовые понятия для любого фаундера',
    emoji: '🚀',
    color: '#58CC02',
    questions: buildQuestions(allQuestions.slice(0, 10)),
  },
  {
    id: 2,
    title: 'Продукт и разработка',
    subtitle: 'Как строится и развивается продукт',
    emoji: '⚙️',
    color: '#1CB0F6',
    questions: buildQuestions(allQuestions.slice(10, 20)),
  },
  {
    id: 3,
    title: 'Метрики и пользователи',
    subtitle: 'Как измерять рост и поведение аудитории',
    emoji: '📊',
    color: '#FF9600',
    questions: buildQuestions(allQuestions.slice(20, 30)),
  },
  {
    id: 4,
    title: 'Маркетинг и продажи',
    subtitle: 'Привлечение и удержание клиентов',
    emoji: '📣',
    color: '#FF4B4B',
    questions: buildQuestions(allQuestions.slice(30, 40)),
  },
  {
    id: 5,
    title: 'Финансы',
    subtitle: 'Деньги, отчёты и доходность',
    emoji: '💰',
    color: '#CE82FF',
    questions: buildQuestions(allQuestions.slice(40, 50)),
  },
  {
    id: 6,
    title: 'Инвестиции',
    subtitle: 'Раунды, инвесторы и сделки',
    emoji: '💼',
    color: '#FF86D0',
    questions: buildQuestions(allQuestions.slice(50, 60)),
  },
  {
    id: 7,
    title: 'Технологии',
    subtitle: 'Tech-стек и инфраструктура',
    emoji: '🖥️',
    color: '#2CBFCE',
    questions: buildQuestions(allQuestions.slice(60, 67)),
  },
];