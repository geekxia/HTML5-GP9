# 一、课程导学

- 1、Vue3官网：https://vuejs.org/
- 2、VueRouter4官网：https://router.vuejs.org/
- 3、Vuex4官网（不推荐）：https://vuex.vuejs.org/
- 4、Pinia2官网（推荐）：https://pinia.vuejs.org/
- 5、Vite构建工具：https://vitejs.dev/
- 6、UI组件库：Vant3、ElementPlus、ArcoDesign...
- 7、Vue3开源项目、Vue3生态日渐丰富。


- 两个重要的时间点：2020年9月（尤雨溪B站直接）、2022年2月（Vue3.2正式发布）
- Vue2用 Flow（由Facebook开源的）编写的
- Vue3用 TS（由微软开源的）编写的


# 二、环境搭建

- 注意：Node版本V16以上、npm版本(v7以上)。

1、Vue3项目创建有三种方式：vite（推荐）、create-vue（最新）、@vue/cli（得到webpack环境，不推荐）

- npm create vite@latest vue3-stack -- --template vue-ts  创建Vue3的TS项目
- cd vue3-stack
- yarn / cnpm install / npm install 安装依赖包
- npm run dev  运行项目

2、使用VScode编辑

- volar插件安装、vetur禁用插件
- chinese插件安装，支持中文提示，主要解决TS报错问题

3、SFC单文件组件有些什么变化？

- <script>可以有多个，但<script setup>只能有一个，使用<script lang='ts'>直接支持TS。
- <template>只能有一个，但支持多个根节点。
- <style>可以有多个，并且可以同时支持多种不同的CSS预编译器，还可以在<style>可以使用v-bind指令。


# 三、关于Vue3

1、两种语法范式

  - 选项式开发（options）
    - 像Vue2那样地写代码，Vue3是支持向下兼容Vue2的，可以只使用Vue2写法。
    - Vue2选项+setup选项，一起交叉使用，可以同时编写Vue2风格的代码，还可以写Vue3风格代码。
    - 只使用setup选项，不使用Vue2选项，这种写法就是Vue3写法。
  - 组合式开发（Composition）
    - 使用<script setup>语法糖写法，这样以后，就不能再使用options选项了，规避掉了Vue2写法。

2、相对Vue2，Vue3最大的变化？
  - Vue3解决了Vue2数据和逻辑不分离的问题。

3、Vue3是如何解决“数据和逻辑不分离”的问题？
  - 第一步，把所有的选项替换成组合API；（为了替换掉那些选项，搞了一堆组合API）
  - 第二步，分析业务逻辑，封装自定义Hooks。（灵感来自 React Hooks）

4、使用组件化封装组件，和Hooks实现逻辑分离，有什么本质区别？
  - 从组件化的角度解决逻辑分离问题，会增加组件间通信关系的复杂度。组件封装，更多考虑的是视图结构的复用。
  - Hooks实现逻辑分离，才是真正的逻辑分离，可以不拆分组件，不会增加组件间的通信关系。

# 四、详解组合API

- ref
- reactive
- computed
- watch
- watchEffect
- toRefs
- onMounted
- onBeforeUnmount
- onActivated
- onDeactivated

# 五、父子组件通信

- 自定义事件，在子组件中使用 emits选项或defineEmits接收，一定要接收，否则无法触发自定义事件。
- 父传子使用自定义属性，在子组件中使用props选项或defineProps接收。在使用props时，如果用到了解构语法，响应式会失效，使用toRefs进行包裹。
- 子传父使用自定义事件，在子组件中使用 $emit() / context.emit() / const emit = defineEmits() 触发自定义事件并回传数据。
- 简易的父子通信，可以使用 v-model语法糖，需要注意的是 v-model = :modelValue + @update:modelValue 。


# Vue3语法细节

- 一、变化了哪些细节

