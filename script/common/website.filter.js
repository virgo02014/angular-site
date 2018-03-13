angular.module('website.filter', [])
    .filter('isComprehensiveCourse', function(){
           return function(input){
                  return +input === 1;
           };
    })
    .filter('fbSubstring', function(){
        return function(input, start, end){
            if (input) {
                return input.substring(start, end);
            }
            return '';
        };
    })
    .filter('fbSplitFirst', function(){
        return function(input){
            if (input) {
                return input.split(' ')[0];
            }
            return '';
        };
    })
    .filter('constantText', ['kvMap', function (kvMap) {
        return function (input, option, param) {
            var extraParam = param || 'zhCN';
            var out = '';
            var obj = kvMap;
            var propArr, targetConfig, k;
            if (input !== undefined && input !== null && !isNaN(input)) {
                if(option){
                  propArr = option.split('.');
                  for(var i = 0, j = propArr.length; i < j; i++){
                     k = propArr[i];
                     if(obj){
                        obj = obj[k];
                     }else {
                       return '';
                     }
                  }
                }else{
                   return '';
                }
                targetConfig = obj[input];
                if (targetConfig) {
                    out = targetConfig[extraParam];
                } else {
                    console.error('constantText Err:', {
                           input: input,
                           option: option,
                           param: param
                    });
                }
            }
            return out;
        };
    }]);
