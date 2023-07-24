import { Locale } from '@prisma/client';

export const lang: { [locale: string]: { [id: string]: string } } = {
  [Locale.en_US]: {
    createCommunityButton: 'Create community',
    mainOnlineLabel: 'Online',
    newCommunityModalTitle: 'New community',
    newCommunityTitleLabel: 'Title',
    newCommunityTitlePlaceholder: 'Awesome community',
    newCommunityCreateButton: 'Create',
    newChannelCreateButton: 'Create channel',
    communitySettingsButton: 'Community settings',
    userSettingsMenuLabel: 'User Settings',
    userSettingsOverviewMenuItemLabel: 'Overview',
    userSettingsLanguageMenuItemLabel: 'Language',
    userSettingsLanguageEnglishUS: 'English, US',
    userSettingsLanguageRussian: 'Russian',
    userSettingsLogoutMenuItemLabel: 'Logout',
  },
  [Locale.ru_RU]: {
    createCommunityButton: 'Создать сообщество',
    mainOnlineLabel: 'Онлайн',
    newCommunityModalTitle: 'Новое сообщество',
    newCommunityTitleLabel: 'Название',
    newCommunityTitlePlaceholder: 'Потрясающее сообщество',
    newCommunityCreateButton: 'Создать',
    newChannelCreateButton: 'Создать канал',
    communitySettingsButton: 'Настройки сообщества',
    userSettingsMenuLabel: 'Настройки пользователя',
    userSettingsOverviewMenuItemLabel: 'Обзор',
    userSettingsLanguageMenuItemLabel: 'Язык',
    userSettingsLanguageEnglishUS: 'Анлийский, США',
    userSettingsLanguageRussian: 'Русский',
    userSettingsLogoutMenuItemLabel: 'Выход',
  },
};