1、ref操作的变化。v2中使用ref属性访问DOM或组件实例，在this.$refs上访问它们；在v3中，使用ref这个组合API，配合ref属性来访问DOM或组件实例；当ref和v-for同时使用时，不再自动收集ref实例了，需要封装自定义收集方法。

2、异步组件的变化：v2中使用Promise模拟异步组件；在v3中，使用defineAsyncComponent定义异步组件。

3、$attrs的变化：v2中用于接收自定义属性们（但不包括class和style）；v3中除了自定义属性，可以接收class和style了。使用 $attrs / setupCtx.attrs / useAttrs() 接收。

4、自定义指令的变化：v2中使用Vue.directive()定义全局指令；v3中使用app.directive()定义全局指令。v3中自定义指令的钩子们发生系列变化。局部指令仍然使用directives选项。

5、创建根实例的系列变化：v3中使用 createApp()创建根实例；创建根实例时如果用到data选项，data只能写成工厂函数；挂载根实例节点时只能使用$mount()，el选项没有了。

6、函数式组件的变化：v2中是支持函数式组件的，v3中对函数式组件的支持更加强大。

7、Vue构造器函数的变化：v2中可以使用Vue这个构造函数，所有全局API都放在Vue上。v3中，不能使用Vue构造函数了，只能使用createApp()来创建根实例。为什么在v3中要隐藏Vue这个构造函数呢？第一个原因，为了避免开发者操作原型链，这会影响Vue应用的性能；第二原因，是为了配合Webpack实现Vue层面上的"Tree-Shaking"功能。虽然在v3中我们不能在原型链上添加API了，在v3中推荐app.config.globalProperties来添加全局数据。

8、过滤动画的变化：v3中，编写自定义动画名时，使用.qf-enter-from表示进入动画的开始时刻，使用.qf-leave-from表示离开动画的开始时刻。当<transition>对多个元素执行动画时，无须再加key。

9、条件渲染的变化：v3中，v-if/v-else-if/v-else在任何地方使用时，都无须手动添加唯一的key值，v3中会自动为节点们加key。

10、render选项的变化：v2中，render: (h)=>h(App)，也就是h函数在render函数的形参中。v3中，render函数没有h这个形参了，把h函数单独变成一个API。

11、v-if和v-for同时使用的变化：v2中不推荐它两一起用，如果一起用，v-for优化级更高。v3中，这两指令可以一起用，但v-if优先级总是更高。

12、watch监听器的变化：v3中，watch可以同时监听多个声明式变量的变化，调用watch()返回stop()方法（用于停止监听）。

13、接收props的变化：v2中接收props时，如果引用数据类型，default写成工厂函数，在这个工厂函数中可以访问this。在v3中，default工厂函数中没有this，但可以使用inject()。

14、v-model的变化：v3中，在HTML表单上，v-model用法没有变化，包括语法糖写法和v2是一样的。v3中，在自定义组件上，v-model等于:modelValue+@update:modelValue。在自定义组件上，可以同时使用多个v-model，像这样 <Form v-model:x='' v-model:y=''>。v3中，使用v-model时，可以支持自定义修饰符，在子组件中使用 xModifiers: { default: ()=>({})} 接收自定义修饰符。model选项被淘汰了。

15、在使用插槽时，即使是默认插槽，在使用时也要这样 <template #default>。


- 二、移除了哪些细节

1、移除了$listeners

2、移除了$children

3、移除了$on/$off/$once事件API，也就是说“事件总线”被移除了。

4、移除了过滤器，没有这个 app.filter()，也没有了filters选项。

5、移除了 Vue.config.keyCodes 自定义键盘码的功能。

6、移除了 el选项。

7、移除了 propsData选项（从new Vue()向App根组件传递初始化数据），在v3中的替代方案是createApp(App, {数据})的第二个参数。

8、移除了 v-on的.native 修饰符。在v2中，这个修饰符是用于解决移动端事件绑定的性能优化。

9、移除了 model选项。（在v2中，model选项用于自定义 v-model语法糖。）



- 三、新增了哪些细节

