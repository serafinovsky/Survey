# Использование

```javascript
// Создаем экземпляр опроса
const questionOptions = "Какой ваш любимый цвет?;Красный;Синий;Зеленый";
const multipleChoice = true;
const survey = new Survey(questionOptions, multipleChoice);

// Устанавливаем голоса
const userAnswers = [
  ["user1", "Красный;Синий"],
  ["user2", "Красный;Зеленый"],
];
survey.setVotes(userAnswers);

// Отображаем результаты
const results = survey.displayResults();
console.log(survey.question);
// Какой ваш любимый цвет?
console.log(results.join("\n"));
// Красный: 50.00%  ##################################################
// Синий: 25.00%    #########################
// Зеленый: 25.00%  #########################
```
