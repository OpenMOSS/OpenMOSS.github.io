(function () {
  window.SPA_DATA = {
    brand: {
      name: 'OpenMOSS',
      tagline: '追求极致的开放 AI 研究'
    },
    highlights: [
      {
        title: { zh: 'Thinking with Video：用视频生成做多模态推理', en: 'Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm' },
        desc: { zh: '提出“用视频思考”范式：让 Sora-2 等视频生成模型以视频帧为统一媒介进行多模态推理，弥补文字/图像难以刻画动态过程的不足。', en: 'A “Thinking with Video” paradigm where video-generation models like Sora-2 reason over generated video frames as a unified medium for dynamic multimodal reasoning.' },
        date: '2026.6',
        image: 'assets/img/highlights/thinking-with-video.webp',
        url: '/blog/cn/thinking-with-video/'
      },
      {
        title: { zh: 'MOSS-TTS 技术报告', en: 'MOSS-TTS Technical Report' },
        desc: { zh: '可扩展的语音生成基座模型，支持零样本音色克隆、时长与发音控制、流畅中英混说与长语音生成。', en: 'A scalable speech-generation foundation model supporting zero-shot voice cloning, duration and pronunciation control, smooth code-switching, and stable long-form generation.' },
        date: '2026.3',
        image: 'assets/img/highlights/moss-tts.webp',
        url: '/blog/cn/moss-tts/'
      },
      {
        title: { zh: 'AI 也能学会“科学品味”', en: 'AI Can Learn Scientific Taste' },
        desc: { zh: '提出“社区反馈强化学习”(RLCF)：用大规模引用信号训练 Scientific Judge，并对齐 Scientific Thinker 提出高影响力研究构想。', en: 'Introduces Reinforcement Learning from Community Feedback (RLCF), training a Scientific Judge and Scientific Thinker from large-scale scientific community signals.' },
        date: '2026.3',
        image: 'assets/img/highlights/scientific-taste.webp',
        url: '/blog/cn/scientific-taste/'
      },
      {
        title: { zh: 'MOVA：可扩展的同步视频-音频生成', en: 'MOVA: Towards Scalable and Synchronized Video-Audio Generation' },
        desc: { zh: '开源视频-音频联合生成模型，可同步生成高质量画面与声音，覆盖唇形同步语音、环境音效与内容匹配的音乐。', en: 'An open-source joint video-audio generation model producing high-quality, synchronized visuals and audio, including lip-synced speech, environmental sound effects, and content-aligned music.' },
        date: '2026.2',
        image: 'assets/img/highlights/mova.webp',
        url: '/blog/cn/mova/'
      },
      {
        title: { zh: 'MOSS-Speech: 真语音到语音生成', en: 'MOSS-Speech: True Speech-to-Speech Generation' },
        desc: { zh: '原生端到端语音交互，无需任何中间文本引导', en: 'Native end-to-end speech interaction without any intermediate text guidance' },
        date: '2025.10.1',
        url: 'https://arxiv.org/abs/2510.00499'
      },
      {
        title: { zh: 'XY-Tokenizer: 低码率声学语义统一编码', en: 'XY-Tokenizer: Low-Bitrate Unified Acoustic-Semantic Encoding' },
        desc: { zh: '1kbps最强声学语义统一编码及离散化工具', en: 'State-of-the-art 1kbps unified acoustic-semantic encoding and discretization tool' },
        date: '2025.6.28',
        url: 'https://arxiv.org/abs/2506.23325'
      },
      {
        title: { zh: 'MOSS-TTSD: 文本到对话语音生成', en: 'MOSS-TTSD: Text-to-Spoken Dialogue Generation' },
        desc: { zh: '开源对话语音生成模型，高表现力，多说话人，超长语音生成', en: 'Open-source dialogue speech generation model with high expressiveness, multi-speaker, and long-form speech generation' },
        date: '2025.6.20',
        url: 'https://www.open-moss.com/en/moss-ttsd/'
      }
    ],
    courses: [
      { titleKey: 'resources.course.prml', descKey: 'resources.course.prml.desc', url: 'https://mooc1.chaoxing.com/course/224348208.html', labelKey: 'resources.btn.course' },
      { titleKey: 'resources.course.exercises', descKey: 'resources.course.exercises.desc', url: 'https://fudan-nlp.feishu.cn/wiki/WFifwXxfQiI3PKkn9FEcy0wKnjh', labelKey: 'resources.btn.exercise' },
      { titleKey: 'resources.course.community', descKey: 'resources.course.community.desc', url: 'https://github.com/WillQvQ/SummerQuest-2025', labelKey: 'resources.btn.summer' }
    ],
    // 开源项目系列（按 GitHub 组织分组）。star 数由 assets/js/gh-stars-data.js
    // 提供（scripts/fetch_stars.py 生成，CI 每日刷新），spa.js 在「开放资源」页水合。
    //   org      — GitHub 组织名，JS 据此列出组织下公开仓库
    //   featured — 精选并定序的子仓库白名单（大小写不敏感；缺失则自动跳过）
    //   feature  — 渲染为横跨整行的特色大卡
    // featured 与 scripts/fetch_stars.py 的 ORGS 需保持同步。
    projectSeries: [
      {
        name: 'MOSS', url: 'https://github.com/OpenMOSS', org: 'OpenMOSS',
        feature: true,
        featured: ['MOSS', 'MOSS-VL', 'MOSS-Audio', 'MOSS-Transcribe-Diarize', 'MOSS-TTS-Nano', 'MOSS-TTS', 'MOSS-TTSD', 'MOVA'],
        badgeKey: 'series.moss.badge', descKey: 'series.moss.desc'
      },
      {
        name: 'NNDL', url: 'https://github.com/nndl', org: 'nndl',
        featured: ['nndl', 'llm-beginner', 'nndl-practice'],
        badgeKey: 'series.nndl.badge', descKey: 'series.nndl.desc'
      },
      {
        name: 'FudanNLP', url: 'https://github.com/FudanNLP', org: 'FudanNLP',
        featured: ['fastNLP', 'fnlp', 'fitlog'],
        badgeKey: 'series.fudannlp.badge', descKey: 'series.fudannlp.desc'
      },
      {
        name: 'NEX', url: 'https://github.com/nex-agi', org: 'nex-agi',
        featured: ['Nex-N2', 'Nex-N1', 'NexRL', 'NexAU'],
        badgeKey: 'series.nex.badge', descKey: 'series.nex.desc'
      }
    ],
    blogPosts: [
      {
        slug: 'moss-ttsd', date: '2025.6', topicKey: 'blog.topic.speech', cn: true, image: 'assets/img/blog-thumbs/moss-ttsd.jpg',
        title: { zh: 'MOSS-TTSD：文本到口语对话生成', en: 'MOSS-TTSD: Text to Spoken Dialogue Generation' },
        desc: { zh: '中英双语高表现力对话语音生成，支持零样本多说话人音色克隆。', en: 'Expressive Chinese–English dialogue speech synthesis with zero-shot multi-speaker voice cloning.' }
      },
      {
        slug: 'speechgpt2-preview', date: '2025.1', topicKey: 'blog.topic.speech', cn: true, image: 'assets/img/blog-thumbs/speechgpt2-preview.jpg',
        title: { zh: 'SpeechGPT 2.0-preview', en: 'SpeechGPT 2.0-preview' },
        desc: { zh: '迈向情景智能的拟人化端到端实时语音交互系统。', en: 'A human-like, end-to-end real-time spoken dialogue system toward situational intelligence.' }
      },
      {
        slug: 'data-mixing-laws', date: '2024.4', topicKey: 'blog.topic.pretrain', cn: true, image: 'assets/img/blog-thumbs/data-mixing-laws.jpg',
        title: { zh: '数据混合定律：通过预测语言模型表现优化数据配比', en: 'Data Mixing Laws: Optimizing Data Mixture by Predicting LM Performance' },
        desc: { zh: '定量预测数据配比对语言模型表现的影响，指导预训练数据混合。', en: 'Quantitatively predict how data-mixture proportions affect language-modeling performance to optimize pre-training.' }
      },
      {
        slug: 'language-model-SAEs', date: '2024.4', topicKey: 'blog.topic.interp', cn: false, image: 'assets/img/blog-thumbs/language-model-SAEs.jpg',
        title: { zh: '语言模型上的稀疏字典学习：基础设施、观察与展望', en: 'Sparse Dictionary Learning on Language Models: Infrastructure, Observations and Agenda' },
        desc: { zh: '用于训练、评测与可视化语言模型稀疏自编码器（SAE）的基础设施与可解释特征。', en: 'An infrastructure for training, evaluating, and visualizing sparse autoencoders on language models.' }
      },
      {
        slug: 'anygpt', date: '2024.3', topicKey: 'blog.topic.multimodal', cn: true, image: 'assets/img/blog-thumbs/anygpt.jpg',
        title: { zh: 'AnyGPT：基于离散序列建模的统一多模态大模型', en: 'AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling' },
        desc: { zh: '以离散序列建模统一文本、语音、图像、音乐四种模态。', en: 'A multimodal LLM unifying text, speech, image, and music via discrete sequence modeling.' }
      },
      {
        slug: 'evolutionary-agent', date: '2024.2', topicKeys: ['blog.topic.agent', 'blog.topic.align'], cn: true, image: '/blog/en/evolutionary-agent/diagrams/evolutionary_agent.svg',
        title: { zh: '动态环境下的智能体演化式对齐', en: 'Evolutionary Agent in Evolving Social Norms' },
        desc: { zh: '在不断演化的社会准则下，对齐良好的智能体群体得以存续繁衍。', en: 'In evolving social norms, well-aligned agent groups thrive and propagate while misaligned ones fade.' }
      },
      {
        slug: 'knowledge-boundary', date: '2024.1', topicKey: 'blog.topic.align', cn: true, image: 'assets/img/blog-thumbs/knowledge-boundary.jpg',
        title: { zh: 'AI 助手能否知道自己不知道？', en: "Can AI Assistants Know What They Don't Know?" },
        desc: { zh: '通过对齐让 AI 助手意识到并如实表达自己不知道的内容。', en: "Aligning LLM-based assistants to recognize and honestly express what they don't know." }
      },
      {
        slug: 'DictCircuits_Othello', date: '2023.3', topicKey: 'blog.topic.interp', cn: true, image: 'assets/img/blog-thumbs/DictCircuits_Othello.jpg',
        title: { zh: '寻找符号间的连接：基于稀疏字典学习的回路发现', en: 'Dictionary Learning Improves Patch-Free Circuit Discovery in Mechanistic Interpretability' },
        desc: { zh: '用稀疏字典学习在小型 Transformer 中发现可理解的内部回路。', en: 'Using dictionary learning to uncover human-understandable circuits inside a small transformer.' }
      }
    ],
    positionCards: [
      { id: 'graduate', titleKey: 'positions.card.phd', descKey: 'positions.card.phd.desc' },
      { id: 'graduate', titleKey: 'positions.card.master', descKey: 'positions.card.master.desc' },
      { id: 'intern', titleKey: 'positions.card.intern', descKey: 'positions.card.intern.desc' },
      { id: 'postdoc', titleKey: 'positions.card.postdoc', descKey: 'positions.card.postdoc.desc' },
      { id: 'engineer', titleKey: 'positions.card.engineer', descKey: 'positions.card.engineer.desc' },
      { id: 'visiting', titleKey: 'positions.card.visiting', descKey: 'positions.card.visiting.desc' }
    ],
    whyUs: [
      { icon: 'microscope', titleKey: 'positions.why.research', descKey: 'positions.why.research.desc' },
      { icon: 'cpu', titleKey: 'positions.why.resources', descKey: 'positions.why.resources.desc' },
      { icon: 'users', titleKey: 'positions.why.team', descKey: 'positions.why.team.desc' },
      { icon: 'git-branch', titleKey: 'positions.why.opensource', descKey: 'positions.why.opensource.desc' },
      { icon: 'globe', titleKey: 'positions.why.collaboration', descKey: 'positions.why.collaboration.desc' },
      { icon: 'graduation-cap', titleKey: 'positions.why.career', descKey: 'positions.why.career.desc' }
    ],
    positions: {
      // 职位详情（双语支持）
      details: [
        {
          id: 'graduate',
          title: { zh: '博士/硕士研究生', en: 'PhD/Master\'s Students' },
          blocks: [
            {
              subtitle: { zh: '招生说明', en: 'Admission Information' },
              paragraphs: {
                zh: [
                  '（1）硕士名额：视研究经费而定，近三年内每年学硕 2 名、保研专硕 2-3 名、考研专硕约 10 名。日常科研中我们不区分学硕和专硕，并且都有资格转博。',
                  '（2）博士名额：视研究经费而定，近三年内每年博士名额 2-3 名。本人在上海创智学院招直博生，和复旦联培，名额不限；除通过复旦面试外，还需通过上海创智学院的招生考试。建议先拿到上海创智学院 offer 再报名复旦夏令营。',
                  '（3）招生途径：夏令营、秋季保研、考研均需先通过学院初审；收到入营 / 面试 / 复试通知后联系我，我们会安排一次组内面试。以往夏令营学硕优秀率约 10%，本组学硕 + 专硕名额 2-3 名；通常夏令营招满后，秋季保研不再招生。',
                  '（4）本组面试：通常在学院面试前安排一次组内面试，主要看重科研潜质、工程能力、个性以及团队协作等多重因素。高质量完成 <a href="https://github.com/nndl/llm-beginner" target="_blank" style="color: var(--fudan-blue); text-decoration: underline;">llm-beginner</a> 的学生优先。我们非常欢迎对 AI 算法落地、系统实现感兴趣并有专研精神的同学。',
                  '（5）提前进组：研一课程较多、研二结束后即去实习，剩余时间较短，因此希望确定来本组的同学提前进组学习；外校保研最好来复旦大学做毕业设计。根据表现，本组会择优推荐研二或研三学生到字节、华为、上海人工智能实验室、美团等合作单位实习。',
                  '（6）研究生待遇：参考同水平科研单位平均水平，在学校补贴之外提供较有竞争力的研究生补助；对专硕有一定的租房补贴，参与企业合作项目的学生还有额外科研补助。'
                ],
                en: [
                  '(1) Master\'s positions: Subject to research funding, in recent years approximately 2 academic masters, 2-3 professional masters (by recommendation), and ~10 professional masters (by entrance exam) per year. In research we do not distinguish between academic and professional masters, and all are eligible for PhD conversion.',
                  '(2) PhD positions: Subject to research funding, 2-3 positions per year in recent years. The advisor admits direct-PhD students at Shanghai Innovation Institute (SII), jointly trained with Fudan, with no limit on positions; besides passing the Fudan interview, applicants must also pass SII\'s admission exam. We recommend securing an SII offer before applying to Fudan\'s summer camp.',
                  '(3) Admission channels: The summer camp, autumn recommendation, and entrance-exam tracks all require passing the school\'s preliminary review first; contact me after receiving the camp / interview / re-exam notification, and we will arrange a group interview. The summer-camp distinction rate for academic masters has been around 10%, with 2-3 academic + professional master slots in our group; we usually do not recruit in the autumn round once the summer camp is full.',
                  '(4) Group interview: We usually hold a group interview before the school interview, focusing on research potential, engineering ability, personality, and teamwork. Students who complete <a href="https://github.com/nndl/llm-beginner" target="_blank" style="color: var(--fudan-blue); text-decoration: underline;">llm-beginner</a> with high quality are prioritized. We warmly welcome students with a dedicated, deep-diving spirit who are interested in deploying AI algorithms and building systems.',
                  '(5) Early joining: The first master\'s year is course-heavy and students leave for internships after the second year, so the remaining time is short; we therefore encourage students set on joining to start early, and students recommended from other schools are best to do their thesis project at Fudan. Based on performance, we selectively recommend second- or third-year students for internships at partner organizations such as ByteDance, Huawei, Shanghai AI Lab, and Meituan.',
                  '(6) Graduate benefits: Benchmarked against peer research institutions, we provide competitive graduate stipends on top of university subsidies; professional masters receive a housing allowance, and students on industry-collaboration projects receive additional research stipends.'
                ]
              }
            }
          ]
        },
        {
          id: 'intern',
          title: { zh: '实习生', en: 'Interns' },
          blocks: [
            {
              subtitle: { zh: '职位介绍', en: 'Position Description' },
              paragraphs: {
                zh: ['请通过邮件（llm@fudan.edu.cn）进行投递，对于非本地学生有 2000/月的住房补贴。'],
                en: ['Please apply via email (llm@fudan.edu.cn). Non-local students receive a housing allowance of 2000 CNY/month.']
              }
            }
          ]
        },
        {
          id: 'postdoc',
          title: { zh: '博士后研究员', en: 'Postdoctoral Researchers' },
          blocks: [
            {
              subtitle: { zh: '研究方向', en: 'Research Areas' },
              paragraphs: {
                zh: ['AI Infra', '大语言模型预训练', '多模态大模型', '语音大模型', '具身智能'],
                en: ['AI Infrastructure', 'LLM Pre-training', 'Multimodal Models', 'Speech Models', 'Embodied Intelligence']
              }
            },
            {
              subtitle: { zh: '申请人要求', en: 'Requirements' },
              paragraphs: {
                zh: [
                  '博士期间专业方向为计算机、软件、电子、自动化、数学等相关方向。',
                  '具备国内外优秀大学博士学位，毕业不超过 3 年。',
                  '年龄在 35 周岁以下。',
                  '在人工智能领域发表高水平文章或主持/参与实际项目者优先。',
                  '思维活跃、创新能力强，对研发充满热情，责任心强。'
                ],
                en: [
                  'PhD in Computer Science, Software Engineering, Electronics, Automation, Mathematics, or related fields.',
                  'PhD degree from a reputable university, graduated within 3 years.',
                  'Under 35 years of age.',
                  'Preference for candidates with high-quality publications in AI or experience leading/participating in real projects.',
                  'Active thinking, strong innovation capability, passionate about R&D, and highly responsible.'
                ]
              }
            },
            {
              subtitle: { zh: '工资待遇', en: 'Compensation' },
              paragraphs: {
                zh: [
                  '按照复旦大学对博士后的相关规定提供待遇，享受公寓与福利，可申请国家"博新计划""引进计划"及上海、市级超级博士后项目。',
                  '课题组根据个人研究进展给予额外补贴，并提供优越科研条件。'
                ],
                en: [
                  'Compensation follows Fudan University\'s postdoctoral regulations, with apartment and benefits. Eligible to apply for national programs such as "Postdoctoral Innovation Talent Support Program" and Shanghai/municipal super postdoctoral projects.',
                  'Additional stipends based on individual research progress, with excellent research conditions provided by the group.'
                ]
              }
            },
            {
              subtitle: { zh: '申请方式', en: 'How to Apply' },
              paragraphs: {
                zh: [
                  '申请邮件发送至 llm@fudan.edu.cn，主题注明"应聘博士后 - 姓名 - 专业 - 学校"。',
                  '邮件附个人简历并说明感兴趣的研究方向，初审后我们将与您联系。'
                ],
                en: [
                  'Send application email to llm@fudan.edu.cn with subject line "Postdoc Application - Name - Major - University".',
                  'Attach your CV and specify your research interests. We will contact you after preliminary review.'
                ]
              }
            }
          ]
        },
        {
          id: 'engineer',
          title: { zh: '研究工程师', en: 'Research Engineers' },
          blocks: [
            {
              subtitle: { zh: '关于岗位', en: 'About the Position' },
              paragraphs: {
                zh: ['OpenMOSS 团队因科研工作需要，长期招聘科研工程助理，待遇面议。'],
                en: ['OpenMOSS Team is recruiting research engineering assistants for long-term positions. Compensation is negotiable.']
              }
            },
            {
              subtitle: { zh: '招聘说明', en: 'Job Description' },
              paragraphs: {
                zh: [
                  '参与实验室的大语言模型工程开发项目。',
                  '具备良好的工程经验，熟练掌握 Python，熟悉 PyTorch 并有 NLP 项目经验者优先。',
                  '具有专研精神，工作踏实认真。'
                ],
                en: [
                  'Participate in the lab\'s LLM engineering and development projects.',
                  'Good engineering experience required. Proficiency in Python, familiarity with PyTorch, and NLP project experience preferred.',
                  'Dedicated, diligent, and responsible work attitude.'
                ]
              }
            },
            {
              subtitle: { zh: '申请方式', en: 'How to Apply' },
              paragraphs: {
                zh: [
                  '申请邮件发送至 llm@fudan.edu.cn，主题注明"应聘科研工程助理 - 姓名"。',
                  '邮件中附简历，初审后我们将与您联系。'
                ],
                en: [
                  'Send application email to llm@fudan.edu.cn with subject line "Research Engineer Application - Name".',
                  'Attach your CV. We will contact you after preliminary review.'
                ]
              }
            }
          ]
        },
        {
          id: 'visiting',
          title: { zh: '访问学者', en: 'Visiting Scholars' },
          blocks: [
            {
              subtitle: { zh: '说明', en: 'Note' },
              paragraphs: {
                zh: ['请邮件 llm@fudan.edu.cn 咨询。'],
                en: ['Please contact llm@fudan.edu.cn for inquiries.']
              }
            }
          ]
        }
      ]
    },
    webmaster: {
      members: [
        {
          name: { zh: '贺心嘉', en: 'Xinji He' },
          role: { zh: '网页设计与开发', en: 'Web Design & Development' },
          github: 'https://github.com/644p45mhzc-wq'
        },
        {
          name: { zh: '郑逸宁', en: 'Yining Zheng' },
          role: { zh: '网页设计与开发', en: 'Web Design & Development' },
          github: 'https://github.com/WillQvQ'
        },
        {
          name: { zh: '陈新驰', en: 'Xinchi Chen' },
          role: { zh: '网页设计', en: 'Web Design' },
          github: 'https://github.com/dalstonChen'
        }
      ]
    },
    footer: {
      contactLinks: [
        { label: 'GitHub', icon: 'github', url: 'https://github.com/OpenMOSS' },
        { label: 'Twitter', icon: 'x-twitter', url: 'https://x.com/Open_MOSS' },
        { label: 'Email', icon: 'envelope', url: 'mailto:llm@fudan.edu.cn' }
      ]
    },
    publications: {
      infra: [
        {
          title: 'SpeechGPT 2.0-preview: A GPT-4o-level Real-Time Spoken Dialogue System',
          authors: 'Hanfu Chen, Ke Chen, Qinyuan Cheng, Mingshu Chen, Ruifan Deng, Liwei Fan, Zhaoye Fei, QingHui Gao, Yitian Gong, Ching Wing Kwok, Kexin Huang, Yaozhou Jiang, Xingyu Lu, Shimin Li, Zhengyuan Lin, Ruixiao Li, Qian Tu, Jin Wang, Yang Wang, Siyin Wang, Zhe Xu, Chenchen Yang, Donghua Yu, Yuqian Yao, Yucheng Yuan, Chufan Yu, Dong Zhang, YiWei Zhao, Yuqian Zhang, Jun Zhan, Xin Zhang, Xingjian Zhao, Chengyang Zhu',
          venue: '',
          year: '2025',
          support: true,
          alphabetical: true,
          links: [
            { type: 'GitHub', url: 'https://github.com/OpenMOSS/SpeechGPT-2.0-preview' },
            { type: 'Blog', url: 'https://www.open-moss.com/en/speechgpt2-preview/' }
          ]
        },
        {
          title: 'MOSS-TTSD: Zero-Shot Multi-Speaker Dialogue Speech Synthesis',
          authors: 'Cheng Chang, Ke Chen, Mingshu Chen, Qinyuan Cheng, Ruifan Deng, Liwei Fan, Zhaoye Fei, Qinghui Gao, Yitian Gong, Kexin Huang, Botian Jiang, Yaozhou Jiang, Luozhijie Jin, Ruixiao Li, Shimin Li, Zhengyuan Lin, Xipeng Qiu, Qian Tu, Jin Wang, Ruiming Wang, Wenxuan Wang, Yang Wang, Chenchen Yang, Zhe Xu, Yucheng Yuan, Donghua Yu, Jun Zhan, Dong Zhang, Wenbo Zhang, Xin Zhang, Yuqian Zhang, Yiwei Zhao, Xingjian Zhao',
          venue: '',
          year: '2025',
          support: true,
          alphabetical: true,
          links: [
            { type: 'GitHub', url: 'https://github.com/OpenMOSS/MOSS-TTSD' },
            { type: 'Blog', url: 'https://www.open-moss.com/en/moss-ttsd/' }
          ]
        },
        {
          title: 'MOSS-Speech: Towards True Speech-to-Speech Models Without Text Guidance',
          authors: 'Hanfu Chen, Ke Chen, Mingshu Chen, Qinyuan Cheng, Zhaoye Fei, Qinghui Gao, Yang Gao, Yitian Gong, Xuanjing Huang, Yaozhou Jiang, Luozhijie Jin, Ruixiao Li, Xipeng Qiu, Ruiming Wang, Yang Wang, Yuanfan Xu, Xiaogui Yang, Zhe Xu, Donghua Yu, Wenbo Zhang, Yiyang Zhang, Xingjian Zhao, Yaqian Zhou',
          venue: '',
          year: '2025',
          support: true,
          alphabetical: true,
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2510.00499' }]
        },
        {
          title: 'Towards Economical Inference: Enabling DeepSeek\'s Multi-Head Latent Attention in Any Transformer-based LLMs',
          authors: 'Tao Ji, Bin Guo, Yuanbin Wu, Qipeng Guo, Lixing Shen, Zhan Chen, Xipeng Qiu, Qi Zhang, Tao Gui',
          venue: 'ACL',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2502.14837' }]
        }
      ],
      multimodal: [
        {
          title: 'SpeechGPT 2.0-preview: A GPT-4o-level Real-Time Spoken Dialogue System',
          authors: 'Hanfu Chen, Ke Chen, Qinyuan Cheng, Mingshu Chen, Ruifan Deng, Liwei Fan, Zhaoye Fei, QingHui Gao, Yitian Gong, Ching Wing Kwok, Kexin Huang, Yaozhou Jiang, Xingyu Lu, Shimin Li, Zhengyuan Lin, Ruixiao Li, Qian Tu, Jin Wang, Yang Wang, Siyin Wang, Zhe Xu, Chenchen Yang, Donghua Yu, Yuqian Yao, Yucheng Yuan, Chufan Yu, Dong Zhang, YiWei Zhao, Yuqian Zhang, Jun Zhan, Xin Zhang, Xingjian Zhao, Chengyang Zhu',
          venue: '',
          year: '2025',
          alphabetical: true,
          links: [
            { type: 'GitHub', url: 'https://github.com/OpenMOSS/SpeechGPT-2.0-preview' },
            { type: 'Blog', url: 'https://www.open-moss.com/en/speechgpt2-preview/' }
          ]
        },
        {
          title: 'MOSS-TTSD: Zero-Shot Multi-Speaker Dialogue Speech Synthesis',
          authors: 'Cheng Chang, Ke Chen, Mingshu Chen, Qinyuan Cheng, Ruifan Deng, Liwei Fan, Zhaoye Fei, Qinghui Gao, Yitian Gong, Kexin Huang, Botian Jiang, Yaozhou Jiang, Luozhijie Jin, Ruixiao Li, Shimin Li, Zhengyuan Lin, Xipeng Qiu, Qian Tu, Jin Wang, Ruiming Wang, Wenxuan Wang, Yang Wang, Chenchen Yang, Zhe Xu, Yucheng Yuan, Donghua Yu, Jun Zhan, Dong Zhang, Wenbo Zhang, Xin Zhang, Yuqian Zhang, Yiwei Zhao, Xingjian Zhao',
          venue: '',
          year: '2025',
          alphabetical: true,
          links: [
            { type: 'GitHub', url: 'https://github.com/OpenMOSS/MOSS-TTSD' },
            { type: 'Blog', url: 'https://www.open-moss.com/en/moss-ttsd/' }
          ]
        },
        {
          title: 'MOSS-Speech: Towards True Speech-to-Speech Models Without Text Guidance',
          authors: 'Hanfu Chen, Ke Chen, Mingshu Chen, Qinyuan Cheng, Zhaoye Fei, Qinghui Gao, Yang Gao, Yitian Gong, Xuanjing Huang, Yaozhou Jiang, Luozhijie Jin, Ruixiao Li, Xipeng Qiu, Ruiming Wang, Yang Wang, Yuanfan Xu, Xiaogui Yang, Zhe Xu, Donghua Yu, Wenbo Zhang, Yiyang Zhang, Xingjian Zhao, Yaqian Zhou',
          venue: '',
          year: '2025',
          alphabetical: true,
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2510.00499' }]
        },
        {
          title: 'InstructTTSEval: Benchmarking Complex Natural-Language Instruction Following in Text-to-Speech Systems',
          authors: 'Kexin Huang, Qian Tu, Liwei Fan, Chenchen Yang, Dong Zhang, Shimin Li, Zhaoye Fei, Qinyuan Cheng, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.16381' }]
        },
        {
          title: 'XY-Tokenizer: Mitigating the Semantic-Acoustic Conflict in Low-Bitrate Speech Codecs',
          authors: 'Yitian Gong, Luozhijie Jin, Ruifan Deng, Dong Zhang, Xin Zhang, Qinyuan Cheng, Zhaoye Fei, Shimin Li, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.23325' }]
        },
        {
          title: 'CHiP: Cross-modal Hierarchical Direct Preference Optimization for Multimodal LLMs',
          authors: 'Jinlan Fu, Shenzhen Huangfu, Hao Fei, Xiaoyu Shen, Bryan Hooi, Xipeng Qiu, See-Kiong Ng',
          venue: 'ICLR',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2501.16629' }]
        },
        {
          title: 'Safe Inputs but Unsafe Output: Benchmarking Cross-modality Safety Alignment of Large Vision-Language Models',
          authors: 'Siyin Wang, Xingsong Ye, Qinyuan Cheng, Junwen Duan, Shimin Li, Jinlan Fu, Xipeng Qiu, Xuanjing Huang',
          venue: 'NAACL',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2406.15279' }]
        },
        {
          title: 'VisuoThink: Empowering LVLM Reasoning with Multimodal Tree Search',
          authors: 'Yikun Wang, Siyin Wang, Qinyuan Cheng, Zhaoye Fei, Liang Ding, Qipeng Guo, D. Tao, Xipeng Qiu',
          venue: 'ACL',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2504.09130' }]
        },
        {
          title: 'RoboOmni: Proactive Robot Manipulation in Omni-modal Context',
          authors: 'Siyin Wang, Jinlan Fu, Feihong Liu, Xinzhe He, Huangxuan Wu, Junhao Shi, Kexin Huang, Zhaoye Fei, Jingjing Gong, Zuxuan Wu, Yu-Gang Jiang, See-Kiong Ng, Tat-Seng Chua, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2510.23763' }]
        }
      ],
      reasoning: [
        {
          title: 'Implicit Reward as the Bridge: A Unified View of SFT and DPO Connections',
          authors: 'Bo Wang, Qinyuan Cheng, Runyu Peng, Rong Bao, Peiji Li, Qipeng Guo, Linyang Li, Zhiyuan Zeng, Yunhua Zhou, Xipeng Qiu',
          venue: 'NeurIPS',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2507.00018' }]
        },
        {
          title: 'RLoop: An Self-Improving Framework for Reinforcement Learning with Iterative Policy Initialization',
          authors: 'Zeng Zhiyuan, Jiashuo Liu, Zhangyue Yin, Ge Zhang, Wenhao Huang, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2511.04285' }]
        },
        {
          title: 'Scaling of Search and Learning: A Roadmap to Reproduce o1 from Reinforcement Learning Perspective',
          authors: 'Zhiyuan Zeng, Qinyuan Cheng, Zhangyue Yin, Bo Wang, Shimin Li, Yunhua Zhou, Qipeng Guo, Xuanjing Huang, Xipeng Qiu',
          venue: '',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2412.14135' }]
        },
        {
          title: 'In-Memory Learning: A Declarative Learning Framework for Large Language Models',
          authors: 'Bo Wang, Tianxiang Sun, Hang Yan, Siyin Wang, Qingyuan Cheng, Xipeng Qiu',
          venue: '',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2403.02757' }]
        },
        {
          title: 'Game-RL: Synthesizing Multimodal Verifiable Game Data to Boost VLMs\' General Reasoning',
          authors: 'Jingqi Tong, Jixin Tang, Hangcheng Li, Yurong Mou, Ming Zhang, Jun Zhao, Yanbo Wen, Fan Song, Jiahao Zhan, Yuyang Lu, Chaoran Tao, Zhiyuan Guo, Jizhou Yu, Tianhao Cheng, Zhiheng Xi, Changhao Jiang, Zhangyue Yin, Yining Zheng, Weifeng Ge, Guanhua Chen, Tao Gui, Xipeng Qiu, Qi Zhang, Xuanjing Huang',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2505.13886' }]
        }
      ],
      embodied: [
        {
          title: 'World Modeling Makes a Better Planner: Dual Preference Optimization for Embodied Task Planning',
          authors: 'Siyin Wang, Zhaoye Fei, Qinyuan Cheng, Shiduo Zhang, Panpan Cai, Jinlan Fu, Xipeng Qiu',
          venue: 'ACL',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2503.10480' }]
        },
        {
          title: 'LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models',
          authors: 'Senyu Fei, Siyin Wang, Junhao Shi, Zihao Dai, Jikun Cai, Pengfang Qian, Li Ji, Xinzhe He, Shiduo Zhang, Zhaoye Fei, Jinlan Fu, Jingjing Gong, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2510.13626' }]
        },
        {
          title: 'VLABench: A Large-Scale Benchmark for Language-Conditioned Robotics Manipulation with Long-Horizon Reasoning Tasks',
          authors: 'Shiduo Zhang, Zhe Xu, Peiju Liu, Xiaopeng Yu, Yuan Li, Qinghui Gao, Zhaoye Fei, Zhangyue Yin, Zuxuan Wu, Yu-Gang Jiang, Xipeng Qiu',
          venue: 'ICCV',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2412.18194' }]
        },
        {
          title: 'World-aware Planning Narratives Enhance Large Vision-Language Model Planner',
          authors: 'Junhao Shi, Zhaoye Fei, Siyin Wang, Qipeng Guo, Jingjing Gong, Xipeng Qiu',
          venue: 'NeurIPS',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.21230' }]
        },
        {
          title: 'Unleashing Embodied Task Planning Ability in LLMs via Reinforcement Learning',
          authors: 'Zhaoye Fei, Li Ji, Siyin Wang, Junhao Shi, Jingjing Gong, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.23127' }]
        }
      ],
      safety: [
        {
          title: 'Dictionary Learning Improves Patch-Free Circuit Discovery in Mechanistic Interpretability: A Case Study on Othello-GPT',
          authors: 'Zhengfu He, Xuyang Ge, Qiong Tang, Tianxiang Sun, Qinyuan Cheng, Xipeng Qiu',
          venue: '',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2402.12201' }]
        },
        {
          title: 'Automatically Identifying Local and Global Circuits with Linear Computation Graphs',
          authors: 'Xuyang Ge, Fukang Zhu, Wentao Shu, Junxuan Wang, Zhengfu He, Xipeng Qiu',
          venue: '',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2405.13868' }]
        },
        {
          title: 'Towards Universality: Studying Mechanistic Similarity Across Language Model Architectures',
          authors: 'Junxuan Wang, Xuyang Ge, Wentao Shu, Qiong Tang, Yunhua Zhou, Zhengfu He, Xipeng Qiu',
          venue: 'ICLR',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2410.06672' }]
        },
        {
          title: 'Llama Scope: Extracting Millions of Features from Llama-3.1-8B with Sparse Autoencoders',
          authors: 'Zhengfu He, Wentao Shu, Xuyang Ge, Lingjie Chen, Junxuan Wang, Yunhua Zhou, Frances Liu, Qipeng Guo, Xuanjing Huang, Zuxuan Wu, Yu-Gang Jiang, Xipeng Qiu',
          venue: '',
          year: '2024',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2410.20526' }]
        },
        {
          title: 'Towards Understanding the Nature of Attention with Low-Rank Sparse Decomposition',
          authors: 'Zhengfu He, Junxuan Wang, Rui Lin, Xuyang Ge, Wentao Shu, Qiong Tang, Junping Zhang, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2504.20938' }]
        },
        {
          title: 'Attention Layers Add Into Low-Dimensional Residual Subspaces',
          authors: 'Junxuan Wang, Xuyang Ge, Wentao Shu, Zhengfu He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2508.16929' }]
        },
        {
          title: 'Evolution of Concepts in Language Model Pre-Training',
          authors: 'Xuyang Ge, Wentao Shu, Jiaxing Wu, Yunhua Zhou, Zhengfu He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2509.17196' }]
        }
      ],
      arch: [
        {
          title: 'DiRL: an Efficient Training Framework for Diffusion Language Models',
          authors: 'Ying Zhu, Jiaxin Wan, Tianyi Liang, Xu Guo, Xiaoran Liu, Zengfeng Huang, Ziwei He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'GitHub', url: 'https://github.com/OpenMOSS/DiRL' }]
        },
        {
          title: 'Sparse-dLLM: Accelerating Diffusion LLMs with Dynamic Cache Eviction',
          authors: 'Yuerong Song, Xiaoran Liu, Ruixiao Li, Zhigeng Liu, Zengfeng Huang, Qipeng Guo, Ziwei He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2508.02558' }]
        },
        {
          title: 'LONGLLADA: Unlocking Long Context Capabilities in Diffusion LLMs',
          authors: 'Xiaoran Liu, Zhigeng Liu, Zengfeng Huang, Qipeng Guo, Ziwei He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.14429' }]
        },
        {
          title: 'Beyond Homogeneous Attention: Memory-Efficient LLMs via Fourier-Approximated KV Cache',
          authors: 'Xiaoran Liu, Siyang He, Qiqi Wang, Ruixiao Li, Yuerong Song, Zhigeng Liu, Linlin Li, Qun Liu, Zengfeng Huang, Qipeng Guo, Ziwei He, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2506.11886' }]
        },
        {
          title: 'Thus Spake Long-Context Large Language Model',
          authors: 'Xiaoran Liu, Ruixiao Li, Mianqiu Huang, Zhigeng Liu, Yuerong Song, Qipeng Guo, Siyang He, Qiqi Wang, Linlin Li, Qun Liu, Yaqian Zhou, Xuanjing Huang, Xipeng Qiu',
          venue: '',
          year: '2025',
          links: [{ type: 'ArXiv', url: 'https://arxiv.org/abs/2502.17129' }]
        }
      ]
    }
  };
})();