1、新增了emits选项、新增了defineEmits()，用于在子组件中接收自定义事件。

2、视图模板支持多节点了，类似React的Fragment功能。需要注意的是，因为组件支持多节点了，对$attrs/<transition>等功能有些影响。

3、新增了 getCurrentInstance() ，在组件中访问app根实例以及其全局数据。需要注意的是，这个API所获取到的app实例，和main.js中的那个app不是完全相同的。

4、新增了 app.provide() 这个全局API，向整个组件树中注入全局数据。在某种程度上讲，这种玩法可以替代app.config.globalProperties这种玩法。

5、新增了 nextTick() 这个API。在v3中，nextTick()也支持"Tree-Shaking"了。

6、新增了 <teleport to='HTML标签/id选择器'>，用于把嵌套的HTML渲染到to属性对应的DOM中去。<teleport>不支持对js的穿梭。

7、新增了 <suspense> 内置组件。用于给异步Vue组件添加交互提示。常常配合<transition> <keep-alive> <router-view> 一起用，给整个系统添加统一的交互（Loading...过渡动画、组件缓存等）。

8、新增了 v-memo 指令。用于性能优化。<div v-memo='[依赖列表]'></div>  有且仅有当依赖列表中的变量发变化时，其内部的视图结构才会更新。forceUpdate()可以做到强制v-memo更新。

9、在<style>中可以使用 v-bind了，v3给了我们第三种实现动态样式的玩法。<style module=''>可以实现样式模块化，给<style>添加命名空间。在视图模板中，使用"$style/样式模块名称"访问样式模块中的样式，在setup使用 useCssModule()可以访问样式模块中的新式。

10、新增了 expose选项 / defineExpose() ，用于把setup中的指定变量暴露出来，给其它组件进行访问与引用。原因是，在v3中，写setup()和<script setup>中的变量默认是隐藏的，无法被其它组件访问。所以，这两个新增的api就是解决这个问题的。

11、新增了 useSlots()，用于在子组件访问插槽作用域。和$slots作用一致。


# 路由系统

- 版本：v3架构中，只能使用VueRouter(v4)
- 安装：cnpm i vue-router -S

- 在v3项目中如何集成路由系统？
  - 第一步：创建路由实例（指定路由模式、定义路由规则、路由守卫等）
  - 第二步：在main.ts中进行注册
  - 第三步：在App.vue中使用 <router-view>来显示组件视图。

- vue-router(v4)那些变化的细节
1、在vue(3)架构中，只能使用vue-router(4)
2、创建路由实例时，使用 createRouter() 创建路由实例
3、指定路由模式，使用 history: createWebHashHistory() / createWebHistory()
4、注册路由，在main.js 使用 app.use(router)进行注册。
5、<router-link>没有tag属性了，默认渲染成a标签。如果修改默认渲染，使用<router-link to='' v-slot='{}' custom>插槽功能。
6、<router-view>也有插槽功能了，像这样 <router-view v-slot='{}'>，常常配合 <keep-alive> <suspense> <transition>一起使用。
7、新增了三个Hooks API：useRouter()路由跳转、useRoute()路由信息、useLink()和<router-link v-slot>插槽回传的API一致。
8、三个全局守卫没有任何变化。三个局部守卫对应的组合API变成了两个：onBeforeRouteLeave, onBeforeRouteUpdate。
9、router.addRoutes([])这个方法淘汰了，只保留了router.addRoute(route)

# Vant3安装

- 参见文档：https://vant-contrib.gitee.io/vant/#/zh-CN

# Vuex4(现在不推荐使用了)

- 提示：去年下半年的一些Vue3项目，还在使用Vuex4.

- Vuex4相比Vue3有哪些细节变化？
- 1、创建store，不再是new Vuex.Store()，使用createStore({})
- 2、在main.ts，这样注册 app.use(store)
- 3、新增了 useStore()，在组合式开发中获取store实例（类似$store）
- 4、在组合式开发中，使用store时，必须使用 computed这个组合API进行包裹，否则不具有响应式。
  - 解决方案：const token = computed(()=>store.user.token)


