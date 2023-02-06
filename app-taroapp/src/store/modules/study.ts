import { makeAutoObservable } from 'mobx'
// import { makeObservable, observable, action, computed } from 'mobx'

class StudyStore {
  constructor () {
    makeAutoObservable(this)

    // makeObservable(this, {
    //   counter: observable,
    //   total: computed,
    //   incrementAsync: action
    // })
  }

  counter = 0

  get total () {
    return this.counter + 100
  }

  counterStore (step) {
    this.counter+=step
  }

  increment(step) {
    console.log('--step', step)
    this.counter+=step
  }

  decrement() {
    this.counter--
  }

  // 为了配合useDispatch的更新流程，要求异步的action返回Promise
  incrementAsync(step) {
    return new Promise(resolve=>{
      setTimeout(() => {
        this.counter+=step
        resolve()
      }, 1000)
    })
  }
}

export default StudyStore
