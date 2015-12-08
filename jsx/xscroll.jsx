/**
 * xscroll- react
 * created by donaldcen on 2015/11/10
 */
define(function (require, exports, module) {
    var React = require('lib/react-addons');
    var _ = require('lib/underscore');
    var XScroll = require('lib/xscroll/core');
    var xScrollLen = 0;

    var XScrollReact = React.createClass({
        propTypes: {},
        //获取默认配置
        getDefaultProps: function () {
            xScrollLen++; //自动计数创建的对象
            return {
                id: 'scrollerouter' + xScrollLen,
                containerClass: '',
                contentClass: '',
                renderToClass:'',
                containerStyle: {
                    position: 'static'
                },
                contentStyle: {
                    left: 0,
                    right: 0
                },
                events: {}
            };
        },
        render: function () {
            var containerClass = 'xs-container ' + this.props.containerClass;
            var contentClass = 'xs-content ' + this.props.contentClass;
            var renderToClass = this.props.renderToClass ;
            return (
                <div id={this.props.id} className ={renderToClass}>
                    <div className={containerClass} style={this.props.containerStyle}>
                        <div className={contentClass} style={this.props.contentStyle} ref="xs-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        },
        //获取初始state值
        getInitialState: function () {
            return {};
        },

        //渲染完成
        componentDidMount: function () {
            this.createXScroll();
            this.listenEvents(this.props.events);
            this.openWillChange();
            if (this.XScroll) {
                this.XScroll.render();
            }
        },

        componentWillUnmount: function () {
            if(this.XScroll){
                this.XScroll.destory();
                this.XScroll = null;
            }
        },
        //创建XScroll对象
        createXScroll: function () {
            var id = this.props.id;
            var xConfig = _.extend({
                renderTo: "#" + id,
                scrollbarX: false,
                scrollbarY: false
            }, this.props.config || {});
            this.XScroll = new XScroll(xConfig);
            //this.listenEvents(this.props.events);
            window['xscroll' + id] = this.XScroll;
        },
        listenEvents: function (events) {
            for (var event in events) {
                if (typeof event == 'function') {
                    this.onEvent(event, events[event]);
                }
            }
        },
        onEvent: function (event, fn) {
            if (this.XScroll) {
                this.XScroll.on(event, fn);
            }
        },
        openWillChange: function(){
            var dom = this.refs['xs-content'];
            if(dom){
                dom.style['will-change'] = 'transform';
            }
        }
    });
    module.exports = XScrollReact;
});