# 单例模式

> 保证一个类只有一个实例，并提供一个访问它的全局访问点。

## 为什么要使用单例？

单例模式的用途非常的广泛，他可以存储全局唯一的信息：如配置或者设置信息，唯一 ID 生成器。还可以解决资源访问冲突问题。如开始任务以及停止任务等功能。

## 基础实现

对于 JavaScript 开发者来说，单例模式的实现非常简单，只需要从模块中倒出一个实例，基本上就做到了单例模式所具备的效果。因为 JavaScript 对应的模块系统会缓存模块对应的代码，当用户多次调用时候，只会从缓存中获取对应模块，而不会重新执行一遍。

```ts
class ToolsService {}

const toolService = new ToolsService();

export default toolService;
```

但是开发者不应该依赖于模块系统本身的特性来实现单例模式,应该采用更健壮的实现方式。

设计模式有两种实现方式：饿汉模式和懒汉模式。

饿汉模式代码如下所示：

```ts
export class ToolsService {
  private static instance: ToolsService = new ToolsService();

  public static getInstance(): ToolsService {
    return ToolsService.instance;
  }
}

ToolsService.getInstance()
```

懒汉模式的代码如下所示：

```ts
export class ToolsService {
  private static instance: ToolsService;
  
  // 可以在使用时候再配置
  constructor(opts: any) {}

  public static getInstance(): ToolsService {
    if (ToolsService.instance) {
      ToolsService.instance = new ToolsService(opts);
    }
    return ToolsService.instance;
  }
}

ToolsService.getInstance(opts)
```

## 使用场景

其实针对服务端开发而言，单例模式的意义不是很大。
- 服务端开发有 IOC 容器来保证对象的全局唯一。
- 虽然提前初始化实例是一个浪费资源的行为。但它可以让问题及早暴露。以避免服务端运行时，由于初始化某个实例占用资源过多，导致系统卡顿甚至崩溃，影响系统的可用性。

但对于前端开发来说，延迟加载无疑可以提升用户体验，因为用户往往用不到当前模块下所有的功能。所以推荐大家使用懒汉模式。

由于 JavaScript 是一个单线程的语言，所以单例模式中的懒汉不像 Java 语言，是没有线程问题的。

