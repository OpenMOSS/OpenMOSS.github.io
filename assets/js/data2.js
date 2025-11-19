// OpenMOSS Lab 校友数据
// 所有校友信息集中管理，方便维护和更新

const alumniData = {
    // 博士后校友
    postdocs: [
        { name: { zh: '陈爽', en: 'Shuang Chen' }, destination: { zh: '复旦大学专任副研究员', en: 'Associate Research Fellow, Fudan University' }, homepage: 'https://scholar.google.com/citations?user=epJpBtYAAAAJ&hl=zh-CN' }
    ],

    // 博士生校友
    phd: [
        { name: { zh: '陈新驰', en: 'Xinchi Chen' }, destination: { zh: '复旦大学青年研究员', en: 'Professor, Fudan University' }, homepage: 'https://ichn.xyz' },
        { name: { zh: '龚经经', en: 'Jingjing Gong' }, destination: { zh: '上海创智学院研究助理教授', en: 'Research Assistant Professor, SII' }, homepage: 'https://jjgong.com' },
        { name: { zh: '郭琦鹏', en: 'Qipeng Guo' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: 'https://scholar.google.com/citations?user=k3mPGKgAAAAJ&hl=en' },
        { name: { zh: '李林阳', en: 'Linyang Li' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: 'https://www.aminer.cn/profile/56176bb745cedb3397bf2f78' },
        { name: { zh: '李孝男', en: 'Xiaonan Li' }, destination: { zh: '海外创业公司', en: 'Overseas Startup' }, homepage: null },
        { name: { zh: '李世民', en: 'Shimin Li' }, destination: { zh: '模思智能 CEO', en: 'CEO, MOSI AI' }, homepage: 'https://openreview.net/profile?id=~Shimin_Li1' },
        { name: { zh: '刘鹏飞', en: 'Pengfei Liu' }, destination: { zh: '上海交通大学副教授', en: 'Associate Professor, Shanghai Jiao Tong University' }, homepage: 'https://plms.ai/people/index.html' },
        { name: { zh: '刘向阳', en: 'Xiangyang Liu' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: 'https://scholar.google.com/citations?user=U8QD9mwAAAAJ&hl=en' },
        { name: { zh: '孙天祥', en: 'Tianxiang Sun' }, destination: { zh: '日行迹 CEO、上海创智学院助理教授', en: 'CEO of Analemma, Assistant Professor at SII' }, homepage: 'https://txsun1997.github.io/' },
        { name: { zh: '颜航', en: 'Hang Yan' }, destination: { zh: '国内创业公司', en: 'Domestic Startup' }, homepage: 'https://dl.acm.org/profile/99659996992' },
        { name: { zh: '郑逸宁', en: 'Yining Zheng' }, destination: { zh: '复旦大学专任副研究员', en: 'Associate Research Fellow, Fudan University' }, homepage: 'https://github.com/WillQvQ' },
        { name: { zh: '周云华', en: 'Yunhua Zhou' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null }
    ],

    // 硕士生校友
    masters: [
        { name: { zh: '安晨鑫', en: 'Chenxin An' }, destination: { zh: '香港大学博士研究生', en: 'PhD Student, The University of Hong Kong' }, homepage: 'https://chenxinan-fdu.github.io/' },
        { name: { zh: '曹零', en: 'Ling Cao' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '常成', en: 'Cheng Chang' }, destination: { zh: '模思智能', en: 'MOSI AI' }, homepage: 'https://scholar.google.com/citations?user=X7oyRLIAAAAJ&hl=en' },
        { name: { zh: '陈科宇', en: 'Keyu Chen' }, destination: { zh: '宁波市奉化区发改局', en: 'Ningbo Fenghua Development and Reform Bureau' }, homepage: null },
        { name: { zh: '陈俊坤', en: 'Junkun Chen' }, destination: { zh: '微软', en: 'Microsoft' }, homepage: 'https://scholar.google.com/citations?user=cHLaJhUAAAAJ&hl=en' },
        { name: { zh: '陈怡然', en: 'Yiran Chen' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: null },
        { name: { zh: '陈云涛', en: 'Yuntao Chen' }, destination: { zh: '上海电网', en: 'Shanghai Electric Grid' }, homepage: null },
        { name: { zh: '戴宁', en: 'Ning Dai' }, destination: { zh: '俄勒冈州立大学博士研究生', en: 'PhD Student, Oregon State University' }, homepage: 'https://ndai.ai/' },
        { name: { zh: '范子越', en: 'Ziyue Fan' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '傅健', en: 'Jian Fu' }, destination: { zh: '', en: '' }, homepage: null },
        { name: { zh: '耿志超', en: 'Zhichao Geng' }, destination: { zh: 'AWS', en: 'AWS' }, homepage: 'https://deepai.org/profile/zhichao-geng' },
        { name: { zh: '何俊亮', en: 'Junliang He' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '洪嘉伟', en: 'Jiawei Hong' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null },
        { name: { zh: '胡先念', en: 'Xiannian Hu' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '黄超超', en: 'Chaochao Huang' }, destination: { zh: '上汽集团', en: 'SAIC Motor' }, homepage: null },
        { name: { zh: '黄璐瑶', en: 'Luyao Huang' }, destination: { zh: '拼多多', en: 'Pinduoduo' }, homepage: null },
        { name: { zh: '籍佗', en: 'Tuo Ji' }, destination: { zh: '', en: '' }, homepage: null },
        { name: { zh: '姜经翔', en: 'Jingxiang Jiang' }, destination: { zh: '华为', en: 'Huawei' }, homepage: null },
        { name: { zh: '蒋昊', en: 'Hao Jiang' }, destination: { zh: '', en: '' }, homepage: null },
        { name: { zh: '蒋子恒', en: 'Ziheng Jiang' }, destination: { zh: '字节跳动首席研究科学家', en: 'Principal Research Scientist, ByteDance' }, homepage: 'https://ziheng.org/' },
        { name: { zh: '柯震', en: 'Zhen Ke' }, destination: { zh: '小米', en: 'Xiaomi' }, homepage: null },
        { name: { zh: '李鹏', en: 'Peng Li' }, destination: { zh: '', en: '' }, homepage: null },
        { name: { zh: '梁建泽', en: 'Jianze Liang' }, destination: { zh: '微软', en: 'Microsoft' }, homepage: null },
        { name: { zh: '林泽辉', en: 'Zehui Lin' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '林天扬', en: 'Tianyang Lin' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '刘腾霄', en: 'Tengxiao Liu' }, destination: { zh: '加州大学圣塔芭芭拉分校博士研究生', en: 'PhD Student, UCSB' }, homepage: 'https://tengxiaoliu.github.io/' },
        { name: { zh: '刘毅韬', en: 'Yitao Liu' }, destination: { zh: 'Optiver', en: 'Optiver' }, homepage: null },
        { name: { zh: '刘枭雄', en: 'Xiaoxiong Liu' }, destination: { zh: '京东', en: 'JD.com' }, homepage: null },
        { name: { zh: '钱鹏', en: 'Peng Qian' }, destination: { zh: '哈佛大学博士后', en: 'Postdoc, Harvard University' }, homepage: 'https://www.mit.edu/~pqian/' },
        { name: { zh: '权国风', en: 'Guofeng Quan' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '任可', en: 'Ke Ren' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '施展', en: 'Zhan Shi' }, destination: { zh: '皇后大学博士研究生', en: 'PhD Student, Queen University' }, homepage: null },
        { name: { zh: '宋德敏', en: 'Demin Song' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '孙付', en: 'Fu Sun' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '孙驰', en: 'Chi Sun' }, destination: { zh: '腾讯', en: 'Tencent' }, homepage: null },
        { name: { zh: '孙瑜', en: 'Yu Sun' }, destination: { zh: '上海人工智能实验室', en: 'Shanghai AI Laboratory' }, homepage: null },
        { name: { zh: '汤琼', en: 'Qiong Tang' }, destination: { zh: '日行迹', en: 'Analemma' }, homepage: null },
        { name: { zh: '田乐', en: 'Le Tian' }, destination: { zh: '微软', en: 'Microsoft' }, homepage: null },
        { name: { zh: '王丹青', en: 'Danqing Wang' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '王少敬', en: 'Shaojing Wang' }, destination: { zh: '拼多多', en: 'Pinduoduo' }, homepage: null },
        { name: { zh: '王阳刚', en: 'Yanggang Wang' }, destination: { zh: '循环智能', en: 'Recurrent AI' }, homepage: null },
        { name: { zh: '吴嘉文', en: 'Jiawen Wu' }, destination: { zh: '世纪前沿资产', en: 'Century Capital' }, homepage: null },
        { name: { zh: '吴玲玲', en: 'Lingling Wu' }, destination: { zh: 'Optiver', en: 'Optiver' }, homepage: null },
        { name: { zh: '吴世宇', en: 'Shiyu Wu' }, destination: { zh: '百度', en: 'Baidu' }, homepage: null },
        { name: { zh: '徐嘉诚', en: 'Jiacheng Xu' }, destination: { zh: 'Salesforce 研究科学家', en: 'Research Scientist, Salesforce AI Research' }, homepage: 'https://jiacheng-xu.github.io/' },
        { name: { zh: '许一格', en: 'Yige Xu' }, destination: { zh: '新加坡南洋理工大学博士研究生', en: 'PhD Student, NTU Singapore' }, homepage: 'https://xuyige.github.io/' },
        { name: { zh: '杨建强', en: 'Jianqiang Yang' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '杨小珪', en: 'Xiaogui Yang' }, destination: { zh: '模思智能', en: 'MOSI AI' }, homepage: null },
        { name: { zh: '杨雨晴', en: 'Yuqing Yang' }, destination: { zh: '南加州大学博士研究生', en: 'PhD Student, USC' }, homepage: 'https://ayyyq.github.io/' },
        { name: { zh: '尹留松', en: 'Liusong Yin' }, destination: { zh: '华为', en: 'Huawei' }, homepage: null },
        { name: { zh: '张栋', en: 'Dong Zhang' }, destination: { zh: '小米', en: 'Xiaomi' }, homepage: null },
        { name: { zh: '张墨执', en: 'Mozhi Zhang' }, destination: { zh: '字节跳动', en: 'ByteDance' }, homepage: null },
        { name: { zh: '张硕', en: 'Shuo Zhang' }, destination: { zh: '国内创业公司', en: 'Domestic Startup' }, homepage: null },
        { name: { zh: '张硕闻', en: 'Shuowen Zhang' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null },
        { name: { zh: '张啸天', en: 'Xiaotian Zhang' }, destination: { zh: '国内创业公司', en: 'Domestic Startup' }, homepage: null },
        { name: { zh: '张鑫', en: 'Xin Zhang' }, destination: { zh: '小米', en: 'Xiaomi' }, homepage: null },
        { name: { zh: '赵嘉亿', en: 'Jiayi Zhao' }, destination: { zh: '谷歌', en: 'Google' }, homepage: null },
        { name: { zh: '郑彦俊', en: 'Yanjun Zheng' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null },
        { name: { zh: '钟鸣', en: 'Ming Zhong' }, destination: { zh: '伊利诺伊大学厄巴纳-香槟分校博士研究生', en: 'PhD Student, UIUC' }, homepage: 'https://maszhongming.github.io/' },
        { name: { zh: '朱秦', en: 'Qin Zhu' }, destination: { zh: '阿里巴巴', en: 'Alibaba' }, homepage: null },
        { name: { zh: '竺晨曦', en: 'Chenxi Zhu' }, destination: { zh: '百度', en: 'Baidu' }, homepage: null },
        { name: { zh: '宗一', en: 'Yi Zong' }, destination: { zh: '蚂蚁集团', en: 'Ant Group' }, homepage: null }
    ],

    // 本科生校友
    undergrad: [
        { name: { zh: '曹澍扬', en: 'Shuyang Cao' }, destination: { zh: '彭博研究科学家', en: 'Research Scientist, Bloomberg' }, homepage: 'https://shuyangcao.github.io/' },
        { name: { zh: '常帅晨', en: 'Shuaichen Chang' }, destination: { zh: 'AWS 应用科学家', en: 'Applied Scientist, AWS' }, homepage: 'https://shuaichenchang.github.io/' },
        { name: { zh: '戴宁', en: 'Ning Dai' }, destination: { zh: '俄勒冈州立大学博士研究生', en: 'PhD Student, Oregon State University' }, homepage: 'https://ndai.ai/' },
        { name: { zh: '裴恒志', en: 'Hengzhi Pei' }, destination: { zh: 'AWS', en: 'AWS, USA' }, homepage: null },
        { name: { zh: '苏津岳', en: 'Jinyue Su' }, destination: { zh: 'Accutar Biotechnology', en: 'Accutar Biotechnology' }, homepage: null }
    ],

    // 访问学生校友
    visiting: [
        { name: { zh: '胡明昊', en: 'Minghao Hu' }, destination: { zh: '国防科技大学', en: 'National University of Defense Technology' }, homepage: null },
        { name: { zh: '阚志刚', en: 'Zhigang Kan' }, destination: { zh: '国防科技大学', en: 'National University of Defense Technology' }, homepage: null },
        { name: { zh: '王永', en: 'Yong Wang' }, destination: { zh: '香港大学', en: 'The University of Hong Kong' }, homepage: null },
        { name: { zh: '郑人杰', en: 'Renjie Zheng' }, destination: { zh: '同济大学', en: 'Tongji University' }, homepage: null }
    ]
};

// 导出数据（用于其他JS文件访问）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { alumniData };
}