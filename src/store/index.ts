import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
  state: () => {
    return {
      avatarName: sessionStorage.getItem('avatarName') || "",
      avatarId: sessionStorage.getItem('avatarId') || "1",
      isAvatarModalVisible: sessionStorage.getItem('isAvatarModalVisible') === 'true',
      isMenuVisible: sessionStorage.getItem('isMenuVisible') === 'true',
      isHolySentenceModalVisible: sessionStorage.getItem('isHolySentenceModalVisible') === 'true',
      isQuestionModalVisible: sessionStorage.getItem('isQuestionModalVisible') === 'true',
      isDragAndDropModalVisible: sessionStorage.getItem('isDragAndDropModalVisible') === 'true',
      isHeightQuestionModalVisible: sessionStorage.getItem('isHeightQuestionModalVisible') === 'true',
      isEstimationModalVisible: sessionStorage.getItem('isEstimationModalVisible') === 'true',
      isCaptchaModalVisible: sessionStorage.getItem('isCaptchaModalVisible') === 'true',
      isModalsVisible: sessionStorage.getItem('isModalsVisible') === 'true',
      isLevelEntranceModalVisible: sessionStorage.getItem('isLevelEntranceModalVisible') === 'true',
      isResultModalVisible: sessionStorage.getItem('isResultModalVisible') === 'true',
      scoreWorld1: JSON.parse(sessionStorage.getItem('scoreWorld1') || "[0,0,0]" ) ,
    };
  },
  actions: {
    setAvatarName(name: string) {
      this.avatarName = name;
      sessionStorage.setItem('avatarName', this.avatarName);
    },
    setAvatarId(id: string) {
      this.avatarId = id;
      sessionStorage.setItem('avatarId', this.avatarId);
    },
    toggleAvatarModal() {
      this.isAvatarModalVisible = !this.isAvatarModalVisible;
      sessionStorage.setItem('isAvatarModalVisible', this.isAvatarModalVisible ? 'true' : 'false');
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      sessionStorage.setItem('isMenuVisible', this.isMenuVisible ? 'true' : 'false');
    },
    toggleModals() {
      this.isModalsVisible = !this.isModalsVisible;
      sessionStorage.setItem('isModalsVisible', this.isModalsVisible ? 'true' : 'false');
    },
    toggleHolySentenceModal() {
      this.isHolySentenceModalVisible = !this.isHolySentenceModalVisible;
      sessionStorage.setItem('isHolySentenceModalVisible', this.isHolySentenceModalVisible ? 'true' : 'false');
    },
    toggleQuestionModal() {
      this.isQuestionModalVisible = !this.isQuestionModalVisible;
      sessionStorage.setItem('isQuestionModalVisible', this.isQuestionModalVisible ? 'true' : 'false');
    },
    toggleDragAndDropModal() {
      this.isDragAndDropModalVisible = !this.isDragAndDropModalVisible;
      sessionStorage.setItem('isDragAndDropModalVisible', this.isDragAndDropModalVisible ? 'true' : 'false');
    },
    toggleHeightQuestionModal() {
      this.isHeightQuestionModalVisible = !this.isHeightQuestionModalVisible;
      sessionStorage.setItem('isHeightQuestionModalVisible', this.isHeightQuestionModalVisible ? 'true' : 'false');
    },
    toggleEstimationModal() {
      this.isEstimationModalVisible = !this.isEstimationModalVisible;
      sessionStorage.setItem('isEstimationModalVisible', this.isEstimationModalVisible ? 'true' : 'false');
    },
    toggleCaptchaModal() {
      this.isCaptchaModalVisible = !this.isCaptchaModalVisible;
      sessionStorage.setItem('isCaptchaModalVisible', this.isCaptchaModalVisible ? 'true' : 'false');
    },
    toggleLevelEntranceModalVisible() {
      this.isLevelEntranceModalVisible = !this.isLevelEntranceModalVisible;
      sessionStorage.setItem('isLevelEntranceModalVisible', this.isLevelEntranceModalVisible ? 'true' : 'false');
    },
    toggleResultModalVisible() {
      this.isResultModalVisible = !this.isResultModalVisible;
      sessionStorage.setItem('isResultModalVisible', this.isResultModalVisible ? 'true' : 'false');
    },
    setScoreWorld1(newScore:number[]){
      this.scoreWorld1 = newScore;
      sessionStorage.setItem('scoreWorld1', JSON.stringify(this.scoreWorld1));
    }
  },
})