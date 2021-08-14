const app = Vue.createApp({
    data() {
        return {
            BrowserCheck: [
                {
                    name:'窗口宽高',
                    status: 'loading',
                    info: '正在检测',
                    class:'',
                    check: function(){
                        if(document.body.clientWidth < document.body.clientHeight || document.body.clientWidth < 800){
                            this.status = 'info'
                            this.info = '您的窗口尺寸过小或在使用手机，请调整浏览器尺寸并刷新重试'
                            this.class = 'info'
                        } else {
                            this.status = true
                            this.info = '通过，建议按F11开启全屏效果更加'
                            this.class = 'correct'
                        }
                    },
                },
                {
                    name:'浏览器检测',
                    status: 'loading',
                    info: '正在检测',
                    class:'',
                    check: function(){
                        var ua = navigator.userAgent.toLowerCase()
                        if(ua.indexOf(' qq') > -1 || ua.indexOf('mqqbrowser') > -1 || ua.match(/MicroMessenger/i) == 'micromessenger'){
                            this.status = false
                            this.info = '经过测试，QQ/微信内置浏览器及QQ浏览器不支持显示地图'
                            this.class = 'error'
                        }
                    },
                },
                {
                    name:'Canvas',
                    status: 'loading',
                    info: '正在检测',
                    class:'',
                    check: function(){
                        if(document.createElement('canvas').getContext('2d')){
                            this.status = true
                            this.info = '您的浏览器支持Canvas'
                            this.class = 'correct'
                        } else {
                            this.status = 'info'
                            this.info = '您的浏览器不支持Canvas，后续将不能绘制地图与信息间的引导线'
                            this.class = 'info'
                        }
                    },
                },
                {
                    name:'SVG',
                    status: 'loading',
                    info: '正在检测',
                    class:'',
                    check: function(){
                        var SVG_NS = 'http://www.w3.org/2000/svg'
                        if(document.createElementNS !== undefined && document.createElementNS(SVG_NS, 'svg').createSVGRect !== undefined) {
                            this.status = true
                            this.info = '您的浏览器支持SVG'
                            this.class = 'correct'
                        } else {
                            this.status = false
                            this.info = '您的浏览器不支持SVG，无法显示地图'
                            this.class = 'error'
                        }
                    },
                },
                {
                    name:'WindowURL',
                    status: 'loading',
                    info: '正在检测',
                    class:'',
                    check: function(){
                        var windowURL = window.URL || window.webkitURL
                        if(windowURL && windowURL.createObjectURL !== undefined && FileReader !== undefined){
                            this.status = true
                            this.info = '您的浏览器图片背景'
                            this.class = 'correct'
                        } else {
                            this.status = 'info'
                            this.info = '您的浏览器不图片背景'
                            this.class = 'info'
                        }
                    },
                },
            ],
            BrowserCheckPassed: false,
        }
    },
    mounted: function() {
        var passed = true
        this.BrowserCheck.forEach((item) => {
            item.check()
            if(item.status === false) {
                passed = false
            }
        })
        this.BrowserCheckPassed = passed
    },
}).mount('#main');