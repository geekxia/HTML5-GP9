declare namespace API {

  type Tab = '' | 'ask' | 'good' | 'share' | 'job'

  interface CnodoParams {
    page: number,
    limit: number,
    tab?: Tab,    
    mdrender?: boolean
  }

  interface CnodeItem {
    author: {
      avatar_url: string,
      loginname: string,
      [key:string]: any
    },
    author_id: string,
    content: string,
    create_at: string,
    good: boolean,
    readonly id: string,
    last_reply_at: string,
    reply_count: number,
    tab: Tab,
    title: string,
    top: boolean,
    visit_count: number,
    [key: string]: any
  }

  interface CnodeList {
    [index: number]: CnodeItem,
    length: number
  }
}