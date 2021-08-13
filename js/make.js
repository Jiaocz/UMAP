const app = Vue.createApp({
    data() {
        return {
            upper: [
                // {
                //     'name': '新疆',
                //     'info': ['张三', '李四', '王五'],
                //     'color': 'inherit'
                // },
                // {
                //     'name': '黑龙江',
                //     'info': ['张三 - 黑龙江科技大学', '李四', '王五'],
                //     'color': '#ec4e8a'
                // },
                // {
                //     'name': '内蒙古',
                //     'info': ['张三', '李四', '王五','赵六'],
                //     'color': 'inherit'
                // }
            ],
            left: [
                // {
                //     'name': '西藏',
                //     'info': ['张三', '李四', '王五'],
                //     'color': 'black'
                // }
            ],
            right: [
                // {
                //     'name': '天津',
                //     'info': ['张三', '李四', '王五'],
                //     'color': 'orange'
                // },
                // {
                //     'name': '河北',
                //     'info': ['张三', '李四', '王五'],
                //     'color': 'green'
                // }
            ],
            bottom: [
                // {
                //     'name': '四川',
                //     'info': ['张三', '李四', '王五'],
                //     'color': 'inherit'
                // }
            ],

            popup: {
                show: false,
                data: {
                    name: "",
                    info: [],
                    color: 'inherit',
                },
                posX: 150,
                posY: 150,
                created: false,
            },

            DefaultColor: '#15559a',
            DefaultMapFill: '#CCC',
            BGType: 'none',
            BGValue: 'transparent',
        }
    },

    methods: {
        openPopup: function (ProvinceId) {
            if (this.popup.show == true) {
                this.closePopup(true)
            }
            var ProvinceName = this.getProvinceName(ProvinceId)
            var found = false
            var that = this

            this.upper.forEach((value, index) => {
                if (value.name == ProvinceName) {
                    that.popup.data = that.upper[index]
                    found = true
                }
            })
            this.left.forEach((value, index) => {
                if (value.name == ProvinceName) {
                    that.popup.data = that.left[index]
                    found = true
                }
            })
            this.right.forEach((value, index) => {
                if (value.name == ProvinceName) {
                    that.popup.data = that.right[index]
                    found = true
                }
            })
            this.bottom.forEach((value, index) => {
                if (value.name == ProvinceName) {
                    that.popup.data = that.bottom[index]
                    found = true
                }
            })

            if (!found) {
                this.popup.data.name = ProvinceName;
            }

            this.popup.created = found

            var posX = 0, posY = 0
            var event = event || window.event;
            if (event.pageX || event.pageY) {
                posX = event.pageX
                posY = event.pageY
            }
            else if (event.clientX || event.clientY) {
                posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft
                posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop
            }

            this.popup.show = true
            this.popup.posX = posX
            this.popup.posY = posY

        },

        closePopup: function (clearData = false) {
            this.popup.show = false
            if(clearData){
                this.popupClosed()
            }
        },

        popupClosed: function () {
            this.popup.data = { name: "", info: [], color: 'inherit' }
        },

        deleteInfo: function (name) {
            if (this.popup.show === false) {
                return
            }

            var index = this.popup.data.info.indexOf(name)
            this.popup.data.info.splice(index, 1)
        },

        addInfo: function () {
            if (!this.popup.created) {
                return
            }

            var ele = document.getElementById("add")
            this.popup.data.info[this.popup.data.info.length] = ele.value
            ele.value = ""
        },

        selectPosition: function (position) {
            var dest;
            switch (position) {
                case 'left': dest = this.left; break;
                case 'up': dest = this.upper; break;
                case 'right': dest = this.right; break;
                case 'down': dest = this.bottom; break;
            }

            if (!this.popup.created) {
                dest.push(this.popup.data)
                this.popup.created = true
                document.getElementById(this.getProvinceId(this.popup.data.name)).style.setProperty('--fill-color', document.body.style.getPropertyValue('--fill-color-default'))
            }
            else {
                var that = this
                var source;
                this.upper.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.upper
                })
                this.left.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.left
                })
                this.right.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.right
                })
                this.bottom.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.bottom
                })

                dest.push(this.popup.data)
                source.splice(source.indexOf(this.popup.data), 1)
            }
        },

        deleteCard: function (ProvinceName) {
            if (!this.popup.show || !this.popup.created) {
                return
            }
            if (confirm("您即将删除省份 " + ProvinceName + " 的卡片，确认吗？")) {
                var source, that = this;
                this.upper.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.upper
                })
                this.left.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.left
                })
                this.right.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.right
                })
                this.bottom.forEach((value, index) => {
                    if (value.name == this.popup.data.name)
                        source = that.bottom
                })
                document.getElementById(this.getProvinceId(ProvinceName)).style.setProperty('--fill-color', document.getElementById('empty').style.getPropertyValue('--fill-color'))
                source.splice(source.indexOf(this.popup.data), 1)
            }
            this.closePopup()
        },

        changeProvinceColor: function () {
            if (!this.popup.created) {
                return
            }

            var ProvinceId = this.getProvinceId(this.popup.data.name)
            // console.log(this.popup.data.color)
            document.getElementById(ProvinceId).style.setProperty('--fill-color', this.popup.data.color)
        },

        getProvinceName: function (ProvinceId) {
            switch (ProvinceId) {
                case "CN-34": return "安徽"
                case "CN-11": return "北京"
                case "CN-50": return "重庆"
                case "CN-35": return "福建"
                case "CN-44": return "广东"
                case "CN-62": return "甘肃"
                case "CN-45": return "广西"
                case "CN-52": return "贵州"
                case "CN-46": return "海南"
                case "CN-13": return "河北"
                case "CN-41": return "河南"
                case "CN-91": return "香港"
                case "CN-23": return "黑龙江"
                case "CN-43": return "湖南"
                case "CN-42": return "湖北"
                case "CN-22": return "吉林"
                case "CN-32": return "江苏"
                case "CN-36": return "江西"
                case "CN-21": return "辽宁"
                case "CN-92": return "澳门"
                case "CN-15": return "内蒙古"
                case "CN-64": return "宁夏"
                case "CN-63": return "青海"
                case "CN-61": return "陕西"
                case "CN-51": return "四川"
                case "CN-37": return "山东"
                case "CN-31": return "上海"
                case "CN-14": return "山西"
                case "CN-12": return "天津"
                case "CN-71": return "台湾"
                case "CN-65": return "新疆"
                case "CN-54": return "西藏"
                case "CN-53": return "云南"
                case "CN-33": return "浙江"
                default:
                    alert("你干了什么触发了这个？")
                    return false
            }
        },

        getProvinceId: function (ProvinceName) {
            switch (ProvinceName) {
                case "安徽": return "CN-34"
                case "北京": return "CN-11"
                case "重庆": return "CN-50"
                case "福建": return "CN-35"
                case "广东": return "CN-44"
                case "甘肃": return "CN-62"
                case "广西": return "CN-45"
                case "贵州": return "CN-52"
                case "海南": return "CN-46"
                case "河北": return "CN-13"
                case "河南": return "CN-41"
                case "香港": return "CN-91"
                case "黑龙江": return "CN-23"
                case "湖南": return "CN-43"
                case "湖北": return "CN-42"
                case "吉林": return "CN-22"
                case "江苏": return "CN-32"
                case "江西": return "CN-36"
                case "辽宁": return "CN-21"
                case "澳门": return "CN-92"
                case "内蒙古": return "CN-15"
                case "宁夏": return "CN-64"
                case "青海": return "CN-63"
                case "陕西": return "CN-61"
                case "四川": return "CN-51"
                case "山东": return "CN-37"
                case "上海": return "CN-31"
                case "山西": return "CN-14"
                case "天津": return "CN-12"
                case "台湾": return "CN-71"
                case "新疆": return "CN-65"
                case "西藏": return "CN-54"
                case "云南": return "CN-53"
                case "浙江": return "CN-33"
                default:
                    alert("你干了什么触发了这个？")
                    return false
            }
        },

        captureImage: function (alternative = false) {
            if (alternative === false) {
                domtoimage.toBlob(document.querySelector('div.skeleton'))
                    .then(blob => {
                        window.saveAs(blob, 'umap.png')
                    })
                    .catch(error => {
                        alert("文件保存失败，请尝试其他方法，错误信息请打开控制台")
                        console.log(error)
                    })
            }
            else {
                domtoimage.toPng(document.querySelector('div.skeleton'))
                    .then(dataURL => {
                        var w = window.open()
                        var i = w.document.createElement('img')
                        i.src = dataURL
                        w.document.body.appendChild(i)
                        w.document.title = "UMAP蹭饭图结果"
                    })
                    .catch(error => {
                        alert("图片生成失败，请查看控制台错误信息")
                        console.log(error)
                    })
            }
        },

        imageChanged(){
            if($('#remoteImage').val()){
                this.BGValue = $('#remoteImage').val()
                return
            }
            var fileObj = $('#BGFile')[0]
            var img = document.createElement('img')
            var windowURL = window.URL || window.webkitURL
            var dataURL, base64, that = this
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0])
                img.src = dataURL

                var reader = new FileReader()
                reader.readAsDataURL(fileObj.files[0])
                reader.onload = (e) => {
                    base64 = e.target.result
                    that.BGValue = base64
                }
            }
        }
    },

    watch:{
        BGType: function(val){
            if(val == "none"){
                this.BGValue = "transparent"
            }
            document.querySelector('#skeleton.skeleton').style.setProperty('--bg', "transparent");
        },
        BGValue: function(val){
            if(this.BGType == "none"){
                return
            }
            var out
            if(this.BGType == "color"){
                out = val
            }
            if(this.BGType == "image"){
                out = 'url(' + val + ')'
            }

            document.querySelector('#skeleton.skeleton').style.setProperty('--bg', out);
        },
        DefaultMapFill: function(val){
            document.querySelector('svg').style.setProperty('--fill-color', val);
        }
    },

    mounted() {
        // Add Map Click Events to Open Popup
        $('svg').on('click', 'path', (e) => {
            this.openPopup(e.target.id)
        })

        // Add Map Default Color
        document.body.style.setProperty('--fill-color-default', this.DefaultColor)
        document.body.style.setProperty('--color', this.DefaultColor)

        // When Press Enter, Add one's info
        window.addEventListener('keydown', (e)=> {
            if(e.code == "Enter"){
                this.addInfo()
            }
        })
    },
}).mount('#main');