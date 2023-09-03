class Service {
  api: any;
  bus: any;
  constructor($controller) {
    this.api = $controller.api;
    this.bus = $controller.api;
  }
}

class OrderService extends Service {
  static xxxKey = 'xxxx';

  constructor($controller) {
    super($controller)
    // 使用全局缓存
    this.cache = $controller.tmpCache;
    // 或者构建一个新的 cache 挂载到 controller 上
    this.cache = $controller.getCreatedCache('order', XXXCache);
  }

  getOrders = async () => {
    if (this.cache.has(OrderService.xxxKey)) {
        return this.cache.get(OrderService.xxxKey);
    }
    let orders = await this.api('xxxxx');
    // 业务处理
    this.cache.set(OrderService.xxxKey, orders);

    // 可以发送全局事件
    this.bus.emit('getOrdersSuccess', orders);

    return orders;
  }

  clear () {
    // 如果构建一个新的缓存对象，直接 clear 即可 this.cache.clear();
    this.cache.delete(OrderService.xxxKey)
  }
}

class BBService {

}

class Controller {
  // 临时缓存，也可以添加更复杂的缓存
  static instance = {}

  static services = {}

  static getService (serviceCls) {
    // 构建类，内部本省有名字
    const { name } = serviceCls;
    if (!this.services[name]) {
        this.services[name] = new serviceCls(Controller.instance);
    }
    return this.services[name]
  }
}