title: 谷歌地图 Google Map API 初体验
date: 2016-02-03 18:32:51
tags: [Google Map, Google Map API, 谷歌地图API, 谷歌地图]
---
一直都想把自己去过的地方做个地图标记，然而现在能找到的各种现成的地图产品都不太喜欢，所以就用谷歌地图自己写了一个。
总结以下常见的问题和坑：
### 自动缩放(auto zoom)
使用场景大多数时候是有很多marker，想要全部显示这些marker，同时zoom当然越大越清晰。
- 首先需要一个marker的位置列表 `markerList`，单个元素长这样`{lat:xxx,lng:xxx}`
- 遍历列表，把元素传入`google.maps.LatLngBounds`实例的`extend`方法
```
var latlngbounds = new google.maps.LatLngBounds();
markerList.forEach(function (item) {
  latlngbounds.extend(item);
});
map.fitBounds(latlngbounds);
```

然而这有一个很多人提到的问题，就是缩放效果不平滑。(smooth这个词，我还是百度了smooth scroll才写的出字面意思来，我现在中文是有多差…)
这个暂时没什么解决方法，API本身就是这样的。据说谷歌本身的地图是h5的canvas绘制的，但通过API生成的地图不是同样的原理…谷歌居然自己都不用自己的API …

另一个问题是，缩放**太大力**怎么办？答案是，在`MapOptions`中设置`maxZoom`值

### 动画效果切换
API提供三种效果：`BOUNCE` `DROP` `NULL`
使用场景大多数时候是在NULL和BOUNCE之间切换

动画比较坑爹的是，每个动画都要持续700ms，之后才能改变状态。

比如这样一个例子：有两组marker，**有交集**。想要让第一组先BOUNCE，之后停止第一组，让第二组BOUNCE。很容易想到的方法是，通过遍历，把第一组的动画全部设置为NULL，再把第二组动画全部设置为BOUNCE。然而交集的这一部分只会BOUNCE一次然后就停了…因为计算速度很快，从NULL到BOUNCE不到700ms，动画其实还处于NULL状态。

可以参考官方的这个例子，https://developers.google.com/maps/documentation/javascript/examples/marker-animations ，当你双击marker的时候，其实就是模拟了快速切换状态，但动画效果并不如预期…

解决方案：求差集，也就是把交集的部分去掉，在设置动画为NULL

### 自定义地图样式
https://snazzymaps.com/ 这个网站有很多已经设计好的样式，选喜欢的直接复制代码放到`StyledMapType()`方法中即可，然后给这个样式取个名字，下例中我使用了[light dream](https://snazzymaps.com/style/134/light-dream) 这个样式
```
var mapStyle = new google.maps.StyledMapType([....])
map.mapTypes.set('lightDream', mapStyle);
map.setMapTypeId('lightDream');
```

### 遍历添加 event listener 同时又需要传参数给 `google.maps.event.addListener()` 的回调函数
不太理解event.addListener的工作原理，但根据我踩的坑推测这是一个异步的方法（否则为什么有回调函数？！）

这个时候就要用到高大上的**闭包**。下面这个例子中，如果不把`addListener`包起来，每次cityHandler收到的city都是遍历的最后一个city。因为遍历速度太快，而回调还没有执行，等回调执行的时候city已经遍历到最后一个了…

不用闭包的话，用promise应该也能解决这个问题，但是感觉promise需要写的code会比较多一些。

```
var cityList=[{marker:googleMapMarker,city:'Beijing'},...];
cityList.forEach(function(item){
  (function (marker, city) {
    google.maps.event.addListener(marker, 'click', function (e) {
      cityHandler(city);
    });
  })(item.marker, item.city)
})
```

### 原生marker图标
http://mabp.kiev.ua/2010/01/12/google-map-markers/

### 参考：
https://developers.google.com/maps/documentation/javascript/reference
