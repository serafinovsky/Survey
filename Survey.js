"use strict";
class Survey {
  constructor(questionOptions, multipleChoice) {
    [this.question, ...this.options] = questionOptions.split(";");
    this.multipleChoice = multipleChoice;
    this.votes = {};
  }
  getQuestion() {
    return this.question;
  }
  setVotes(userAnswers) {
    this.votes = {};
    userAnswers.forEach((userAnswer) => {
      let answers = userAnswer[1].split(";");
      if (!this.multipleChoice) {
        answers = answers.slice(0, 1);
      }
      answers.forEach((answer) => {
        if (!this.options.includes(answer)) {
          return;
        }
        this.votes[answer] = (this.votes[answer] || 0) + 1;
      });
    });
  }
  displayResults(showProgressBar = true) {
    const totalVotes = Object.values(this.votes).reduce(
      (sum, votes) => sum + votes,
      0
    );
    const maxLength = this.options.reduce(
      (max, str) => Math.max(max, str.length),
      0
    );
    const padEnd = maxLength + 10;
    const results = [];
    this.options.forEach((option) => {
      const votes = this.votes[option] || 0;
      const percentage = (votes / totalVotes) * 100;
      const progressBar = "#".repeat(percentage);
      let optionResult = `${option}: ${percentage.toFixed(2)}%`;
      optionResult = optionResult.padEnd(padEnd);
      if (showProgressBar) {
        optionResult += `${progressBar}`;
      }
      results.push(optionResult.trim());
    });
    return results;
  }
}
