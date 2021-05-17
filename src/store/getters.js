// const lark_url = 'https://open.feishu.cn/open-apis/authen/v1/user_auth_page_beta?app_id=cli_a0ef8b1a5279900e&redirect_uri=http%3A%2F%2F127.0.0.1%3A9527%2Fblueopen&state='
const lark_url = 'https://open.feishu.cn/open-apis/authen/v1/user_auth_page_beta?app_id=cli_a0ef8b1a5279900e&redirect_uri=http%3A//qa.blued.cn/blueopen&state='

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  lark: () => lark_url
}
export default getters
