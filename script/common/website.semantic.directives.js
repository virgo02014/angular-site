(function () {
    'use strict';
    /**
     * semantic 组件\指令的简单封装
     * ＝：指令中的属性取值为controller中对应$scope上属性的取值，可用于双向数据的绑定
     * @：指令中的取值为html中的字面量/直接量；建立一个local scope
     * &：指令中的取值为Contoller中对应$scope上的属性，但是这属性必须为一个函数回调
     */
    /**
     * 属性 替换函数
     * @param defineconfig 默认定义属性
     * @param options 自定义属性
     * @returns (description)
     * @private
     */
    function _extendconfig(defineconfig, options) {
        if (!!options) {
            for (var x in options) {
                if (defineconfig.hasOwnProperty(x)) {
                    defineconfig[x] = options[x];
                } else {
                    if (x === 'search') {
                        defineconfig.apiSettings = {
                            url: false,
                            throttle: 200,
                            beforeSend: function (setting) {
                                options[x].call(this, setting.urlData.query);
                                return false;
                            }
                        };
                    }
                }
            }
        }
        return defineconfig;
    }
    angular.module('website.semantic.directive', [
        'website.semantic.checkBox',
        'website.semantic.dropDown',
        'website.semantic.uiModal',
        'website.semantic.datetimepicker',
        'website.semantic.uiChart',
        'website.semantic.layerDate',
        'website.semantic.tree'
    ]);
    angular.module('website.semantic.layerDate', [])
        .directive('layerDate', function () {
            return {
                restrict: 'A',
                scope: {
                    options: '=layerdateOptions'
                },
                link: function (scope) {
                    var defineconfig = {
                        elem:'',
                        event: 'click', //触发事件
                        format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                        istime: true, //是否开启时间选择
                        isclear: true, //是否显示清空
                        istoday: true, //是否显示今天
                        issure: true,
                        festival: false, //是否显示节日
                        min: '1900-01-01 00:00:00', //最小日期
                        max: '2099-12-31 23:59:59', //最大日期
                        start: '2016-05-03 23:00:00', //开始日期
                        fixed: true, //是否固定在可视区域
                        zIndex: 99999999, //css z-index
                        choose: {}
                    };
                    if (scope.options && scope.options.elem) {
                        defineconfig = _extendconfig(defineconfig, scope.options);
                        laydate(defineconfig);
                    }else{
                        console.error('layerDate must  have elem');
                    }
                }
            };
        });
    angular.module('website.semantic.checkBox', [])
        .directive('checkBox', function () {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '=ngModel',
                    options: '=checkboxOptions'
                },
                link: function (scope, element) {
                    var defineconfig = {
                        onChecked: function () {
                        }
                    };
                    defineconfig = _extendconfig(defineconfig, scope.options);
                    jQuery(element).checkbox(defineconfig);
                }
            };
        });
    angular.module('website.semantic.dropDown', [])
        .directive('dropDown', function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '=ngModel',
                    options: '=dropdownOptions'
                },
                link: function (scope, element) {
                    var defineconfig = {
                        on: 'click',
                        action: 'activate',
                        allowAdditions: true
                    };
                    defineconfig = _extendconfig(defineconfig, scope.options);
                    jQuery(element).dropdown(defineconfig);
                    function settext(value) {
                        jQuery(element).dropdown('set text', value);
                    }
                    function select(value) {
                        $timeout(function () {
                            jQuery(element).dropdown('set selected', value);
                        });
                    }
                    function setValue(value) {
                        $timeout(function () {
                            jQuery(element).dropdown('set value', value);
                        });
                    }
                    var watch = scope.$watch('ngModel', function (nv) {
                        if (typeof nv !== 'undefined') {
                            if (defineconfig.allowAdditions) {
                                setValue(nv);
                            } else {
                                select(nv);
                            }
                            watch();
                        }
                    });
                    if (scope.options) {
                        scope.options.settext = settext;
                        scope.options.select = select;
                        scope.options.setvalue = setValue;
                    }
                }
            };
        });
    angular.module('website.semantic.uiModal', [])
        .directive('uiModal', function () {
            return {
                restrict: 'A',
                scope: {
                    options: '=modalOptions'
                },
                link: function (scope, element) {
                    var defineconfig = {
                        closable: true, //设置为 false 时你将不能单击遮罩层来关闭当前的模态对话框
                        //设置为true则可以
                        duration: 400,
                        onVisible: function () { },
                        onHidden: function () { }
                    };
                    defineconfig = _extendconfig(defineconfig, scope.options);
                    jQuery(element).modal(defineconfig);
                    function modalShow() {
                        if (!jQuery(element).modal('is active')) {
                            jQuery(element).modal('show');
                        }
                    }
                    function modalHid() {
                        if (jQuery(element).modal('is active')) {
                            jQuery(element).modal('hide');
                        }
                    }
                    scope.options.show = modalShow;
                    scope.options.hide = modalHid;
                }
            };
        });
    angular.module('website.semantic.datetimepicker', [])
        .directive('datetimePicker', function () {
            return {
                // require: '?ngModel',
                restrict: 'A',
                scope: {
                    options: '=dtOptions'
                },
                link: function (scope, element) {
                    var defineconfig = {
                        timepicker: false,
                        format: 'Y-m-d',
                        minDate: false,
                        formatTime: 'H:i:s',
                        scrollMonth: false,
                        scrollTime: false,
                        scrollInput: false,
                        step: 1,
                        closeOnDateSelect: false
                    };
                    defineconfig = _extendconfig(defineconfig, scope.options);
                    jQuery(element).datetimepicker(defineconfig);
                }
            };
        });
    angular.module('website.semantic.uiChart', [])
        .directive('uiChart', function () {
            return {
            restrict: 'AE',
            scope: {
                options: '=chartOptions'
            },
            link: function (scope, element) {
                var myChart = echarts.init(element[0]);
                function set(options) {
                    myChart.setOption(options);
                }
                scope.options.setchart = set;
            }
        };
        });
    angular
        .module('template/treeGrid/treeGrid.html', [])
        .run([
            '$templateCache',
            function ($templateCache) {
                $templateCache.put('template/treeGrid/treeGrid.html',
                    "<div class=\"table-responsive\">\n" +
                    " <table class=\"table ui tree-grid\">\n" +
                    "   <thead>\n" +
                    "     <tr>\n" +
                    "       <th><a ng-if=\"expandingProperty.sortable\" ng-click=\"sortBy(expandingProperty)\">{{expandingProperty.displayName || expandingProperty.field || expandingProperty}}</a><span ng-if=\"!expandingProperty.sortable\">{{expandingProperty.displayName || expandingProperty.field || expandingProperty}}</span><i ng-if=\"expandingProperty.sorted\" class=\"{{expandingProperty.sortingIcon}} pull-right\"></i></th>\n" +
                    "       <th ng-repeat=\"col in colDefinitions\"><a ng-if=\"col.sortable\" ng-click=\"sortBy(col)\">{{col.displayName || col.field}}</a><span ng-if=\"!col.sortable\">{{col.displayName || col.field}}</span><i ng-if=\"col.sorted\" class=\"{{col.sortingIcon}} pull-right\"></i></th>\n" +
                    "     </tr>\n" +
                    "   </thead>\n" +
                    "   <tbody>\n" +
                    "     <tr ng-repeat=\"row in tree_rows | searchFor:$parent.filterString:expandingProperty:colDefinitions track by row.branch.uid\"\n" +
                    "       ng-class=\"'level-' + {{ row.level }} + (row.branch.selected ? ' active':'')\" class=\"tree-grid-row\">\n" +
                    "       <td><a ng-click=\"user_clicks_branch(row.branch)\"><i ng-class=\"row.tree_icon\"\n" +
                    "              ng-click=\"row.branch.expanded = !row.branch.expanded\"\n" +
                    "              class=\"indented tree-icon\"></i></a><span class=\"indented tree-label\" ng-click=\"on_user_click(row.branch)\">\n" +
                    "             {{row.branch[expandingProperty.field] || row.branch[expandingProperty]}}</span>\n" +
                    "       </td>\n" +
                    "       <td ng-repeat=\"col in colDefinitions\">\n" +
                    "         <div ng-if=\"col.cellTemplate\" compile=\"col.cellTemplate\" cell-template-scope=\"col.cellTemplateScope\"></div>\n" +
                    "         <div ng-if=\"!col.cellTemplate\">{{row.branch[col.field]}}</div>\n" +
                    "       </td>\n" +
                    "     </tr>\n" +
                    "   </tbody>\n" +
                    " </table>\n" +
                    "</div>\n" +
                    "");
            }
        ]);
    angular
        .module('website.semantic.tree', [
            'template/treeGrid/treeGrid.html'
        ])
        .directive('compile', [
            '$compile',
            function ($compile) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        scope.cellTemplateScope = scope.$eval(attrs.cellTemplateScope);
                        // Watch for changes to expression.
                        scope.$watch(attrs.compile, function (new_val) {
                            /*
                             * Compile creates a linking function
                             * that can be used with any scope.
                             */
                            var link = $compile(new_val);
                            /*
                             * Executing the linking function
                             * creates a new element.
                             */
                            var new_elem = link(scope);
                            // Which we can then append to our DOM element.
                            element.append(new_elem);
                        });
                    }
                };
            }
        ])
        .directive('treeGrid', [
            '$timeout',
            'treegridTemplate',
            function ($timeout,
                treegridTemplate) {
                return {
                    restrict: 'E',
                    templateUrl: function (tElement, tAttrs) {
                        return tAttrs.templateUrl || treegridTemplate.getPath();
                    },
                    replace: true,
                    scope: {
                        treeData: '=',
                        colDefs: '=',
                        expandOn: '=',
                        onSelect: '&',
                        onClick: '&',
                        initialSelection: '@',
                        treeControl: '='
                    },
                    link: function (scope, element, attrs) {
                        var error, expandingProperty, expand_all_parents, expand_level, for_all_ancestors, for_each_branch, get_parent, n, on_treeData_change, select_branch, selected_branch, tree;
                        error = function (s) {
                            return void 0;
                        };
                        attrs.iconExpand = attrs.iconExpand ? attrs.iconExpand : 'icon-plus  icon plus  fa fa-plus';
                        attrs.iconCollapse = attrs.iconCollapse ? attrs.iconCollapse : 'icon-minus icon minus fa fa-minus';
                        attrs.iconLeaf = attrs.iconLeaf ? attrs.iconLeaf : 'icon-file  icon file  fa fa-file';
                        attrs.sortedAsc = attrs.sortedAsc ? attrs.sortedAsc : 'icon-file  icon chevron-up  fa angle-up';
                        attrs.sortedDesc = attrs.sortedDesc ? attrs.sortedDesc : 'icon-file  icon chevron-down  fa angle-down';
                        attrs.expandLevel = attrs.expandLevel ? attrs.expandLevel : '3';
                        expand_level = parseInt(attrs.expandLevel, 10);
                        if (!scope.treeData) {
                            alert('No data was defined for the tree, please define treeData!');
                            return;
                        }
                        var getExpandingProperty = function getExpandingProperty() {
                            if (attrs.expandOn) {
                                expandingProperty = scope.expandOn;
                                scope.expandingProperty = scope.expandOn;
                            } else {
                                if (scope.treeData.length) {
                                    var _firstRow = scope.treeData[0],
                                        _keys = Object.keys(_firstRow);
                                    for (var i = 0, len = _keys.length; i < len; i++) {
                                        if (typeof (_firstRow[_keys[i]]) === 'string') {
                                            expandingProperty = _keys[i];
                                            break;
                                        }
                                    }
                                    if (!expandingProperty) expandingProperty = _keys[0];
                                    scope.expandingProperty = expandingProperty;
                                }
                            }
                        };
                        getExpandingProperty();
                        if (!attrs.colDefs) {
                            if (scope.treeData.length) {
                                var _col_defs = [],
                                    _firstRow = scope.treeData[0],
                                    _unwantedColumn = ['children', 'level', 'expanded', expandingProperty];
                                for (var idx in _firstRow) {
                                    if (_unwantedColumn.indexOf(idx) === -1) {
                                        _col_defs.push({
                                            field: idx
                                        });
                                    }
                                }
                                scope.colDefinitions = _col_defs;
                            }
                        } else {
                            scope.colDefinitions = scope.colDefs;
                        }
                        for_each_branch = function (f) {
                            var do_f, root_branch, _i, _len, _ref, _results;
                            do_f = function (branch, level) {
                                var child, _i, _len, _ref, _results;
                                f(branch, level);
                                if (branch.children != null) {
                                    _ref = branch.children;
                                    _results = [];
                                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                        child = _ref[_i];
                                        _results.push(do_f(child, level + 1));
                                    }
                                    return _results;
                                }
                            };
                            _ref = scope.treeData;
                            _results = [];
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                root_branch = _ref[_i];
                                _results.push(do_f(root_branch, 1));
                            }
                            return _results;
                        };
                        selected_branch = null;
                        select_branch = function (branch) {
                            if (!branch) {
                                if (selected_branch != null) {
                                    selected_branch.selected = false;
                                }
                                selected_branch = null;
                                return;
                            }
                            if (branch !== selected_branch) {
                                if (selected_branch != null) {
                                    selected_branch.selected = false;
                                }
                                branch.selected = true;
                                selected_branch = branch;
                                expand_all_parents(branch);
                                if (branch.onSelect != null) {
                                    return $timeout(function () {
                                        return branch.onSelect(branch);
                                    });
                                } else {
                                    if (scope.onSelect != null) {
                                        return $timeout(function () {
                                            return scope.onSelect({
                                                branch: branch
                                            });
                                        });
                                    }
                                }
                            }
                        };
                        scope.on_user_click = function (branch) {
                            if (scope.onClick) {
                                scope.onClick({
                                    branch: branch
                                });
                            }
                        };
                        scope.user_clicks_branch = function (branch) {
                            if (branch !== selected_branch) {
                                return select_branch(branch);
                            }
                        };
                        /* sorting methods */
                        scope.sortBy = function (col) {
                            if (col.sortDirection === "asc") {
                                sort_recursive(scope.treeData, col, true);
                                col.sortDirection = "desc";
                                col.sortingIcon = attrs.sortedDesc;
                            } else {
                                sort_recursive(scope.treeData, col, false);
                                col.sortDirection = "asc";
                                col.sortingIcon = attrs.sortedAsc;
                            }
                            col.sorted = true;
                            resetSorting(col);
                        };
                        var sort_recursive = function (elements, col, descending) {
                            elements.sort(sort_by(col, descending));
                            for (var i = 0; i < elements.length; i++) {
                                sort_recursive(elements[i].children, col, descending);
                            }
                        };
                        var sort_by = function (col, descending) {
                            var direction = !descending ? 1 : -1;
                            if (col.sortingType === "custom" && typeof col.sortingFunc === "function") {
                                return function (a, b) {
                                    return col.sortingFunc(a, b) * direction;
                                };
                            }
                            var key = function (x) {
                                return (x[col.field] === null ? "" : x[col.field].toLowerCase());
                            };
                            switch (col.sortingType) {
                                case "number":
                                    key = function (x) {
                                        return parseFloat(x[col.field]);
                                    };
                                    break;
                                case "date":
                                    key = function (x) {
                                        return new Date(x[col.field]);
                                    };
                                    break;
                            }
                            return function (a, b) {
                                return a = key(a), b = key(b), direction * ((a > b) - (b > a));
                            };
                        }
                        var resetSorting = function (sortedCol) {
                            var arraySize = scope.colDefinitions.length;
                            for (var i = 0; i < arraySize; i++) {
                                var col = scope.colDefinitions[i];
                                if (col.field != sortedCol.field) {
                                    col.sorted = false;
                                    col.sortDirection = "none";
                                }
                            }
                        }
                        /* end of sorting methods */
                        get_parent = function (child) {
                            var parent;
                            parent = void 0;
                            if (child.parent_uid) {
                                for_each_branch(function (b) {
                                    if (b.uid === child.parent_uid) {
                                        return parent = b;
                                    }
                                });
                            }
                            return parent;
                        };
                        for_all_ancestors = function (child, fn) {
                            var parent;
                            parent = get_parent(child);
                            if (parent != null) {
                                fn(parent);
                                return for_all_ancestors(parent, fn);
                            }
                        };
                        expand_all_parents = function (child) {
                            return for_all_ancestors(child, function (b) {
                                return b.expanded = true;
                            });
                        };
                        scope.tree_rows = [];
                        on_treeData_change = function () {
                            getExpandingProperty();
                            var add_branch_to_list, root_branch, _i, _len, _ref, _results;
                            for_each_branch(function (b, level) {
                                if (!b.uid) {
                                    return b.uid = "" + Math.random();
                                }
                            });
                            for_each_branch(function (b) {
                                var child, _i, _len, _ref, _results;
                                if (angular.isArray(b.children)) {
                                    _ref = b.children;
                                    _results = [];
                                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                        child = _ref[_i];
                                        _results.push(child.parent_uid = b.uid);
                                    }
                                    return _results;
                                }
                            });
                            scope.tree_rows = [];
                            for_each_branch(function (branch) {
                                var child, f;
                                if (branch.children) {
                                    if (branch.children.length > 0) {
                                        f = function (e) {
                                            if (typeof e === 'string') {
                                                return {
                                                    label: e,
                                                    children: []
                                                };
                                            } else {
                                                return e;
                                            }
                                        };
                                        return branch.children = (function () {
                                            var _i, _len, _ref, _results;
                                            _ref = branch.children;
                                            _results = [];
                                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                                child = _ref[_i];
                                                _results.push(f(child));
                                            }
                                            return _results;
                                        })();
                                    }
                                } else {
                                    return branch.children = [];
                                }
                            });
                            add_branch_to_list = function (level, branch, visible) {
                                var child, child_visible, tree_icon, _i, _len, _ref, _results;
                                if (branch.expanded == null) {
                                    branch.expanded = false;
                                }
                                if (!branch.children || branch.children.length === 0) {
                                    tree_icon = attrs.iconLeaf;
                                } else {
                                    if (branch.expanded) {
                                        tree_icon = attrs.iconCollapse;
                                    } else {
                                        tree_icon = attrs.iconExpand;
                                    }
                                }
                                branch.level = level;
                                scope.tree_rows.push({
                                    level: level,
                                    branch: branch,
                                    label: branch[expandingProperty],
                                    tree_icon: tree_icon,
                                    visible: visible
                                });
                                if (branch.children != null) {
                                    _ref = branch.children;
                                    _results = [];
                                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                        child = _ref[_i];
                                        child_visible = visible && branch.expanded;
                                        _results.push(add_branch_to_list(level + 1, child, child_visible));
                                    }
                                    return _results;
                                }
                            };
                            _ref = scope.treeData;
                            _results = [];
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                root_branch = _ref[_i];
                                _results.push(add_branch_to_list(1, root_branch, true));
                            }
                            return _results;
                        };
                        scope.$watch('treeData', on_treeData_change, true);
                        if (attrs.initialSelection != null) {
                            for_each_branch(function (b) {
                                if (b.label === attrs.initialSelection) {
                                    return $timeout(function () {
                                        return select_branch(b);
                                    });
                                }
                            });
                        }
                        n = scope.treeData.length;
                        for_each_branch(function (b, level) {
                            b.level = level;
                            return b.expanded = b.level < expand_level;
                        });
                        if (scope.treeControl != null) {
                            if (angular.isObject(scope.treeControl)) {
                                tree = scope.treeControl;
                                tree.expand_all = function () {
                                    return for_each_branch(function (b, level) {
                                        return b.expanded = true;
                                    });
                                };
                                tree.collapse_all = function () {
                                    return for_each_branch(function (b, level) {
                                        return b.expanded = false;
                                    });
                                };
                                tree.get_first_branch = function () {
                                    n = scope.treeData.length;
                                    if (n > 0) {
                                        return scope.treeData[0];
                                    }
                                };
                                tree.select_first_branch = function () {
                                    var b;
                                    b = tree.get_first_branch();
                                    return tree.select_branch(b);
                                };
                                tree.get_selected_branch = function () {
                                    return selected_branch;
                                };
                                tree.get_parent_branch = function (b) {
                                    return get_parent(b);
                                };
                                tree.select_branch = function (b) {
                                    select_branch(b);
                                    return b;
                                };
                                tree.get_children = function (b) {
                                    return b.children;
                                };
                                tree.select_parent_branch = function (b) {
                                    var p;
                                    if (b == null) {
                                        b = tree.get_selected_branch();
                                    }
                                    if (b != null) {
                                        p = tree.get_parent_branch(b);
                                        if (p != null) {
                                            tree.select_branch(p);
                                            return p;
                                        }
                                    }
                                };
                                tree.add_branch = function (parent, new_branch) {
                                    if (parent != null) {
                                        parent.children.push(new_branch);
                                        parent.expanded = true;
                                    } else {
                                        scope.treeData.push(new_branch);
                                    }
                                    return new_branch;
                                };
                                tree.add_root_branch = function (new_branch) {
                                    tree.add_branch(null, new_branch);
                                    return new_branch;
                                };
                                tree.expand_branch = function (b) {
                                    if (b == null) {
                                        b = tree.get_selected_branch();
                                    }
                                    if (b != null) {
                                        b.expanded = true;
                                        return b;
                                    }
                                };
                                tree.collapse_branch = function (b) {
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        b.expanded = false;
                                        return b;
                                    }
                                };
                                tree.get_siblings = function (b) {
                                    var p, siblings;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        p = tree.get_parent_branch(b);
                                        if (p) {
                                            siblings = p.children;
                                        } else {
                                            siblings = scope.treeData;
                                        }
                                        return siblings;
                                    }
                                };
                                tree.get_next_sibling = function (b) {
                                    var i, siblings;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        siblings = tree.get_siblings(b);
                                        n = siblings.length;
                                        i = siblings.indexOf(b);
                                        if (i < n) {
                                            return siblings[i + 1];
                                        }
                                    }
                                };
                                tree.get_prev_sibling = function (b) {
                                    var i, siblings;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    siblings = tree.get_siblings(b);
                                    n = siblings.length;
                                    i = siblings.indexOf(b);
                                    if (i > 0) {
                                        return siblings[i - 1];
                                    }
                                };
                                tree.select_next_sibling = function (b) {
                                    var next;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        next = tree.get_next_sibling(b);
                                        if (next != null) {
                                            return tree.select_branch(next);
                                        }
                                    }
                                };
                                tree.select_prev_sibling = function (b) {
                                    var prev;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        prev = tree.get_prev_sibling(b);
                                        if (prev != null) {
                                            return tree.select_branch(prev);
                                        }
                                    }
                                };
                                tree.get_first_child = function (b) {
                                    var _ref;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        if (((_ref = b.children) != null ? _ref.length : void 0) > 0) {
                                            return b.children[0];
                                        }
                                    }
                                };
                                tree.get_closest_ancestor_next_sibling = function (b) {
                                    var next, parent;
                                    next = tree.get_next_sibling(b);
                                    if (next != null) {
                                        return next;
                                    } else {
                                        parent = tree.get_parent_branch(b);
                                        return tree.get_closest_ancestor_next_sibling(parent);
                                    }
                                };
                                tree.get_next_branch = function (b) {
                                    var next;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        next = tree.get_first_child(b);
                                        if (next != null) {
                                            return next;
                                        } else {
                                            next = tree.get_closest_ancestor_next_sibling(b);
                                            return next;
                                        }
                                    }
                                };
                                tree.select_next_branch = function (b) {
                                    var next;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        next = tree.get_next_branch(b);
                                        if (next != null) {
                                            tree.select_branch(next);
                                            return next;
                                        }
                                    }
                                };
                                tree.last_descendant = function (b) {
                                    var last_child;
                                    if (b == null) {
                                        debugger;
                                    }
                                    n = b.children.length;
                                    if (n === 0) {
                                        return b;
                                    } else {
                                        last_child = b.children[n - 1];
                                        return tree.last_descendant(last_child);
                                    }
                                };
                                tree.get_prev_branch = function (b) {
                                    var parent, prev_sibling;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        prev_sibling = tree.get_prev_sibling(b);
                                        if (prev_sibling != null) {
                                            return tree.last_descendant(prev_sibling);
                                        } else {
                                            parent = tree.get_parent_branch(b);
                                            return parent;
                                        }
                                    }
                                };
                                return tree.select_prev_branch = function (b) {
                                    var prev;
                                    if (b == null) {
                                        b = selected_branch;
                                    }
                                    if (b != null) {
                                        prev = tree.get_prev_branch(b);
                                        if (prev != null) {
                                            tree.select_branch(prev);
                                            return prev;
                                        }
                                    }
                                };
                            }
                        }
                    }
                };
            }
        ])
        .provider('treegridTemplate', function () {
            var templatePath = 'template/treeGrid/treeGrid.html';
            this.setPath = function (path) {
                templatePath = path;
            };
            this.$get = function () {
                return {
                    getPath: function () {
                        return templatePath;
                    }
                };
            };
        })
        .filter('searchFor', function () {
            return function (arr, filterString, expandingProperty, colDefinitions) {
                var filtered = [];
                //only apply filter for strings 3 characters long or more
                if (!filterString || filterString.length < 3) {
                    for (var i = 0; i < arr.length; i++) {
                        var item = arr[i];
                        if (item.visible) {
                            filtered.push(item);
                        }
                    }
                } else {
                    var ancestorStack = [];
                    var currentLevel = 0;
                    for (var i = 0; i < arr.length; i++) {
                        var item = arr[i];
                        while (currentLevel >= item.level) {
                            throwAway = ancestorStack.pop();
                            currentLevel--;
                        }
                        ancestorStack.push(item);
                        currentLevel = item.level;
                        if (include(item, filterString, expandingProperty, colDefinitions)) {
                            for (var ancestorIndex = 0; ancestorIndex < ancestorStack.length; ancestorIndex++) {
                                ancestor = ancestorStack[ancestorIndex];
                                if (ancestor.visible) {
                                    filtered.push(ancestor);
                                }
                            }
                            ancestorStack = [];
                        }
                    }
                }
                return filtered;
            };
            function include(item, filterString, expandingProperty, colDefinitions) {
                var includeItem = false;
                var filterApplied = false;
                //first check the expandingProperty
                if (expandingProperty.filterable) {
                    filterApplied = true;
                    if (checkItem(item, filterString, expandingProperty)) {
                        includeItem = true;
                    }
                }
                //then check each of the other columns
                var arraySize = colDefinitions.length;
                for (var i = 0; i < arraySize; i++) {
                    var col = colDefinitions[i];
                    if (col.filterable) {
                        filterApplied = true;
                        if (checkItem(item, filterString, col)) {
                            includeItem = true;
                        }
                    }
                }
                if (filterApplied) {
                    return includeItem;
                } else {
                    return true;
                }
            }
            function checkItem(item, filterString, col) {
                if (col.sortingType === "number") {
                    if (item.branch[col.field] != null && parseFloat(item.branch[col.field]) === parseFloat(filterString)) {
                        return true;
                    }
                } else {
                    if (item.branch[col.field] != null && item.branch[col.field].toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
                        return true;
                    }
                }
            }
        });
})();
