import { Page, Locator } from '@playwright/test';

/**
 * AriaRole utility class for building role-based locators in Playwright
 * Provides a fluent API to create locators with various options
 */
export class AriaRole {
    private roleName: string;
    private options: {
        name?: string | RegExp;
        exact?: boolean;
        checked?: boolean;
        disabled?: boolean;
        expanded?: boolean;
        includeHidden?: boolean;
        level?: number;
        pressed?: boolean;
        selected?: boolean;
    };

    private constructor(roleName: string) {
        this.roleName = roleName;
        this.options = {};
    }

    // Common ARIA Roles as static factory methods
    static get ALERT() { return new AriaRole('alert'); }
    static get ALERTDIALOG() { return new AriaRole('alertdialog'); }
    static get APPLICATION() { return new AriaRole('application'); }
    static get ARTICLE() { return new AriaRole('article'); }
    static get BANNER() { return new AriaRole('banner'); }
    static get BUTTON() { return new AriaRole('button'); }
    static get CELL() { return new AriaRole('cell'); }
    static get CHECKBOX() { return new AriaRole('checkbox'); }
    static get COLUMNHEADER() { return new AriaRole('columnheader'); }
    static get COMBOBOX() { return new AriaRole('combobox'); }
    static get COMPLEMENTARY() { return new AriaRole('complementary'); }
    static get CONTENTINFO() { return new AriaRole('contentinfo'); }
    static get DEFINITION() { return new AriaRole('definition'); }
    static get DIALOG() { return new AriaRole('dialog'); }
    static get DIRECTORY() { return new AriaRole('directory'); }
    static get DOCUMENT() { return new AriaRole('document'); }
    static get FEED() { return new AriaRole('feed'); }
    static get FIGURE() { return new AriaRole('figure'); }
    static get FORM() { return new AriaRole('form'); }
    static get GRID() { return new AriaRole('grid'); }
    static get GRIDCELL() { return new AriaRole('gridcell'); }
    static get GROUP() { return new AriaRole('group'); }
    static get HEADING() { return new AriaRole('heading'); }
    static get IMG() { return new AriaRole('img'); }
    static get LINK() { return new AriaRole('link'); }
    static get LIST() { return new AriaRole('list'); }
    static get LISTBOX() { return new AriaRole('listbox'); }
    static get LISTITEM() { return new AriaRole('listitem'); }
    static get LOG() { return new AriaRole('log'); }
    static get MAIN() { return new AriaRole('main'); }
    static get MARQUEE() { return new AriaRole('marquee'); }
    static get MATH() { return new AriaRole('math'); }
    static get MENU() { return new AriaRole('menu'); }
    static get MENUBAR() { return new AriaRole('menubar'); }
    static get MENUITEM() { return new AriaRole('menuitem'); }
    static get MENUITEMCHECKBOX() { return new AriaRole('menuitemcheckbox'); }
    static get MENUITEMRADIO() { return new AriaRole('menuitemradio'); }
    static get NAVIGATION() { return new AriaRole('navigation'); }
    static get NONE() { return new AriaRole('none'); }
    static get NOTE() { return new AriaRole('note'); }
    static get OPTION() { return new AriaRole('option'); }
    static get PRESENTATION() { return new AriaRole('presentation'); }
    static get PROGRESSBAR() { return new AriaRole('progressbar'); }
    static get RADIO() { return new AriaRole('radio'); }
    static get RADIOGROUP() { return new AriaRole('radiogroup'); }
    static get REGION() { return new AriaRole('region'); }
    static get ROW() { return new AriaRole('row'); }
    static get ROWGROUP() { return new AriaRole('rowgroup'); }
    static get ROWHEADER() { return new AriaRole('rowheader'); }
    static get SCROLLBAR() { return new AriaRole('scrollbar'); }
    static get SEARCH() { return new AriaRole('search'); }
    static get SEARCHBOX() { return new AriaRole('searchbox'); }
    static get SEPARATOR() { return new AriaRole('separator'); }
    static get SLIDER() { return new AriaRole('slider'); }
    static get SPINBUTTON() { return new AriaRole('spinbutton'); }
    static get STATUS() { return new AriaRole('status'); }
    static get SWITCH() { return new AriaRole('switch'); }
    static get TAB() { return new AriaRole('tab'); }
    static get TABLE() { return new AriaRole('table'); }
    static get TABLIST() { return new AriaRole('tablist'); }
    static get TABPANEL() { return new AriaRole('tabpanel'); }
    static get TERM() { return new AriaRole('term'); }
    static get TEXTBOX() { return new AriaRole('textbox'); }
    static get TIMER() { return new AriaRole('timer'); }
    static get TOOLBAR() { return new AriaRole('toolbar'); }
    static get TOOLTIP() { return new AriaRole('tooltip'); }
    static get TREE() { return new AriaRole('tree'); }
    static get TREEGRID() { return new AriaRole('treegrid'); }
    static get TREEITEM() { return new AriaRole('treeitem'); }

    /**
     * Set the accessible name to match
     * @param name - String or RegExp to match the accessible name
     * @param exact - Whether to match exactly (default: false)
     */
    setName(name: string | RegExp, exact: boolean = false): AriaRole {
        this.options.name = name;
        this.options.exact = exact;
        return this;
    }

    /**
     * Match elements with exact name
     * @param name - The exact accessible name
     */
    withExactName(name: string): AriaRole {
        this.options.name = name;
        this.options.exact = true;
        return this;
    }

    /**
     * Match checked state
     * @param checked - Whether the element should be checked
     */
    checked(checked: boolean = true): AriaRole {
        this.options.checked = checked;
        return this;
    }

    /**
     * Match disabled state
     * @param disabled - Whether the element should be disabled
     */
    disabled(disabled: boolean = true): AriaRole {
        this.options.disabled = disabled;
        return this;
    }

    /**
     * Match expanded state
     * @param expanded - Whether the element should be expanded
     */
    expanded(expanded: boolean = true): AriaRole {
        this.options.expanded = expanded;
        return this;
    }

    /**
     * Include hidden elements
     * @param includeHidden - Whether to include hidden elements
     */
    includeHidden(includeHidden: boolean = true): AriaRole {
        this.options.includeHidden = includeHidden;
        return this;
    }

    /**
     * Match heading level (for heading role)
     * @param level - The heading level (1-6)
     */
    level(level: number): AriaRole {
        this.options.level = level;
        return this;
    }

    /**
     * Match pressed state
     * @param pressed - Whether the element should be pressed
     */
    pressed(pressed: boolean = true): AriaRole {
        this.options.pressed = pressed;
        return this;
    }

    /**
     * Match selected state
     * @param selected - Whether the element should be selected
     */
    selected(selected: boolean = true): AriaRole {
        this.options.selected = selected;
        return this;
    }

    /**
     * Build and return the Playwright locator
     * @param page - The Playwright page object
     */
    build(page: Page): Locator {
        return page.getByRole(this.roleName as any, this.options as any);
    }

    /**
     * Get the role name and options (for debugging)
     */
    toJSON() {
        return {
            role: this.roleName,
            options: this.options
        };
    }
}

/**
 * Helper function to create custom roles not in the standard list
 * @param roleName - The custom role name
 */
export function customRole(roleName: string): AriaRole {
    return (AriaRole as any).constructor.call(Object.create(AriaRole.prototype), roleName);
}

