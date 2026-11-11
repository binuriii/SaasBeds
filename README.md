# SaaSBeds redesign (Vue 3 + Vite + vue-router)
npm install && npm run dev   (build: npm run build)

src/pages/Home/Home.vue|js|css                -> assembles sections
src/pages/Home/<Section>/<Section>.vue|css + <Section>Data.js
src/components/AppHeader  -> replica of the Mews header (only the logo is SaaSBeds); content in AppHeaderData.js
src/assets/header         -> cropped menu images from the reference screenshots
src/components/AppFooter
Theme tokens for the page: src/styles.css (:root). Header tokens: top of AppHeader.css.
Sample content (customers, stats, testimonial) must be replaced with real SaaSBeds content.
