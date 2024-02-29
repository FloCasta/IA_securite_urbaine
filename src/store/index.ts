import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
  state: () => {
    return {
      avatarName: sessionStorage.getItem('avatarName') || "",
      avatarId: sessionStorage.getItem('avatarId') || "1",
      isAvatarModalVisible: sessionStorage.getItem('isAvatarModalVisible') === 'true',
      isRessourceModalVisible: false,
      isRessourceVisible: false,
      isMenuVisible: sessionStorage.getItem('isMenuVisible') === 'true',
      isHolySentenceModalVisible: sessionStorage.getItem('isHolySentenceModalVisible') === 'true',
      isMultipleChoiceModalVisible: sessionStorage.getItem('isMultipleChoiceModalVisible') === 'true',
      isDragAndDropModalVisible: sessionStorage.getItem('isDragAndDropModalVisible') === 'true',
      isHeightQuestionModalVisible: sessionStorage.getItem('isHeightQuestionModalVisible') === 'true',
      isEstimationModalVisible: sessionStorage.getItem('isEstimationModalVisible') === 'true',
      isCaptchaModalVisible: sessionStorage.getItem('isCaptchaModalVisible') === 'true',
      isModalsVisible: sessionStorage.getItem('isModalsVisible') === 'true',
      isHangedModalVisible: sessionStorage.getItem('isHangedModalVisible') === 'true',
      isConnectPairsModalVisible: sessionStorage.getItem('isConnectPairsModalVisible') === 'true',
      isFlashCardModalVisible: sessionStorage.getItem('isFlashCardModalVisible') === 'true',
      isLevelEntranceModalVisible: sessionStorage.getItem('isLevelEntranceModalVisible') === 'true',
      isResultModalVisible: sessionStorage.getItem('isResultModalVisible') === 'true',
      scoreWorld1: JSON.parse(sessionStorage.getItem('scoreWorld1') || "[0,0,0]"),
      scoreWorld2: JSON.parse(sessionStorage.getItem('scoreWorld2') || "[0,0,0]"),
      scoreWorld3: JSON.parse(sessionStorage.getItem('scoreWorld3') || "[0,0,0]"),
      scoreWorld4: JSON.parse(sessionStorage.getItem('scoreWorld4') || "[0,0,0]"),
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
    toggleRessourceModal() {
      this.isRessourceModalVisible = !this.isRessourceModalVisible;
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
    toggleMultipleChoiceModal() {
      this.isMultipleChoiceModalVisible = !this.isMultipleChoiceModalVisible;
      sessionStorage.setItem('isMultipleChoiceModalVisible', this.isMultipleChoiceModalVisible ? 'true' : 'false');
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
    toggleHangedModal() {
      this.isHangedModalVisible = !this.isHangedModalVisible;
      sessionStorage.setItem('isHangedModalVisible', this.isHangedModalVisible ? 'true' : 'false');
    },
    toggleConnectPairsModal() {
      this.isConnectPairsModalVisible = !this.isConnectPairsModalVisible;
      sessionStorage.setItem('isConnectPairsModalVisible', this.isConnectPairsModalVisible ? 'true' : 'false');
    },
    toggleFlashCardModal() {
      this.isFlashCardModalVisible = !this.isFlashCardModalVisible;
      sessionStorage.setItem('isFlashCardModalVisible', this.isFlashCardModalVisible ? 'true' : 'false');
    },
    toggleLevelEntranceModalVisible() {
      this.isLevelEntranceModalVisible = !this.isLevelEntranceModalVisible;
      sessionStorage.setItem('isLevelEntranceModalVisible', this.isLevelEntranceModalVisible ? 'true' : 'false');
    },
    toggleResultModalVisible() {
      this.isResultModalVisible = !this.isResultModalVisible;
      sessionStorage.setItem('isResultModalVisible', this.isResultModalVisible ? 'true' : 'false');
    },
    setScoreWorld1(newScore: number[]) {
      this.scoreWorld1 = newScore;
      sessionStorage.setItem('scoreWorld1', JSON.stringify(this.scoreWorld1));
    },
    setScoreWorld2(newScore: number[]) {
      this.scoreWorld2 = newScore;
      sessionStorage.setItem('scoreWorld2', JSON.stringify(this.scoreWorld2));
    },
    setScoreWorld3(newScore: number[]) {
      this.scoreWorld3 = newScore;
      sessionStorage.setItem('scoreWorld3', JSON.stringify(this.scoreWorld3));
    },
    shuffleItems(values: any[]) {
      if (values) {
        let shuffledItems = [...values];
        for (let i = shuffledItems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
        }
        return shuffledItems;
      }
    },
    closeAllModals(){
      if(this.isHolySentenceModalVisible)
        this.toggleHolySentenceModal()       
      if(this.isMultipleChoiceModalVisible)
        this.toggleMultipleChoiceModal()    
      if(this.isDragAndDropModalVisible)
        this.toggleDragAndDropModal()
      if(this.isHeightQuestionModalVisible)
        this.toggleHeightQuestionModal()
      if(this.isEstimationModalVisible)
        this.toggleEstimationModal()     
      if(this.isCaptchaModalVisible)
        this.toggleCaptchaModal()
      if(this.isHangedModalVisible)
        this.toggleHangedModal()
      if(this.isConnectPairsModalVisible)
        this.toggleConnectPairsModal()
      if(this.isFlashCardModalVisible)
        this.toggleFlashCardModal()
      if(this.isResultModalVisible)
        this.toggleResultModalVisible()
      
    }
  }
})