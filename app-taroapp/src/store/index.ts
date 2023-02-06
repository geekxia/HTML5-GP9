import Study from './modules/study'

class Store {
  constructor () {
    this.study = new Study()
  }
}

const store = new Store()
export default store
