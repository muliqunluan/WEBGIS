AMapLoader.load({
  key: "c76d625b8a636fedfbf331b252e2481e", //申请好的Web端开发者key，调用 load 时必填
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
})
  .then((AMap) => {
    var map = new AMap.Map('amap', {
      viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
      zoom: 15.5, // 初始化地图层级
      center: [112.917155, 27.90353], // 初始化地图中心点
      zooms:[15.5,20]
    })
    function logMapinfo(){
      var zoom = map.getZoom();
      var center = map.getCenter();
      document.querySelector("#map-zoom").innerText = zoom;
      document.querySelector("#map-center").innerText = center.toString();
    }

    map.on('moveend', logMapinfo);
    map.on('zoomend', logMapinfo);
  })
  .catch((e) => {
    console.error(e); //加载错误提示
  })

