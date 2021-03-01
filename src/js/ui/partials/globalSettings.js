var $ = require('jquery');

/*MODULE EXPORT*/
module.exports = {
    generateGlobalSettings( parentSelector, gsData ){
        console.log(parentSelector, gsData);
        parentSelector.find('.b-ui__tool .b-ui__tool__edit-general__inner').append(
            `
            <div class='b-ui__tool__edit-general__info'>
                <div class="b-ui__tool b-ui__tool__edit-general__item">
                    <span>title</span>
                    <input type="text" value="${gsData.title}">
                  </div>
                  <div class="b-ui__tool b-ui__tool__edit-general__item">
                    <span>publisher</span>
                    <input type="text" value="${gsData.publisher}">
                  </div>
                  <div class="b-ui__tool b-ui__tool__edit-general__item">
                    <span>publisher-logo-source</span>
                    <input type="text" value="${gsData.publisherLogoSrc}">
                  </div>
                  <div class="b-ui__tool b-ui__tool__edit-general__item">
                    <span>poster-portrait-source</span>
                    <input type="text" value="${gsData.posterPortraitSrc}">
                  </div>
            </div>
            <div class='b-ui__tool__edit-general__ads'>
                <div class="b-ui__tool b-ui__tool__edit-general__item-ads">
                    <label class="c-switch">
                      <input type="checkbox">
                      <span class="slider round"></span>
                      <span class='c-switch__title'>Ads</span>
                    </label>
                </div>
            </div>
             <!-- <button class='get-json'>Generate JSON</button> -->
            `
          );
    }
}
