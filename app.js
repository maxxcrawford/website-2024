(function() {
	"use strict";

	function updateCopyrightYear() {
        const copywriteWrapper = document.querySelector(".copyright-year");
        const currentYear = new Date().getFullYear();
        copywriteWrapper.textContent = currentYear;
    }

    // TODO: Update to persist across pages via localStorage
    const state = {
        customThemeActive: false,
        activeTheme: "default",
    }

    const themesData = {
        default: {
            color: "rose",
            fonts: {
                headline: "instrument",
                subheadline: "instrument",
                body: "instrument"
            }
        },
        custom: {
            "medieval": {
                color: "blue",
                fonts: {
                    headline: "alagard",
                    subheadline: "alagard",
                    body: "instrument"
                }
            },
            "cowboy": {
                color: "green",
                fonts: {
                    headline: "biorhyme",
                    subheadline: "biorhyme",
                    body: "instrument"
                }
            },
        },
        // TODO: Just iterate through custom. to generate this list
        themeList: [
            "cowboy, medieval",
        ]
    }

    const body = document.querySelector('body');

    const themeUpdater = {
        activateTheme: (theme) => {
            console.log(`themeUpdater activate ${theme}`);
            const themeName = `theme-${theme}`;
            const themeAttributes = themesData.custom[theme];
            console.log(themeAttributes)

            themeUpdater.update.color(themesData.default.color, themeAttributes.color);
            
            body.classList.remove(`theme-default`);
            body.classList.add(themeName);

            // Last step
            state.activeTheme = "medieval";
        },
        init: () => {
            console.log("themeUpdater init");
            const button = document.getElementById("themeUpdater");
            button.addEventListener("click", themeUpdater.toggleState, false );
        },
        resetTheme: () => {
            console.log("themeUpdater reset", state);

            const activeTheme = state.activeTheme;

            // Catch default reset 
            if (activeTheme == "default") {
                return;
            }

            // Update body class
            body.classList.remove(`theme-${activeTheme}`)
            body.classList.add(`theme-default`);

            console.log(activeTheme)
            const themeAttributes = themesData.custom[activeTheme];
            console.log(themeAttributes)
            themeUpdater.update.color(themeAttributes.color, themesData.default.color);
            state.activeTheme = "default";
        },
        toggleState: () => {
            console.log("themeUpdater toggleState");
            state.customThemeActive = !state.customThemeActive;
            if (state.customThemeActive) {
                // TODO: Get random theme from themesData.themeList
                themeUpdater.activateTheme("cowboy");
                return;
            } 
            themeUpdater.resetTheme();
        },
        update: {
            color: (color, newColor) => {
                // Examples: text-rose-500, bg-rose-700
                const elements = document.querySelectorAll(`[class*="-${color}-"]`);
                console.log(elements)
                // Iterate through each element that has a matching -${color}-
                for (const element of elements) {
                    // Iterate through each class name and update -${color}-
                    for (const cls of element.classList) {
                        if (cls.includes(`-${color}-`)) {
                            const newCls = cls.replace(`-${color}-`, `-${newColor}-`);
                            element.classList.replace(cls, newCls);
                        }
                    }
                }
            }
        }
        
        

        
        
    }

    function init() {
        updateCopyrightYear()
        themeUpdater.init();
    }
    

    
    init();
	
})();