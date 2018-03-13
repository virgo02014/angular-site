(function(){
    angular
        .module('website.ctrl')
        .controller('mapCtrl', mapCtrl);

    mapCtrl.$inject = ['$timeout'];

    function mapCtrl($timeout) {
        var vm = this;

        vm.initData = function() {
            $timeout(function(){
                $.get('/script/lib/china.map.json', function (chinaJson) {
                    echarts.registerMap('china', chinaJson);
                    var chart = echarts.init(document.getElementById('map_china'));
                    var geoCoordMap = {
                        '鞍山': [122.995632,41.110626],
                        '锦州': [121.135742, 41.119269],
                        '阜新': [121.648962,42.011796],
                        '葫芦岛': [120.1575,40.578],
                        '大连': [122.2229,39.4409],
                        '丹东': [124.383044,40.124296],
                        '昆明': [102.712251,25.040609],
                        '丽江': [100.233026,26.872108],
                        '大理白族自治州': [100.225668,25.589449],
                        '杭州': [119.5313,29.8773],
                        '上海': [121.4648,31.2891],
                        '北京': [116.4551,40.2539],
                        '天津': [117.4219,39.4189],
                        '厦门': [118.1689,24.6478],
                        '包头': [110.3467,41.4899],
                        '北海': [109.314,21.6211],
                        '太原': [112.3352,37.9413],
                        '常州': [119.4543,31.5582],
                        '广州': [113.5107,23.2196],
                        '成都': [103.9526,30.7617],
                        '海口': [110.3893,19.8516],
                        '福州': [119.4543,25.9222],
                        '西安': [109.1162,34.2004],
                        '郑州': [113.4668,34.6234],
                        '重庆': [107.7539,30.1904],
                        '长春': [125.8154,44.2584],
                        '长沙': [113.0823,28.2568]
                    };

                    var BJData = [
                        [{name: '北京'}, {name: '上海',value: 95}],
                        [{name: '北京'}, {name: '杭州',value: 90}],
                        [{name: '北京'}, {name: '大连',value: 80}],
                        [{name: '北京'}, {name: '天津',value: 70}],
                        [{name: '北京'}, {name: '昆明',value: 60}],
                        [{name: '北京'}, {name: '厦门',value: 50}],
                        [{name: '北京'}, {name: '葫芦岛',value: 40}],
                        [{name: '北京'}, {name: '鞍山',value: 30}],
                        [{name: '北京'}, {name: '锦州',value: 20}],
                        [{name: '北京'}, {name: '阜新',value: 10}],
                        [{name: '北京'}, {name: '丹东',value: 5}],
                        [{name: '北京'}, {name: '丽江',value: 10}],
                        [{name: '北京'}, {name: '大理白族自治州',value: 5}]
                    ];

                    var SHData = [
                        [{name: '上海'},{name: '包头',value: 95}],
                        [{name: '上海'},{name: '昆明',value: 90}],
                        [{name: '上海'},{name: '广州',value: 80}],
                        [{name: '上海'},{name: '郑州',value: 70}],
                        [{name: '上海'},{name: '长春',value: 60}],
                        [{name: '上海'},{name: '重庆',value: 50}],
                        [{name: '上海'},{name: '长沙',value: 40}],
                        [{name: '上海'},{name: '北京',value: 30}],
                        [{name: '上海'},{name: '丹东',value: 20}],
                        [{name: '上海'},{name: '大连',value: 10}]
                    ];

                    var GZData = [
                        [{name: '广州'},{name: '福州',value: 95}],
                        [{name: '广州'},{name: '太原',value: 90}],
                        [{name: '广州'},{name: '长春',value: 80}],
                        [{name: '广州'},{name: '重庆',value: 70}],
                        [{name: '广州'},{name: '西安',value: 60}],
                        [{name: '广州'},{name: '成都',value: 50}],
                        [{name: '广州'},{name: '常州',value: 40}],
                        [{name: '广州'},{name: '北京',value: 30}],
                        [{name: '广州'},{name: '北海',value: 20}],
                        [{name: '广州'},{name: '海口',value: 10}]
                    ];

                    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var dataItem = data[i];
                            var fromCoord = geoCoordMap[dataItem[0].name];
                            var toCoord = geoCoordMap[dataItem[1].name];
                            if (fromCoord && toCoord) {
                                res.push({
                                    fromName: dataItem[0].name,
                                    toName: dataItem[1].name,
                                    coords: [fromCoord, toCoord]
                                });
                            }
                        }
                        return res;
                    };

                    var color = ['#a6c84c', '#ffa022', '#46bee9'];
                    var series = [];
                    [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
                        series.push({
                            name: item[0] + ' 出发',
                            type: 'lines',
                            zlevel: 1,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.7,
                                color: '#fff',
                                symbolSize: 3
                            },
                            lineStyle: {
                                normal: {
                                    color: color[i],
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        },
                        {
                            name: item[0] + ' 出发',
                            type: 'lines',
                            zlevel: 2,
                            symbol: ['none', 'arrow'],
                            symbolSize: 10,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbol: planePath,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: color[i],
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        },
                        {
                            name: item[0] + ' 出发',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 8;
                            },
                            itemStyle: {
                                normal: {
                                    color: color[i]
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[1].name,
                                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                };
                            })
                        });
                    });

                    var option = {
                        backgroundColor: '#404a59',
                        title: {
                            text: 'Write the code, change the world.',
                            subtext: 'All over the world',
                            left: 'center',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            top: 'bottom',
                            left: 'right',
                            data: ['北京 出发', '上海 出发', '广州 出发'],
                            textStyle: {
                                color: '#fff'
                            },
                            selectedMode: 'single'
                        },
                        geo: {
                            map: 'china',
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#323c48',
                                    borderColor: '#404a59'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            }
                        },
                        series: series
                    };

                    chart.setOption(option);
                });
            });
        };

    }
})(this);
