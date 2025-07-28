import { apiInitializer } from "discourse/lib/api";
import I18n from "discourse-i18n";

export default apiInitializer((api) => {
  // * toolbar buttons * //
  
  // Add image grid button
  api.modifyClass("component:composer-editor", {
    actions: {
      imageGrid() {
        this.composer.insertText('[grid]\n\n-uploaded images go here-\n\n[/grid]');
      }
    }
  });

  // Add alignment buttons
  api.modifyClass("component:composer-editor", {
    actions: {
      alignLeft() {
        this.composer.insertText('<div data-theme-image="left">\n\n-uploaded image goes here-\n\n</div>');
      },
      alignRight() {
        this.composer.insertText('<div data-theme-image="right">\n\n-uploaded image goes here-\n\n</div>');
      },
      alignCenter() {
        this.composer.insertText('<div align="center">\n\n-uploaded image goes here-\n\n</div>');
      }
    }
  });

  // Add toolbar buttons using the correct API
  api.modifyClass("component:composer-editor", {
    buildToolbar() {
      const toolbar = this._super(...arguments);
      
      // Add image grid button
      toolbar.push({
        id: "image_grid_button",
        group: "extras",
        icon: "compress",
        action: "imageGrid",
        title: "make multiple images grid"
      });
      
      // Add alignment buttons
      toolbar.push({
        id: "align_left_button",
        group: "extras", 
        icon: "angle-left",
        action: "alignLeft",
        title: "align image left of text"
      });
      
      toolbar.push({
        id: "align_right_button",
        group: "extras",
        icon: "angle-right", 
        action: "alignRight",
        title: "align image right of text"
      });
      
      toolbar.push({
        id: "align_center_button",
        group: "extras",
        icon: "left-right",
        action: "alignCenter", 
        title: "align image center of post"
      });
      
      return toolbar;
    }
  });

  // * Text translations * //
  
  let translations = I18n.translations[I18n.currentLocale()].js;
  if (!translations) {
    translations = {};
  }
  if (!translations.composer) {
    translations.composer = {};
  }

  // Get settings from the theme component
  const settings = api.container.lookup("service:site-settings");
  
  translations.composer.align_left_button_title = settings.align_left_button;
  translations.composer.align_left_text = settings.align_left_text;

  translations.composer.align_right_button_title = settings.align_right_button;
  translations.composer.align_right_text = settings.align_right_text;

  translations.composer.align_center_button_title = settings.align_center_button;
  translations.composer.align_center_text = settings.align_center_text;

  translations.composer.image_grid_button_title = settings.image_grid_button;
  translations.composer.image_grid_text = settings.image_grid_text;
}); 