# Project photos

Drop your project photos here as JPG / PNG / WebP files.

Recommended naming:
- `project-01.jpg`, `project-02.jpg`, ...
- or use descriptive names: `residential-ceiling-bondi.jpg`

Then in `index.html`, replace each `.project-card` placeholder with:
```html
<li class="project-card">
  <img src="assets/photos/your-photo.jpg" alt="Description of the project" />
</li>
```

For the hero photo collage (`#hero`), replace each `.photo-tile` with:
```html
<div class="photo-tile tile-1" style="background-image: url('assets/photos/photo.jpg');">
  <!-- optionally overlay text -->
</div>
```
and add `background-size: cover; background-position: center;` to `.photo-tile` in `assets/css/main.css`.