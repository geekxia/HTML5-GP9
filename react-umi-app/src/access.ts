
// 这个方法的形参数据，来自于app.ts中的getInitialState()方法
// @umijs/plugin-access
export default function ({ userinfo }) {
  // const { userId, role } = initialState;
  const { role } =  userinfo
  // 返回权限字符串
  return {
    qf: false,
    isAdmin: role === 'admin'
  };
}
