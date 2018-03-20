angular
    .module('website.ctrl')
    .controller('materialCtrl', ['$scope', function($scope){
        $scope.users = [
          {
            name: 'Lia Lugo',
            avatar: 'svg-1',
            content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
          },
          {
            name: 'George Duke',
            avatar: 'svg-2',
            content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
          },
          {
            name: 'Gener Delosreyes',
            avatar: 'svg-3',
            content: 'Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney\'s blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.'
          },
          {
            name: 'Lawrence Ray',
            avatar: 'svg-4',
            content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
          },
          {
            name: 'Ernesto Urbina',
            avatar: 'svg-2',
            content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
          },
          {
            name: 'Gani Ferrer',
            avatar: 'svg-4',
            content: 'Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver\'s license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don\'t go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada.'
          }
        ];

        // api.ajax({
        //     // url: 'widget://res/affairs_province.json',
        //     url: '../../res/affairs_province.json',
        //     dataType: 'json'
        // },function(ret,err){
        //     if (ret) {
        //         var urlJson = JSON.stringify(ret);
        //         api.alert({msg: urlJson});
        //     }else {
        //         api.alert({
        //             msg: '错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode
        //         });
        //     }
        // });


        // $scope.subreddit = getRandomSubreddit();
        // $http.jsonp('http://www.reddit.com/r/' + $scope.subreddit + '.json?limit=50&jsonp=JSON_CALLBACK').success(function(data) {
        //     $scope.posts = data.data.children;
        // });


        // var xmlhttp;
        // if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        //     xmlhttp = new XMLHttpRequest();
        // } else {// code for IE6, IE5
        //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        // }


        //README
        //所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）
        // 用于在后台与服务器交换数据，意味着可以在不重新加载整个网页情况下，对网页的某部分进行更新
        // XMLHttpRequest.open(method,url,async)
        //      method：请求的类型；GET 或 POST
        //      url：文件在服务器上的位置
        //      async：true（异步）或 false（同步）
        // XMLHttpRequest.send(string)
        //      string：仅用于 POST 请求
        // POST 请求情况
        //      无法使用缓存文件（更新服务器上的文件或数据库）
        //      向服务器发送大量数据（POST 没有数据量限制）
        //      发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
        $scope.loadXMLDoc = function(){
            var xmlhttp;
            var txt, xx, x, i;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            // code for IE6, IE5
            // else {
            //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            // }
            // onreadystatechange 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    txt = '<table border="1"><tr><th>Title</th><th>Author</th></tr>';
                    x = xmlhttp.responseXML.documentElement.getElementsByTagName('book');
                    for (i = 0; i < x.length; i++) {
                        txt = txt + '<tr>';
                        xx = x[i].getElementsByTagName('title'); {
                            try {
                                txt = txt + '<td>' + xx[0].firstChild.nodeValue + '</td>';
                            } catch (er) {
                                txt = txt + '<td> </td>';
                            }
                        }
                        xx = x[i].getElementsByTagName('author'); {
                            try {
                                txt = txt + '<td>' + xx[0].firstChild.nodeValue + '</td>';
                            } catch (er) {
                                txt = txt + '<td> </td>';
                            }
                        }
                        txt = txt + '</tr>';
                    }
                    txt = txt + '</table>';
                    document.getElementById('myDiv').innerHTML = txt;

                    // var xmlDoc = xmlhttp.responseXML;
                    // txt = "";
                    // x = xmlDoc.getElementsByTagName("title");
                    // for (i = 0;i < x.length;i++) {
                    //     txt = txt + x[i].childNodes[0].nodeValue + "<br />";
                    // }
                    // document.getElementById("myDiv").innerHTML = txt;
                }
            };

            xmlhttp.open('GET','/static/file/books.xml',true);
            xmlhttp.send();
        };

}]);
