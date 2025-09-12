import { atom } from 'jotai';

export type Language = 'en' | 'zh-CN';

export const languageAtom = atom<Language>('en');

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    applications: 'Apps',
    arts: 'Arts',
    handbooks: 'Handbooks',
    posters: 'Posters',
    reports: 'Reports',
    videos: 'Videos',
    websites: 'Websites',
    
    // Homepage
    thisIs: "This is",
    galleryTitle: "Joey Hou's Gallery",
    welcomeMessage: "Welcome to my gallery! Here you can find arts, videos, handbooks, and posters designed by me!",
    
    // Section labels for buttons
    sectionsLabels: {
      applications: 'Apps',
      arts: 'Arts',
      handbooks: 'Handbooks',
      posters: 'Posters',
      reports: 'Reports',
      videos: 'Videos',
      websites: 'Websites'
    },

    // UI Components
    ui: {
      siteTitle: 'Joey Hou Gallery',
      siteDescription: 'Photography, art prints, and projects by Joey Hou',
      changeLanguage: 'Change Language',
      switchToLight: 'Switch to light',
      switchToDark: 'Switch to dark',
      switchToChinese: 'Switch to Chinese',
      madeBy: 'Made by Joey Hou in 2025.',
      downloadVolume: 'Download Volume of CityU',
      visitSite: 'Visit Site',
      goToGitHub: 'Go to my GitHub',
      defaultAlt: 'Art {number}'
    },

    // Page content translations
    pages: {
      applications: {
        title: 'Apps',
        stickyarTitle: 'StickyAR - An iOS AR App',
        stickyarDescription: [
          'This is an iOS application integrated with AR techniques.',
          'It is a group project I did as a group of 4 in Columbia University.',
          'This application is posted on my GitHub page.'
        ],
        applicationIdeaTitle: 'Application Idea',
        applicationIdeaDescription: 'The idea of our iOS AR application is to recreate the functionality of sticky notes on smartphones.',
        githubLabel: 'Go to my GitHub',
        highLevelOverviewTitle: 'High Level Overview',
        highLevelOverviewDescription: [
          'As a group of 4, we have assigned work for everyone based on the four sections.',
          'Functions: Sticky notes creation, keyboard input, selection, deletion, texture changing, note size changing.'
        ],
        manipulationTitle: 'Manipulation'
      },
      apps: {
        title: 'Apps',
        stickyarTitle: 'StickyAR - An iOS AR App',
        stickyarDescription: [
          'This is an iOS application integrated with AR techniques.',
          'It is a group project I did as a group of 4 in Columbia University.',
          'This application is posted on my GitHub page.'
        ],
        applicationIdeaTitle: 'Application Idea',
        applicationIdeaDescription: 'The idea of our iOS AR application is to recreate the functionality of sticky notes on smartphones.',
        githubLabel: 'Go to my GitHub',
        highLevelOverviewTitle: 'High Level Overview',
        highLevelOverviewDescription: [
          'As a group of 4, we have assigned work for everyone based on the four sections.',
          'Functions: Sticky notes creation, keyboard input, selection, deletion, texture changing, note size changing.'
        ],
        manipulationTitle: 'Manipulation'
      },
      arts: {
        title: 'Arts',
        chineseCharactersTitle: 'Chinese Characters & Western Art',
        chineseCharactersDescription: 'Columbia Art Humanities Individual Creative Project',
        travelJournalsTitle: 'Travel Journals — Italy',
        travelJournalsDescription: 'I drew these during a summer trip to Italy with my mom.'
      },
      handbooks: {
        title: 'Handbooks',
        admissionPediaTitle: 'Admission‑pedia',
        admissionPediaDescription: [
          'In the first semester at Columbia,',
          'Mainland Chinese students of cohort 2017 cooperated and composed two volumes of admission handbooks.',
          "'Admission‑Pedia' covers preparation steps for the CityU–Columbia Joint Bachelor's Degree Program.",
          'It contains the necessary introduction and detailed explanations of the application process,',
          'with comments and tips from students.'
        ],
        simplifiedTitle: 'Simplified Chinese Version',
        traditionalTitle: 'Traditional Chinese Version', 
        englishTitle: 'English Version',
        musicTitle: 'Music Tutorial Textbook',
        musicDescription: [
          'I wrote a music tutorial textbook for my choir during summer.',
          'The textbook helps newcoming members to quickly learn music theory and sheet reading.'
        ],
        downloadCityU: 'Download Volume of CityU',
        downloadColumbia: 'Download Volume of Columbia',
        downloadTextbook: 'Download Textbook'
      },
      posters: {
        title: 'Posters',
        wallNewspapersTitle: 'Wall Newspapers',
        wallNewspapersDescription: [
          'I was in charge of designing class wall newspaper/bulletin boards for over 6 years.',
          'In my middle school and high school,',
          'these wall newspapers are made in huge colored papers.',
          'Some of the designs are displayed here.'
        ],
        highSchool1Description: 'A career planning themed bulletin board (background) design.',
        highSchool2Description: 'A friendship/classmates themed bulletin board (background) design.',
        highSchool3Description: 'A Gao Kao themed bulletin board (background) design.'
      },
      reports: {
        title: 'Reports',
        featuredTitle: 'Featured Assignments',
        featuredDescription: 'Here are some featured courseworks I finish at Columbia University.',
        templateTitle: 'Assignment Template',
        templateDescription: [
          'I designed these cover templates for my assignments.',
          "It's finished by Microsoft Publisher."
        ],
        hungarianTitle: 'Descriptive Hungarian Grammar',
        hungarianDescription: [
          'This is the handout for the final presentation.',
          "It's a comparison of grammers between Hungarian and Mandarin Chinese.",
          'The report is finished by LaTeX.'
        ],
        csTitle: 'Computer Science Theory',
        csDescription: [
          'Here are selected pages from my homework.',
          'The figures are drawn in Microsoft Word,',
          'and the file is compiled by LaTeX.'
        ],
        mathTitle: 'Ordinary Differential Equations',
        mathDescription: "It's finished by LaTeX."
      },
      videos: {
        title: 'Videos',
        videoEssayTitle: 'Video Essay',
        videoEssayDescription: [
          'I made this video essay for master degree program applications.',
          'It is also a nice 2-minute introduction video!'
        ],
        orientationTitle: 'Orientation Videos',
        orientationDescription: [
          'I was in a Joint Bachelors Degree Program (JBDP) during 2019-2022.',
          "It's a program between Columbia University and City University of Hong Kong.",
          'For every year the program has a pre-departure orientation session for admitted students.',
          'I recorded and finished two videos for two of the sessions.'
        ],
        introVideoTitle: 'Introduction video',
        videoEssayLabel: 'Video Essay',
        videoEssayBody: 'This is a 2-minute introduction video I made in 2021 for master program applications.',
        episode2Title: '2021 - Episode 2',
        episode1Title: '2020 - Episode 1',
        qaLabel: "Joey's Question & Answer",
        episode2Body: 'This is for the orientation session in 2021.',
        episode1Body: 'This is for the orientation session in 2020.'
      },
      websites: {
        title: 'Websites',
        consultingTitle: 'Consulting Company Website',
        consultingDescription: [
          'The Black Box Institute is a Canadian boutique advisory company based in Toronto.',
          'I built the full website in one week with Wix.com.',
          'The website balances professional design and the efficiency of future updates.',
          'It got positive feedback from supervisors and partners.'
        ],
        musicTitle: 'Music Theory Learning Website',
        musicDescription: [
          'I designed a syllabus to help my friends learn basic music theory knowledge.',
          'Then I led a group of 4 at Columbia University to finish this website.',
          'This website is implemented with simple HTML, CSS, and Javascript.'
        ],
        visitOfficial: 'Visit the official site of The Black Box Institute',
        codeOnGithub: 'Code on GitHub'
      }
    }
  },
  'zh-CN': {
    // Navigation
    home: '首页',
    applications: '应用',
    arts: '画作',
    handbooks: '手册',
    posters: '海报',
    reports: '报告',
    videos: '视频',
    websites: '网站',
    
    // Homepage
    thisIs: "这里是",
    galleryTitle: "小猴同学作品集",
    welcomeMessage: "欢迎来到我的作品集！这里有不少我设计的画、视频、手册以及海报哦！",
    
    // Section labels for buttons
    sectionsLabels: {
      applications: '应用',
      arts: '画作',
      handbooks: '手册',
      posters: '海报',
      reports: '报告',
      videos: '视频',
      websites: '网站'
    },

    // UI Components
    ui: {
      siteTitle: '小猴同学作品集',
      siteDescription: '小猴同学的摄影、艺术作品及项目展示',
      changeLanguage: '切换语言',
      switchToLight: '切换到明亮模式',
      switchToDark: '切换到深色模式',
      switchToEnglish: '切换到英文',
      madeBy: '小猴同学于2025年制作',
      downloadVolume: '下载城大版本',
      visitSite: '访问网站',
      goToGitHub: '访问我的GitHub',
      defaultAlt: '艺术作品 {number}'
    },

    // Page content translations - ADD YOUR CHINESE TRANSLATIONS HERE
    pages: {
      apps: {
        title: '程序',
        stickyarTitle: 'StickyAR - AR手机程序',
        stickyarDescription: [
          '这个iOS手机软件集成了AR（增强现实）技术。',
          '这是我和3名哥伦比亚大学的同学合作完成的小组项目。',
          '请前往我的GitHub查看代码。'
        ],
        applicationIdeaTitle: '创作理念',
        applicationIdeaDescription: '这个iOS AR的创作理念是在智能手机上重现便利贴的功能。',
        githubLabel: '前往我的GitHub',
        highLevelOverviewTitle: '程序概览',
        highLevelOverviewDescription: [
          '程序分为四个部分，大家分工合作。',
          '功能包括：便利贴的创建、键盘输入、选择、删除、背景更改、便签大小更改。'
        ],
        manipulationTitle: '操作演示'
      },
      arts: {
        title: '画作',
        // TODO: Add Chinese translations
        chineseCharactersTitle: '汉字与西方艺术',
        chineseCharactersDescription: '哥伦比亚大学艺术人文个人创作项目',
        travelJournalsTitle: '旅行日记 — 意大利',
        travelJournalsDescription: '这些是我与妈妈在意大利夏日旅行时创作的。'
      },
      handbooks: {
        title: '手册',
        // TODO: Add Chinese translations
        admissionPediaTitle: '入学百科全书',
        admissionPediaDescription: [
          '在哥伦比亚大学的第一学期，',
          '2017届内地学生合作编写了两卷入学手册。',
          '"入学百科全书"涵盖了城大-哥大联合学士学位项目的准备步骤。',
          '它包含了必要的介绍和申请过程的详细说明，',
          '以及学生的意见和建议。'
        ],
        simplifiedTitle: '简体中文版',
        traditionalTitle: '繁体中文版',
        englishTitle: '英文版',
        musicTitle: '音乐教学手册',
        musicDescription: [
          '我在夏天为我的合唱团编写了一本音乐教学手册。',
          '这本教材帮助新成员快速学习音乐理论和读谱。'
        ],
        downloadCityU: '下载城大版本',
        downloadColumbia: '下载哥大版本',
        downloadTextbook: '下载教材'
      },
      posters: {
        title: '海报',
        // TODO: Add Chinese translations
        wallNewspapersTitle: '黑板报',
        wallNewspapersDescription: [
          '我负责设计班级黑板报/公告板超过6年。',
          '在我的初中和高中时期，',
          '这些黑板报都是用大幅彩纸制作的。',
          '这里展示了一些设计。'
        ],
        highSchool1Description: '职业规划主题公告板（背景）设计。',
        highSchool2Description: '友谊/同学主题公告板（背景）设计。',
        highSchool3Description: '高考主题公告板（背景）设计。'
      },
      reports: {
        title: '报告',
        // TODO: Add Chinese translations
        featuredTitle: '精选作业',
        featuredDescription: '这里是我在哥伦比亚大学完成的一些精选课程作业。',
        templateTitle: '作业模板',
        templateDescription: [
          '我为我的作业设计了这些封面模板。',
          '它们是用Microsoft Publisher完成的。'
        ],
        hungarianTitle: '匈牙利语描述性语法',
        hungarianDescription: [
          '这是期末展示的讲义。',
          '它是匈牙利语和普通话语法的比较。',
          '报告是用LaTeX完成的。'
        ],
        csTitle: '计算机科学理论',
        csDescription: [
          '这里是我作业中的精选页面。',
          '图形是在Microsoft Word中绘制的，',
          '文件由LaTeX编译。'
        ],
        mathTitle: '常微分方程',
        mathDescription: '它是用LaTeX完成的。'
      },
      videos: {
        title: '视频',
        // TODO: Add Chinese translations
        videoEssayTitle: '视频短文',
        videoEssayDescription: [
          '我为硕士学位项目申请制作了这个视频短文。',
          '它也是一个很好的2分钟介绍视频！'
        ],
        orientationTitle: '迎新视频',
        orientationDescription: [
          '我在2019-2022年期间参加了联合学士学位项目（JBDP）。',
          '这是哥伦比亚大学和香港城市大学之间的项目。',
          '每年该项目都为录取学生举办行前迎新会。',
          '我为其中两次迎新会录制并完成了两个视频。'
        ],
        introVideoTitle: '介绍视频',
        videoEssayLabel: '视频短文',
        videoEssayBody: '这是我在2021年为硕士项目申请制作的2分钟介绍视频。',
        episode2Title: '2021年 - 第二集',
        episode1Title: '2020年 - 第一集',
        qaLabel: '小猴的问答环节',
        episode2Body: '这是为2021年的迎新会制作的。',
        episode1Body: '这是为2020年的迎新会制作的。'
      },
      websites: {
        title: '网站',
        // TODO: Add Chinese translations
        consultingTitle: '咨询公司网站',
        consultingDescription: [
          'The Black Box Institute是位于多伦多的加拿大精品咨询公司。',
          '我用Wix.com在一周内建成了完整的网站。',
          '网站平衡了专业设计和未来更新的效率。',
          '它得到了主管和合作伙伴的积极反馈。'
        ],
        musicTitle: '音乐理论学习网站',
        musicDescription: [
          '我设计了一个教学大纲来帮助我的朋友学习基础音乐理论知识。',
          '然后我在哥伦比亚大学带领4人小组完成了这个网站。',
          '这个网站是用简单的HTML、CSS和Javascript实现的。'
        ],
        visitOfficial: '访问The Black Box Institute官方网站',
        codeOnGithub: 'GitHub上的代码'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations['en'];