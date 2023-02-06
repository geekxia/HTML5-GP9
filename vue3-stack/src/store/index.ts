import useArticleStore from './useArticleStore'
import useUserStore from './useUserStore'

// 封装自定义Hooks，把多个独立的store合并一个更大store
function useStore () {
  const article = useArticleStore()
  const user = useUserStore()
  return {
    article,
    user
  }
}

export default useStore
