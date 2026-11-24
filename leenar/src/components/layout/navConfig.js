/**
 * Routes whose first section is a full-bleed dark hero.
 * On these the navbar starts transparent and turns solid on scroll;
 * every other page gets a solid Espresso navbar from the start
 * (the logo is white, so it needs a dark background behind it).
 */
export const TRANSPARENT_NAV_ROUTES = ['/']

/** Height of the navbar. Layout pads other pages by the same amount (pt-16 lg:pt-20). */
export const NAV_HEIGHT = 'h-16 lg:h-20'
