![Desktop Preview](https://i.imgur.com/V3MaZwx.png)

<div align="center">
  <h1>Spotify Clone</h1>

> &nbsp;
> <h3>Spotify clone made with</h3>
>  <div>
>   <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" /></a>
>   <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></a>
>   <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Javascript" /></a>
> </div>
> &nbsp;
</div>

## Table Of Content

- [Built Using](#built-using)
- [Getting Started](#getting-started)

## Built Using

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Markup Language
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Cascading Style Sheet
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Scripting Language

## Getting Started

There is nothing you need to install as it is made using only HTML, CSS and JS. But there are certain things you need to do, so that app would run without any problem.

1. First you need to make a `/songs` folder and add desired songs. I've excluded it to cut down unnecessary upload size.

2. Finally you need to update `data.json` file according to the songs added. There will be content present in this file but it's basically work as placeholder, you'll need to make changes in order to make some functionality work. The basic schema looks like this:

```js
{
  "focus": [ // section title
    { // each and every playlist for this section goes here
      "id": 1,
      "name": "peaceful piano",
      "desc": "Lorem ipsum dolor sit amet consectetur.",
      "img": "./assets/thumbnail (1).jpg",
      "songs": [
        {
          "id": 1,
          "title": "Au5 last heroes lush",
          "artist": "NCS",
          "duration": "5:00",
          "src": "./songs/Au5-Last-Heroes-Lush.mp3"
        },
        {
          "id": 2,
          "title": "dirty palm oblivion",
          "artist": "NCS",
          "duration": "4:50",
          "src": "./songs/Dirty-Palm-Oblivion.mp3"
        },
        {
          "id": 3,
          "title": "DJ-assass1n frag out",
          "artist": "NCS",
          "duration": "4:29",
          "src": "./songs/DJ-ASSASS1N-Frag-Out.mp3"
        },
        {
          "id": 4,
          "title": "elektromia vitality",
          "artist": "NCS",
          "duration": "4:11",
          "src": "./songs/Elektronomia-Vitality.mp3"
        },
        {
          "id": 5,
          "title": "inushuk the long road home",
          "artist": "NCS",
          "duration": "3:11",
          "src": "./songs/Au5-Last-Heroes-Lush.mp3"
        }
      ]
    },
  ],
}
```