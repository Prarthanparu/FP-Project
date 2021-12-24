const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@font-family": "'Montserrat', sans-serif",
              "@primary-color": "#EF7434",
              "@text-color": "#fff",
              "@text-color-secondary": "#999999",
              "@btn-primary-color": "#fff",
              "@btn-primary-bg":
                "linear-gradient(93.22deg, #EF7434 0%, #EF3499 100%)",
              "@body-background": "#1F2021",
              "@layout-header-height": "29px",
              "@menu-item-padding-horizontal": "5px;",
              "@menu-bg": "transparent",
              "@menu-item-height": "60px",
              "@menu-item-color": "@text-color",
              "@card-background": "#2D2D2F",
              "@input-placeholder-color": "hsv(0, 0, 55%)",
              "@card-radius": "10px",
              "@card-margin-left": "0px",
              "@checkbox-check-color": "#fff",
              "@checkbox-color": "#2DC033",
              "@table-bg": " #272728",
              "@table-header-color": "#999999",
              "@table-padding-vertical": "20px",
              "@table-row-hover-bg": "#1A1A1C",
              "@table-selected-row-bg": "#0000",
              "@btn-border-radius-base": "5px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
