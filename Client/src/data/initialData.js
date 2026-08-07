const initialData = {
  id: "dept-koe-root",
  name: "АТ 'Хмельницькобленерго'",
  manager: {
    name: "Генеральний директор",
    position: "Керівництво компанії",
  },
  staff: ["Секретаріат", "Юридичний департамент", "Прес-служба"],
  subDepartments: [
    {
      id: "dept-technical",
      name: "Технічна дирекція",
      manager: {
        name: "Головний інженер",
        position: "Директор з технічних питань",
      },
      staff: ["Служба ліній", "Служба підстанцій"],
      subDepartments: [
        {
          id: "dept-rem-khm",
          name: "Хмельницький РЕМ",
          manager: { name: "Начальник РЕМ", position: "Оперативне управління" },
          staff: ["ОВБ", "Дільниця обліку"],
          subDepartments: [],
        },
      ],
    },
    {
      id: "dept-commercial",
      name: "Комерційна дирекція",
      manager: { name: "Директор з комерції", position: "Збут" },
      staff: ["Відділ клієнтів", "Енергозбут"],
      subDepartments: [],
    },
  ],
};

export default initialData;
