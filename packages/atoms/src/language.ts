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

    // Page content translations
    pages: {
      applications: {
        title: 'Apps',
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
        githubLabel: 'GitHub'
      },
      arts: {
        title: 'Arts'
      },
      handbooks: {
        title: 'Handbooks'
      },
      posters: {
        title: 'Posters'
      },
      reports: {
        title: 'Reports'
      },
      videos: {
        title: 'Videos'
      },
      websites: {
        title: 'Websites'
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

    // Page content translations
    pages: {
      applications: {
        title: '应用',
        stickyarTitle: 'StickyAR - iOS AR应用',
        stickyarDescription: [
          '这是一个集成了AR技术的iOS应用程序。',
          '这是我在哥伦比亚大学与其他3名同学合作完成的小组项目。',
          '这个应用程序已发布在我的GitHub页面上。'
        ],
        applicationIdeaTitle: '应用理念',
        applicationIdeaDescription: '我们的iOS AR应用的理念是在智能手机上重现便利贴的功能。',
        githubLabel: 'GitHub'
      },
      apps: {
        title: '应用',
        stickyarTitle: 'StickyAR - iOS AR应用',
        stickyarDescription: [
          '这是一个集成了AR技术的iOS应用程序。',
          '这是我在哥伦比亚大学与其他3名同学合作完成的小组项目。',
          '这个应用程序已发布在我的GitHub页面上。'
        ],
        applicationIdeaTitle: '应用理念',
        applicationIdeaDescription: '我们的iOS AR应用的理念是在智能手机上重现便利贴的功能。',
        githubLabel: 'GitHub'
      },
      arts: {
        title: '画作'
      },
      handbooks: {
        title: '手册'
      },
      posters: {
        title: '海报'
      },
      reports: {
        title: '报告'
      },
      videos: {
        title: '视频'
      },
      websites: {
        title: '网站'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations['en'];