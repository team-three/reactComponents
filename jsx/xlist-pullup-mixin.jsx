/**
 * xlist-pullUp-react-mixin
 * created by donaldcen on 2015/11/12
 */
define(function (require, exports, module) {
    var XList = require('lib/xscroll/infinite');
    var _ = require('lib/underscore');
    var PullUp = {
        componentDidMount: function () {
            var config = this.props.config || {};
            this.resetPullUp(config.needPullUp);
        },
        resetPullUp: function(need){
            if(need){
                this.createPullUp();
                this.listenPullUp();
            }else{
                this.removePullUp();
            }
        },
        createPullUp: function () {
            var config = _.extend({
                content: '<div class="ui-loading-wrap"><p></p></div>',
                upContent: '<div class="ui-loading-wrap"><p>上拉加载更多</p></div>',
                downContent: '<div class="ui-loading-wrap"><p>释放加载更多</p></div>',
                loadingContent: '<div class="ui-loading-wrap"><p>加载中</p><i class="ui-loading"></i></div>',
                bufferHeight: 100
            }, this.props.config && this.props.config.pullUp || {});
            if (!this.pullUp && this.xList) {
                var pullup = new XList.Plugin.PullUp(config);

                this.xList.plug(pullup);
                this.pullUp = pullup;
            }
        },
        removePullUp: function(){
            if (this.pullUp) {
                //解决xscroll的兼容性问题。旧版的手机没有dom.remove方法
                var dom = this.pullUp.pullup;
                if (typeof dom.remove != 'function') {
                    dom.remove = function () {
                        $(dom).remove();
                    }
                }
                this.pullUp.detach('loading');
                this.pullUp.reset();
                this.xList.unplug(this.pullUp);
                this.pullUp = null;
            }
        },
        listenPullUp: function () {
            var config = this.props.config || {};
            var pullUp = this.pullUp;
            if (pullUp) {
                pullUp.on('loading', function () {
                    if(typeof config.getMore == 'function'){
                        config.getMore();
                    }
                });
            }
        },
        completePullUp: function(){
            if(this.pullUp){
                this.pullUp.complete();
            }
        }
    };
    module.exports = PullUp;

});