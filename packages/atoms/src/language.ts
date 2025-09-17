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
      defaultAlt: 'Art {number}',
      loading: 'Loading...'
    },

    // Page content translations
    pages: {
      home: {
        title: "Welcome to Joey Hou's Gallery"
      },
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
        travelJournalsDescription: 'I drew these during a summer trip to Italy with my mom.',
        artStyles: {
          renaissance: 'Renaissance',
          cubism: 'Cubism',
          modernism: 'Modernism',
          impressionism: 'Impressionism'
        }
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
        capstoneTitle: 'Capstone Project',
        capstoneDescription: [
          'In University of California Berkeley (UC Berkeley),',
          'I finished a capstone project as a part of my master degree program.',
          'One important part of the project is to design a poster',
          'so that people with no science background can easily understand our academic project details.'
        ],
        projectPosterTitle: 'Project Poster',
        projectPosterDescription: [
          'I led a group of 3 and finished this poster.',
          'It contains delicately drawn explanation figures and carefully designed contents.'
        ],
        wallNewspapersTitle: 'Wall Newspapers',
        wallNewspapersDescription: [
          'I was in charge of designing and making class wall newspaper/bulletin boards for over 6 years.',
          'In my middle school and high school,',
          'these wall newspapers are made in huge colored papers.',
          'Some of the designs are displayed here.'
        ],
        highSchool1Title: 'High School Design 1',
        highSchool2Title: 'High School Design 2',
        highSchool3Title: 'High School Design 3',
        highSchool1Description: 'A career planning themed bulletin board (background) design.',
        highSchool2Description: 'A friendship/classmates themed bulletin board (background) design.',
        highSchool3Description: 'A Gao Kao (Chinese College Entrance Exam) themed bulletin board design.'
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
        episode1Body: 'This is for the orientation session in 2020.',
        courseCreativeTitle: 'Course Creative Project',
        courseCreativeDescription: [
          'I took a required music course at Columbia University.',
          'It\'s called Masterpieces of Western Music.',
          'It provides a creative way of finishing its final interdisciplinary project.',
          'I made this video as this project.',
          'This video was inspired by the game Just Shapes & Beats (JSAB).'
        ],
        courseCreativeVideoTitle: 'Course Creative Project',
        courseCreativeVideoDescription: 'The Visualization of MUSIC',
        courseCreativeVideoBody: 'The video includes three musical works.\nThey are from the Medieval period, the Classical period, and European Modernism.'
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
    applications: '程序',
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
      applications: '程序',
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
      madeBy: '小猴同学 2025年制作',
      downloadVolume: '下载城大版本',
      visitSite: '访问网站',
      goToGitHub: '访问我的GitHub',
      defaultAlt: '艺术作品 {number}',
      loading: '加载中...'
    },

    // Page content translations - ADD YOUR CHINESE TRANSLATIONS HERE
    pages: {
      home: {
        title: "欢迎光临小猴同学作品集"
      },
      apps: {
        title: '程序',
        stickyarTitle: 'StickyAR - AR手机程序',
        stickyarDescription: [
          '这个iOS手机程序集成了AR（增强现实）技术。',
          '我和3名哥伦比亚大学同学合作完成了这个小组项目。',
          '请前往我的GitHub查看代码。'
        ],
        applicationIdeaTitle: '创作初衷',
        applicationIdeaDescription: '这个AR手机程序的创作初衷是在智能手机上再现便利贴的功能。',
        githubLabel: '前往我的GitHub',
        highLevelOverviewTitle: '程序概览',
        highLevelOverviewDescription: [
          '程序分为四个部分，大家分工合作。',
          '程序功能包括：便利贴的创建、键盘输入、选择、删除、背景更改、便签大小更改。'
        ],
        manipulationTitle: '操作演示'
      },
      arts: {
        title: '画作',
        chineseCharactersTitle: '汉字与西方经典艺术',
        chineseCharactersDescription: '哥伦比亚大学艺术人文个人创作项目',
        travelJournalsTitle: '意大利画图游记',
        travelJournalsDescription: '有一年夏天，我和妈妈在意大利旅游，每天都在画画图游记。',
        artStyles: {
          renaissance: '文艺复兴',
          cubism: '立体主义',
          modernism: '现代主义',
          impressionism: '印象派'
        }
      },
      handbooks: {
        title: '手册',
        // TODO: Add Chinese translations
        admissionPediaTitle: '报读百科',
        admissionPediaDescription: [
          '在哥伦比亚大学的第一个学期，',
          '2017级的内地学生合作编写了两卷报读参考手册。',
          '《报读百科》涵盖了城大-哥大双联学士学位项目的准备步骤。',
          '手册包括了申请过程的介绍和详细说明，',
          '以及大家的经验和建议。'
        ],
        simplifiedTitle: '简体中文版',
        traditionalTitle: '繁体中文版',
        englishTitle: '英文版',
        musicTitle: '合唱团音乐教材',
        musicDescription: [
          '有一年夏天，我给我所在的合唱团团员编写了一本音乐教材，',
          '用来帮助新成员快速学习乐理和读谱。'
        ],
        downloadCityU: '下载城大卷',
        downloadColumbia: '下载哥大卷',
        downloadTextbook: '下载音乐教材'
      },
      posters: {
        title: '海报',
        capstoneTitle: '毕业设计项目',
        capstoneDescription: [
          '在加州大学伯克利分校（伯克利）的时候，',
          '我参加过一个硕士学位项目的毕业设计。',
          '伯克利硕士项目的一个重要组成部分是要设计海报，',
          '让没有科学背景的人也能轻松理解我们项目的专业细节。'
        ],
        projectPosterTitle: '项目海报',
        projectPosterDescription: [
          '我带领3人小组完成了这张海报。',
          '海报包含了精心绘制的说明图和仔细设计的内容。'
        ],
        wallNewspapersTitle: '板报',
        wallNewspapersDescription: [
          '中学的六年里，我一直负责设计和制作班级板报。',
          '在我们中学，',
          '板报是用大幅彩纸制作的。',
          '这里展示我的一些设计。'
        ],
        highSchool1Title: '高中设计1',
        highSchool2Title: '高中设计2',
        highSchool3Title: '高中设计3',
        highSchool1Description: '职业规划主题板报（背景）设计。',
        highSchool2Description: '友谊/同学主题板报（背景）设计。',
        highSchool3Description: '高考主题板报设计。'
      },
      reports: {
        title: '报告',
        // TODO: Add Chinese translations
        featuredTitle: '作业精选',
        featuredDescription: '这里展示了一部分我在哥伦比亚大学完成的课程作业。',
        templateTitle: '作业封面模板',
        templateDescription: [
          '这是我给本科作业设计的封面模板。',
          '文件由Microsoft Publisher制作。'
        ],
        hungarianTitle: '匈牙利语语法',
        hungarianDescription: [
          '这是我的期末展示讲义，',
          '主题是匈牙利语和普通话语法的比较。',
          '这份报告用LaTeX制作。'
        ],
        csTitle: '计算机科学理论',
        csDescription: [
          '这里展示了一部分作业页面。',
          '其中的图形用Microsoft Word绘制，',
          '文件由LaTeX制作。'
        ],
        mathTitle: '常微分方程',
        mathDescription: '这份作业由LaTeX完成。'
      },
      videos: {
        title: '视频',
        // TODO: Add Chinese translations
        videoEssayTitle: '简介视频',
        videoEssayDescription: [
          '由于硕士学位项目申请需要，我做了这个简介视频。',
          '也可以算做我的2分钟个人介绍呢！'
        ],
        orientationTitle: '迎新视频',
        orientationDescription: [
          '在2019-2022年期间，',
          '我参加了哥伦比亚大学和香港城市大学之间的双联学士学位项目（双学位项目）。',
          '每年春天，这个项目都为录取学生举办行前说明会。',
          '我给其中的两次说明会录制并剪辑了这两个视频。'
        ],
        introVideoTitle: '介绍视频',
        videoEssayLabel: '简介视频',
        videoEssayBody: '这是我在2021年为硕士项目申请制作的2分钟介绍视频。',
        episode2Title: '2021年 - 第二集',
        episode1Title: '2020年 - 第一集',
        qaLabel: '小猴同学问与答',
        episode2Body: '2021年行前说明会',
        episode1Body: '2020年行前说明会',
        courseCreativeTitle: '音乐课创意项目',
        courseCreativeDescription: [
          '我在哥伦比亚大学选修了一门必修音乐课。',
          '这门课叫《西方音乐名作》。',
          '课程提供了一个创造性的方式来完成期末跨学科项目。',
          '我制作了这个视频作为项目作品。',
          '这个视频的灵感来自游戏《Just Shapes & Beats (JSAB)》。'
        ],
        courseCreativeVideoTitle: '音乐课创意项目',
        courseCreativeVideoDescription: '音乐的可视化',
        courseCreativeVideoBody: '视频包含三首音乐作品。\n分别来自中世纪时期、古典主义时期和欧洲现代主义时期。'
      },
      websites: {
        title: '网站',
        // TODO: Add Chinese translations
        consultingTitle: '咨询公司网站',
        consultingDescription: [
          'The Black Box Institute是位于加拿大多伦多的精品咨询公司。',
          '我用Wix.com在一周内建成全站。',
          '网站综合考虑了设计的专业性和更新的便捷性。',
          '公司主管和合作伙伴对网站做出了高度评价。'
        ],
        musicTitle: '乐理学习网站',
        musicDescription: [
          '为了帮助朋友学习基础乐理知识，我设计了教学大纲，',
          '然后在哥伦比亚大学带领4人小组完成了这个网站。',
          '网站用基本的HTML、CSS和Javascript实现。'
        ],
        visitOfficial: '前往The Black Box Institute官方网站',
        codeOnGithub: 'GitHub上的代码'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations['en'];