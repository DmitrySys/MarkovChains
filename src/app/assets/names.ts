﻿export class Names {
  public static getRandomName():string{
    return names[Math.floor(Math.random() * Math.floor(names.length-1))];
  }
  public static getThought():string{
    return thoughts[Math.floor(Math.random() * Math.floor(thoughts.length-1))];
  }
}
const thoughts = [
  'не хочет ходить',
  'думает что он смоделированный абонент',
  'не знает куда идет',
  'не умеет ходить',
  'прогуливает моделирование',
  'на автопилоте',
  'идет(кродется)',
  'я что похож на абонента???',
  'не гоняйте пацаны вы матерям еще нужны...',
  'hood it',
];
const names = [
  'Агриппина',
  'Синклитикия',
  'Аграфена',
  'Нина',
  'Виола',
  'Цецилия',
  'Ангелина',
  'Пульхерия',
  'Матильда',
  'Нелли',
  'Наталия',
  'Евпраксия',
  'Тамила',
  'Лавиния',
  'Майя',
  'Василиса',
  'Феофания',
  'Клавдия',
  'Иезекииль',
  'Тит',
  'Агриппин',
  'Маркиан',
  'Флорентий',
  'Вадим',
  'Горазд',
  'Агапит',
  'Альфред',
  'Нафанаил',
  'Прокл',
  'Патрикий',
  'Кир',
  'Капитон',
  'Арис',
  'Руслан',
  'Ким',
  'Аэтий',
  'Фронтасий',
  'Акакий',
  'Ахилла',
  'Рэм',
  'Фирс'
];
