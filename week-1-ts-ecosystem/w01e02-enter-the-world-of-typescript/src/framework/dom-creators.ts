type tags = 'p'|'div'|'section'|'article';

function createElement(tagName:tags = 'div', className:string = ''):HTMLElement {
  const element = <HTMLElement>document.createElement(tagName)
  if (className.length) element.className = className;
  return element
}

export const p = (className = '') => createElement('p', className)
export const div = (className = '') => createElement('div', className)
export const section = (className = '') => createElement('section', className)
export const article = (className = '') => createElement('article', className)
