const db = [
  { 
    id: 'ob5hAYt',
    name: "Первый тестовый поект",
    desription: "тестовый проект создания TODO листа для демонстрации навыйков разработки",
    task_list: [
      {
        id: "7nKdnQ",
        id_project: 'ob5hAYt',
        number: 1, 
        name: "Создать каркас приложения",
        description: "Создаем приложение вызовом команды npx create-react-app .",
        create_date: Date.now() - 1000000,
        finish_date: Date.now() + 1000000,
        priority: 'up-middle',
        files:[],
        other_tasks: [],
        comments: [
          {
          name: "Антон",
          message: "Привет Мир",
          id_main_comment: null,
          id_project: "ob5hAYt",
          id_task: "7nKdnQ",
          id: "49a37c0a-603c-44f2-b2c0-6924f25b7fdc",
          created: 1670186525748,
          comments: []
        }
        ],
      },
      {
        id: "nQI5bFqZEqHPph2m",
        id_project: 'ob5hAYt',
        number: 2, 
        name: "Создание компонентов",
        description: "Создание компонентов и хранилища приложения",
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
        name: "Оживление проектов",
        description: "Включение логики приложения, установление взаимодействия компонентов, подключение к хранилищу",
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
        name: "Достилизация",
        description: "корректировка стилей и добавление анимаций",
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
    name: "Бэк на сервене",
    desription: "разработка сервеной части",
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