# Pinia2（推荐使用的状态管理）

- Pinia特点
- 1、Pinia是下一代的Vuex，Pinia2事实上在Vue2架构和Vue3架构都能使用。
- 2、Pinia是多store开发模式，也就是说你可以在你的Vue项目，任意地创建store。
- 3、Pinia2对Hooks编程非常支持、对TS也有非常好的支持。
- 4、Pinia2的安装、集成、封装、集成，都非常方便。

- 安装集成 cnpm i pinia -S
- 第一步：在main.ts 中创建实例 const pinia = createPinia()
- 第二步：在main.ts中注册 app.use(pinia)
- 第三步：在src目录任何有需要的地方，定义并封装你需要store

- 盘点Pinia2的若干知识

- 1、怎么使用Pinia？使用 createPinia()创建pinia实例，app.use(pinia)

- 2、怎么定义pinia的store？const useUserStore = defineStore('storeId', { state, getters, actions })
  - state必须是工厂函数，具有响应式！
  - getters是计算属性，具有缓存功能。它可以对当前store的state进行计算，还可以对当前store中的另一个getters进行计算，还可以其它store中的state或getters进行计算（shared getters）。getters还可以接收入参getters: { total: (state) => arg => () }。getters方法写成箭头函数，其中是没有this的。
  - actions用于封装同步或异步的方法，用于直接修改当前store中state的。在actions方法中还调用其它store中的actions方法，或者使用其它store中的state（这叫shared actions）。

- 3、怎么使用Pinia的store？在哪些地方可以使用呢？
  - 在组件中，const userStore = useUserStore()，访问这个store的state/getters/actions。
  - 在组件外部，比如路由守卫中，或者在其它自定义Hooks使用，要注意 useUserStore()代码要写在函数体中。

- 4、怎么修改Pinia中state数据？
  - userStore.num++
  - userStore.$state.num += 1
  - user.$patch({ num: 10, token: '' }) 批量修改
  - user.setNum(10)  通过actions方法进行修改

- 5、storeToRefs()
  - 当我们在使用Pinia的store时，如果进行解构操作，这会导致响应式失败。这里可以使用storeToRefs()解决。

- 6、Pinia的两个用于监听的API
  - const unsubscrible = store.$subscrible(({ events},state)=>{}, {detached: true})，监听当前store的变化。调用 unsubscrible()可以取消监听。默认情况下当前组件销毁时，也可以停止监听。如果希望组件销毁时继续监听，添加 {detached:true}选项 。
  - store.$onActions(({name, after})=>{}) 用于监听哪些actions方法执行了，其中name表示执行的那个actions方法名，after是一个钩子表示当前actions代码执行完成。一般用于测量actions方法的运行时间。

- 7、Pinia中多store的组合
  - nested stores
  - shared getters
  - shared actions
  - 关于多store组合的一些思考：为了保证代码的可维护性，页面级别的store可以使用src/store，反之不建议。多store之间不要相互作用，这会产生死循环，类似watch相互监听的那样。

- 8、Pinia是支持插件的。
  - pinia.use((context)=>{ })  一次性向多个store添加公共的属性或方法，这是一种代码层面的复用技巧。


# Vite3

- 基于webpack的脚手架：@vue/cli、create-react-app

