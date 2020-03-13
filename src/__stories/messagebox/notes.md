# MESSAGE BOX

`<Message />` is always available in page and listens actions type of `IDialogActionEnums.OPEN` and `IDialogActionEnums.CLOSE` .

**_Sample Implemantation_**

```
    // Import useDispatch first
    import {  useDispatch } from "react-redux";
    ..
    ..
    ()=>{
      // in compnent get it on var
      const dispatch = useDispatch()

     // Then dispatch an action similar to below to show a message dialog

        dispatch({
          type:IMessageTypeEnums.[INFO|ERROR|WARNING],
          icon: IconNameEnums.[ADD|CLOSE|....]
          caption:"Lorem ... ",
          body: HTMLDOMElement | ReactElement
          closable: true | false // show or hide [X] close button
        })

      return <>
                ...
            </>
    }
```
