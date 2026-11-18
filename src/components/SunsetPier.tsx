import Brand from './Brand';

const columns = [
  { title: 'О курорте', links: [['Об острове','#/?section=about'],['9 миров','#/?section=worlds'],['Аттракционы','#/?section=attractions'],['Карта острова','#/map']] },
  { title: 'Ваш отдых', links: [['Билеты','#/tickets'],['Планировщик','#/planner'],['Посещение','#/visit'],['Отель','#/hotel']] },
  { title: 'Полезно', links: [['Как добраться','#/visit?section=arrival'],['Транспорт','#/visit?section=transport'],['Правила курорта','#/visit?section=rules'],['Вопросы и ответы','#/visit?section=faq']] },
];

export default function SunsetPier() {
  return <footer className="sunset-pier poster-stock">
    <div className="sunset-scene" aria-hidden="true">
      <div className="sunset-disc" /><div className="sunset-isle" /><div className="sunset-water" /><div className="pier-posts" />
    </div>
    <div className="pier-content">
      <div className="pier-brand"><Brand /><p>Остров бесконечного лета</p></div>
      <nav aria-label="Навигация в подвале">{columns.map(column => <div key={column.title}>
        <h2>{column.title}</h2>{column.links.map(([label,href]) => <a key={label} href={href}>{label}</a>)}
      </div>)}</nav>
    </div>
    <div className="pier-legal"><span>© Aqua Paradise Resort</span><span>Демонстрационный проект. Реальные бронирования и платежи не осуществляются.</span></div>
  </footer>;
}