- 1、vite有哪些特点？

  （1）无须打包的冷启动：Vite项目启动，先启动本地服务，借助于浏览器内置的ESModule能力，根据路由访问源码模块资源（按需加载），如果是一些非JS资源模块，就会采用Vite Plugins进行编译（得到ESModules）。
  （2）也支持良好的HMR(Hot Module Replacement)：Vite启动时，除了启动本地端口外，还会启动一个websocket服务并监听源码文件变化，当源码文件有变化时，websocket服务主动向浏览器发送信号，浏览器请求对应的module更新视图。
  （3）vite环境默认就支持TS：vite的背后对TS编译的采用是ESbuild，不是传统的tsc编译器。ESbuild是用go编写的，其执行是一般编译器的20倍以上，如果还采用了多线程，那么编译速度至少百倍以上。
  （4）vite构建打包是基于rollup：用vite创建的项目，打包上线时采用的是rollup，更稳定也更成熟。vite虽然在启动开发环境时有明显的速度优化（冷启动），但打包编译仍然是很慢的，并且项目越大，打包越慢。因为rollup打包前端项目，最终目标是得到浏览器能够普遍兼容的静态资源代码。
  （5）vite是基于插件的：当我们构建vite应用，业务源码中遇到浏览器无法解析的模块时，就要使用vite插件来解决。当浏览加载这些非JS模块时，对应的vite插件就会编译这些模块（得到ESModule能支持的模块即可）。当构建打包上线，这些插件也会起作用，编译得到浏览器普遍兼容的静态文件。
  （6）vite是生态开放的：也就是vite官方开放了很多API、TS类型，给社区的你使用。用这些开放的API，你可编写你的vite插件，支持一些特定功能。出于规范，vite插件一般长这样 vite-plugin-* / @vitejs/plugin-*。

- 2、vite常用配置选项有哪些？
  - vite.config.js 你常用的配置选项有哪些？自己整理10个。

- 3、怎么使用vite搭建vue3开发环境？
- 4、怎么使用vite搭建react开发环境？


# Vue3开源项目推荐

- Cool-Admin项目（架构设计、权限设计）
  - 预览效果：https://show.cool-admin.com/login   访问账号：admin / 123456
  - 官网：https://cool-js.com/
  - 代码下载：https://github.com/cool-team-official

- PPTlist项目（Hooks编程、JS功能开发）
  - 预览效果：https://pipipi-pikachu.github.io/PPTist/
  - 代码下载：https://github.com/pipipi-pikachu/PPTist

- vue-vben-admin项目（管理系统设计）
  - 预览效果：https://vvbin.cn/next/#/login
  - 代码下载：https://gitee.com/annsion/vue-vben-admin?_from=gitee_search

- newbee-ltd系列项目（移动端、官网、管理系统）
  - 代码下载：https://github.com/newbee-ltd

# 响应式原理、MVVM

- 资源：《Vue.js设计与实现》霍春阳（Hcy）
- 霍春阳（Hcy）知乎：https://www.zhihu.com/people/hcysunyang/posts
- vue-template-explorer
  - 网址：https://vue-next-template-explorer.netlify.app/

- 响应式原理的变化
  - Vue2使用Object.defineProperty(app, 'k', {})  效率低、对对象深度劫持需要递归、对数组响应不友好。
  - Vue3使用const proxyTarget = new Proxy(target, {})  效率高，添加/修改/访问/删除对象都能被监听到，对数组响应也很友好。

- 虚拟DOM生成的变化
  - 什么虚拟DOM？一个层级JSON对象，用于描述真实DOM结构。它存在意义是为了更新阶段，为Diff运行而准备的，减少没有必要的DOM操作。
  - 在Vue2中，虚拟DOM的生成是这样的，从挂载根节点，逐渐层循环递归。当setter时，重新循环递归，再生成一个新的虚拟DOM。不考虑那些静态的模板节点。
  - 在Vue3中，虚拟DOM的生成是这样的，第一次生成虚拟DOM时，把所有的静态节点都做提升起来，对所事件都进行缓存，对所有节点都添加PatchFlag标记；当setter时，也是生成一个新的虚拟DOM，但是会考虑已经提升的静态节点们。

- Diff运算规则的变化
  - 在Vue2中，使用patch(nVnode, oVnode)循环递归比较，得到一个脏节点集合。
  - 在Vue3中，作者改良了diff运算，会根据PatchFlag标记选择性进行对比，也就说尽可能减少没必要的对比。

- Vue3面试题、Vue3项目优化经验。
