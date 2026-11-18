import { useEffect, useState } from 'react';
import { ATTRACTIONS, ATTRACTION_IDS_BY_ZONE } from './data/attractions';

import { zonesData } from './data/zones';

type Tab = 'overview' | 'attractions' | 'infrastructure' | 'rules';
const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'attractions', label: 'Развлечения' },
  { id: 'infrastructure', label: 'Инфраструктура' },
  { id: 'rules', label: 'Правила' },
];
const isTab = (value: string | null): value is Tab => TABS.some(tab => tab.id === value);
const isZone = (id: string | null): id is string => zonesData.some(zone => zone.id === id);

export default function ZonesPage({ initialZone, initialTab }: { initialZone?: string; initialTab?: Tab }) {
  const [activeZoneId, setActiveZoneId] = useState(isZone(initialZone ?? null) ? initialZone! : 'ocean-bay');
  const [activeTab, setActiveTab] = useState<Tab>(initialTab && isTab(initialTab) ? initialTab : 'overview');

  useEffect(() => {
    const syncFromHash = () => {
      const [route, query] = window.location.hash.split('?');
      if (route !== '#/zones') return;
      const params = new URLSearchParams(query ?? '');
      const zone = params.get('zone');
      const tab = params.get('tab');
      setActiveZoneId(isZone(zone) ? zone : 'ocean-bay');
      setActiveTab(isTab(tab) ? tab : 'overview');
    };
    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const setSelection = (zoneId: string, tab: Tab) => {
    setActiveZoneId(zoneId);
    setActiveTab(tab);
    const params = new URLSearchParams({ zone: zoneId });
    if (tab !== 'overview') params.set('tab', tab);
    const nextHash = `#/zones?${params.toString()}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  };

  const activeZone = zonesData.find(zone => zone.id === activeZoneId) ?? zonesData[8];
  const attractionIds = ATTRACTION_IDS_BY_ZONE[activeZone.name] ?? [];
  const zoneAttractions = attractionIds
    .map(id => ATTRACTIONS.find(attraction => attraction.id === id))
    .filter((attraction): attraction is (typeof ATTRACTIONS)[number] => Boolean(attraction));
  const infrastructureGroups = [
    { key: 'rest', label: 'Отдых', items: activeZone.infrastructure.rest },
    { key: 'food', label: 'Питание', items: activeZone.infrastructure.food },
    { key: 'service', label: 'Сервис и транспорт', items: activeZone.infrastructure.service },
    { key: 'safety', label: 'Безопасность', items: activeZone.infrastructure.safety },
  ].filter(group => group.items && group.items.length > 0);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <nav aria-label="Тематические зоны" className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {zonesData.map(zone => (
              <button
                type="button" key={zone.id}
                onClick={() => setSelection(zone.id, 'overview')}
                aria-label={`Открыть зону ${zone.name}`}
                aria-current={activeZoneId === zone.id ? 'page' : undefined}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${activeZoneId === zone.id ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm' : 'border-gray-200 hover:border-teal-300 text-gray-600 bg-white'}`}
              >
                <span className="text-xl" aria-hidden="true">{zone.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{zone.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-video bg-gradient-to-br from-teal-300 to-cyan-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-serif text-center px-3">
              [Панорама: {activeZone.name}]
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-4xl font-serif text-gray-900 mb-3">{activeZone.name}</h1>
              <p className="text-xs text-teal-700 font-semibold mb-3">Часы работы зоны: {activeZone.hours}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{activeZone.desc}</p>
            </div>
          </div>

          <div className="w-full lg:w-[45%] min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
              <div role="tablist" aria-label={`Сведения о зоне ${activeZone.name}`} className="flex border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
                {TABS.map((tab, index) => (
                  <button
                    id={`zone-tab-${tab.id}`} key={tab.id} type="button" role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls="zone-tab-panel"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => setSelection(activeZone.id, tab.id)}
                    onKeyDown={(event) => {
                      const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                      if (delta !== 0 || event.key === 'Home' || event.key === 'End') {
                        event.preventDefault();
                        const next = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : (index + delta + TABS.length) % TABS.length;
                        setSelection(activeZone.id, TABS[next].id);
                        document.getElementById(`zone-tab-${TABS[next].id}`)?.focus();
                      }
                    }}
                      className={`flex-none shrink-0 whitespace-nowrap min-w-max px-4 py-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal-600 ${activeTab === tab.id ? 'text-teal-600 border-b-2 border-teal-600 bg-white' : 'text-gray-500 hover:text-gray-800'}`}
                  >{tab.label}</button>
                ))}
              </div>

              <div id="zone-tab-panel" role="tabpanel" aria-labelledby={`zone-tab-${activeTab}`} tabIndex={0} className="p-6 flex-grow focus-visible:outline-2 focus-visible:outline-teal-600">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Особенности</h2>
                      <ul className="space-y-2">
                        {activeZone.features.map(feature => <li key={feature} className="bg-teal-50 text-teal-800 px-4 py-3 rounded-xl text-sm border border-teal-100">{feature}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Кому понравится</h2>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{activeZone.likes}</p>
                    </div>
                    <p className="text-xs text-gray-500">Иллюстрации зоны будут добавлены после утверждения визуальных материалов.</p>
                  </div>
                )}
                {activeTab === 'attractions' && (
                  <div className="space-y-5">
                    {zoneAttractions.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Аттракционы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {zoneAttractions.map(attraction => (
                            <div key={attraction.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/40">
                              <p className="font-medium text-gray-900">{attraction.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{attraction.intensity} · от {attraction.minAge} лет{attraction.minHeight !== null ? ` · рост от ${attraction.minHeight} см` : ''}</p>
                              <button type="button" onClick={() => { window.location.hash = `#/attractions?ride=${attraction.id}`; }} className="text-teal-700 hover:underline mt-2 text-sm focus-visible:outline-2 focus-visible:outline-teal-600">Подробнее</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Что ещё посетить</h2>
                      <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
                        {activeZone.activities.map(activity => <li key={activity}>{activity}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'infrastructure' && (
                  <div className="space-y-6">
                    {infrastructureGroups.length === 0 ? (
                      <p className="text-gray-600 text-sm">Отдельный перечень инфраструктуры этой зоны в утверждённой документации пока не установлен. Информация об основных объектах доступна во вкладке «Развлечения».</p>
                    ) : infrastructureGroups.map(group => (
                      <section key={group.key}>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{group.label}</h2>
                        <ul className="space-y-2">{group.items?.map(item => <li key={item} className="flex gap-2 text-gray-700 text-sm"><span aria-hidden="true" className="text-teal-500">•</span>{item}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                )}
                {activeTab === 'rules' && (
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {activeZone.rules.map(rule => <li key={rule} className="flex items-start gap-3 p-3 bg-amber-50 text-amber-950 rounded-xl text-sm border border-amber-100"><span aria-hidden="true">ℹ️</span>{rule}</li>)}
                    </ul>
                    <p className="text-xs text-gray-500">Подробные правила отдельных аттракционов приведены в их карточках и каталоге. Время работы и условия — демонстрационные данные вымышленного курорта.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
