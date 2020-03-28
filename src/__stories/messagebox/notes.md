# MESSAGE BOX

`<Message />` is always available in page and listens actions type of `IDialogActionEnums.OPEN` and `IDialogActionEnums.CLOSE` .

**_Sample Implemantation_**

```
    const content: IMessageAction = {
      type,
      message: {
        dialogType,
        caption: lorem.words(2),
        body: (
          <>
            <p>{lorem.sentence()}</p>
          </>
        ),
        dialogId: uuid(),
        closable: true,
      },
    };
    dispatch(content);
```
