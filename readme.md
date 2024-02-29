# Использование

```javascript
// Создаем экземпляр опроса
const questionOptions = "Какой ваш любимый цвет?;Красный;Синий;Зеленый";
const multipleChoice = true;
const survey = new Survey(questionOptions, multipleChoice);

// Устанавливаем голоса
survey.setVotes([
  ["user1", "1"],
  ["user2", "2;3"],
  ["user3", "1;3"],
  ["user1", "3;1"],
]);

// Отображаем результаты
console.log(survey.question);
// Какой ваш любимый цвет?

console.log(survey.getResults().join("\n"));
// 33.33333333333333
// 16.666666666666664
// 50

// Вывод на страницу
const surveyElement = document.getElementById("survey");
surveyElement.innerHTML = survey.displayResultsAsHTML(true);
```

Пример - https://jsfiddle.net/hegwdcp5/
