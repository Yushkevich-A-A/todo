const db = [
  { 
    id: 'ob5hAYt',
    name: "Проект 1",
    desription: "тестовый проект создания TODO лист",
    task_list: [
      {
        id: "7nKdnQ",
        id_project: 'ob5hAYt',
        number: 1, 
        name: "ПРиведи друга",
        description: "В этой задаче нет победителей",
        create_date: Date.now() - 1000000,
        finish_date: Date.now() + 1000000,
        priority: 'up-middle',
        files:[],
        other_tasks: [],
        comments: [],
      },
      {
        id: "nQI5bFqZEqHPph2m",
        id_project: 'ob5hAYt',
        number: 2, 
        name: "Купить хлеба",
        description: "ПРосто сходи в магазин",
        create_date: Date.now() - 1230000,
        finish_date: Date.now() + 100000,
        priority: 'high',
        files: [],
        other_tasks: [],
        comments: [],
      },
      {
        id: "qZEq2HPph2m",
        id_project: 'ob5hAYt',
        number: 3, 
        name: "Создай todo list",
        description: "листик",
        create_date: Date.now() - 100000,
        finish_date: Date.now() + 50000,
        priority: 'middle',
        files: [],
        other_tasks: [],
        comments: [],
      }
      ,
      {
        id: "48bFqZEq",
        id_project: 'ob5hAYt',
        number: 4, 
        name: "Еще задачка",
        description: "задачка",
        create_date: Date.now() - 1005000,
        finish_date: Date.now() + 500400,
        priority: 'low',
        files: [],
        other_tasks: [],
        comments: [],
      }
    ],
    columns: [
      {
        id: 'queue',
        tasks: ["7nKdnQ", "nQI5bFqZEqHPph2m", "qZEq2HPph2m", "48bFqZEq", ]
      },
      {
        id: 'development',
        tasks: []
      },
      {
        id: 'done',
        tasks: []
      }
    ]
  },
  { 
    id: 'ob5hAYtP5P0olajRvbmfN',
    name: "Новый  проект",
    desription: "тестовый проект",
    task_list: [],
    columns: [
      {
        id: 'queue',
        tasks: []
      },
      {
        id: 'development',
        tasks: []
      },
      {
        id: 'done',
        tasks: []
      }
    ]
  }
]

module.exports = {
  db,
}