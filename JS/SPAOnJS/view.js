'use strict';

export default {
  render(templateName, data) {
    templateName = templateName + 'Template';

    const templateElement = document.getElementById(templateName);
    const templateSourse = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSourse);

    return renderFn(data);
  }
};