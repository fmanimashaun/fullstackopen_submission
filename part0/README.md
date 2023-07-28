# New note diagram
The diagram deplict the series of events that occur when a new note is added to the notes page.


## Traditional method to add a new note

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes something in the text field and clicks the submit button.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: The browser sends the note content in the request body.
    activate server
    server-->>browser: Status 302 (Found), Redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated JSON data [{ "content": "New Note", "date": "2023-7-28" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes with the updated data.
```




## SPA method of fetching notes

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: SPA HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the SPA JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the SPA JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```



## SPA method to add note to the notes page

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes something in the text field and clicks the submit button.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The browser sends the note content in the request body.
    activate server
    server-->>browser: Status 201 (Created)
    deactivate server

    Note over browser: The browser does not refresh the page. The JavaScript code immediately adds the note to the list of notes in the page.

    Note right of browser: The browser fetches the updated note list from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated JSON data [{ "content": "New Note", "date": "2023-7-28" }, ...]
    deactivate server

    Note over browser: The browser executes the callback function to render the updated notes.
```

