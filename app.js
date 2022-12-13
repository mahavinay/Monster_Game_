function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      currentUserInput: "",
      message: "lklklk",
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) return { width: "0%" };
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      if (this.playerHealth < 0) return { width: "0%" };
      return { width: this.playerHealth + "%" };
    },

    calculateCurrentRound() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) this.winner = "monster";
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) this.winner = "player";
    },
  },
  methods: {
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    attackMonster() {
      this.currentRound++;
      this.monsterHealth -= randomValue(12, 5);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= randomValue(15, 8);
    },
    specialAttack() {
      this.currentRound++;
      this.monsterHealth -= randomValue(10, 18);
      this.attackPlayer();
    },
    healPlayer() {
      this.computed++;
      const healValue = randomValue(8, 16);
      if (healValue + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else this.playerHealth += healValue;
      this.attackPlayer();
    },
    surrender() {
      return (this.winner = "monster");
    },
    saveInput(event) {
      return (this.currentUserInput = event.target.value);
    },

    setText() {
      // return (this.message = this.currentUserInput);
      return (this.message = this.$refs.userText.value);
    },
  },
});

app.mount("#game");
