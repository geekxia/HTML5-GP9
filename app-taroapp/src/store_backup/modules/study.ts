import { observable, action, computed } from 'mobx'

class StudyStore {

  @observable
  counter = 100

  @computed
  get total () {
    return this.counter + 100
  }

  @action
  counterStore () {
    this.counter++
  }

  @action
  increment (step=1) {
    this.counter+=step
  }

  @action
  decrement() {
    this.counter--
  }

  @action
  incrementAsync (step=1) {
    return new Promise((resolve)=>{
      setTimeout(() => {
        this.counter+=step
        resolve()
      }, 1000)
    })
  }
}


export default StudyStore
