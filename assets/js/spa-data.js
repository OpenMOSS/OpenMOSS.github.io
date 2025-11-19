(function () {
  window.SPA_DATA = {
    brand: {
      name: 'OpenMOSS Team',
      tagline: '开放、可信赖的基础模型研究'
    },
    nav: [
      { id: 'home', label: '首页' },
      { id: 'people', label: '团队成员' },
      { id: 'alumni', label: '校友网络' },
      { id: 'resources', label: '开放课程' },
      { id: 'projects', label: '开源项目' },
      { id: 'positions', label: '加入我们' },
      { id: 'webmaster', label: '网页设计' }
    ],
    hero: {
      title: '构建值得信赖的开放基础模型，服务社会',
      paragraphs: [
        'OpenMOSS 团队专注于开放、可验证与负责任人工智能研究。我们关注大规模智能系统的发展规律，致力于构建从基础理论、训练方法到系统实现的全链条研究体系。重点研究领域包括预训练模型、推理与对齐、多模态理解、具身智能与智能体协同等方向。',
        '我们的核心目标是推动人工智能的可信演化与广泛落地，使前沿研究成果真正转化为提升生产力、促进社会发展与拓展人类能力的技术基础。我们秉持开放合作与长期主义，与国际一流高校及行业龙头企业开展深度科研合作。',
        '团队成员在人工智能领域具有坚实积累，培养的毕业生任职或深造于 MIT、UC Berkeley、CMU 等世界顶尖高校，或加入 ByteDance、Alibaba、AWS、Optiver 等领先企业，或投身创新创业，或步入学术教职岗位，形成了充满活力的学术与创新生态。'
      ],
      actions: [
        { label: '最新亮点', url: 'https://www.open-moss.com/en/', variant: 'primary', external: true },
        { label: '加入我们', url: '#positions', variant: 'outline' }
      ]
    },
    pillars: [
      { title: 'AI 基础设施', desc: '优化器、微调框架和推理扩展，使开放模型更高效、稳健和易用。' },
      { title: '多模态基础模型', desc: '跨越语音、视觉和语言的统一模型，用于基础理解和推理。' },
      { title: '推理与智能体', desc: '能够规划、推理并安全地与人类和工具交互的大语言模型智能体。' },
      { title: '具身与交互式 AI', desc: '将模型与物理环境连接的视觉-语言-动作系统和模拟器。' },
      { title: '模型安全与可解释性', desc: '负责任开放模型部署的透明度、评估和治理框架。' },
      { title: '新型架构', desc: '基于扩散的 LLM、长上下文建模和内存高效的 Transformer，用于下一代系统。' }
    ],
    homePeopleCards: [
      {
        title: '学生与访问学者',
        desc: '研究生、访问学者和行业研究员共同推动大规模 AI 系统和社会应用的边界。',
        link: { label: '查看完整团队', route: 'people' }
      },
      {
        title: '校友网络',
        desc: '校友遍布 MIT、UC Berkeley、CMU、ByteDance、Alibaba、AWS、Optiver 等知名机构。',
        link: { label: '了解更多', route: 'alumni' }
      }
    ],
    resourceHighlights: [
      {
        title: '开源工具',
        desc: 'FastNLP、CoLLiE、SpeechGPT、UnifiedToolHub 等开源项目为全球 AI 生态系统提供支持。',
        links: [
          { label: '访问 GitHub', url: 'https://github.com/OpenMOSS', external: true },
          { label: '查看项目', route: 'projects' }
        ]
      },
      {
        title: '开放课程',
        desc: '为使用开放模型构建应用的学生和从业者精心策划的阅读清单、教程和基准。',
        links: [
          { label: '浏览课程', route: 'resources' }
        ]
      }
    ],
    resources: {
      intro: 'OpenMOSS 团队提供丰富的开放课程，帮助研究者和开发者探索大语言模型、多模态学习和具身智能等前沿领域。',
      cards: [
        {
          title: '模式识别与机器学习',
          desc: '复旦大学《模式识别与机器学习》课程资源，涵盖机器学习基础理论与实践。',
          url: 'https://mooc1.chaoxing.com/course/224348208.html',
          label: '查看课程 →'
        },
        {
          title: 'OpenMOSS 科研练习',
          desc: '团队推荐的科研练习，包含理论学习和动手实践的部分。',
          url: 'https://fudan-nlp.feishu.cn/wiki/WFifwXxfQiI3PKkn9FEcy0wKnjh',
          label: '查看练习 →'
        },
        {
          title: '社区与交流',
          desc: '加入暑期学校，与全球研究者交流学习，共同推进 AI 技术发展。',
          url: 'https://github.com/WillQvQ/SummerQuest-2025',
          label: '加入暑期学校 →'
        }
      ]
    },
    projects: [
      { name: 'MOSS', stars: '⭐ 12.1k', stack: 'Python', desc: '开源的工具增强对话语言模型，支持插件系统和多种工具调用能力。', url: 'https://github.com/OpenMOSS/MOSS' },
      { name: 'AnyGPT', stars: '⭐ 861', stack: 'Python', desc: '统一的多模态大语言模型，支持离散序列建模，实现真正的多模态理解与生成。', url: 'https://github.com/OpenMOSS/AnyGPT' },
      { name: 'MOSS-TTSD', stars: '⭐ 984', stack: 'Python', desc: '富有表现力的对话语音合成模型，支持中英文零样本多说话人声音克隆和长篇语音生成。', url: 'https://github.com/OpenMOSS/MOSS-TTSD' },
      { name: 'SpeechGPT-2.0', stars: '⭐ 359', stack: 'Python', desc: 'GPT-4o 级别的实时语音对话系统，实现真正的端到端语音交互。', url: 'https://github.com/OpenMOSS/SpeechGPT-2.0-preview' },
      { name: 'MOSS-Speech', stars: '⭐ 57', stack: 'Python', desc: '语音到语音大语言模型，无需文本指导，直接实现语音理解和生成。', url: 'https://github.com/OpenMOSS/MOSS-Speech' },
      { name: 'Language-Model-SAEs', stars: '⭐ 156', stack: 'Python', desc: 'OpenMOSS 机制可解释性团队的稀疏自编码器（SAE）研究项目。', url: 'https://github.com/OpenMOSS/Language-Model-SAEs' }
    ],
    positions: {
      intro: '我们正在招募对开放系统和负责任 AI 充满热情的研究人员和工程师。如果您希望在大规模 AI 系统、多模态学习、具身智能等前沿领域进行研究，欢迎加入我们！',
      cards: [
        { id: 'phd', title: '博士研究生', desc: '常年招收对 NLP、多模态学习、具身智能感兴趣的博士研究生。提供充足的研究资源和国际合作机会。' },
        { id: 'master', title: '硕士研究生', desc: '招收对大语言模型、机器学习、深度学习感兴趣的硕士研究生，参与前沿研究项目。' },
        { id: 'postdoc', title: '博士后研究员', desc: '诚邀优秀博士后加入，独立开展或合作进行前沿 AI 研究，提供有竞争力的薪酬待遇。' },
        { id: 'visiting', title: '访问学者', desc: '欢迎国内外学者访问交流，开展短期或长期合作研究，共同推进 AI 技术发展。' },
        { id: 'engineer', title: '研究工程师', desc: '招聘有经验的研究工程师，参与大规模模型训练、系统优化和开源项目开发。' },
        { id: 'intern', title: '实习生', desc: '为本科生和研究生提供实习机会，参与实际研究项目，获得宝贵的研究经验。' }
      ],
      whyUs: [
        { icon: '✨', title: '前沿研究', desc: '参与 AI 领域最前沿的研究项目，在顶级会议发表论文' },
        { icon: '🚀', title: '充足资源', desc: '提供先进的计算资源和数据集，支持大规模实验' },
        { icon: '👥', title: '优秀团队', desc: '与国内外顶尖研究者合作，获得专业指导' },
        { icon: '💡', title: '开源文化', desc: '参与开源项目开发，贡献开源社区' },
        { icon: '🌏', title: '国际合作', desc: '与国际顶尖机构开展合作研究和学术交流' },
        { icon: '📈', title: '职业发展', desc: '校友遍布顶尖大学和科技公司，提供广阔发展空间' }
      ],
      apply: '如果您对以上职位感兴趣，请填写报名问卷，我们会尽快与您联系：',
      applyUrl: 'https://fudannlp.feishu.cn/share/base/form/shrcn29UYq1MCpTH0GBZh3AWPPg',
      details: [
        {
          id: 'phd',
          title: '博士研究生',
          blocks: [
            {
              subtitle: '招收对象',
              paragraphs: [
                '我们主要招收有志于从事大模型领域科学研究和落地应用的学生，并希望有如下特点：思维活跃、积极主动、热爱研究或开发、刻苦勤奋、不怕失败。如果只是为了混学位或好找工作，请勿联系！',
                '2025年，本组主要招生方向为大模型预训练、AI Infra、新架构、多模态融合、智能体、具身智能，有兴趣学生欢迎联系。'
              ]
            },
            {
              subtitle: '重要事项',
              paragraphs: [
                '除项目合作推荐实习外，本组不允许学生在研三、博五之前进行任何形式的实习。',
                '本组研究生都会根据需要安排一定的工程任务。如果不愿意参与工程项目的，也不要选择本组。'
              ]
            },
            {
              subtitle: '招生说明',
              paragraphs: [
                '（1）硕士名额：视研究经费而定，近三年内每年学硕1名、保研专硕1-2名、考研专硕约10名。日常科研中我们不区分学硕和专硕，并且都有资格转博。',
                '（2）博士名额：视研究经费而定，近三年内每年博士名额2-3名。本人在上海创智学院招直博生，和复旦联培，名额不限。建议先拿到上海创智学院 offer 再报名复旦夏令营。',
                '（3）招生途径：夏令营、秋季保研、考研面试均需通过学院初审后联系，我们会安排组内面试。',
                '（4）本组面试：重视科研潜质、工程能力和团队协作。高质量完成 nlp-beginner 的学生优先。',
                '（5）提前进组：希望确定来本组的同学提前进组学习，表现优秀可推荐字节、华为等合作单位实习。',
                '（6）研究生待遇：在学校补贴基础上提供有竞争力的补助，并对专硕给予一定租房补贴。'
              ]
            }
          ]
        },
        {
          id: 'master',
          title: '硕士研究生',
          blocks: [
            {
              subtitle: '说明',
              paragraphs: ['硕士研究生的招生要求与说明请参考上方“博士研究生”部分。']
            }
          ]
        },
        {
          id: 'postdoc',
          title: '博士后研究员',
          blocks: [
            {
              subtitle: '研究方向',
              paragraphs: ['AI Infra', '大语言模型预训练', '多模态大模型', '语音大模型', '具身智能']
            },
            {
              subtitle: '申请人要求',
              paragraphs: [
                '博士期间专业方向为计算机、软件、电子、自动化、数学等相关方向。',
                '具备国内外优秀大学博士学位，毕业不超过 3 年。',
                '年龄在 35 周岁以下。',
                '在人工智能领域发表高水平文章或主持/参与实际项目者优先。',
                '思维活跃、创新能力强，对研发充满热情，责任心强。'
              ]
            },
            {
              subtitle: '工资待遇',
              paragraphs: [
                '按照复旦大学对博士后的相关规定提供待遇，享受公寓与福利，可申请国家“博新计划”“引进计划”及上海、市级超级博士后项目。',
                '课题组根据个人研究进展给予额外补贴，并提供优越科研条件。'
              ]
            },
            {
              subtitle: '申请方式',
              paragraphs: [
                '申请邮件发送至 llm@fudan.edu.cn，主题注明“应聘博士后 - 姓名 - 专业 - 学校”。',
                '邮件附个人简历并说明感兴趣的研究方向，初审后我们将与您联系。'
              ]
            }
          ]
        },
        {
          id: 'visiting',
          title: '访问学者',
          blocks: [
            { subtitle: '说明', paragraphs: ['访问学者详细内容持续更新中，如有兴趣请邮件咨询。'] }
          ]
        },
        {
          id: 'engineer',
          title: '研究工程师',
          blocks: [
            {
              subtitle: '关于岗位',
              paragraphs: ['复旦大学自然语言实验室因科研工作需要，长期招聘科研工程助理，待遇面议。']
            },
            {
              subtitle: '招聘说明',
              paragraphs: [
                '参与实验室的 LLM 工程开发项目。',
                '具备良好的工程经验，熟练掌握 Python，熟悉 PyTorch 并有 NLP 项目经验者优先。',
                '具有专研精神，工作踏实认真。'
              ]
            },
            {
              subtitle: '申请方式',
              paragraphs: [
                '申请邮件发送至 llm@fudan.edu.cn，主题注明“应聘科研工程助理 - 姓名”。',
                '邮件中附简历，初审后我们将与您联系。'
              ]
            }
          ]
        },
        {
          id: 'intern',
          title: '实习生',
          blocks: [
            { subtitle: '职位介绍', paragraphs: ['实习生岗位内容将于近期补充，欢迎提前投递意向。'] }
          ]
        }
      ]
    },
    webmaster: {
      intro: '了解维护 OpenMOSS 官网体验的设计与前端志愿者，保持界面一致性与可访问性。',
      members: [
        { name: '郑逸宁', role: '网页设计师' },
        { name: '贺心嘉', role: '网页设计师' }
      ]
    },
    footer: {
      contactLinks: [
        { label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/OpenMOSS' },
        { label: 'Twitter', icon: 'fa-brands fa-x-twitter', url: 'https://x.com/Open_MOSS' },
        { label: 'Email', icon: 'fa-solid fa-envelope', url: 'mailto:llm@fudan.edu.cn' }
      ],
      addresses: [
        '杨浦区淞沪路2005号 复旦大学 二号交叉学科楼',
        '徐汇区华发路699弄3号 上海创智学院',
        '中国 上海'
      ],
      partners: [
        { label: '复旦大学计算与智能创新学院', url: 'https://ai.fudan.edu.cn/' },
        { label: '复旦大学可信具身智能研究院', url: 'https://teai.fudan.edu.cn/' },
        { label: '上海创智学院', url: 'https://www.sii.edu.cn/' }
      ]
    }
  };
})();
