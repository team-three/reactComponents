/**
 * xlist- react
 * created by donaldcen on 2015/11/10
 */
define(function (require, exports, module) {
    var React = require('lib/react-addons');
    var XListMixin = require('components/common/xlist-mixin');
    var PullUpMixin = require('components/common/xlist-pullup-mixin');

    var xListLen = 0;
    var Xlist = React.createClass({
        mixins: [XListMixin, PullUpMixin],
        /**
         * 创建子元素外层
         * @param {String} cn class名
         * @param {Number} num 生成数量
         */
        createChildWrap: function (cn, num) {
            var nodes = [];
            num = num || 1;
            for (var i = 0; i < num; i++) {
                nodes.push(<li key={'xs-row' +i} className={cn}>{i}</li>);
            }
            return nodes;
        },
        propTypes: {},
        render: function () {
            var containerClass = 'xs-container ' + this.props.containerClass;
            var contentClass = 'xs-content ' + this.props.contentClass;
            var renderToClass = this.props.renderToClass;
            return (
                <div id={this.props.id} className={renderToClass} style={{
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}>
                    <div className={containerClass} style={this.props.containerStyle}>
                        <ul className={contentClass} style={this.props.contentStyle}>
                            {this.createChildWrap('xs-row ui-list', 20)}
                        </ul>
                    </div>
                </div>
            );
        },
        //获取初始state值
        getInitialState: function () {
            return {children: this.props.children};
        },
        //获取默认配置
        getDefaultProps: function () {
            xListLen++; //自动计数创建的对象
            return {
                id: 'xlistrouter' + xListLen,
                containerClass: '',
                contentClass: '',
                renderToClass: '',
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
        //渲染完成
        componentWillMount: function () {

        }

    });
    module.exports = Xlist;
});