import { computed } from 'vue';
import * as themeColors from '@/theme/LightTheme';
import * as DarkThemeColors from '@/theme/DarkTheme';
import { useCustomizerStore } from '@/stores/customizer';


export function customizer() {
  const cst = useCustomizerStore();
  return cst.actTheme;

}

const getPrimary = computed(() => {
    const custmizer = customizer();
    if (custmizer === 'AQUA_THEME') {
        return themeColors.AQUA_THEME.colors.primary;
    } else if (custmizer === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.primary;
    } else if (custmizer === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.primary;
    } else if (custmizer === 'CYAN_THEME') {
        return themeColors.CYAN_THEME.colors.primary;
    } else if (custmizer === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.primary;
    } else if (custmizer === 'DARK_AQUA_THEME') {
        return DarkThemeColors.DARK_AQUA_THEME.colors.primary;
    } else if (custmizer === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.primary;
    } else if (custmizer === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.primary;
    } else if (custmizer === 'DARK_CYAN_THEME') {
        return DarkThemeColors.DARK_CYAN_THEME.colors.primary;
    } else if (custmizer === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.primary;
    } else if (custmizer === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.primary;
    } else {
        return themeColors.BLUE_THEME.colors.primary;
    }
});

const getLightPrimary = computed(() => {
    const custmizer = customizer();
    if (custmizer === 'AQUA_THEME') {
        return themeColors.AQUA_THEME.colors.lightprimary;
    } else if (custmizer === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.lightprimary;
    } else if (custmizer === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.lightprimary;
    } else if (custmizer === 'CYAN_THEME') {
        return themeColors.CYAN_THEME.colors.lightprimary;
    } else if (custmizer === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.lightprimary;
    }
    if (custmizer === 'DARK_AQUA_THEME') {
        return DarkThemeColors.DARK_AQUA_THEME.colors.lightprimary;
    } else if (custmizer === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.lightprimary;
    } else if (custmizer === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightprimary;
    } else if (custmizer === 'DARK_CYAN_THEME') {
        return DarkThemeColors.DARK_CYAN_THEME.colors.lightprimary;
    } else if (custmizer === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.lightprimary;
    } else if (custmizer === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.lightprimary;
    } else {
        return themeColors.BLUE_THEME.colors.lightprimary;
    }
});

const getSecondary = computed(() => {
    const custmizer = customizer();
    if (custmizer === 'AQUA_THEME') {
        return themeColors.AQUA_THEME.colors.secondary;
    } else if (custmizer === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.secondary;
    } else if (custmizer === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.secondary;
    } else if (custmizer === 'CYAN_THEME') {
        return themeColors.CYAN_THEME.colors.secondary;
    } else if (custmizer === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.secondary;
    } else if (custmizer === 'DARK_AQUA_THEME') {
        return DarkThemeColors.DARK_AQUA_THEME.colors.secondary;
    } else if (custmizer === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.secondary;
    } else if (custmizer === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.secondary;
    } else if (custmizer === 'DARK_CYAN_THEME') {
        return DarkThemeColors.DARK_CYAN_THEME.colors.secondary;
    } else if (custmizer === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.secondary;
    } else if (custmizer === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.secondary;
    } else {
        return themeColors.BLUE_THEME.colors.secondary;
    }
});

const getLightSecondary = computed(() => {
    const custmizer = customizer();
    if (custmizer === 'AQUA_THEME') {
        return themeColors.AQUA_THEME.colors.lightsecondary;
    } else if (custmizer === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.lightsecondary;
    } else if (custmizer === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.lightsecondary;
    } else if (custmizer === 'CYAN_THEME') {
        return themeColors.CYAN_THEME.colors.lightsecondary;
    } else if (custmizer === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.lightsecondary;
    } if (custmizer === 'DARK_AQUA_THEME') {
        return DarkThemeColors.DARK_AQUA_THEME.colors.lightsecondary;
    } else if (custmizer === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.lightsecondary;
    } else if (custmizer === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightsecondary;
    } else if (custmizer === 'DARK_CYAN_THEME') {
        return DarkThemeColors.DARK_CYAN_THEME.colors.lightsecondary;
    } else if (custmizer === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.lightsecondary;
    } else if (custmizer === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.lightsecondary;
    } else {
        return themeColors.BLUE_THEME.colors.lightsecondary;
    }
});

const getLight100 = computed(() => {
    const custmizer = customizer();
    if (
        custmizer === 'AQUA_THEME' ||
        custmizer === 'PURPLE_THEME' ||
        custmizer === 'GREEN_THEME' ||
        custmizer === 'CYAN_THEME' ||
        custmizer === 'ORANGE_THEME'
    ) {
        return themeColors.AQUA_THEME.colors.grey100;
    } else if (
        custmizer === 'DARK_AQUA_THEME' ||
        custmizer === 'DARK_PURPLE_THEME' ||
        custmizer === 'DARK_GREEN_THEME' ||
        custmizer === 'DARK_CYAN_THEME' ||
        custmizer === 'DARK_ORANGE_THEME' ||
        custmizer === 'DARK_BLUE_THEME'
    ) {
        return DarkThemeColors.DARK_AQUA_THEME.colors.grey100;
    } else {
        return themeColors.BLUE_THEME.colors.grey100;
    }
});

export { getPrimary, getSecondary, getLightPrimary, getLightSecondary, getLight100 };
