import type { App } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app: App<Element>): void => {
  app.use(ElementPlus, { locale })
}
