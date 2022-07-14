import { useTheme } from 'vuetify';
import { computed } from 'vue';

export default function useDarkTheme() {
  const theme = useTheme();

  const isThemeDark = computed(() => theme.global.current.value.dark)
  const themeIcon = computed(() => {
    return isThemeDark.value ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent';
  });
  const themeName = computed(() => theme.global.name.value);
  const toggleTheme = () => {
    theme.global.name.value = isThemeDark.value ? 'light' : 'dark';
  };
  return { isThemeDark, themeIcon, themeName, toggleTheme };
}
