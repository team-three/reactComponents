/**
 * xlist mixin
 * created by donaldcen on 2015/11/11 the tencent 17th.
 */
define(function (require, exports, module) {
    var XList = require('lib/xscroll/infinite');
    var React = require('lib/react-addons');
    var ReactDOM = require('lib/react-dom');
    var _ = require('lib/underscore');
    var XListMixin = {
        //框架dom生成完成
        componentDidMount: function () {
            console.log('完成了');
            this.createXList();
            this.buildData();
            if (this.xList) {
                if(this.props.disabled){
                    this.xList.disabled();
                }else{
                    this.xList.enabled();
                }
                this.xList.render();
            }
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            console.log('更新了');
            this.updateData(nextProps);
            var config = nextProps.config || {};
            var pre_config = this.props.config || {};
            if(this.completePullUp){
                this.completePullUp();
            }
            if (typeof this.resetPullUp == 'function' && config.needPullUp != pre_config.needPullUp) {
                this.resetPullUp(config.needPullUp);
            }
            if (this.xList) {
                if(nextProps.disabled){
                    this.xList.disabled();
                }else{
                    this.xList.enabled();
                }
                this.xList.render();
            }
            return false;
        },
        //清理DidMount事件
        componentWillUnMount: function () {
            this.xList = null;
        },

        //创建xList对象
        createXList: function () {
            var me = this;
            var id = this.props.id;
            var xlistConfig = _.extend({
                renderTo: "#" + id,
                lockX: true,
                scrollbarX: false,
                scrollbarY: false,
                zoomType: "y",
                preventDefault: true,
                //data: this.data,
                itemHeight: 68,
                autoRender: false,
                infiniteElements: ".xs-content .xs-row",
                renderHook: function (el, data) {
                    //if (data.renderOnce && data.isRender == true) {
                    //    return;
                    //}
                    //data.isRender = true;
                    //el.innerHTML = data.data.html;
                    //el.className = data.className;
                    me.xListRender(el, data);

                }
            }, this.props.config || {});
            this.xList = new XList(xlistConfig);
            window.xList = this.xList;
        },
        buildData: function () {
            var id = this.props.id;

            var ds = new XList.DataSet({
                id: id
            });
            this.xList.appendDataSet(ds);
            this.dataSet = ds;
            this.updateData(this.props);
        },
        updateData: function (props) {
            var me = this;
            var ds = this.dataSet;
            ds.data = [];
            var children = props.children || [];
            //console.log(children);
            children.forEach(function (child) {
                ds.appendData(me.buildXListData(child.html, !child.unRecycled, child.style, child.className, child.id));
            });
            //console.log(this.dataSet);
        },
        /**
         * 构建XListData
         * @param {String} data 模板数据
         * @param {boolean} recycled dom是否可以被回收
         * @param {Object} style 样式
         * @param {String} className 外层dom样式名
         * @returns {{data: *, recycled: (*|boolean), style: (*|{}), className: (*|string)}}
         */
        buildXListData: function (data, recycled, style, className, id) {
            var rtno = {
                data: data,
                recycled: recycled || false,
                style: style || {},
                className: className || ''
            };
            if (!recycled) {
                rtno.className += ' xs-unrecycled';
            }
            id && (rtno.id = id);
            rtno.className += ' xs-row-wrap';
            return rtno;
        },
        /**
         * XList 渲染模块
         * @param el
         * @param data
         */
        xListRender: function (el, row) {
            ReactDOM.render(row.data, el);
        }
    };
    module.exports = XListMixin;
});