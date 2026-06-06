/**
 * 团队数据文件
 * 包含：当前成员 (teamData) 和 校友 (alumniData)
 * 由 data.js 和 data2.js 合并而来
 */

const teamData = {
    // 教职成员（教师）
    coreMembers: [
        {
            id: 'xipeng-qiu',
            name: {
                zh: '邱锡鹏',
                en: 'Xipeng Qiu'
            },
            title: {
                zh: '教授',
                en: 'Professor'
            },
            photo: 'assets/img/Xipeng Qiu.jpg',
            email: 'xpqiu@fudan.edu.cn',
            homepage: 'https://xpqiu.github.io/',
            scholar: 'https://scholar.google.com/citations?user=Pq4Yp_kAAAAJ'
        },
        {
            id: 'xinchi-chen',
            name: {
                zh: '陈新驰',
                en: 'Xinchi Chen'
            },
            title: {
                zh: '青年研究员',
                en: 'Professor'
            },
            photo: 'assets/img/Xinchi Chen.jpg',
            email: 'chenxinchi@fudan.edu.cn',
            homepage: 'https://dalstonchen.github.io/'
        },
        {
            id: 'jinlan-fu',
            name: {
                zh: '傅金兰',
               en: 'Jinlan Fu'
            },
            title: {
                zh: '助理教授',
                en: 'Assistant Professor'
             },
             photo: 'assets/img/Jinlan Fu.jpg',
             homepage: 'https://jinlanfu.github.io'
        },
        {
            id: 'tao-ji',
            name: {
                zh: '纪焘',
                en: 'Tao Ji'
            },
            title: {
                zh: '助理教授',
                en: 'Assistant Professor'
            },
            photo: 'assets/img/Tao Ji.jpeg',
            homepage: 'https://taoji.eth.link/'
        },
        {
            id: 'jingjing-gong',
            name: {
                zh: '龚经经',
                en: 'Jingjing Gong'
            },
            title: {
                zh: '研究助理教授',
                en: 'Research Assistant Professor'
            },
            photo: 'assets/img/Jingjing Gong.jpg',
            homepage: 'https://jjgong.com'
        },
        {
            id: 'ziwei-he',
            name: {
                zh: '何子薇',
                en: 'Ziwei He'
            },
            title: {
                zh: '研究助理教授',
                en: 'Research Assistant Professor'
            },
            photo: 'assets/img/Ziwei He.jpg',
            homepage: 'https://scholar.google.com/citations?hl=en&user=3ii0orgAAAAJ'
        },
        {
            id: 'shuang-chen',
            name: {
                zh: '陈爽',
                en: 'Shuang Chen'
            },
            title: {
                zh: '副研究员',
                en: 'Associate Research Fellow'
            },
            photo: 'assets/img/Shuang Chen.jpg',
            homepage: 'https://scholar.google.com/citations?user=epJpBtYAAAAJ&hl=zh-CN'
        },
        {
            id: 'yining-zheng',
            name: {
                zh: '郑逸宁',
                en: 'Yining Zheng'
            },
            title: {
                zh: '副研究员',
                en: 'Associate Research Fellow'
            },
            photo: 'assets/img/Yining Zheng.jpeg',
            homepage: 'https://github.com/WillQvQ'
        },
        {
            id: 'yuxin-wang',
            name: {
                zh: '汪燠欣',
                en: 'Yuxin Wang'
            },
            title: {
                zh: '研究助理教授',
                en: 'Research Assistant Professor'
            },
            photo: 'assets/img/汪燠欣.jpg',
            homepage: 'https://scholar.google.co.jp/citations?user=bTo8CT0AAAAJ&hl=en'
        }
    ],

    // 博士后
    postdocs: [
        {
            id: 'chujie-ma',
            name: {
                zh: '马楚婕',
                en: 'Chujie Ma'
            },
            title: {
                zh: '博士后',
                en: 'Postdoctoral Researcher'
            },
            photo: 'assets/img/马楚婕.jpg'
        },
        {
            id: 'xin-qi',
            name: {
                zh: '齐欣',
                en: 'Xin Qi'
            },
            title: {
                zh: '博士后',
                en: 'Postdoctoral Researcher'
            },
            photo: 'assets/img/齐欣.jpg'
        }
    ],

    // 博士研究生
    phdStudents: [
        { id: 'junqi-dai', name: { zh: '代俊奇', en: 'Junqi Dai' }, photo: 'assets/img/代俊奇.jpg', year: '2022' },
        { id: 'zhaoye-fei', name: { zh: '费朝烨', en: 'Zhaoye Fei' }, photo: 'assets/img/费朝烨.jpeg', homepage: 'https://ngc7292.github.io/', year: '2023' },
        { id: 'peiju-liu', name: { zh: '刘佩举', en: 'Peiju Liu' }, photo: 'assets/img/刘佩举.jpg', year: '2021' },
        { id: 'xiaoran-liu', name: { zh: '柳潇然', en: 'Xiaoran Liu' }, photo: 'assets/img/柳潇然.jpeg', homepage: 'https://github.com/lxr-tech', year: '2022' },
        { id: 'bo-wang', name: { zh: '王博', en: 'Bo Wang' }, photo: 'assets/img/王博.jpg', year: '2022' },
        { id: 'pengyu-wang', name: { zh: '王鹏宇', en: 'Pengyu Wang' }, photo: 'assets/img/王鹏宇.jpg', year: '2022' },
        { id: 'xinghao-wang', name: { zh: '王星皓', en: 'Xinghao Wang' }, photo: 'assets/img/王星皓.jpg', homepage: 'https://github.com/xinghaow99', year: '2022' },
        { id: 'ningyu-xu', name: { zh: '徐凝雨', en: 'Ningyu Xu' }, photo: 'assets/img/徐凝雨.JPEG', year: '2022' },
        { id: 'jun-zhan', name: { zh: '詹俊', en: 'Jun Zhan' }, photo: 'assets/img/詹俊.JPEG', homepage: 'https://junzhan2000.github.io', year: '2022' },
        { id: 'qinghui-gao', name: { zh: '高庆麾', en: 'Qinghui Gao' }, photo: 'assets/img/高庆麾.jpg', year: '2023' },
        { id: 'zhengfu-he', name: { zh: '贺正夫', en: 'Zhengfu He' }, photo: 'assets/img/贺正夫.jpg', homepage: 'https://scholar.google.com/citations?user=mou-vPwAAAAJ&hl=en', year: '2023' },
        { id: 'botian-jiang', name: { zh: '姜博天', en: 'Botian Jiang' }, photo: 'assets/img/姜博天.png', year: '2023' },
        { id: 'zhigeng-liu', name: { zh: '刘智耿', en: 'Zhigeng Liu' }, photo: 'assets/img/刘智耿.webp', year: '2023' },
        { id: 'chenkun-tan', name: { zh: '谭臣坤', en: 'Chenkun Tan' }, photo: 'assets/img/谭臣坤.jpg', year: '2023' },
        { id: 'jingqi-tong', name: { zh: '仝竞奇', en: 'Jingqi Tong' }, photo: 'assets/img/仝竞奇.jpg', homepage: 'https://github.com/tongjingqi', year: '2023' },
        { id: 'zhiyuan-zeng', name: { zh: '曾致远', en: 'Zhiyuan Zeng' }, photo: 'assets/img/曾致远.jpg', homepage: 'https://zhiyuanzeng.github.io/', year: '2023' },
        { id: 'peiji-li', name: { zh: '李培基', en: 'Peiji Li' }, photo: 'assets/img/李培基.jpg', homepage: 'https://github.com/FlyingDutchman26', year: '2024' },
        { id: 'ruixiao-li', name: { zh: '李睿潇', en: 'Ruixiao Li' }, photo: 'assets/img/李睿潇.JPG', homepage: 'https://github.com/Li-dongyang', year: '2024' },
        { id: 'junhao-shi', name: { zh: '施君豪', en: 'Junhao Shi' }, photo: 'assets/img/施君豪.jpg', year: '2024' },
        { id: 'siyin-wang', name: { zh: '王思尹', en: 'Siyin Wang' }, photo: 'assets/img/王思尹.JPG', homepage: 'https://sinwang20.github.io/', year: '2024' },
        { id: 'chen-jia', name: { zh: '陈嘉', en: 'Jia Chen' }, photo: 'assets/img/陈嘉.PNG', year: '2025' },
        { id: 'ke-chen', name: { zh: '陈可', en: 'Ke Chen' }, photo: 'assets/img/陈可.JPEG', homepage: 'https://github.com/jingyijun', year: '2025' },
        { id: 'qian-chen', name: { zh: '陈千', en: 'Qian Chen' }, photo: 'assets/img/陈千.jpg', homepage: 'https://qq31415926.github.io/cq.github.io/', year: '2025' },
        { id: 'jijun-cheng', name: { zh: '程纪钧', en: 'Jijun Cheng' }, photo: 'assets/img/程纪钧.png', year: '2025' },
        { id: 'shicheng-fang', name: { zh: '方世成', en: 'Shicheng Fang' }, photo: 'assets/img/方世成.png', year: '2025' },
        { id: 'senyu-fei', name: { zh: '费森俞', en: 'Senyu Fei' }, photo: 'assets/img/费森俞.JPEG', year: '2025' },
        { id: 'zhaoyang-fu', name: { zh: '付兆洋', en: 'Zhaoyang Fu' }, photo: 'assets/img/付兆洋.jpg', year: '2025' },
        { id: 'xingyang-he', name: { zh: '何星阳', en: 'Xingyang He' }, photo: 'assets/img/何星阳.png', year: '2025' },
        { id: 'tianyu-huai', name: { zh: '怀天宇', en: 'Tianyu Huai' }, photo: 'assets/img/怀天宇.jpg', homepage: 'https://yutinh.github.io/', year: '2025' },
        { id: 'zezheng-huai', name: { zh: '淮泽正', en: 'Zezheng Huai' }, photo: 'assets/img/淮泽正.jpg', homepage: 'https://github.com/Huaizz-shawen', year: '2025' },
        { id: 'sixian-li', name: { zh: '李思贤', en: 'Sixian Li' }, photo: 'assets/img/default-avatar.svg', year: '2025' },
        { id: 'tianyi-liang', name: { zh: '梁天一', en: 'Tianyi Liang' }, photo: 'assets/img/梁天一.jpg', homepage: 'https://tianyilt.github.io/', year: '2025' },
        { id: 'rui-lin', name: { zh: '林睿', en: 'Rui Lin' }, photo: 'assets/img/林睿.jpg', year: '2025' },
        { id: 'yukang-lin', name: { zh: '林煜康', en: 'Yukang Lin' }, photo: 'assets/img/林煜康.jpeg', year: '2025' },
        { id: 'fan-liu', name: { zh: '刘帆', en: 'Fan Liu' }, photo: 'assets/img/刘帆.jpg', year: '2025' },
        { id: 'yang-liu', name: { zh: '刘玚', en: 'Yang Liu' }, photo: 'assets/img/刘玚.jpg', year: '2025' },
        { id: 'jiahao-lu', name: { zh: '陆嘉昊', en: 'Jiahao Lu' }, photo: 'assets/img/陆嘉昊.jpeg', year: '2025' },
        { id: 'pengfang-qian', name: { zh: '钱鹏方', en: 'Pengfang Qian' }, photo: 'assets/img/钱鹏方.jpg', homepage: 'https://github.com/oowsxq', year: '2025' },
        { id: 'yuerong-song', name: { zh: '宋悦荣', en: 'Yuerong Song' }, photo: 'assets/img/宋悦荣.jpeg', year: '2025' },
        { id: 'junxuan-wang', name: { zh: '汪俊轩', en: 'Junxuan Wang' }, photo: 'assets/img/汪俊轩.jpg', year: '2025' },
        { id: 'xinyuan-wang', name: { zh: '王新元', en: 'Xinyuan Wang' }, photo: 'assets/img/王新元.JPG', homepage: 'https://dirtycomputer.github.io/', year: '2025' },
        { id: 'jinhao-wu', name: { zh: '吴锦皓', en: 'Jinhao Wu' }, photo: 'assets/img/吴锦皓.png', year: '2025' },
        { id: 'chenchen-yang', name: { zh: '杨晨晨', en: 'Chenchen Yang' }, photo: 'assets/img/杨晨晨.jpg', homepage: 'https://cr-fish.github.io/', year: '2025' },
        { id: 'linqi-yin', name: { zh: '殷林琪', en: 'Linqi Yin' }, photo: 'assets/img/殷林琪.JPEG', year: '2025' },
        { id: 'haowei-zhang', name: { zh: '张浩威', en: 'Haowei Zhang' }, photo: 'assets/img/张浩威.png', homepage: 'https://haowei-freesky.github.io/', year: '2025' },
        { id: 'haozhe-zhang', name: { zh: '张浩哲', en: 'Haozhe Zhang' }, photo: 'assets/img/张浩哲.png', year: '2025' },
        { id: 'wenbo-zhang', name: { zh: '张文擘', en: 'Wenbo Zhang' }, photo: 'assets/img/张文擘.JPEG', homepage: 'https://github.com/ppolariss', year: '2025' },
        { id: 'yiyang-zhang', name: { zh: '张奕洋', en: 'Yiyang Zhang' }, photo: 'assets/img/张奕洋.jpg', homepage: 'https://github.com/CloudRipple', year: '2025' },
        { id: 'yifei-zhang', name: { zh: '张逸飞', en: 'Yifei Zhang' }, photo: 'assets/img/张逸飞.jpg', year: '2025' },
        { id: 'guancheng-zhou', name: { zh: '周冠程', en: 'Guancheng Zhou' }, photo: 'assets/img/周冠程.jpg', homepage: 'https://guanchengzhou.github.io/', year: '2025' },
        { id: 'yanxin-chen', name: { zh: '陈衍鑫', en: 'Yanxin Chen' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'jiajun-chen', name: { zh: '陈嘉骏', en: 'Jiajun Chen' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'yitong-chen', name: { zh: '谌奕同', en: 'Yitong Chen' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'jiaying-he', name: { zh: '何佳莹', en: 'Jiaying He' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'pengfei-wang', name: { zh: '王鹏飞', en: 'Pengfei Wang' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'qianyi-wu', name: { zh: '吴乾奕', en: 'Qianyi Wu' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'haocheng-xu', name: { zh: '徐颢诚', en: 'Haocheng Xu' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'yuqian-yao', name: { zh: '姚寓骞', en: 'Yuqian Yao' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'kang-yu', name: { zh: '于康', en: 'Kang Yu' }, photo: 'assets/img/于康.jpg', homepage: 'https://kaysonyu.github.io', year: '2026' },
        { id: 'yucheng-yuan', name: { zh: '袁宇成', en: 'Yucheng Yuan' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'zhiyu-zhang', name: { zh: '章之禹', en: 'Zhiyu Zhang' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'keyan-zhou', name: { zh: '周柯言', en: 'Keyan Zhou' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'ying-zhu', name: { zh: '朱影', en: 'Ying Zhu' }, photo: 'assets/img/default-avatar.svg', year: '2026' }
    ],

    // 硕士研究生
    masterStudents: [
        { id: 'ruifan-deng', name: { zh: '邓瑞凡', en: 'Ruifan Deng' }, photo: 'assets/img/邓瑞凡.jpg', year: '2023' },
        { id: 'yiran-guo', name: { zh: '郭一然', en: 'Yiran Guo' }, photo: 'assets/img/郭一然.jpg', year: '2023' },
        { id: 'mianqiu-huang', name: { zh: '黄绵秋', en: 'Mianqiu Huang' }, photo: 'assets/img/黄绵秋.jpg', year: '2023' },
        { id: 'xingyu-lu', name: { zh: '陆星宇', en: 'Xingyu Lu' }, photo: 'assets/img/陆星宇.jpg', year: '2023' },
        { id: 'qian-tu', name: { zh: '涂倩', en: 'Qian Tu' }, photo: 'assets/img/涂倩.jpg', year: '2023' },
        { id: 'haiyang-wei', name: { zh: '魏海洋', en: 'Haiyang Wei' }, photo: 'assets/img/魏海洋.jpg', year: '2023' },
        { id: 'shuhao-xing', name: { zh: '邢书豪', en: 'Shuhao Xing' }, photo: 'assets/img/邢书豪.jpg', year: '2023' },
        { id: 'jiasheng-ye', name: { zh: '叶家升', en: 'Jiasheng Ye' }, photo: 'assets/img/叶家升.jpg', year: '2023' },
        { id: 'shiduo-zhang', name: { zh: '张世铎', en: 'Shiduo Zhang' }, photo: 'assets/img/张世铎.jpg', homepage: 'https://shiduo-zhang.github.io/', year: '2023' },
        { id: 'changtai-zhu', name: { zh: '朱长泰', en: 'Changtai Zhu' }, photo: 'assets/img/朱长泰.jpg', year: '2023' },
        { id: 'shuo-chen', name: { zh: '陈硕', en: 'Shuo Chen' }, photo: 'assets/img/陈硕.jpg', year: '2024' },
        { id: 'liwei-fan', name: { zh: '范力玮', en: 'Liwei Fan' }, photo: 'assets/img/范力玮.jpg', year: '2024' },
        { id: 'xuyang-ge', name: { zh: '葛煦旸', en: 'Xuyang Ge' }, photo: 'assets/img/葛煦旸.jpg', year: '2024' },
        { id: 'yitian-gong', name: { zh: '龚奕天', en: 'Yitian Gong' }, photo: 'assets/img/龚奕天.jpg', homepage: 'https://github.com/gyt1145028706', year: '2024' },
        { id: 'kexin-huang', name: { zh: '黄可欣', en: 'Kexin Huang' }, photo: 'assets/img/黄可欣.jpg', homepage: 'https://kexinhuang19.github.io/', year: '2024' },
        { id: 'li-ji', name: { zh: '纪力', en: 'Li Ji' }, photo: 'assets/img/纪力.JPEG', year: '2024' },
        { id: 'bufan-li', name: { zh: '李不凡', en: 'Bufan Li' }, photo: 'assets/img/李不凡.jpg', year: '2024' },
        { id: 'yuan-li', name: { zh: '李源', en: 'Yuan Li' }, photo: 'assets/img/李源.jpg', year: '2024' },
        { id: 'zhengyuan-lin', name: { zh: '林正远', en: 'Zhengyuan Lin' }, photo: 'assets/img/林正远.jpg', year: '2024' },
        { id: 'wentao-shu', name: { zh: '舒文韬', en: 'Wentao Shu' }, photo: 'assets/img/舒文韬.webp', year: '2024' },
        { id: 'jin-wang', name: { zh: '王瑾', en: 'Jin Wang' }, photo: 'assets/img/王瑾.JPEG', year: '2024' },
        { id: 'zhe-xu', name: { zh: '徐哲', en: 'Zhe Xu' }, photo: 'assets/img/徐哲.jpg', homepage: 'https://phospheneser.github.io/', year: '2024' },
        { id: 'jie-yang', name: { zh: '杨捷', en: 'Jie Yang' }, photo: 'assets/img/杨捷.jpg', homepage: 'https://github.com/red-fox-yj', year: '2024' },
        { id: 'xiaopeng-yu', name: { zh: '余晓鹏', en: 'Xiaopeng Yu' }, photo: 'assets/img/余晓鹏.jpg', year: '2024' },
        { id: 'zhen-yu', name: { zh: '余镇', en: 'Zhen Yu' }, photo: 'assets/img/余镇.JPEG', year: '2024' },
        { id: 'fengye-yuan', name: { zh: '袁枫烨', en: 'Fengye Yuan' }, photo: 'assets/img/袁枫烨.jpg', year: '2024' },
        { id: 'yuqian-zhang', name: { zh: '张羽乾', en: 'Yuqian Zhang' }, photo: 'assets/img/张羽乾.JPEG', year: '2024' },
        { id: 'xingjian-zhao', name: { zh: '赵行健', en: 'Xingjian Zhao' }, photo: 'assets/img/赵行健.jpg', homepage: 'https://github.com/singularity-s0', year: '2024' },
        { id: 'yiwei-zhao', name: { zh: '赵奕伟', en: 'Yiwei Zhao' }, photo: 'assets/img/赵奕伟.jpg', year: '2024' },
        { id: 'maosen-zhou', name: { zh: '周卯森', en: 'Maosen Zhou' }, photo: 'assets/img/周卯森.jpg', year: '2024' },
        { id: 'shaojun-zhou', name: { zh: '周劭俊', en: 'Shaojun Zhou' }, photo: 'assets/img/周劭俊.jpg', year: '2024' },
        { id: 'hanfu-chen', name: { zh: '陈汉夫', en: 'Hanfu Chen' }, photo: 'assets/img/陈汉夫.JPEG', year: '2025' },
        { id: 'jingqi-chen', name: { zh: '陈敬麒', en: 'Jingqi Chen' }, photo: 'assets/img/陈敬麒.png', year: '2025' },
        { id: 'yufei-gao', name: { zh: '高宇菲', en: 'Yufei Gao' }, photo: 'assets/img/高宇菲.png', year: '2025' },
        { id: 'yaozhou-jiang', name: { zh: '蒋燿州', en: 'Yaozhou Jiang' }, photo: 'assets/img/蒋燿州 .jpg', year: '2025' },
        { id: 'bowen-li', name: { zh: '李博文', en: 'Bowen Li' }, photo: 'assets/img/李博文.jpg', year: '2025' },
        { id: 'zhiyuan-li', name: { zh: '厉致远', en: 'Zhiyuan Li' }, photo: 'assets/img/厉致远.jpg', year: '2025' },
        { id: 'feihong-liu', name: { zh: '刘飞鸿', en: 'Feihong Liu' }, photo: 'assets/img/刘飞鸿.jpg', homepage: 'https://openreview.net/profile?id=%7EFeihong_Liu4', year: '2025' },
        { id: 'enxi-wang', name: { zh: '王恩曦', en: 'Enxi Wang' }, photo: 'assets/img/王恩曦.jpg', year: '2025' },
        { id: 'qifeng-wu', name: { zh: '吴奇峰', en: 'Qifeng Wu' }, photo: 'assets/img/吴奇峰.jpg', year: '2025' },
        { id: 'donghua-yu', name: { zh: '余东桦', en: 'Donghua Yu' }, photo: 'assets/img/余东桦.jpg', year: '2025' },
        { id: 'jiazheng-zhou', name: { zh: '周家正', en: 'Jiazheng Zhou' }, photo: 'assets/img/周家正.JPEG', year: '2025' },
        { id: 'qirui-zhou', name: { zh: '周琪睿', en: 'Qirui Zhou' }, photo: 'assets/img/周琪睿.jpg', year: '2025' },
        { id: 'jie-zhu', name: { zh: '祝杰', en: 'Jie Zhu' }, photo: 'assets/img/祝杰.jpg', year: '2025' },
        { id: 'huaxiang-zhuang', name: { zh: '庄华翔', en: 'Huaxiang Zhuang' }, photo: 'assets/img/庄华翔.jpg', homepage: 'https://brekoji.github.io/', year: '2025' },
        { id: 'qingpeng-cao', name: { zh: '曹庆棚', en: 'Qingpeng Cao' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'zhengwei-cao', name: { zh: '曹正伟', en: 'Zhengwei Cao' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'yaodong-chen', name: { zh: '陈耀东', en: 'Yaodong Chen' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'jinpeng-gao', name: { zh: '高金鹏', en: 'Jinpeng Gao' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'yu-han', name: { zh: '韩雨', en: 'Yu Han' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'ziyi-lei', name: { zh: '雷梓一', en: 'Ziyi Lei' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'zhehan-li', name: { zh: '李哲涵', en: 'Zhehan Li' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'ziyuan-liu', name: { zh: '刘子源', en: 'Ziyuan Liu' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'xiaorui-luan', name: { zh: '栾效睿', en: 'Xiaorui Luan' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'zhangfeng-qian', name: { zh: '钱张枫', en: 'Zhangfeng Qian' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'weixin-zhang', name: { zh: '张玮昕', en: 'Weixin Zhang' }, photo: 'assets/img/default-avatar.svg', year: '2026' },
        { id: 'fan-zhu', name: { zh: '朱凡', en: 'Fan Zhu' }, photo: 'assets/img/default-avatar.svg', year: '2026' }
    ],

    // 本科生
    undergraduates: [
        { id: 'bowen-chen', name: { zh: '陈博闻', en: 'Bowen Chen' }, photo: 'assets/img/陈博闻.jpg', homepage: 'https://stivine.github.io/about', year: '2026' },
        { id: 'kuangwei-chen', name: { zh: '陈匡巍', en: 'Kuangwei Chen' }, photo: 'assets/img/陈匡巍.jpg', year: '2026' },
        { id: 'zihao-dai', name: { zh: '戴子皓', en: 'Zihao Dai' }, photo: 'assets/img/戴子皓.jpg', year: '2026' },
        { id: 'siyang-he', name: { zh: '何思洋', en: 'Siyang He' }, photo: 'assets/img/何思洋.jpg', year: '2026' },
        { id: 'chen-hu', name: { zh: '胡宸', en: 'Chen Hu' }, photo: 'assets/img/胡宸.jpg', year: '2026' },
        { id: 'luozhijie-jin', name: { zh: '金罗智杰', en: 'Luozhijie Jin' }, photo: 'assets/img/金罗智杰.png', year: '2026' },
        { id: 'changsong-li', name: { zh: '李畅松', en: 'Changsong Li' }, photo: 'assets/img/李畅松.jpg', year: '2026' },
        { id: 'hangcheng-li', name: { zh: '李航成', en: 'Hangcheng Li' }, photo: 'assets/img/李航成.jpg', homepage: 'https://github.com/lkdhy', year: '2026' },
        { id: 'mingzhe-li', name: { zh: '李明哲', en: 'Mingzhe Li' }, photo: 'assets/img/李明哲.jpg', homepage: 'https://www.mubuky.com/', year: '2026' },
        { id: 'yinze-luo', name: { zh: '罗尹泽', en: 'Yinze Luo' }, photo: 'assets/img/罗尹泽.jpg', homepage: 'https://fudan-nlp.feishu.cn/wiki/H1GMwJjiuiN5j6kMXAGcRo13nxc?from=from_copylink', year: '2026' },
        { id: 'zhiyuan-ning', name: { zh: '宁致远', en: 'Zhiyuan Ning' }, photo: 'assets/img/宁致远.jpg', homepage: 'https://zy-ning.vercel.app/', year: '2026' },
        { id: 'xiaomeng-qian', name: { zh: '钱晓萌', en: 'Xiaomeng Qian' }, photo: 'assets/img/钱晓萌.jpg', homepage: 'https://xmqian03.github.io', year: '2026' },
        { id: 'jinyu-tian', name: { zh: '田晋宇', en: 'Jinyu Tian' }, photo: 'assets/img/田晋宇.jpg', year: '2026' },
        { id: 'yixian-tian', name: { zh: '田一贤', en: 'Yixian Tian' }, photo: 'assets/img/田一贤.jpg', homepage: 'https://tianyixian.github.io/', year: '2026' },
        { id: 'yihai-tian', name: { zh: '田亦海', en: 'Yihai Tian' }, photo: 'assets/img/田亦海.jpg', year: '2026' },
        { id: 'qiqi-wang', name: { zh: '王琪琦', en: 'Qiqi Wang' }, photo: 'assets/img/王琪琦.JPEG', year: '2026' },
        { id: 'wenxuan-wang', name: { zh: '王文煊', en: 'Wenxuan Wang' }, photo: 'assets/img/王文煊.JPG', year: '2026' },
        { id: 'weiyi-wang', name: { zh: '王惟易', en: 'Weiyi Wang' }, photo: 'assets/img/王惟易.png', homepage: 'https://github.com/Mtrya', year: '2026' },
        { id: 'yang-wang-1', name: { zh: '王扬', en: 'Yang Wang' }, photo: 'assets/img/王扬.png', year: '2026' },
        { id: 'yang-wang-2', name: { zh: '王洋', en: 'Yang Wang' }, photo: 'assets/img/王洋.jpg', year: '2026' },
        { id: 'yubang-wang', name: { zh: '王昱邦', en: 'Yubang Wang' }, photo: 'assets/img/王昱邦.jpg', year: '2026' },
        { id: 'huangxuan-wu', name: { zh: '吴黄璇', en: 'Huangxuan Wu' }, photo: 'assets/img/吴黄璇.jpg', homepage: 'https://github.com/OddFunction0205', year: '2026' },
        { id: 'jiaxing-wu', name: { zh: '吴家兴', en: 'Jiaxing Wu' }, photo: 'assets/img/吴家兴.jpg', year: '2026' },
        { id: 'ruixi-wu', name: { zh: '吴睿曦', en: 'Ruixi Wu' }, photo: 'assets/img/吴睿曦.jpeg', year: '2026' },
        { id: 'chen-yang', name: { zh: '杨晨', en: 'Chen Yang' }, photo: 'assets/img/杨晨.jpg', year: '2026' },
        { id: 'shudong-yang', name: { zh: '杨枢栋', en: 'Shudong Yang' }, photo: 'assets/img/杨枢栋.jpg', homepage: 'https://github.com/luppppy', year: '2026' },
        { id: 'yongzhuo-yang', name: { zh: '杨永卓', en: 'Yongzhuo Yang' }, photo: 'assets/img/杨永卓.jpg', homepage: 'https://github.com/yatao-zhuozhuo', year: '2026' },
        { id: 'huazheng-zeng', name: { zh: '曾华正', en: 'Huazheng Zeng' }, photo: 'assets/img/曾华正.jpg', homepage: 'https://huazzeng.github.io/', year: '2026' },
        { id: 'junpeng-zhang', name: { zh: '张俊鹏', en: 'Junpeng Zhang' }, photo: 'assets/img/张俊鹏.jpg', homepage: 'https://github.com/JunpengZZhang', year: '2026' },
        { id: 'jingxuan-zuo', name: { zh: '左景萱', en: 'Jingxuan Zuo' }, photo: 'assets/img/左景萱.jpg', year: '2026' },
        { id: 'jikun-cai', name: { zh: '蔡纪坤', en: 'Jikun Cai' }, photo: 'assets/img/蔡纪坤.JPEG' },
        { id: 'tingshuo-fan', name: { zh: '范庭朔', en: 'Tingshuo Fan' }, photo: 'assets/img/范庭朔.png', homepage: 'https://survivor613.github.io/' },
        { id: 'jiaxi-li', name: { zh: '李佳羲', en: 'Jiaxi Li' }, photo: 'assets/img/李佳羲.JPEG', homepage: 'https://jecci-cmd.github.io/' },
        { id: 'haochen-ma', name: { zh: '马颢宸', en: 'Haochen Ma' }, photo: 'assets/img/马颢宸.jpg' },
        { id: 'shenling-qiu', name: { zh: '邱深凌', en: 'Shenling Qiu' }, photo: 'assets/img/邱深凌.jpg' },
        { id: 'hengmian-shi', name: { zh: '史恒勉', en: 'Hengmian Shi' }, photo: 'assets/img/史恒勉.jpg' },
        { id: 'hongkai-wang', name: { zh: '王鸿凯', en: 'Hongkai Wang' }, photo: 'assets/img/王鸿凯.jpg' },
        { id: 'ruiming-wang', name: { zh: '王瑞明', en: 'Ruiming Wang' }, photo: 'assets/img/王瑞明.png' },
        { id: 'chengyang-zhu', name: { zh: '朱程炀', en: 'Chengyang Zhu' }, photo: 'assets/img/朱程炀.png', homepage: 'https://github.com/Zecyel' }
    ],

    // 访问学生
    visitingStudents: [
        { id: 'yiran-suo', name: { zh: '锁祎然', en: 'Yiran Suo' }, photo: 'assets/img/锁祎然.png', year: '2026' },
        { id: 'hongnan-ma', name: { zh: '马红楠', en: 'Hongnan Ma' }, photo: 'assets/img/马红楠.jpg' },
        { id: 'jiaxing-miao', name: { zh: '苗嘉兴', en: 'Jiaxing Miao' }, photo: 'assets/img/苗嘉兴.jpg', homepage: 'https://scholar.google.com/citations?user=LU4PAJUAAAAJ&hl=en' },
        { id: 'yiwei-shi', name: { zh: '史一苇', en: 'Yiwei Shi' }, photo: 'assets/img/史一苇.jpg' }
    ],
};;

const alumniData = {
    // 博士后校友
    postdocs: [
        { name: { zh: '陈爽', en: 'Shuang Chen' }, destination: { zh: '复旦大学 副研究员', en: 'Associate Research Fellow, Fudan University' }, homepage: 'https://scholar.google.com/citations?user=epJpBtYAAAAJ&hl=zh-CN' }
    ],

    // 博士生校友
    phd: [
        { name: { zh: '陈新驰', en: 'Xinchi Chen' }, destination: { zh: '复旦大学 青年研究员', en: 'Professor, Fudan University' }, homepage: 'https://dalstonchen.github.io/', year: '2013' },
        { name: { zh: '刘鹏飞', en: 'Pengfei Liu' }, destination: { zh: '上海交通大学 副教授', en: 'Associate Professor, Shanghai Jiao Tong University' }, homepage: 'https://plms.ai/people/index.html', year: '2014' },
        { name: { zh: '龚经经', en: 'Jingjing Gong' }, destination: { zh: '上海创智学院 研究助理教授', en: 'Research Assistant Professor, SII' }, homepage: 'https://jjgong.com', year: '2015' },
        { name: { zh: '郭琦鹏', en: 'Qipeng Guo' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: 'https://scholar.google.com/citations?user=k3mPGKgAAAAJ&hl=en', year: '2016' },
        { name: { zh: '李林阳', en: 'Linyang Li' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: 'https://www.aminer.cn/profile/56176bb745cedb3397bf2f78', year: '2019' },
        { name: { zh: '邵云帆', en: 'Yunfan Shao' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: 'https://scholar.google.com/citations?user=pw5QEtoAAAAJ&hl=zh-CN', year: '2019' },
        { name: { zh: '孙天祥', en: 'Tianxiang Sun' }, destination: { zh: '日行迹 CEO、上海创智学院 助理教授', en: 'CEO of Analemma, Assistant Professor at SII' }, homepage: 'https://txsun1997.github.io/', year: '2019' },
        { name: { zh: '颜航', en: 'Hang Yan' }, destination: { zh: '奇绩智峰', en: 'Qiji Zhifeng' }, homepage: 'https://dl.acm.org/profile/99659996992', year: '2019' },
        { name: { zh: '郑逸宁', en: 'Yining Zheng' }, destination: { zh: '复旦大学 副研究员', en: 'Associate Research Fellow, Fudan University' }, homepage: 'https://github.com/WillQvQ', year: '2019' },
        { name: { zh: '李世民', en: 'Shimin Li' }, destination: { zh: '模思智能 CEO', en: 'CEO, MOSI Intelligence' }, homepage: 'https://openreview.net/profile?id=~Shimin_Li1', year: '2020' },
        { name: { zh: '李孝男', en: 'Xiaonan Li' }, destination: { zh: '苹果（美国）', en: 'Apple, USA' }, homepage: null, year: '2020' },
        { name: { zh: '刘向阳', en: 'Xiangyang Liu' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: 'https://scholar.google.com/citations?user=U8QD9mwAAAAJ&hl=en', year: '2020' },
        { name: { zh: '罗琪', en: 'Luo Qi' }, destination: { zh: '模思智能', en: 'MOSI Intelligence' }, homepage: null, year: '2020' },
        { name: { zh: '周云华', en: 'Yunhua Zhou' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null, year: '2020' },
        { name: { zh: '程沁源', en: 'Qinyuan Cheng' }, destination: { zh: '模思智能 CTO', en: 'CTO, MOSI Intelligence' }, homepage: 'https://xiami2019.github.io/', year: '2021' },
        { name: { zh: '吕凯', en: 'Kai Lv' }, destination: { zh: ' ', en: ' ' }, homepage: 'https://kailv69.github.io/', year: '2021' },
        { name: { zh: '汪燠欣', en: 'Yuxin Wang' }, destination: { zh: '上海创智学院 研究助理教授', en: 'Research Assistant Professor, SII' }, homepage: 'https://scholar.google.co.jp/citations?user=bTo8CT0AAAAJ&hl=en', year: '2021' },
        { name: { zh: '印张悦', en: 'Zhangyue Yin' }, destination: { zh: 'UCL 博士后', en: 'Postdoc, UCL' }, homepage: null, year: '2021' }
    ],

    // 硕士生校友
    masters: [
        { name: { zh: '曹零', en: 'Ling Cao' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2011' },
        { name: { zh: '田乐', en: 'Le Tian' }, destination: { zh: '微软', en: 'Microsoft' }, homepage: null, year: '2011' },
        { name: { zh: '赵嘉亿', en: 'Jiayi Zhao' }, destination: { zh: '谷歌（美国）', en: 'Google, USA' }, homepage: null, year: '2011' },
        { name: { zh: '黄超超', en: 'Chaochao Huang' }, destination: { zh: '上汽集团', en: 'SAIC Motor' }, homepage: null, year: '2012' },
        { name: { zh: '吴世宇', en: 'Shiyu Wu' }, destination: { zh: '百度', en: 'Baidu' }, homepage: null, year: '2013' },
        { name: { zh: '徐嘉诚', en: 'Jiacheng Xu' }, destination: { zh: 'Salesforce 研究科学家', en: 'Research Scientist, Salesforce AI Research' }, homepage: 'https://jiacheng-xu.github.io/', year: '2013' },
        { name: { zh: '竺晨曦', en: 'Chenxi Zhu' }, destination: { zh: '百度', en: 'Baidu' }, homepage: null, year: '2013' },
        { name: { zh: '姜经翔', en: 'Jingxiang Jiang' }, destination: { zh: '华为', en: 'Huawei' }, homepage: null, year: '2014' },
        { name: { zh: '尹留松', en: 'Liusong Yin' }, destination: { zh: '华为', en: 'Huawei' }, homepage: null, year: '2014' },
        { name: { zh: '钱鹏', en: 'Peng Qian' }, destination: { zh: '哈佛大学 博士后', en: 'Postdoc, Harvard University' }, homepage: 'https://www.mit.edu/~pqian/', year: '2015' },
        { name: { zh: '陈俊坤', en: 'Junkun Chen' }, destination: { zh: '微软（美国）', en: 'Microsoft, USA' }, homepage: 'https://scholar.google.com/citations?user=cHLaJhUAAAAJ&hl=en', year: '2016' },
        { name: { zh: '戴宁', en: 'Ning Dai' }, destination: { zh: '俄勒冈州立大学 博士研究生', en: 'PhD Student, Oregon State University' }, homepage: 'https://ndai.ai/', year: '2016' },
        { name: { zh: '傅健', en: 'Jian Fu' }, destination: { zh: ' ', en: ' ' }, homepage: null, year: '2016' },
        { name: { zh: '施展', en: 'Zhan Shi' }, destination: { zh: 'TikTok（美国）', en: 'TikTok, USA' }, homepage: null, year: '2016' },
        { name: { zh: '蒋昊', en: 'Hao Jiang' }, destination: { zh: '国企', en: 'State-Owned Enterprise' }, homepage: null, year: '2017' },
        { name: { zh: '柯震', en: 'Zhen Ke' }, destination: { zh: '小米', en: 'Xiaomi' }, homepage: null, year: '2017' },
        { name: { zh: '孙驰', en: 'Chi Sun' }, destination: { zh: '腾讯', en: 'Tencent' }, homepage: null, year: '2017' },
        { name: { zh: '孙付', en: 'Fu Sun' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2017' },
        { name: { zh: '王少敬', en: 'Shaojing Wang' }, destination: { zh: 'TikTok', en: 'TikTok' }, homepage: null, year: '2017' },
        { name: { zh: '黄璐瑶', en: 'Luyao Huang' }, destination: { zh: '拼多多', en: 'Pinduoduo' }, homepage: null, year: '2018' },
        { name: { zh: '梁建泽', en: 'Jianze Liang' }, destination: { zh: '微软', en: 'Microsoft' }, homepage: null, year: '2018' },
        { name: { zh: '林泽辉', en: 'Zehui Lin' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2018' },
        { name: { zh: '刘枭雄', en: 'Xiaoxiong Liu' }, destination: { zh: '京东', en: 'JD.com' }, homepage: null, year: '2018' },
        { name: { zh: '王丹青', en: 'Danqing Wang' }, destination: { zh: '卡内基梅隆大学 博士研究生', en: 'PhD Student, CMU' }, homepage: null, year: '2018' },
        { name: { zh: '王阳刚', en: 'Yanggang Wang' }, destination: { zh: '上海交通大学', en: 'Shanghai Jiao Tong University' }, homepage: null, year: '2018' },
        { name: { zh: '许一格', en: 'Yige Xu' }, destination: { zh: '新加坡南洋理工大学 博士研究生', en: 'PhD Student, NTU Singapore' }, homepage: 'https://xuyige.github.io/', year: '2018' },
        { name: { zh: '钟鸣', en: 'Ming Zhong' }, destination: { zh: '伊利诺伊大学厄巴纳-香槟分校 博士研究生', en: 'PhD Student, UIUC' }, homepage: 'https://maszhongming.github.io/', year: '2018' },
        { name: { zh: '陈怡然', en: 'Yiran Chen' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: null, year: '2019' },
        { name: { zh: '籍佗', en: 'Tuo Ji' }, destination: { zh: ' ', en: ' ' }, homepage: null, year: '2019' },
        { name: { zh: '安晨鑫', en: 'Chenxin An' }, destination: { zh: '香港大学 博士研究生', en: 'PhD Student, The University of Hong Kong' }, homepage: 'https://chenxinan-fdu.github.io/', year: '2020' },
        { name: { zh: '耿志超', en: 'Zhichao Geng' }, destination: { zh: 'AWS', en: 'AWS' }, homepage: 'https://deepai.org/profile/zhichao-geng', year: '2020' },
        { name: { zh: '林天扬', en: 'Tianyang Lin' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2020' },
        { name: { zh: '刘毅韬', en: 'Yitao Liu' }, destination: { zh: 'Optiver', en: 'Optiver' }, homepage: null, year: '2020' },
        { name: { zh: '宋德敏', en: 'Demin Song' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2020' },
        { name: { zh: '杨建强', en: 'Jianqiang Yang' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2020' },
        { name: { zh: '常成', en: 'Cheng Chang' }, destination: { zh: '模思智能', en: 'MOSI Intelligence' }, homepage: 'https://scholar.google.com/citations?user=X7oyRLIAAAAJ&hl=en', year: '2021' },
        { name: { zh: '洪嘉伟', en: 'Jiawei Hong' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null, year: '2021' },
        { name: { zh: '胡先念', en: 'Xiannian Hu' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2021' },
        { name: { zh: '李鹏', en: 'Peng Li' }, destination: { zh: '上海创智学院', en: 'Shanghai Innovation Institution' }, homepage: null, year: '2021' },
        { name: { zh: '刘腾霄', en: 'Tengxiao Liu' }, destination: { zh: '加州大学圣塔芭芭拉分校 博士研究生', en: 'PhD Student, UCSB' }, homepage: 'https://tengxiaoliu.github.io/', year: '2021' },
        { name: { zh: '权国风', en: 'Guofeng Quan' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null, year: '2021' },
        { name: { zh: '孙瑜', en: 'Yu Sun' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null, year: '2021' },
        { name: { zh: '吴嘉文', en: 'Jiawen Wu' }, destination: { zh: '世纪前沿资产', en: 'Century Capital' }, homepage: null, year: '2021' },
        { name: { zh: '吴玲玲', en: 'Lingling Wu' }, destination: { zh: 'Optiver', en: 'Optiver' }, homepage: null, year: '2021' },
        { name: { zh: '杨小珪', en: 'Xiaogui Yang' }, destination: { zh: '模思智能 语音合成负责人', en: 'Head of Speech Synthesis, MOSI Intelligence' }, homepage: null, year: '2021' },
        { name: { zh: '杨雨晴', en: 'Yuqing Yang' }, destination: { zh: '南加州大学 博士研究生', en: 'PhD Student, USC' }, homepage: 'https://ayyyq.github.io/', year: '2021' },
        { name: { zh: '张啸天', en: 'Xiaotian Zhang' }, destination: { zh: '国内创业公司', en: 'Domestic Startup' }, homepage: null, year: '2021' },
        { name: { zh: '郑彦俊', en: 'Yanjun Zheng' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null, year: '2021' },
        { name: { zh: '陈科宇', en: 'Keyu Chen' }, destination: { zh: '宁波市奉化区发改局', en: 'Ningbo Fenghua Development and Reform Bureau' }, homepage: null, year: '2022' },
        { name: { zh: '陈云涛', en: 'Yuntao Chen' }, destination: { zh: '上海电网', en: 'Shanghai Electric Grid' }, homepage: null, year: '2022' },
        { name: { zh: '范子越', en: 'Ziyue Fan' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2022' },
        { name: { zh: '何俊亮', en: 'Junliang He' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2022' },
        { name: { zh: '彭润宇', en: 'Runyu Peng' }, destination: { zh: ' ', en: ' ' }, homepage: null, year: '2022' },
        { name: { zh: '任可', en: 'Ke Ren' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2022' },
        { name: { zh: '汤琼', en: 'Qiong Tang' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: null, year: '2022' },
        { name: { zh: '张栋', en: 'Dong Zhang' }, destination: { zh: '小米 MiMo', en: 'MiMo, Xiaomi' }, homepage: null, year: '2022' },
        { name: { zh: '张墨执', en: 'Mozhi Zhang' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null, year: '2022' },
        { name: { zh: '张硕', en: 'Shuo Zhang' }, destination: { zh: '奇绩智峰', en: 'Qiji Zhifeng' }, homepage: null, year: '2022' },
        { name: { zh: '张硕闻', en: 'Shuowen Zhang' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null, year: '2022' },
        { name: { zh: '张鑫', en: 'Xin Zhang' }, destination: { zh: '小米 MiMo', en: 'MiMo, Xiaomi' }, homepage: null, year: '2022' },
        { name: { zh: '朱秦', en: 'Qin Zhu' }, destination: { zh: '阿里巴巴 千问', en: 'Qwen, Alibaba' }, homepage: null, year: '2022' },
        { name: { zh: '宗一', en: 'Yi Zong' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null, year: '2022' }
    ],

    // 本科生校友
    undergrad: [
        { name: { zh: '常帅晨', en: 'Shuaichen Chang' }, destination: { zh: 'AWS 应用科学家', en: 'Applied Scientist, AWS' }, homepage: 'https://shuaichenchang.github.io/', year: '2013' },
        { name: { zh: '蒋子恒', en: 'Ziheng Jiang' }, destination: { zh: '字节跳动 首席研究科学家', en: 'Principal Research Scientist, ByteDance' }, homepage: 'https://ziheng.org/', year: '2013' },
        { name: { zh: '曹澍扬', en: 'Shuyang Cao' }, destination: { zh: '彭博 研究科学家', en: 'Research Scientist, Bloomberg' }, homepage: 'https://shuyangcao.github.io/', year: '2015' },
        { name: { zh: '苏津岳', en: 'Jinyue Su' }, destination: { zh: 'Accutar Biotechnology', en: 'Accutar Biotechnology' }, homepage: null, year: '2015' },
        { name: { zh: '胡志峰', en: 'Zhifeng Hu' }, destination: { zh: '乾象投资', en: 'Qianxiang Investment' }, homepage: 'https://ichn.xyz', year: '2016' },
        { name: { zh: '裴恒志', en: 'Hengzhi Pei' }, destination: { zh: 'AWS', en: 'AWS, USA' }, homepage: null, year: '2016' }
    ],

    // 访问学生校友
    visiting: [
        { name: { zh: '胡明昊', en: 'Minghao Hu' }, destination: { zh: '国防科技大学', en: 'National University of Defense Technology' }, homepage: null },
        { name: { zh: '阚志刚', en: 'Zhigang Kan' }, destination: { zh: '国防科技大学', en: 'National University of Defense Technology' }, homepage: null },
        { name: { zh: '王永', en: 'Yong Wang' }, destination: { zh: '香港大学', en: 'The University of Hong Kong' }, homepage: null },
        { name: { zh: '郑人杰', en: 'Renjie Zheng' }, destination: { zh: '同济大学', en: 'Tongji University' }, homepage: null }
    ]
};;

// 导出数据（保持兼容性）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { teamData, alumniData };
}
