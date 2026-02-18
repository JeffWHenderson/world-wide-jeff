# React + TypeScript + Vite

## running the app locally

`yarn`: install depenedencies

`yarn dev`: start the app locally

visit `http://localhost:5173` in your browser to see the app





## Adding/Editing the language app

### PROJECT SCRUCTURE:

All the courses are in the public folder cause who needs an API anyway?

If you want to add a language all you need is to add a folder in public with the language name.  I'm not using ISO language codes and do not have a good explanation as to why not.

Adding a course section you would add a new folder under `public/<LANGUAGE>/modules`.  Thats also the best place to look to fix translations and stuff.  the filename is in the URL and pretty closely matches this file structure so it should be easy to find the file you want to edit and to what lesson

```
public/
└── <LANGUAGE>/
    ├── course.json 
    ├── grammar/
    │   └── example.json
    ├── lessons/
    │   ├── example.txt
    └── modules/
        ├── <someCourseSection>
        │   ├── __wordList__.json
        │   ├── flashcards
        │   │   └── someDeck.json
        │   └── stories
        │       ├── someStory.json
        ├── <moreCourseSections>/
        │   ├── ...
 
```

### "Data Model" <-- fake DTOs really

Story, Flashcards, WordLists all follow mostly the sam structure. The exception is word listis missing some fields but its super easy to figure out even if you don't know much/anything about coding.

There is a model for grammar notes and literal translations but I'm not there yet. If you want to take a stab at adding that stuff please, please do it

```json
{
  "name": "Lesson Name", 
  "type": "flashcards || stories || wordlist", 
  "sentences": [
      { 
        "base_language": "Some phrase in English", 
        "target_language": "Tranlated phrase",
        "romanized": "This is optional. Some languages like Chinese have ways to write in the latin alphabet"
      },
      { 
        "base_language": "Phrase 2", 
        "target_language": "Translation 2"
      },
      ...
  ]
}

```
