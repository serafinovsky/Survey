type Votes = [string, string[]];
type VotesRaw = [string, string];
type UserOptions = { [k: string]: string[] };

class Survey {
  private readonly question: string;
  private readonly options: string[];
  private votes: { [k: string]: number };
  private readonly multipleChoice: boolean;

  constructor(questionOptions: string, multipleChoice: boolean) {
    [this.question, ...this.options] = questionOptions.split(";");
    this.multipleChoice = multipleChoice;
    this.votes = {};
  }

  getQuestion(): string {
    return this.question;
  }

  setVotes(userVotes: VotesRaw[]): void {
    this.votes = {};
    const clearVotes = this.clearVotes(userVotes);
    const groupedVotes = this.groupByUser(clearVotes);
    const allVotes: string[] = [];
    allVotes.concat(...Object.values(groupedVotes)).forEach((vote) => {
      this.votes[vote] = (this.votes[vote] || 0) + 1;
    });
  }

  private clearVotes(userVotes: VotesRaw[]): Votes[] {
    return userVotes.map(([user, rawOptionPositions]) => {
      const optionPositions = rawOptionPositions.split(";").map(Number);
      const options: string[] = optionPositions
        .filter((position) => this.options[position - 1] !== undefined)
        .map((position) => this.options[position - 1]);
      return [user, options];
    });
  }

  private groupByUser(clearUserVotes: Votes[]): UserOptions {
    const userOptions: UserOptions = {};
    clearUserVotes.forEach(([user, options]) => {
      const userVotes = userOptions[user] || [];
      if (userVotes.length && !this.multipleChoice) {
        return;
      }
      if (!this.multipleChoice) {
        options = options.slice(0, 1);
      }
      userOptions[user] = Array.from(new Set([...userVotes, ...options]));
    });
    return userOptions;
  }

  getResults(): number[] {
    const totalVotes = Object.values(this.votes).reduce(
      (sum, votes) => sum + votes,
      0
    );

    return this.options.map((option) => {
      const votes = this.votes[option] || 0;
      return (votes / totalVotes) * 100;
    });
  }

  displayResultsAsHTML(showProgressBar: boolean = true): string {
    const resultsElement = document.createElement("div");
    resultsElement.style.display = "flex";
    resultsElement.style.flexDirection = "column";

    this.getResults().forEach((result, index) => {
      const optionElement = document.createElement("div");
      optionElement.innerText = `${this.options[index]}: ${result.toFixed(2)}%`;
      optionElement.style.position = "relative";
      optionElement.style.marginBottom = "4px";
      if (showProgressBar) {
        const progressBarElement = document.createElement("div");
        progressBarElement.style.width = `${result.toFixed(2)}%`;
        progressBarElement.style.height = "100%";
        progressBarElement.style.borderTopLeftRadius = "4px";
        progressBarElement.style.borderBottomLeftRadius = "4px";
        if (result === 100) {
          progressBarElement.style.borderTopRightRadius = "4px";
          progressBarElement.style.borderBottomRightRadius = "4px";
        }
        progressBarElement.style.position = "absolute";
        progressBarElement.style.top = "0";
        progressBarElement.style.left = "0";
        progressBarElement.style.opacity = "0.8";
        progressBarElement.style.mixBlendMode = "difference";
        progressBarElement.style.backgroundColor = "#f1f1f1";

        optionElement.style.paddingLeft = "8px";
        optionElement.style.backgroundColor = "#f1f1f1";
        optionElement.style.borderRadius = "4px";
        optionElement.appendChild(progressBarElement);
      }
      resultsElement.appendChild(optionElement);
    });
    return resultsElement.outerHTML;
  }
}
