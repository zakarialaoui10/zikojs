import { Themes } from "../../../global/themes";
class UseTheme{
    constructor(theme,id=0){
      this.id="Ziko-Theme-"+id;
      this.use(theme)
    }
    get current(){
      const colorNames = [
        'background',
        'currentLine',
        'selection',
        'foreground',
        'comment',
        'cyan',
        'green',
        'orange',
        'pink',
        'purple',
        'red',
        'yellow',
    ];
    return colorNames.reduce((theme, color) => {
        theme[color] = `var(--${color}-${this.id})`;
        return theme;
    }, {});
  
  }
    useThemeIndex(index){
      const keys=Object.keys(Themes);
          for(let a in Themes[keys[index]]){
              document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes[keys[index]][a]);
          }
          return this;
    }
    useThemeName(str){
      str=str.toLowerCase()
      const Themes_With_Lower_Case=Object.fromEntries(Object.entries(Themes).map(n=>[n[0].toLowerCase(),n[1]]))
          for(let a in Themes_With_Lower_Case[str]){
              document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes_With_Lower_Case[str][a]);
          }
          return this;
    }
    useThemeObject(Theme){
      for(let a in Theme){
        document.documentElement.style.setProperty(`--${a}-${this.id}`, Theme[a]);
      }
      return this;
    }
    use(theme){
      if(typeof theme === "number")this.useThemeIndex(theme);
      if(typeof theme === "string")this.useThemeName(theme);
      if(theme instanceof Object)this.useThemeObject(theme);
      return this;
    }
  }  
  const useTheme=(theme, id=0)=>new UseTheme(theme,id)
  export {
      useTheme,
      // Themes,
      // LightThemes,
      // DarkThemes,
  };