// Приклад структури даних для АТ "Хмельницькобленерго"
// Цей масив має містити лише КОРЕНЕВІ підрозділи (Top-level)
const initialDepartments = {
  id: "hq-001",
  name: "Генеральна дирекція",
  manager: {
    id: "m-001",
    name: "Олександр Ковальчук",
    position: "Генеральний директор",
    phone: "+380671234567",
    hasCar: true,
    carInfo: "Skoda Superb (BX 0001 AA)",
    photo:
      "https://ui-avatars.com/api/?name=Олександр+Ковальчук&background=0054a6&color=fff",
    notes: ["В штаті з 2005 року", "Кандидат технічних наук"],
  },
  staff: [
    {
      id: "s-001",
      name: "Тетяна Бєлова",
      position: "Помічник директора",
      phone: "+380670001122",
      hasCar: false,
      notes: ["Організація нарад"],
      photo:
        "https://ui-avatars.com/api/?name=Тетяна+Бєлова&background=64748b&color=fff",
    },
  ],
  subDepartments: [
    {
      id: "tech-001",
      name: "Технічна дирекція",
      manager: {
        id: "m-002",
        name: "Ігор Степаненко",
        position: "Головний інженер",
        phone: "+380671112233",
        hasCar: true,
        carInfo: "Toyota Hilux (BX 1122 AB)",
        photo:
          "https://ui-avatars.com/api/?name=Ігор+Степаненко&background=0054a6&color=fff",
        notes: ["Відповідальний за ОЗП"],
      },
      staff: [
        {
          id: "s-002",
          name: "Микола Кран",
          position: "Інженер",
          phone: "+380675554433",
          hasCar: false,
          photo:
            "https://ui-avatars.com/api/?name=Микола+Кран&background=64748b&color=fff",
        },
      ],
      subDepartments: [],
    },
    {
      id: "comm-001",
      name: "Комерційна дирекція",
      manager: {
        id: "m-003",
        name: "Олена Світла",
        position: "Комерційний директор",
        phone: "+380679998877",
        hasCar: false,
        photo:
          "https://ui-avatars.com/api/?name=Олена+Світла&background=0054a6&color=fff",
      },
      staff: [],
      subDepartments: [],
    },
  ],
};

export default initialDepartments;
