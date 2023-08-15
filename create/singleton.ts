class SingletonCls { }

const singleton = new SingletonCls()

export default singleton

export class ToolsService1 {
  private static instance: ToolsService1 = new ToolsService1()

  public static getInstance(): ToolsService1 {
    return ToolsService1.instance
  }
}

export class ToolsService2 {
  private static instance: ToolsService2

  constructor(opts: any) {
  }

  public static getInstance(opts: any): ToolsService2 {
    if (ToolsService2.instance) {
      ToolsService2.instance = new ToolsService2(opts)
    }
    return ToolsService2.instance
  }
}