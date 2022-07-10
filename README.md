# Vue + Bootstrap

Personal Curriculum Vitae made with Vue and Bootstrap starting using vue-cli.

## Project init

Project firstly created using vue-cli.

```
vue create cv
```

Then, Bootstrap was installed bare.
```
npm install bootstrap
```

For icons I have used [@fortawesome](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) and [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)
```
npm i svelte-fa @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```


### For github pages
After setting public path in `vue.config.js` to `process.env.NODE_ENV === 'production' ? '/cv/' : '/'`
```
git add dist && git commit -m "adding dist subtree"
git subtree push --prefix dist origin gh-pages 
```
