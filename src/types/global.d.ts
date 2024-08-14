/* Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<unknown>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }

  interface MetaProps {
    icon: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide: boolean
    isFull: boolean
    isAffix: boolean
    isKeepAlive: boolean
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon'

  type ExcelMimeType = 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_ENV: 'development' | 'production' | 'test' //环境
  VITE_GLOB_APP_TITLE: string //名称
  VITE_PORT: number //启动端口
  VITE_OPEN: boolean //是否自动打开浏览器
  VITE_REPORT: boolean //打包后是否生成包分析文件
  VITE_ROUTER_MODE: 'hash' | 'history' //路由模式
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none' //是否启用 gzip 或 brotli 压缩打包，如果需要多个压缩规则，可以使用 “,” 分隔
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean //打包压缩后是否删除源文件
  VITE_DROP_CONSOLE: boolean //打包时是否删除 console
  VITE_PWA: boolean //VitePWA
  VITE_PUBLIC_PATH: string //公共基础路径
  VITE_APP_BASE_API: string
  VITE_PROXY: [string, string][]
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}
